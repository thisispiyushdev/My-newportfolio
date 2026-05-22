"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experienceData } from '../data/experienceData';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Line drawing animation via useScroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      id="experience" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-transparent py-24 md:py-32 px-6 md:px-16 overflow-hidden flex flex-col items-center z-10"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyberlime/[0.02] rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="flex flex-col items-center mb-24 z-10 w-full text-center">
        <h2 className="text-3xl md:text-5xl font-drama font-bold text-slate-800 dark:text-white mb-6 tracking-wider uppercase">
          EXPERIENCE
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-sans text-sm md:text-base max-w-2xl mx-auto font-light">
          A timeline of my professional journey, internships, and the technical roles that have shaped my career.
        </p>
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        {/* The Vertical CSS Line Container */}
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[1px] md:-translate-x-1/2 bg-slate-200 dark:bg-white/5">
          {/* The actual drawing "fill" line */}
          <motion.div 
            style={{ scaleY }}
            className="w-full h-full bg-gradient-to-b from-cyan-500 via-cyberlime to-transparent origin-top" 
          />
        </div>

        {/* Timeline Grid (Mobile vs Desktop) */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-y-16 md:gap-y-0 w-full relative z-10 pl-10 md:pl-0">
          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={exp.id} 
                className={`relative w-full flex ${
                  isLeft 
                    ? 'md:justify-end md:pr-16 lg:pr-24' 
                    : 'md:justify-start md:col-start-2 md:pl-16 lg:pl-24'
                } ${index !== 0 ? 'md:mt-32' : ''}`}
              >
                {/* Timeline Center Dot */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className={`absolute left-[-29px] top-10 w-12 h-12 rounded-full border border-cyberlime bg-slate-100 dark:bg-obsidian z-20 flex items-center justify-center shadow-[0_0_20px_rgba(203,255,0,0.15)] ${
                    isLeft ? 'md:left-auto md:-right-6' : 'md:-left-6'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-white p-1.5 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-transparent">
                    <Image 
                      src={exp.logo} 
                      alt="" 
                      width={40} 
                      height={40} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                </motion.div>

                {/* The Timeline Card */}
                <motion.div 
                  initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full xl:w-[85%] timeline-card"
                >
                  <div className="relative bg-slate-100/30 dark:bg-white/[0.01] border border-slate-200/50 dark:border-white/5 rounded-2xl p-6 md:p-8 w-full shadow-2xl backdrop-blur-xl transition-all hover:border-cyan-500/30 dark:hover:border-cyan/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] dark:hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:-translate-y-1 duration-300">
                    {/* Header section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 relative">
                      {/* Card Logo Image */}
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white p-2.5 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-white/10 shadow-md">
                        <Image 
                          src={exp.logo} 
                          alt={exp.company} 
                          width={60}
                          height={60}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col w-full">
                        <div className="flex justify-between items-start sm:items-center w-full mb-1 flex-col sm:flex-row gap-1 sm:gap-0">
                          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-mono whitespace-nowrap hidden sm:block">
                            {exp.duration}
                          </p>
                        </div>
                        <p className="text-cyan-600 dark:text-cyan text-sm md:text-base font-mono">
                          {exp.company}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 sm:hidden font-mono">
                          {exp.duration}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Core Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, sIdx) => (
                            <span 
                              key={sIdx}
                              className="px-3 py-1 bg-cyberlime/10 text-cyberlime text-[10px] font-mono rounded-md border border-cyberlime/20 shadow-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
