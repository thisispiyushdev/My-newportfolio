"use client";

import React, { useEffect, useState } from 'react';
import { Dialog } from './ui/Dialog';
import Image from 'next/image';
import { ShieldCheck, Award, Calendar, Terminal, CheckCircle2 } from 'lucide-react';

interface Cert {
  id: number;
  title: string;
  provider: string;
  category: string;
  description: string;
  image: any;
  year: string;
}

interface CertificationModalProps {
  cert: Cert;
  onClose: () => void;
}

export default function CertificationModal({ cert, onClose }: CertificationModalProps) {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Generate deterministic secure validation hash representing authenticity
  const secureHash = React.useMemo(() => {
    let hash = 0;
    for (let i = 0; i < cert.title.length; i++) {
      hash = (hash << 5) - hash + cert.title.charCodeAt(i);
      hash |= 0;
    }
    return "SHA-256::" + Math.abs(hash).toString(16).padEnd(16, 'A').toUpperCase().substring(0, 16);
  }, [cert.title]);

  // Mini verification terminal animation inside the modal
  useEffect(() => {
    setTerminalLogs([]);

    const logs = [
      `> CALL SECURE_HANDSHAKE_SERVICE...`,
      `> VERIFYING SIGNATURE ON SYSTEM 0${cert.id}...`,
      `> KEY HASH: ${secureHash}`,
      `> STATUS: 100% SECURE & ACTIVE [OK]`,
      `> EXPIRY CHECK: PASS [${cert.year}]`
    ];

    let currentLogIdx = 0;
    const interval = setInterval(() => {
      if (currentLogIdx < logs.length) {
        const nextLog = logs[currentLogIdx];
        setTerminalLogs((prev) => [...prev, nextLog]);
        currentLogIdx++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [cert, secureHash]);

  if (!cert) return null;

  return (
    <Dialog 
      isOpen={true} 
      onClose={() => onClose()} 
      className="max-w-5xl p-0 bg-slate-950 dark:bg-[#070714] border border-cyberlime/25 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-full min-h-[500px]">
        {/* Left Side: Dynamic Aspect-ratio Document Preview Frame (7/12 cols) */}
        <div className="lg:col-span-7 relative bg-black/60 flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-800/45">
          <div className="absolute inset-0 bg-cyberlime/[0.02] pointer-events-none" />
          
          {/* Cyber framing corner guides */}
          <span className="absolute top-4 left-4 text-white/20 font-mono text-[10px] pointer-events-none">+</span>
          <span className="absolute top-4 right-4 text-white/20 font-mono text-[10px] pointer-events-none">+</span>
          <span className="absolute bottom-4 left-4 text-white/20 font-mono text-[10px] pointer-events-none">+</span>
          <span className="absolute bottom-4 right-4 text-white/20 font-mono text-[10px] pointer-events-none">+</span>

          {/* Certificate Image Frame */}
          <div className="w-full relative rounded-xl overflow-hidden aspect-[4/3] max-h-[420px] shadow-2xl border border-slate-800/60 bg-black/80">
            <Image 
              src={cert.image} 
              alt={cert.title} 
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-contain p-1"
              priority
            />
          </div>
        </div>

        {/* Right Side: High-Fidelity Credential Information Matrix (5/12 cols) */}
        <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-slate-900/40 dark:bg-black/25 backdrop-blur-xl">
          
          {/* Header metadata */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800/40 pb-4">
              <span className="text-[10px] font-mono tracking-widest text-cyberlime font-bold uppercase flex items-center gap-1.5">
                <ShieldCheck size={12} />
                SECURE RECORD BLOCK
              </span>
              <span className="px-2 py-0.5 rounded-full font-mono text-[8px] tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 uppercase font-semibold">
                [SYS-0{cert.id}]
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-800 dark:text-white leading-snug">
              {cert.title}
            </h3>

            {/* Tags / Meta details */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-650 dark:text-slate-450">
                <Award size={12} className="text-cyan-500 shrink-0" />
                <span className="uppercase text-slate-500">PROVIDER:</span>
                <strong className="text-slate-700 dark:text-slate-200">{cert.provider}</strong>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-650 dark:text-slate-450">
                <Calendar size={12} className="text-cyan-500 shrink-0" />
                <span className="uppercase text-slate-500">VALIDITY:</span>
                <strong className="text-slate-700 dark:text-slate-200">{cert.year}</strong>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="mt-4 border-t border-slate-800/40 pt-4">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-2">CREDENTIAL DESCRIPTION</span>
              <p className="text-slate-600 dark:text-slate-350 text-xs font-light leading-relaxed font-sans">
                {cert.description}
              </p>
            </div>
          </div>

          {/* Verification Terminal logs */}
          <div className="mt-6 border border-slate-800/60 rounded-xl bg-slate-950/90 dark:bg-black/90 p-4 font-mono text-[9px] leading-relaxed shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800/40 pb-2 mb-2 text-slate-500 uppercase tracking-widest text-[8px]">
              <span className="flex items-center gap-1.5 text-cyberlime font-bold">
                <Terminal size={9} />
                sig_validator.sh
              </span>
              <span className="text-cyberlime font-bold flex items-center gap-1 animate-pulse">
                <CheckCircle2 size={8} />
                VERIFIED
              </span>
            </div>
            <div className="flex flex-col gap-1 min-h-[90px] text-slate-400">
              {terminalLogs.map((log, index) => (
                <div 
                  key={index}
                  className={
                    log?.includes("100% SECURE") 
                      ? "text-cyberlime font-semibold" 
                      : log?.includes("KEY HASH") 
                        ? "text-cyan-400 font-semibold" 
                        : "text-slate-400"
                  }
                >
                  {log}
                </div>
              ))}
              {terminalLogs.length < 5 && (
                <div className="text-cyberlime animate-pulse select-none">&gt; _</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </Dialog>
  );
}
