#!/bin/bash

# Step 1: Pull latest images in docker-compose.frontend.yml
echo "Step 1: Pulling latest images in docker-compose.frontend.yml"
docker-compose -f docker-compose.frontend.yml pull

# Step 2: Spin it up in the background
echo "Step 2: Starting services defined in docker-compose.frontend.yml"
docker-compose -f docker-compose.frontend.yml up -d

# Step 3: Done!
echo "Deployment is complete! Services are up and running."