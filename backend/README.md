# Webmeen Travel Backend

A robust REST API built with Actix Web and PostgreSQL for the Webmeen Travel website.

## Features

- User authentication with JWT tokens
- Travel package management
- Booking system
- Admin dashboard APIs
- PostgreSQL database with migrations
- CORS support for frontend integration

## Setup

1. Install Rust and PostgreSQL
2. Copy `.env.example` to `.env` and configure your database
3. Run migrations: `sqlx migrate run`
4. Start the server: `cargo run`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Packages
- `GET /api/packages` - List all packages
- `GET /api/packages/featured` - Get featured packages
- `GET /api/packages/:id` - Get package details

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings

### Admin
- `GET /api/admin/users` - List all users
- `POST /api/admin/packages` - Create package
- `PUT /api/admin/packages/:id` - Update package
- `DELETE /api/admin/packages/:id` - Delete package

## Database Schema

The database includes tables for:
- Users (authentication and profiles)
- Categories (travel package categories)
- Packages (travel packages with details)
- Bookings (user bookings and reservations)
