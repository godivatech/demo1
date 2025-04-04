/**
 * Utility functions for the application
 * @module utils/utils
 */

/**
 * Combines multiple class names into a single string, filtering out falsy values
 * @param {...(string|boolean|null|undefined)} classes - CSS class names to combine
 * @returns {string} Combined class string
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format price as Indian currency
 * @param {number} price - Price in INR
 * @returns {string} Formatted price string
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Create stars array for rendering ratings
 * @param {number} rating - Rating value (0-5)
 * @returns {Array<string>} Array of star types ('full', 'half', or 'empty')
 */
export function getRatingStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push('half');
  }
  
  // Fill the rest with empty stars
  while (stars.length < 5) {
    stars.push('empty');
  }
  
  return stars;
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Scroll to element with ID, accounting for header height
 * @param {string} id - Element ID
 * @param {number} offset - Additional offset in pixels
 */
export function scrollToElement(id, offset = 0) {
  const element = document.getElementById(id);
  if (!element) return;
  
  const headerHeight = 80; // Approximate header height
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}