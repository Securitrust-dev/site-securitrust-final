'use client';

import { Shield, FileCheck, Users, Target, TrendingUp, Lock } from 'lucide-react';
import Link from 'next/link';

export const IntegrationsSection = () => {
  const services = [
    { 
      name: 'Audit de cybersécurité', 
      icon: Shield,
      href: '/audit-cybersecurite',
      description: 'Évaluation complète de votre posture de sécurité'
    },
    { 
      name: 'Conformité RGPD', 
      icon: FileCheck,
      href: '/mise-en-conformite-rgpd',
      description: 'Accompagnement pour la mise en conformité'
    },
    { 
      name: 'RSSI externalisé', 
      icon: Users,
      href: '/rssi-externalise',
      description: 'Un RSSI expérimenté à temps partagé'
    },
    { 
      name: 'Tests d\'intrusion', 
      icon: Target,
      href: '/services',
      description: 'Simulations d\'attaques réelles'
    },
    { 
      name: 'GRC Cyber', 
      icon: TrendingUp,
      href: '/grc-cyber',
      description: 'Gouvernance, risques et conformité'
    },
    { 
      name: 'Protection Ransomware', 
      icon: Lock,
      href: '/protection-ransomware',
      description: 'Défense avancée contre les ransomwares'
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 bg-black border-t border-white/5">
      <div className="max-w-[1400px] mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6">
            Nos Services
          </h2>
          <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            Une expertise complète en cybersécurité pour protéger votre entreprise contre les menaces numériques.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="flex flex-col items-center justify-start p-6 sm:p-7 lg:p-8 glass-panel rounded-lg border border-white/5 hover:border-cyan-500/30 transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-4 sm:mb-5 lg:mb-6 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-cyan-400" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-medium text-white text-center mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors leading-tight">
                  {service.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 text-center opacity-0 group-hover:opacity-100 transition-opacity leading-tight">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};