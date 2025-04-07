// This script creates the batch file needed for Windows users
const fs = require('fs');
const path = require('path');

const batchFileContent = `@echo off
echo Starting Building Doctor Website (Legacy Windows Mode)...
echo.
echo This batch file is designed for Node.js v18 on Windows
echo.

REM Run the simple Windows-compatible Node.js script
node start-windows-minimal.js

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Failed to start. Please see error messages above.
  echo.
  echo Please make sure all dependencies are installed:
  echo npm install
  echo.
  echo You can also try upgrading to Node.js v20 for better compatibility.
)

pause
`;

const batchFilePath = path.join(__dirname, 'start-windows-legacy.bat');

try {
  fs.writeFileSync(batchFilePath, batchFileContent);
  console.log(`Successfully created batch file: ${batchFilePath}`);
  console.log(`To use it, run: start-windows-legacy.bat`);
} catch (error) {
  console.error(`Error creating batch file: ${error.message}`);
  console.log(`You can manually create a file named 'start-windows-legacy.bat' with the following content:`);
  console.log('---------------------------------------------------');
  console.log(batchFileContent);
  console.log('---------------------------------------------------');
}