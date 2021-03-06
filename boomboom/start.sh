#!/bin/bash

python manage.py collectstatic

# Start Gunicorn processes
echo Starting Gunicorn.
exec gunicorn boomboom.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3
