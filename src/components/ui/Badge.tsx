import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'cyber';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-mono font-semibold tracking-wider uppercase transition-colors select-none",
        variant === 'default' && "bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-white/10",
        variant === 'outline' && "bg-transparent text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10",
        variant === 'cyber' && "bg-cyberlime/10 text-cyberlime border border-cyberlime/20",
        className
      )}
      {...props}
    />
  );
}
