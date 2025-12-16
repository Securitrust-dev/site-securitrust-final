'use client';

interface GreenNeonCTAButtonProps {
  href: string;
  text: string;
  className?: string;
}

export const GreenNeonCTAButton = ({ href, text, className = '' }: GreenNeonCTAButtonProps) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 hover:bg-emerald-400 transition-colors relative overflow-hidden text-sm font-medium rounded-full pt-3 pr-6 pb-3 pl-6 ${className}`}
      style={{
        fontSize: '15px',
        padding: '0.7em 2.7em',
        letterSpacing: '0.06em',
        position: 'relative',
        fontFamily: 'inherit',
        borderRadius: '2.6em',
        overflow: 'hidden',
        lineHeight: '1.4em',
        border: '2px solid #1BFD9C',
        background: 'linear-gradient(to right, rgba(27, 253, 156, 0.1) 1%, transparent 40%, transparent 60%, rgba(27, 253, 156, 0.1) 100%)',
        color: '#1BFD9C',
        boxShadow: 'rgba(27, 253, 156, 0.4) 0px 0px 10px inset, rgba(27, 253, 156, 0.1) 0px 0px 9px 3px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#82ffc9';
        e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(27, 253, 156, 0.6), 0 0 9px 3px rgba(27, 253, 156, 0.2)';
        const sweepEffect = e.currentTarget.querySelector('.sweep-effect') as HTMLElement;
        if (sweepEffect) sweepEffect.style.transform = 'translateX(15em)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#1BFD9C';
        e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(27, 253, 156, 0.4), 0 0 9px 3px rgba(27, 253, 156, 0.1)';
        const sweepEffect = e.currentTarget.querySelector('.sweep-effect') as HTMLElement;
        if (sweepEffect) sweepEffect.style.transform = 'translateX(-4em)';
      }}
    >
      <span
        className="sweep-effect"
        style={{
          content: '""',
          position: 'absolute',
          left: '-4em',
          width: '4em',
          height: '100%',
          top: '0px',
          background: 'linear-gradient(to right, transparent 1%, rgba(27, 253, 156, 0.1) 40%, rgba(27, 253, 156, 0.1) 60%, transparent 100%)',
          pointerEvents: 'none',
          transform: 'translateX(-4em)',
          transition: 'transform 0.5s ease',
        }}
      ></span>
      {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>
    </a>
  );
};
