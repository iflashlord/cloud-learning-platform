#!/bin/bash

# AWS Learning Game - Setup Script
# This script will help you set up the AWS-themed learning game

echo "🚀 AWS Cloud Academy - Setup Script"
echo "===================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "📋 Database Setup"
echo "=================="
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ ERROR: .env file not found!"
    echo "Please create a .env file with your DATABASE_URL"
    echo "Example:"
    echo "DATABASE_URL=postgresql://user:password@host/database"
    exit 1
else
    echo "✅ .env file found"
fi

echo ""
echo "🔄 Pushing database schema..."
npm run db:push

if [ $? -eq 0 ]; then
    echo "✅ Database schema pushed successfully"
else
    echo "❌ Failed to push database schema"
    exit 1
fi

echo ""
echo "🌱 Seeding database with AWS content..."
npm run db:seed

if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully"
else
    echo "❌ Failed to seed database"
    exit 1
fi

echo ""
echo "=========================================="
echo "🎉 Setup Complete!"
echo "=========================================="
echo ""
echo "Your AWS Learning Game is ready!"
echo ""
echo "Content includes:"
echo "  • AWS Cloud Practitioner course"
echo "  • 4 Units covering all exam domains"
echo "  • 13 Lessons with focused topics"
echo "  • 16 Quiz questions with answers"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "  • docs/getting-started-aws.md - Quick start guide"
echo "  • docs/guides/aws-transformation-guide.md - Detailed content guide"
echo "  • docs/history/transformation-summary.md - Complete summary"
echo ""
echo "Happy Learning! ☁️"
