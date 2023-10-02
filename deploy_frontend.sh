#!/bin/bash

# Step 1: Pull latest images in docker-compose.frontend.yml
echo "Step 1: tear down docker-compose.frontend.yml"
docker-compose -f docker-compose.frontend.yml down

# Step 2: Pull latest images in docker-compose.frontend.yml
echo "Step 2: Pulling latest images in docker-compose.frontend.yml"
docker-compose -f docker-compose.frontend.yml pull

# Step 3: Spin it up in the background
echo "Step 3: Starting services defined in docker-compose.frontend.yml"
docker-compose -f docker-compose.frontend.yml up -d

# Step 4: Done!
echo "Frontend Deployment is complete! Services are up and running."

# Step 5: Cleanup!
docker image prune -af