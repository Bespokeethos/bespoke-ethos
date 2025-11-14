#!/bin/bash

# Test Endpoints Script for Bespoke Ethos
# This script tests the contact and newsletter API endpoints locally

echo "================================"
echo "Testing Bespoke Ethos API Routes"
echo "================================"
echo ""

# Check if dev server is running
echo "Checking if dev server is running on localhost:3000..."
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Error: Dev server is not running."
    echo "Please run 'pnpm dev' in the bespoke-ethos directory first."
    exit 1
fi
echo "✅ Dev server is running."
echo ""

# Test Contact API
echo "Testing Contact API..."
echo "Sending POST request to /api/contact..."
CONTACT_RESPONSE=$(curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "useCase": "Testing the API",
    "budget": "$1k-$3k",
    "timeline": "ASAP",
    "message": "This is a test message from the curl script.",
    "consent": true,
    "turnstileToken": "SKIP_FOR_LOCAL_TEST"
  }')

echo "Response: $CONTACT_RESPONSE"
echo ""

# Test Newsletter API
echo "Testing Newsletter API..."
echo "Sending POST request to /api/newsletter..."
NEWSLETTER_RESPONSE=$(curl -s -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newsletter-test@example.com"
  }')

echo "Response: $NEWSLETTER_RESPONSE"
echo ""

echo "================================"
echo "Testing Complete"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Check your terminal running 'pnpm dev' for server logs"
echo "2. Check your Airtable base for new records"
echo "3. Check contact@bespokeethos.com for the test email"
