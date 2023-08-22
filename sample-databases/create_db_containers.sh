#!/bin/bash

# Configurations
PG_PASSWORD="pgpassword"
DUMP_DIR="dumpfiles"
DB_NAME="postgres"
DOCKER_IMAGE_BASENAME="dukedata/sample"
DOCKER_REGISTRY="dukedata"
START_PORT=5440  # Starting port number

# Pull the official PostgreSQL image
docker pull postgres:latest

# Login to Docker (if pushing to Docker Hub or another registry)
docker login

# Process each dump file
for DUMP_FILE in $DUMP_DIR/*.sql; do

    # Extract the base filename without the extension to use as container name
    FILENAME=$(basename -- "$DUMP_FILE")
    CONTAINER_NAME="${FILENAME%.*}"

    # Check if a container with the same name exists
    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
        # If it does, stop and remove it
        docker stop $CONTAINER_NAME
        docker rm $CONTAINER_NAME
    fi

    echo "Processing $DUMP_FILE for container $CONTAINER_NAME..."

    # Start a PostgreSQL container with the port mapping
    docker run --name $CONTAINER_NAME -e POSTGRES_PASSWORD=$PG_PASSWORD -p $START_PORT:5432 -d postgres:latest

    # Give PostgreSQL some time to initialize
    sleep 10

    # Optional: Ensure DB_NAME exists
    docker exec -u postgres $CONTAINER_NAME createdb $DB_NAME

    # Copy and load the SQL dump
    docker cp $DUMP_FILE $CONTAINER_NAME:/$FILENAME
    docker exec -u postgres $CONTAINER_NAME psql -d $DB_NAME -a -f /$FILENAME 2>&1

    # Increment the port for the next iteration
    ((START_PORT++))

    echo "Finished processing $CONTAINER_NAME."

done
