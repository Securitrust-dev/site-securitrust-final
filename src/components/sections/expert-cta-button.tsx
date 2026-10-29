import { Calendar } from 'lucide-react';
import Link from 'next/link';

interface ExpertCTAButtonProps {
  className?: string;
  variant?: 'default' | 'outline';
}

export function ExpertCTAButton({ className = '', variant = 'default' }: ExpertCTAButtonProps) {
  // Boutons de la charte (globals.css) : orange plein ou contour bleu ciel.
  const baseStyles = 'group';
  const variantStyles = {
    default: 'btn-brand',
    outline: 'btn-brand-ghost',
  };

  return (
    <Link 
      href="https://calendly.com/expert-securitrust"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
        <span>Prendre RDV avec un expert</span>
    </Link>
  );
}