import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Typewriter } from 'react-simple-typewriter';
import myImg from '../assets/my.png';
import MagneticWrapper from './MagneticWrapper';
import ContactForm from './ContactForm';

export default function Hero() {
  const containerRef = useRef(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    // GSAP Massive Text Animations
    const ctx = gsap.context(() => {
      // Split text reveal
      gsap.fromTo(
        '.hero-line-inner',
        { y: '100%' },
        { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 2.5 } // delay aligns with preloader finish
      );

      gsap.fromTo(
        '.hero-sub-el',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, delay: 3.2, ease: 'power3.out' }
      );

      // Continuous floating animation for the profile image
      gsap.to('.hero-img-container', {
        y: -15,
        rotationZ: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 3.5
      });
    }, containerRef);

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative w-full min-h-[100dvh] overflow-hidden bg-transparent text-white flex items-center pt-24 md:pt-32 pb-10 md:pb-20 px-6 md:px-16">
      
      {/* Background Decor matching screenshot */}
      <div className="absolute top-1/4 -left-20 md:-left-32 w-48 h-48 md:w-64 md:h-64 border border-[#d4af37]/30 rounded-full pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 mt-8 md:mt-0">
        
        {/* Left Side: Typography */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0 w-full relative z-10">
          <div className="overflow-hidden mb-6 px-2 w-full">
            <h2 className="hero-line-inner text-[10px] md:text-sm font-mono tracking-[0.2em] md:tracking-[0.3em] text-white uppercase break-words">
              Architectural Integrity. DevOps Mastery.
            </h2>
          </div>
          
          <h1 className="font-drama font-bold tracking-tight leading-[1.05] w-full relative -left-1 md:-left-2 z-20">
            <div className="overflow-hidden pb-2 px-2">
              <div className="hero-line-inner text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-white">
                Engineering
              </div>
            </div>
            <div className="overflow-hidden pb-4 px-2 min-h-[1.5em]">
              <div className="hero-line-inner text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] text-[#d4af37] italic mt-1 md:mt-2 whitespace-nowrap">
                <Typewriter
                  words={['Full-Stack Engineer', 'Solution Architect', 'Cloud Architect' , 'DevOps Engineer', 'Backend Engineer']}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={100}
                  deleteSpeed={60}
                  delaySpeed={2500}
                />
              </div>
            </div>
          </h1>
          
          <p className="hero-sub-el mt-6 md:mt-8 max-w-[500px] text-sm md:text-lg font-sans text-white leading-relaxed">
            I orchestrate high-performance distributed systems on AWS and craft immersive, human-centric web experiences.
          </p>
          
          <div className="hero-sub-el mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <MagneticWrapper>
              <a
                href="https://drive.google.com/file/d/1gxVMky6WeRPBfELyTVDn0k1mi4UwV3-q/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 rounded-full bg-[#d4af37] text-black font-mono text-xs md:text-sm tracking-widest font-bold hover:bg-white transition-colors duration-300"
              >
                DOWNLOAD CV
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <button
                onClick={() => setIsFormOpen(true)}
                data-cursor="interactive"
                className="inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 rounded-full border border-[#d4af37]/50 text-[#d4af37] font-mono text-xs md:text-sm tracking-widest font-bold hover:bg-[#d4af37]/10 transition-colors duration-300"
              >
                LET'S TALK
              </button>
            </MagneticWrapper>
          </div>
        </div>

        {/* Right Side: Profile Image */}
        <div className="hero-sub-el hero-img-container flex-shrink-0 w-56 h-56 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full border border-white/10 shadow-[0_20px_60px] shadow-emerald-500/10 overflow-hidden flex items-center justify-center bg-obsidian/40 backdrop-blur-xl group z-0 mt-12 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent z-10 pointer-events-none"></div>
          <img 
            src={myImg} 
            alt="Piyush Profile" 
            className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-110 filter grayscale contrast-125 opacity-80"
          />
        </div>
        
      </div>

      {isFormOpen && <ContactForm onClose={() => setIsFormOpen(false)} />}
    </section>
  );
}
