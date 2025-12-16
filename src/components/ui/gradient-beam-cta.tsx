'use client';

import { useRouter } from 'next/navigation';

interface GradientBeamCTAProps {
  href: string;
  text: string;
}

export const GradientBeamCTA = ({ href, text }: GradientBeamCTAProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group w-full sm:w-auto relative overflow-hidden"
      style={{
        alignItems: 'center',
        backgroundImage: 'linear-gradient(144deg, rgb(175, 64, 255), rgb(91, 66, 243) 50%, rgb(0, 221, 235))',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 3s ease infinite',
        border: '0px',
        borderRadius: '8px',
        boxShadow: 'rgba(151, 65, 252, 0.2) 0px 15px 30px -5px',
        boxSizing: 'border-box',
        color: 'rgb(255, 255, 255)',
        display: 'inline-flex',
        fontSize: '14px',
        justifyContent: 'center',
        lineHeight: '1em',
        maxWidth: '100%',
        minWidth: 'auto',
        padding: '3px',
        textDecoration: 'none',
        userSelect: 'none',
        touchAction: 'manipulation',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        height: '40px',
        marginTop: '1rem',
        transform: 'scale(1)',
        width: 'auto',
        transition: 'all 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseOver={(e) => {
        const target = e.currentTarget;
        const span = target.querySelector('span');
        if (span) (span as HTMLElement).style.background = 'none';
        target.style.boxShadow = 'rgba(151, 65, 252, 0.5) 0px 20px 40px -5px, rgba(0, 221, 235, 0.3) 0px 0px 30px';
      }}
      onMouseOut={(e) => {
        const target = e.currentTarget;
        const span = target.querySelector('span');
        if (span) (span as HTMLElement).style.backgroundColor = 'rgb(5, 6, 45)';
        target.style.boxShadow = 'rgba(151, 65, 252, 0.2) 0px 15px 30px -5px';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.9)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <span
        className="lg:text-sm xl:text-base lg:py-3 lg:px-6 xl:py-3.5 xl:px-7 relative z-10"
        style={{
          background: 'rgb(5, 6, 45)',
          padding: '12px 18px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          fontSize: '13px',
          fontWeight: 500,
          transition: 'background 0.3s ease',
        }}
      >
        {text}
      </span>
    </a>
  );
};