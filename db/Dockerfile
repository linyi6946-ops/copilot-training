FROM postgres:15-alpine

# Set environment variables
ENV POSTGRES_DB=tasks_db
ENV POSTGRES_USER=tasks_user
ENV POSTGRES_PASSWORD=tasks_password

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD ["postgres"]
