use actix_web::{Error, FromRequest, HttpRequest};
use actix_web::error::ErrorUnauthorized;
use std::future::{Ready, ready};
use uuid::Uuid;
use std::str::FromStr;

use crate::utils::verify_jwt;

#[derive(Debug, Clone)]
pub struct AuthenticatedUser {
    pub user_id: Uuid,
}

impl FromRequest for AuthenticatedUser {
    type Error = Error;
    type Future = Ready<Result<Self, Self::Error>>;

    fn from_request(req: &HttpRequest, _: &mut actix_web::dev::Payload) -> Self::Future {
        let auth_header = req.headers().get("Authorization");
        
        if let Some(auth_header) = auth_header {
            if let Ok(auth_str) = auth_header.to_str() {
                if auth_str.starts_with("Bearer ") {
                    let token = &auth_str[7..];
                    
                    match verify_jwt(token) {
                        Ok(claims) => {
                            if let Ok(user_id) = Uuid::from_str(&claims.sub) {
                                return ready(Ok(AuthenticatedUser { user_id }));
                            }
                        }
                        Err(e) => {
                            log::error!("JWT verification failed: {}", e);
                        }
                    }
                }
            }
        }
        
        ready(Err(ErrorUnauthorized("Invalid or missing authentication token")))
    }
}

#[derive(Debug, Clone)]
pub struct AdminOnly {
    #[allow(dead_code)]
    pub user_id: Uuid,
}

impl FromRequest for AdminOnly {
    type Error = Error;
    type Future = Ready<Result<Self, Self::Error>>;

    fn from_request(req: &HttpRequest, _: &mut actix_web::dev::Payload) -> Self::Future {
        // This is a simplified version - in production, you'd check the user's admin status from the database
        let auth_header = req.headers().get("Authorization");
        
        if let Some(auth_header) = auth_header {
            if let Ok(auth_str) = auth_header.to_str() {
                if auth_str.starts_with("Bearer ") {
                    let token = &auth_str[7..];
                    
                    match verify_jwt(token) {
                        Ok(claims) => {
                            if let Ok(user_id) = Uuid::from_str(&claims.sub) {
                                // TODO: Check if user is admin in database
                                return ready(Ok(AdminOnly { user_id }));
                            }
                        }
                        Err(e) => {
                            log::error!("JWT verification failed: {}", e);
                        }
                    }
                }
            }
        }
        
        ready(Err(ErrorUnauthorized("Admin access required")))
    }
}
