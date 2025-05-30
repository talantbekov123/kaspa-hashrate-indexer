# Use lightweight Node.js image
FROM node:20-slim

# Install PostgreSQL and curl
RUN apt-get update && \
    apt-get install -y postgresql postgresql-contrib curl && \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Optional build arguments with defaults
ARG PORT=3000
ARG DB_HOST=localhost
ARG DB_PORT=5432
ARG DB_USER=postgres
ARG DB_PASSWORD=123
ARG DB_NAME=kaspa_hashrate

# Environment variables
ENV PORT=$PORT \
    DB_HOST=$DB_HOST \
    DB_PORT=$DB_PORT \
    DB_USER=$DB_USER \
    DB_PASSWORD=$DB_PASSWORD \
    DB_NAME=$DB_NAME

# Copy dependency definitions
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose application port
EXPOSE $PORT

# Start the app
CMD ["npm", "start"]
