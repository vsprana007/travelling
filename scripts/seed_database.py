import asyncio
import asyncpg
import json
from datetime import datetime, timedelta
import uuid
from typing import List, Dict, Any
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../backend/.env')

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://username:password@localhost/webmeen_travel')

# Sample data
CATEGORIES = [
    {
        'name': 'Domestic Tours',
        'description': 'Explore the incredible diversity of India with our domestic travel packages',
        'icon': 'map-pin'
    },
    {
        'name': 'International Tours',
        'description': 'Discover amazing destinations around the world',
        'icon': 'globe'
    },
    {
        'name': 'Adventure Tours',
        'description': 'Thrilling adventures for the bold and adventurous',
        'icon': 'mountain'
    },
    {
        'name': 'Cultural Tours',
        'description': 'Immerse yourself in rich cultures and traditions',
        'icon': 'camera'
    },
    {
        'name': 'Beach Holidays',
        'description': 'Relax and unwind at pristine beaches',
        'icon': 'sun'
    },
    {
        'name': 'Pilgrimage Tours',
        'description': 'Spiritual journeys to sacred destinations',
        'icon': 'heart'
    },
    {
        'name': 'MICE Tours',
        'description': 'Meetings, Incentives, Conferences & Events',
        'icon': 'briefcase'
    }
]

