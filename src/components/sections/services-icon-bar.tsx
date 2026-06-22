import Link from 'next/link';
import { Shield, Search, Lock, Building2, Award, GraduationCap } from 'lucide-react';

const services = [
  { icon: Search,       label: 'Pentest',        href: '/pentest-au-resultat' },
  { icon: Shield,       label: 'Audit',           href: '/audit-cybersecurite' },
  { icon: Lock,         label: 'RGPD',            href: '/mise-en-conformite-rgpd' },
  { icon: Building2,    label: 'Gouvernance',     href: '/grc-cyber' },
  { icon: Award,        label: 'ISO 27001',       href: '/iso27001-hds' },
  { icon: GraduationCap, label: 'Formation',      href: '/sensibilisation-formation' },
];

export const ServicesIconBar = () => (
  <div className="relative z-20 border-y border-slate-800/60 bg-slate-900/40 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-slate-800/60">
        {services.map(({ icon: Icon, label, href }) => (
          <Link key={label} href={href}
            className="group flex flex-col items-center gap-2 py-5 px-3 hover:bg-cyan-500/5 transition-colors duration-200">
            <Icon className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors duration-200" strokeWidth={1.5} />
            <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors duration-200 font-medium tracking-wide">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
