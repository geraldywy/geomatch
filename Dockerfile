# Use an official Node.js runtime as the base image
FROM node:14

RUN --mount=type=secret,REACT_APP_GOOGLE_MAPS_API_KEY=gmaps_api_key,REACT_APP_API_URL=api_url

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port (usually 80 for web apps)
EXPOSE 3000

# Start the React app when the container runs
CMD [ "npm", "start" ]
