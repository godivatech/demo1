#!/bin/bash

# This script is for Vercel deployment

echo "Starting Vercel build process..."

# Build the client-side application
echo "Building client..."
npx vite build

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Client build failed!"
  exit 1
fi

echo "Client build completed successfully!"
echo "Build process completed!"