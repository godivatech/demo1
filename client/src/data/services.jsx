/**
 * Services data for the application
 * @module data/services
 */

// Import schema type definitions for reference
import './schema';

/**
 * @type {import('./schema').Service[]}
 */
export const services = [
  {
    id: 1,
    title: "Waterproofing Solutions",
    description: "Comprehensive waterproofing for terraces, bathrooms, basements, and external walls to prevent leakage and seepage issues.",
    image: "https://images.unsplash.com/photo-1584463623578-44c958d8a8c0?q=80&w=600&auto=format&fit=crop",
    features: [
      "Terrace waterproofing",
      "Bathroom waterproofing",
      "External wall treatments"
    ],
    slug: "waterproofing"
  },
  {
    id: 2,
    title: "Structural Repairs",
    description: "Expert repair solutions for concrete structures, including crack repairs, reinforcement protection, and structural strengthening.",
    image: "https://images.unsplash.com/photo-1541976498898-289b7b5c978c?q=80&w=600&auto=format&fit=crop",
    features: [
      "Concrete crack repairs",
      "Reinforcement protection",
      "Structural strengthening"
    ],
    slug: "structural-repairs"
  },
  {
    id: 3,
    title: "Sealants & Adhesives",
    description: "High-performance sealants and adhesives for various construction needs, including joint sealing and bonding applications.",
    image: "https://images.unsplash.com/photo-1582210384932-520604081492?q=80&w=600&auto=format&fit=crop",
    features: [
      "Joint sealing solutions",
      "Bonding applications",
      "Polyurethane & silicone sealants"
    ],
    slug: "sealants"
  },
  {
    id: 4,
    title: "Waterproof Coatings",
    description: "Specialized coatings for internal and external surfaces to protect against water damage, dampness, and weather deterioration.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
    features: [
      "Acrylic waterproof coatings",
      "Elastomeric membranes",
      "Weather-resistant finishes"
    ],
    slug: "coatings"
  },
  {
    id: 5,
    title: "Construction Chemicals",
    description: "Quality construction chemicals including additives, primers, bonding agents, and concrete admixtures for improved durability.",
    image: "https://images.unsplash.com/photo-1553786803-86dcd7070c84?q=80&w=600&auto=format&fit=crop",
    features: [
      "Concrete admixtures",
      "Bonding agents & primers",
      "Specialized additives"
    ],
    slug: "chemicals"
  },
  {
    id: 6,
    title: "Technical Consultation",
    description: "Expert advice and technical guidance for building-related problems, including site inspections and customized solutions.",
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=600&auto=format&fit=crop",
    features: [
      "Building condition assessments",
      "Solution recommendation",
      "Preventive maintenance plans"
    ],
    slug: "consultation"
  }
];

/**
 * Get a service by ID
 * @param {number} id - The service ID
 * @returns {import('./schema').Service|undefined} The service or undefined if not found
 */
export function getServiceById(id) {
  return services.find(service => service.id === id);
}

/**
 * Get a service by slug
 * @param {string} slug - The service slug
 * @returns {import('./schema').Service|undefined} The service or undefined if not found
 */
export function getServiceBySlug(slug) {
  return services.find(service => service.slug === slug);
}