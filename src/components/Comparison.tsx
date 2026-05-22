"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Server, Zap, Compass } from 'lucide-react';

export default function Comparison() {
  const comparisonData = [
    {
      feature: "Infrastructure Approach",
      icon: <Server size={20} className="text-cyan-500" />,
      standard: "Manual server setup or basic PaaS deployments.",
      piyush: "Infrastructure as Code (Terraform/CloudFormation) for repeatable, secure AWS environments."
    },
    {
      feature: "System Reliability",
      icon: <ShieldCheck size={20} className="text-emerald-500" />,
      standard: "Reacts to downtime after the fact.",
      piyush: "Proactive monitoring, auto-scaling, and multi-AZ deployments for 99.9% uptime."
    },
    {
      feature: "Code Quality & CI/CD",
      icon: <Zap size={20} className="text-amber-500" />,
      standard: "Manual testing and ftp/ssh deployments.",
      piyush: "Zero-downtime automated deployment pipelines with built-in security scanning."
    },
    {
      feature: "Frontend Experience",
      icon: <Compass size={20} className="text-purple-500" />,
      standard: "Generic templates with out-of-the-box UI libraries.",
      piyush: "Bespoke, cinematic, interactive digital instruments built with precise mathematics."
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    })
  };

  return (
    <section id="why-me" className="py-24 px-6 md:px-16 w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 md:mb-20 text-center md:text-left">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-sm font-mono tracking-widest text-cyberlime uppercase mb-4 font-semibold"
        >
          The Delta
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-drama font-bold text-slate-900 dark:text-white"
        >
          Why I Am Different
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-slate-500 dark:text-slate-400 font-sans max-w-2xl text-sm md:text-base leading-relaxed font-light mx-auto md:mx-0"
        >
          The difference between a developer and an architect is foresight. I don't just build features; I engineer resilient ecosystems.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisonData.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            className="flex flex-col rounded-3xl border border-slate-200/50 dark:border-white/5 bg-slate-100/30 dark:bg-nightslate/10 p-6 md:p-8 shadow-2xl backdrop-blur-xl hover:border-slate-300 dark:hover:border-white/10 transition-colors group relative overflow-hidden"
          >
            {/* Ambient Background Glow on Card Hover */}
            <div className="absolute -inset-px bg-gradient-to-tr from-cyberlime/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Header / Focus Area */}
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-2.5 rounded-xl bg-slate-200/50 dark:bg-white/5 border border-slate-300/30 dark:border-white/5">
                {item.icon}
              </div>
              <h4 className="font-sans font-bold text-lg text-slate-800 dark:text-white">{item.feature}</h4>
            </div>

            {/* Content Split */}
            <div className="flex flex-col gap-6 relative z-10 h-full justify-between">
              {/* Standard Approach */}
              <div className="flex items-start gap-3 opacity-60">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-wider text-slate-500 dark:text-slate-400 uppercase">Standard Approach</span>
                  <span className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">{item.standard}</span>
                </div>
              </div>

              {/* Piyush Approach */}
              <div className="flex items-start gap-3 bg-cyberlime/5 dark:bg-cyberlime/5 p-4 rounded-2xl border border-cyberlime/20 dark:border-cyberlime/10 shadow-[0_4px_15px_rgba(203,255,0,0.02)]">
                <div className="w-1.5 h-1.5 rounded-full bg-cyberlime mt-2 shrink-0 animate-pulse" />
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-widest text-cyberlime uppercase font-bold">Architectural Implementation</span>
                  <span className="font-sans text-sm text-slate-800 dark:text-cyberlime font-medium leading-relaxed mt-0.5">{item.piyush}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
