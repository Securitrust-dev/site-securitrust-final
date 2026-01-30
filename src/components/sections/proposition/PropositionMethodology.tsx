import React from 'react';

export function PropositionMethodology() {
  const cards = [
    {
      title: "Objectifs de la prestation",
      color: "blue",
      items: [
        "Évaluer la sécurité de l'Active Directory et identifier les vulnérabilités critiques",
        "Tester les mécanismes d'authentification, les autorisations et la sécurité des comptes",
        "Simuler des scénarios d'attaque réalistes depuis une position d'utilisateur authentifié",
        "Identifier les chemins de compromission menant au contrôle total du domaine"
      ],
      icon: "solar:target-bold",
      bgColor: "bg-blue-600/10",
      accentColor: "text-blue-400",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Périmètre d'intervention",
      color: "indigo",
      items: [
        "Infrastructure Active Directory : Contrôleurs de domaine, serveurs, architecture AD",
        "Comptes utilisateurs et groupes : Permissions, élévation de privilèges",
        "Réseau interne : Segmentation, flux réseau, accès latéraux",
        "GPO et politiques : Configurations de sécurité et politiques de groupe"
      ],
      icon: "solar:server-bold",
      bgColor: "bg-indigo-600/10",
      accentColor: "text-indigo-400",
      borderColor: "border-indigo-500/20"
    },
    {
      title: "Méthodologie technique",
      color: "emerald",
      items: [
        "Intrusion en boîte grise : L'attaquant dispose d'accès authentifiés",
        "Accès réseau interne : Connexion VPN/VDI ou accès physique au réseau",
        "Comptes de test : Identifiants d'utilisateur standard sans privilèges élevés",
        "Documentation fournie : Architecture réseau, diagrammes AD, serveurs critiques"
      ],
      icon: "solar:shield-keyhole-bold",
      bgColor: "bg-[#00ffa3]/5",
      accentColor: "text-[#00ffa3]",
      borderColor: "border-[#00ffa3]/20"
    },
    {
      title: "Phase d'initialisation",
      color: "cyan",
      items: [
        "Réunion de cadrage : Définition des objectifs et des contacts clés",
        "Identification des actifs : Validation des domaines et serveurs à auditer",
        "Préparation technique : Mise en place des accès et badges nécessaires",
        "Validation documentaire : Schémas réseau et configurations de sécurité"
      ],
      icon: "solar:users-group-rounded-bold",
      bgColor: "bg-cyan-600/10",
      accentColor: "text-cyan-400",
      borderColor: "border-cyan-500/20"
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#030303] relative overflow-hidden border-t border-border">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20 reveal">
          <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-tight">
            La <span className="text-[#00ffa3]">Méthodologie</span> Securitrust
          </h2>
          <p className="text-gray-400 mt-4 text-sm md:text-base uppercase tracking-widest opacity-60">Approche structurée pour une sécurité maximale</p>
          <div className="h-1 w-24 bg-[#00ffa3] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col h-full bg-[#080808] border ${card.borderColor} rounded-2xl overflow-hidden group hover:border-[#00ffa3]/40 transition-all duration-500`}
            >
              {/* Header bar */}
              <div className={`h-2 w-full ${card.bgColor.replace('/10', '/40')} border-b ${card.borderColor}`}></div>
              
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-12 h-12 rounded-xl ${card.bgColor} border ${card.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <iconify-icon icon={card.icon} className={card.accentColor} width="24"></iconify-icon>
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Partie 0{idx + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-tight leading-tight group-hover:text-[#00ffa3] transition-colors">
                  {card.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h3>

                <ul className="space-y-4 mb-8 flex-grow">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-400 group/item">
                      <span className={`${card.accentColor} font-bold shrink-0 opacity-60 group-hover/item:opacity-100 transition-opacity`}>→</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-white/5 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                   <div className="flex gap-2">
                      <div className={`w-1 h-1 rounded-full ${card.bgColor.replace('/10', '/100')}`}></div>
                      <div className={`w-1 h-1 rounded-full ${card.bgColor.replace('/10', '/60')}`}></div>
                      <div className={`w-1 h-1 rounded-full ${card.bgColor.replace('/10', '/30')}`}></div>
                   </div>
                   <iconify-icon icon="solar:shield-check-bold" className={card.accentColor} width="16"></iconify-icon>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal">
           <p className="text-gray-500 text-xs font-mono uppercase tracking-[0.2em] opacity-40">
             Processus de test certifié conforme aux standards industriels (OWASP, PTES)
           </p>
        </div>
      </div>
    </section>
  );
}
