#!/bin/bash

# Exit on error
set -e

echo "🚀 Deploying Elnis website..."

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull

# Build and start the containers
echo "🏗️ Building and starting containers..."
docker-compose -f docker-compose.prod.yml up -d --build

echo "✅ Deployment complete!"
echo "🌐 Your application should be running at http://localhost:3000" 