'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface GreenNeonButtonProps {
  href: string;
  text: string;
  className?: string;
}

export const GreenNeonButton = ({ href, text, className = '' }: GreenNeonButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 transition-colors relative overflow-hidden text-sm font-medium rounded-full ${className}`}
      style={{
        '--green': '#1BFD9C',
        fontSize: '15px',
        padding: '0.7em 2.7em',
        letterSpacing: '0.06em',
        fontFamily: 'inherit',
        borderRadius: '2.6em',
        lineHeight: '1.4em',
        border: '2px solid var(--green)',
        background: 'linear-gradient(to right, rgba(27, 253, 156, 0.1) 1%, transparent 40%, transparent 60%, rgba(27, 253, 156, 0.1) 100%)',
        color: isHovered ? '#82ffc9' : 'var(--green)',
        boxShadow: isHovered 
          ? 'inset 0 0 10px rgba(27, 253, 156, 0.6), 0 0 9px 3px rgba(27, 253, 156, 0.2)'
          : 'inset 0 0 10px rgba(27, 253, 156, 0.4), 0 0 9px 3px rgba(27, 253, 156, 0.1)',
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className="sweep-effect"
        style={{
          content: '',
          position: 'absolute',
          left: '-4em',
          width: '4em',
          height: '100%',
          top: 0,
          background: 'linear-gradient(to right, transparent 1%, rgba(27, 253, 156, 0.1) 40%, rgba(27, 253, 156, 0.1) 60%, transparent 100%)',
          pointerEvents: 'none',
          transform: isHovered ? 'translateX(15em)' : 'translateX(-4em)',
          transition: 'transform 0.6s ease',
        }}
      />
      {text}
      <ArrowRight className="w-4 h-4" strokeWidth={2} />
    </a>
  );
};
