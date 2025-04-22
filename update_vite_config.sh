#!/bin/bash

# This script updates the Windows-compatible Vite configuration
# It's useful if you need to make changes to the main vite.config.ts and want to sync them

echo "Updating Windows-compatible Vite configuration..."

# Check if vite.config.ts exists
if [ ! -f vite.config.ts ]; then
  echo "Error: vite.config.ts not found!"
  exit 1
fi

# Create the Windows-compatible version
cat > vite.config.windows.js << 'VITECONFIG'
// Special Vite config for Windows compatibility with Node.js v18
// This uses __dirname instead of import.meta.dirname which is not available in Node.js 18

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import { fileURLToPath } from 'url';
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Get directory name in a way that works with ESM + Node.js v18
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
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
});
VITECONFIG

echo "✓ Windows-compatible Vite config created/updated"
echo "✓ The configuration is now ready for Node.js v18 on Windows"
