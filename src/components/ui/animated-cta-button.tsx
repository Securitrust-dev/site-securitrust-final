'use client';

interface AnimatedCTAButtonProps {
  href: string;
  text: string;
  className?: string;
}

export const AnimatedCTAButton = ({ href, text, className = '' }: AnimatedCTAButtonProps) => {
  const letters = text.split('');
  
  return (
    <a href={href} className={className}>
      <button 
        className="inline-flex transition overflow-hidden group text-sm font-medium text-white rounded-full pt-3 pr-5 pb-3 pl-5 relative gap-x-2 gap-y-2 items-center hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.6),0_0_0_2px_rgba(244,63,94,0.3)]"
        style={{
          background: 'linear-gradient(135deg, rgb(26, 26, 26) 0%, rgb(10, 10, 10) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'rgba(0, 0, 0, 0.4) 0px 8px 32px, rgba(255, 255, 255, 0.1) 0px 1px 0px inset, rgba(0, 0, 0, 0.5) 0px -1px 0px inset',
          height: '60px',
          transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Loader Background */}
        <div 
          className="absolute top-0 left-0 h-full w-full z-[1] bg-transparent"
          style={{
            mask: 'repeating-linear-gradient(90deg, transparent 0, transparent 6px, black 7px, black 8px)',
            WebkitMask: 'repeating-linear-gradient(90deg, transparent 0, transparent 6px, black 7px, black 8px)'
          }}
        >
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, #f43f5e 0%, transparent 50%), radial-gradient(circle at 45% 45%, #ef4444 0%, transparent 45%), radial-gradient(circle at 55% 55%, #fb7185 0%, transparent 45%), radial-gradient(circle at 45% 55%, #f87171 0%, transparent 45%), radial-gradient(circle at 55% 45%, #dc2626 0%, transparent 45%)',
              mask: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 10%, black 25%)',
              WebkitMask: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 10%, black 25%)',
              filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.6))',
              animation: 'transform-animation 2s infinite alternate, opacity-animation 4s infinite',
              animationTimingFunction: 'cubic-bezier(0.6, 0.8, 0.5, 1)',
            }}
          />
        </div>

        {/* Text with Letter Animation */}
        <span 
          className="relative z-[2] font-semibold text-base select-none text-white flex gap-2"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                opacity: 0,
                animation: 'loader-letter-anim 4s infinite linear',
                animationDelay: `${0.1 + index * 0.105}s`
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </span>
      </button>
    </a>
  );
};