import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projectsData } from '../data/projectsData';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      
      gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (wrapper.scrollWidth - window.innerWidth + 100)
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="projects" className="relative w-full min-h-screen bg-transparent pt-24 md:pt-32 pb-0 px-0 overflow-hidden flex flex-col justify-center">
      
      {/* Background Decor - Made subtle so ThreeJS stands out */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2 mix-blend-screen z-0" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-champagne/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen z-0" />

      {/* Grid Canvas */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      
      <div className="relative z-10 w-full h-full flex flex-col justify-center">
        
        {/* Header Content */}
        <div className="absolute top-12 left-6 md:left-16 z-20 flex flex-col items-start max-w-2xl">
          <h2 className="text-[10vw] md:text-[6vw] font-drama font-bold text-white uppercase tracking-wider leading-none mix-blend-difference">
            PROJECTS
          </h2>
          <p className="text-sm md:text-lg text-slate-300 font-sans mt-2 mix-blend-difference">
            Scroll to explore my technical journey and built systems.
          </p>
        </div>

        {/* Horizontal Scroll Wrapper */}
        <div className="flex w-max h-auto mt-24 md:mt-32 pl-6 md:pl-16" ref={scrollWrapperRef}>
          {projectsData.map((project) => (
             <div key={project.id} className="project-slide w-[80vw] md:w-[40vw] flex-shrink-0 px-4 md:px-8 flex items-center justify-center">
               <div className="w-full h-full max-w-[500px]">
                 <ProjectCard 
                   project={project} 
                   onClick={() => setSelectedProject(project)} 
                 />
               </div>
             </div>
          ))}
        </div>
      </div>

      {/* Conditional Project ModalPopup */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
