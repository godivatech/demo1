import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that detects when an element enters the viewport
 * 
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Percentage of element visibility needed to trigger (0-1)
 * @param {string} options.root - Element used as viewport for checking visibility
 * @param {string} options.rootMargin - Margin around root element
 * @param {boolean} options.triggerOnce - Whether to keep observing after first detection
 * @returns {Array} [ref, isVisible] - Ref to attach to element and visibility state
 */
const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = '0%',
  triggerOnce = false,
} = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [wasTriggered, setWasTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observerRef = ref.current;
    
    // Return early if ref not set or already triggered for triggerOnce
    if (!observerRef || (triggerOnce && wasTriggered)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility state based on intersection
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setWasTriggered(true);
            // Unobserve if triggerOnce is true and element is visible
            observer.unobserve(observerRef);
          }
        } else if (!triggerOnce) {
          // Only update to false if not triggerOnce
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(observerRef);

    // Cleanup observer on component unmount
    return () => {
      if (observerRef) {
        observer.unobserve(observerRef);
      }
    };
  }, [threshold, root, rootMargin, triggerOnce, wasTriggered]);

  return [ref, isVisible];
};

export default useIntersectionObserver;