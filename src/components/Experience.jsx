import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { experienceData } from '../data/experienceData';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
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
            scrub: 1, // Smooth drawing tied to scroll position
          }
        }
      );

      // 2. Card Zig-Zag Fade Animations
      const timelineCards = gsap.utils.toArray('.timeline-card');
      const timelineDots = gsap.utils.toArray('.timeline-dot');

      timelineCards.forEach((card, index) => {
        // Determine if left or right (Left = even index, Right = odd index)
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
      id="experience" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-transparent py-24 md:py-32 px-6 md:px-16 overflow-hidden flex flex-col items-center"
    >
      
      {/* Background Decor Elements matching section aesthetic */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      <div className="flex flex-col items-center mb-24 z-10 w-full text-center">
        <h2 className="text-3xl md:text-5xl font-drama font-bold text-white mb-6 tracking-wider uppercase">
          EXPERIENCE
        </h2>
        <p className="text-gray-400 font-sans text-sm md:text-base max-w-2xl mx-auto">
          A timeline of my professional journey, internships, and the technical roles that have shaped my career.
        </p>
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        
        {/* The Vertical CSS Line Container */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white/10 hidden md:block">
           {/* The actual drawing "fill" line */}
           <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-champagne via-purple-500 to-transparent origin-top"></div>
        </div>

        {/* Timeline Grid (Mobile vs Desktop) */}
        {/* On mobile: single column. On desktop: 2 column grid where children span both columns based on classes */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-y-16 md:gap-y-0 w-full relative z-10">
          
          {experienceData.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={exp.id} 
                className={`relative w-full flex ${isLeft ? 'md:justify-end md:pr-16 lg:pr-24' : 'md:justify-start md:col-start-2 md:pl-16 lg:pl-24'} ${index !== 0 ? 'md:mt-32' : ''}`}
              >
                {/* Timeline Center Dot (Desktop Only) */}
                <div className="hidden md:flex absolute top-10 w-12 h-12 rounded-full border border-purple-500 bg-obsidian z-20 items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] timeline-dot"
                     style={{ [isLeft ? 'right' : 'left']: 'calc(-1.5rem)' }} // 1.5rem is half the width of the 3rem (12 units) dot
                >
                  <div className="w-10 h-10 rounded-full bg-white p-1 overflow-hidden">
                    <img src={exp.logo} alt="" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* The Timeline Card */}
                <div className="w-full xl:w-[85%] timeline-card">
                  <div className="relative bg-[#131025] border border-white/10 rounded-2xl p-6 md:p-8 w-full shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:-translate-y-1 duration-300">
                    
                    {/* Header section */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 relative">
                      
                      {/* Card Logo Image */}
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white p-2 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/20 shadow-md">
                        <img 
                          src={exp.logo} 
                          alt={exp.company} 
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col w-full">
                        <div className="flex justify-between items-start md:items-center w-full mb-2 flex-col md:flex-row gap-2 md:gap-0">
                           <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                             {exp.role}
                           </h3>
                           <p className="text-gray-500 text-xs md:text-sm whitespace-nowrap hidden md:block">
                             {exp.duration}
                           </p>
                        </div>
                        <p className="text-gray-400 text-sm md:text-base font-medium">
                          {exp.company}
                        </p>
                        <p className="text-gray-500 text-xs mt-1 md:hidden">
                           {exp.duration}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, sIdx) => (
                            <span 
                              key={sIdx}
                              className="px-3 py-1 bg-[#8B5CF6]/90 text-white text-xs md:text-sm rounded-md shadow-sm border border-[#8B5CF6]/50"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
