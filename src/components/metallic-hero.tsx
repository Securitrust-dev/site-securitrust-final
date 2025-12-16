'use client';

import Image from 'next/image';

export const MetallicHero = () => {
  return (
    <div className="relative w-full max-w-[2131px] mx-auto" style={{ aspectRatio: '2131/489' }}>
      {/* Hero Container */}
      <div className="relative w-full h-full overflow-hidden rounded-lg shadow-[0_30px_60px_rgba(2,6,12,0.6)]"
        style={{
          background: `
            radial-gradient(1200px 600px at 50% 40%, rgba(255, 255, 255, 0.02), transparent 8%),
            radial-gradient(900px 400px at 30% 50%, rgba(0, 120, 255, 0.02), transparent 6%),
            linear-gradient(180deg, rgba(10, 12, 15, 1) 0%, rgba(21, 23, 27, 1) 100%)
          `
        }}
      >
        {/* Artwork Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b/generated_images/ultra-realistic-metallic-logo-securitrus-f46df6df-20251127133119.jpg"
            alt="SecuriTrust - Logo métallique"
            width={1800}
            height={420}
            className="object-contain h-[85%] w-auto"
            style={{
              filter: 'drop-shadow(0 40px 60px rgba(0, 0, 0, 0.7))',
              userSelect: 'none',
            }}
            priority
          />
        </div>

        {/* Glow Effect */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen opacity-90"
          style={{
            width: '1100px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(closest-side, rgba(120, 140, 255, 0.06), rgba(120, 70, 180, 0.02) 35%, transparent 60%)',
            filter: 'blur(30px)',
          }}
          aria-hidden="true"
        />

        {/* Note */}
        <div className="absolute right-3 bottom-2.5 text-xs text-white/45 bg-black/[0.18] px-2 py-1.5 rounded backdrop-blur-sm">
          Logo premium SecuriTrust
        </div>
      </div>
    </div>
  );
};
