use actix_web::{web, HttpResponse, Result, Scope};
use sqlx::PgPool;
use uuid::Uuid;
use validator::Validate;
use chrono::Utc;

use crate::models::{Package, CreatePackageRequest, User, Category, CreateCategoryRequest};
use crate::middleware::auth::AdminOnly;

#[derive(serde::Deserialize)]
struct UpdateBookingStatusRequest {
    status: String,
}

pub fn admin_routes() -> Scope {
    web::scope("/admin")
        .route("/users", web::get().to(get_all_users))
        .route("/packages", web::post().to(create_package))
        .route("/packages/{id}", web::put().to(update_package))
        .route("/packages/{id}", web::delete().to(delete_package))
        .route("/categories", web::get().to(get_categories))
        .route("/categories", web::post().to(create_category))
        .route("/bookings", web::get().to(get_all_bookings))
        .route("/bookings/{id}/status", web::put().to(update_booking_status))
}

async fn get_all_users(
    pool: web::Data<PgPool>,
    _admin: AdminOnly,
) -> Result<HttpResponse> {
    let users = sqlx::query_as::<_, User>(
        "SELECT * FROM users ORDER BY created_at DESC"
    )
    .fetch_all(pool.get_ref())
    .await;

    match users {
        Ok(users) => {
            let user_responses: Vec<_> = users.into_iter().map(|u| serde_json::json!({
                "id": u.id,
                "email": u.email,
                "first_name": u.first_name,
                "last_name": u.last_name,
                "phone": u.phone,
                "is_admin": u.is_admin,
                "is_active": u.is_active,
                "created_at": u.created_at
            })).collect();

            Ok(HttpResponse::Ok().json(user_responses))
        }
        Err(e) => {
            log::error!("Failed to fetch users: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch users"
            })))
        }
    }
}

async fn create_package(
    pool: web::Data<PgPool>,
    _admin: AdminOnly,
    req: web::Json<CreatePackageRequest>,
) -> Result<HttpResponse> {
    if let Err(errors) = req.validate() {
        return Ok(HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Validation failed",
            "details": errors
        })));
    }

    let package_id = Uuid::new_v4();
    let now = Utc::now();

    let result = sqlx::query_as::<_, Package>(
        r#"
        INSERT INTO packages (id, title, description, price, duration_days, max_people, category_id, image_url, highlights, inclusions, exclusions, itinerary, is_featured, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, true, $14, $15)
        RETURNING *
        "#
    )
    .bind(package_id)
    .bind(&req.title)
    .bind(&req.description)
    .bind(req.price)
    .bind(req.duration_days)
    .bind(req.max_people)
    .bind(req.category_id)
    .bind(&req.image_url)
    .bind(&req.highlights)
    .bind(&req.inclusions)
    .bind(&req.exclusions)
    .bind(&req.itinerary)
    .bind(req.is_featured.unwrap_or(false))
    .bind(now)
    .bind(now)
    .fetch_one(pool.get_ref())
    .await;

    match result {
        Ok(package) => {
            Ok(HttpResponse::Created().json(serde_json::json!({
                "message": "Package created successfully",
                "package_id": package.id
            })))
        }
        Err(e) => {
            log::error!("Failed to create package: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to create package"
            })))
        }
    }
}

async fn update_package(
    pool: web::Data<PgPool>,
    _admin: AdminOnly,
    path: web::Path<Uuid>,
    req: web::Json<CreatePackageRequest>,
) -> Result<HttpResponse> {
    let package_id = path.into_inner();

    if let Err(errors) = req.validate() {
        return Ok(HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Validation failed",
            "details": errors
        })));
    }

    let result = sqlx::query(
        r#"
        UPDATE packages 
        SET title = $2, description = $3, price = $4, duration_days = $5, max_people = $6, 
            category_id = $7, image_url = $8, highlights = $9, inclusions = $10, 
            exclusions = $11, itinerary = $12, is_featured = $13, updated_at = NOW()
        WHERE id = $1
        "#
    )
    .bind(package_id)
    .bind(&req.title)
    .bind(&req.description)
    .bind(req.price)
    .bind(req.duration_days)
    .bind(req.max_people)
    .bind(req.category_id)
    .bind(&req.image_url)
    .bind(&req.highlights)
    .bind(&req.inclusions)
    .bind(&req.exclusions)
    .bind(&req.itinerary)
    .bind(req.is_featured.unwrap_or(false))
    .execute(pool.get_ref())
    .await;

    match result {
        Ok(result) => {
            if result.rows_affected() > 0 {
                Ok(HttpResponse::Ok().json(serde_json::json!({
                    "message": "Package updated successfully"
                })))
            } else {
                Ok(HttpResponse::NotFound().json(serde_json::json!({
                    "error": "Package not found"
                })))
            }
        }
        Err(e) => {
            log::error!("Failed to update package: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to update package"
            })))
        }
    }
}

