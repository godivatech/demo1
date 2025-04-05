// Simplified Windows startup script using CommonJS
// This script loads a simpler vite.config.cjs for better compatibility with Node.js v18

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Building Doctor Website (Simple Windows Mode)...');
console.log('Using Node.js version:', process.version);

// Check if we need to clean up existing temp files
const tempViteConfig = path.join(__dirname, 'vite.config.cjs');
let needsCleanup = false;

// Setup cleanup function to run on exit
function cleanupTempFiles() {
  if (needsCleanup && fs.existsSync(tempViteConfig)) {
    try {
      fs.unlinkSync(tempViteConfig);
      console.log('✓ Cleaned up temporary configuration files');
    } catch (error) {
      console.error('Error cleaning up:', error.message);
    }
  }
}

// Register cleanup handlers
process.on('exit', cleanupTempFiles);
process.on('SIGINT', () => {
  cleanupTempFiles();
  process.exit();
});

try {
  // Make sure we have all dependencies
  try {
    require.resolve('cross-env');
    console.log('✓ cross-env is installed');
  } catch (error) {
    console.log('Installing cross-env package...');
    execSync('npm install cross-env', { stdio: 'inherit' });
  }

  // Copy the simplified vite config to the main location
  const simpleConfig = path.join(__dirname, 'vite.config.simple.cjs');
  
  if (!fs.existsSync(simpleConfig)) {
    console.error('❌ Error: Could not find vite.config.simple.cjs');
    console.log('Creating simplified Vite config...');
    
    // Create a basic vite config
    const basicConfig = `// Simple CommonJS Vite config for Node.js v18 on Windows
const path = require("path");

module.exports = {
  plugins: [
    require("@vitejs/plugin-react")(),
    require("@replit/vite-plugin-runtime-error-modal")(),
    require("@replit/vite-plugin-shadcn-theme-json")(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
};`;
    
    fs.writeFileSync(simpleConfig, basicConfig);
    console.log('✓ Created simplified Vite config');
  }
  
  // Copy it to the working location
  fs.copyFileSync(simpleConfig, tempViteConfig);
  console.log('✓ Using simplified Vite configuration');
  needsCleanup = true;

  // Start the server
  console.log('\nStarting server with Windows compatibility mode...');
  console.log('> npx cross-env NODE_NO_WARNINGS=1 tsx server/index.ts');
  
  execSync('npx cross-env NODE_NO_WARNINGS=1 tsx server/index.ts', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--experimental-specifier-resolution=node --no-warnings'
    }
  });

} catch (error) {
  console.error('\n❌ Error:', error.message);
  console.log('\nIf you continue to have problems, please try:');
  console.log('1. Make sure Node.js v18.18.1 or higher is installed');
  console.log('2. Run: npm install');
  console.log('3. Try using the minimal script: node start-windows-minimal.js');
} finally {
  cleanupTempFiles();
}