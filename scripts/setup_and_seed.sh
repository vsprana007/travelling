#!/bin/bash

echo "🚀 Setting up Webmeen Travel Database"
echo "======================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is required but not installed."
    exit 1
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

# Check if .env file exists in backend directory
if [ ! -f "../backend/.env" ]; then
    echo "⚠️  .env file not found in backend directory."
    echo "Please create ../backend/.env with your DATABASE_URL"
    echo "Example: DATABASE_URL=postgresql://username:password@localhost/webmeen_travel"
    exit 1
fi

# Reset database (optional)
read -p "🔄 Do you want to reset the database first? (y/N): " reset_db
if [[ $reset_db =~ ^[Yy]$ ]]; then
    echo "Resetting database..."
    python3 reset_database.py
fi

# Seed database
echo "🌱 Seeding database with sample data..."
python3 seed_database.py

# Check database status
echo "📊 Checking database status..."
python3 check_database.py

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "You can now:"
echo "1. Start the backend server: cd ../backend && cargo run"
echo "2. Start the frontend: npm run dev"
echo "3. Login with admin credentials:"
echo "   Email: admin@webmeentravel.com"
echo "   Password: admin123"
