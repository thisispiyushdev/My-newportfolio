"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticWrapper({ children, className = "" }: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Custom spring physics matching elastic bounce
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return; // Disable on mobile/touch
    
    const element = ref.current;
    if (!element) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = element.getBoundingClientRect();
    const targetX = clientX - (left + width / 2);
    const targetY = clientY - (top + height / 2);
    
    // Pull factor of 0.35
    x.set(targetX * 0.35);
    y.set(targetY * 0.35);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block w-full sm:w-auto ${className}`}
    >
      {children}
    </motion.div>
  );
}
