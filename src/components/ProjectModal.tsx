"use client";

import React, { useEffect, useState } from 'react';
import { X, Github, ExternalLink, Cpu, Terminal } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  image: StaticImageData | string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  githubLink: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const getDetailedTelemetry = (title: string) => {
  switch (title) {
    case 'Nexxtech Website':
      return { loc: "42,400", latency: "38ms", db: "SUPABASE (POSTGRES)", host: "VERCEL / DOCKER", status: "ACTIVE", load: "0.2%" };
    case 'AWS Crypto Price Alert':
      return { loc: "1,250", latency: "12ms", db: "DYNAMODB NOSQL", host: "AWS LAMBDA", status: "SECURE", load: "0.01%" };
    case 'AWS Serverless Architecture':
      return { loc: "3,500", latency: "8ms", db: "DYNAMODB", host: "API GATEWAY / S3", status: "ONLINE", load: "0.05%" };
    case 'Samikaran NGO':
      return { loc: "28,900", latency: "44ms", db: "MONGODB SHARD", host: "DIGITALOCEAN / DOCKER", status: "STABLE", load: "1.4%" };
    case 'GitHub Profile Detective':
      return { loc: "5,800", latency: "20ms", db: "REST ENDPOINTS", host: "GH PAGES", status: "ONLINE", load: "0.1%" };
    case 'Portfolio':
      return { loc: "2,100", latency: "5ms", db: "NONE (STATIC DATA)", host: "NEXT.JS ROUTER", status: "ONLINE", load: "0.02%" };
    case 'AI Mood Detection':
      return { loc: "14,300", latency: "85ms", db: "SUPABASE GRAPHQL", host: "RENDER / NODE", status: "LOADED", load: "4.8%" };
    case 'Aura Chatbot':
      return { loc: "18,700", latency: "60ms", db: "MONGODB SHARDED", host: "AWS ECS / FARGATE", status: "ACTIVE", load: "2.1%" };
    default:
      return { loc: "10,000", latency: "30ms", db: "SQLITE", host: "SELF-HOSTED", status: "ONLINE", load: "0.5%" };
  }
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const telemetry = getDetailedTelemetry(project.title);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 font-sans select-none">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modal-backdrop absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => onClose()}
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="modal-content relative w-[95vw] max-w-4xl max-h-[90vh] bg-obsidian border border-white/5 rounded-3xl shadow-2xl flex flex-col md:flex-row z-10 overflow-hidden backdrop-blur-xl"
      >
        
        {/* HUD corners */}
        <span className="absolute top-2 left-2 text-white/10 font-mono text-[8px] pointer-events-none">+</span>
        <span className="absolute top-2 right-2 text-white/10 font-mono text-[8px] pointer-events-none">+</span>
        <span className="absolute bottom-2 left-2 text-white/10 font-mono text-[8px] pointer-events-none">+</span>
        <span className="absolute bottom-2 right-2 text-white/10 font-mono text-[8px] pointer-events-none">+</span>

        {/* Close Button */}
        <button 
          onClick={() => onClose()}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-cyberlime hover:text-obsidian text-white border border-white/10 hover:border-transparent transition-all duration-300 scale-100 hover:scale-110"
        >
          <X size={18} />
        </button>

        {/* Left Pane: Image Section */}
        <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-nightslate/30 border-r border-white/5 flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan/[0.02] mix-blend-overlay z-10 pointer-events-none"></div>
          <div className="relative w-full h-full p-6 md:p-8 min-h-[160px] md:min-h-full">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill
              className="object-contain p-2 transition-transform duration-700 hover:scale-102"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>

        {/* Right Pane: Content Section */}
        <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col max-h-[60vh] md:max-h-[90vh] overflow-y-auto custom-scrollbar">
          
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
             {project.techStack.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-0.5 text-[9px] font-mono tracking-widest text-[#00f0ff] bg-[#00f0ff]/5 rounded border border-[#00f0ff]/15 uppercase"
                >
                  {tech}
                </span>
             ))}
          </div>

          {/* Project Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
            {project.title}
          </h3>

          {/* Tabbed Navigation */}
          <div className="flex gap-3 border-b border-white/5 pb-3 mb-6 font-mono text-[10px] tracking-widest">
            {["OVERVIEW", "TECH TELEMETRY"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1.5 border-b-2 transition-all ${
                  activeTab === tab 
                    ? "border-cyberlime text-cyberlime font-bold" 
                    : "border-transparent text-slate-500 hover:text-white"
                }`}
              >
                [{tab}]
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          {activeTab === "OVERVIEW" ? (
            <div className="text-slate-300 leading-relaxed text-sm font-light space-y-4 mb-8">
              <p>{project.fullDescription}</p>
            </div>
          ) : (
            <div className="space-y-4 mb-8 font-mono text-[10px] tracking-wider text-slate-400 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-3">
                <div>
                  <span className="text-slate-500 block mb-1">CODE QUANTITY (LoC)</span>
                  <span className="text-white font-semibold text-xs flex items-center gap-1.5">
                    <Cpu size={12} className="text-cyberlime" />
                    {telemetry.loc} Lines
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">LATENCY METRIC</span>
                  <span className="text-cyan font-semibold text-xs flex items-center gap-1.5">
                    <Terminal size={12} className="text-cyan" />
                    {telemetry.latency} Avg
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-3">
                <div>
                  <span className="text-slate-500 block mb-1">DATABASE ENGINE</span>
                  <span className="text-white font-semibold">{telemetry.db}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">TARGET ENVIRONMENT</span>
                  <span className="text-white font-semibold">{telemetry.host}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block mb-1">INTEGRITY STATE</span>
                  <span className="text-cyberlime font-semibold uppercase">{telemetry.status}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">SYSTEM INSTABILITY</span>
                  <span className="text-white font-semibold">{telemetry.load} CPU Load</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-cyberlime text-obsidian rounded-full font-mono font-bold tracking-widest text-[10px] hover:scale-[1.02] hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300 shadow-[0_0_15px_rgba(203,255,0,0.15)]"
            >
              <Github size={16} />
              <span>LAUNCH PROJECT SOURCE</span>
              <ExternalLink size={12} className="transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
        
      </motion.div>
    </div>
  );
};

export default ProjectModal;