PACKAGES = [
    {
        'title': 'Golden Triangle - Delhi, Agra & Jaipur',
        'description': 'Experience India\'s most iconic destinations in this classic 6-day journey through Delhi, Agra, and Jaipur. Visit the magnificent Taj Mahal, explore the bustling streets of Old Delhi, and discover the royal heritage of the Pink City.',
        'price': 25000,
        'duration_days': 6,
        'max_people': 15,
        'category': 'Domestic Tours',
        'image_url': '/placeholder.svg?height=400&width=600',
        'highlights': [
            'Visit the iconic Taj Mahal at sunrise',
            'Explore Red Fort and Jama Masjid in Delhi',
            'Discover Amber Fort and City Palace in Jaipur',
            'Experience local markets and cuisine',
            'Professional guide throughout the journey'
        ],
        'inclusions': [
            'Accommodation in 4-star hotels',
            'All meals (breakfast, lunch, dinner)',
            'Private AC transportation',
            'Professional English-speaking guide',
            'All monument entrance fees',
            'Airport transfers'
        ],
        'exclusions': [
            'International flights',
            'Personal expenses',
            'Tips and gratuities',
            'Travel insurance',
            'Alcoholic beverages'
        ],
        'itinerary': {
            'day1': 'Arrival in Delhi - Check-in and city orientation',
            'day2': 'Delhi sightseeing - Red Fort, India Gate, Lotus Temple',
            'day3': 'Delhi to Agra - Visit Taj Mahal and Agra Fort',
            'day4': 'Agra to Jaipur via Fatehpur Sikri',
            'day5': 'Jaipur sightseeing - Amber Fort, City Palace, Hawa Mahal',
            'day6': 'Departure from Jaipur'
        },
        'is_featured': True
    },
    {
        'title': 'Kerala Backwaters & Hill Stations',
        'description': 'Discover God\'s Own Country with this enchanting 8-day tour covering the serene backwaters of Alleppey, the hill station of Munnar, and the cultural richness of Kochi.',
        'price': 32000,
        'duration_days': 8,
        'max_people': 12,
        'category': 'Domestic Tours',
        'image_url': '/placeholder.svg?height=400&width=600',
        'highlights': [
            'Houseboat stay in Alleppey backwaters',
            'Tea plantation tours in Munnar',
            'Kathakali dance performance in Kochi',
            'Spice plantation visit',
            'Ayurvedic massage session'
        ],
        'inclusions': [
            'Accommodation including houseboat',
            'All meals with local Kerala cuisine',
            'Private transportation',
            'Guided tours and activities',
            'Cultural performances',
            'Airport transfers'
        ],
        'exclusions': [
            'Flights to/from Kerala',
            'Personal shopping',
            'Additional activities',
            'Travel insurance',
            'Laundry services'
        ],
        'itinerary': {
            'day1': 'Arrival in Kochi - Fort Kochi exploration',
            'day2': 'Kochi to Munnar - Tea plantation visit',
            'day3': 'Munnar sightseeing - Eravikulam National Park',
            'day4': 'Munnar to Thekkady - Spice plantation tour',
            'day5': 'Thekkady to Alleppey - Houseboat check-in',
            'day6': 'Backwater cruise and village visits',
            'day7': 'Alleppey to Kochi - Cultural performances',
            'day8': 'Departure from Kochi'
        },
        'is_featured': True
    },
    {
        'title': 'Rajasthan Royal Heritage Tour',
        'description': 'Step into the world of maharajas with this 10-day royal journey through Rajasthan, covering Udaipur, Jodhpur, Jaisalmer, and Pushkar.',
        'price': 45000,
        'duration_days': 10,
        'max_people': 10,
        'category': 'Cultural Tours',
        'image_url': '/placeholder.svg?height=400&width=600',
        'highlights': [
            'Stay in heritage palace hotels',
            'Camel safari in Thar Desert',
            'Boat ride on Lake Pichola',
            'Visit to Mehrangarh Fort',
            'Traditional Rajasthani cultural shows'
        ],
        'inclusions': [
            'Heritage hotel accommodations',
            'All meals with Rajasthani cuisine',
            'Private AC vehicle with driver',
            'Professional guide',
            'Camel safari and cultural shows',
            'All entrance fees'
        ],
        'exclusions': [
            'Flights',
            'Personal expenses',
            'Camera fees at monuments',
            'Travel insurance',
            'Tips for guide and driver'
        ],
        'itinerary': {
            'day1': 'Arrival in Udaipur - City of Lakes',
            'day2': 'Udaipur sightseeing - City Palace, Jagdish Temple',
            'day3': 'Udaipur to Jodhpur - Blue City exploration',
            'day4': 'Jodhpur - Mehrangarh Fort and local markets',
            'day5': 'Jodhpur to Jaisalmer - Golden City',
            'day6': 'Jaisalmer - Fort and Havelis tour',
            'day7': 'Desert safari and overnight camping',
            'day8': 'Jaisalmer to Pushkar - Holy city',
            'day9': 'Pushkar sightseeing and cultural immersion',
            'day10': 'Departure'
        },
        'is_featured': True
    },
    {
        'title': 'Himalayan Adventure - Manali & Leh',
        'description': 'Embark on an epic 12-day adventure through the mighty Himalayas, from the valleys of Manali to the high-altitude desert of Ladakh.',
        'price': 55000,
        'duration_days': 12,
        'max_people': 8,
        'category': 'Adventure Tours',
        'image_url': '/placeholder.svg?height=400&width=600',
        'highlights': [
            'Drive through world\'s highest motorable passes',
            'Visit ancient monasteries in Ladakh',
            'River rafting in Zanskar River',
            'Camping under starlit skies',
            'Interaction with local communities'
        ],
        'inclusions': [
            'Accommodation in hotels and camps',
            'All meals during the tour',
            'Specialized adventure vehicle',
            'Professional mountain guide',
            'Adventure activities and permits',
            'Emergency medical kit'
        ],
        'exclusions': [
            'Flights to/from Manali or Leh',
            'Personal adventure gear',
            'Travel and medical insurance',
            'Personal expenses',
            'Emergency evacuation costs'
        ],
        'itinerary': {
            'day1': 'Arrival in Manali - Acclimatization',
            'day2': 'Manali local sightseeing',
            'day3': 'Manali to Keylong via Rohtang Pass',
            'day4': 'Keylong to Leh via Baralacha La',
            'day5': 'Leh - Rest and acclimatization',
            'day6': 'Leh sightseeing - Monasteries and palaces',
            'day7': 'Leh to Nubra Valley via Khardung La',
            'day8': 'Nubra Valley - Camel safari and camping',
            'day9': 'Nubra to Pangong Lake',
            'day10': 'Pangong Lake to Leh',
            'day11': 'Leh - Leisure day and shopping',
            'day12': 'Departure from Leh'
        },
        'is_featured': False
    },
    {
        'title': 'Goa Beach Paradise',
        'description': 'Relax and rejuvenate in this 5-day beach holiday covering North and South Goa\'s pristine beaches, vibrant nightlife, and Portuguese heritage.',
        'price': 18000,
        'duration_days': 5,
        'max_people': 20,
        'category': 'Beach Holidays',
        'image_url': '/placeholder.svg?height=400&width=600',
        'highlights': [
            'Visit famous beaches - Baga, Calangute, Anjuna',
            'Explore Old Goa churches and heritage',
            'Sunset cruise on Mandovi River',
            'Water sports activities',
            'Authentic Goan cuisine experiences'
        ],
        'inclusions': [
            'Beach resort accommodation',
            'Daily breakfast and dinner',
            'Airport transfers',
            'Sightseeing tours',
            'Sunset cruise',
            'Basic water sports'
        ],
        'exclusions': [
            'Flights',
            'Lunch and beverages',
            'Premium water sports',
            'Personal expenses',
            'Travel insurance'
        ],
        'itinerary': {
            'day1': 'Arrival and North Goa beaches',
            'day2': 'Old Goa heritage tour and river cruise',
            'day3': 'South Goa beaches and relaxation',
            'day4': 'Water sports and beach activities',
            'day5': 'Departure'
        },
        'is_featured': False
    },
    {
        'title': 'Thailand Explorer - Bangkok & Phuket',
        'description': 'Discover the Land of Smiles with this 7-day international tour covering the bustling capital Bangkok and the tropical paradise of Phuket.',
        'price': 65000,
        'duration_days': 7,
        'max_people': 15,
        'category': 'International Tours',
        'image_url': '/placeholder.svg?height=400&width=600',
        'highlights': [
            'Visit Grand Palace and Wat Pho in Bangkok',
            'Floating market experience',
            'Island hopping in Phuket',
            'Thai cooking class',
            'Traditional Thai massage'
        ],
        'inclusions': [
            'International flights',
            '4-star hotel accommodation',
            'Daily breakfast and select meals',
            'Private transfers and tours',
            'English-speaking guide',
            'Island hopping tour'
        ],
        'exclusions': [
            'Visa fees',
            'Travel insurance',
            'Personal expenses',
            'Optional activities',
            'Tips and gratuities'
        ],
        'itinerary': {
            'day1': 'Arrival in Bangkok - Temple tours',
            'day2': 'Bangkok city tour and floating market',
            'day3': 'Bangkok to Phuket - Beach relaxation',
            'day4': 'Phi Phi Islands day trip',
            'day5': 'Phuket sightseeing and cultural shows',
            'day6': 'Beach day and spa treatments',
            'day7': 'Departure'
        },
        'is_featured': True
    },
    {
        'title': 'Char Dham Yatra - Sacred Pilgrimage',
        'description': 'Embark on the most sacred pilgrimage in Hinduism, visiting the four holy shrines of Yamunotri, Gangotri, Kedarnath, and Badrinath.',
        'price': 38000,
        'duration_days': 11,
        'max_people': 25,
        'category': 'Pilgrimage Tours',
        'image_url': '/placeholder.svg?height=400&width=600',
        'highlights': [
            'Visit all four sacred Dhams',
            'Helicopter service to Kedarnath',
            'Spiritual discourses and prayers',
            'Scenic Himalayan landscapes',
            'Comfortable accommodation throughout'
        ],
        'inclusions': [
            'Accommodation in dharamshalas and hotels',
            'All vegetarian meals',
            'Transportation including helicopter',
            'Experienced pilgrimage guide',
            'All darshan arrangements',
            'Medical support'
        ],
        'exclusions': [
            'Personal expenses',
            'Additional helicopter rides',
            'Travel insurance',
            'Donations at temples',
            'Porter charges'
        ],
        'itinerary': {
            'day1': 'Arrival in Haridwar - Ganga Aarti',
            'day2': 'Haridwar to Barkot - Yamunotri preparation',
            'day3': 'Yamunotri Darshan',
            'day4': 'Barkot to Uttarkashi - Gangotri preparation',
            'day5': 'Gangotri Darshan',
            'day6': 'Uttarkashi to Guptkashi',
            'day7': 'Kedarnath Darshan by helicopter',
            'day8': 'Guptkashi to Badrinath',
            'day9': 'Badrinath Darshan and local sightseeing',
            'day10': 'Badrinath to Haridwar',
            'day11': 'Departure from Haridwar'
        },
        'is_featured': False
    },
    {
        'title': 'Corporate Retreat - Jim Corbett',
        'description': 'Perfect corporate getaway combining team building activities with wildlife safari in India\'s oldest national park.',
        'price': 22000,
        'duration_days': 3,
        'max_people': 50,
        'category': 'MICE Tours',
        'image_url': '/placeholder.svg?height=400&width=600',
        'highlights': [
            'Wildlife safari in Jim Corbett',
            'Team building activities',
            'Conference facilities',
            'Adventure sports',
            'Bonfire and cultural evening'
        ],
        'inclusions': [
            'Resort accommodation',
            'All meals and refreshments',
            'Conference hall and equipment',
            'Safari and adventure activities',
            'Team building facilitator',
            'Transportation from Delhi'
        ],
        'exclusions': [
            'Personal expenses',
            'Alcoholic beverages',
            'Additional activities',
            'Travel insurance',
            'Laundry services'
        ],
        'itinerary': {
            'day1': 'Arrival and team building activities',
            'day2': 'Wildlife safari and conference sessions',
            'day3': 'Adventure activities and departure'
        },
        'is_featured': False
    }
]

