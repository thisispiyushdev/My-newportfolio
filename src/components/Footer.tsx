import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian text-slate-400 py-16 px-6 md:px-16 rounded-t-[3.5rem] mt-32 border-t border-white/5 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex flex-col max-w-sm">
          <div className="text-3xl font-drama font-bold tracking-widest text-white mb-4">
            PIYUSH<span className="text-cyberlime">.</span>
          </div>
          <p className="text-sm tracking-wide leading-relaxed font-sans mt-2 mb-8 font-light">
            Orchestrating high-performance distributed systems on AWS and crafting immersive, human-centric web experiences.
          </p>
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyberlime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyberlime"></span>
            </span>
            <span className="font-mono text-xs tracking-widest uppercase text-cyberlime/90 font-semibold">
              System Operational
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16 text-sm">
          <div className="flex flex-col gap-4 font-mono tracking-wide">
            <h4 className="text-white font-bold mb-2">Navigation</h4>
            <a href="#hero" className="hover:text-cyberlime transition-colors">Return Top</a>
            <a href="#projects" className="hover:text-cyberlime transition-colors">Architecture</a>
            <a href="#philosophy" className="hover:text-cyberlime transition-colors">Philosophy</a>
          </div>
          <div className="flex flex-col gap-4 font-mono tracking-wide">
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="flex items-center gap-6">
              <a href="https://github.com/Piyush232005" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white hover:scale-110 transition-all duration-300">
                <Github size={24} />
              </a>
              <a href="https://twitter.com/decoder_mherwal" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-[#1DA1F2] hover:scale-110 transition-all duration-300">
                <Twitter size={24} />
              </a>
              <a href="https://www.linkedin.com/in/piyush-989a3a322" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-[#0A66C2] hover:scale-110 transition-all duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs font-mono opacity-50">
        <p>&copy; {currentYear} Piyush. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Engineered securely.</p>
      </div>
    </footer>
  );
}
