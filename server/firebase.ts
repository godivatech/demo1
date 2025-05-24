import { initializeApp } from 'firebase/app';
import { 
  getDatabase, ref, set, get, update, remove, push, child, 
  onValue, DataSnapshot, Query 
} from 'firebase/database';
import { 
  type User, 
  type InsertUser, 
  type Product, 
  type Service, 
  type Testimonial,
  type Faq,
  type Contact,
  type Inquiry,
  type Intent
} from "@shared/schema";
import MemStoreSession from 'memorystore';
import session from 'express-session';
import { getFirebaseConfig } from './firebase.config';

// Get Firebase config from environment variables or fallback
const firebaseConfig = getFirebaseConfig();

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

// In-memory session store
const MemoryStore = MemStoreSession(session);
export const sessionStore = new MemoryStore({
  checkPeriod: 86400000 // Prune expired entries every 24h
});

/**
 * Firebase Storage Implementation
 * Handles all data operations using Firebase Realtime Database
 */
export class FirebaseStorage {
  private checkDatabaseAvailability() {
    if (!firebaseConfig.databaseURL) {
      console.warn('Firebase Database URL is not set. Using in-memory fallback data.');
      return false;
    }
    return true;
  }

  // ===============================
  // User Methods
  // ===============================
  async getUser(id: number): Promise<User | undefined> {
    try {
      const snapshot = await get(ref(database, `users/${id}`));
      return snapshot.exists() ? snapshot.val() as User : undefined;
    } catch (error) {
      console.error('Firebase getUser error:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const snapshot = await get(ref(database, 'users'));
      if (!snapshot.exists()) return undefined;

      const users = snapshot.val();
      const userIds = Object.keys(users);
      for (const id of userIds) {
        if (users[id].username === username) {
          return { ...users[id], id: parseInt(id) };
        }
      }
      return undefined;
    } catch (error) {
      console.error('Firebase getUserByUsername error:', error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      // Generate a new ID - In a real app, this would be handled by Firebase
      let id = 1;

      // Get the highest existing ID
      const snapshot = await get(ref(database, 'users'));
      if (snapshot.exists()) {
        const users = snapshot.val();
        const userIds = Object.keys(users).map(id => parseInt(id));
        if (userIds.length > 0) {
          id = Math.max(...userIds) + 1;
        }
      }

      const newUser: User = { ...user, id };
      await set(ref(database, `users/${id}`), newUser);
      return newUser;
    } catch (error) {
      console.error('Firebase createUser error:', error);
      throw new Error('Failed to create user in Firebase');
    }
  }

  // ===============================
  // Product Methods
  // ===============================
  async getProducts(): Promise<Product[]> {
    try {
      const snapshot = await get(ref(database, 'products'));
      if (!snapshot.exists()) return [];

      const products = snapshot.val();
      return Object.keys(products).map(key => ({
        ...products[key],
        id: parseInt(key)
      }));
    } catch (error) {
      console.error('Firebase getProducts error:', error);
      return [];
    }
  }

  async getProduct(id: number): Promise<Product | undefined> {
    try {
      const snapshot = await get(ref(database, `products/${id}`));
      return snapshot.exists() ? { ...snapshot.val(), id } : undefined;
    } catch (error) {
      console.error('Firebase getProduct error:', error);
      return undefined;
    }
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      // Generate a new ID
      let id = 1;

      // Get the highest existing ID
      const snapshot = await get(ref(database, 'products'));
      if (snapshot.exists()) {
        const products = snapshot.val();
        const productIds = Object.keys(products).map(id => parseInt(id));
        if (productIds.length > 0) {
          id = Math.max(...productIds) + 1;
        }
      }

      const newProduct: Product = { ...product, id };
      await set(ref(database, `products/${id}`), newProduct);
      return newProduct;
    } catch (error) {
      console.error('Firebase createProduct error:', error);
      throw new Error('Failed to create product in Firebase');
    }
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined> {
    try {
      const snapshot = await get(ref(database, `products/${id}`));
      if (!snapshot.exists()) return undefined;

      const existingProduct = snapshot.val();
      const updatedProduct = { ...existingProduct, ...product, id };
      await set(ref(database, `products/${id}`), updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.error('Firebase updateProduct error:', error);
      return undefined;
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      const snapshot = await get(ref(database, `products/${id}`));
      if (!snapshot.exists()) return false;

      await remove(ref(database, `products/${id}`));
      return true;
    } catch (error) {
      console.error('Firebase deleteProduct error:', error);
      return false;
    }
  }

  // ===============================
  // Service Methods
  // ===============================
  async getServices(): Promise<Service[]> {
    try {
      const snapshot = await get(ref(database, 'services'));
      if (!snapshot.exists()) return [];

      const services = snapshot.val();
      return Object.keys(services).map(key => ({
        ...services[key],
        id: parseInt(key)
      }));
    } catch (error) {
      console.error('Firebase getServices error:', error);
      return [];
    }
  }

  async getService(id: number): Promise<Service | undefined> {
    try {
      const snapshot = await get(ref(database, `services/${id}`));
      return snapshot.exists() ? { ...snapshot.val(), id } : undefined;
    } catch (error) {
      console.error('Firebase getService error:', error);
      return undefined;
    }
  }

  async createService(service: Omit<Service, 'id'>): Promise<Service> {
    try {
      // Generate a new ID
      let id = 1;

      // Get the highest existing ID
      const snapshot = await get(ref(database, 'services'));
      if (snapshot.exists()) {
        const services = snapshot.val();
        const serviceIds = Object.keys(services).map(id => parseInt(id));
        if (serviceIds.length > 0) {
          id = Math.max(...serviceIds) + 1;
        }
      }

      const newService: Service = { ...service, id };
      await set(ref(database, `services/${id}`), newService);
      return newService;
    } catch (error) {
      console.error('Firebase createService error:', error);
      throw new Error('Failed to create service in Firebase');
    }
  }

  async updateService(id: number, service: Partial<Service>): Promise<Service | undefined> {
    try {
      const snapshot = await get(ref(database, `services/${id}`));
      if (!snapshot.exists()) return undefined;

      const existingService = snapshot.val();
      const updatedService = { ...existingService, ...service, id };
      await set(ref(database, `services/${id}`), updatedService);
      return updatedService;
    } catch (error) {
      console.error('Firebase updateService error:', error);
      return undefined;
    }
  }

  async deleteService(id: number): Promise<boolean> {
    try {
      const snapshot = await get(ref(database, `services/${id}`));
      if (!snapshot.exists()) return false;

      await remove(ref(database, `services/${id}`));
      return true;
    } catch (error) {
      console.error('Firebase deleteService error:', error);
      return false;
    }
  }

  // ===============================
  // Testimonial Methods
  // ===============================
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const snapshot = await get(ref(database, 'testimonials'));
      if (!snapshot.exists()) return [];

      const testimonials = snapshot.val();
      return Object.keys(testimonials).map(key => ({
        ...testimonials[key],
        id: parseInt(key)
      }));
    } catch (error) {
      console.error('Firebase getTestimonials error:', error);
      return [];
    }
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    try {
      const snapshot = await get(ref(database, `testimonials/${id}`));
      return snapshot.exists() ? { ...snapshot.val(), id } : undefined;
    } catch (error) {
      console.error('Firebase getTestimonial error:', error);
      return undefined;
    }
  }

  async createTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    try {
      // Generate a new ID
      let id = 1;

      // Get the highest existing ID
      const snapshot = await get(ref(database, 'testimonials'));
      if (snapshot.exists()) {
        const testimonials = snapshot.val();
        const testimonialIds = Object.keys(testimonials).map(id => parseInt(id));
        if (testimonialIds.length > 0) {
          id = Math.max(...testimonialIds) + 1;
        }
      }

      const newTestimonial: Testimonial = { ...testimonial, id };
      await set(ref(database, `testimonials/${id}`), newTestimonial);
      return newTestimonial;
    } catch (error) {
      console.error('Firebase createTestimonial error:', error);
      throw new Error('Failed to create testimonial in Firebase');
    }
  }

