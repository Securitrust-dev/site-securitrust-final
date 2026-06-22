'use client';

import React, { useState } from 'react';

interface Props { companyName?: string; }

const DAYS = [
  {
    day: 1,
    label: "Jour 1",
    phase: "Lancement",
    title: "Reconnaissance & Vulnérabilités",
    activities: [
      "Identification services AD (LDAP, SMB, DNS, RPC)",
      "Tests Zerologon, NoPac, PrintNightmare",
      "Outils : Nmap, BloodHound, CrackMapExec",
    ],
  },
  {
    day: 2,
    label: "Jour 2",
    phase: "Tests",
    title: "Élévation de Privilèges",
    activities: [
      "Escalade privilèges locaux et domaine",
      "AS-REP Roasting, Kerberoasting",
      "Silver / Golden Tickets",
    ],
  },
  {
    day: 3,
    label: "Jour 3",
    phase: "Tests",
    title: "Mouvement Latéral",
    activities: [
      "Lateral Movement & Pivoting",
      "Pass-the-Hash / Overpass-the-Hash",
      "Atteindre DC ou serveurs critiques",
    ],
  },
  {
    day: 4,
    label: "Jour 4",
    phase: "Tests",
    title: "Persistance & Exfiltration",
    activities: [
      "Shadow Credentials, comptes masqués",
      "Extraction NTDS.dit",
      "Corrélation des vecteurs d'attaque",
    ],
  },
  {
    day: 5,
    label: "Jour 5",
    phase: "Livraison",
    title: "Reporting & Remédiation",
    activities: [
      "Rapport technique détaillé",
      "Synthèse managériale",
      "Roadmap remédiation & hardening",
    ],
  },
];

// 7 rows : Kick-off(col0) + J1→J5 + Reporting(col6)
// The gantt header shows 7 columns: J0, J1, J2, J3, J4, J5, Reporting
const ganttRows = [
  { name: "KICK-OFF",   start: 1, duration: 1, color: "from-purple-600 to-purple-800" },
  { name: "J1  PHASE 1", start: 2, duration: 1, color: "from-[#74a2cd] to-[#5a8ab5]" },
  { name: "J2  PHASE 2", start: 3, duration: 1, color: "from-[#74a2cd] to-[#5a8ab5]" },
  { name: "J3  PHASE 3", start: 4, duration: 1, color: "from-[#74a2cd] to-[#5a8ab5]" },
  { name: "J4  PHASE 4", start: 5, duration: 1, color: "from-[#74a2cd] to-[#5a8ab5]" },
  { name: "J5  PHASE 5", start: 6, duration: 1, color: "from-[#74a2cd] to-[#5a8ab5]" },
  { name: "REPORTING",   start: 7, duration: 1, color: "from-purple-600 to-purple-800" },
];

