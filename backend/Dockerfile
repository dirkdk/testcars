FROM python:3.11-slim-bullseye

WORKDIR /app

ENV FLASK_APP=wsgi:app
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN pip install poetry

COPY pyproject.toml poetry.lock* ./

RUN poetry install --no-root

COPY . .

ENTRYPOINT ["/app/entrypoint.sh"]