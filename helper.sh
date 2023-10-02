#!/bin/bash

# Step 1: Stop and remove existing containers defined in docker-compose.dev.yml
echo "Step 1: Stopping and removing containers defined in docker-compose.dev.yml"
docker-compose -f docker-compose.dev.yml down

# Step 2: Pull latest images in docker-compose.dev.yml
echo "Step 2: Pulling latest images in docker-compose.dev.yml"
docker-compose -f docker-compose.dev.yml pull

# Step 3: Spin it up in the background
echo "Step 3: Starting services defined in docker-compose.dev.yml"
docker-compose -f docker-compose.dev.yml up -d

# Step 4: Stop and remove existing containers defined in docker-compose.frontend.yml
echo "Step 4: Stopping and removing containers defined in docker-compose.frontend.yml"
docker-compose -f docker-compose.frontend.yml down

# Step 5: Pull latest images in docker-compose.frontend.yml
echo "Step 5: Pulling latest images in docker-compose.frontend.yml"
docker-compose -f docker-compose.frontend.yml pull

# Step 6: Spin it up in the background
echo "Step 6: Starting services defined in docker-compose.frontend.yml"
docker-compose -f docker-compose.frontend.yml up -d

# Step 7: Done!
echo "Deployment is complete! Services are up and running."