  async updateTestimonial(id: number, testimonial: Partial<Testimonial>): Promise<Testimonial | undefined> {
    try {
      const snapshot = await get(ref(database, `testimonials/${id}`));
      if (!snapshot.exists()) return undefined;

      const existingTestimonial = snapshot.val();
      const updatedTestimonial = { ...existingTestimonial, ...testimonial, id };
      await set(ref(database, `testimonials/${id}`), updatedTestimonial);
      return updatedTestimonial;
    } catch (error) {
      console.error('Firebase updateTestimonial error:', error);
      return undefined;
    }
  }

  async deleteTestimonial(id: number): Promise<boolean> {
    try {
      const snapshot = await get(ref(database, `testimonials/${id}`));
      if (!snapshot.exists()) return false;

      await remove(ref(database, `testimonials/${id}`));
      return true;
    } catch (error) {
      console.error('Firebase deleteTestimonial error:', error);
      return false;
    }
  }

  // ===============================
  // FAQ Methods
  // ===============================
  async getFaqs(): Promise<Faq[]> {
    try {
      const snapshot = await get(ref(database, 'faqs'));
      if (!snapshot.exists()) return [];

      const faqs = snapshot.val();
      return Object.keys(faqs).map(key => ({
        ...faqs[key],
        id: parseInt(key)
      }));
    } catch (error) {
      console.error('Firebase getFaqs error:', error);
      return [];
    }
  }

