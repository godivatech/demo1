// Simple type definitions for our data models
// This replaces the complex Drizzle schema with simpler prop types

/**
 * @typedef {Object} User
 * @property {number} id - User ID
 * @property {string} username - Username
 * @property {string} password - Password
 */

/**
 * @typedef {Object} ContactForm
 * @property {string} name - Name (min 2 chars)
 * @property {string} email - Email address
 * @property {string} phone - Phone number (min 10 chars)
 * @property {string} service - Selected service
 * @property {string} message - Message content (min 10 chars)
 * @property {boolean} consent - Terms agreement
 */

/**
 * @typedef {Object} Product
 * @property {number} id - Product ID
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {number} price - Product price in INR
 * @property {string} image - Product image URL
 * @property {number} rating - Product rating (1-5)
 * @property {boolean} [isBestseller] - Whether product is a bestseller
 * @property {boolean} [isNew] - Whether product is new
 * @property {string} category - Product category
 */

/**
 * @typedef {Object} Service
 * @property {number} id - Service ID
 * @property {string} title - Service title
 * @property {string} description - Service description
 * @property {string} image - Service image URL
 * @property {string[]} features - Service features list
 * @property {string} slug - Service URL slug
 */

/**
 * @typedef {Object} Testimonial
 * @property {number} id - Testimonial ID
 * @property {string} name - Customer name
 * @property {string} location - Customer location
 * @property {number} rating - Rating (1-5)
 * @property {string} content - Testimonial content
 * @property {boolean} hasVideo - Whether video testimonial exists
 */

/**
 * @typedef {Object} Faq
 * @property {number} id - FAQ ID
 * @property {string} question - FAQ question
 * @property {string} answer - FAQ answer
 */

/**
 * @typedef {Object} ProductCategory
 * @property {string} id - Category ID
 * @property {string} name - Category name
 */

/**
 * @typedef {Object} BeforeAfter
 * @property {number} id - Before/After ID
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {string} beforeImage - Before image URL
 * @property {string} afterImage - After image URL
 */

/**
 * @typedef {Object} Stat
 * @property {number} id - Stat ID
 * @property {string} value - Stat value
 * @property {string} label - Stat label
 */

/**
 * @typedef {Object} Benefit
 * @property {number} id - Benefit ID
 * @property {string} title - Benefit title
 * @property {string} description - Benefit description
 * @property {string} icon - Benefit icon name
 */

// Export as a module - these are only type definitions used for documentation
export default {};