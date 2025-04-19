const { execSync } = require('child_process');
const { existsSync, mkdirSync } = require('fs');
const path = require('path');

/**
 * This script prepares the project for Vercel deployment
 * It creates all the necessary files and directories
 */

function prepareForVercel() {
  console.log('🚀 Preparing project for Vercel deployment...');
  
  // Create dist directory if it doesn't exist
  const distDir = path.resolve(__dirname, 'dist');
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }
  
  // Create public directory inside dist if it doesn't exist
  const publicDir = path.resolve(__dirname, 'dist/public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }
  
  try {
    // Build frontend with Vite
    console.log('📦 Building frontend...');
    execSync('npx vite build --config vite.config.vercel.ts', { stdio: 'inherit' });
    
    // Build backend with esbuild
    console.log('📦 Building backend...');
    execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', 
      { stdio: 'inherit' });
    
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run the prepare function
prepareForVercel();