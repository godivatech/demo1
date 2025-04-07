import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  contactSchema, productSchema, inquirySchema, serviceSchema, testimonialSchema, faqSchema,
  type Product, type Contact, type Inquiry, type Service, type Testimonial, type Faq
} from "@shared/schema";
import { generateSampleProducts } from "./data";

// Global store for website content
let products: Product[] = generateSampleProducts();
let contacts: Contact[] = [];
let inquiries: Inquiry[] = [];
let services: Service[] = [];
let testimonials: Testimonial[] = [];
let faqs: Faq[] = [];

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

  // Update a product endpoint
  app.put("/api/products/:id", (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const parsedData = productSchema.parse(req.body);
      
      const productIndex = products.findIndex(p => p.id === productId);
      
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      
      // Update product
      products[productIndex] = {
        ...parsedData,
        id: productId,
        rating: parsedData.rating || products[productIndex].rating,
        isBestseller: parsedData.isBestseller !== undefined ? parsedData.isBestseller : products[productIndex].isBestseller,
        isNew: parsedData.isNew !== undefined ? parsedData.isNew : products[productIndex].isNew
      };
      
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: products[productIndex]
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
          message: "Failed to update product"
        });
      }
    }
  });

  // Delete a product endpoint
  app.delete("/api/products/:id", (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const productIndex = products.findIndex(p => p.id === productId);
      
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      
      // Remove the product
      products.splice(productIndex, 1);
      
      res.status(200).json({
        success: true,
        message: "Product deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete product"
      });
    }
  });

  // SERVICE ENDPOINTS
  // Get all services
  app.get("/api/services", (req, res) => {
    res.status(200).json(services);
  });

  // Get a single service
  app.get("/api/services/:id", (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const service = services.find(s => s.id === serviceId);
      
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch service"
      });
    }
  });

  // Add a new service
  app.post("/api/services", (req, res) => {
    try {
      const parsedData = serviceSchema.parse(req.body);
      
      // Generate a new ID
      const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
      
      const newService: Service = {
        ...parsedData,
        id: newId
      };
      
      services.push(newService);
      
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
        res.status(500).json({
          success: false,
          message: "Failed to add service"
        });
      }
    }
  });

  // Update a service
  app.put("/api/services/:id", (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const parsedData = serviceSchema.parse(req.body);
      
      const serviceIndex = services.findIndex(s => s.id === serviceId);
      
      if (serviceIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      
      // Update service
      services[serviceIndex] = {
        ...parsedData,
        id: serviceId
      };
      
      res.status(200).json({
        success: true,
        message: "Service updated successfully",
        service: services[serviceIndex]
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid service data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to update service"
        });
      }
    }
  });

  // Delete a service
  app.delete("/api/services/:id", (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const serviceIndex = services.findIndex(s => s.id === serviceId);
      
      if (serviceIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }
      
      // Remove the service
      services.splice(serviceIndex, 1);
      
      res.status(200).json({
        success: true,
        message: "Service deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete service"
      });
    }
  });

  // TESTIMONIAL ENDPOINTS
  // Get all testimonials
  app.get("/api/testimonials", (req, res) => {
    res.status(200).json(testimonials);
  });

  // Get a single testimonial
  app.get("/api/testimonials/:id", (req, res) => {
    try {
      const testimonialId = parseInt(req.params.id);
      const testimonial = testimonials.find(t => t.id === testimonialId);
      
      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found"
        });
      }
      
      res.status(200).json(testimonial);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch testimonial"
      });
    }
  });

  // Add a new testimonial
  app.post("/api/testimonials", (req, res) => {
    try {
      const parsedData = testimonialSchema.parse(req.body);
      
      // Generate a new ID
      const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
      
      const newTestimonial: Testimonial = {
        ...parsedData,
        id: newId,
        hasVideo: parsedData.hasVideo || false
      };
      
      testimonials.push(newTestimonial);
      
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
        res.status(500).json({
          success: false,
          message: "Failed to add testimonial"
        });
      }
    }
  });

  // Update a testimonial
  app.put("/api/testimonials/:id", (req, res) => {
    try {
      const testimonialId = parseInt(req.params.id);
      const parsedData = testimonialSchema.parse(req.body);
      
      const testimonialIndex = testimonials.findIndex(t => t.id === testimonialId);
      
      if (testimonialIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found"
        });
      }
      
      // Update testimonial
      testimonials[testimonialIndex] = {
        ...parsedData,
        id: testimonialId,
        hasVideo: parsedData.hasVideo !== undefined ? parsedData.hasVideo : testimonials[testimonialIndex].hasVideo
      };
      
      res.status(200).json({
        success: true,
        message: "Testimonial updated successfully",
        testimonial: testimonials[testimonialIndex]
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid testimonial data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to update testimonial"
        });
      }
    }
  });

  // Delete a testimonial
  app.delete("/api/testimonials/:id", (req, res) => {
    try {
      const testimonialId = parseInt(req.params.id);
      const testimonialIndex = testimonials.findIndex(t => t.id === testimonialId);
      
      if (testimonialIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found"
        });
      }
      
      // Remove the testimonial
      testimonials.splice(testimonialIndex, 1);
      
      res.status(200).json({
        success: true,
        message: "Testimonial deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete testimonial"
      });
    }
  });

  // FAQ ENDPOINTS
  // Get all FAQs
  app.get("/api/faqs", (req, res) => {
    res.status(200).json(faqs);
  });

  // Get a single FAQ
  app.get("/api/faqs/:id", (req, res) => {
    try {
      const faqId = parseInt(req.params.id);
      const faq = faqs.find(f => f.id === faqId);
      
      if (!faq) {
        return res.status(404).json({
          success: false,
          message: "FAQ not found"
        });
      }
      
      res.status(200).json(faq);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch FAQ"
      });
    }
  });

  // Add a new FAQ
  app.post("/api/faqs", (req, res) => {
    try {
      const parsedData = faqSchema.parse(req.body);
      
      // Generate a new ID
      const newId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
      
      const newFaq: Faq = {
        ...parsedData,
        id: newId
      };
      
      faqs.push(newFaq);
      
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
        res.status(500).json({
          success: false,
          message: "Failed to add FAQ"
        });
      }
    }
  });

  // Update a FAQ
  app.put("/api/faqs/:id", (req, res) => {
    try {
      const faqId = parseInt(req.params.id);
      const parsedData = faqSchema.parse(req.body);
      
      const faqIndex = faqs.findIndex(f => f.id === faqId);
      
      if (faqIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "FAQ not found"
        });
      }
      
      // Update FAQ
      faqs[faqIndex] = {
        ...parsedData,
        id: faqId
      };
      
      res.status(200).json({
        success: true,
        message: "FAQ updated successfully",
        faq: faqs[faqIndex]
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid FAQ data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to update FAQ"
        });
      }
    }
  });

  // Delete a FAQ
  app.delete("/api/faqs/:id", (req, res) => {
    try {
      const faqId = parseInt(req.params.id);
      const faqIndex = faqs.findIndex(f => f.id === faqId);
      
      if (faqIndex === -1) {
        return res.status(404).json({
          success: false,
          message: "FAQ not found"
        });
      }
      
      // Remove the FAQ
      faqs.splice(faqIndex, 1);
      
      res.status(200).json({
        success: true,
        message: "FAQ deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete FAQ"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
