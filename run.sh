#!/bin/bash

# Generate prisma client
npx prisma generate

# Migrate database
npx prisma migrate deploy 

# Start node server
pm2-runtime dist/app.js