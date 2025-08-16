use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc, NaiveDate};
use validator::Validate;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Booking {
    pub id: Uuid,
    pub user_id: Uuid,
    pub package_id: Uuid,
    pub booking_date: NaiveDate,
    pub number_of_people: i32,
    pub total_amount: i32,
    pub status: String,
    pub special_requests: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Validate)]
pub struct CreateBookingRequest {
    pub package_id: Uuid,
    pub booking_date: NaiveDate,
    #[validate(range(min = 1))]
    pub number_of_people: i32,
    pub special_requests: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct BookingResponse {
    pub id: Uuid,
    pub package_title: String,
    pub booking_date: NaiveDate,
    pub number_of_people: i32,
    pub total_amount: i32,
    pub status: String,
    pub special_requests: Option<String>,
    pub created_at: DateTime<Utc>,
}