USERS = [
    {
        'email': 'admin@webmeentravel.com',
        'password': 'admin123',
        'first_name': 'Admin',
        'last_name': 'User',
        'phone': '+91-9876543210',
        'is_admin': True
    },
    {
        'email': 'john.doe@example.com',
        'password': 'password123',
        'first_name': 'John',
        'last_name': 'Doe',
        'phone': '+91-9876543211',
        'is_admin': False
    },
    {
        'email': 'jane.smith@example.com',
        'password': 'password123',
        'first_name': 'Jane',
        'last_name': 'Smith',
        'phone': '+91-9876543212',
        'is_admin': False
    },
    {
        'email': 'mike.johnson@example.com',
        'password': 'password123',
        'first_name': 'Mike',
        'last_name': 'Johnson',
        'phone': '+91-9876543213',
        'is_admin': False
    },
    {
        'email': 'sarah.wilson@example.com',
        'password': 'password123',
        'first_name': 'Sarah',
        'last_name': 'Wilson',
        'phone': '+91-9876543214',
        'is_admin': False
    }
]

async def hash_password(password: str) -> str:
    """Simple password hashing for demo purposes"""
    import hashlib
    return hashlib.sha256(password.encode()).hexdigest()

async def seed_categories(conn):
    """Seed categories table"""
    print("Seeding categories...")
    
    for category in CATEGORIES:
        category_id = str(uuid.uuid4())
        await conn.execute("""
            INSERT INTO categories (id, name, description, icon, is_active, created_at, updated_at)
            VALUES ($1, $2, $3, $4, true, NOW(), NOW())
            ON CONFLICT (name) DO NOTHING
        """, category_id, category['name'], category['description'], category['icon'])
    
    print(f"✓ Seeded {len(CATEGORIES)} categories")

