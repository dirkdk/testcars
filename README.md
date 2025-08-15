# TestCars Project

This project contains a React frontend and a Python Flask backend.

## Development

### Building the Docker Images

To build the Docker images for both the frontend and backend services, run the following command from the project root:

```bash
docker compose build
```

### Running with Docker Compose

To start the application, run the following command from the project root:

```bash
docker compose up
```

To run the application in the background (detached mode), use:

```bash
docker compose up -d
```

### Running Database Migrations

To apply any pending database migrations, run the following command:

```bash
docker compose exec backend poetry run flask db upgrade
```

To generate a new migration after changing the models, run:

```bash
docker compose exec backend poetry run flask db migrate -m "Your migration message"
```
