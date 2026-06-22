'use client';

import React from 'react';

const bentoItems = [
  {
    col: "lg:col-span-1",
    icon: "solar:server-bold",
    tag: "PÉRIMÈTRE PRINCIPAL",
    title: "Infrastructure Active Directory",
    desc: "Contrôleurs de domaine, serveurs membres, architecture AD complète et relations d'approbation inter-domaines.",
    accent: true,
  },
  {
    col: "lg:col-span-1",
    icon: "solar:users-group-rounded-bold",
    tag: "COMPTES & DROITS",
    title: "Comptes utilisateurs & groupes",
    desc: "Permissions, élévation de privilèges, comptes à hauts droits et délégations.",
      accent: true,
    },
    {
      col: "lg:col-span-1",
      icon: "solar:routing-bold",
      tag: "RÉSEAU INTERNE",
      title: "Flux réseau & segmentation",
      desc: "Segmentation VLAN, accès latéraux, rebonds internes, connexion VPN/VDI ou accès physique.",
      accent: true,
    },
    {
      col: "lg:col-span-1",
      icon: "solar:settings-bold",
      tag: "POLITIQUES",
      title: "GPO & politiques de groupe",
      desc: "Configurations de sécurité, scripts de démarrage, délégations GPO et hardening appliqué.",
      accent: true,
  },
  {
    col: "lg:col-span-2",
    icon: "solar:shield-warning-bold",
    tag: "MÉTHODOLOGIE",
    title: "Boîte Grise — PTES / MITRE ATT&CK / OWASP",
    desc: "Simulation depuis un poste utilisateur authentifié (domaine standard). Chaînes d'attaque réalistes : Kerberoasting, Pass-the-Hash, DCSync, escalade vers Domain Admin.",
    accent: true,
  },
];

const refBadges = [
  { label: "PTES", color: "bg-[#74a2cd]/15 text-[#74a2cd] border-[#74a2cd]/30" },
  { label: "MITRE ATT&CK", color: "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30" },
  { label: "OWASP", color: "bg-purple-500/15 text-purple-300 border-purple-500/30" },
  { label: "CVSS 3.1", color: "bg-orange-500/15 text-orange-300 border-orange-500/30" },
];

export function PropositionMap() {
  return (
    <section id="network" className="py-20 md:py-28 bg-[#030303] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Header */}
        <div className="mb-12 reveal">
          <div className="inline-flex items-center gap-2 bg-[#0d1a2e] border border-[#1e2d4a] rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-[#74a2cd] rounded-full animate-pulse"></span>
            <span className="font-mono text-[11px] text-[#74a2cd] uppercase tracking-widest">Solution sur-mesure</span>
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-white leading-none mb-4">
            Périmètre <span className="text-[#74a2cd]">Technique</span>
          </h2>
          <p className="text-white text-base max-w-2xl">
            Audit complet de votre Active Directory en mode boîte grise — les mêmes vecteurs qu'un attaquant interne.
          </p>
          {/* Référentiels */}
          <div className="flex flex-wrap gap-2 mt-5">
            {refBadges.map((b) => (
              <span key={b.label} className={`text-xs font-bold px-3 py-1 rounded-full border ${b.color}`}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
          {bentoItems.map((item, i) => (
            <div
              key={i}
              className={`bento-card ${item.col} rounded-2xl border p-7 flex flex-col gap-4
                ${item.accent
                  ? 'bg-gradient-to-br from-[#0d2540] to-[#061525] border-[#74a2cd]/35 shadow-[0_0_40px_rgba(116,162,205,0.12)]'
                  : 'bg-[#0a0a0a] border-white/8'
                }`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                  ${item.accent ? 'bg-[#74a2cd]/20 border border-[#74a2cd]/30' : 'bg-white/5 border border-white/10'}`}>
                  <iconify-icon icon={item.icon} className={item.accent ? 'text-[#74a2cd]' : 'text-white/70'} width="24"></iconify-icon>
                </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white mt-1">{item.tag}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-white text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
