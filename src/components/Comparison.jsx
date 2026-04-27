import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Comparison() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // 1. Animate headers
      tl.fromTo(
        '.comp-heading',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      )
      // 2. Animate the main table wrapper
      .fromTo(
        '.comp-table',
        { opacity: 0, y: 50, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      // 3. Fade in table header
      .fromTo(
        '.comp-table-header',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.4'
      )
      // 4. Slide in each row with a stagger
      .fromTo(
        '.comp-row',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.2)' },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const comparisonData = [
    {
      feature: "Infrastructure Approach",
      standard: "Manual server setup or basic PaaS deployments.",
      piyush: "Infrastructure as Code (Terraform/CloudFormation) for repeatable, secure AWS environments."
    },
    {
      feature: "System Reliability",
      standard: "Reacts to downtime after the fact.",
      piyush: "Proactive monitoring, auto-scaling, and multi-AZ deployments for 99.9% uptime."
    },
    {
      feature: "Code Quality & CI/CD",
      standard: "Manual testing and ftp/ssh deployments.",
      piyush: "Zero-downtime automated deployment pipelines with built-in security scanning."
    },
    {
      feature: "Frontend Experience",
      standard: "Generic templates with out-of-the-box UI libraries.",
      piyush: "Bespoke, cinematic, interactive digital instruments built with precise mathematics."
    }
  ];

  return (
    <section id="why-me" ref={sectionRef} className="py-24 px-6 md:px-16 w-full max-w-5xl mx-auto">
      <div className="mb-16">
        <h2 className="comp-heading text-sm font-mono tracking-widest text-champagne uppercase mb-4">The Delta</h2>
        <h3 className="comp-heading text-4xl md:text-5xl font-drama font-bold">Why I Am Different</h3>
        <p className="comp-heading mt-4 text-slate-400 font-sans max-w-2xl text-sm leading-relaxed">
          The difference between a developer and an architect is foresight. I don't just build features; I engineer resilient ecosystems.
        </p>
      </div>

      <div className="comp-table w-full flex flex-col border border-white/10 rounded-3xl bg-slate/20 overflow-hidden shadow-2xl backdrop-blur-sm">
        
        {/* Table Header */}
        <div className="comp-table-header grid grid-cols-1 md:grid-cols-12 gap-4 p-6 border-b border-white/10 bg-obsidian/80">
          <div className="md:col-span-3 font-mono text-xs tracking-widest text-slate-500 uppercase">Focus Area</div>
          <div className="hidden md:block md:col-span-4 font-mono text-xs tracking-widest text-slate-500 uppercase">Standard Developer</div>
          <div className="hidden md:block md:col-span-5 font-mono text-xs tracking-widest text-champagne uppercase font-bold">Piyush (Architect)</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col">
          {comparisonData.map((item, index) => (
            <div 
              key={index} 
              className={`comp-row grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center transition-colors hover:bg-slate/40 ${index !== comparisonData.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              {/* Feature Name */}
              <div className="md:col-span-3">
                <span className="font-sans font-bold text-white md:text-sm">{item.feature}</span>
              </div>
              
              {/* Standard */}
              <div className="md:col-span-4 flex items-start gap-3 mt-2 md:mt-0 opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <span className="font-sans text-sm">{item.standard}</span>
              </div>

              {/* Piyush */}
              <div className="md:col-span-5 flex items-start gap-3 mt-4 md:mt-0 bg-champagne/10 p-4 rounded-xl border border-champagne/20">
                <div className="w-1.5 h-1.5 rounded-full bg-champagne mt-1.5 shrink-0 animate-pulse" />
                <span className="font-sans text-sm text-champagne font-medium">{item.piyush}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
