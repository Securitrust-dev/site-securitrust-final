"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ACCENT = '#74a2cd';
const ACCENT_RGB = '116,162,205';

const phases = [
  {
    id: 'kickoff',
    code: 'J0',
    label: 'Kick-off',
    title: 'Réunion de Lancement',
    objective: 'Cadrer la mission, aligner les équipes et valider les prérequis techniques.',
    barWidth: '28%',
    items: [
      { label: 'Présentation des équipes', desc: 'Introduction des consultants SecuriTrust et des référents techniques du client.' },
      { label: 'Validation du périmètre', desc: 'Confirmation des cibles, des plages horaires autorisées et des règles d\'engagement.' },
      { label: 'Accès & credentials', desc: 'Remise des accès réseau (VPN/VDI), comptes de test et documentation technique.' },
      { label: 'Mise en caution', desc: 'Mise en caution du montant de la prestation avant démarrage.' },
    ],
  },
  {
    id: 'phase1',
    code: 'J1',
    label: 'Phase 1',
    title: 'Reconnaissance & Analyse de Surface',
    objective: 'Identifier les vecteurs d\'entrée et les failles de configuration immédiates.',
    barWidth: '42%',
    items: [
      { label: 'Identification des services', desc: 'Cartographie des services critiques du SI (LDAP, SMB, DNS, RPC).' },
      { label: 'Audit de configuration', desc: 'Analyse des niveaux fonctionnels de la forêt, des domaines et des contrôleurs de domaine (DC).' },
      { label: 'Scanning de vulnérabilités', desc: 'Recherche de failles critiques connues (ex: Zerologon, NoPac).' },
    ],
  },
  {
    id: 'phase2',
    code: 'J2',
    label: 'Phase 2',
    title: 'Compromission d\'Identité & Élévation',
    objective: 'Évaluer la résilience de la gestion des identités face aux attaques modernes.',
    barWidth: '78%',
    active: true,
    items: [
      { label: 'Attaques Kerberos', desc: 'Tests ciblés (AS-REP Roasting, Kerberoasting) pour compromettre des comptes.' },
      { label: 'Élévation de privilèges', desc: 'Passage d\'un utilisateur sans privilège à administrateur local ou de domaine.' },
    ],
  },
  {
    id: 'phase3',
    code: 'J3',
    label: 'Phase 3',
    title: 'Mouvement Latéral & Pivotement',
    objective: 'Simuler la progression d\'un attaquant à travers le réseau LAN/WIFI.',
    barWidth: '55%',
    items: [
      { label: 'Techniques de rebond', desc: 'Utilisation du Pivoting pour accéder à des segments réseau isolés.' },
      { label: 'Rejet d\'authentification', desc: 'Exploitation des hashs via Pass-the-Hash ou Overpass-the-Hash.' },
    ],
  },
  {
    id: 'phase4',
    code: 'J4',
    label: 'Phase 4',
    title: 'Persistance, Exfiltration & Analyse',
    objective: 'Mesurer l\'impact réel d\'une intrusion et la capacité de maintien dans le temps.',
    barWidth: '68%',
    items: [
      { label: 'Persistance', desc: 'Mécanismes pour conserver l\'accès malgré les redémarrages ou changements de mots de passe.' },
      { label: 'Extraction de données', desc: 'Simulation d\'exfiltration et récupération des secrets de l\'annuaire (NTDS.dit).' },
      { label: 'Audit des GPO', desc: 'Analyse finale des objets de stratégie de groupe et de la gestion des objets AD.' },
    ],
  },
  {
    id: 'phase5',
    code: 'J5',
    label: 'Phase 5',
    title: 'Restitution & Accompagnement',
    objective: 'Transformer les vulnérabilités techniques en un plan d\'action stratégique.',
    barWidth: '96%',
    items: [
      { label: 'Rapport Technique', desc: 'Détail complet des vecteurs d\'attaque et des preuves de concept (PoC).' },
      { label: 'Synthèse Managériale', desc: 'Résumé des risques majeurs et de l\'impact métier pour la direction.' },
      { label: 'Roadmap de Remédiation', desc: 'Liste priorisée de recommandations et mesures de durcissement (Hardening).' },
    ],
  },
];

