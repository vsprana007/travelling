use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use validator::Validate;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Package {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub price: i32,
    pub duration_days: i32,
    pub max_people: i32,
    pub category_id: Uuid,
    pub image_url: Option<String>,
    pub highlights: Vec<String>,
    pub inclusions: Vec<String>,
    pub exclusions: Vec<String>,
    pub itinerary: serde_json::Value,
    pub is_featured: bool,
    pub is_active: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, Validate)]
pub struct CreatePackageRequest {
    #[validate(length(min = 1))]
    pub title: String,
    #[validate(length(min = 10))]
    pub description: String,
    #[validate(range(min = 1))]
    pub price: i32,
    #[validate(range(min = 1))]
    pub duration_days: i32,
    #[validate(range(min = 1))]
    pub max_people: i32,
    pub category_id: Uuid,
    pub image_url: Option<String>,
    pub highlights: Vec<String>,
    pub inclusions: Vec<String>,
    pub exclusions: Vec<String>,
    pub itinerary: serde_json::Value,
    pub is_featured: Option<bool>,
}

#[derive(Debug, Serialize)]
pub struct PackageResponse {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub price: i32,
    pub duration_days: i32,
    pub max_people: i32,
    pub category: Option<String>,
    pub image_url: Option<String>,
    pub highlights: Vec<String>,
    pub inclusions: Vec<String>,
    pub exclusions: Vec<String>,
    pub itinerary: serde_json::Value,
    pub is_featured: bool,
    pub created_at: DateTime<Utc>,
}