  async getFaq(id: number): Promise<Faq | undefined> {
    try {
      const snapshot = await get(ref(database, `faqs/${id}`));
      return snapshot.exists() ? { ...snapshot.val(), id } : undefined;
    } catch (error) {
      console.error('Firebase getFaq error:', error);
      return undefined;
    }
  }

  async createFaq(faq: Omit<Faq, 'id'>): Promise<Faq> {
    try {
      // Generate a new ID
      let id = 1;

      // Get the highest existing ID
      const snapshot = await get(ref(database, 'faqs'));
      if (snapshot.exists()) {
        const faqs = snapshot.val();
        const faqIds = Object.keys(faqs).map(id => parseInt(id));
        if (faqIds.length > 0) {
          id = Math.max(...faqIds) + 1;
        }
      }

      const newFaq: Faq = { ...faq, id };
      await set(ref(database, `faqs/${id}`), newFaq);
      return newFaq;
    } catch (error) {
      console.error('Firebase createFaq error:', error);
      throw new Error('Failed to create FAQ in Firebase');
    }
  }

  async updateFaq(id: number, faq: Partial<Faq>): Promise<Faq | undefined> {
    try {
      const snapshot = await get(ref(database, `faqs/${id}`));
      if (!snapshot.exists()) return undefined;

      const existingFaq = snapshot.val();
      const updatedFaq = { ...existingFaq, ...faq, id };
      await set(ref(database, `faqs/${id}`), updatedFaq);
      return updatedFaq;
    } catch (error) {
      console.error('Firebase updateFaq error:', error);
      return undefined;
    }
  }

  async deleteFaq(id: number): Promise<boolean> {
    try {
      const snapshot = await get(ref(database, `faqs/${id}`));
      if (!snapshot.exists()) return false;

      await remove(ref(database, `faqs/${id}`));
      return true;
    } catch (error) {
      console.error('Firebase deleteFaq error:', error);
      return false;
    }
  }

  // ===============================
  // Contact Methods
  // ===============================
  async getContacts(): Promise<Contact[]> {
    try {
      const snapshot = await get(ref(database, 'contacts'));
      if (!snapshot.exists()) return [];

      const contacts = snapshot.val();
      return Object.keys(contacts).map(key => ({
        ...contacts[key],
        id: parseInt(key),
        createdAt: new Date(contacts[key].createdAt)
      }));
    } catch (error) {
      console.error('Firebase getContacts error:', error);
      return [];
    }
  }

