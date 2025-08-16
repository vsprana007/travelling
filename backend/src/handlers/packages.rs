use actix_web::{web, HttpResponse, Result, Scope};
use sqlx::PgPool;
use uuid::Uuid;

use crate::models::{Package, PackageResponse};

pub fn package_routes() -> Scope {
    web::scope("/packages")
        .route("", web::get().to(get_packages))
        .route("/featured", web::get().to(get_featured_packages))
        .route("/{id}", web::get().to(get_package_by_id))
        .route("/category/{category_id}", web::get().to(get_packages_by_category))
}

async fn get_packages(
    pool: web::Data<PgPool>,
    query: web::Query<PaginationQuery>,
) -> Result<HttpResponse> {
    let limit = query.limit.unwrap_or(20).min(100);
    let offset = query.offset.unwrap_or(0);

    let packages = sqlx::query_as::<_, Package>(
        r#"
        SELECT p.* FROM packages p
        WHERE p.is_active = true
        ORDER BY p.created_at DESC
        LIMIT $1 OFFSET $2
        "#
    )
    .bind(limit as i64)
    .bind(offset as i64)
    .fetch_all(pool.get_ref())
    .await;

    match packages {
        Ok(packages) => {
            let responses: Vec<PackageResponse> = packages.into_iter().map(|p| PackageResponse {
                id: p.id,
                title: p.title,
                description: p.description,
                price: p.price,
                duration_days: p.duration_days,
                max_people: p.max_people,
                category: None, // Will be populated with JOIN in production
                image_url: p.image_url,
                highlights: p.highlights,
                inclusions: p.inclusions,
                exclusions: p.exclusions,
                itinerary: p.itinerary,
                is_featured: p.is_featured,
                created_at: p.created_at,
            }).collect();

            Ok(HttpResponse::Ok().json(serde_json::json!({
                "packages": responses,
                "total": responses.len()
            })))
        }
        Err(e) => {
            log::error!("Failed to fetch packages: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch packages"
            })))
        }
    }
}

async fn get_featured_packages(pool: web::Data<PgPool>) -> Result<HttpResponse> {
    let packages = sqlx::query_as::<_, Package>(
        r#"
        SELECT p.* FROM packages p
        WHERE p.is_active = true AND p.is_featured = true
        ORDER BY p.created_at DESC
        LIMIT 6
        "#
    )
    .fetch_all(pool.get_ref())
    .await;

    match packages {
        Ok(packages) => {
            let responses: Vec<PackageResponse> = packages.into_iter().map(|p| PackageResponse {
                id: p.id,
                title: p.title,
                description: p.description,
                price: p.price,
                duration_days: p.duration_days,
                max_people: p.max_people,
                category: None,
                image_url: p.image_url,
                highlights: p.highlights,
                inclusions: p.inclusions,
                exclusions: p.exclusions,
                itinerary: p.itinerary,
                is_featured: p.is_featured,
                created_at: p.created_at,
            }).collect();

            Ok(HttpResponse::Ok().json(responses))
        }
        Err(e) => {
            log::error!("Failed to fetch featured packages: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch featured packages"
            })))
        }
    }
}

async fn get_package_by_id(
    pool: web::Data<PgPool>,
    path: web::Path<Uuid>,
) -> Result<HttpResponse> {
    let package_id = path.into_inner();

    let package = sqlx::query_as::<_, Package>(
        "SELECT * FROM packages WHERE id = $1 AND is_active = true"
    )
    .bind(package_id)
    .fetch_optional(pool.get_ref())
    .await;

    match package {
        Ok(Some(package)) => {
            let response = PackageResponse {
                id: package.id,
                title: package.title,
                description: package.description,
                price: package.price,
                duration_days: package.duration_days,
                max_people: package.max_people,
                category: None,
                image_url: package.image_url,
                highlights: package.highlights,
                inclusions: package.inclusions,
                exclusions: package.exclusions,
                itinerary: package.itinerary,
                is_featured: package.is_featured,
                created_at: package.created_at,
            };
            Ok(HttpResponse::Ok().json(response))
        }
        Ok(None) => {
            Ok(HttpResponse::NotFound().json(serde_json::json!({
                "error": "Package not found"
            })))
        }
        Err(e) => {
            log::error!("Failed to fetch package: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch package"
            })))
        }
    }
}

async fn get_packages_by_category(
    pool: web::Data<PgPool>,
    path: web::Path<Uuid>,
    query: web::Query<PaginationQuery>,
) -> Result<HttpResponse> {
    let category_id = path.into_inner();
    let limit = query.limit.unwrap_or(20).min(100);
    let offset = query.offset.unwrap_or(0);

    let packages = sqlx::query_as::<_, Package>(
        r#"
        SELECT p.* FROM packages p
        WHERE p.category_id = $1 AND p.is_active = true
        ORDER BY p.created_at DESC
        LIMIT $2 OFFSET $3
        "#
    )
    .bind(category_id)
    .bind(limit as i64)
    .bind(offset as i64)
    .fetch_all(pool.get_ref())
    .await;

    match packages {
        Ok(packages) => {
            let responses: Vec<PackageResponse> = packages.into_iter().map(|p| PackageResponse {
                id: p.id,
                title: p.title,
                description: p.description,
                price: p.price,
                duration_days: p.duration_days,
                max_people: p.max_people,
                category: None,
                image_url: p.image_url,
                highlights: p.highlights,
                inclusions: p.inclusions,
                exclusions: p.exclusions,
                itinerary: p.itinerary,
                is_featured: p.is_featured,
                created_at: p.created_at,
            }).collect();

            Ok(HttpResponse::Ok().json(responses))
        }
        Err(e) => {
            log::error!("Failed to fetch packages by category: {}", e);
            Ok(HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Failed to fetch packages"
            })))
        }
    }
}

#[derive(serde::Deserialize)]
struct PaginationQuery {
    limit: Option<i32>,
    offset: Option<i32>,
}
