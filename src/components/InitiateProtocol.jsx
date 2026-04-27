import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

export default function InitiateProtocol() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a glitch effect timeline that triggers on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        }
      });

      // Simple glitch-in animation for the headline
      tl.from(".glitch-text", {
        y: 100,
        opacity: 0,
        skewX: 10,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out"
      })
      .to(".glitch-text", {
        skewX: 0,
        duration: 0.2,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })"
      })
      .fromTo(".terminal-line", 
        { width: 0, opacity: 0 },
        { width: "100%", opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" }
      )
      .fromTo(".action-btn",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="initiate-protocol" 
      ref={containerRef} 
      className="relative min-h-[80vh] w-full bg-transparent text-white flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden border-t border-white/5"
    >
      {/* Background Matrix/Grid Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] mix-blend-screen opacity-50 z-0 pointer-events-none"></div>

      {/* Main Terminal Frame */}
      <div className="relative z-10 w-full max-w-5xl rounded-2xl border border-emerald-500/30 bg-black/40 backdrop-blur-md p-8 md:p-16 shadow-[0_0_50px_rgba(16,185,129,0.1)] outline outline-1 outline-white/5">
        
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-emerald-500/20 pb-4 mb-8">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <p className="text-emerald-500/70 font-mono text-xs tracking-widest uppercase">sys.terminal_v1.0</p>
        </div>

        {/* Console Text Area */}
        <div className="font-mono text-left mb-12 space-y-4">
          <p className="terminal-line text-emerald-400/80 text-sm md:text-base border-l-2 border-emerald-500 pl-4 overflow-hidden whitespace-nowrap">
            &gt; Analyzing system requirements... [OK]
          </p>
          <p className="terminal-line text-emerald-400/80 text-sm md:text-base border-l-2 border-emerald-500 pl-4 overflow-hidden whitespace-nowrap">
            &gt; Verifying cloud architecture topology... [OK]
          </p>
          <p className="terminal-line text-emerald-400 text-sm md:text-base border-l-2 border-emerald-500 pl-4 overflow-hidden whitespace-nowrap">
            &gt; System Status: READY FOR DEPLOYMENT
          </p>
        </div>

        {/* Main Headline */}
        <div className="text-center mb-16 overflow-hidden" ref={textRef}>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase inline-flex gap-4">
            <span className="glitch-text text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Initiate</span>
            <span className="glitch-text text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">Protocol</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto font-sans text-lg">
            Looking for a resilient, high-performance distributed system or a sleek modern web application? Begin the engagement sequence to architect your success.
          </p>
        </div>

        {/* Interactive Action Area */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <button
            onClick={() => setIsFormOpen(true)}
            className="action-btn group relative px-10 py-5 bg-emerald-500 text-obsidian rounded-none clip-path-slant font-mono tracking-widest font-bold uppercase overflow-hidden hover:bg-white transition-colors duration-300"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-obsidian animate-pulse"></span>
              Execute Connect
            </span>
          </button>

          <a
            href="https://drive.google.com/file/d/1gxVMky6WeRPBfELyTVDn0k1mi4UwV3-q/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="action-btn group px-8 py-4 border border-emerald-500/30 text-emerald-400 hover:text-white hover:border-white hover:bg-white/5 rounded-none font-mono text-sm tracking-widest font-bold transition-all"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
          >
            Download Data.CV
          </a>
        </div>
        
      </div>

      {isFormOpen && <ContactForm onClose={() => setIsFormOpen(false)} />}
    </section>
  );
}
