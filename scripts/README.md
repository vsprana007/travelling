# Database Setup Scripts

This directory contains Python scripts to set up and manage the Webmeen Travel database.

## Prerequisites

- Python 3.7+
- PostgreSQL database
- Backend `.env` file configured with `DATABASE_URL`

## Scripts

### 1. `seed_database.py`
Populates the database with sample data including:
- 7 travel categories (Domestic, International, Adventure, etc.)
- 8 sample travel packages with detailed information
- 5 sample users (including 1 admin)
- 10 sample bookings

### 2. `reset_database.py`
Clears all data from the database tables while preserving the schema.

### 3. `check_database.py`
Displays database statistics and sample data for verification.

### 4. `setup_and_seed.sh`
Automated setup script that:
- Installs Python dependencies
- Optionally resets the database
- Seeds with sample data
- Verifies the setup

## Usage

### Quick Setup
\`\`\`bash
chmod +x setup_and_seed.sh
./setup_and_seed.sh
\`\`\`

### Manual Setup
\`\`\`bash
# Install dependencies
pip3 install -r requirements.txt

# Seed database
python3 seed_database.py

# Check status
python3 check_database.py
\`\`\`

## Sample Data

### Admin Credentials
- **Email**: admin@webmeentravel.com
- **Password**: admin123

### Sample Packages
- Golden Triangle (Delhi, Agra, Jaipur)
- Kerala Backwaters & Hill Stations
- Rajasthan Royal Heritage Tour
- Himalayan Adventure (Manali & Leh)
- Thailand Explorer
- And more...

### Categories
- Domestic Tours
- International Tours
- Adventure Tours
- Cultural Tours
- Beach Holidays
- Pilgrimage Tours
- MICE Tours

## Environment Variables

Ensure your `../backend/.env` file contains:
\`\`\`
DATABASE_URL=postgresql://username:password@localhost/webmeen_travel
\`\`\`

## Troubleshooting

1. **Connection Error**: Verify PostgreSQL is running and DATABASE_URL is correct
2. **Permission Error**: Ensure database user has CREATE/INSERT permissions
3. **Module Not Found**: Run `pip3 install -r requirements.txt`

## Database Schema

The scripts work with the following tables:
- `users` - User accounts and authentication
- `categories` - Travel package categories
- `packages` - Travel packages with details
- `bookings` - User bookings and reservations
