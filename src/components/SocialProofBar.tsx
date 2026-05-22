"use client";

import React from 'react';

export default function SocialProofBar() {
  const techLogos = [
    "AWS ARCHITECTURE", "NODE.JS", "PYTHON", "REACT", "DOCKER", "KUBERNETES", "CI/CD", "TERRAFORM"
  ];

  const stats = [
    "99.9% UPTIME SLA", "AWS CERTIFIED", "ZERO-DOWNTIME MIGRATION", "MILLIONS OF R/S", "ENTERPRISE GRADE", "SECURE BY DEFAULT"
  ];

  const renderLogos = [...techLogos, ...techLogos, ...techLogos];
  const renderStats = [...stats, ...stats, ...stats];

  return (
    <section className="w-full bg-transparent py-12 md:py-20 border-y border-slate-200/50 dark:border-white/5 overflow-hidden relative">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 dark:from-obsidian to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 dark:from-obsidian to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-10 md:gap-14 relative z-0">
        
        {/* Top Row - Tech Logos */}
        <div className="flex w-max animate-scroll-left">
          {renderLogos.map((text, i) => (
            <div 
              key={`logo-${i}`} 
              className="mx-8 md:mx-16 font-drama text-2xl md:text-4xl text-slate-800/35 dark:text-white/35 whitespace-nowrap tracking-wider font-semibold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 select-none"
            >
              {text}
            </div>
          ))}
        </div>

        {/* Bottom Row - Stats */}
        <div className="flex w-max animate-scroll-right">
          {renderStats.map((text, i) => (
            <div 
              key={`stat-${i}`} 
              className="mx-8 md:mx-16 flex items-center gap-3 select-none"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyberlime animate-ping" />
              <span className="font-mono text-xs md:text-sm text-cyberlime uppercase tracking-widest whitespace-nowrap">
                {text}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
