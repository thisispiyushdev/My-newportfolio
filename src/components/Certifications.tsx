"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { certificationsData } from "../data/certificationsData";
import CertificationModal from "./CertificationModal";
import { ShieldCheck, Database, Terminal, CheckCircle2, Cpu, Eye, ExternalLink, Award } from "lucide-react";

// Helper for scrambled text animation
const ScrambledText = ({ text, trigger }: { text: string; trigger: any }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+=-";

  useEffect(() => {
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
    }, 15);

    return () => {
      clearInterval(interval);
      setDisplayText(text);
    };
  }, [text, trigger]);

  return <span>{displayText}</span>;
};

interface Cert {
  id: number;
  title: string;
  provider: string;
  category: string;
  description: string;
  image: any;
  year: string;
}

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedCertIndex, setSelectedCertIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [decryptProgress, setDecryptProgress] = useState(0);
  const [isHoveredIndex, setIsHoveredIndex] = useState<number | null>(null);

  // Filter categories
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

  const activeCert = filteredCerts[selectedCertIndex] || filteredCerts[0] || certificationsData[0];

  // Auto-reset active index if it exceeds filtered length
  useEffect(() => {
    if (selectedCertIndex >= filteredCerts.length) {
      setSelectedCertIndex(0);
    }
  }, [activeFilter, filteredCerts.length, selectedCertIndex]);

  // Generate deterministic secure validation hash representing authenticity
  const secureHash = React.useMemo(() => {
    if (!activeCert) return "";
    let hash = 0;
    for (let i = 0; i < activeCert.title.length; i++) {
      hash = (hash << 5) - hash + activeCert.title.charCodeAt(i);
      hash |= 0;
    }
    return "SHA-256::" + Math.abs(hash).toString(16).padEnd(16, 'A').toUpperCase().substring(0, 16);
  }, [activeCert]);

  // Simulation logs for terminal when activeCert changes
  useEffect(() => {
    if (!activeCert) return;

    setTerminalLogs([]);
    setDecryptProgress(0);

    const logs = [
      `[SYS-0${activeCert.id}] CALL SECURE_HANDSHAKE_PROTOCOL...`,
      `[DECRYPT] REQUESTING VERIFIED METADATA BLOCK...`,
      `[ISSUER] KEY HASH MATCHED: ${activeCert.provider.toUpperCase()}`,
      `[SHA-256] SIGNATURE ID: ${secureHash}`,
      `[DECRYPT] DECODING CREDENTIAL MATRIX [OK]`,
      `[STATUS] 100% SECURE & ACTIVE`
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        setTerminalLogs((prev) => [...prev, logs[currentLogIdx]]);
        setDecryptProgress(((currentLogIdx + 1) / logs.length) * 100);
        currentLogIdx++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [activeCert, secureHash]);

  return (
    <section
      id="certifications"
      className="py-28 px-4 md:px-16 w-full max-w-7xl mx-auto text-slate-800 dark:text-white relative z-10 font-sans"
    >
      {/* Background ambient light effects */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-cyberlime/[0.015] rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/[0.015] rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="cert-header mb-16 relative z-10"
      >
        <span className="font-mono text-xs tracking-[0.25em] text-cyberlime uppercase font-semibold block mb-3">
          SECURE VERIFICATION LEDGER
        </span>
        <h2 className="text-4xl md:text-6xl font-drama font-bold leading-none uppercase text-slate-900 dark:text-white">
          Major <span className="text-cyberlime italic font-semibold drop-shadow-[0_0_15px_rgba(203,255,0,0.15)] font-sans">Credentials</span>
        </h2>
        <p className="mt-4 text-slate-650 dark:text-slate-400 max-w-2xl text-sm leading-relaxed font-light">
          An interactive, cryptographically verified database of active cloud architectures, professional standards, and advanced software development qualifications. Select a credential record below to verify its status and decrypt security ledgers.
        </p>

        {/* Filter Navigation Switchboard */}
        <div className="flex flex-wrap items-center gap-3 mt-10 font-mono text-[9px] tracking-widest">
          {[
            { id: "ALL", label: "ALL LEDGERS" },
            { id: "CLOUD", label: "CLOUD & DEVOPS" },
            { id: "DEVELOPMENT", label: "FULL STACK DEV" }
          ].map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setSelectedCertIndex(0);
                }}
                className={`px-4 py-2.5 rounded-xl border font-bold transition-all duration-300 flex items-center gap-2 tracking-[0.15em] ${
                  isActive
                    ? "bg-cyberlime/10 text-cyberlime border-cyberlime/40 shadow-[0_0_20px_rgba(203,255,0,0.12)]"
                    : "bg-slate-100/50 dark:bg-white/[0.01] text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-cyberlime animate-pulse" : "bg-slate-450 dark:bg-slate-650"}`} />
                <span>[{filter.label}]</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Interactive Matrix Dashboard Console */}
      <div className="relative w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Ledger Tabs Index Selector (5/12 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-4 w-full order-2 lg:order-1">
          <div className="flex items-center gap-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-2 px-1">
            <Database size={11} className="text-cyberlime" />
            <span>DECRYPTED INDICES // {filteredCerts.length} RECORDS FOUND</span>
          </div>

          <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredCerts.map((cert, index) => {
              const isActive = activeCert?.id === cert.id;
              const isHovered = isHoveredIndex === index;
              return (
                <motion.div
                  key={cert.id}
                  onClick={() => setSelectedCertIndex(index)}
                  onMouseEnter={() => setIsHoveredIndex(index)}
                  onMouseLeave={() => setIsHoveredIndex(null)}
                  className={`relative w-full p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                    isActive
                      ? "bg-slate-100 dark:bg-nightslate/30 border-cyberlime/40 shadow-[0_0_30px_rgba(203,255,0,0.06)]"
                      : "bg-slate-100/50 dark:bg-nightslate/10 border-slate-200/50 dark:border-white/5 hover:border-slate-350 dark:hover:border-white/15 hover:bg-slate-200/30 dark:hover:bg-nightslate/20"
                  }`}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Active glowing indicator light */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-cyberlime rounded-r-full shadow-[0_0_15px_#cbff00]" />
                  )}

                  {/* Corner indicators */}
                  {isActive && (
                    <>
                      <span className="absolute top-1 left-1 text-cyberlime font-mono text-[6px]">+</span>
                      <span className="absolute top-1 right-1 text-cyberlime font-mono text-[6px]">+</span>
                      <span className="absolute bottom-1 left-1 text-cyberlime font-mono text-[6px]">+</span>
                      <span className="absolute bottom-1 right-1 text-cyberlime font-mono text-[6px]">+</span>
                    </>
                  )}

                  <div className="flex items-center gap-4 flex-1 mr-4">
                    {/* Index Badge */}
                    <div className={`font-mono text-[10px] w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 transition-colors ${
                      isActive 
                        ? "bg-cyberlime/10 text-cyberlime border-cyberlime/30"
                        : "bg-slate-200/40 dark:bg-white/[0.02] text-slate-500 border-slate-200 dark:border-white/5 group-hover:border-slate-350 dark:group-hover:border-white/15 group-hover:text-slate-800 dark:group-hover:text-white"
                    }`}>
                      0{index + 1}
                    </div>

                    {/* Metadata summary */}
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[8px] font-mono tracking-widest uppercase transition-colors ${
                        isActive ? "text-cyan-400" : "text-slate-400 dark:text-slate-500"
                      }`}>
                        {cert.category}
                      </span>
                      <h4 className={`text-xs md:text-sm font-bold leading-tight transition-colors line-clamp-1 ${
                        isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-450 group-hover:text-slate-950 dark:group-hover:text-slate-200"
                      }`}>
                        {isActive || isHovered ? (
                          <ScrambledText text={cert.title} trigger={isActive || isHovered} />
                        ) : (
                          cert.title
                        )}
                      </h4>
                      <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5 tracking-wider">
                        @{cert.provider}
                      </span>
                    </div>
                  </div>

                  {/* Status telemetry indicator */}
                  <div className="flex flex-col items-end shrink-0 font-mono text-[8px]">
                    <span className="text-slate-500">{cert.year.split(" ")[0]}</span>
                    <span className={`font-bold mt-0.5 flex items-center gap-1.5 ${
                      isActive ? "text-cyberlime" : "text-cyan-500"
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${isActive ? "bg-cyberlime animate-ping" : "bg-cyan-500"}`} />
                      {isActive ? "ACTIVE" : "STANDBY"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Primary Active Decryption Terminal screen (7/12 columns) */}
        <div className="lg:col-span-7 order-1 lg:order-2 w-full">
          <div className="flex items-center gap-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-2 px-1">
            <Cpu size={11} className="text-cyan-400" />
            <span>PRIMARY CORE SCANNER // ACTIVE RECORD DISPLAY</span>
          </div>

          <AnimatePresence mode="wait">
            {activeCert && (
              <motion.div
                key={activeCert.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative w-full rounded-[2.5rem] overflow-hidden bg-slate-100/50 dark:bg-nightslate/20 border border-slate-250 dark:border-white/10 shadow-2xl p-6 md:p-8 flex flex-col backdrop-blur-xl"
              >
                {/* Tech styling accents */}
                <span className="absolute top-4 left-4 text-slate-350 dark:text-white/10 font-mono text-[10px] pointer-events-none">+</span>
                <span className="absolute top-4 right-4 text-slate-350 dark:text-white/10 font-mono text-[10px] pointer-events-none">+</span>
                <span className="absolute bottom-4 left-4 text-slate-350 dark:text-white/10 font-mono text-[10px] pointer-events-none">+</span>
                <span className="absolute bottom-4 right-4 text-slate-350 dark:text-white/10 font-mono text-[10px] pointer-events-none">+</span>
                <div className="absolute inset-0 bg-gradient-to-br from-cyberlime/[0.015] via-transparent to-cyan-500/[0.015] pointer-events-none z-0" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none opacity-50"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
                  
                  {/* Holographic Document Preview Container */}
                  <div className="w-full md:w-[220px] h-[190px] md:h-auto min-h-[170px] relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800/60 bg-black/60 shadow-xl flex items-center justify-center p-2 group/media shrink-0">
                    <div className="absolute inset-0 bg-cyberlime/[0.02] mix-blend-overlay z-10 pointer-events-none"></div>
                    <div className="absolute inset-2 border border-white/5 pointer-events-none z-20 transition-all group-hover/media:border-cyberlime/20"></div>

                    {/* Scanline Sweep overlay */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                      <div className="absolute left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent scanline-active" />
                    </div>

                    <Image
                      src={activeCert.image}
                      alt={activeCert.title}
                      fill
                      priority
                      className="object-cover transform scale-[0.98] group-hover/media:scale-100 transition-transform duration-700"
                      sizes="220px"
                    />

                    {/* Quick view overlay */}
                    <div 
                      onClick={() => setSelectedCert(activeCert)}
                      className="absolute inset-0 bg-black/80 opacity-0 hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 z-20 cursor-pointer p-4 text-center"
                    >
                      <Eye className="text-cyberlime animate-pulse mb-1.5" size={20} />
                      <span className="text-[8px] font-mono text-cyberlime tracking-[0.2em] font-bold">VIEW DOCUMENT</span>
                    </div>
                  </div>

                  {/* Informational telemetry column */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      {/* Top status header */}
                      <div className="flex items-center justify-between font-mono text-[9px] border-b border-slate-350 dark:border-white/5 pb-2.5">
                        <span className="text-cyan-500 uppercase tracking-widest">RECORD // 0{activeCert.id}</span>
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase font-semibold">{activeCert.year}</span>
                      </div>

                      {/* Main Scrambled title */}
                      <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-900 dark:text-white mt-4 leading-snug tracking-tight">
                        <ScrambledText text={activeCert.title} trigger={activeCert.id} />
                      </h3>

                      {/* Details tags */}
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-3 text-[10px] font-mono">
                        <span className="text-slate-500 uppercase">ISSUER: <strong className="text-slate-700 dark:text-slate-350">@{activeCert.provider}</strong></span>
                        <span className="text-slate-500 uppercase">CATEGORY: <strong className="text-slate-700 dark:text-slate-350">{activeCert.category}</strong></span>
                      </div>
                    </div>

                    {/* Micro indicators */}
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex-1 h-[2px] bg-slate-250 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-cyberlime" 
                          initial={{ width: 0 }}
                          animate={{ width: `${decryptProgress}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      <span className="font-mono text-[9px] text-cyberlime font-bold">
                        {Math.round(decryptProgress)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decrypted Description Box */}
                <div className="mt-6 bg-slate-200/40 dark:bg-black/30 border border-slate-250 dark:border-white/[0.02] rounded-2xl p-5 relative">
                  <span className="absolute top-2.5 right-4 font-mono text-[7px] text-slate-500 tracking-wider">DECRYPTED DATA</span>
                  <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">CREDENTIAL OBJECTIVE</span>
                  <p className="text-slate-700 dark:text-slate-300 text-xs md:text-sm font-light leading-relaxed font-sans">
                    {activeCert.description}
                  </p>
                </div>

                {/* Security Decryption Terminal simulator */}
                <div className="mt-5 border border-slate-350 dark:border-slate-800/60 rounded-2xl bg-slate-900/95 dark:bg-black/90 p-4 font-mono text-[9px] leading-relaxed shadow-inner relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-2 text-slate-500 uppercase tracking-widest text-[8px]">
                    <span className="flex items-center gap-1.5 text-cyberlime font-bold">
                      <Terminal size={10} />
                      sig_validator.sh
                    </span>
                    <span className="text-cyberlime font-bold flex items-center gap-1">
                      <CheckCircle2 size={9} />
                      VERIFIED
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 min-h-[110px] text-slate-400">
                    {terminalLogs.map((log, index) => (
                      <div 
                        key={index}
                        className={
                          log.includes("100% SECURE") || log.includes("[STATUS]")
                            ? "text-cyberlime font-semibold"
                            : log.includes("SIGNATURE ID")
                              ? "text-cyan-400 font-semibold"
                              : "text-slate-450 dark:text-slate-400"
                        }
                      >
                        &gt; {log}
                      </div>
                    ))}
                    {terminalLogs.length < 6 && (
                      <div className="text-cyberlime animate-pulse select-none">&gt; DECRYPTING CORE SIGNATURE RECORD...</div>
                    )}
                  </div>

                  {/* Secure footprint validation ledger */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/50 flex items-center justify-between text-[8px] text-slate-500">
                    <div className="flex flex-col">
                      <span className="font-semibold uppercase text-slate-500">VERIFICATION FINGERPRINT</span>
                      <span className="text-cyan-400 font-semibold">{secureHash}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="uppercase text-slate-500">STATUS</span>
                      <span className="text-cyberlime font-bold">SECURE [100%]</span>
                    </div>
                  </div>
                </div>

                {/* Holographic interactive button view */}
                <button
                  onClick={() => setSelectedCert(activeCert)}
                  className="w-full mt-6 py-3.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/15 border border-cyan-500/30 hover:border-cyan-500/55 text-cyan-400 text-xs font-mono tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-[0_0_20px_rgba(6,182,212,0.03)] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                >
                  <Award size={14} className="group-hover/btn:rotate-12 transition-transform" />
                  <span>DECRYPT FULL HOLOGRAPHIC DOCUMENT</span>
                  <ExternalLink size={11} className="opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full screen modal verification overlay */}
      <AnimatePresence>
        {selectedCert && (
          <CertificationModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>

      {/* Global CSS style tags for animation overrides */}
      <style>{`
        @keyframes scanline-active-sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        .scanline-active {
          animation: scanline-active-sweep 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
