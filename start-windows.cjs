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

  // Check if the Windows-compatible Vite config exists
  const viteWindowsConfig = path.join(__dirname, 'vite.config.windows.js');
  if (fs.existsSync(viteWindowsConfig)) {
    console.log('✓ Windows-compatible Vite config found');
  } else {
    console.error('❌ Windows-compatible Vite config not found');
    console.log('Make sure vite.config.windows.js exists in the project root');
    process.exit(1);
  }

  // Temporarily rename vite config files to use the Windows version
  const originalViteConfig = path.join(__dirname, 'vite.config.ts');
  const backupViteConfig = path.join(__dirname, 'vite.config.ts.bak');
  
  // Backup original vite config if it exists
  if (fs.existsSync(originalViteConfig)) {
    console.log('Backing up original Vite config...');
    fs.copyFileSync(originalViteConfig, backupViteConfig);
  }

  // Copy Windows vite config to the expected location
  console.log('Setting up Windows-compatible Vite config...');
  fs.copyFileSync(viteWindowsConfig, path.join(__dirname, 'vite.config.js'));

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
  console.log('4. Consider upgrading to Node.js v20 for better compatibility');
} finally {
  // Restore original vite config
  const originalViteConfig = path.join(__dirname, 'vite.config.ts');
  const backupViteConfig = path.join(__dirname, 'vite.config.ts.bak');
  const tempViteConfig = path.join(__dirname, 'vite.config.js');
  
  if (fs.existsSync(backupViteConfig)) {
    console.log('\nRestoring original Vite configuration...');
    
    // Remove temporary vite.config.js
    if (fs.existsSync(tempViteConfig)) {
      fs.unlinkSync(tempViteConfig);
    }
    
    // Restore backup
    fs.copyFileSync(backupViteConfig, originalViteConfig);
    fs.unlinkSync(backupViteConfig);
  }
}