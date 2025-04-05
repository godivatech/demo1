@echo off
echo Starting Building Doctor Website (Windows Compatibility Mode)...
echo.
echo This batch file will attempt to start the application using Node.js
echo.

REM Try to run using the CommonJS script which is more compatible with Windows
node start-windows.cjs

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo Failed to start using primary method, trying alternative method...
  echo.
  
  REM If that fails, try direct method with tsx
  set NODE_OPTIONS=--experimental-specifier-resolution=node --no-warnings
  npx cross-env NODE_NO_WARNINGS=1 tsx server/index.ts
)

pause