async fn delete_package(
    pool: web::Data<PgPool>,
    _admin: AdminOnly,
    path: web::Path<Uuid>,
) -> Result<HttpResponse> {
    let package_id = path.into_inner();

    let result = sqlx::query(
        "UPDATE packages SET is_active = false, updated_at = NOW() WHERE id = $1"
    )
    .bind(package_id)
    .execute(pool.get_ref())
    .await;

    match result {
        Ok(result) => {
            if result.rows_affected() > 0 {
                Ok(HttpResponse::Ok().json(serde_json::json!({
                    "message": "Package deleted successfully"
                })))
            } else {
                Ok(HttpResponse::NotFound().json(serde_json::json!({
                    "error": "Package not found"
                })))
            }
        }
        Err(e) => {
            log::error!("Failed to delete package: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to delete package"
            })))
        }
    }
}

async fn get_categories(
    pool: web::Data<PgPool>,
    _admin: AdminOnly,
) -> Result<HttpResponse> {
    let categories = sqlx::query_as::<_, Category>(
        "SELECT * FROM categories WHERE is_active = true ORDER BY name"
    )
    .fetch_all(pool.get_ref())
    .await;

    match categories {
        Ok(categories) => {
            Ok(HttpResponse::Ok().json(categories))
        }
        Err(e) => {
            log::error!("Failed to fetch categories: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch categories"
            })))
        }
    }
}

async fn create_category(
    pool: web::Data<PgPool>,
    _admin: AdminOnly,
    req: web::Json<CreateCategoryRequest>,
) -> Result<HttpResponse> {
    if let Err(errors) = req.validate() {
        return Ok(HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Validation failed",
            "details": errors
        })));
    }

    let category_id = Uuid::new_v4();
    let now = Utc::now();

    let result = sqlx::query_as::<_, Category>(
        r#"
        INSERT INTO categories (id, name, description, icon, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, true, $5, $6)
        RETURNING *
        "#
    )
    .bind(category_id)
    .bind(&req.name)
    .bind(&req.description)
    .bind(&req.icon)
    .bind(now)
    .bind(now)
    .fetch_one(pool.get_ref())
    .await;

    match result {
        Ok(category) => {
            Ok(HttpResponse::Created().json(serde_json::json!({
                "message": "Category created successfully",
                "category_id": category.id
            })))
        }
        Err(e) => {
            log::error!("Failed to create category: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to create category"
            })))
        }
    }
}

async fn get_all_bookings(
    pool: web::Data<PgPool>,
    _admin: AdminOnly,
) -> Result<HttpResponse> {
    let bookings = sqlx::query(
        r#"
        SELECT b.id, b.booking_date, b.number_of_people, b.total_amount, b.status, 
               b.special_requests, b.created_at, p.title as package_title, 
               u.first_name, u.last_name, u.email
        FROM bookings b
        JOIN packages p ON b.package_id = p.id
        JOIN users u ON b.user_id = u.id
        ORDER BY b.created_at DESC
        "#
    )
    .fetch_all(pool.get_ref())
    .await;

    match bookings {
        Ok(bookings) => {
            let booking_responses: Vec<_> = bookings.into_iter().map(|b| {
                use sqlx::Row;
                serde_json::json!({
                    "id": b.get::<Uuid, _>("id"),
                    "package_title": b.get::<String, _>("package_title"),
                    "user_name": format!("{} {}", 
                        b.get::<String, _>("first_name"), 
                        b.get::<String, _>("last_name")
                    ),
                    "user_email": b.get::<String, _>("email"),
                    "booking_date": b.get::<chrono::NaiveDate, _>("booking_date"),
                    "number_of_people": b.get::<i32, _>("number_of_people"),
                    "total_amount": b.get::<i32, _>("total_amount"),
                    "status": b.get::<String, _>("status"),
                    "special_requests": b.get::<Option<String>, _>("special_requests"),
                    "created_at": b.get::<chrono::DateTime<chrono::Utc>, _>("created_at")
                })
            }).collect();

            Ok(HttpResponse::Ok().json(booking_responses))
        }
        Err(e) => {
            log::error!("Failed to fetch bookings: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch bookings"
            })))
        }
    }
}

async fn update_booking_status(
    pool: web::Data<PgPool>,
    _admin: AdminOnly,
    path: web::Path<Uuid>,
    req: web::Json<UpdateBookingStatusRequest>,
) -> Result<HttpResponse> {
    let booking_id = path.into_inner();

    let result = sqlx::query(
        "UPDATE bookings SET status = $2, updated_at = NOW() WHERE id = $1"
    )
    .bind(booking_id)
    .bind(&req.status)
    .execute(pool.get_ref())
    .await;

    match result {
        Ok(result) => {
            if result.rows_affected() > 0 {
                Ok(HttpResponse::Ok().json(serde_json::json!({
                    "message": "Booking status updated successfully"
                })))
            } else {
                Ok(HttpResponse::NotFound().json(serde_json::json!({
                    "error": "Booking not found"
                })))
            }
        }
        Err(e) => {
            log::error!("Failed to update booking status: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to update booking status"
            })))
        }
    }
}
