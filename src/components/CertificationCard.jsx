import React from "react";
import { ExternalLink } from "lucide-react";
import saa from '../assets/certificate_page/saa.jpg';
import oracle from '../assets/certificate_page/oracle.jpg';
import devops from '../assets/certificate_page/devops.jpg';
import fullstack from '../assets/certificate_page/fullstack.jpg';
import nptel from '../assets/certificate_page/nptel.jpeg';

export const certificationsData = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect – Associate",
    provider: "Amazon Web Services",
    category: "Cloud Architecture",
    description:
      "Validates expertise in designing scalable, cost-efficient, fault-tolerant systems on AWS. Covers services like EC2, S3, VPC, IAM, RDS, DynamoDB, and architectural best practices.",
    image:
      saa,
    year: "2026 to 2029",
  },
  {
    id: 2,
    title: "Oracle Cloud Infrastructure Foundations Associate",
    provider: "Oracle",
    category: "Cloud Infrastructure",
    description:
      "Demonstrates knowledge of Oracle Cloud architecture, core OCI services, security, networking, and governance principles.",
    image:
      oracle,
    year: "2025 to 2028",
  },
  {
    id: 3,
    title: "DevOps + AWS Training",
    provider: "Professional Training Program",
    category: "DevOps Engineering",
    description:
      "Covers CI/CD pipelines, Docker, Kubernetes basics, AWS deployment, infrastructure automation, and DevOps lifecycle practices.",
    image:
      devops,
    year: "2026 to 2029",
  },
  {
    id: 4,
    title: "Full Stack Development Training",
    provider: "Sheriyans Coding School",
    category: "Web Development",
    description:
      "Training in MERN stack including MongoDB, Express, React, Node.js with REST APIs, authentication, and production deployment.",
    image:
      fullstack,
    year: "2025 to 2028",
  },
  {
    id: 5,
    title: "NPTEL Certification",
    provider: "IIT / NPTEL",
    category: "Technical Achievement",
    description:
      "Successfully completed the NPTEL certification course, demonstrating a strong understanding of fundamental engineering concepts and continuous learning methodologies.",
    image:
      nptel,
    year: "2024 to 2026",
  }
];

const CertificationCard = ({ cert, onClick }) => {
  return (
    <div className="w-full group perspective-1000 h-[500px] md:h-[600px] mx-auto">
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-obsidian/30 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-500 hover:border-emerald-500/30 flex flex-col">
        
        {/* Top Image Section */}
        <div className="w-full h-48 md:h-64 relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent z-10"></div>
          <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay z-10 transition-opacity duration-300 group-hover:opacity-0"></div>
          <img 
            src={cert.image} 
            alt={cert.title} 
            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
            loading="lazy"
          />
          
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-obsidian bg-emerald-400 rounded-full shadow-lg">
              {cert.category}
            </span>
          </div>
        </div>

        {/* Bottom Content Section */}
        <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 bg-gradient-to-b from-transparent to-obsidian border-t border-white/5">
          <div className="flex justify-between items-start mb-4">
            <p className="text-emerald-400 font-medium text-sm">
              {cert.provider}
            </p>
            <span className="text-gray-500 text-sm font-mono">{cert.year}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-emerald-200 transition-all duration-300">
            {cert.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4">
            {cert.description}
          </p>

          <button 
            onClick={onClick}
            className="mt-auto self-start flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-emerald-500/20 text-white border border-white/10 hover:border-emerald-500/50 transition-all duration-300 group/btn"
          >
            <span className="text-sm font-semibold tracking-wide">View Credential</span>
            <ExternalLink size={16} className="transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        {/* Hover ambient glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 rounded-[34px]"></div>
      </div>
    </div>
  );
};

export default CertificationCard;
