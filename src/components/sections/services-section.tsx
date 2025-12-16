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

  const handleQuoteClick = () => {
    window.open('https://devis-expert-securitrust-simulation.vercel.app/', '_blank', 'noopener,noreferrer');
  };

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
            <div className="w-10 h-10 rounded bg-slate-900 border border-white/10 flex items-center justify-center mb-5 text-slate-300 group-hover:text-[#38bdf8] group-hover:border-[#38bdf8]/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg] group-hover:shadow-lg group-hover:shadow-cyan-500/50">
              <feature.icon className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-medium text-slate-100 mb-2 group-hover:text-white transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-xs text-slate-500 leading-6 group-hover:text-slate-400 transition-colors duration-300">
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
            className="hidden md:flex items-center gap-2 text-xs font-mono text-[#38bdf8] hover:text-[#0ea5e9] mt-4 md:mt-0"
          >
            Demander un devis
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
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

        <div className="mt-16 flex flex-col items-center justify-center text-center space-y-6 p-12 glass-panel rounded-2xl border-cyan-500/20">
          <h3 className="text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Prêt à renforcer votre cybersécurité ?
          </h3>
          <p className="text-slate-400 text-base max-w-2xl">
            Profitez d'un audit de sécurité gratuit et découvrez comment nous pouvons transformer la cybersécurité en avantage concurrentiel pour votre entreprise.
          </p>
          <div className="pt-4">
            <button
              onClick={handleQuoteClick}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm tracking-wider uppercase rounded transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Mon devis sur mesure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};