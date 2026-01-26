'use client';

import {
  Shield,
  ShieldCheck,
  FileLock,
  Building2,
  Award,
  GraduationCap,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export const ServicesSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'RSSI Externalisé',
      description:
        'Pilotage stratégique et opérationnel de la sécurité, avec un expert dédié selon un format flexible ou entièrement externalisé.',
      href: '/rssi-externalise',
    },
    {
      icon: ShieldCheck,
      title: 'Audits & Pentests',
      description:
        'Évaluation approfondie de vos environnements IT, tests d\'intrusion réalistes et analyses détaillées des vulnérabilités.',
      href: '/services',
    },
    {
      icon: FileLock,
      title: 'Conformité RGPD',
      description:
        'Accompagnement global pour structurer votre conformité et sécuriser vos traitements avec la prise en charge par un DPO externalisé.',
      href: '/mise-en-conformite-rgpd',
    },
    {
      icon: Building2,
      title: 'Gouvernance SSI',
      description:
        'Conception et implémentation de politiques de sécurité adaptées à vos enjeux métier et à vos exigences réglementaires.',
      href: '/grc-cyber',
    },
    {
      icon: Award,
      title: 'ISO 27001 & 27701',
      description:
        'Préparation complète à la conformité et à la certification de vos systèmes de management de la sécurité et de la confidentialité.',
      href: '/iso27001-hds',
    },
    {
      icon: GraduationCap,
      title: 'Formations Cyber',
      description:
        'Sensibilisation, entraînement et montée en compétence des équipes face aux menaces opérationnelles.',
      href: '/sensibilisation-formation',
    },
  ];

  const ServiceCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Link href={feature.href}>
        <div
          className="service-card p-6 glass-panel rounded-lg transition-all group border border-white/5 relative overflow-hidden cursor-pointer"
          style={{
            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#38bdf8]/0 via-[#38bdf8]/0 to-[#0ea5e9]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
          
            <div className="relative z-10">
              <div className="w-20 h-20 rounded bg-slate-900 border border-white/10 flex items-center justify-center mb-6 text-slate-300 group-hover:text-[#38bdf8] group-hover:border-[#38bdf8]/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg] group-hover:shadow-lg group-hover:shadow-cyan-500/50">
                <feature.icon className="w-11 h-11" strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4 group-hover:text-[#38bdf8] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-xl text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>

          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-700 ease-out"></div>
        </div>
      </Link>
    );
  };

  return (
    <section className="py-24 relative bg-[#02040a]" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:flex justify-between items-end">
          <div className="max-w-xl">
            <h2 className="text-3xl font-medium text-white tracking-tight mb-4">
              Nos Services de Cybersécurité
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Un accompagnement complet pour structurer, renforcer et superviser
              la sécurité de votre système d&apos;information. Plus de 15 ans
              d&apos;expérience au service des organisations.
            </p>
          </div>
            <a
              href="#contact"
              className="hidden md:flex items-center gap-3 px-8 py-4 text-sm font-bold text-white bg-[#0ea5e9] hover:bg-[#38bdf8] rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] uppercase tracking-widest mt-4 md:mt-0 group"
            >
              Demander un devis
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <ServiceCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
