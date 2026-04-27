import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { educationData } from '../data/educationData';
import EducationCard from './EducationCard';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Line Drawing Animation
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1, 
          }
        }
      );

      // 2. Card Zig-Zag Fade Animations
      const timelineCards = gsap.utils.toArray('.edu-timeline-card');
      const timelineDots = gsap.utils.toArray('.edu-timeline-dot');

      timelineCards.forEach((card, index) => {
        const isLeft = index % 2 === 0;

        // Animate the Card
        gsap.fromTo(card,
          { 
            opacity: 0, 
            x: isLeft ? -100 : 100,
            y: 50 
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate the Dot
        gsap.fromTo(timelineDots[index],
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.5, 
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="education" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-transparent py-24 md:py-32 px-6 md:px-16 overflow-hidden flex flex-col items-center"
    >
      
      {/* Background Decor Elements matching section aesthetic (Blue/Cyan for Education) */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-600/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      <div className="flex flex-col items-center mb-24 z-10 w-full text-center">
        <h2 className="text-3xl md:text-5xl font-drama font-bold text-white mb-6 tracking-wider uppercase">
          EDUCATION
        </h2>
        <p className="text-gray-400 font-sans text-sm md:text-base max-w-2xl mx-auto">
          My education has been a journey of learning and development. Here are the details of my academic background.
        </p>
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        
        {/* The Vertical CSS Line Container */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white/10 hidden md:block">
           {/* The actual drawing "fill" line */}
           <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-champagne via-sky-500 to-transparent origin-top"></div>
        </div>

        {/* Timeline Grid (Mobile vs Desktop) */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-y-16 md:gap-y-0 w-full relative z-10">
          
          {educationData.map((edu, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={edu.id} 
                className={`relative w-full flex ${isLeft ? 'md:justify-end md:pr-16 lg:pr-24' : 'md:justify-start md:col-start-2 md:pl-16 lg:pl-24'} ${index !== 0 ? 'md:mt-32' : ''}`}
              >
                {/* Timeline Center Dot (Desktop Only) */}
                <div className="hidden md:flex absolute top-10 w-12 h-12 rounded-full border border-sky-500 bg-obsidian z-20 items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] edu-timeline-dot"
                     style={{ [isLeft ? 'right' : 'left']: 'calc(-1.5rem)' }} 
                >
                  <div className="w-10 h-10 rounded-full bg-white p-1 overflow-hidden">
                    <img src={edu.logo} alt="" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* The Timeline Card */}
                <div className="w-full xl:w-[85%] edu-timeline-card">
                   <EducationCard edu={edu} />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
