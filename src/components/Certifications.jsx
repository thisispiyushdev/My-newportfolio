import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CertificationCard, { certificationsData } from "./CertificationCard";
import CertificationModal from "./CertificationModal";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      
      gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (wrapper.scrollWidth - window.innerWidth + 100)
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section ref={sectionRef} className="bg-transparent text-white relative w-full h-[100dvh] overflow-hidden" id="certifications">
      {/* Background Ambience */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] mix-blend-screen opacity-40 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-champagne/5 rounded-full blur-[120px] mix-blend-screen opacity-20 transform -translate-y-1/4"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-16 md:pb-24">
        {/* Header Content */}
        <div className="absolute top-28 md:top-20 left-6 md:left-16 z-20 flex flex-col items-start w-full pointer-events-none pr-6">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mix-blend-difference leading-none uppercase whitespace-nowrap">
            Major <span className="font-drama text-champagne italic">Certifications</span>
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-gray-400 mt-2 mix-blend-difference max-w-lg whitespace-normal">
            Validation of my technical expertise and continuous commitment to mastering modern technologies.
          </p>
        </div>

        {/* Horizontal Scroll Wrapper */}
        <div className="flex w-max h-auto pl-[5vw] md:pl-[45vw] lg:pl-[40vw] relative z-10" ref={scrollWrapperRef}>
          {certificationsData.map((cert) => (
            <div key={cert.id} className="cert-card-wrapper w-[85vw] md:w-[45vw] lg:w-[35vw] flex-shrink-0 px-4 flex items-center justify-center">
              <div className="w-full h-full max-w-[500px]">
                <CertificationCard cert={cert} onClick={() => setSelectedCert(cert)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification Modal Popup */}
      {selectedCert && (
        <CertificationModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </section>
  );
};

export default Certifications;
