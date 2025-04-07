#!/usr/bin/env node

// This script helps run the application on Windows systems
// where path issues might cause problems with ESM URL schemes

import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve, join } from 'path';

// Get current file directory in ESM compatible way
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fix for Windows file path URL scheme issue
process.env.NODE_OPTIONS = '--enable-source-maps';

console.log('Starting server with Windows compatibility mode...');
console.log('Using Node.js version:', process.version);

// Use cross-env to set environment variables that work across platforms
const result = spawnSync('npx', 
  ['cross-env', 'NODE_NO_WARNINGS=1', 'tsx', './server/index.ts'],
  { 
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      // Force file URL protocol handling
      NODE_OPTIONS: '--experimental-specifier-resolution=node'
    }
  }
);

if (result.error) {
  console.error('Error starting server:', result.error);
  process.exit(1);
}