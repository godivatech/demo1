// Simple CommonJS Vite config for Node.js v18 on Windows
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
};