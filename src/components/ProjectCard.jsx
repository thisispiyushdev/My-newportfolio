import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div 
      className="project-card w-full group perspective-1000 h-[450px] mx-auto cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-obsidian/30 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:-translate-y-2 flex flex-col">
        
        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent transition-opacity duration-500 pointer-events-none z-0"></div>

        {/* Project Image */}
        <div className="h-[220px] w-full overflow-hidden relative z-10 border-b border-white/10">
          <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay z-10"></div>
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Project Content */}
        <div className="flex-1 p-6 flex flex-col z-10">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>

          <div className="mt-auto">
             <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 text-[10px] font-mono tracking-wider text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProjectCard;
