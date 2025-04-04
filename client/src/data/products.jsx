/**
 * Product data for the application
 * @module data/products
 */

// Import schema type definitions for reference
import './schema';

/**
 * @type {import('./schema').Product[]}
 */
export const products = [
  {
    id: 1,
    name: "BD Terrace Shield",
    description: "Premium terrace waterproofing compound with UV resistance and thermal insulation properties.",
    price: 2450,
    image: "https://images.unsplash.com/photo-1620177123861-bbe8116e5de7?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
    isBestseller: true,
    isNew: false,
    category: "waterproofing"
  },
  {
    id: 2,
    name: "BD Crack Seal Pro",
    description: "High-strength polymer-modified crack filling compound for structural cracks in concrete and masonry.",
    price: 1850,
    image: "https://images.unsplash.com/photo-1590644286459-69bb243399f9?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    isBestseller: false,
    isNew: false,
    category: "repair"
  },
  {
    id: 3,
    name: "BD Concrete Booster",
    description: "Advanced concrete admixture that enhances strength, reduces water content, and improves workability.",
    price: 1350,
    image: "https://images.unsplash.com/photo-1621113171451-de62152b9e27?q=80&w=500&auto=format&fit=crop",
    rating: 4.9,
    isBestseller: false,
    isNew: true,
    category: "admixtures"
  },
  {
    id: 4,
    name: "BD Flex Seal",
    description: "Flexible polyurethane sealant for expansion joints and areas subject to movement with excellent adhesion.",
    price: 950,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    isBestseller: false,
    isNew: false,
    category: "sealants"
  },
  {
    id: 5,
    name: "BD Moisture Guard",
    description: "Advanced moisture barrier for interior walls that prevents dampness and fungal growth.",
    price: 1750,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=500&auto=format&fit=crop",
    rating: 4.5,
    isBestseller: false,
    isNew: false,
    category: "waterproofing"
  },
  {
    id: 6,
    name: "BD Surface Primer",
    description: "High-performance bonding primer for enhanced adhesion of coatings on various surfaces.",
    price: 850,
    image: "https://images.unsplash.com/photo-1517472292914-86da95ff4c7d?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    isBestseller: false,
    isNew: false,
    category: "coatings"
  },
  {
    id: 7,
    name: "BD Inject Seal",
    description: "Pressure injection grouting solution for sealing active water leakages in concrete structures.",
    price: 3250,
    image: "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?q=80&w=500&auto=format&fit=crop",
    rating: 4.9,
    isBestseller: true,
    isNew: false,
    category: "waterproofing"
  },
  {
    id: 8,
    name: "BD Tile Bond Ultra",
    description: "Premium tile adhesive with enhanced bonding properties for all types of tiles.",
    price: 1150,
    image: "https://images.unsplash.com/photo-1618242124039-71f0052d061e?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    isBestseller: false,
    isNew: false,
    category: "sealants"
  },
  {
    id: 9,
    name: "BD Rust Guard",
    description: "Advanced anti-corrosive coating for protecting reinforcement steel in concrete structures.",
    price: 1650,
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
    isBestseller: false,
    isNew: true,
    category: "coatings"
  },
  {
    id: 10,
    name: "BD Plaster Plus",
    description: "Polymer-modified cementitious plaster with enhanced strength and crack resistance.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1588362951121-5910f13f221b?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    isBestseller: false,
    isNew: false,
    category: "repair"
  },
  {
    id: 11,
    name: "BD Elastic Coat",
    description: "Elastomeric waterproof coating for terraces and external walls with excellent elongation properties.",
    price: 2850,
    image: "https://images.unsplash.com/photo-1513467655676-561b7d489a88?q=80&w=500&auto=format&fit=crop",
    rating: 4.9,
    isBestseller: true,
    isNew: false,
    category: "waterproofing"
  },
  {
    id: 12,
    name: "BD Concrete Repair Mortar",
    description: "High-strength, non-shrink, polymer-modified mortar for structural concrete repairs.",
    price: 1550,
    image: "https://images.unsplash.com/photo-1595689928439-ad64259eaa4e?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
    isBestseller: false,
    isNew: false,
    category: "repair"
  }
];

/**
 * @type {import('./schema').ProductCategory[]}
 */
export const productCategories = [
  { id: "all", name: "All Products" },
  { id: "waterproofing", name: "Waterproofing" },
  { id: "repair", name: "Repair Solutions" },
  { id: "admixtures", name: "Admixtures" },
  { id: "sealants", name: "Sealants" },
  { id: "coatings", name: "Coatings" }
];

/**
 * Get products by category ID
 * @param {string} categoryId - The category ID to filter by, or "all" for all products
 * @returns {import('./schema').Product[]} Filtered products
 */
export function getProductsByCategory(categoryId) {
  if (categoryId === "all") {
    return products;
  }
  return products.filter(product => product.category === categoryId);
}

/**
 * Get a product by ID
 * @param {number} id - The product ID
 * @returns {import('./schema').Product|undefined} The product or undefined if not found
 */
export function getProductById(id) {
  return products.find(product => product.id === id);
}

/**
 * Get related products (same category, excluding the given product)
 * @param {number} productId - The product ID to exclude
 * @param {number} limit - Maximum number of products to return
 * @returns {import('./schema').Product[]} Related products
 */
export function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}

/**
 * Get featured products
 * @param {number} limit - Maximum number of products to return
 * @returns {import('./schema').Product[]} Featured products
 */
export function getFeaturedProducts(limit = 4) {
  return products.filter(p => p.isBestseller).slice(0, limit);
}

/**
 * Get new products
 * @param {number} limit - Maximum number of products to return
 * @returns {import('./schema').Product[]} New products
 */
export function getNewProducts(limit = 4) {
  return products.filter(p => p.isNew).slice(0, limit);
}