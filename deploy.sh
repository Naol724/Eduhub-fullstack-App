#!/bin/bash

# EduHub Deployment Script
# This script prepares the project for deployment without database

echo "🎓 EduHub Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the client directory"
    exit 1
fi

# Create backup of original files
echo "📦 Creating backup of original files..."
cp package.json package.json.backup 2>/dev/null || true
cp ../package.json ../package.json.backup 2>/dev/null || true

# Use deployment configuration
echo "⚙️  Applying deployment configuration..."
if [ -f "package.json.deployment" ]; then
    cp package.json.deployment package.json
    echo "✅ Using deployment package.json"
fi

if [ -f ".env.deployment" ]; then
    cp .env.deployment .env.production
    echo "✅ Using deployment environment"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📚 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Build files are in the 'build' directory"
    echo ""
    echo "🚀 Ready for deployment!"
    echo ""
    echo "Deploy to:"
    echo "  • Vercel: vercel --prod"
    echo "  • Netlify: netlify deploy --prod --dir=build"
    echo "  • GitHub Pages: git subtree push --prefix build origin gh-pages"
    echo ""
    echo "📖 For detailed instructions, see DEPLOYMENT.md"
else
    echo "❌ Build failed!"
    echo "Please check the error messages above"
    exit 1
fi

# Restore original files (optional)
read -p "🔄 Restore original package.json? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    cp package.json.backup package.json 2>/dev/null || true
    echo "✅ Original package.json restored"
fi

echo "🎉 Deployment preparation complete!"