export function PropositionExecutionWorkflow({ companyName }: Props) {
  const [selectedDay, setSelectedDay] = useState<number>(1);

  return (
      <section id="calendrier" className="pt-20 md:pt-28 pb-10 bg-[#030303] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="mb-12 reveal text-center">
          <div className="inline-flex items-center gap-2 bg-[#0d1a2e] border border-[#1e2d4a] rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></span>
            <span className="font-mono text-[11px] text-[#10b981] uppercase tracking-widest">Planning de mission</span>
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-white leading-none mb-6">
            Calendrier <span className="text-[#74a2cd]">Estimé</span>
          </h2>
          <div className="inline-flex items-center gap-3 bg-[#0d1a2e] border border-[#1e2d4a] rounded-full px-8 py-3">
            <span className="text-3xl font-bold text-white">5 Jours</span>
            <span className="text-white text-sm">ouvrés — prestation complète</span>
          </div>
        </div>



          {/* Phase cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10 reveal">
            {/* Étape 1 — Kick-off */}
            <div className="bg-purple-950/30 border border-purple-500/50 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest">Étape 1</span>
                  <span className="text-[10px] font-semibold bg-purple-500/20 text-white rounded-full px-2 py-0.5">Lancement</span>
              </div>
              <div className="font-bold text-white text-sm">Kick-off</div>
              <ul className="flex flex-col gap-1.5">
                {["Réunion de cadrage","Accès & credentials","Définition du périmètre"].map((a,i)=>(
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-white leading-snug">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"/>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            {/* Jour 1 */}
            <div className="bg-[#0d1a2e] border border-[#1e2d4a] rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white uppercase tracking-widest">Jour 1</span>
                  <span className="text-[10px] font-semibold bg-[#74a2cd]/20 text-white rounded-full px-2 py-0.5">Phase 1</span>
                </div>
              <div className="font-bold text-white text-sm">Reconnaissance & Vulnérabilités</div>
              <ul className="flex flex-col gap-1.5">
                {["Identification services AD","Tests Zerologon, NoPac","BloodHound, CrackMapExec"].map((a,i)=>(
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-white leading-snug">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#74a2cd] shrink-0"/>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            {/* Jour 2 */}
            <div className="bg-[#0d1a2e] border border-[#1e2d4a] rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-white uppercase tracking-widest">Jour 2</span>
                <span className="text-[10px] font-semibold bg-[#74a2cd]/20 text-white rounded-full px-2 py-0.5">Phase 2</span>
              </div>
              <div className="font-bold text-white text-sm">Élévation de Privilèges</div>
              <ul className="flex flex-col gap-1.5">
                {["Escalade privilèges domaine","AS-REP Roasting, Kerberoasting","Silver / Golden Tickets"].map((a,i)=>(
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-white leading-snug">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#74a2cd] shrink-0"/>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            {/* Jour 3 */}
            <div className="bg-[#0d1a2e] border border-[#1e2d4a] rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-white uppercase tracking-widest">Jour 3</span>
                <span className="text-[10px] font-semibold bg-[#74a2cd]/20 text-white rounded-full px-2 py-0.5">Phase 3</span>
              </div>
              <div className="font-bold text-white text-sm">Mouvement Latéral</div>
              <ul className="flex flex-col gap-1.5">
                {["Lateral Movement & Pivoting","Pass-the-Hash / OtH","Atteindre DC ou serveurs critiques"].map((a,i)=>(
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-white leading-snug">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#74a2cd] shrink-0"/>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            {/* Jour 4 */}
            <div className="bg-[#0d1a2e] border border-[#1e2d4a] rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-white uppercase tracking-widest">Jour 4</span>
                <span className="text-[10px] font-semibold bg-[#74a2cd]/20 text-white rounded-full px-2 py-0.5">Phase 4</span>
              </div>
              <div className="font-bold text-white text-sm">Persistance & Exfiltration</div>
              <ul className="flex flex-col gap-1.5">
                {["Shadow Credentials","Extraction NTDS.dit","Corrélation des vecteurs"].map((a,i)=>(
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-white leading-snug">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#74a2cd] shrink-0"/>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            {/* Jour 5 */}
            <div className="bg-[#0d1a2e] border border-[#1e2d4a] rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-white uppercase tracking-widest">Jour 5</span>
                <span className="text-[10px] font-semibold bg-[#10b981]/20 text-white rounded-full px-2 py-0.5">Phase 5</span>
              </div>
              <div className="font-bold text-white text-sm">Reporting & Remédiation</div>
              <ul className="flex flex-col gap-1.5">
                {["Rapport technique détaillé","Synthèse managériale","Roadmap remédiation"].map((a,i)=>(
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-white leading-snug">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0"/>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            {/* Étape 5 — Reporting final */}
            <div className="bg-purple-950/30 border border-purple-500/50 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-white uppercase tracking-widest">Étape 5</span>
                <span className="text-[10px] font-semibold bg-purple-500/20 text-white rounded-full px-2 py-0.5">Livraison</span>
              </div>
              <div className="font-bold text-white text-sm">Reporting</div>
              <ul className="flex flex-col gap-1.5">
                {["Remise du rapport final","Présentation des résultats","Plan de remédiation priorisé"].map((a,i)=>(
                  <li key={i} className="flex items-start gap-1.5 text-[11px] text-white leading-snug">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"/>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>


          <div className="reveal bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-visible relative">

          {/* Header — 7 colonnes */}
          <div className="grid border-b border-[#1e1e1e]" style={{ gridTemplateColumns: '160px repeat(7, 1fr)' }}>
            <div className="px-6 py-4 text-xs font-bold text-white uppercase tracking-widest">Activité</div>
            {["Kick-off","J1","J2","J3","J4","J5","Reporting"].map((label, i) => (
              <div key={i} className="px-4 py-4 text-xs font-bold text-white text-center">
                <div>{label}</div>
              </div>
            ))}
          </div>
          {ganttRows.map((row, idx) => (
            <div
              key={idx}
              className="grid border-b border-[#1a1a1a] last:border-b-0 items-center hover:bg-white/[0.02] transition-colors"
              style={{ gridTemplateColumns: '160px repeat(7, 1fr)' }}
            >
              <div className="px-6 py-4 flex items-center gap-2 text-white/70">
                <span className="text-xs font-bold font-mono tracking-widest uppercase whitespace-nowrap">{row.name}</span>
              </div>
              {Array.from({ length: 7 }, (_, dayIdx) => {
                const col = dayIdx + 1;
                const active = col >= row.start && col < row.start + row.duration;
                const isSpecial = row.name === "KICK-OFF" || row.name === "REPORTING";
                return (
                  <div key={dayIdx} className="px-2 py-4 flex items-center justify-center">
                    {active && (
                        isSpecial ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                            <polygon points="8,1 15,15 1,15" fill="#a855f7"/>
                          </svg>
                        ) : (
                          <div className={`h-10 w-full rounded-full bg-gradient-to-r ${row.color} shadow-[0_0_8px_rgba(116,162,205,0.4)] flex items-center justify-end pr-2`}>
                            <span className="w-5 h-5 rounded-full bg-[#0a0a0a] border border-white/10 shrink-0" />
                          </div>
                        )
                      )}
                  </div>
                );
              })}
            </div>
          ))}
          </div>

          {/* ── 4 étapes process ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 reveal">
          {[
              {
                num: "1",
                icon: "solar:document-add-bold",
                title: "Signature du contrat",
                  desc: "L'accord de service est soumis pour validation et signature.",
                sub: null,
              },
              {
                num: "2",
                icon: "solar:users-group-rounded-bold",
                title: "Réunion de lancement",
                  desc: "Une réunion est organisée avec les équipes pour cadrer les objectifs et le périmètre.",
                sub: "Mise en caution du montant de la prestation",
              },
              {
                num: "3",
                icon: "solar:magnifer-bold",
                title: "Évaluation",
                  desc: "L'ensemble des tests de sécurité est réalisé sur l'infrastructure.",
                sub: null,
              },
              {
                num: "4",
                icon: "solar:target-bold",
                title: "Restitution",
                  desc: "Le rapport détaillé est remis avec les recommandations de remédiation.",
                sub: null,
              },
          ].map((step, i) => (
            <div key={i} className="bg-[#0d1a2e] border border-white/[0.08] rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-[#74a2cd]/40 transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#1a2a3e] border border-[#74a2cd]/20 flex items-center justify-center">
                <iconify-icon icon={step.icon} className="text-[#74a2cd]" width="26"></iconify-icon>
              </div>
              <div className="text-3xl font-black text-[#74a2cd]">{step.num}</div>
              <div className="font-bold text-white text-sm uppercase tracking-wide">{step.title}</div>
              <div className="text-xs text-white leading-relaxed">{step.desc}</div>
              {step.sub && (
                <div className="text-xs text-[#74a2cd]/80 italic leading-relaxed border-t border-white/10 pt-2 w-full">{step.sub}</div>
              )}
            </div>
          ))}
          </div>

        </div>
      </section>
    );
}
