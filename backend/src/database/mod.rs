use sqlx::PgPool;
use uuid::Uuid;
use crate::models::*;

#[allow(dead_code)]
pub struct Database {
    pool: PgPool,
}

#[allow(dead_code)]
impl Database {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }

    // User operations
    pub async fn create_user(&self, user: CreateUserRequest, password_hash: String) -> Result<User, sqlx::Error> {
        let user_id = Uuid::new_v4();
        let now = chrono::Utc::now();

        sqlx::query_as::<_, User>(
            r#"
            INSERT INTO users (id, email, password_hash, first_name, last_name, phone, is_admin, is_active, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, false, true, $7, $8)
            RETURNING *
            "#
        )
        .bind(user_id)
        .bind(&user.email)
        .bind(&password_hash)
        .bind(&user.first_name)
        .bind(&user.last_name)
        .bind(&user.phone)
        .bind(now)
        .bind(now)
        .fetch_one(&self.pool)
        .await
    }

    pub async fn get_user_by_email(&self, email: &str) -> Result<Option<User>, sqlx::Error> {
        sqlx::query_as::<_, User>(
            "SELECT * FROM users WHERE email = $1 AND is_active = true"
        )
        .bind(email)
        .fetch_optional(&self.pool)
        .await
    }

    pub async fn get_user_by_id(&self, user_id: Uuid) -> Result<Option<User>, sqlx::Error> {
        sqlx::query_as::<_, User>(
            "SELECT * FROM users WHERE id = $1 AND is_active = true"
        )
        .bind(user_id)
        .fetch_optional(&self.pool)
        .await
    }

    // Package operations
    pub async fn get_packages(&self, limit: Option<i64>, offset: Option<i64>) -> Result<Vec<Package>, sqlx::Error> {
        let limit = limit.unwrap_or(20);
        let offset = offset.unwrap_or(0);

        sqlx::query_as::<_, Package>(
            "SELECT * FROM packages WHERE is_active = true ORDER BY created_at DESC LIMIT $1 OFFSET $2"
        )
        .bind(limit)
        .bind(offset)
        .fetch_all(&self.pool)
        .await
    }

    pub async fn get_featured_packages(&self) -> Result<Vec<Package>, sqlx::Error> {
        sqlx::query_as::<_, Package>(
            "SELECT * FROM packages WHERE is_active = true AND is_featured = true ORDER BY created_at DESC"
        )
        .fetch_all(&self.pool)
        .await
    }

    pub async fn get_package_by_id(&self, package_id: Uuid) -> Result<Option<Package>, sqlx::Error> {
        sqlx::query_as::<_, Package>(
            "SELECT * FROM packages WHERE id = $1 AND is_active = true"
        )
        .bind(package_id)
        .fetch_optional(&self.pool)
        .await
    }
}
