#!/bin/bash

# Build and Deploy Script for Firebase Functions with Next.js

echo "🚀 Starting build and deploy process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf functions/.next
rm -rf functions/public

# Build Next.js app
echo "🔨 Building Next.js app..."
npm run build

# Check if build was successful
if [ ! -d ".next" ]; then
    echo "❌ Next.js build failed - .next directory not found"
    exit 1
fi

# Copy build files to functions directory
echo "📁 Copying build files to functions directory..."
cp -r .next functions/.next
cp -r public functions/public
cp flutter-kanpur-website-firebase-adminsdk.json functions/

# Ensure prerender-manifest.json exists
if [ ! -f "functions/.next/prerender-manifest.json" ]; then
    echo "📝 Creating prerender-manifest.json..."
    echo '{"version":4,"routes":{},"dynamicRoutes":{},"notFoundRoutes":[],"preview":{"previewModeId":"development","previewModeSigningKey":"development","previewModeEncryptionKey":"development"}}' > functions/.next/prerender-manifest.json
fi

# Verify files were copied
if [ ! -d "functions/.next" ]; then
    echo "❌ Failed to copy .next directory to functions"
    exit 1
fi

echo "✅ Build files copied successfully"

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy --only functions,hosting

echo "🎉 Deployment complete!"
