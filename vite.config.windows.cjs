// Special Vite config for Windows compatibility with Node.js v18
// This uses CommonJS syntax which is more compatible with Node.js v18

const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const themePlugin = require("@replit/vite-plugin-shadcn-theme-json");
const path = require("path");
const runtimeErrorOverlay = require("@replit/vite-plugin-runtime-error-modal");

// In CommonJS, __dirname is already available
module.exports = defineConfig({
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
