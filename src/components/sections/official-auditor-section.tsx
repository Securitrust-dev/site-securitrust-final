import Image from 'next/image';

type Cert = { src: string; alt: string; label: string; desc: string };

const certs: Cert[] = [
  { src: '/afaq-iso27001-securite-trimmed.png', alt: 'AFAQ ISO 27001',  label: 'AFAQ ISO 27001',   desc: "Auditeur officiel AFNOR — Sécurité de l'information" },
  { src: '/afaq-protection-donnees.png',        alt: 'AFAQ RGPD',       label: 'AFAQ RGPD',        desc: 'Protection des données personnelles' },
  { src: '/afaq-hds.png',                       alt: 'AFAQ HDS',        label: 'AFAQ HDS',         desc: 'Hébergeur de Données de Santé' },
  { src: '/afaq-intelligence-artificielle.png', alt: 'AFAQ IA',         label: 'ISO 42001',        desc: 'Intelligence artificielle — AFNOR' },
  { src: '/oscp-badge.png',                     alt: 'OSCP',            label: 'OSCP',             desc: 'Offensive Security Certified Professional' },
  { src: '/ceh-badge.png',                      alt: 'CEH',             label: 'CEH',              desc: 'Certified Ethical Hacker — EC-Council' },
  { src: '/pnpt-badge.png',                     alt: 'PNPT',            label: 'PNPT',             desc: 'Practical Network Penetration Tester' },
  { src: '/iso27001-lead-auditor.png',          alt: 'Lead Auditor',    label: 'Lead Auditor',     desc: 'ISO 27001 — Bureau Veritas' },
  { src: '/iso27001-lead-implementer.png',      alt: 'Lead Implementer',label: 'Lead Implementer', desc: 'ISO 27001 — Bureau Veritas' },
  { src: '/ebios-badge.png',                    alt: 'EBIOS',           label: 'EBIOS RM',         desc: 'Risk Manager — ANSSI' },
];

export const OfficialAuditorSection = () => (
  <section className="relative py-24 bg-[#020817] overflow-hidden">
    {/* Section number filigree */}
    <div className="pointer-events-none absolute top-8 right-8 text-[9rem] font-black text-white/[0.025] leading-none select-none"
      style={{ fontFamily: "'Sora', sans-serif" }}>03</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <p className="text-cyan-500/70 text-xs uppercase tracking-widest font-semibold mb-3">Labels &amp; Certifications</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
          Une expertise certifiée,<br />reconnue en France
        </h2>
        <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
          Nos certifications couvrent l&apos;audit, le test d&apos;intrusion, la conformité réglementaire et la gouvernance de la sécurité.
        </p>
      </div>

      {/* Certs grid — dark native style */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-px bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-800/60">
        {certs.map(({ src, alt, label, desc }) => (
          <div key={label}
            className="group flex flex-col items-center gap-3 p-5 bg-[#020817] hover:bg-cyan-500/[0.04] transition-colors duration-200">
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src={src} alt={alt} width={48} height={48}
                className="object-contain w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="text-center">
              <p className="text-slate-200 text-xs font-semibold">{label}</p>
              <p className="text-slate-500 text-[10px] mt-0.5 leading-tight">{desc}</p>
            </div>
          </div>
        ))}

        {/* PASSI — en cours */}
        <div className="flex flex-col items-center gap-3 p-5 bg-[#020817]">
          <div className="w-12 h-12 flex items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
            <span className="text-amber-400 font-bold text-xs">PASSI</span>
          </div>
          <div className="text-center">
            <p className="text-amber-400 text-xs font-semibold">En cours</p>
            <p className="text-slate-600 text-[10px] mt-0.5">Qualification ANSSI</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
