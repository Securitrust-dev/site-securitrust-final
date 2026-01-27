'use client';

import Image from 'next/image';

const certifications = [
  { 
    name: 'Membre de l\'ACN',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249602665.png?width=8000&height=8000&resize=contain'
  },
  { 
    name: 'Labellisé France Cybersecurity',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249611173.png?width=8000&height=8000&resize=contain'
  },
  { 
    name: 'Boost Aerospace',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1764249620954.png?width=8000&height=8000&resize=contain'
  },
    { 
      name: 'AFNOR Certification',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/25f201e2-066a-4cea-babf-1fc0d950aaa1-1769528000810.jpg?width=1024&quality=100'
    },
    { 
      name: 'OSCP - OffSec Certified Professional',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/8aebdc26-3d06-42e3-bb7c-f1c035c7f99b/generated_images/oscp-certification-badge-orange-hexagona-0467659f-20251209154250.jpg'
    },
    { 
      name: 'CEH - Certified Ethical Hacker',
      logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769527976036.png?width=1024&quality=100'
    },
  { 
    name: 'ISO 27001 Lead Implementer',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/iso-27001-lead-implementer-formation-1764249728549.png?width=8000&height=8000&resize=contain'
  },
  { 
    name: 'ISO 27001 Lead Auditor',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/images-1764249748417.jpg?width=8000&height=8000&resize=contain'
  },
  { 
    name: 'SecNum Académie ANSSI',
    logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/images-1764249836825.png?width=8000&height=8000&resize=contain'
  },
];

export function CertificationsGlass() {
  return (
    <section className="sm:py-24 pt-16 pb-16 relative z-10" style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)', fontFamily: 'Geist, sans-serif' }}>
      {/* Certifications Section */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            🎓 Auditeur Officiel
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Certifications et accréditations officielles pour garantir des audits de haute qualité
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-50 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-white border border-neutral-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-32 h-32 relative flex items-center justify-center bg-neutral-50 rounded-lg p-1">
                      <Image
                        src={cert.logo}
                        alt={cert.name}
                        width={128}
                        height={128}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm text-neutral-700 font-medium">{cert.name}</span>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}