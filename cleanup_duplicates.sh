#!/bin/bash

# Cleanup script for Building Doctor Website
# Removes duplicate files and organizes the folder structure

echo "Starting cleanup process..."

# Function to handle duplicate JS/JSX files
clean_duplicates() {
  local dir=$1
  
  # Find duplicate files (same name, different extensions)
  for js_file in $(find "$dir" -name "*.js"); do
    base_name="${js_file%.js}"
    jsx_file="${base_name}.jsx"
    
    # If both .js and .jsx exist, keep the .jsx version
    if [ -f "$jsx_file" ]; then
      echo "Found duplicate: $js_file and $jsx_file - keeping $jsx_file"
      rm "$js_file"
    fi
  done
}

# Clean up multiple Windows setup files
echo "Cleaning up Windows setup files..."
mkdir -p windows_compat
mv start-windows*.* windows_compat/
mv vite.config.windows.* windows_compat/
mv vite.config.simple.cjs windows_compat/
mv create-batch-file.js windows_compat/
mv WINDOWS_SETUP*.* windows_compat/
# Keep only one Windows setup file in the root
cp windows_compat/WINDOWS_SETUP.md ./

# Clean up client directories
echo "Cleaning up client/src directory..."

# Clean up data directory
clean_duplicates "client/src/data"

# Clean up utils directory
clean_duplicates "client/src/utils"

# Clean up pages directory - Convert TypeScript to JSX if needed
for ts_file in $(find "client/src/pages" -name "*.tsx"); do
  base_name="${ts_file%.tsx}"
  jsx_file="${base_name}.jsx"
  
  # If the page exists as both .tsx and .jsx, keep the .jsx version
  if [ -f "$jsx_file" ]; then
    echo "Found duplicate page: $ts_file and $jsx_file - keeping $jsx_file"
    rm "$ts_file"
  else
    # Convert .tsx to .jsx
    echo "Converting $ts_file to $jsx_file"
    mv "$ts_file" "$jsx_file"
  fi
done

# Organize Windows compatibility files
echo "Organizing Windows compatibility files..."
rm -f WINDOWS_SETUP_LEGACY.md WINDOWS_SETUP_GUIDE.txt
rm -f ./*.bat

echo "Cleanup complete!"