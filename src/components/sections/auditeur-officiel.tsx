'use client';

import Image from 'next/image';

const auditeurs = [
  { name: 'Membre de l\'ACN', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249602665.png?width=8000&height=8000&resize=contain', angle: 0 },
  { name: 'Labellisé France Cybersecurity', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249611173.png?width=8000&height=8000&resize=contain', angle: 36 },
  { name: 'Boost Aerospace', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249620954.png?width=8000&height=8000&resize=contain', angle: 72 },
  { name: 'AFNOR Certification', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249628417.png?width=8000&height=8000&resize=contain', angle: 108 },
  { name: 'OSCP', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1_fnuopUHP5QUdL6kVTjHbFg-1764249670179.png?width=8000&height=8000&resize=contain', angle: 144 },
  { name: 'CEH', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/certification-ceh-devensys-1764249692904.png?width=8000&height=8000&resize=contain', angle: 180 },
  { name: 'ISO 27001 Lead Implementer', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/iso-27001-lead-implementer-formation-1764249728549.png?width=8000&height=8000&resize=contain', angle: 216 },
  { name: 'ISO 27001 Lead Auditor', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/images-1764249748417.jpg?width=8000&height=8000&resize=contain', angle: 252 },
  { name: 'SecNum Académie ANSSI', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/images-1764249836825.png?width=8000&height=8000&resize=contain', angle: 288 },
  { name: 'Membre de l\'ACN', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249602665.png?width=8000&height=8000&resize=contain', angle: 324 },
];

export function AuditeurOfficiel() {
  return (
    <section className="py-32 relative z-10 bg-black">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="bg-white/5 border border-white/10 rounded-lg p-12 lg:p-16">
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Copy */}
              <div className="w-full h-full">
                <h2 className="text-[48px] lg:text-[56px] font-light text-white tracking-tight mb-6 leading-[1.1]">
                  Auditeurs Certifiés
                </h2>
                <p className="text-base lg:text-lg text-white/70 leading-relaxed font-light mb-8">
                  Notre équipe d'experts en cybersécurité dispose de certifications reconnues par les plus hautes instances pour garantir des audits de haute qualité.
                </p>

                {/* Feature pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-center rounded-md px-4 py-3 border border-[#38bdf8]/30 bg-[#38bdf8]/5">
                    <span className="text-sm text-white/80 font-light">Experts Certifiés</span>
                  </div>
                  <div className="flex items-center justify-center rounded-md px-4 py-3 border border-[#38bdf8]/30 bg-[#38bdf8]/5">
                    <span className="text-sm text-white/80 font-light">Conformité réglementaire</span>
                  </div>
                  <div className="flex items-center justify-center rounded-md px-4 py-3 border border-[#38bdf8]/30 bg-[#38bdf8]/5">
                    <span className="text-sm text-white/80 font-light">Normes ISO 27001</span>
                  </div>
                  <div className="flex items-center justify-center rounded-md px-4 py-3 border border-[#38bdf8]/30 bg-[#38bdf8]/5">
                    <span className="text-sm text-white/80 font-light">Accompagnement sur mesure</span>
                  </div>
                </div>
              </div>

              {/* Right: Team Circle */}
              <div className="flex items-center justify-center group" id="aura-emfe3pp6g">
                <style dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes rotateCircle {
                      from {
                        transform: rotate(0deg);
                      }
                      to {
                        transform: rotate(360deg);
                      }
                    }

                    @keyframes counterRotate {
                      from {
                        transform: rotate(0deg);
                      }
                      to {
                        transform: rotate(-360deg);
                      }
                    }

                    #aura-emfe3pp6g:hover {
                      animation-play-state: paused;
                    }

                    #aura-emfe3pp6g:hover .counter-rotate {
                      animation-play-state: paused;
                    }
                  `
                }} />

                <div className="relative w-[24rem] h-[24rem] sm:w-[28rem] sm:h-[28rem] lg:w-[32rem] lg:h-[32rem]"
                  style={{ animation: 'rotateCircle 60s linear infinite', animationPlayState: 'running' }}>
                  <div className="pointer-events-none absolute -inset-8 rounded-full blur-3xl bg-[#38bdf8]/10"></div>

                  {auditeurs.map((auditeur, index) => (
                    <div
                      key={index}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${auditeur.angle}deg) translateX(12rem) rotate(-${auditeur.angle}deg)`
                      }}>
                      <div
                        className="counter-rotate w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full ring-2 ring-[#38bdf8]/50 bg-white/95 overflow-hidden transition-all duration-300 hover:scale-110 hover:ring-[#38bdf8]/80 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center justify-center p-3"
                        style={{ animation: 'counterRotate 60s linear infinite' }}>
                        <Image
                          src={auditeur.image}
                          alt={auditeur.name}
                          width={112}
                          height={112}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}