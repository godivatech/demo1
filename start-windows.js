#!/usr/bin/env node

// This script helps run the application on Windows systems
// where path issues might cause problems with tsx

const { spawnSync } = require('child_process');
const path = require('path');

// Get the absolute path to server/index.ts without spaces or special characters
const serverPath = path.resolve(__dirname, 'server', 'index.ts');

console.log('Starting server with Windows compatibility mode...');
console.log(`Server file path: ${serverPath}`);

// Run the server with node and tsx loader
const result = spawnSync('node', 
  ['--no-warnings', '--loader', 'tsx', serverPath],
  { 
    stdio: 'inherit',
    shell: true,
    env: { ...process.env }
  }
);

if (result.error) {
  console.error('Error starting server:', result.error);
  process.exit(1);
}