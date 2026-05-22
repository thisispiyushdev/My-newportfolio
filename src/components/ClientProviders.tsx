"use client";

import React, { useEffect } from 'react';
import CustomCursor from './CustomCursor';
import Lenis from '@studio-freight/lenis';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: false,
      touchMultiplier: 1,
    } as any);

    let rafId: number;
    const update = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(update);
    };
    
    rafId = requestAnimationFrame(update);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      {children}
    </>
  );
}