async def seed_users(conn):
    """Seed users table"""
    print("Seeding users...")
    
    for user in USERS:
        user_id = str(uuid.uuid4())
        password_hash = await hash_password(user['password'])
        
        await conn.execute("""
            INSERT INTO users (id, email, password_hash, first_name, last_name, phone, is_admin, is_active, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW(), NOW())
            ON CONFLICT (email) DO NOTHING
        """, user_id, user['email'], password_hash, user['first_name'], user['last_name'], 
            user['phone'], user['is_admin'])
    
    print(f"✓ Seeded {len(USERS)} users")

async def seed_packages(conn):
    """Seed packages table"""
    print("Seeding packages...")
    
    # Get category IDs
    categories = await conn.fetch("SELECT id, name FROM categories")
    category_map = {cat['name']: cat['id'] for cat in categories}
    
    for package in PACKAGES:
        package_id = str(uuid.uuid4())
        category_id = category_map.get(package['category'])
        
        if not category_id:
            print(f"Warning: Category '{package['category']}' not found for package '{package['title']}'")
            continue
        
        await conn.execute("""
            INSERT INTO packages (
                id, title, description, price, duration_days, max_people, category_id,
                image_url, highlights, inclusions, exclusions, itinerary, is_featured,
                is_active, created_at, updated_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, true, NOW(), NOW())
        """, package_id, package['title'], package['description'], package['price'],
            package['duration_days'], package['max_people'], category_id,
            package['image_url'], package['highlights'], package['inclusions'],
            package['exclusions'], json.dumps(package['itinerary']), package['is_featured'])
    
    print(f"✓ Seeded {len(PACKAGES)} packages")

