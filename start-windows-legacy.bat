@echo off
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