import { Search, Users, ShieldCheck, Award } from 'lucide-react';

const metrics = [
  {
    icon: Search,
    value: '+86',
    label: 'Pentests réalisés',
    sub: 'au résultat garanti',
  },
  {
    icon: ShieldCheck,
    value: '97%',
    label: 'Vulnérabilités critiques',
    sub: 'détectées et rapportées',
  },
  {
    icon: Award,
    value: '+105',
    label: 'Conformités ISO 27001',
    sub: 'obtenues ou maintenues',
  },
  {
    icon: Users,
    value: '+100',
    label: 'Entreprises sécurisées',
    sub: 'depuis 15 ans d\'activité',
  },
];

export const MetricsSection = () => (
  <section className="relative z-30 border-y border-slate-800/60 bg-slate-900/30">
    {/* Section number */}
    <div className="pointer-events-none absolute top-2 left-8 text-[8rem] font-black text-white/[0.025] leading-none select-none"
      style={{ fontFamily: "'Sora', sans-serif" }}>01</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {metrics.map(({ icon: Icon, value, label, sub }) => (
          <div key={label} className="flex flex-col items-center text-center group">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/15 transition-colors">
              <Icon className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 leading-none mb-2 tabular-nums"
              style={{ fontFamily: "'Sora', sans-serif" }}>
              {value}
            </p>
            <p className="text-sm text-white font-medium mb-0.5">{label}</p>
            <p className="text-xs text-slate-500">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
