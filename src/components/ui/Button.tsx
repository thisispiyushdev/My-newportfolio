import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyber';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 select-none",
          size === 'sm' && "px-4 py-2 text-[10px]",
          size === 'md' && "px-6 py-3",
          size === 'lg' && "px-8 py-4 text-sm",
          variant === 'primary' && "bg-cyberlime text-obsidian dark:text-obsidian shadow-[0_0_20px_rgba(203,255,0,0.15)] hover:shadow-[0_0_25px_rgba(203,255,0,0.35)] hover:bg-cyberlime/90 hover:scale-[1.02]",
          variant === 'secondary' && "bg-slate-900/50 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-900/10 dark:border-white/10 hover:bg-slate-900/10 dark:hover:bg-white/10 hover:border-slate-900/20 dark:hover:border-white/20",
          variant === 'outline' && "bg-transparent text-slate-900 dark:text-white border border-slate-900/15 dark:border-white/15 hover:border-cyberlime/40 hover:text-cyberlime hover:bg-cyberlime/5",
          variant === 'ghost' && "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5",
          variant === 'cyber' && "border border-cyberlime/30 bg-cyberlime/5 text-cyberlime hover:bg-cyberlime/15 shadow-[0_0_15px_rgba(203,255,0,0.05)]",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
