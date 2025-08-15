#!/bin/sh

# Initialize migrations if not already done
if [ ! -d "migrations" ]; then
  poetry run flask db init
fi

# Run database migrations
poetry run flask db migrate -m "Initial migration"
poetry run flask db upgrade

# Seed the database
poetry run python seed.py

# Start the Flask application
poetry run flask run --host=0.0.0.0
