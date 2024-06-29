#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux and macOS you can run this script directly - `./start-database.sh`

COMPOSE_FILE="docker-compose.yml"
DB_CONTAINER_NAME="resume-factory-postgres"
COMPOSE_SERVICE_NAME="postgres"

if ! [ -x "$(command -v docker-compose)" ]; then
  echo -e "Docker Compose is not installed. Please install Docker Compose and try again.\nDocker Compose install guide: https://docs.docker.com/compose/install/"
  exit 1
fi

if [ "$(docker-compose -f $COMPOSE_FILE ps -q $COMPOSE_SERVICE_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running via Docker Compose"
  exit 0
fi

# Check if the service exists but is not running
if [ "$(docker-compose -f $COMPOSE_FILE ps -a -q $COMPOSE_SERVICE_NAME)" ] && [ ! "$(docker-compose -f $COMPOSE_FILE ps -q $COMPOSE_SERVICE_NAME)" ]; then
  docker-compose -f $COMPOSE_FILE start $COMPOSE_SERVICE_NAME
  echo "Existing database container '$DB_CONTAINER_NAME' started via Docker Compose"
  exit 0
fi

# Import env variables from .env
set -a
source .env

DB_PASSWORD=$(echo "$POSTGRES_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')

if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please set a password in the .env file and try again"
    exit 1
  fi
  # Generate a random URL-safe password
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

# Update the environment variables in the Docker Compose file if necessary
# Assuming environment variables in the docker-compose.yml file match those in .env

docker-compose -f $COMPOSE_FILE up -d && echo "Database and proxy services were successfully created via Docker Compose"
