#!/bin/sh
#exec gunicorn -b 0.0.0.0:5000 main:app 
exec gunicorn -b 0.0.0.0:5000 "upload_backend:create_app('flask_dev.cfg')"