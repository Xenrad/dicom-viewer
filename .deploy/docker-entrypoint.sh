#!/bin/sh

# Process Nginx configuration templates
echo "Processing Nginx configuration templates..."
envsubst '$NGINX_PORT,$VIEWER_HOST,$VIEWER_PORT' < /etc/nginx/templates/default.conf > /etc/nginx/conf.d/default.conf

# Start Nginx
echo "Starting Nginx..."
exec "$@"
