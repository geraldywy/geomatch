# Use an official Node.js runtime as the base image
FROM node:14

RUN --mount=type=secret,id=gmaps_api_key

RUN gmaps_api_key_sec=$(cat /run/secrets/gmaps_api_key) \
export REACT_APP_GOOGLE_MAPS_API_KEY=gmaps_api_key_sec

RUN --mount=type=secret,id=api_url

RUN api_url_sec=$(cat /run/secrets/api_url) \
export REACT_APP_API_URL=api_url_sec

RUN cat REACT_APP_API_URL

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
