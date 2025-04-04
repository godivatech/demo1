import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/utils';
import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleUp
} from '../../utils/animations';

/**
 * AnimationWrapper - A component to easily wrap children in animated containers
 * 
 * @param {Object} props
 * @param {string} props.animation - Animation type: 'fade', 'fadeUp', 'fadeDown', 'fadeLeft', 'fadeRight', 'scale'
 * @param {number} props.duration - Animation duration in seconds
 * @param {number} props.delay - Delay before starting animation in seconds
 * @param {string} props.className - Additional CSS classes
 * @param {ReactNode} props.children - Child elements to animate
 * @returns {ReactElement} Animated component
 */
const AnimationWrapper = ({
  animation = 'fade',
  duration = 0.5,
  delay = 0,
  y = 30,
  x = 50,
  className = '',
  children,
  ...props
}) => {
  // Select the appropriate animation variant based on the animation prop
  let variants;
  
  switch (animation) {
    case 'fadeUp':
      variants = fadeInUp(delay, duration, y);
      break;
    case 'fadeDown':
      variants = fadeInDown(delay, duration, y);
      break;
    case 'fadeLeft':
      variants = fadeInLeft(delay, duration, x);
      break;
    case 'fadeRight':
      variants = fadeInRight(delay, duration, x);
      break;
    case 'scale':
      variants = scaleUp(delay, duration);
      break;
    case 'fade':
    default:
      variants = fadeIn(delay, duration);
      break;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;