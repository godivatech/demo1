import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current viewport is mobile
 * 
 * @param {number} breakpoint - Width threshold to consider mobile (default: 768px)
 * @returns {boolean} True if viewport width is below the breakpoint
 */
export function useIsMobile(breakpoint = 768) {
  // Start with null to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(null);
  
  useEffect(() => {
    // Set the initial value
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Run once to set initial value
    checkMobile();
    
    // Set up event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);
  
  return isMobile;
}

/**
 * Custom hook to track current viewport width
 * 
 * @returns {number} Current viewport width
 */
export function useViewportWidth() {
  // Start with null to avoid hydration mismatch
  const [width, setWidth] = useState(null);
  
  useEffect(() => {
    // Set the initial value
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    
    // Run once to set initial value
    updateWidth();
    
    // Set up event listener for window resize
    window.addEventListener('resize', updateWidth);
    
    // Clean up event listener on unmount
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  return width;
}

export default useIsMobile;