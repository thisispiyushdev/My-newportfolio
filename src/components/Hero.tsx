"use client";

import { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';
import { motion } from 'framer-motion';
import myImg from '../assets/my.png';
import MagneticWrapper from './MagneticWrapper';
import ContactForm from './ContactForm';

export default function Hero() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const lineVariants = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[100dvh] overflow-hidden bg-transparent flex items-center pt-24 md:pt-32 pb-10 md:pb-20 px-6 md:px-16"
    >
      {/* Background Decor */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 -left-20 md:-left-32 w-56 h-56 md:w-80 md:h-80 border border-cyberlime/20 dark:border-cyberlime/10 rounded-full pointer-events-none blur-[2px]" 
      />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-obsidian dark:via-obsidian/20 dark:to-transparent pointer-events-none" />

      {/* Hero Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-[1400px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 mt-8 md:mt-0"
      >
        {/* Left Side: Typography */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0 w-full relative z-10">
          <div className="overflow-hidden mb-6 px-2 w-full">
            <motion.h2 
              variants={lineVariants}
              className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-cyan-500 dark:text-cyan-400 uppercase break-words glow-neon-green"
            >
              Architectural Integrity. DevOps Mastery.
            </motion.h2>
          </div>
          
          <h1 className="font-drama font-bold tracking-tight leading-[1.05] w-full relative -left-1 md:-left-2 z-20">
            <div className="overflow-hidden pb-2 px-2">
              <motion.div 
                variants={lineVariants}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-slate-800 dark:text-white"
              >
                Engineering
              </motion.div>
            </div>
            <div className="overflow-hidden pb-4 px-2 min-h-[1.5em]">
              <motion.div 
                variants={lineVariants}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] text-cyberlime italic mt-1 md:mt-2 whitespace-nowrap glow-neon-green"
              >
                <Typewriter
                  words={['Full-Stack Engineer', 'Solution Architect', 'Cloud Architect', 'DevOps Engineer', 'Backend Engineer']}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={100}
                  deleteSpeed={60}
                  delaySpeed={2500}
                />
              </motion.div>
            </div>
          </h1>
          
          <motion.p 
            variants={itemVariants}
            className="mt-6 md:mt-8 max-w-[500px] text-sm md:text-lg font-sans text-slate-600 dark:text-slate-300 leading-relaxed font-light"
          >
            I orchestrate high-performance distributed systems on AWS and craft immersive, human-centric web experiences.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto"
          >
            <MagneticWrapper>
              <a
                href="https://drive.google.com/file/d/14hmvSPqzm7OmCn0xXable5qP9st8Q3_C/view"
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-full bg-cyberlime text-obsidian font-mono text-xs tracking-widest font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-[0_4px_20px_rgba(203,255,0,0.3)]"
              >
                DOWNLOAD CV
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <button
                onClick={() => setIsFormOpen(true)}
                data-cursor="interactive"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-full border border-cyan-500/40 dark:border-cyan-400/40 text-cyan-600 dark:text-cyan-400 font-mono text-xs tracking-widest font-bold hover:bg-cyan-500/10 hover:border-cyan-500 dark:hover:bg-cyan-400/10 dark:hover:border-cyan-400 transition-all duration-300 shadow-[0_4px_15px_rgba(0,240,255,0.05)]"
              >
                LET'S TALK
              </button>
            </MagneticWrapper>
          </motion.div>
        </div>

        {/* Right Side: Profile Image */}
        <motion.div 
          variants={itemVariants}
          animate={{
            y: [-10, 10, -10],
            rotateZ: [-1, 1, -1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex-shrink-0 w-64 h-64 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full border border-slate-200/50 dark:border-white/10 shadow-[0_0_60px_rgba(0,240,255,0.08)] dark:shadow-[0_0_60px_rgba(0,240,255,0.15)] overflow-hidden flex items-center justify-center bg-slate-100/40 dark:bg-obsidian/40 backdrop-blur-xl group z-0 mt-12 md:mt-0 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 border border-cyberlime/20 rounded-full scale-95 pointer-events-none z-10" />
          <Image 
            src={myImg} 
            alt="Piyush Profile" 
            placeholder="blur"
            priority
            className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105 filter grayscale contrast-115 opacity-90"
          />
        </motion.div>
      </motion.div>

      {isFormOpen && <ContactForm onClose={() => setIsFormOpen(false)} />}
    </section>
  );
}
