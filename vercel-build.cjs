#!/usr/bin/env node

/**
 * This script prepares the project for Vercel deployment
 * It creates all the necessary files and directories
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if running in Vercel environment
const isVercel = process.env.VERCEL === '1';

// Main function to prepare project for Vercel deployment
async function prepareForVercel() {
  console.log('Preparing Building Doctor project for Vercel deployment...');
  
  // Make sure .env file exists with defaults if not in production
  if (!isVercel && !fs.existsSync('.env')) {
    console.log('Creating default .env file for local development...');
    fs.copyFileSync('.env.example', '.env');
  }

  // Create dist directory if it doesn't exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  
  if (!fs.existsSync('client/dist')) {
    fs.mkdirSync('client/dist', { recursive: true });
  }
  
  // Build the project
  try {
    console.log('Building client...');
    execSync('vite build', { stdio: 'inherit' });
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

// Run the preparation process
prepareForVercel().catch(error => {
  console.error('Error preparing for Vercel deployment:', error);
  process.exit(1);
});