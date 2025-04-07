import { pgTable, text, serial, integer, boolean, real, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original users table (keeping this as it's referenced elsewhere)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form schema
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  consent: boolean("consent").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be valid"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine(val => val === true, "You must agree to the terms")
});

export type Contact = typeof contacts.$inferSelect;
export type ContactForm = z.infer<typeof contactSchema>;

// Inquiry form schema (for popup)
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  issueType: text("issue_type").notNull(),
  message: text("message"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow()
});

export const inquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional().nullable().or(z.string().length(0)),
  phone: z.string().min(5, "Phone number is required"),
  issueType: z.string().min(1, "Issue type is required"),
  message: z.string().optional().nullable().or(z.string().length(0)),
  address: z.string().optional().nullable().or(z.string().length(0))
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof inquirySchema>;

// Product schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  image: text("image").notNull(),
  rating: real("rating").notNull().default(4.0),
  isBestseller: boolean("is_bestseller").default(false),
  isNew: boolean("is_new").default(false),
  category: varchar("category", { length: 50 }).notNull(),
});

export const productSchema = createInsertSchema(products).omit({
  id: true
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof productSchema>;

// Service schema
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  features: text("features").array().notNull(),
  slug: varchar("slug", { length: 50 }).notNull(),
});

export const serviceSchema = createInsertSchema(services).omit({
  id: true
});

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof serviceSchema>;

// Testimonial schema
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  rating: real("rating").notNull(),
  content: text("content").notNull(),
  hasVideo: boolean("has_video").default(false),
});

export const testimonialSchema = createInsertSchema(testimonials).omit({
  id: true
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof testimonialSchema>;

// FAQ schema
export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 255 }).notNull(),
  answer: text("answer").notNull(),
});

export const faqSchema = createInsertSchema(faqs).omit({
  id: true
});

export type Faq = typeof faqs.$inferSelect;
export type InsertFaq = z.infer<typeof faqSchema>;
