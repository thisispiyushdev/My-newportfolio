import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Parallax background
    const bg = bgRef.current;
    if (bg) {
      gsap.to(bg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }

    // Word by word reveal
    if (textRef.current) {
      const words = textRef.current.querySelectorAll('.word');
      gsap.fromTo(words, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          stagger: 0.04,
          ease: 'power2.out',
          duration: 0.8,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  const statement1 = "Most standard developers focus on: shipping features and writing functionally correct code.";
  const statement2 = "I focus on: ";
  const highlight = "engineering digital resilience.";

  const renderWords = (text, isHeading = false, isHighlight = false) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className={`word inline-block mr-2 md:mr-3 ${isHeading ? (isHighlight ? 'text-champagne italic' : 'text-white') : 'text-slate-400'}`}>
        {word}
      </span>
    ));
  };

  return (
    <section id="philosophy" ref={sectionRef} className="relative w-full py-32 md:py-48 bg-transparent overflow-hidden border-y border-white/5">
      {/* Parallax Background Texture */}
      <div 
        ref={bgRef}
        className="absolute inset-x-0 -top-[20%] h-[140%] w-full z-0 opacity-[0.08]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 flex flex-col justify-center h-full">
        
        <div className="mb-16">
          <p className="font-mono text-sm tracking-widest text-champagne uppercase mb-4">The Philosophy</p>
        </div>

        <div ref={textRef} className="flex flex-col gap-12 max-w-4xl">
          {/* Statement 1 */}
          <p className="font-sans text-xl md:text-3xl leading-relaxed font-light">
            {renderWords(statement1)}
          </p>

          {/* Statement 2 */}
          <h2 className="font-drama text-[clamp(2rem,6vw,4.5rem)] leading-tight font-bold tracking-tight">
            {renderWords(statement2, true)}
            {renderWords(highlight, true, true)}
          </h2>

          <div className="mt-8 border-l border-champagne/30 pl-6 md:pl-10">
            <p className="font-sans text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl font-light">
              I operate at the intersection of structural logic and creative expression. With a foundation as an AWS Certified Solutions Architect, I view code as infrastructure and interfaces as instruments. My mission is to ensure that while the backend handles millions of requests with surgical precision, the user experience remains fluid, cinematic, and human.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
