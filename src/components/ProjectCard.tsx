"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Cpu } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  image: StaticImageData | string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  githubLink: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ScrambledTitle = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  const [prevText, setPrevText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+=-";

  if (text !== prevText) {
    setDisplayText(text);
    setPrevText(text);
  }

  useEffect(() => {
    if (!isHovered) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 25);

    return () => {
      clearInterval(interval);
      setDisplayText(text);
    };
  }, [isHovered, text]);

  return <span>{displayText}</span>;
};

const getProjectTelemetry = (title: string) => {
  switch (title) {
    case 'Nexxtech Website':
      return { loc: "42.4K", latency: "38ms", state: "ACTIVE", type: "DEPLOYMENT" };
    case 'AWS Crypto Price Alert':
      return { loc: "1.2K", latency: "12ms", state: "SECURE", type: "SERVERLESS" };
    case 'AWS Serverless Architecture':
      return { loc: "3.5K", latency: "8ms", state: "ONLINE", type: "INFRASTRUCTURE" };
    case 'Samikaran NGO':
      return { loc: "28.9K", latency: "44ms", state: "STABLE", type: "MERN STACK" };
    case 'GitHub Profile Detective':
      return { loc: "5.8K", latency: "20ms", state: "ONLINE", type: "INTEGRATION" };
    case 'Portfolio':
      return { loc: "2.1K", latency: "5ms", state: "ONLINE", type: "CINEMATIC" };
    case 'AI Mood Detection':
      return { loc: "14.3K", latency: "85ms", state: "LOADED", type: "INTELLIGENCE" };
    case 'Aura Chatbot':
      return { loc: "18.7K", latency: "60ms", state: "ACTIVE", type: "COMPANION" };
    default:
      return { loc: "10.0K", latency: "30ms", state: "ONLINE", type: "REPOSITORY" };
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateXSpring = useSpring(0, { damping: 20, stiffness: 200 });
  const rotateYSpring = useSpring(0, { damping: 20, stiffness: 200 });

  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // Hook springs to transformed values
  useEffect(() => {
    const unsubscribeX = rotateX.on("change", (latest) => rotateXSpring.set(latest));
    const unsubscribeY = rotateY.on("change", (latest) => rotateYSpring.set(latest));
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [rotateX, rotateY, rotateXSpring, rotateYSpring]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Normalize relative mouse values between -0.5 and 0.5
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const telemetry = getProjectTelemetry(project.title);

  return (
    <motion.div 
      ref={cardRef}
      className="project-card w-full h-[520px] mx-auto cursor-pointer font-sans relative group select-none"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      {/* Outer Cyber Box Container */}
      <div 
        className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900/30 border border-white/5 shadow-2xl transition-all duration-500 hover:border-[#cbff00]/40 hover:shadow-[0_0_40px_rgba(203,255,0,0.12)] hover:-translate-y-2 flex flex-col backdrop-blur-xl z-10"
        style={{ transform: "translateZ(30px)" }}
      >
        
        {/* Holographic background grid lines */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        {/* HUD Crosshairs in Corners */}
        <span className="absolute top-2 left-2 text-white/20 font-mono text-[8px] z-20 pointer-events-none">+</span>
        <span className="absolute top-2 right-2 text-white/20 font-mono text-[8px] z-20 pointer-events-none">+</span>
        <span className="absolute bottom-2 left-2 text-white/20 font-mono text-[8px] z-20 pointer-events-none">+</span>
        <span className="absolute bottom-2 right-2 text-white/20 font-mono text-[8px] z-20 pointer-events-none">+</span>

        {/* Project Image HUD Box */}
        <div className="h-[220px] w-full overflow-hidden relative z-10 border-b border-white/5 bg-slate-900/60 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#00f0ff]/[0.03] mix-blend-overlay z-10 pointer-events-none"></div>
          
          {/* Neon focus brackets around image */}
          <div className="absolute inset-4 border border-white/5 pointer-events-none z-20 transition-all group-hover:border-[#cbff00]/10"></div>
          
          {/* Tech Spec Overlay */}
          <div className="absolute top-3 right-3 z-20 font-mono text-[8px] bg-black/60 border border-white/10 px-2 py-0.5 rounded text-slate-400 group-hover:text-[#cbff00] group-hover:border-[#cbff00]/40 transition-all">
            {telemetry.type}
          </div>

          <div className="relative w-full h-full p-2">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>

        {/* Project Content */}
        <div className="flex-1 p-6 flex flex-col z-10 relative" style={{ transform: "translateZ(40px)" }}>
          
          {/* Scrambling Cyber Title */}
          <h3 className="text-xl font-bold text-white mb-2.5 font-mono group-hover:text-[#cbff00] transition-colors">
            <ScrambledTitle text={project.title} isHovered={isHovered} />
          </h3>
          
          {/* Short description */}
          <p className="text-slate-400 text-xs md:text-sm mb-6 leading-relaxed line-clamp-3 font-light font-sans">
            {project.shortDescription}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <span 
                key={idx}
                className="px-2 py-0.5 text-[9px] font-mono tracking-wider text-[#00f0ff] bg-[#00f0ff]/5 rounded border border-[#00f0ff]/15 uppercase"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* System Telemetry Panel */}
          <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center font-mono text-[8px] tracking-widest text-slate-500 uppercase">
            <div className="border-r border-white/5">
              <div className="text-slate-300 font-semibold text-xs leading-none mb-1.5 flex items-center justify-center gap-1">
                <Cpu size={9} className="text-slate-400" />
                {telemetry.loc}
              </div>
              <div>METRIC LOC</div>
            </div>
            <div className="border-r border-white/5">
              <div className="text-[#00f0ff] font-semibold text-xs leading-none mb-1.5 flex items-center justify-center gap-1">
                <Terminal size={9} className="text-[#00f0ff]" />
                {telemetry.latency}
              </div>
              <div>PING VEL</div>
            </div>
            <div>
              <div className="text-[#cbff00] font-semibold text-xs leading-none mb-1.5 flex items-center justify-center gap-1">
                <Shield size={9} className="text-[#cbff00]" />
                {telemetry.state}
              </div>
              <div>SYS STATUS</div>
            </div>
          </div>

        </div>
        
      </div>
    </motion.div>
  );
};

export default ProjectCard;
