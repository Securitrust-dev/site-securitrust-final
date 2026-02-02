import React from 'react';

export function PropositionMethodology() {
    const cards = [
      {
        title: "Initialisation (Prérequis)",
        items: [
          "Identification des actifs : Définir les adresses IP publiques à tester et sélectionner les services les plus critiques",
          "Prérequis techniques : Fournir les URL publiques des applications et les domaines concernés",
          "Interlocuteur dédié : Désigner un référent clé pour assurer une communication fluide",
          "Planification : Définir les modalités de communication et planifier les réunions de suivi",
          "Validation légale : Valider les délais d'exécution et signer l'autorisation formelle de PenTest"
        ],
        icon: "solar:settings-bold",
        bgColor: "bg-blue-600/10",
        accentColor: "text-blue-400",
        borderColor: "border-blue-500/20"
      },
      {
        title: "Reconnaissance Externe",
        items: [
          "Reconnaissance Passive : Analyse OSINT, recherche d'informations DNS/WHOIS et fingerprinting passif des technologies exposées",
          "Reconnaissance Active : Scanning de ports, énumération de sous-domaines/endpoints web et analyse des certificats SSL/TLS"
        ],
        icon: "solar:minimalistic-magnifer-bold",
        bgColor: "bg-indigo-600/10",
        accentColor: "text-indigo-400",
        borderColor: "border-indigo-500/20"
      },
      {
        title: "Analyse & Exploitation",
        items: [
          "Analyse : Scanning automatisé avec analyse manuelle, vérification des configurations et tests OWASP Top 10",
          "Exploitation : Tentatives d'exploitation réelles (RCE, SQLi, XXE), audit web avancé via Burp Suite et vérification du niveau de compromission"
        ],
        icon: "solar:shield-keyhole-bold",
        bgColor: "bg-emerald-600/10",
        accentColor: "text-emerald-400",
        borderColor: "border-emerald-500/20"
      },
      {
        title: "Post-Exploitation",
        items: [
          "Analyse d'impact : Cartographie du système compromis et vérification des possibilités de rebond vers le réseau interne",
          "Données : Simulation d'exfiltration de données sensibles (identifiants, tokens, clés API)",
          "Défenses : Analyse de la réactivité des mécanismes de monitoring (EDR, logs)"
        ],
        icon: "solar:graph-bold",
        bgColor: "bg-cyan-600/10",
        accentColor: "text-cyan-400",
        borderColor: "border-cyan-500/20"
      },
        {
          title: "Reporting & Livrables",
          items: [
            "Restitution : Livraison d'un rapport structuré (Synthèse Managériale, Technique, Remédiation) et réunion de restitution finale",
            "Plan d'action : Classification CVSS des failles et recommandations de correction priorisées"
          ],
          icon: "solar:document-bold",
          bgColor: "bg-[#9abff2]/5",
          accentColor: "text-[#9abff2]",
          borderColor: "border-[#9abff2]/20"
        }
      ];

      return (
        <section id="features" className="py-24 bg-[#030303] relative overflow-hidden border-t border-border">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/10 blur-[150px] rounded-full"></div>
          </div>

              <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="mb-20 reveal">
                  <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter uppercase text-white leading-none">
                    Pentest <span className="text-[#9abff2]">Externe</span>
                  </h2>
                  <p className="mt-6 text-white/60 font-mono uppercase tracking-[0.2em] text-sm">
                  🌐 VOLET 1 : Test d'Intrusion EXTERNE
                </p>
              </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 reveal">
    
                  {cards.map((card, idx) => (
                    <div 
                      key={idx} 
                      className={`flex flex-col min-h-[500px] bg-[#080808] border ${card.borderColor} rounded-3xl overflow-hidden group hover:border-[#9abff2]/40 transition-all duration-500 p-8 xl:p-6`}
                    >
                        <div className="flex justify-between items-start mb-12">
                          <div className={`w-14 h-14 rounded-2xl ${card.bgColor} border ${card.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                            <iconify-icon icon={card.icon} className={card.accentColor} width="28"></iconify-icon>
                          </div>
                          <span className="font-mono text-xs text-white/50 uppercase tracking-[0.2em] pt-2">Partie 0{idx + 1}</span>
                        </div>
    
                        <h3 className="text-xl lg:text-xl xl:text-[0.8rem] 2xl:text-[0.95rem] font-black text-white uppercase tracking-tighter leading-[0.9] group-hover:text-[#9abff2] transition-colors mb-10 whitespace-nowrap">
                          {card.title}
                        </h3>

                    <div className="flex-grow">
                      <ul className="space-y-4">
                        {card.items.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm text-white group/item leading-relaxed">
                            <span className={`${card.accentColor} font-bold shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity`}>→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

          <div className="mt-16 text-center reveal">
             <p className="text-white/40 text-xs font-mono uppercase tracking-[0.2em]">
               Processus de test certifié conforme aux standards industriels (OWASP, PTES)
             </p>
          </div>
      </div>
    </section>
  );
}
