'use client';

import React, { useState, useEffect, useRef } from 'react';

interface PropositionRequirementProps {
  companyName: string;
}

export function PropositionRequirement({ companyName }: PropositionRequirementProps) {
  const contextRef = useRef<HTMLTextAreaElement>(null);
  const objectivesRef = useRef<HTMLTextAreaElement>(null);
  const [config, setConfig] = useState({
    name: companyName || 'Everaxis',
    specialty: 'systèmes rotatifs de haute performance',
    sectors: "l'aéronautique, le spatial, la défense, l'énergie et l'industrie",
    regions: 'plusieurs sites en Europe',
    headquarters: 'Plessis-Robinson',
    techStack: 'des infrastructures locales (serveurs, réseaux, postes de travail), des solutions cloud (Microsoft 365), des environnements hybrides (Active Directory local et Entra ID) et des équipements réseau variés (Cisco, Fortinet, Huawei, ainsi que des composants industriels spécifiques)',
    contextSector: 'secteur aéronautique',
    complianceTarget: 'ISO 27001, exigences sectorielles, etc.'
  });

  const [context, setContext] = useState('');
  const [objectives, setObjectives] = useState(
    `L'objectif des prestations vise à améliorer le niveau de cybersécurité de l'entreprise, et notamment :\n\n• Identifier les vulnérabilités du système d'information à travers des tests techniques et organisationnels ;\n• Évaluer les politiques, procédures et dispositifs de sécurité actuellement en place ;\n• Mesurer le niveau de conformité avec les normes et réglementations en vigueur (notamment ISO 27001, NIS2, recommandations de l'ANSSI et standards sectoriels applicables) ;\n• Formuler des recommandations concrètes, hiérarchisées et pragmatiques pour améliorer la posture de sécurité ;\n• Assurer une veille active sur les évolutions normatives et réglementaires applicables.`
  );

  const [isAutoMode, setIsAutoMode] = useState(true);

  useEffect(() => {
    if (isAutoMode) {
      setContext(
        `${config.name} est un acteur international spécialisé dans les ${config.specialty} pour des secteurs stratégiques tels que ${config.sectors}.\n\nL'entreprise dispose de ${config.regions} dont le siège social ${config.headquarters} où se situe l'équipe IT.\n\nL'environnement technique repose sur ${config.techStack}.\n\nDans un contexte de renforcement des exigences cybersécurité au sein de la chaîne de sous-traitance du ${config.contextSector}, ${config.name} souhaite renforcer sa posture de sécurité pour répondre aux attentes de ses clients grands donneurs d'ordre. Il s'agit à la fois de démontrer sa capacité à protéger son patrimoine informationnel, de s'inscrire dans une trajectoire de conformité structurée (${config.complianceTarget}), et de consolider la confiance avec ses partenaires industriels.`
      );
    }
  }, [config, isAutoMode, companyName]);

  // Update config name if companyName changes from props
  useEffect(() => {
    if (companyName) {
      setConfig(prev => ({ ...prev, name: companyName }));
    }
  }, [companyName]);

  const handleConfigChange = (key: keyof typeof config, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setIsAutoMode(true);
  };

    useEffect(() => {
      if (contextRef.current) {
        contextRef.current.style.height = 'auto';
        contextRef.current.style.height = contextRef.current.scrollHeight + 'px';
      }
    }, [context]);

    useEffect(() => {
      if (objectivesRef.current) {
        objectivesRef.current.style.height = 'auto';
        objectivesRef.current.style.height = objectivesRef.current.scrollHeight + 'px';
      }
    }, [objectives]);

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

        {/* Configuration Panel */}
        <div className="mb-12 p-8 bg-[#080808] border border-white/10 rounded-3xl reveal">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[#00ffa3] font-bold uppercase tracking-widest text-sm">Configuration du client</h3>
            <button 
              onClick={() => setIsAutoMode(!isAutoMode)}
              className={`px-4 py-1 rounded-full text-[10px] uppercase font-bold transition-all ${isAutoMode ? 'bg-[#00ffa3] text-black' : 'bg-white/10 text-white/40'}`}
            >
              {isAutoMode ? 'Mode Automatique' : 'Mode Manuel'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Nom Entreprise</label>
              <input 
                type="text" 
                value={config.name} 
                onChange={(e) => handleConfigChange('name', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00ffa3] outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Spécialité</label>
              <input 
                type="text" 
                value={config.specialty} 
                onChange={(e) => handleConfigChange('specialty', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00ffa3] outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Secteurs</label>
              <input 
                type="text" 
                value={config.sectors} 
                onChange={(e) => handleConfigChange('sectors', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00ffa3] outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Siège Social</label>
              <input 
                type="text" 
                value={config.headquarters} 
                onChange={(e) => handleConfigChange('headquarters', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00ffa3] outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Régions</label>
              <input 
                type="text" 
                value={config.regions} 
                onChange={(e) => handleConfigChange('regions', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00ffa3] outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Secteur Contexte</label>
              <input 
                type="text" 
                value={config.contextSector} 
                onChange={(e) => handleConfigChange('contextSector', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00ffa3] outline-none transition-all"
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Cibles Conformité</label>
              <input 
                type="text" 
                value={config.complianceTarget} 
                onChange={(e) => handleConfigChange('complianceTarget', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00ffa3] outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <label className="text-[10px] uppercase text-white/40 font-bold tracking-widest">Environnement Technique</label>
            <textarea 
              value={config.techStack} 
              onChange={(e) => handleConfigChange('techStack', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[#00ffa3] outline-none transition-all h-20 resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 reveal">
          {/* Contexte Box */}
          <div className="group">
            <div className="inline-block bg-[#00ffa3] text-[#030303] px-8 py-2 rounded-full font-bold text-sm uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(0,255,163,0.3)]">
              Contexte
            </div>
            <div className="bg-[#080808] border border-white/10 rounded-3xl p-8 md:p-10 hover:border-[#00ffa3]/30 transition-all duration-500 shadow-2xl relative">
              {!isAutoMode && (
                <div className="absolute top-4 right-4 text-[10px] text-[#00ffa3] uppercase font-bold tracking-widest bg-[#00ffa3]/10 px-2 py-1 rounded">
                  Édition Manuelle
                </div>
              )}
                <textarea
                  ref={contextRef}
                  value={context}
                  onChange={(e) => {
                    setContext(e.target.value);
                    setIsAutoMode(false);
                  }}
                  className="w-full bg-transparent text-white/90 text-lg leading-relaxed italic border-none focus:ring-0 resize-none overflow-hidden min-h-[300px]"
                  placeholder="Saisissez le contexte du client..."
                  style={{ height: 'auto' }}
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
                  ref={objectivesRef}
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  className="w-full bg-transparent text-white/90 text-lg leading-relaxed italic border-none focus:ring-0 resize-none overflow-hidden min-h-[250px]"
                  placeholder="Saisissez les objectifs de la prestation..."
                  style={{ height: 'auto' }}
                />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
