#!/bin/bash

# Configurations
PG_PASSWORD="pgpassword"
DUMP_DIR="dumpfiles"
DB_NAME="postgres"
DOCKER_IMAGE_BASENAME="dukedata/sample-databases"
DOCKER_REGISTRY="dukedata"

# Pull the official PostgreSQL image
docker pull postgres:latest

# Login to Docker (if pushing to Docker Hub or another registry)
docker login

# Process each dump file
for DUMP_FILE in $DUMP_DIR/*.sql; do

    # Extract the base filename without the extension to use as container name
    FILENAME=$(basename -- "$DUMP_FILE")
    CONTAINER_NAME="${FILENAME%.*}"

    echo "Processing $DUMP_FILE for container $CONTAINER_NAME..."

    # Start a PostgreSQL container
    docker run --name $CONTAINER_NAME -e POSTGRES_PASSWORD=$PG_PASSWORD -d postgres:latest

    # Give PostgreSQL some time to initialize
    sleep 10

    # Copy and load the SQL dump
    docker cp $DUMP_FILE $CONTAINER_NAME:/$FILENAME
    docker exec -u postgres $CONTAINER_NAME psql -d $DB_NAME -a -f /$FILENAME

    # Commit and push the image
    DOCKER_IMAGE_NAME="$DOCKER_IMAGE_BASENAME-$CONTAINER_NAME"
    docker commit $CONTAINER_NAME $DOCKER_IMAGE_NAME
    docker push $DOCKER_IMAGE_NAME

    # Stop and remove the container
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME

    echo "Finished processing $CONTAINER_NAME."

done

# Optional clean up for the base image
docker rmi postgres:latest
