#!/bin/bash
# Script to clean up duplicate TypeScript files when JavaScript equivalents exist

echo "Scanning for duplicate TypeScript files with JavaScript equivalents..."
echo

declare -i found=0

# Process client directory
find ./client/src -type f -name "*.tsx" | while read -r tsx_file; do
    basename=$(basename "$tsx_file" .tsx)
    dirname=$(dirname "$tsx_file")
    jsx_file="$dirname/$basename.jsx"
    
    if [ -f "$jsx_file" ]; then
        echo "Found duplicate: $tsx_file has equivalent $jsx_file"
        echo "Removing: $tsx_file"
        rm "$tsx_file"
        found=$((found+1))
    fi
done

find ./client/src -type f -name "*.ts" | while read -r ts_file; do
    basename=$(basename "$ts_file" .ts)
    dirname=$(dirname "$ts_file")
    js_file="$dirname/$basename.js"
    
    if [ -f "$js_file" ]; then
        echo "Found duplicate: $ts_file has equivalent $js_file"
        echo "Removing: $ts_file"
        rm "$ts_file"
        found=$((found+1))
    fi
done

echo
if [ $found -eq 0 ]; then
    echo "No duplicate files found! Your project is clean."
else
    echo "Cleanup complete! Removed $found duplicate TypeScript files."
fi
