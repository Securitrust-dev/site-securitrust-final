'use client';

import React, { useState } from 'react';

interface PropositionRequirementProps {
  companyName: string;
}

export function PropositionRequirement({ companyName }: PropositionRequirementProps) {
  const [context, setContext] = useState(
    `${companyName || 'Everaxis'} est un acteur international spécialisé dans les systèmes rotatifs de haute performance pour des secteurs stratégiques tels que l'aéronautique, le spatial, la défense, l'énergie et l'industrie.\n\nL'entreprise dispose de plusieurs sites en Europe dont le siège social Plessis-Robinson où se situe l'équipe IT.\n\nL'environnement technique repose sur des infrastructures locales (serveurs, réseaux, postes de travail), des solutions cloud (Microsoft 365), des environnements hybrides (Active Directory local et Entra ID) et des équipements réseau variés (Cisco, Fortinet, Huawei, ainsi que des composants industriels spécifiques).\n\nDans un contexte de renforcement des exigences cybersécurité au sein de la chaîne de sous-traitance du secteur aéronautique, ${companyName || 'Everaxis'} souhaite renforcer sa posture de sécurité pour répondre aux attentes de ses clients grands donneurs d'ordre. Il s'agit à la fois de démontrer sa capacité à protéger son patrimoine informationnel, de s'inscrire dans une trajectoire de conformité structurée (ISO 27001, exigences sectorielles, etc.), et de consolider la confiance avec ses partenaires industriels.`
  );

  const [objectives, setObjectives] = useState(
    `L'objectif des prestations vise à améliorer le niveau de cybersécurité de l'entreprise, et notamment :\n\n• Identifier les vulnérabilités du système d'information à travers des tests techniques et organisationnels ;\n• Évaluer les politiques, procédures et dispositifs de sécurité actuellement en place ;\n• Mesurer le niveau de conformité avec les normes et réglementations en vigueur (notamment ISO 27001, NIS2, recommandations de l'ANSSI et standards sectoriels applicables) ;\n• Formuler des recommandations concrètes, hiérarchisées et pragmatiques pour améliorer la posture de sécurité ;\n• Assurer une veille active sur les évolutions normatives et réglementaires applicables.`
  );

  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-16 reveal">
          <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.8]">
            Compréhension<br />
            <span className="text-[#00ffa3]">du besoin</span>
          </h2>
          <p className="mt-6 text-xl text-white/40 italic font-light tracking-wide">
            Contexte et objectifs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 reveal">
          {/* Contexte Box */}
          <div className="group">
            <div className="inline-block bg-[#00ffa3] text-[#030303] px-8 py-2 rounded-full font-bold text-sm uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(0,255,163,0.3)]">
              Contexte
            </div>
            <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 md:p-10 hover:border-[#00ffa3]/30 transition-all duration-500 shadow-2xl">
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full bg-transparent text-white/90 text-lg leading-relaxed italic border-none focus:ring-0 resize-none overflow-hidden min-h-[300px]"
                placeholder="Saisissez le contexte du client..."
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
            </div>
          </div>

          {/* Objectifs Box */}
          <div className="group">
            <div className="inline-block bg-[#00ffa3] text-[#030303] px-8 py-2 rounded-full font-bold text-sm uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(0,255,163,0.3)]">
              Objectifs
            </div>
            <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 md:p-10 hover:border-[#00ffa3]/30 transition-all duration-500 shadow-2xl">
              <textarea
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
                className="w-full bg-transparent text-white/90 text-lg leading-relaxed italic border-none focus:ring-0 resize-none overflow-hidden min-h-[250px]"
                placeholder="Saisissez les objectifs de la prestation..."
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
