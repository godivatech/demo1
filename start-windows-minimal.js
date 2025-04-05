// Minimal Windows-compatible startup script using CommonJS
// This provides the absolute simplest way to start the app with Node.js v18

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Building Doctor Website (Minimal Windows Mode)...');
console.log('Using Node.js version:', process.version);

try {
  // Make sure cross-env is installed
  try {
    require.resolve('cross-env');
    console.log('✓ cross-env is installed');
  } catch (error) {
    console.log('Installing cross-env package...');
    execSync('npm install cross-env', { stdio: 'inherit' });
  }

  // Copy simplified Vite config
  const simpleConfig = path.join(__dirname, 'vite.config.simple.cjs');
  const targetConfig = path.join(__dirname, 'vite.config.cjs');
  
  if (!fs.existsSync(simpleConfig)) {
    throw new Error('Simplified Vite config not found: vite.config.simple.cjs');
  }
  
  fs.copyFileSync(simpleConfig, targetConfig);
  console.log('✓ Using simplified Vite configuration (CommonJS)');

  // Run the server
  console.log('\nStarting server with minimal Windows compatibility mode...');
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
  console.log('\nIf you continue to have problems, consider:');
  console.log('1. Upgrading to Node.js v20');
  console.log('2. Moving the project to a folder without spaces in the path');
  console.log('3. Running: npm install');
}