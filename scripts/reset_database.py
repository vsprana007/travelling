import asyncio
import asyncpg
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../backend/.env')

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://username:password@localhost/webmeen_travel')

async def reset_database():
    """Reset database by truncating all tables"""
    print("🔄 Resetting database...")
    
    try:
        conn = await asyncpg.connect(DATABASE_URL)
        
        # Disable foreign key checks temporarily
        await conn.execute("SET session_replication_role = replica;")
        
        # Truncate all tables in reverse order of dependencies
        tables = ['bookings', 'packages', 'categories', 'users']
        
        for table in tables:
            await conn.execute(f"TRUNCATE TABLE {table} RESTART IDENTITY CASCADE;")
            print(f"✓ Truncated {table} table")
        
        # Re-enable foreign key checks
        await conn.execute("SET session_replication_role = DEFAULT;")
        
        await conn.close()
        
        print("✅ Database reset completed successfully!")
        
    except Exception as e:
        print(f"❌ Error resetting database: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(reset_database())
