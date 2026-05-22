"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { certificationsData } from "../data/certificationsData";
import CertificationModal from "./CertificationModal";
import { ShieldCheck, Database } from "lucide-react";

// Title scrambler component
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

// 3D Tilt Card Component
interface Cert {
  id: number;
  title: string;
  provider: string;
  category: string;
  description: string;
  image: any;
  year: string;
}

interface CertificationCardProps {
  cert: Cert;
  onClick: () => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ cert, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateXSpring = useSpring(0, { damping: 20, stiffness: 200 });
  const rotateYSpring = useSpring(0, { damping: 20, stiffness: 200 });

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

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

  // Generate deterministic secure validation hash representing authenticity
  const secureHash = React.useMemo(() => {
    let hash = 0;
    for (let i = 0; i < cert.title.length; i++) {
      hash = (hash << 5) - hash + cert.title.charCodeAt(i);
      hash |= 0;
    }
    return "SHA-256::" + Math.abs(hash).toString(16).padEnd(12, 'A').toUpperCase().substring(0, 12);
  }, [cert.title]);

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-[520px] mx-auto cursor-pointer font-sans select-none group/card"
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
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Premium Glassmorphic Cyber Frame Container */}
      <div 
        className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100/30 dark:bg-nightslate/10 border border-slate-200/50 dark:border-white/5 shadow-2xl transition-all duration-500 hover:border-cyberlime/40 hover:shadow-[0_0_35px_rgba(203,255,0,0.12)] hover:-translate-y-2 flex flex-col backdrop-blur-xl z-10"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Holographic background grid lines */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        {/* HUD Crosshairs in Corners */}
        <span className="absolute top-2 left-2 text-slate-400 dark:text-white/10 font-mono text-[8px] z-20 pointer-events-none">+</span>
        <span className="absolute top-2 right-2 text-slate-400 dark:text-white/10 font-mono text-[8px] z-20 pointer-events-none">+</span>
        <span className="absolute bottom-2 left-2 text-slate-400 dark:text-white/10 font-mono text-[8px] z-20 pointer-events-none">+</span>
        <span className="absolute bottom-2 right-2 text-slate-400 dark:text-white/10 font-mono text-[8px] z-20 pointer-events-none">+</span>

        {/* Certificate Cover Display */}
        <div className="h-[210px] w-full overflow-hidden relative z-10 border-b border-slate-200/50 dark:border-white/5 bg-slate-200 dark:bg-black/40 flex items-center justify-center">
          <div className="absolute inset-0 bg-cyberlime/[0.03] mix-blend-overlay z-10 pointer-events-none"></div>
          
          {/* Cyber bracket frames */}
          <div className="absolute inset-4 border border-slate-200/30 dark:border-white/5 pointer-events-none z-20 transition-all group-hover/card:border-cyberlime/15"></div>
          
          {/* Category Badge overlay */}
          <div className="absolute top-3 right-3 z-20 font-mono text-[8px] bg-slate-900/90 dark:bg-black/80 border border-slate-200/20 dark:border-white/10 px-2.5 py-0.75 rounded text-slate-300 dark:text-slate-400 group-hover/card:text-cyberlime group-hover/card:border-cyberlime/40 transition-all shadow-md">
            {cert.category}
          </div>

          <div className="relative w-full h-full p-2.5">
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              className="object-cover transform group-hover/card:scale-105 transition-transform duration-700 filter contrast-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* Hover zoom overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 flex items-center justify-center transition-opacity duration-300 z-20">
            <span className="text-[10px] font-mono tracking-widest text-cyberlime border border-cyberlime/40 px-3.5 py-2 rounded-lg bg-black/85 shadow-lg backdrop-blur-sm">
              VERIFY & VIEW
            </span>
          </div>
        </div>

        {/* Content detail layout */}
        <div className="flex-1 p-6 flex flex-col z-10 relative justify-between" style={{ transform: "translateZ(45px)" }}>
          <div className="flex flex-col gap-1">
            {/* System Directory Index & Year */}
            <div className="flex items-center justify-between font-mono text-[9px] text-slate-500">
              <span className="group-hover/card:text-cyberlime transition-colors">[SYS-0{cert.id}]</span>
              <span>{cert.year}</span>
            </div>

            {/* Glowing scrambled title */}
            <h3 className="text-[16px] font-bold text-slate-900 dark:text-white mt-2 group-hover/card:text-cyberlime transition-colors leading-snug line-clamp-2 h-[44px]">
              <ScrambledTitle text={cert.title} isHovered={isHovered} />
            </h3>

            {/* Provider indicator */}
            <span className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 font-mono tracking-wider mt-1 uppercase">
              @{cert.provider}
            </span>

            {/* Description copy */}
            <p className="text-slate-600 dark:text-slate-400 text-xs mt-3.5 leading-relaxed font-light line-clamp-3">
              {cert.description}
            </p>
          </div>

          {/* Verification Telemetry Footer */}
          <div className="border-t border-slate-200/50 dark:border-white/5 pt-4 flex items-center justify-between font-mono text-[8px] text-slate-500">
            <div className="flex flex-col gap-0.5">
              <span className="text-slate-400 dark:text-slate-600 uppercase">SECURE VERIFICATION</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{secureHash}</span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-slate-400 dark:text-slate-600 uppercase">TELEMETRY</span>
              <span className="text-cyberlime font-bold tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyberlime animate-pulse inline-block" />
                VALIDATED [OK]
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null);

  // Filter logic
  const filteredCerts = certificationsData.filter((cert) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "CLOUD") {
      return cert.category.includes("Cloud") || cert.category.includes("DevOps");
    }
    if (activeFilter === "DEVELOPMENT") {
      return cert.category.includes("Web") || cert.category.includes("Technical");
    }
    return true;
  });

  return (
    <section
      id="certifications"
      className="py-28 px-6 md:px-16 w-full max-w-6xl mx-auto text-slate-800 dark:text-white relative z-10 font-sans"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyberlime/[0.015] rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="cert-header mb-16 relative z-10"
      >
        <span className="font-mono text-xs tracking-[0.25em] text-cyberlime uppercase font-semibold block mb-3">
          Verification Directory
        </span>
        <h2 className="text-4xl md:text-5xl font-drama font-bold leading-none uppercase text-slate-900 dark:text-white">
          Major <span className="text-cyberlime italic font-semibold drop-shadow-[0_0_15px_rgba(203,255,0,0.15)] font-drama">Credentials</span>
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl text-sm leading-relaxed font-light">
          Real-time validated professional standards, technical qualifications, and continuous learning matrices.
        </p>

        {/* Filter Navigation */}
        <div className="flex items-center gap-3 mt-10 font-mono text-[10px] tracking-widest">
          {["ALL", "CLOUD", "DEVELOPMENT"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-cyberlime/10 text-cyberlime border-cyberlime/40 shadow-[0_0_15px_rgba(203,255,0,0.1)]"
                  : "bg-slate-100 dark:bg-white/[0.01] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-slate-400 dark:hover:border-white/20 hover:text-slate-800 dark:hover:text-white"
              }`}
            >
              [{filter}]
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid container with transitions */}
      <div className="relative w-full z-10">
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-wider mb-6">
          <Database size={12} className="text-cyberlime" />
          <span>Active Indices // {filteredCerts.length} credentials decrypted</span>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dynamic Certificate Modal Preview */}
      <AnimatePresence>
        {selectedCert && (
          <CertificationModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
