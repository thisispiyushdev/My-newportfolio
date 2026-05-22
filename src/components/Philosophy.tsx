"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax background using Framer Motion scroll hook
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const statement1 = "Most standard developers focus on: shipping features and writing functionally correct code.";
  const statement2 = "I focus on: ";
  const highlight = "engineering digital resilience.";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  const renderWords = (text: string, isHeading = false, isHighlight = false) => {
    return text.split(' ').map((word, i) => (
      <motion.span 
        variants={wordVariants}
        key={i} 
        className={`inline-block mr-2 md:mr-3 ${
          isHeading 
            ? (isHighlight 
                ? 'text-cyberlime italic font-semibold drop-shadow-[0_0_15px_rgba(203,255,0,0.3)]' 
                : 'text-slate-900 dark:text-white') 
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <section 
      id="philosophy" 
      ref={sectionRef} 
      className="relative w-full py-32 md:py-48 bg-transparent overflow-hidden border-y border-slate-200/50 dark:border-white/5"
    >
      {/* Parallax Background Texture */}
      <motion.div 
        style={{
          y: backgroundY,
          backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="absolute inset-x-0 -top-[10%] h-[120%] w-full z-0 opacity-[0.03] dark:opacity-[0.05]"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 flex flex-col justify-center h-full">
        
        <div className="mb-16">
          <p className="font-mono text-sm tracking-widest text-cyberlime uppercase mb-4">The Philosophy</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-12 max-w-4xl"
        >
          {/* Statement 1 */}
          <p className="font-sans text-xl md:text-3xl leading-relaxed font-light">
            {renderWords(statement1)}
          </p>

          {/* Statement 2 */}
          <h2 className="font-drama text-[clamp(2rem,6vw,4.5rem)] leading-tight font-bold tracking-tight">
            {renderWords(statement2, true)}
            {renderWords(highlight, true, true)}
          </h2>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 border-l border-cyberlime/30 pl-6 md:pl-10"
          >
            <p className="font-sans text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-light">
              I operate at the intersection of structural logic and creative expression. With a foundation as an AWS Certified Solutions Architect, I view code as infrastructure and interfaces as instruments. My mission is to ensure that while the backend handles millions of requests with surgical precision, the user experience remains fluid, cinematic, and human.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
