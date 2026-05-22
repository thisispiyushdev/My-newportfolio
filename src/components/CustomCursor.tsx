"use client";

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports hover
    if (window.matchMedia('(pointer: coarse)').matches) {
      return; // Disable on touch devices
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Update dot instantly
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
    };

    const updateRing = () => {
      // Lerp ring position
      ringPos.x += (mouse.x - ringPos.x) * 0.12;
      ringPos.y += (mouse.y - ringPos.y) * 0.12;
      
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(updateRing);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== 'function') return;

      if (target.closest('button') || target.closest('a') || target.closest('[data-cursor="interactive"]')) {
        dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(0.5)`;
        dot.style.backgroundColor = '#00f0ff'; // Cyan
        
        ring.style.width = '56px';
        ring.style.height = '56px';
        ring.style.margin = '-28px 0 0 -28px';
        ring.style.backgroundColor = 'rgba(203, 255, 0, 1)'; // Cyberlime
        ring.style.borderColor = 'transparent';
        ring.style.mixBlendMode = 'exclusion';
      } else if (target.closest('p') || target.closest('h1') || target.closest('h2') || target.closest('h3') || target.closest('span')) {
        dot.style.opacity = '0';
        
        ring.style.width = '4px';
        ring.style.height = '24px';
        ring.style.margin = '-12px 0 0 -2px';
        ring.style.borderRadius = '2px';
        ring.style.backgroundColor = '#00f0ff'; // Cyan line
        ring.style.borderColor = 'transparent';
        ring.style.mixBlendMode = 'normal';
      } else {
        dot.style.opacity = '1';
        dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(1)`;
        dot.style.backgroundColor = '#cbff00'; // Cyberlime
        
        ring.style.width = '32px';
        ring.style.height = '32px';
        ring.style.margin = '-16px 0 0 -16px';
        ring.style.borderRadius = '50%';
        ring.style.backgroundColor = 'transparent';
        ring.style.borderColor = 'rgba(0, 240, 255, 0.4)'; // Cyan ring outline
        ring.style.mixBlendMode = 'normal';
      }
    };

    const handleMouseDown = () => {
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(0.6)`;
    };
    const handleMouseUp = () => {
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(1)`;
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#cbff00] rounded-full pointer-events-none z-[10000] hidden md:block transition-[width,height,margin,background-color,border-color,border-radius,opacity,transform] duration-300 ease-out"
        style={{ transform: 'translate3d(0px, 0px, 0) translate(-50%, -50%)' }}
      />
      {/* Ring */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#00f0ff]/40 pointer-events-none z-[9999] hidden md:block transition-[width,height,margin,background-color,border-color,border-radius,opacity] duration-300 ease-out origin-center"
        style={{ transform: 'translate3d(0px, 0px, 0) translate(-50%, -50%)' }}
      />
    </>
  );
}
