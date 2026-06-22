import React from 'react';

export function PropositionOffer() {
  const services = [
      "Objectif cybersécurité : Évaluer et renforcer la sécurité du système d'information en identifiant les vulnérabilités techniques et organisationnelles.",
      "Méthodologie boîte grise : Simulation d'attaque avec un accès utilisateur standard afin d'analyser les possibilités d'escalade de privilèges.",
      "Périmètre technique : Analyse de l'infrastructure Active Directory, incluant contrôleurs de domaine, serveurs, comptes sensibles et stratégies de groupe (GPO).",
      "Analyse du réseau interne : Vérification des flux réseau, de la segmentation et des accès latéraux depuis un accès VPN, VDI ou physique.",
      "Standards utilisés : Tests réalisés selon les référentiels PTES, MITRE ATT&CK et OWASP.",
      "Évaluation des vulnérabilités : Classification des failles selon le standard CVSS v3.1.",
      "Livrables : Rapport technique détaillé avec plan de remédiation priorisé et synthèse à destination de la direction.",
      "Garantie de performance : Remboursement de la prestation si aucune vulnérabilité majeure ou critique (CVSS ≥ 7) n'est identifiée.",
    ];

    return (
      <>
            {/* ── Votre Investissement ── */}
            <section id="investissement" className="py-12 bg-gradient-to-b from-[#0a0a0a] to-[#051525]">
            <div className="max-w-[1400px] mx-auto px-6">
              <h2 className="text-center font-display text-4xl md:text-5xl font-black tracking-tighter text-white mb-12 reveal">
                Votre <strong>Contrat</strong>
              </h2>

            <div className="max-w-2xl mx-auto reveal text-center">
              <div className="bg-gradient-to-br from-[#0d2540] to-[#061525] border border-[#74a2cd]/40 rounded-3xl p-10 shadow-[0_0_60px_rgba(116,162,205,0.25)]">

                {/* Garantie résultat */}
                <div className="bg-green-900/20 border border-green-500/40 rounded-xl px-5 py-4 mb-8 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 mt-0.5 shrink-0">
                      <iconify-icon icon="solar:shield-check-bold" width="22"></iconify-icon>
                    </span>
                      <p className="text-sm text-white/80 leading-relaxed">
                        Investissez sereinement : Si notre expertise ne révèle aucune faille majeure (CVSS ≥ 7) mettant en péril votre Active Directory, vous êtes intégralement remboursé sous 30 jours. La sécurité n'est pas une option, c'est un engagement.
                      </p>
                  </div>
                </div>

                <div className="text-left mb-8">
                  <p className="text-sm font-bold text-white mb-4">Détails de la prestation : Test d'Intrusion Active Directory</p>
                  <ul className="space-y-2">
                    {services.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white leading-relaxed">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#74a2cd] shrink-0 mt-0.5" width="18"></iconify-icon>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prix juste au-dessus du bouton */}
                  <div className="mb-6">
                    <div className="text-4xl font-black text-white mb-1">4 990 €</div>
                    <p className="text-white text-xs tracking-widest uppercase opacity-60">Hors taxes</p>
                  </div>

                  <a
                    href="/signer-signwell"
                    className="flex items-center justify-center gap-2 w-full bg-[#74a2cd] hover:bg-[#5a8ab5] text-white font-bold py-4 rounded-xl text-base uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(116,162,205,0.4)]"
                  >
                    Cliquer pour signer pour votre devis
                    <iconify-icon icon="solar:pen-bold" width="18"></iconify-icon>
                  </a>

                  <p className="text-xs text-white mt-6">
                  Pour toute question ou commentaire, veuillez contacter{' '}
                  <a href="mailto:contact@securitrust.fr" className="text-[#74a2cd]">contact@securitrust.fr</a>{' '}
                    ou{' '}
                    <a href="tel:0186044431" className="text-[#74a2cd]">01 86 04 44 31</a>
                </p>
                <p className="text-[10px] text-white mt-2">
                La signature électronique est requise pour valider votre engagement. Le montant de la prestation sera mis en caution lors de la réunion de kick-off, préalablement au démarrage des travaux.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
