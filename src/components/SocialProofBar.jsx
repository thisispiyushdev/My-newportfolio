export default function SocialProofBar() {
  const techLogos = [
    "AWS ARCHITECTURE", "NODE.JS", "PYTHON", "REACT", "DOCKER", "KUBERNETES", "CI/CD", "TERRAFORM"
  ];

  const stats = [
    "99.9% UPTIME SLA", "AWS CERTIFIED", "ZERO-DOWNTIME MIGRATION", "MILLIONS OF R/S", "ENTERPRISE GRADE", "SECURE BY DEFAULT"
  ];

  // Duplicate arrays to ensure seamless scrolling
  const renderLogos = [...techLogos, ...techLogos, ...techLogos];
  const renderStats = [...stats, ...stats, ...stats];

  return (
    <section className="w-full bg-transparent py-12 md:py-24 border-y border-white/5 overflow-hidden relative">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col gap-8 md:gap-12 relative z-0">
        
        {/* Top Row - Tech Logos */}
        <div className="flex w-max animate-scroll-left">
          {renderLogos.map((text, i) => (
            <div 
              key={`logo-${i}`} 
              className="mx-8 md:mx-16 font-drama text-2xl md:text-4xl text-white/50 whitespace-nowrap tracking-wider font-semibold"
            >
              {text}
            </div>
          ))}
        </div>

        {/* Bottom Row - Stats */}
        <div className="flex w-max animate-scroll-right">
          {renderStats.map((text, i) => (
            <div 
              key={`stat-${i}`} 
              className="mx-8 md:mx-16 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
              <span className="font-mono text-sm md:text-base text-champagne uppercase tracking-widest whitespace-nowrap">
                {text}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
