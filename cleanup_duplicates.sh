#!/bin/bash

# This script safely removes duplicate .ts/.tsx files when a .js/.jsx version exists and is currently used

# Files to clean up (these are duplicate TS files where we already use the JS versions)
declare -a duplicate_files=(
  "client/src/App.tsx"
  "client/src/main.tsx"
  "client/src/components/layout/Header.tsx"
  "client/src/components/layout/Footer.tsx"
  "client/src/components/WhatsappButton.tsx"
  "client/src/hooks/use-mobile.tsx"
  "client/src/pages/not-found.tsx"
)

echo "Removing duplicate TypeScript files that are not being used..."

# First verify the JS counterparts exist
for tsfile in "${duplicate_files[@]}"; do
  jsfile="${tsfile%.tsx}.jsx"
  
  # If it's not a .tsx file, handle .ts file
  if [[ "$tsfile" != *".tsx" ]]; then
    jsfile="${tsfile%.ts}.js"
  fi
  
  if [[ -f "$tsfile" && -f "$jsfile" ]]; then
    echo "Removing $tsfile (keeping $jsfile)"
    rm "$tsfile"
  elif [[ -f "$tsfile" ]]; then
    echo "WARNING: $jsfile does not exist, keeping $tsfile"
  else
    echo "File $tsfile already removed"
  fi
done

# Handle data files
declare -a data_files=(
  "client/src/data/company.ts"
  "client/src/data/products.ts"
  "client/src/data/schema.ts"
  "client/src/data/services.ts"
  "client/src/lib/queryClient.ts"
  "client/src/lib/utils.ts"
)

for tsfile in "${data_files[@]}"; do
  jsfile="${tsfile%.ts}.js"
  
  if [[ -f "$tsfile" && -f "$jsfile" ]]; then
    echo "Removing $tsfile (keeping $jsfile)"
    rm "$tsfile"
  elif [[ -f "$tsfile" ]]; then
    echo "WARNING: $jsfile does not exist, keeping $tsfile"
  else
    echo "File $tsfile already removed"
  fi
done

echo "Cleanup complete!"
