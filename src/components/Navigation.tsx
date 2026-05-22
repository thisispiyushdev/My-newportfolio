"use client";

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      setIsMobileMenuOpen(false); // Close mobile menu
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Why Me', id: 'why-me' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Experience', id: 'experience' },
    { name: 'Education', id: 'education' },
    { name: 'Philosophy', id: 'philosophy' },
    { name: 'Projects', id: 'projects' },
  ];

  return (
    <motion.nav 
      initial={{ y: -50, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-6 left-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ease-out w-[92%] max-w-6xl ${
        scrolled 
          ? 'bg-slate-900/60 dark:bg-obsidian/60 backdrop-blur-xl border border-slate-200/20 dark:border-white/5 shadow-[0_10px_30px_rgba(0,240,255,0.03)]' 
          : 'bg-transparent border border-transparent'
      }`}
    >
      <div 
        className="text-xl font-drama font-bold tracking-widest text-slate-800 dark:text-white cursor-pointer select-none"
        onClick={(e) => handleNavClick(e, 'hero')}
      >
        PIYUSH<span className="text-cyberlime font-sans">.</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[11px] font-mono tracking-[0.15em] text-slate-600 dark:text-slate-400 uppercase">
        {navLinks.map((link) => (
          <a 
            key={link.id}
            href={`#${link.id}`} 
            onClick={(e) => handleNavClick(e, link.id)} 
            className="hover:text-cyberlime transition-colors relative py-1 group"
          >
            {link.name}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyberlime transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-slate-200/30 dark:border-white/10 text-slate-800 dark:text-white hover:text-cyberlime hover:border-cyberlime/40 transition-colors bg-slate-100/50 dark:bg-white/5"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'dark' ? (
              <motion.div
                key="moon"
                initial={{ rotate: -40, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 40, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={16} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 40, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -40, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <a 
          href="#initiate-protocol"
          onClick={(e) => handleNavClick(e, 'initiate-protocol')}
          className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-cyberlime text-obsidian font-mono text-[10px] tracking-widest font-bold uppercase hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-obsidian transition-all shadow-[0_4px_12px_rgba(203,255,0,0.2)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 duration-300"
        >
          INITIATE <span className="hidden sm:inline">&nbsp;PROTOCOL</span>
        </a>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-slate-800 dark:text-white p-2 hover:text-cyberlime transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[120%] left-0 w-full bg-slate-900/95 dark:bg-obsidian/95 backdrop-blur-2xl border border-slate-200/20 dark:border-white/5 rounded-2xl p-6 flex flex-col gap-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)] md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                onClick={(e) => handleNavClick(e, link.id)} 
                className="text-slate-200 dark:text-slate-300 font-mono text-sm tracking-widest uppercase hover:text-cyberlime transition-colors border-b border-white/5 pb-2"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#initiate-protocol" 
              onClick={(e) => handleNavClick(e, 'initiate-protocol')} 
              className="mt-4 px-5 py-3 rounded-full bg-cyberlime text-obsidian font-mono text-xs font-bold text-center tracking-widest uppercase hover:bg-white transition-colors"
            >
              INITIATE PROTOCOL
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
