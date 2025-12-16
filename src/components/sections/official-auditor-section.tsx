'use client';

import { GraduationCap } from 'lucide-react';
import Image from 'next/image';

const certifications = [
  {
    id: 'acn',
    title: "Membre de l'ACN",
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b/generated_images/acn-logo-minimalist-black-text-acn-with--35bffffc-20251209154251.jpg',
  },
  {
    id: 'france-cyber',
    title: 'Labellisé France Cybersecurity',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1765795709475.png?width=8000&height=8000&resize=contain',
  },
  {
    id: 'boost-aerospace',
    title: 'Boost Aerospace',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1765795655244.png?width=8000&height=8000&resize=contain',
  },
  {
    id: 'afnor',
    title: 'AFNOR Certification',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b/generated_images/afnor-certification-logo-purple-and-blac-7d5483d1-20251209154250.jpg',
  },
  {
    id: 'oscp',
    title: 'OSCP - OffSec Certified Professional',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b/generated_images/oscp-certification-badge-orange-hexagona-0467659f-20251209154250.jpg',
  },
  {
    id: 'ceh',
    title: 'CEH - Certified Ethical Hacker',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b/generated_images/ceh-certified-ethical-hacker-logo-black--7f3f5b2f-20251209154250.jpg',
    hasCTA: true,
  },
  {
    id: 'iso-implementer',
    title: 'ISO 27001 Lead Implementer',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1765796267931.png?width=8000&height=8000&resize=contain',
  },
  {
    id: 'iso-auditor',
    title: 'ISO 27001 Lead Auditor',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1765796267931.png?width=8000&height=8000&resize=contain',
  },
  {
    id: 'secnum',
    title: 'SecNum Académie ANSSI',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b/generated_images/secnum-acad-mie-anssi-logo-french-cybers-34522932-20251209154251.jpg',
  },
];

export const OfficialAuditorSection = () => {
  return (
    <section className="relative py-24 px-4 bg-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05)_0%,transparent_50%)]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-cyan-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-white font-brand uppercase tracking-wide">
              Auditeur Officiel
            </h2>
          </div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Certifications et accréditations officielles pour garantir des audits de haute qualité
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="relative group bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[320px] transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Logo */}
              <div className="mb-6 h-32 flex items-center justify-center bg-white rounded-xl p-4">
                <Image
                  src={cert.logo}
                  alt={cert.title}
                  width={128}
                  height={128}
                  className="object-contain w-auto h-full max-h-32 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Title */}
              <h3 className="text-base font-medium text-white mb-4">
                {cert.title}
              </h3>

              {/* CTA Button for CEH card */}
              {cert.hasCTA && (
                <a
                  href="https://devis-expert-securitrust-simulation.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto px-6 py-3 bg-cyan-500 text-black rounded-full font-bold text-sm uppercase tracking-wide hover:bg-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
                >
                    Je réserve mon pentest au résultat
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};