import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactSchema, productSchema, inquirySchema, type Product, type Contact, type Inquiry } from "@shared/schema";
import { generateSampleProducts } from "./data";

// Global store for products, contacts, and inquiries
let products: Product[] = generateSampleProducts();
let contacts: Contact[] = [];
let inquiries: Inquiry[] = [];

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const parsedData = contactSchema.parse(req.body);
      
      // Generate a new ID and create contact with timestamp
      const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
      const newContact: Contact = {
        ...parsedData,
        id: newId,
        createdAt: new Date()
      };
      
      // Store the contact
      contacts.push(newContact);
      
      res.status(200).json({
        success: true,
        message: "Contact form submitted successfully",
        contact: newContact
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
  
  // Inquiries from popup form endpoint
  app.post("/api/inquiries", async (req, res) => {
    try {
      const parsedData = inquirySchema.parse(req.body);
      
      // Generate a new ID and create inquiry with timestamp
      const newId = inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1;
      const newInquiry: Inquiry = {
        id: newId,
        name: parsedData.name,
        email: parsedData.email || null,
        phone: parsedData.phone,
        issueType: parsedData.issueType || "",
        message: parsedData.message || null,
        address: parsedData.address || null,
        createdAt: new Date()
      };
      
      // Store the inquiry
      inquiries.push(newInquiry);
      
      res.status(200).json({
        success: true,
        message: "Inquiry submitted successfully",
        inquiry: newInquiry
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid inquiry data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to process inquiry"
        });
      }
    }
  });
  
  // Get all contacts
  app.get("/api/contacts", (req, res) => {
    res.status(200).json(contacts);
  });
  
  // Delete a contact
  app.delete("/api/contacts/:id", (req, res) => {
    try {
      const contactId = parseInt(req.params.id);
      const contactIndex = contacts.findIndex(c => c.id === contactId);
      
      if (contactIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Contact not found"
        });
      }
      
      // Remove the contact
      contacts.splice(contactIndex, 1);
      
      res.status(200).json({
        success: true,
        message: "Contact deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete contact"
      });
    }
  });
  
  // Get all inquiries
  app.get("/api/inquiries", (req, res) => {
    res.status(200).json(inquiries);
  });
  
  // Delete an inquiry
  app.delete("/api/inquiries/:id", (req, res) => {
    try {
      const inquiryId = parseInt(req.params.id);
      const inquiryIndex = inquiries.findIndex(i => i.id === inquiryId);
      
      if (inquiryIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Inquiry not found"
        });
      }
      
      // Remove the inquiry
      inquiries.splice(inquiryIndex, 1);
      
      res.status(200).json({
        success: true,
        message: "Inquiry deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete inquiry"
      });
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
        id: newId,
        rating: parsedData.rating || 4.0,
        isBestseller: parsedData.isBestseller || null, 
        isNew: parsedData.isNew || null
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
