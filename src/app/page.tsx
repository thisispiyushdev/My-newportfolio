"use client";

import React, { useState } from 'react';
import Preloader from '../components/Preloader';
import ThreeBackground from '../components/ThreeBackground';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SocialProofBar from '../components/SocialProofBar';
import Features from '../components/Features';
import Certifications from '../components/Certifications';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Philosophy from '../components/Philosophy';
import Comparison from '../components/Comparison';
import Projects from '../components/Projects';
import InitiateProtocol from '../components/InitiateProtocol';
import Footer from '../components/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      <ThreeBackground />
      <Navigation />
      
      <main className="relative z-10 w-full">
        <Hero />
        <SocialProofBar />
        <Features />
        <Certifications />
        <Experience />
        <Education />
        <Philosophy />
        <Comparison />
        <Projects />
        <InitiateProtocol />
      </main>

      <Footer />
    </>
  );
}
