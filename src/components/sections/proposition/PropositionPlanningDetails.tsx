'use client';

import React from 'react';

const PLANNING_DATA = [
  {
    timing: "0,5 jour",
    phase: "J0 : Kick-off",
    detail: "Réunion de lancement, définition du périmètre et accès.",
    icon: "solar:flag-2-bold",
    color: "text-purple-400"
  },
  {
    timing: "0,5 jour",
    phase: "J1 : Reconnaissance",
    detail: "Identification services (LDAP, SMB, DNS), tests Zerologon/NoPac.",
    icon: "solar:magnifer-bold",
    color: "text-blue-400"
  },
  {
    timing: "0,5 jour",
    phase: "J2 : Élévation (PrivEsc)",
    detail: "Escalade de privilèges locaux et tests sur l'identité Kerberos.",
    icon: "solar:shield-up-bold",
    color: "text-orange-400"
  },
  {
    timing: "1 jour",
    phase: "J3 : Mouvement Latéral",
    detail: "Pivoting, Pass-the-Hash, Overpass-the-Hash.",
    icon: "solar:transfer-horizontal-bold",
    color: "text-amber-400"
  },
  {
    timing: "1 jour",
    phase: "J4 : Persistance",
    detail: "Extraction de données, maintien de l'accès et analyse des résultats.",
    icon: "solar:database-bold",
    color: "text-red-400"
  },
  {
    timing: "1 jour",
    phase: "J5 : Reporting",
    detail: "Rédaction (synthèse managériale, roadmap technique).",
    icon: "solar:document-text-bold",
    color: "text-emerald-400"
  },
  {
    timing: "0,5 jour",
    phase: "Clôture : Restitution",
    detail: "Présentation orale des résultats et préconisations de sécurité.",
    icon: "solar:presentation-graph-bold",
    color: "text-cyan-400"
  }
];

export function PropositionPlanningDetails() {
  return (
    <section id="planning-detaille" className="pt-16 pb-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header - Compact */}
        <div className="mb-10 reveal text-center">
            <h2 className="font-sans text-3xl md:text-5xl font-black tracking-tighter text-white mb-2 uppercase">
              Proposition <span className="text-[#74a2cd]">financière</span>
            </h2>
            <p className="text-white text-sm md:text-base tracking-widest uppercase opacity-70">
              Calendrier détaillé • en charge jour homme
            </p>
        </div>

        {/* Table - Enhanced Visibility */}
        <div className="reveal overflow-hidden rounded-2xl border border-white/10 bg-[#121212]/50 shadow-2xl backdrop-blur-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-xs md:text-sm font-bold text-white uppercase tracking-[0.2em]">
                <th className="px-6 py-5 text-left w-64">Étape</th>
                <th className="px-6 py-5 text-left">Détail des actions</th>
                <th className="px-6 py-5 text-right w-32">Charge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {PLANNING_DATA.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <iconify-icon icon={item.icon} className={`${item.color}`} width="24"></iconify-icon>
                      <span className="text-sm md:text-base font-bold text-white group-hover:text-[#74a2cd] transition-colors">
                        {item.phase}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm md:text-base text-white/90 leading-relaxed group-hover:text-white transition-colors">
                      {item.detail}
                    </p>
                  </td>
                  <td className="px-6 py-6 text-right whitespace-nowrap">
                    <span className="text-sm md:text-base font-mono font-bold text-[#74a2cd]">
                      {item.timing}
                    </span>
                  </td>
                </tr>
              ))}
                <tr className="bg-white/5 border-t border-white/10">
                  <td colSpan={3} className="px-6 py-8">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm md:text-base font-bold text-white uppercase tracking-widest">Total Prestation HT :</span>
                      <span className="text-2xl md:text-3xl font-black text-white bg-white/5 px-6 py-2 rounded-lg border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">4 990 €</span>
                    </div>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