export function PropositionMethodology() {
  const [activePhase, setActivePhase] = useState<string | null>('kickoff');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="methodologie"
      className="relative overflow-hidden py-20 px-6"
      style={{
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        fontFamily: 'inherit',
        backgroundImage: `radial-gradient(rgba(${ACCENT_RGB}, 0.07) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: '32px 32px, 16px 16px',
        backgroundPosition: '0 0, 8px 8px',
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '80vw', height: '80vw',
          background: `rgba(${ACCENT_RGB}, 0.025)`,
          filter: 'blur(160px)',
          borderRadius: '50%',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">

        {/* ── Header: two blocks side by side ── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">

          {/* LEFT block — title + boîte grise */}
          <div className="flex-1 flex flex-col justify-between gap-6">
            <h2 className="font-light text-4xl md:text-5xl leading-[0.95] tracking-tight text-white">
              Méthodologie d'audit<br />
              <span className="font-bold" style={{ color: ACCENT }}>Active Directory</span>
            </h2>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-3">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1772466686849.png?width=8000&height=8000&resize=contain"
                  alt="Boîte grise"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Intrusion en boite grise :</p>
                  <p className="text-white text-sm mt-0.5 leading-snug">L'attaquant dispose d'informations privilégiées (ex : compte utilisateurs ou administrateurs, etc.)</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT block — metric card */}
          <div
            className="flex-1 rounded-3xl border p-7 flex flex-col justify-between"
            style={{
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div className="mb-5">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-1764601146487.png?width=8000&height=8000&resize=contain"
                alt="SecuriTrust Logo"
                width={200}
                height={42}
                className="h-8 w-auto"
              />
            </div>
            <div className="w-full h-px mb-5" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div className="flex justify-between items-end mb-5">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                Durée totale de la mission
              </div>
              <div className="text-3xl font-light" style={{ color: ACCENT }}>5 jours</div>
            </div>
            <div className="w-full h-px mb-5" style={{ background: 'rgba(255,255,255,0.05)' }} />
            <p className="text-sm leading-relaxed text-white">
              Une simulation réaliste d'attaque interne qui expose les chemins d'escalade
              invisibles à l'œil nu — de l'utilisateur standard à l'administrateur de domaine.
            </p>
          </div>

        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT — timeline bars */}
          <div className="lg:col-span-5 flex flex-col justify-start">

            {/* Instructions */}
            <div className="mb-4 flex items-center gap-2">
              <iconify-icon icon="solar:mouse-circle-bold" className="text-[#74a2cd] animate-bounce" width="16"></iconify-icon>
              <span className="text-[11px] font-bold text-[#74a2cd] uppercase tracking-[0.2em]">Cliquez sur le Jour de votre choix</span>
            </div>

            {/* Bars */}
            <div className="relative">
              <div
                className="absolute left-[22%] top-0 bottom-0 w-px hidden md:block"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              />
              <div className="space-y-5">
                {phases.map((phase, idx) => (
                  <div
                    key={phase.id}
                    className="group flex items-center cursor-pointer"
                    style={{ opacity: activePhase === null || activePhase === phase.id ? 1 : 0.35, transition: 'opacity 0.3s ease' }}
                    onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                  >
                    {/* Label */}
                    <div className="w-[22%] text-right pr-7 shrink-0">
                      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white">
                        {phase.code} {phase.label}
                      </span>
                    </div>
                    {/* Bar */}
                    <div className="flex-1 relative h-12 flex items-center">
                      <div
                        className="h-12 rounded-full relative"
                        style={{
                          width: visible ? phase.barWidth : '0%',
                          background: activePhase === phase.id
                            ? `linear-gradient(90deg, rgba(${ACCENT_RGB},0.3) 0%, rgba(${ACCENT_RGB},0.9) 100%)`
                            : phase.active
                              ? `linear-gradient(90deg, rgba(${ACCENT_RGB},0.15) 0%, rgba(${ACCENT_RGB},0.6) 100%)`
                              : `linear-gradient(90deg, rgba(${ACCENT_RGB},0.01) 0%, ${ACCENT} 100%)`,
                          borderRadius: '99px',
                          transition: `width 1.1s cubic-bezier(0.215,0.61,0.355,1) ${idx * 0.1}s`,
                          backdropFilter: 'blur(4px)',
                          boxShadow: activePhase === phase.id ? `0 0 32px rgba(${ACCENT_RGB},0.5)` : phase.active ? `0 0 32px rgba(${ACCENT_RGB},0.3)` : undefined,
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%', right: 0,
                            width: '80%', height: '140%',
                            background: 'inherit',
                            transform: 'translateY(-50%)',
                            filter: 'blur(20px)',
                            opacity: 0.35,
                            borderRadius: '99px',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — detail panel */}
          <div className="lg:col-span-7 flex flex-col justify-start">
              {activePhase ? (() => {
                const p = phases.find(ph => ph.id === activePhase)!;
                return (
                  <div
                    className="rounded-2xl border p-5"
                    style={{
                      background: '#121212',
                      borderColor: `rgba(${ACCENT_RGB},0.2)`,
                      boxShadow: `0 0 30px rgba(${ACCENT_RGB},0.05)`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm border shrink-0"
                        style={{
                          background: `rgba(${ACCENT_RGB},0.1)`,
                          borderColor: `rgba(${ACCENT_RGB},0.25)`,
                          color: ACCENT,
                        }}
                      >
                        {p.code}
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: ACCENT }}>
                          {p.label}
                        </div>
                        <h3 className="font-bold text-sm leading-tight text-white">{p.title}</h3>
                      </div>
                      <div className="ml-auto">
                        <p className="text-sm leading-relaxed text-right max-w-xs text-white">
                          {p.objective}
                        </p>
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4 border-t"
                      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                      {p.items.map(item => (
                        <div
                          key={item.label}
                          className="flex gap-3 rounded-xl border p-3"
                          style={{ background: '#0a0a0a', borderColor: 'rgba(255,255,255,0.08)' }}
                        >
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{
                              background: `rgba(${ACCENT_RGB},0.1)`,
                              border: `1px solid rgba(${ACCENT_RGB},0.25)`,
                            }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold mb-0.5 text-white">{item.label}</div>
                            <div className="text-sm leading-relaxed text-white">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })() : (
                <div className="flex flex-col items-center justify-center h-full gap-4 opacity-30">
                  <iconify-icon icon="solar:mouse-circle-bold" className="text-[#74a2cd]" width="48"></iconify-icon>
                  <p className="text-white text-sm uppercase tracking-widest">Sélectionnez une phase</p>
                </div>
              )}
            </div>

          </div>
      </div>
    </section>
  );
}
