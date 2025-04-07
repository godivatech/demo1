# Running the Building Doctor Website on Windows

If you're experiencing issues running this project on Windows, especially with errors like `ERR_UNSUPPORTED_ESM_URL_SCHEME`, follow these steps:

## Solution 1: Use the Windows Compatibility Script

1. Open your command prompt (cmd) or PowerShell window
2. Navigate to the project directory
3. Run the following command:
   ```
   node start-windows.js
   ```

## Solution 2: Use the Node.js Loader Flag

If Solution 1 doesn't work, try running the project with the explicit loader flag:

```
node --no-warnings --loader tsx server/index.ts
```

## Solution 3: Move the Project to a Path Without Spaces

The error often occurs when your project is in a directory path containing spaces. For example:
`F:\Godiva Tech Soft Madurai\Building doctors\BuildingDoctorPro`

Consider moving the project to a location without spaces in the path, such as:
`F:\Projects\BuildingDoctorPro`

## Solution 4: Use WSL (Windows Subsystem for Linux)

For the smoothest experience developing Node.js applications on Windows, consider using WSL:

1. Install WSL by following [Microsoft's guide](https://learn.microsoft.com/en-us/windows/wsl/install)
2. Clone your project to the WSL filesystem
3. Run the project using standard npm commands:
   ```
   npm run dev
   ```

## Technical Explanation

The error occurs because Node.js ESM (ECMAScript Modules) loader on Windows has limitations with spaces and special characters in paths. The `tsx` package which helps run TypeScript files directly has issues resolving paths on Windows when they contain spaces or non-standard characters.

Using the compatibility script or direct loader methods helps bypass these issues by providing a cleaner path resolution mechanism.