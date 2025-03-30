'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  offset?: number;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

export const ScrollAnimation = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  offset = 30,
  onAnimationStart,
  onAnimationComplete,
}: ScrollAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ 
        once: true,
        margin: `-${offset}px 0px -50px 0px`,
        amount: 0.1
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      style={{ 
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
}; 