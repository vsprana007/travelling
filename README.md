# Webmeen Travel - Full-Stack Travel Website

A complete travel booking platform built with Next.js frontend and Actix Web (Rust) backend with PostgreSQL database.

## 🚀 Features

- **Frontend (Next.js 14)**
  - Modern responsive design with Tailwind CSS
  - User authentication (login/register)
  - Travel package browsing and booking
  - Admin dashboard for complete database management
  - SEO optimized with metadata and structured data

- **Backend (Actix Web + Rust)**
  - RESTful API with JWT authentication
  - PostgreSQL database with comprehensive schema
  - Admin endpoints for managing all data
  - CORS enabled for frontend integration
  - Secure password hashing with bcrypt

- **Database (PostgreSQL)**
  - Users, packages, categories, bookings tables
  - Proper relationships and constraints
  - Seeding scripts with sample data
  - Migration support

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Rust 1.70+ and Cargo
- PostgreSQL 14+
- Git

## 🛠️ Setup Instructions

### 1. Clone and Install Frontend Dependencies

\`\`\`bash
# Install frontend dependencies
npm install
# or
yarn install
\`\`\`

### 2. Setup PostgreSQL Database

\`\`\`bash
# Create database
createdb webmeen_travel

# Set environment variables (create .env.local in root)
NEXT_PUBLIC_API_URL=http://localhost:8080/api
\`\`\`

### 3. Setup and Run Backend

\`\`\`bash
# Navigate to backend directory
cd backend

# Create .env file with database configuration
echo "DATABASE_URL=postgresql://username:password@localhost/webmeen_travel" > .env
echo "JWT_SECRET=your-super-secret-jwt-key-here" >> .env
echo "RUST_LOG=debug" >> .env

# Install dependencies and run
cargo run
\`\`\`

The backend will start on `http://localhost:8080`

### 4. Seed Database with Sample Data

\`\`\`bash
# Install Python dependencies for seeding
cd scripts
pip install -r requirements.txt

# Run database seeding
python seed_database.py
\`\`\`

### 5. Run Frontend Development Server

\`\`\`bash
# In root directory
npm run dev
# or
yarn dev
\`\`\`

The frontend will start on `http://localhost:3000`

## 🧪 Testing the Integration

### Manual Testing Checklist

1. **Frontend Loads**: Visit `http://localhost:3000`
2. **API Connection**: Check if featured packages load from backend
3. **User Registration**: Create a new account at `/auth/register`
4. **User Login**: Login at `/auth/login`
5. **Admin Access**: Login with admin credentials and visit `/admin`
6. **Package Management**: Create/edit packages in admin dashboard
7. **User Management**: View and manage users in admin panel

### Test Credentials

After running the seeding script, use these credentials:

**Admin User:**
- Email: `admin@webmeentravel.com`
- Password: `admin123`

**Regular User:**
- Email: `user@example.com`
- Password: `user123`

## 📁 Project Structure

\`\`\`
webmeen-travel/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   └── ...
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...
├── backend/              # Rust Actix Web backend
│   ├── src/
│   │   ├── handlers/     # API route handlers
│   │   ├── models/       # Database models
│   │   ├── middleware/   # Custom middleware
│   │   └── ...
│   └── Cargo.toml
├── scripts/              # Database seeding scripts
└── ...
\`\`\`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Packages
- `GET /api/packages` - List packages (with filters)
- `GET /api/packages/:id` - Get package details
- `POST /api/packages` - Create package (admin)
- `PUT /api/packages/:id` - Update package (admin)
- `DELETE /api/packages/:id` - Delete package (admin)

### Admin
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id` - Update user
- `GET /api/admin/bookings` - List all bookings
- `PUT /api/admin/bookings/:id` - Update booking status

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.com/api`

### Backend (Railway/Heroku)
1. Set environment variables:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `JWT_SECRET`
   - `PORT=8080`
2. Deploy using platform-specific instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