  async createContact(contact: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> {
    try {
      // Generate a new ID
      let id = 1;

      // Get the highest existing ID
      const snapshot = await get(ref(database, 'contacts'));
      if (snapshot.exists() && snapshot.val() !== null) {
        const contacts = snapshot.val();
        // Make sure contacts is not null and has keys
        if (contacts && Object.keys(contacts).length > 0) {
          // Filter out non-numeric keys and convert to numbers
          const contactIds = Object.keys(contacts)
            .filter(key => !isNaN(parseInt(key)))
            .map(key => parseInt(key));
          
          if (contactIds.length > 0) {
            id = Math.max(...contactIds) + 1;
          }
        }
      }

      // Ensure id is a valid number
      if (isNaN(id)) {
        id = 1; // Default to 1 if we somehow got NaN
        console.warn('ID calculation resulted in NaN, defaulting to 1');
      }

      const createdAt = new Date();
      const newContact: Contact = { 
        ...contact, 
        id, 
        createdAt 
      };
      
      // Extra validation to ensure we're not using NaN as an ID
      if (isNaN(newContact.id)) {
        throw new Error('Cannot create contact with invalid ID (NaN)');
      }
      
      await set(ref(database, `contacts/${id}`), {
        ...newContact,
        createdAt: createdAt.toISOString() // Store as string in Firebase
      });
      
      return newContact;
    } catch (error) {
      console.error('Firebase createContact error:', error);
      throw new Error('Failed to create contact in Firebase');
    }
  }
  
  async deleteContact(id: number): Promise<boolean> {
    try {
      const snapshot = await get(ref(database, `contacts/${id}`));
      if (!snapshot.exists()) return false;

      await remove(ref(database, `contacts/${id}`));
      return true;
    } catch (error) {
      console.error('Firebase deleteContact error:', error);
      return false;
    }
  }

  // ===============================
  // Inquiry Methods
  // ===============================
  async getInquiries(): Promise<Inquiry[]> {
    try {
      const snapshot = await get(ref(database, 'inquiries'));
      if (!snapshot.exists()) return [];

      const inquiries = snapshot.val();
      return Object.keys(inquiries).map(key => ({
        ...inquiries[key],
        id: parseInt(key),
        createdAt: inquiries[key].createdAt ? new Date(inquiries[key].createdAt) : null
      }));
    } catch (error) {
      console.error('Firebase getInquiries error:', error);
      return [];
    }
  }

  async createInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry> {
    try {
      // Generate a new ID
      let id = 1;

      // Get the highest existing ID
      const snapshot = await get(ref(database, 'inquiries'));
      if (snapshot.exists() && snapshot.val() !== null) {
        const inquiries = snapshot.val();
        // Make sure inquiries is not null and has keys
        if (inquiries && Object.keys(inquiries).length > 0) {
          // Filter out non-numeric keys and convert to numbers
          const inquiryIds = Object.keys(inquiries)
            .filter(key => !isNaN(parseInt(key)))
            .map(key => parseInt(key));
          
          if (inquiryIds.length > 0) {
            id = Math.max(...inquiryIds) + 1;
          }
        }
      }

      // Ensure id is a valid number
      if (isNaN(id)) {
        id = 1; // Default to 1 if we somehow got NaN
        console.warn('ID calculation resulted in NaN, defaulting to 1');
      }

      const createdAt = new Date();
      const newInquiry: Inquiry = { 
        ...inquiry, 
        id, 
        createdAt 
      };
      
      // Extra validation to ensure we're not using NaN as an ID
      if (isNaN(newInquiry.id)) {
        throw new Error('Cannot create inquiry with invalid ID (NaN)');
      }
      
      await set(ref(database, `inquiries/${id}`), {
        ...newInquiry,
        createdAt: createdAt.toISOString() // Store as string in Firebase
      });
      
      return newInquiry;
    } catch (error) {
      console.error('Firebase createInquiry error:', error);
      throw new Error('Failed to create inquiry in Firebase');
    }
  }
  
  async deleteInquiry(id: number): Promise<boolean> {
    try {
      const snapshot = await get(ref(database, `inquiries/${id}`));
      if (!snapshot.exists()) return false;

      await remove(ref(database, `inquiries/${id}`));
      return true;
    } catch (error) {
      console.error('Firebase deleteInquiry error:', error);
      return false;
    }
  }

  // ===============================
  // Intent Form Methods (Exit Intent Popup)
  // ===============================
  async getIntents(): Promise<Intent[]> {
    try {
      const snapshot = await get(ref(database, 'intents'));
      if (!snapshot.exists()) return [];

      const intents = snapshot.val();
      return Object.keys(intents).map(key => ({
        ...intents[key],
        id: parseInt(key),
        createdAt: intents[key].createdAt ? new Date(intents[key].createdAt) : null
      }));
    } catch (error) {
      console.error('Firebase getIntents error:', error);
      return [];
    }
  }

  async createIntent(intent: Omit<Intent, 'id' | 'createdAt'>): Promise<Intent> {
    try {
      // Generate a new ID
      let id = 1;

      // Get the highest existing ID
      const snapshot = await get(ref(database, 'intents'));
      if (snapshot.exists() && snapshot.val() !== null) {
        const intents = snapshot.val();
        // Make sure intents is not null and has keys
        if (intents && Object.keys(intents).length > 0) {
          // Filter out non-numeric keys and convert to numbers
          const intentIds = Object.keys(intents)
            .filter(key => !isNaN(parseInt(key)))
            .map(key => parseInt(key));
          
          if (intentIds.length > 0) {
            id = Math.max(...intentIds) + 1;
          }
        }
      }

      // Ensure id is a valid number
      if (isNaN(id)) {
        id = 1; // Default to 1 if we somehow got NaN
        console.warn('ID calculation resulted in NaN, defaulting to 1');
      }

      const createdAt = new Date();
      const newIntent: Intent = { 
        ...intent,
        id,
        createdAt
      };
      
      // Extra validation to ensure we're not using NaN as an ID
      if (isNaN(newIntent.id)) {
        throw new Error('Cannot create intent with invalid ID (NaN)');
      }
      
      await set(ref(database, `intents/${id}`), {
        ...newIntent,
        createdAt: createdAt.toISOString() // Store as string in Firebase
      });
      
      return newIntent;
    } catch (error) {
      console.error('Intent creation error:', error);
      throw new Error('Failed to create intent form submission in Firebase');
    }
  }

  async deleteIntent(id: number): Promise<boolean> {
    try {
      const snapshot = await get(ref(database, `intents/${id}`));
      if (!snapshot.exists()) return false;

      await remove(ref(database, `intents/${id}`));
      return true;
    } catch (error) {
      console.error('Firebase deleteIntent error:', error);
      return false;
    }
  }
}

export const firebaseStorage = new FirebaseStorage();