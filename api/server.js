// This file is a Vercel serverless function entry point that imports and runs our Express app

import { createServer } from 'http';
import { parse } from 'url';
import express from 'express';
import { registerRoutes } from '../server/routes_firebase.js';

// Create express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create HTTP server
const server = createServer(app);

// Register all routes
registerRoutes(app)
  .then(() => {
    console.log('API routes registered successfully');
  })
  .catch(err => {
    console.error('Failed to register API routes:', err);
  });

// Handle errors
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({ message });
});

// Export the serverless function handler
export default async function handler(req, res) {
  // Parse the URL
  const parsedUrl = parse(req.url, true);
  
  // Pass the request to Express
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}