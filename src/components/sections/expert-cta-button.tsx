import { Calendar } from 'lucide-react';
import Link from 'next/link';

interface ExpertCTAButtonProps {
  className?: string;
  variant?: 'default' | 'outline';
}

export function ExpertCTAButton({ className = '', variant = 'default' }: ExpertCTAButtonProps) {
  const baseStyles = 'inline-flex items-center gap-3 px-8 py-4 font-medium tracking-widest uppercase transition-all rounded group';
  
  const variantStyles = {
    default: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]',
    outline: 'border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]'
  };

  return (
    <Link 
      href="https://calendly.com/rayen-ben-ghorbal-securitrust/30min"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
      <span>Je veux prends rdv avec un expert</span>
    </Link>
  );
}