# Use the official Docker image for PostgreSQL
FROM postgres:latest

# Set environment variables for default postgres user and password
ENV POSTGRES_USER datagpt_user
ENV POSTGRES_PASSWORD datagpt_password

# Set the default database name
ENV POSTGRES_DB datagpt_db