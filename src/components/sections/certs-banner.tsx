'use client';

import Image from 'next/image';

const certs = [
  { src: '/afaq-iso27001-securite-trimmed.png', alt: 'AFAQ ISO 27001', label: 'AFAQ ISO 27001' },
  { src: '/afaq-protection-donnees.png',        alt: 'AFAQ RGPD',      label: 'AFAQ RGPD' },
  { src: '/afaq-hds.png',                       alt: 'AFAQ HDS',       label: 'AFAQ HDS' },
  { src: '/afaq-intelligence-artificielle.png', alt: 'ISO 42001',      label: 'ISO 42001 IA' },
  { src: '/oscp-badge.png',                     alt: 'OSCP',           label: 'OSCP' },
  { src: '/ceh-badge.png',                      alt: 'CEH',            label: 'CEH' },
  { src: '/pnpt-badge.png',                     alt: 'PNPT',           label: 'PNPT' },
  { src: '/iso27001-lead-auditor.png',          alt: 'Lead Auditor',   label: 'ISO 27001 Lead Auditor' },
  { src: '/iso27001-lead-implementer.png',      alt: 'Lead Implementer', label: 'Lead Implementer' },
  { src: '/ebios-badge.png',                    alt: 'EBIOS RM',       label: 'EBIOS RM' },
];

const CertItem = ({ src, alt, label }: { src: string; alt: string; label: string }) => (
  <div className="flex items-center gap-3 flex-shrink-0 px-6">
    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        width={48}
        height={48}
        className="object-contain w-full h-full opacity-75 hover:opacity-100 transition-opacity duration-200"
      />
    </div>
    <span className="text-slate-400 text-sm font-medium whitespace-nowrap">
      {label}
    </span>
  </div>
);

const PassiItem = () => (
  <div className="flex items-center gap-3 flex-shrink-0 px-6">
    <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center flex-shrink-0">
      <span className="text-amber-400 font-bold text-xs">PASSI</span>
    </div>
    <span className="text-amber-500/70 text-sm font-medium whitespace-nowrap">
      Qualification ANSSI <span className="text-amber-600/60 text-xs">(en cours)</span>
    </span>
  </div>
);

export const CertsBanner = () => (
  <div className="relative border-y border-slate-800/60 bg-[#020817] overflow-hidden py-4">
    {/* Heading */}
    <p className="text-center text-slate-400 text-xs uppercase tracking-[0.2em] font-semibold mb-3 px-4">
      Une expertise certifiée et reconnue en France
    </p>
    {/* Fade masks — fully opaque to prevent logos bleeding through */}
    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-48 z-10"
      style={{ background: 'linear-gradient(to right, #020817 60%, rgba(2,8,23,0))' }} />
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
      style={{ background: 'linear-gradient(to left, #020817 60%, rgba(2,8,23,0))' }} />

    {/* Scrolling track */}
    <div className="flex overflow-hidden">
      <div
        className="flex items-center"
        style={{
          animation: 'marquee 32s linear infinite',
          willChange: 'transform',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {certs.map(c => <CertItem key={c.alt} {...c} />)}
        <PassiItem />
        {/* Duplicate for seamless loop */}
        {certs.map(c => <CertItem key={c.alt + '-dup'} {...c} />)}
        <PassiItem />
      </div>
    </div>
  </div>
);
