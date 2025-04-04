import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and filters them through tailwind-merge
 * to resolve conflicts and optimize the resulting className string
 * 
 * @param {...string} inputs - Class names to merge
 * @returns {string} Optimized className string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a numeric price to a localized currency string
 * 
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: 'INR')
 * @returns {string} Formatted price string
 */
export function formatPrice(price, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Generates a URL-friendly slug from a string
 * 
 * @param {string} string - The string to convert
 * @returns {string} URL-friendly slug
 */
export function generateSlug(string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncates text to a maximum length and adds ellipsis if needed
 * 
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generates a star rating display string
 * 
 * @param {number} rating - Rating value (0-5)
 * @returns {string} Star rating string (e.g., "★★★★☆")
 */
export function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  
  return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
}

/**
 * Formats a date string to a localized format
 * 
 * @param {string} dateString - ISO date string
 * @param {string} locale - Locale string (default: 'en-IN')
 * @returns {string} Formatted date string
 */
export function formatDate(dateString, locale = 'en-IN') {
  if (!dateString) return '';
  
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString(locale, options);
}