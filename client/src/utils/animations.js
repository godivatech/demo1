/**
 * Animation utilities for Framer Motion
 */

// Fade in animation variant - optimized
export const fadeIn = (delay = 0, duration = 0.4) => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Fade in upward animation variant - optimized
export const fadeInUp = (delay = 0, duration = 0.4) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Fade in downward animation variant - optimized
export const fadeInDown = (delay = 0, duration = 0.4) => ({
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Fade in from left animation variant - optimized
export const fadeInLeft = (delay = 0, duration = 0.5) => ({
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Fade in from right animation variant - optimized
export const fadeInRight = (delay = 0, duration = 0.5) => ({
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Zoom in animation variant - optimized
export const zoomIn = (delay = 0, duration = 0.4) => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Staggered children animation - optimized
export const staggerContainer = (staggerChildren = 0.05, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// Bounce animation - optimized
export const bounce = (delay = 0, duration = 0.5) => ({
  hidden: { opacity: 0, y: 0 },
  visible: { 
    opacity: 1,
    y: [0, -10, 0],
    transition: {
      delay,
      duration,
      times: [0, 0.5, 1],
      ease: "easeOut"
    }
  }
});

// Rotate in animation - optimized
export const rotateIn = (delay = 0, duration = 0.4) => ({
  hidden: { opacity: 0, rotate: -10 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Pulse animation for WhatsApp button - optimized
export const pulse = {
  initial: { scale: 1, opacity: 0.7 },
  animate: { 
    scale: [1, 1.15, 1],
    opacity: [0.8, 0.6, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Page transition animation for App.jsx - optimized for performance
export const pageTransition = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};