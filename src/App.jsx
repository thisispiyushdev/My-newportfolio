import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import CustomCursor from './components/CustomCursor';
import ThreeBackground from './components/ThreeBackground';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SocialProofBar from './components/SocialProofBar';
import Features from './components/Features';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Philosophy from './components/Philosophy';
import Comparison from './components/Comparison';
import Certifications from './components/Certifications';
import InitiateProtocol from './components/InitiateProtocol';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothWheel: true,
      smoothTouch: false, // Disabled smooth scrolling on touch devices for native feel
      syncTouch: false,
      touchMultiplier: 1,
    });

    // Sync Lenis with GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden bg-obsidian min-h-screen text-white">
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      <ThreeBackground />
      <CustomCursor />
      <Navigation />
      
      {/* Container holding sections with pointer events and proper z-index */}
      <main className="relative z-10 w-full">
        <Hero />
        <SocialProofBar />
        <Features/>
        <Certifications />
        <Experience />
        <Education />
        <Philosophy />
        <Comparison />
        <Projects />
        <InitiateProtocol />
      </main>

      <Footer />
    </div>
  );
}

export default App;
