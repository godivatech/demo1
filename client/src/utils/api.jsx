/**
 * API utilities for handling requests
 * @module utils/api
 */

/**
 * Make a request to the API
 * @param {string} url - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>} Response data
 * @throws {Error} If request fails
 */
export async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    // Check for no content
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Submit contact form data
 * @param {import('../data/schema').ContactForm} formData - Contact form data
 * @returns {Promise<object>} Response with success message
 */
export async function submitContactForm(formData) {
  // In the JSX version, we're mocking this API call
  // In a real implementation, this would send data to a backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Thank you for contacting us. We'll get back to you shortly."
      });
      
      // You might also want to log the form submission for demonstration
      console.log('Form submitted:', formData);
    }, 1000);
  });
}

/**
 * Get products data (mock implementation)
 * @returns {Promise<Array>} Products data
 */
export async function getProducts() {
  // In the JSX version, we're not making actual API calls
  // This is just a placeholder for demonstration
  // In actual implementation, we would import from the data files
  return new Promise((resolve) => {
    setTimeout(() => {
      // This would be replaced by an actual API call in a real implementation
      import('../data/products.jsx').then(module => {
        resolve(module.products);
      });
    }, 300);
  });
}