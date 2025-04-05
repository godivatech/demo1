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
  
  REM Check if the Windows-compatible Vite config exists
  if exist vite.config.windows.js (
    echo ✓ Windows-compatible Vite config found
  ) else (
    echo ❌ Windows-compatible Vite config not found
    echo Make sure vite.config.windows.js exists in the project root
    pause
    exit /b 1
  )

  REM Temporarily rename vite config files to use the Windows version
  if exist vite.config.ts (
    echo Backing up original Vite config...
    copy vite.config.ts vite.config.ts.bak >nul
  )

  REM Copy Windows vite config to the expected location
  echo Setting up Windows-compatible Vite config...
  copy vite.config.windows.js vite.config.js >nul
  
  REM If that fails, try direct method with tsx
  set NODE_OPTIONS=--experimental-specifier-resolution=node --no-warnings
  npx cross-env NODE_NO_WARNINGS=1 tsx server/index.ts
  
  set LAST_ERROR=%ERRORLEVEL%
  
  REM Restore original vite config
  if exist vite.config.ts.bak (
    echo.
    echo Restoring original Vite configuration...
    
    REM Remove temporary vite.config.js
    if exist vite.config.js (
      del vite.config.js
    )
    
    REM Restore backup
    copy vite.config.ts.bak vite.config.ts >nul
    del vite.config.ts.bak
  )
  
  if %LAST_ERROR% NEQ 0 (
    echo.
    echo Failed with both methods. Please see WINDOWS_SETUP.md for more options.
    echo Consider upgrading to Node.js v20 for better compatibility.
  )
)

pause
