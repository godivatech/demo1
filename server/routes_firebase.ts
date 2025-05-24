import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  contactSchema, productSchema, inquirySchema, serviceSchema, testimonialSchema, faqSchema, intentSchema,
  type Product, type Contact, type Inquiry, type Service, type Testimonial, type Faq, type Intent
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api

  // ======================
  // CONTACT ENDPOINTS
  // ======================
  
  // Get all contacts
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch contacts"
      });
    }
  });
  
  // Contact form endpoint
  app.post("/api/contacts", async (req, res) => {
    try {
      const parsedData = contactSchema.parse(req.body);
      
      // Create contact in Firebase
      const newContact = await storage.createContact(parsedData);
      
      res.status(200).json({
        success: true,
        message: "Contact form submitted successfully",
        contact: newContact
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log('Contact form validation error:', JSON.stringify(error.errors, null, 2));
        console.log('Contact form data received:', JSON.stringify(req.body, null, 2));
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        console.error('Contact creation error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to process contact form"
        });
      }
    }
  });
  
  // Delete a contact submission
  app.delete("/api/contacts/:id", async (req, res) => {
    try {
      const contactId = parseInt(req.params.id);
      
      // Delete contact from Firebase
      const success = await storage.deleteContact(contactId);
      
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Contact submission not found"
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Contact submission deleted successfully"
      });
    } catch (error) {
      console.error('Contact deletion error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to delete contact submission"
      });
    }
  });
  
  // ======================
  // INQUIRY ENDPOINTS
  // ======================
  
  // Get all inquiries
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.status(200).json(inquiries);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch inquiries"
      });
    }
  });
  
  // Inquiries from popup form endpoint
  app.post("/api/inquiries", async (req, res) => {
    try {
      const parsedData = inquirySchema.parse(req.body);
      
      // Create inquiry in Firebase
      const newInquiry = await storage.createInquiry({
        name: parsedData.name,
        email: parsedData.email || null,
        phone: parsedData.phone,
        issueType: parsedData.issueType || "",
        message: parsedData.message || null,
        address: parsedData.address || null
      });
      
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
        console.error('Inquiry creation error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to process inquiry"
        });
      }
    }
  });
  
  // Delete an inquiry
  app.delete("/api/inquiries/:id", async (req, res) => {
    try {
      const inquiryId = parseInt(req.params.id);
      
      // Delete inquiry from Firebase
      const success = await storage.deleteInquiry(inquiryId);
      
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Inquiry not found"
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Inquiry deleted successfully"
      });
    } catch (error) {
      console.error('Inquiry deletion error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to delete inquiry"
      });
    }
  });
  
  // ======================
  // PRODUCT ENDPOINTS
  // ======================
  
  // Get all products endpoint (with optional filtering)
  app.get("/api/products", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      // Get all products from Firebase
      let products = await storage.getProducts();
      
      // Filter by category if provided
      if (category && category !== "all") {
        products = products.filter(product => 
          product.category === category
        );
      }
      
      // Filter by search term if provided
      if (search && typeof search === 'string') {
        const searchTerm = search.toLowerCase();
        products = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm)
        );
      }
      
      res.status(200).json({
        success: true,
        products: products
      });
    } catch (error) {
      console.error('Product fetch error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products"
      });
    }
  });
  
  // Get single product endpoint
  app.get("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      
      // Get product from Firebase
      const product = await storage.getProduct(productId);
      
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
      console.error('Product fetch error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch product"
      });
    }
  });
  
  // Add a new product endpoint
  app.post("/api/products", async (req, res) => {
    try {
      const parsedData = productSchema.parse(req.body);
      
      // Create product in Firebase
      const newProduct = await storage.createProduct({
        ...parsedData,
        rating: parsedData.rating || 4.0,
        isBestseller: parsedData.isBestseller || false, 
        isNew: parsedData.isNew || false
      });
      
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
        console.error('Product creation error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to add product"
        });
      }
    }
  });

  // Update a product endpoint
  app.put("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const parsedData = productSchema.parse(req.body);
      
      // Get the existing product
      const existingProduct = await storage.getProduct(productId);
      
      if (!existingProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      
      // Update product in Firebase
      const updatedProduct = await storage.updateProduct(productId, {
        ...parsedData,
        rating: parsedData.rating || existingProduct.rating,
        isBestseller: parsedData.isBestseller !== undefined ? parsedData.isBestseller : existingProduct.isBestseller,
        isNew: parsedData.isNew !== undefined ? parsedData.isNew : existingProduct.isNew
      });
      
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid product data",
          errors: error.errors
        });
      } else {
        console.error('Product update error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to update product"
        });
      }
    }
  });

  // Delete a product endpoint
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      
      // Delete product from Firebase
      const success = await storage.deleteProduct(productId);
      
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Product deleted successfully"
      });
    } catch (error) {
      console.error('Product deletion error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to delete product"
      });
    }
  });

  // ======================
  // SERVICE ENDPOINTS
  // ======================
  
  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.status(200).json(services);
    } catch (error) {
      console.error('Services fetch error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch services"
      });
    }
  });

  // Get a single service
  app.get("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      
      // Get service from Firebase
      const service = await storage.getService(serviceId);
      
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      
      res.status(200).json(service);
    } catch (error) {
      console.error('Service fetch error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch service"
      });
    }
  });

  // Add a new service
  app.post("/api/services", async (req, res) => {
    try {
      const parsedData = serviceSchema.parse(req.body);
      
      // Create service in Firebase
      const newService = await storage.createService(parsedData);
      
      res.status(201).json({
        success: true,
        message: "Service added successfully",
        service: newService
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid service data",
          errors: error.errors
        });
      } else {
        console.error('Service creation error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to add service"
        });
      }
    }
  });

  // Update a service
  app.put("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const parsedData = serviceSchema.parse(req.body);
      
      // Update service in Firebase
      const updatedService = await storage.updateService(serviceId, parsedData);
      
      if (!updatedService) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Service updated successfully",
        service: updatedService
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid service data",
          errors: error.errors
        });
      } else {
        console.error('Service update error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to update service"
        });
      }
    }
  });

  // Delete a service
  app.delete("/api/services/:id", async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      
      // Delete service from Firebase
      const success = await storage.deleteService(serviceId);
      
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Service deleted successfully"
      });
    } catch (error) {
      console.error('Service deletion error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to delete service"
      });
    }
  });

  // ======================
  // TESTIMONIAL ENDPOINTS
  // ======================
  
  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.status(200).json(testimonials);
    } catch (error) {
      console.error('Testimonials fetch error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch testimonials"
      });
    }
  });

  // Get a single testimonial
  app.get("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonialId = parseInt(req.params.id);
      
      // Get testimonial from Firebase
      const testimonial = await storage.getTestimonial(testimonialId);
      
      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found"
        });
      }
      
      res.status(200).json(testimonial);
    } catch (error) {
      console.error('Testimonial fetch error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch testimonial"
      });
    }
  });

  // Add a new testimonial
  app.post("/api/testimonials", async (req, res) => {
    try {
      const parsedData = testimonialSchema.parse(req.body);
      
      // Create testimonial in Firebase
      const newTestimonial = await storage.createTestimonial({
        ...parsedData,
        hasVideo: parsedData.hasVideo || false
      });
      
      res.status(201).json({
        success: true,
        message: "Testimonial added successfully",
        testimonial: newTestimonial
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid testimonial data",
          errors: error.errors
        });
      } else {
        console.error('Testimonial creation error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to add testimonial"
        });
      }
    }
  });

  // Update a testimonial
  app.put("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonialId = parseInt(req.params.id);
      const parsedData = testimonialSchema.parse(req.body);
      
      // Get existing testimonial from Firebase
      const existingTestimonial = await storage.getTestimonial(testimonialId);
      
      if (!existingTestimonial) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found"
        });
      }
      
      // Update testimonial in Firebase
      const updatedTestimonial = await storage.updateTestimonial(testimonialId, {
        ...parsedData,
        hasVideo: parsedData.hasVideo !== undefined ? parsedData.hasVideo : existingTestimonial.hasVideo
      });
      
      res.status(200).json({
        success: true,
        message: "Testimonial updated successfully",
        testimonial: updatedTestimonial
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid testimonial data",
          errors: error.errors
        });
      } else {
        console.error('Testimonial update error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to update testimonial"
        });
      }
    }
  });

  // Delete a testimonial
  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      const testimonialId = parseInt(req.params.id);
      
      // Delete testimonial from Firebase
      const success = await storage.deleteTestimonial(testimonialId);
      
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found"
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Testimonial deleted successfully"
      });
    } catch (error) {
      console.error('Testimonial deletion error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to delete testimonial"
      });
    }
  });

  // ======================
  // FAQ ENDPOINTS
  // ======================
  
  // Get all FAQs
  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFaqs();
      res.status(200).json(faqs);
    } catch (error) {
      console.error('FAQs fetch error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch FAQs"
      });
    }
  });

  // Get a single FAQ
  app.get("/api/faqs/:id", async (req, res) => {
    try {
      const faqId = parseInt(req.params.id);
      
      // Get FAQ from Firebase
      const faq = await storage.getFaq(faqId);
      
      if (!faq) {
        return res.status(404).json({
          success: false,
          message: "FAQ not found"
        });
      }
      
      res.status(200).json(faq);
    } catch (error) {
      console.error('FAQ fetch error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch FAQ"
      });
    }
  });

  // Add a new FAQ
  app.post("/api/faqs", async (req, res) => {
    try {
      const parsedData = faqSchema.parse(req.body);
      
      // Create FAQ in Firebase
      const newFaq = await storage.createFaq(parsedData);
      
      res.status(201).json({
        success: true,
        message: "FAQ added successfully",
        faq: newFaq
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid FAQ data",
          errors: error.errors
        });
      } else {
        console.error('FAQ creation error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to add FAQ"
        });
      }
    }
  });

  // Update a FAQ
  app.put("/api/faqs/:id", async (req, res) => {
    try {
      const faqId = parseInt(req.params.id);
      const parsedData = faqSchema.parse(req.body);
      
      // Update FAQ in Firebase
      const updatedFaq = await storage.updateFaq(faqId, parsedData);
      
      if (!updatedFaq) {
        return res.status(404).json({
          success: false,
          message: "FAQ not found"
        });
      }
      
      res.status(200).json({
        success: true,
        message: "FAQ updated successfully",
        faq: updatedFaq
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid FAQ data",
          errors: error.errors
        });
      } else {
        console.error('FAQ update error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to update FAQ"
        });
      }
    }
  });

  // Delete a FAQ
  app.delete("/api/faqs/:id", async (req, res) => {
    try {
      const faqId = parseInt(req.params.id);
      
      // Delete FAQ from Firebase
      const success = await storage.deleteFaq(faqId);
      
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "FAQ not found"
        });
      }
      
      res.status(200).json({
        success: true,
        message: "FAQ deleted successfully"
      });
    } catch (error) {
      console.error('FAQ deletion error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to delete FAQ"
      });
    }
  });

  // ======================
  // INTENT ENDPOINTS (Exit Intent Popup)
  // ======================
  
  // Get all intents
  app.get("/api/intents", async (req, res) => {
    try {
      const intents = await storage.getIntents();
      res.status(200).json(intents);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch intent form submissions"
      });
    }
  });
  
  // Intent form submission endpoint
  app.post("/api/intent", async (req, res) => {
    try {
      const parsedData = intentSchema.parse(req.body);
      
      // Ensure all required fields are provided
      const intentData = {
        name: parsedData.name,
        phone: parsedData.phone,
        service: parsedData.service || "Urgent Consultation",
        message: parsedData.message || "Building repair inquiry",
        consent: parsedData.consent
      };
      
      // Create intent in Firebase
      const newIntent = await storage.createIntent(intentData);
      
      res.status(200).json({
        success: true,
        message: "Intent form submitted successfully",
        intent: newIntent
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        console.error('Intent form creation error:', error);
        res.status(500).json({
          success: false,
          message: "Failed to process intent form"
        });
      }
    }
  });
  
  // Delete an intent form submission
  app.delete("/api/intents/:id", async (req, res) => {
    try {
      const intentId = parseInt(req.params.id);
      
      // Delete intent from Firebase
      const success = await storage.deleteIntent(intentId);
      
      if (!success) {
        return res.status(404).json({
          success: false,
          message: "Intent form submission not found"
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Intent form submission deleted successfully"
      });
    } catch (error) {
      console.error('Intent deletion error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to delete intent form submission"
      });
    }
  });

  // Set up authentication if needed
  // setupAuth(app);

  const httpServer = createServer(app);
  
  return httpServer;
}