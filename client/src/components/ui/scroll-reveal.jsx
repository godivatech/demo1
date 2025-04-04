import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/utils';
import useIntersectionObserver from '../../hooks/use-intersection-observer';

/**
 * ScrollReveal - A component to reveal content with animation when scrolled into view
 * 
 * @param {Object} props
 * @param {string} props.animation - Animation type: 'fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight', 'fade', 'scale'
 * @param {number} props.duration - Animation duration in seconds
 * @param {number} props.delay - Delay before starting animation in seconds
 * @param {number} props.threshold - Visibility threshold to trigger animation (0-1)
 * @param {string} props.className - Additional CSS classes
 * @param {ReactNode} props.children - Child elements to animate
 */
const ScrollReveal = ({
  animation = 'fadeUp',
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  className = '',
  children,
  ...props
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold,
    triggerOnce: true
  });

  // Define animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: animation === 'fadeUp' ? 50 : animation === 'fadeDown' ? -50 : 0,
      x: animation === 'fadeLeft' ? 50 : animation === 'fadeRight' ? -50 : 0,
      scale: animation === 'scale' ? 0.9 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div ref={ref} className={cn(className)} {...props}>
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={variants}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;