#!/bin/bash

# Build the client
echo "Building client..."
npm run build

# Build the server with esbuild
echo "Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build completed successfully!"
