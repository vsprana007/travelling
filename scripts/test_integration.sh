#!/bin/bash

echo "🧪 Testing Webmeen Travel Full-Stack Integration"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test functions
test_backend() {
    echo -e "${YELLOW}Testing Backend API...${NC}"
    
    # Test health endpoint
    if curl -s http://localhost:8080/api/health > /dev/null; then
        echo -e "${GREEN}✓ Backend is running${NC}"
    else
        echo -e "${RED}✗ Backend is not responding${NC}"
        return 1
    fi
    
    # Test packages endpoint
    if curl -s http://localhost:8080/api/packages > /dev/null; then
        echo -e "${GREEN}✓ Packages API is working${NC}"
    else
        echo -e "${RED}✗ Packages API is not working${NC}"
        return 1
    fi
}

test_frontend() {
    echo -e "${YELLOW}Testing Frontend...${NC}"
    
    # Test if frontend is running
    if curl -s http://localhost:3000 > /dev/null; then
        echo -e "${GREEN}✓ Frontend is running${NC}"
    else
        echo -e "${RED}✗ Frontend is not responding${NC}"
        return 1
    fi
}

test_database() {
    echo -e "${YELLOW}Testing Database Connection...${NC}"
    
    # Test database connection (requires psql)
    if command -v psql &> /dev/null; then
        if psql -d webmeen_travel -c "SELECT COUNT(*) FROM users;" > /dev/null 2>&1; then
            echo -e "${GREEN}✓ Database connection is working${NC}"
        else
            echo -e "${RED}✗ Database connection failed${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠ psql not found, skipping database test${NC}"
    fi
}

# Run tests
echo "Starting integration tests..."
echo ""

test_backend
backend_status=$?

test_frontend  
frontend_status=$?

test_database
database_status=$?

echo ""
echo "================================================"
echo "🧪 Integration Test Results"
echo "================================================"

if [ $backend_status -eq 0 ] && [ $frontend_status -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed! Full-stack integration is working.${NC}"
    echo ""
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8080/api"
    echo "👤 Admin Panel: http://localhost:3000/admin"
    echo ""
    echo "Test credentials:"
    echo "Admin: admin@webmeentravel.com / admin123"
    echo "User: user@example.com / user123"
else
    echo -e "${RED}❌ Some tests failed. Please check the setup.${NC}"
    exit 1
fi
