#!/bin/sh

# Start Celery in the background
celery -A app.celery_app:celery worker --loglevel=info &

# Start FastAPI
exec uvicorn app.main:app --host 0.0.0.0 --port 8000