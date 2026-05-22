"use client";

import React, { useEffect, useState } from 'react';
import { motion, animate, useAnimation } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerControls = useAnimation();

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Animate progress value
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: [0.76, 0, 0.24, 1], // easeInOut
      onUpdate: (latest) => {
        setProgress(Math.round(latest));
      },
      onComplete: async () => {
        setIsDone(true);
        // Wait briefly for user to see the 100% state
        await new Promise((resolve) => setTimeout(resolve, 300));
        // Slide up the container
        await containerControls.start({
          y: "-100%",
          transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
        });
        document.body.style.overflow = 'auto';
        onComplete();
      }
    });

    return () => {
      controls.stop();
      document.body.style.overflow = 'auto';
    };
  }, [onComplete, containerControls]);

  // Terminal telemetry logs
  const logs = [
    "> fetching assets... done",
    "> initializing shader matrix... done",
    "> building digital instrument... done"
  ];

  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={containerControls}
      className="fixed inset-0 z-[999999] bg-[#030307] flex flex-col items-center justify-center pointer-events-auto"
    >
      {/* Decorative cyber grid lines */}
      <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-white/[0.02]"></div>
      <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-white/[0.02]"></div>
      <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-white/[0.02]"></div>
      <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-white/[0.02]"></div>

      <div className="flex flex-col items-center gap-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 uppercase"
        >
          SECURE PROTOCOL RUNNING
        </motion.div>
        
        <div className="relative overflow-hidden h-[12vw] md:h-[8vw] flex items-center justify-center select-none">
          <motion.h1 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[8vw] font-drama font-bold leading-none text-white tracking-tighter"
          >
            {progress}<span className="text-cyberlime font-sans">.</span>
          </motion.h1>
        </div>

        {/* Small live compilation log terminal mimic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-[280px] md:w-[350px] font-mono text-[9px] text-slate-500 bg-white/[0.02] border border-white/5 p-3 rounded-lg flex flex-col gap-1.5 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-1">
            <span className="text-cyan-400/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              sys.compile_v2
            </span>
            <span className="text-emerald-400">OK</span>
          </div>
          
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.3, duration: 0.4 }}
              className="text-slate-400/80 font-mono"
            >
              {log}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute bottom-12 w-full flex justify-between px-8 md:px-24 text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase">
        <span>© PIYUSH.PORTFOLIO // 2026</span>
        <span>Uptime 99.9%</span>
      </div>
    </motion.div>
  );
}
