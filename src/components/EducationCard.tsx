"use client";

import React from 'react';
import Image from 'next/image';

interface Edu {
  id: number;
  degree: string;
  course: string;
  institution: string;
  duration: string;
  grade: string;
  description: string;
  logo: any;
}

interface EducationCardProps {
  edu: Edu;
}

export default function EducationCard({ edu }: EducationCardProps) {
  return (
    <div className="relative bg-slate-100/30 dark:bg-white/[0.01] border border-slate-200/50 dark:border-white/5 rounded-2xl p-6 md:p-8 w-full shadow-2xl backdrop-blur-xl transition-all hover:border-electricpurple/30 hover:shadow-[0_0_30px_rgba(157,78,221,0.1)] dark:hover:shadow-[0_0_30px_rgba(157,78,221,0.15)] hover:-translate-y-1 duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 relative">
        {/* Card Logo Image */}
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white p-2 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-white/10 shadow-md">
          <Image 
            src={edu.logo} 
            alt={edu.institution} 
            width={60}
            height={60}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-start w-full mb-1 flex-col gap-1 sm:gap-0">
             <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">
               {edu.degree}
             </h3>
             <h4 className="text-lg font-semibold text-slate-700 dark:text-white/90 leading-tight">
               {edu.course}
             </h4>
          </div>
          <p className="text-purple-650 dark:text-electricpurple text-sm font-mono">
            {edu.institution}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-mono">
             {edu.duration}
          </p>
        </div>
      </div>
      
      {/* Grade */}
      <div className="mb-4">
        <span className="px-3 py-1 bg-electricpurple/10 text-purple-650 dark:text-electricpurple text-xs font-mono rounded-md border border-electricpurple/20 shadow-sm">
          {edu.grade}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed font-light font-sans">
        {edu.description}
      </p>
    </div>
  );
}
