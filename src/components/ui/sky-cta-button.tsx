'use client';

interface SkyCTAButtonProps {
  href: string;
  text: string;
  className?: string;
}

export const SkyCTAButton = ({ href, text, className = '' }: SkyCTAButtonProps) => {
  return (
    <a href={href} className={`hidden sm:inline-flex ${className}`}>
      <button className="group hover:shadow-sky-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-sky-400/60 overflow-hidden bg-gradient-to-br from-sky-900/40 via-black-900/60 to-black/80 border-sky-500/30 border-2 rounded-full pt-2.5 pr-4 pb-2.5 pl-5 relative shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        <div className="group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-sky-500/10 via-sky-400/20 to-sky-500/10 opacity-0 rounded-2xl absolute top-0 right-0 bottom-0 left-0"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex-1 text-left">
            <p className="group-hover:text-white transition-colors duration-300 text-sm font-bold text-white drop-shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {text}
            </p>
          </div>
          <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-4 h-4 text-white">
              <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </div>
        </div>
      </button>
    </a>
  );
};