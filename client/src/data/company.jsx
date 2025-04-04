/**
 * Company information and general data
 * @module data/company
 */

// Import schema type definitions for reference
import './schema';

// Company Information
export const COMPANY_NAME = "OM Vinayaga Associates";
export const COMPANY_TITLE = "Building Doctor Franchise";
export const COMPANY_DESCRIPTION = "Your trusted partner for all building repair and maintenance needs in Madurai and surrounding areas.";

// Contact Information
export const CONTACT = {
  director: "Er.Ramesh Jeyaraman B.E",
  title: "Director", 
  phone: ["+91 93429 68038", "+91 78737 32323"],
  email: "madurai@buildingdoctor.org",
  address: "OM Vinayaga Associates, No:6, North Gate, Opp:Devaki Scan center, S.S.Colony, Madurai-16",
  workingHours: "Monday - Saturday: 9:30 AM - 7:30 PM",
  website: "www.buildingdoctor.org",
  social: {
    facebook: "BuildingDoctor Madurai",
    twitter: "@BuildingDoctor3",
    instagram: "building__doctor",
    whatsapp: "https://wa.link/iu1g4q"
  }
};

/**
 * @type {import('./schema').Testimonial[]}
 */
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Homeowner, SS Colony",
    rating: 5,
    content: "I had persistent leakage issues in my terrace for years. The team at OM Vinayaga Associates provided a comprehensive waterproofing solution that completely solved the problem. Highly professional service and excellent results!",
    hasVideo: true
  },
  {
    id: 2,
    name: "Meenakshi Sundaram",
    location: "Apartment Association, Anna Nagar",
    rating: 5,
    content: "We hired OM Vinayaga Associates for waterproofing all terraces in our apartment complex. Their work was exceptional - no more complaints from residents about leakages even during heavy monsoons. Their technical expertise and quality of products are outstanding.",
    hasVideo: true
  },
  {
    id: 3,
    name: "Dr. Lakshmi Narayanan",
    location: "School Principal, Madurai",
    rating: 4.5,
    content: "We engaged OM Vinayaga Associates for structural repairs and waterproofing work at our school building. The team was extremely professional, completed the project on time, and provided excellent after-service support. The results have been long-lasting.",
    hasVideo: true
  }
];

/**
 * @type {import('./schema').Faq[]}
 */
export const FAQS = [
  {
    id: 1,
    question: "What causes building cracks?",
    answer: "Building cracks can occur due to various reasons such as foundation settlement, temperature changes, moisture, and structural issues. These factors can lead to stress on the building materials, resulting in cracks forming over time. Regular maintenance and addressing underlying issues promptly can help prevent and mitigate the impact of cracks on buildings."
  },
  {
    id: 2,
    question: "What are the common reasons for roof leakages?",
    answer: "Common reasons for roof leakages include cracks in the terrace surface, damaged or improperly installed waterproofing membranes, gaps or deterioration around edges and joints, and insufficient drainage leading to water pooling. These issues can be effectively addressed with proper waterproofing solutions and regular maintenance."
  },
  {
    id: 3,
    question: "How often should waterproofing be done?",
    answer: "The frequency of waterproofing depends on factors like the quality of the previous application, climate conditions, and building usage. Generally, a good quality waterproofing treatment should last 5-7 years. However, it's recommended to have annual inspections to identify and address any issues before they become serious problems."
  },
  {
    id: 4,
    question: "How do you prevent dampness in walls?",
    answer: "Preventing dampness in walls involves identifying and addressing the source of moisture, applying appropriate waterproof coatings or treatments, ensuring proper ventilation, fixing plumbing leaks promptly, and maintaining exterior surfaces. Our specialized damp-proofing solutions create effective barriers against moisture penetration."
  },
  {
    id: 5,
    question: "Can you waterproof an old building?",
    answer: "Yes, old buildings can be effectively waterproofed with the right approach. This typically involves thorough assessment of the structure, repair of existing damage, appropriate surface preparation, and application of suitable waterproofing systems. Our experts specialize in providing customized waterproofing solutions for buildings of all ages."
  },
  {
    id: 6,
    question: "What is the warranty for your services?",
    answer: "We provide warranties ranging from 2-7 years for our services, depending on the type of treatment and application. Our waterproofing solutions typically come with a 5-year warranty, while structural repairs and other services have varying warranty periods. All warranties include periodic inspections and necessary maintenance services."
  }
];

/**
 * @type {import('./schema').BeforeAfter[]}
 */
export const BEFORE_AFTER = [
  {
    id: 1,
    title: "Terrace Waterproofing",
    description: "Eliminated persistent leakage issues in a 10-year-old residential building using our advanced waterproofing system.",
    beforeImage: "https://images.unsplash.com/photo-1569847205387-ec7215f54da1?q=80&w=800&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1590902657701-a8bc6a873740?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Wall Crack Repair",
    description: "Permanently fixed structural cracks in walls using our specialized crack-filling compounds and strengthening treatments.",
    beforeImage: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?q=80&w=800&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?q=80&w=800&auto=format&fit=crop"
  }
];

/**
 * @type {import('./schema').Stat[]}
 */
export const STATS = [
  { id: 1, value: "1000+", label: "Projects Completed" },
  { id: 2, value: "10000+", label: "Happy Customers" },
  { id: 3, value: "100+", label: "Products" },
  { id: 4, value: "75+", label: "Services" }
];

/**
 * @type {import('./schema').Benefit[]}
 */
export const BENEFITS = [
  {
    id: 1,
    title: "Certified Expertise",
    description: "ISO 9001:2000 certified company with trained professionals and specialized equipment for all building repair services.",
    icon: "certificate"
  },
  {
    id: 2,
    title: "Quality Assurance",
    description: "Premium quality products and application methods with guaranteed solutions and post-service support.",
    icon: "shield-alt"
  },
  {
    id: 3,
    title: "Comprehensive Solutions",
    description: "One-stop solution for all building repair needs with customized approaches for each unique problem.",
    icon: "tools"
  }
];