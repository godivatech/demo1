/**
 * Animation configurations for use throughout the website
 * Using framer-motion for smooth, performant animations
 */

// Fade in animation for elements
export const fadeIn = (delay = 0, duration = 0.6) => ({
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Fade in from bottom animation
export const fadeInUp = (delay = 0, duration = 0.6, y = 30) => ({
  hidden: { 
    opacity: 0, 
    y 
  },
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

// Fade in from top animation
export const fadeInDown = (delay = 0, duration = 0.6, y = -30) => ({
  hidden: { 
    opacity: 0, 
    y 
  },
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

// Fade in from left animation
export const fadeInLeft = (delay = 0, duration = 0.6, x = -50) => ({
  hidden: { 
    opacity: 0, 
    x 
  },
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

// Fade in from right animation
export const fadeInRight = (delay = 0, duration = 0.6, x = 50) => ({
  hidden: { 
    opacity: 0, 
    x 
  },
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

// Scale up animation
export const scaleUp = (delay = 0, duration = 0.6) => ({
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
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

// Stagger animation for lists (to be used with the children of a parent motion.div)
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// Hover animation for cards and clickable elements
export const hoverScale = {
  whileHover: { 
    scale: 1.03,
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.98 
  }
};

// Pulse animation for attention-grabbing elements
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

// Animation for page transitions
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3,
      ease: "easeInOut" 
    }
  }
};

// List item stagger animation
export const listItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Animation for sections as they come into view
export const scrollReveal = {
  hidden: { opacity: 0, y: 75 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};