async def seed_sample_bookings(conn):
    """Seed sample bookings"""
    print("Seeding sample bookings...")
    
    # Get user and package IDs
    users = await conn.fetch("SELECT id FROM users WHERE is_admin = false LIMIT 3")
    packages = await conn.fetch("SELECT id, price FROM packages LIMIT 5")
    
    if not users or not packages:
        print("Warning: No users or packages found for creating sample bookings")
        return
    
    booking_statuses = ['confirmed', 'pending', 'cancelled', 'completed']
    
    for i in range(10):  # Create 10 sample bookings
        booking_id = str(uuid.uuid4())
        user_id = users[i % len(users)]['id']
        package = packages[i % len(packages)]
        package_id = package['id']
        
        # Random booking date in the next 3 months
        booking_date = datetime.now().date() + timedelta(days=30 + (i * 10))
        number_of_people = 2 + (i % 4)  # 2-5 people
        total_amount = package['price'] * number_of_people
        status = booking_statuses[i % len(booking_statuses)]
        
        special_requests = [
            "Vegetarian meals preferred",
            "Need wheelchair accessibility",
            "Celebrating anniversary",
            "First time travelers",
            "Photography enthusiasts"
        ]
        
        await conn.execute("""
            INSERT INTO bookings (
                id, user_id, package_id, booking_date, number_of_people,
                total_amount, status, special_requests, created_at, updated_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        """, booking_id, user_id, package_id, booking_date, number_of_people,
            total_amount, status, special_requests[i % len(special_requests)])
    
    print("✓ Seeded 10 sample bookings")

async def main():
    """Main seeding function"""
    print("🌱 Starting database seeding...")
    print(f"Connecting to: {DATABASE_URL}")
    
    try:
        conn = await asyncpg.connect(DATABASE_URL)
        
        # Seed in order due to foreign key constraints
        await seed_categories(conn)
        await seed_users(conn)
        await seed_packages(conn)
        await seed_sample_bookings(conn)
        
        await conn.close()
        
        print("\n🎉 Database seeding completed successfully!")
        print("\nDefault admin credentials:")
        print("Email: admin@webmeentravel.com")
        print("Password: admin123")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(main())
