"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "./ContactForm";

export default function InitiateProtocol() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: "100%", 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const textVariants = {
    hidden: { y: 60, opacity: 0, skewX: 10 },
    visible: { 
      y: 0, 
      opacity: 1, 
      skewX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } // Custom out-quart ease
    }
  };

  const btnVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 200, damping: 15 }
    }
  };

  return (
    <section 
      id="initiate-protocol" 
      className="relative min-h-[80vh] w-full bg-transparent text-white flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden border-t border-white/5 font-sans"
    >
      {/* Background Matrix/Grid Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(203, 255, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(203, 255, 0, 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyberlime/[0.02] rounded-full blur-[150px] mix-blend-screen opacity-50 z-0 pointer-events-none"></div>

      {/* Main Terminal Frame */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full max-w-5xl rounded-2xl border border-cyberlime/20 bg-white/[0.01] backdrop-blur-xl p-8 md:p-16 shadow-[0_0_50px_rgba(203,255,0,0.05)] outline outline-1 outline-white/5"
      >
        
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-8">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-cyberlime"></div>
          </div>
          <p className="text-cyberlime/70 font-mono text-xs tracking-widest uppercase">sys.terminal_v1.0</p>
        </div>

        {/* Console Text Area */}
        <div className="font-mono text-left mb-12 space-y-4">
          <motion.p 
            variants={lineVariants}
            className="text-cyberlime/80 text-sm md:text-base border-l-2 border-cyberlime pl-4 overflow-hidden whitespace-nowrap"
          >
            &gt; Analyzing system requirements... [OK]
          </motion.p>
          <motion.p 
            variants={lineVariants}
            className="text-cyberlime/80 text-sm md:text-base border-l-2 border-cyberlime pl-4 overflow-hidden whitespace-nowrap"
          >
            &gt; Verifying cloud architecture topology... [OK]
          </motion.p>
          <motion.p 
            variants={lineVariants}
            className="text-cyberlime text-sm md:text-base border-l-2 border-cyberlime pl-4 overflow-hidden whitespace-nowrap"
          >
            &gt; System Status: READY FOR DEPLOYMENT
          </motion.p>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-16 overflow-hidden">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase inline-flex flex-wrap justify-center gap-4 font-sans mb-6">
            <motion.span 
              variants={textVariants}
              className="glitch-text text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              Initiate
            </motion.span>
            <motion.span 
              variants={textVariants}
              className="glitch-text text-cyberlime drop-shadow-[0_0_20px_rgba(203,255,0,0.4)]"
            >
              Protocol
            </motion.span>
          </h2>
          <motion.p 
            variants={textVariants}
            className="text-slate-400 max-w-2xl mx-auto font-sans text-base md:text-lg font-light leading-relaxed"
          >
            Looking for a resilient, high-performance distributed system or a sleek modern web application? Begin the engagement sequence to architect your success.
          </motion.p>
        </div>

        {/* Interactive Action Area */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <motion.button
            variants={btnVariants}
            onClick={() => setIsFormOpen(true)}
            className="action-btn group relative px-10 py-5 bg-cyberlime text-obsidian rounded-none font-mono tracking-widest font-bold uppercase overflow-hidden hover:bg-white transition-colors duration-300 shadow-[0_0_25px_rgba(203,255,0,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)]"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-obsidian animate-pulse"></span>
              Execute Connect
            </span>
          </motion.button>

          <motion.a
            variants={btnVariants}
            href="https://drive.google.com/file/d/14hmvSPqzm7OmCn0xXable5qP9st8Q3_C/view"
            target="_blank"
            rel="noreferrer"
            className="action-btn group px-8 py-4 border border-cyberlime/30 text-cyberlime hover:text-white hover:border-white hover:bg-white/5 rounded-none font-mono text-xs tracking-widest font-bold transition-all"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
          >
            Download Data.CV
          </motion.a>
        </div>
        
      </motion.div>

      {/* Conditional Contact Form Modal popup inside AnimatePresence */}
      <AnimatePresence>
        {isFormOpen && <ContactForm onClose={() => setIsFormOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
