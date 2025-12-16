'use client';

import Image from 'next/image';
import { OrangeBeamCTA } from '@/components/ui/orange-beam-cta';

const certificationLogos = {
  iso: [
    {
      name: 'ISO 27001 Lead Implementer',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/iso-27001-lead-implementer-formation-1764249728549.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'ISO 27001 Lead Auditor',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/images-1764249748417.jpg?width=8000&height=8000&resize=contain'
    },
  ],
  hacking: [
    {
      name: 'CEH - Certified Ethical Hacker',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/certification-ceh-devensys-1764249692904.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'OSCP - OffSec Certified Professional',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/1_fnuopUHP5QUdL6kVTjHbFg-1764249670179.png?width=8000&height=8000&resize=contain'
    },
  ],
  official: [
    {
      name: 'Membre de l\'ACN',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249602665.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'AFNOR Certification',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249628417.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'SecNum Académie ANSSI',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/images-1764249836825.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'Labellisé France Cybersecurity',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249611173.png?width=8000&height=8000&resize=contain'
    },
    {
      name: 'Boost Aerospace',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249620954.png?width=8000&height=8000&resize=contain'
    },
  ]
};

export function AuditeursCertifiesSection() {
  return (
    <section className="flex flex-col px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 max-w-6xl lg:max-w-7xl mx-auto items-center">
      <div className="overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 bg-gradient-to-br from-blue-500/10 to-blue-500/0 rounded-none relative">
        {/* Top label WITH BOTTOM BORDER */}
        <div className="flex flex-col sm:flex-row border-slate-900 border-b pb-4 sm:pb-5 lg:pb-6 gap-3 sm:gap-4 items-start sm:items-center justify-between">
          <span className="text-xs sm:text-sm lg:text-base uppercase font-medium text-sky-300 tracking-wider">
            NOS CERTIFICATIONS · EXPERTISE
          </span>
          <div className="w-full sm:w-auto">
            <OrangeBeamCTA href="/contact" text="En savoir plus" />
          </div>
        </div>

        {/* Heading row */}
        <div className="mt-6 sm:mt-8 lg:mt-10 grid gap-4 sm:gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50">
              Auditeurs Certifiés et Reconnus
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-right text-slate-300 max-w-md">
            Notre équipe d'experts en cybersécurité dispose de certifications reconnues par les plus hautes instances pour garantir des audits de haute qualité.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-8 sm:mt-10 lg:mt-12 gap-5 sm:gap-6 lg:gap-8">
          {/* Feature 1 - ISO Certifications */}
          <div className="overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-500/0 rounded-sm p-5 sm:p-6 lg:p-7 relative">
            {/* Top label */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400">
              <span className="uppercase tracking-wider text-slate-300">
                CERTIFICATIONS ISO
              </span>
              <span className="text-slate-500">#1</span>
            </div>

            {/* Logo badges constellation */}
            <div className="overflow-hidden bg-center w-full h-48 sm:h-56 lg:h-64 bg-slate-800/30 border-0 rounded-2xl mt-4 sm:mt-5 flex items-center justify-center p-4 sm:p-5 lg:p-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full h-full items-center justify-items-center">
                {certificationLogos.iso.map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-center bg-white rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 p-3 sm:p-4 shadow-lg">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={128}
                      height={128}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Text content */}
            <h3 className="mt-5 sm:mt-6 lg:mt-7 text-sm sm:text-base lg:text-lg font-medium tracking-tight text-slate-50">
              Normes ISO 27001
            </h3>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nos auditeurs sont certifiés Lead Implementer et Lead Auditor ISO 27001, garantissant une expertise de pointe en sécurité de l'information.
            </p>

            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </span>
              Reconnaissance internationale et conformité réglementaire.
            </div>
          </div>

          {/* Feature 2 - Hacking Éthique */}
          <div className="overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-500/0 rounded-sm p-5 sm:p-6 lg:p-7 relative">
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400">
              <span className="uppercase tracking-wider text-slate-300">
                HACKING ÉTHIQUE
              </span>
              <span className="text-slate-500">#2</span>
            </div>

            {/* Logo badges constellation */}
            <div className="overflow-hidden bg-center w-full h-48 sm:h-56 lg:h-64 bg-slate-800/30 border-0 rounded-2xl mt-4 sm:mt-5 flex items-center justify-center p-4 sm:p-5 lg:p-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 w-full h-full items-center justify-items-center">
                {certificationLogos.hacking.map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-center bg-white rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 p-3 sm:p-4 shadow-lg">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={128}
                      height={128}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <h3 className="mt-5 sm:mt-6 lg:mt-7 text-sm sm:text-base lg:text-lg font-medium tracking-tight text-slate-50">
              Experts en Pentest
            </h3>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Certifications CEH et OSCP pour des tests d'intrusion et audits de sécurité offensifs de niveau professionnel.
            </p>

            <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="inline-flex h-1.5 bg-sky-400 w-4 sm:w-5 rounded-full"></span>
                Tests d'intrusion avancés
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex h-1.5 w-4 sm:w-5 rounded-full bg-blue-400"></span>
                Détection de vulnérabilités critiques
              </li>
            </ul>
          </div>

          {/* Feature 3 - Agréments Officiels */}
          <div className="overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-500/0 rounded-sm p-5 sm:p-6 lg:p-7 relative sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400">
              <span className="uppercase tracking-wider text-slate-300">
                AGRÉMENTS OFFICIELS
              </span>
              <span className="text-slate-500">#3</span>
            </div>

            {/* Logo badges constellation */}
            <div className="overflow-hidden bg-center w-full h-48 sm:h-56 lg:h-64 bg-slate-800/30 border-0 rounded-2xl mt-4 sm:mt-5 flex items-center justify-center p-3 sm:p-4 lg:p-5">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Disposition en constellation circulaire pour 5 logos */}
                {certificationLogos.official.map((cert, idx) => {
                  const positions = [
                    { top: '5%', left: '50%', transform: 'translateX(-50%)' },
                    { top: '30%', left: '10%' },
                    { top: '30%', right: '10%' },
                    { bottom: '10%', left: '20%' },
                    { bottom: '10%', right: '20%' },
                  ];
                  
                  return (
                    <div 
                      key={idx} 
                      className="absolute flex items-center justify-center bg-white rounded-full w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 p-2 sm:p-3 shadow-lg"
                      style={positions[idx]}
                    >
                      <Image
                        src={cert.logo}
                        alt={cert.name}
                        width={96}
                        height={96}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <h3 className="mt-5 sm:mt-6 lg:mt-7 text-sm sm:text-base lg:text-lg font-medium tracking-tight text-slate-50">
              Reconnus par l'État
            </h3>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Agréments ACN, Afnor, SecNum Académie et label Boost garantissent notre expertise reconnue au niveau national.
            </p>

            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </span>
              Accompagnement sur mesure avec garantie de qualité.
            </div>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="grid gap-3 sm:gap-4 text-xs sm:text-sm sm:grid-cols-2 lg:grid-cols-3 text-slate-400 border-slate-900 border-t mt-8 sm:mt-10 lg:mt-12 pt-5 sm:pt-6">
          <div className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-sky-400 flex-shrink-0"></span>
            <p>
              Des certifications internationales reconnues pour garantir des audits de la plus haute qualité.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
            <p>
              Conformité avec les normes européennes et françaises les plus strictes en matière de cybersécurité.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
            <p>
              Une équipe d'experts certifiés disponible pour vous accompagner dans votre mise en conformité.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}