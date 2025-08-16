use actix_web::{web, HttpResponse, Result, Scope};
use sqlx::PgPool;
use validator::Validate;
use uuid::Uuid;
use chrono::Utc;

use crate::models::{CreateUserRequest, LoginRequest, User, AuthResponse, UserResponse};
use crate::utils::{hash_password, verify_password, create_jwt};
use crate::middleware::auth::AuthenticatedUser;

pub fn auth_routes() -> Scope {
    web::scope("/auth")
        .route("/register", web::post().to(register))
        .route("/login", web::post().to(login))
        .route("/me", web::get().to(get_current_user))
        .route("/refresh", web::post().to(refresh_token))
}

async fn register(
    pool: web::Data<PgPool>,
    req: web::Json<CreateUserRequest>,
) -> Result<HttpResponse> {
    if let Err(errors) = req.validate() {
        return Ok(HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Validation failed",
            "details": errors
        })));
    }

    // Check if user already exists
    let existing_user = sqlx::query_as::<_, User>(
        "SELECT * FROM users WHERE email = $1"
    )
    .bind(&req.email)
    .fetch_optional(pool.get_ref())
    .await;

    match existing_user {
        Ok(Some(_)) => {
            return Ok(HttpResponse::Conflict().json(serde_json::json!({
                "error": "User with this email already exists"
            })));
        }
        Err(e) => {
            log::error!("Database error: {}", e);
            return Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Internal server error"
            })));
        }
        _ => {}
    }

    let password_hash = match hash_password(&req.password) {
        Ok(hash) => hash,
        Err(_) => {
            return Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to hash password"
            })));
        }
    };

    let user_id = Uuid::new_v4();
    let now = Utc::now();

    let result = sqlx::query_as::<_, User>(
        r#"
        INSERT INTO users (id, email, password_hash, first_name, last_name, phone, is_admin, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, false, true, $7, $8)
        RETURNING *
        "#
    )
    .bind(user_id)
    .bind(&req.email)
    .bind(&password_hash)
    .bind(&req.first_name)
    .bind(&req.last_name)
    .bind(&req.phone)
    .bind(now)
    .bind(now)
    .fetch_one(pool.get_ref())
    .await;

    match result {
        Ok(user) => {
            let token = create_jwt(user.id)?;
            let response = AuthResponse {
                token,
                user: user.into(),
            };
            Ok(HttpResponse::Created().json(response))
        }
        Err(e) => {
            log::error!("Failed to create user: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to create user"
            })))
        }
    }
}

async fn login(
    pool: web::Data<PgPool>,
    req: web::Json<LoginRequest>,
) -> Result<HttpResponse> {
    if let Err(errors) = req.validate() {
        return Ok(HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Validation failed",
            "details": errors
        })));
    }

    let user = sqlx::query_as::<_, User>(
        "SELECT * FROM users WHERE email = $1 AND is_active = true"
    )
    .bind(&req.email)
    .fetch_optional(pool.get_ref())
    .await;

    match user {
        Ok(Some(user)) => {
            match verify_password(&req.password, &user.password_hash) {
                Ok(is_valid) => {
                    if is_valid {
                        let token = create_jwt(user.id)?;
                        let response = AuthResponse {
                            token,
                            user: user.into(),
                        };
                        Ok(HttpResponse::Ok().json(response))
                    } else {
                        Ok(HttpResponse::Unauthorized().json(serde_json::json!({
                            "error": "Invalid credentials"
                        })))
                    }
                }
                Err(_) => {
                    Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                        "error": "Password verification failed"
                    })))
                }
            }
        }
        Ok(None) => {
            Ok(HttpResponse::Unauthorized().json(serde_json::json!({
                "error": "Invalid credentials"
            })))
        }
        Err(e) => {
            log::error!("Database error: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Internal server error"
            })))
        }
    }
}

async fn get_current_user(
    pool: web::Data<PgPool>,
    user: AuthenticatedUser,
) -> Result<HttpResponse> {
    let user_data = sqlx::query_as::<_, User>(
        "SELECT * FROM users WHERE id = $1 AND is_active = true"
    )
    .bind(user.user_id)
    .fetch_optional(pool.get_ref())
    .await;

    match user_data {
        Ok(Some(user)) => {
            let response: UserResponse = user.into();
            Ok(HttpResponse::Ok().json(response))
        }
        Ok(None) => {
            Ok(HttpResponse::NotFound().json(serde_json::json!({
                "error": "User not found"
            })))
        }
        Err(e) => {
            log::error!("Database error: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Internal server error"
            })))
        }
    }
}

async fn refresh_token(
    user: AuthenticatedUser,
) -> Result<HttpResponse> {
    let new_token = create_jwt(user.user_id)?;
    
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "token": new_token
    })))
}
