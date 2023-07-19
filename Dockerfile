# Use the official Docker image for PostgreSQL
FROM postgres:latest

# Set environment variables for default postgres user and password
ENV POSTGRES_USER dukedatapostgres
ENV POSTGRES_PASSWORD dukedatapassword

# Set the default database name
ENV POSTGRES_DB dukedatadb