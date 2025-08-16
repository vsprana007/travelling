import asyncio
import asyncpg
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../backend/.env')

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://username:password@localhost/webmeen_travel')

async def check_database():
    """Check database status and show record counts"""
    print("📊 Checking database status...")
    
    try:
        conn = await asyncpg.connect(DATABASE_URL)
        
        # Check table counts
        tables = ['users', 'categories', 'packages', 'bookings']
        
        print("\nTable Statistics:")
        print("-" * 40)
        
        for table in tables:
            count = await conn.fetchval(f"SELECT COUNT(*) FROM {table}")
            print(f"{table.capitalize():<15}: {count:>5} records")
        
        # Show sample data
        print("\nSample Data:")
        print("-" * 40)
        
        # Categories
        categories = await conn.fetch("SELECT name FROM categories LIMIT 3")
        print(f"Categories: {', '.join([cat['name'] for cat in categories])}")
        
        # Featured packages
        packages = await conn.fetch("SELECT title FROM packages WHERE is_featured = true LIMIT 3")
        print(f"Featured Packages: {', '.join([pkg['title'] for pkg in packages])}")
        
        # Admin users
        admins = await conn.fetch("SELECT first_name, last_name FROM users WHERE is_admin = true")
        admin_names = [f"{admin['first_name']} {admin['last_name']}" for admin in admins]
        print(f"Admin Users: {', '.join(admin_names)}")
        
        await conn.close()
        
        print("\n✅ Database check completed!")
        
    except Exception as e:
        print(f"❌ Error checking database: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(check_database())
