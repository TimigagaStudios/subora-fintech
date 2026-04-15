import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("glass rounded-2xl p-6 border border-border", className)}>
    {children}
  </div>
);

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger',
  size?: 'sm' | 'md' | 'lg' | 'icon'
}) => {
  const base = "inline-flex items-center justify-center font-medium transition-all rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-accent text-black hover:opacity-90",
    secondary: "bg-secondary-background text-text-primary hover:opacity-80 border border-border",
    ghost: "bg-transparent text-text-primary hover:bg-text-primary/5",
    outline: "bg-transparent border border-border text-text-primary hover:border-accent hover:text-accent",
    danger: "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
    icon: "p-2.5"
  };

  return (
    <button 
      className={cn(base, variants[variant], sizes[size], className)} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    className={cn(
      "w-full bg-secondary-background border border-border rounded-xl px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all",
      className
    )}
    {...props}
  />
);

export const Badge = ({ children, variant = 'default', className }: { 
  children: React.ReactNode, 
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger',
  className?: string
}) => {
  const variants = {
    default: "bg-white/5 text-text-secondary",
    accent: "bg-accent/10 text-accent border border-accent/20",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20",
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
};
