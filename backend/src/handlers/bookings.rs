use actix_web::{web, HttpResponse, Result, Scope};
use sqlx::PgPool;
use uuid::Uuid;
use validator::Validate;
use chrono::Utc;

use crate::models::{Booking, CreateBookingRequest, BookingResponse};
use crate::middleware::auth::AuthenticatedUser;

pub fn booking_routes() -> Scope {
    web::scope("/bookings")
        .route("", web::post().to(create_booking))
        .route("", web::get().to(get_user_bookings))
        .route("/{id}", web::get().to(get_booking_by_id))
        .route("/{id}/cancel", web::put().to(cancel_booking))
}

async fn create_booking(
    pool: web::Data<PgPool>,
    user: AuthenticatedUser,
    req: web::Json<CreateBookingRequest>,
) -> Result<HttpResponse> {
    if let Err(errors) = req.validate() {
        return Ok(HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Validation failed",
            "details": errors
        })));
    }

    // Get package details to calculate total amount
    let package = sqlx::query(
        "SELECT price FROM packages WHERE id = $1 AND is_active = true"
    )
    .bind(req.package_id)
    .fetch_optional(pool.get_ref())
    .await;

    let package = match package {
        Ok(Some(package)) => package,
        Ok(None) => {
            return Ok(HttpResponse::NotFound().json(serde_json::json!({
                "error": "Package not found"
            })));
        }
        Err(e) => {
            log::error!("Failed to fetch package: {}", e);
            return Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch package details"
            })));
        }
    };

    let total_amount = {
        use sqlx::Row;
        package.get::<i32, _>("price") * req.number_of_people
    };
    let booking_id = Uuid::new_v4();
    let now = Utc::now();

    let result = sqlx::query_as::<_, Booking>(
        r#"
        INSERT INTO bookings (id, user_id, package_id, booking_date, number_of_people, total_amount, status, special_requests, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7, $8, $9)
        RETURNING *
        "#
    )
    .bind(booking_id)
    .bind(user.user_id)
    .bind(req.package_id)
    .bind(req.booking_date)
    .bind(req.number_of_people)
    .bind(total_amount)
    .bind(&req.special_requests)
    .bind(now)
    .bind(now)
    .fetch_one(pool.get_ref())
    .await;

    match result {
        Ok(booking) => {
            Ok(HttpResponse::Created().json(serde_json::json!({
                "message": "Booking created successfully",
                "booking_id": booking.id,
                "total_amount": booking.total_amount
            })))
        }
        Err(e) => {
            log::error!("Failed to create booking: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to create booking"
            })))
        }
    }
}

async fn get_user_bookings(
    pool: web::Data<PgPool>,
    user: AuthenticatedUser,
) -> Result<HttpResponse> {
    let bookings = sqlx::query(
        r#"
        SELECT b.id, b.booking_date, b.number_of_people, b.total_amount, b.status, 
               b.special_requests, b.created_at, p.title as package_title
        FROM bookings b
        JOIN packages p ON b.package_id = p.id
        WHERE b.user_id = $1
        ORDER BY b.created_at DESC
        "#
    )
    .bind(user.user_id)
    .fetch_all(pool.get_ref())
    .await;

    match bookings {
        Ok(bookings) => {
            let responses: Vec<BookingResponse> = bookings.into_iter().map(|b| {
                use sqlx::Row;
                BookingResponse {
                    id: b.get::<Uuid, _>("id"),
                    package_title: b.get::<String, _>("package_title"),
                    booking_date: b.get::<chrono::NaiveDate, _>("booking_date"),
                    number_of_people: b.get::<i32, _>("number_of_people"),
                    total_amount: b.get::<i32, _>("total_amount"),
                    status: b.get::<String, _>("status"),
                    special_requests: b.get::<Option<String>, _>("special_requests"),
                    created_at: b.get::<chrono::DateTime<chrono::Utc>, _>("created_at"),
                }
            }).collect();

            Ok(HttpResponse::Ok().json(responses))
        }
        Err(e) => {
            log::error!("Failed to fetch user bookings: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch bookings"
            })))
        }
    }
}

async fn get_booking_by_id(
    pool: web::Data<PgPool>,
    user: AuthenticatedUser,
    path: web::Path<Uuid>,
) -> Result<HttpResponse> {
    let booking_id = path.into_inner();

    let booking = sqlx::query(
        r#"
        SELECT b.id, b.booking_date, b.number_of_people, b.total_amount, b.status, 
               b.special_requests, b.created_at, p.title as package_title
        FROM bookings b
        JOIN packages p ON b.package_id = p.id
        WHERE b.id = $1 AND b.user_id = $2
        "#
    )
    .bind(booking_id)
    .bind(user.user_id)
    .fetch_optional(pool.get_ref())
    .await;

    match booking {
        Ok(Some(booking)) => {
            use sqlx::Row;
            let response = BookingResponse {
                id: booking.get::<Uuid, _>("id"),
                package_title: booking.get::<String, _>("package_title"),
                booking_date: booking.get::<chrono::NaiveDate, _>("booking_date"),
                number_of_people: booking.get::<i32, _>("number_of_people"),
                total_amount: booking.get::<i32, _>("total_amount"),
                status: booking.get::<String, _>("status"),
                special_requests: booking.get::<Option<String>, _>("special_requests"),
                created_at: booking.get::<chrono::DateTime<chrono::Utc>, _>("created_at"),
            };
            Ok(HttpResponse::Ok().json(response))
        }
        Ok(None) => {
            Ok(HttpResponse::NotFound().json(serde_json::json!({
                "error": "Booking not found"
            })))
        }
        Err(e) => {
            log::error!("Failed to fetch booking: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch booking"
            })))
        }
    }
}

async fn cancel_booking(
    pool: web::Data<PgPool>,
    user: AuthenticatedUser,
    path: web::Path<Uuid>,
) -> Result<HttpResponse> {
    let booking_id = path.into_inner();

    let result = sqlx::query(
        r#"
        UPDATE bookings 
        SET status = 'cancelled', updated_at = NOW()
        WHERE id = $1 AND user_id = $2 AND status = 'pending'
        "#
    )
    .bind(booking_id)
    .bind(user.user_id)
    .execute(pool.get_ref())
    .await;

    match result {
        Ok(result) => {
            if result.rows_affected() > 0 {
                Ok(HttpResponse::Ok().json(serde_json::json!({
                    "message": "Booking cancelled successfully"
                })))
            } else {
                Ok(HttpResponse::NotFound().json(serde_json::json!({
                    "error": "Booking not found or cannot be cancelled"
                })))
            }
        }
        Err(e) => {
            log::error!("Failed to cancel booking: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to cancel booking"
            })))
        }
    }
}
