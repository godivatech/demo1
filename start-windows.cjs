#!/usr/bin/env node

// This script helps run the application on Windows systems with Node.js v18
// It uses CommonJS syntax which is more compatible with older Node versions

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting Building Doctor Website (Windows Compatibility Mode)...');
console.log('Using Node.js version:', process.version);

try {
  // Check if cross-env is installed
  try {
    require.resolve('cross-env');
    console.log('✓ cross-env is installed');
  } catch (e) {
    console.log('Installing cross-env package...');
    execSync('npm install cross-env', { stdio: 'inherit' });
  }

  // Run the server with proper flags for Windows compatibility
  console.log('\nStarting server...');
  
  const command = 'npx cross-env NODE_NO_WARNINGS=1 tsx server/index.ts';
  console.log(`> ${command}`);
  
  execSync(command, { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--experimental-specifier-resolution=node --no-warnings'
    }
  });
} catch (error) {
  console.error('\n❌ Error starting the application:', error.message);
  console.log('\nTroubleshooting tips:');
  console.log('1. Make sure you\'re using Node.js v18 or newer');
  console.log('2. Try moving this project to a directory path without spaces');
  console.log('3. Try running: npm install, then try again');
  process.exit(1);
}