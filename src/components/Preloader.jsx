import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      // Animate counter
      const progressObj = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = 'auto';
          if (onComplete) onComplete();
        }
      });

      tl.to(progressObj, {
        value: 100,
        duration: 2.5,
        ease: 'power3.inOut',
        onUpdate: () => {
          setProgress(Math.round(progressObj.value));
        }
      })
      // Slide out animation
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0.2
      });

    }, containerRef);

    return () => {
      document.body.style.overflow = 'auto';
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999999] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Decorative lines */}
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white/5"></div>
      <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-white/5"></div>
      
      <div className="relative overflow-hidden mb-4">
        <h1 className="text-[15vw] md:text-[10vw] font-drama font-bold leading-none text-white tracking-tighter">
          {progress}<span className="text-champagne">%</span>
        </h1>
      </div>
      
      <div className="absolute bottom-12 w-full flex justify-between px-12 md:px-24 text-xs font-mono tracking-widest text-white/40 uppercase">
        <span>Initializing Environment</span>
        <span>Awwwards Tier System</span>
      </div>
    </div>
  );
}
