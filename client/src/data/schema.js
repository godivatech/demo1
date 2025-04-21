import { z } from "zod";

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be valid").regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine(val => val === true, "You must agree to the terms")
});

// Inquiry form schema
export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be valid").regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
  issueType: z.string().min(1, "Please select an issue type"),
  address: z.string().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal(""))
});

// Exit intent form schema (similar to contact but with different requirements)
export const intentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be valid").regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
  service: z.string(),
  message: z.string(),
  consent: z.boolean().refine(val => val === true, "You must agree to the terms")
});

// Product schema
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  rating: z.number().default(4.0),
  isBestseller: z.boolean().default(false),
  isNew: z.boolean().default(false),
  category: z.string()
});

// Service schema
export const serviceSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  features: z.array(z.string()),
  slug: z.string()
});

// Testimonial schema
export const testimonialSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  rating: z.number(),
  content: z.string(),
  hasVideo: z.boolean().default(false)
});

// FAQ schema
export const faqSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string()
});

// Before-After schema
export const beforeAfterSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  beforeImage: z.string(),
  afterImage: z.string()
});

// Stat schema
export const statSchema = z.object({
  id: z.number(),
  value: z.string(),
  label: z.string()
});

// Benefit schema
export const benefitSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  icon: z.string()
});

// Product Category schema
export const productCategorySchema = z.object({
  id: z.string(),
  name: z.string()
});