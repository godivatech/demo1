import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactSchema, productSchema, type Product } from "@shared/schema";
import { generateSampleProducts } from "./data";

// Global store for products
let products: Product[] = generateSampleProducts();

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const parsedData = contactSchema.parse(req.body);
      
      // In a real implementation, you'd likely want to store this in a database
      // or send it via email. For now, we'll just return a success message.
      console.log("Contact form submission:", parsedData);
      
      res.status(200).json({
        success: true,
        message: "Contact form submitted successfully"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to process contact form"
        });
      }
    }
  });
  
  // Get all products endpoint (with optional filtering)
  app.get("/api/products", (req, res) => {
    try {
      const { category, search } = req.query;
      
      let filteredProducts = [...products];
      
      // Filter by category if provided
      if (category && category !== "all") {
        filteredProducts = filteredProducts.filter(product => 
          product.category === category
        );
      }
      
      // Filter by search term if provided
      if (search && typeof search === 'string') {
        const searchTerm = search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm)
        );
      }
      
      res.status(200).json({
        success: true,
        products: filteredProducts
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch products"
      });
    }
  });
  
  // Get single product endpoint
  app.get("/api/products/:id", (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      
      const product = products.find(p => p.id === productId);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      
      res.status(200).json({
        success: true,
        product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch product"
      });
    }
  });
  
  // Add a new product endpoint (admin only in a real app)
  app.post("/api/products", (req, res) => {
    try {
      const parsedData = productSchema.parse(req.body);
      
      // Generate a new ID - in a real app, this would be handled by the database
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      
      const newProduct: Product = {
        ...parsedData,
        id: newId
      };
      
      products.push(newProduct);
      
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        product: newProduct
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid product data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to add product"
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
