"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Card 1: Diagnostic Shuffler --- //
const shufflerItems = [
  { label: 'Cloud Architecture', status: 'RESILIENT', color: 'text-cyberlime font-bold' },
  { label: 'Security Protocols', status: 'ENFORCED', color: 'text-cyan-600 dark:text-cyan-400 font-bold' },
  { label: 'System Scalability', status: 'ELASTIC', color: 'text-purple-600 dark:text-purple-400 font-bold' },
];

function DiagnosticShuffler() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % shufflerItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-[140px] justify-center overflow-hidden [perspective:800px]">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex items-center justify-between border border-slate-200/50 dark:border-white/5 bg-slate-200/40 dark:bg-black/40 p-4 rounded-xl shadow-inner"
          style={{ transformOrigin: 'top center' }}
        >
          <span className="font-mono text-sm tracking-wide text-slate-700 dark:text-slate-300">
            {shufflerItems[currentIndex].label}
          </span>
          <span className={`font-mono text-xs tracking-widest ${shufflerItems[currentIndex].color} flex items-center gap-2`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {shufflerItems[currentIndex].status}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- Card 2: Telemetry Typewriter --- //
const telemetryMessages = [
  "INITIALIZING FULL-STACK ORCHESTRATION...",
  "DEPLOYING NODE.JS BACKEND...",
  "ATTACHING REACT FRONTEND...",
  "BRIDGING COMPLEX LOGIC TO CINEMATIC UI...",
  "SYSTEM NOMINAL."
];

function TelemetryTypewriter() {
  const [displayText, setDisplayText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let currentText = '';
    const message = telemetryMessages[messageIndex];
    let charIndex = 0;
    let scrambleTicks = 10;
    
    // Scramble phase
    const scrambleInterval = setInterval(() => {
      if (scrambleTicks > 0) {
        setDisplayText(Math.random().toString(36).substring(2, 10).toUpperCase());
        scrambleTicks--;
      } else {
        clearInterval(scrambleInterval);
        // Type phase
        const typeInterval = setInterval(() => {
          if (charIndex < message.length) {
            currentText += message[charIndex];
            setDisplayText(currentText);
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              setMessageIndex((prev) => (prev + 1) % telemetryMessages.length);
            }, 2000);
          }
        }, 30);
      }
    }, 40);

    return () => clearInterval(scrambleInterval);
  }, [messageIndex]);

  return (
    <div className="flex-1 flex flex-col justify-end min-h-[140px]">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        <span className="font-mono text-[9px] text-red-500 tracking-[0.2em] font-bold">LIVE TELEMETRY</span>
      </div>
      <p className="font-mono text-xs text-cyberlime break-words min-h-[3em]">
        {'> '} {displayText}
        <span className="animate-pulse inline-block w-1.5 h-3 align-middle bg-cyberlime ml-1"></span>
      </p>
    </div>
  );
}

// --- Card 3: Signal Graph --- //
function SignalGraph() {
  return (
    <div className="flex-1 min-h-[160px] flex flex-col justify-end pt-4">
      <p className="font-mono text-[10px] text-slate-500 dark:text-slate-400 mb-3 tracking-widest uppercase">CI/CD PIPELINE EFFICIENCY</p>
      <div className="relative w-full h-[80px]">
        <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            {/* Area Gradient */}
            <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
            </linearGradient>
            {/* Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Grid Lines */}
          <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2 2" />
          
          <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="40" y1="0" x2="40" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="60" y1="0" x2="60" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="80" y1="0" x2="80" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* Filled Area under the path */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: 'easeOut', delay: 0.2 }}
            d="M 0 35 L 20 25 L 40 30 L 60 10 L 80 15 L 100 5 L 100 40 L 0 40 Z"
            fill="url(#graphGradient)"
          />

          {/* Neon Path */}
          <motion.path 
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.0, ease: 'easeOut', delay: 0.3 }}
            d="M 0 35 L 20 25 L 40 30 L 60 10 L 80 15 L 100 5" 
            fill="none" 
            stroke="#00f0ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#neonGlow)"
          />

          {/* Dots on Vertices */}
          {[
            {x:0, y:35}, {x:20, y:25}, {x:40, y:30}, {x:60, y:10}, {x:80, y:15}, {x:100, y:5}
          ].map((pt, i) => (
             <circle 
               key={i} 
               cx={pt.x} 
               cy={pt.y} 
               r="3" 
               fill="#030307"
               stroke="#00f0ff"
               strokeWidth="1.5"
               className="animate-pulse"
               style={{ animationDelay: `${i * 0.2}s`, transformOrigin: `${pt.x}px ${pt.y}px` }}
             />
          ))}
        </svg>
      </div>
    </div>
  );
}

// --- Main Features Component --- //
export default function Features() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="features" className="py-24 px-6 md:px-16 w-full max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-xs font-mono tracking-[0.3em] text-cyberlime uppercase mb-4">Core Principles</h2>
        <h3 className="text-4xl md:text-5xl font-drama font-bold text-slate-800 dark:text-white leading-tight uppercase">
          The Architecture <br className="hidden md:block"/>of Impact
        </h3>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Card 1 */}
        <motion.div 
          variants={cardVariants}
          className="feature-card bg-slate-100/30 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 rounded-[2rem] p-8 shadow-xl flex flex-col hover:bg-slate-200/20 dark:hover:bg-white/[0.04] transition-all duration-300"
        >
          <div className="mb-6 flex-grow">
            <h4 className="font-sans font-bold text-xl mb-2 text-slate-800 dark:text-white">Architectural Integrity</h4>
            <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              I don’t just write code; I design AWS-certified cloud infrastructures that are resilient, scalable, and secure by default.
            </p>
          </div>
          <DiagnosticShuffler />
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          variants={cardVariants}
          className="feature-card bg-slate-100/30 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 rounded-[2rem] p-8 shadow-xl flex flex-col hover:bg-slate-200/20 dark:hover:bg-white/[0.04] transition-all duration-300"
        >
          <div className="mb-6 flex-grow">
            <h4 className="font-sans font-bold text-xl mb-2 text-slate-800 dark:text-white">Full-Stack Orchestration</h4>
            <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              Bridging the gap between complex backend logic (Node.js/Python) and immersive, high-conversion frontend experiences.
            </p>
          </div>
          <TelemetryTypewriter />
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          variants={cardVariants}
          className="feature-card bg-slate-100/30 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/5 rounded-[2rem] p-8 shadow-xl flex flex-col hover:bg-slate-200/20 dark:hover:bg-white/[0.04] transition-all duration-300"
        >
          <div className="mb-6 flex-grow">
            <h4 className="font-sans font-bold text-xl mb-2 text-slate-800 dark:text-white">DevOps Lifecycle</h4>
            <p className="font-sans text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              From local development to global deployment, I automate the entire pipeline to ensure 99.9% uptime and rapid iteration.
            </p>
          </div>
          <SignalGraph />
        </motion.div>

      </motion.div>
    </section>
  );
}
