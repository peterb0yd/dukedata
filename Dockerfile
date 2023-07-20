# Use the official Docker image for PostgreSQL
FROM postgres:latest

# Set environment variables for default postgres user and password
ENV POSTGRES_USER dukedata
ENV POSTGRES_PASSWORD dukedata

# Set the default database name
ENV POSTGRES_DB dukedata