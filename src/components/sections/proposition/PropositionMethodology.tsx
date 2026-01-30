import React from 'react';

export function PropositionMethodology() {
  return (
    <section id="features" className="py-24 bg-[#030303] relative overflow-hidden border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16 reveal">
                <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-tight">
                    La <span className="text-[#00ffa3]">Méthodologie</span> Securitrust
                </h2>
                <p className="text-gray-400 mt-4 text-sm md:text-base uppercase tracking-widest opacity-60">Nous vous proposons la réalisation de la prestation suivante</p>
                <div className="h-1 w-24 bg-[#00ffa3] mx-auto mt-6"></div>
            </div>

            <div className="space-y-12">
                {/* SECTION 1: Test d'intrusion interne */}
                <div className="bg-[#0f172a]/20 border border-blue-500/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-500/5 reveal relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -mr-32 -mt-32"></div>
                    
                    <div className="flex flex-col md:flex-row gap-8 items-start mb-12 relative z-10">
                        <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <span className="text-blue-400 text-3xl font-black">1</span>
                        </div>
                        <div>
                            <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight uppercase tracking-tight mb-2">
                                Test d'intrusion <span className="text-blue-400">interne</span>
                            </h3>
                            <p className="text-gray-400 font-medium">Approche en boîte grise sur l'environnement Active Directory</p>
                        </div>
                    </div>

                    <div className="space-y-16 relative z-10">
                        {/* Objectifs */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1 h-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                <h4 className="text-white font-black uppercase tracking-widest text-lg">Objectifs</h4>
                            </div>
                            <ul className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                {[
                                    "Évaluer la sécurité de l'Active Directory et identifier les vulnérabilités critiques pouvant permettre une compromission du domaine",
                                    "Tester les mécanismes d'authentification, les autorisations et la sécurité des comptes privilégiés",
                                    "Simuler des scénarios d'attaque réalistes depuis une position d'utilisateur authentifié (boîte grise)"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 items-center text-gray-300 group/item">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover/item:border-blue-500/50 transition-colors">
                                          <iconify-icon icon="solar:target-bold" className="text-blue-500" width="18"></iconify-icon>
                                        </div>
                                        <span className="text-sm md:text-base leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Périmètre */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1 h-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                <h4 className="text-white font-black uppercase tracking-widest text-lg">Périmètre</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { title: "Infrastructure Active Directory", desc: "Contrôleurs de domaine, serveurs, architecture AD", icon: "solar:server-bold" },
                                    { title: "Comptes utilisateurs et groupes", desc: "Permissions, élévation de privilèges, comptes sensibles", icon: "solar:users-group-rounded-bold" },
                                    { title: "Réseau interne", desc: "Segmentation, flux réseau, accès latéraux", icon: "solar:network-bold" },
                                    { title: "GPO et politiques", desc: "Politiques de groupe, configurations de sécurité", icon: "solar:settings-bold" }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl group/sub hover:bg-white/[0.05] hover:border-blue-500/30 transition-all">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-2 bg-blue-500/10 rounded-lg group-hover/sub:bg-blue-500/20 transition-colors">
                                              <iconify-icon icon={item.icon} className="text-blue-400" width="22"></iconify-icon>
                                            </div>
                                            <h5 className="text-white font-bold text-sm uppercase tracking-wider">{item.title}</h5>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed pl-12">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Méthode */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1 h-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                <h4 className="text-white font-black uppercase tracking-widest text-lg">Méthode</h4>
                            </div>
                            <div className="bg-[#0f172a]/40 border border-blue-500/30 rounded-3xl p-8 md:p-10 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                                <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                                        <iconify-icon icon="solar:lock-keyhole-bold-duotone" className="text-blue-400" width="40"></iconify-icon>
                                    </div>
                                    <div>
                                        <h5 className="text-white text-2xl font-bold mb-2 uppercase tracking-tight">Intrusion en boîte grise</h5>
                                        <p className="text-gray-400 text-sm md:text-base max-w-lg leading-relaxed">L'attaquant dispose d'accès authentifiés et d'informations privilégiées pour simuler une menace interne réaliste.</p>
                                    </div>
                                </div>
                                <ul className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                    {[
                                        { t: "Accès réseau interne", d: "Connexion VPN/VDI ou accès physique au réseau de l'entreprise" },
                                        { t: "Compte utilisateur standard", d: "Identifiants d'un utilisateur du domaine sans privilèges élevés" },
                                        { t: "Documentation fournie", d: "Architecture réseau, diagrammes AD, liste des serveurs critiques" }
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-center text-gray-300 group/li">
                                            <div className="w-6 h-6 rounded-full bg-[#00ffa3]/10 flex items-center justify-center shrink-0 border border-[#00ffa3]/20 group-hover/li:bg-[#00ffa3]/20 transition-colors">
                                              <iconify-icon icon="solar:check-circle-bold" className="text-[#00ffa3]" width="16"></iconify-icon>
                                            </div>
                                            <div className="text-sm md:text-base">
                                                <span className="font-bold text-white uppercase tracking-wide text-xs">{item.t} :</span>
                                                <span className="ml-2 opacity-80">{item.d}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: Phase d'initialisation */}
                <div className="bg-[#1e1b4b]/20 border border-indigo-500/20 rounded-3xl p-8 md:p-12 shadow-2xl shadow-indigo-500/5 reveal relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -mr-32 -mt-32"></div>
                    
                    <div className="flex gap-6 items-center mb-10 relative z-10">
                        <div className="w-14 h-14 bg-indigo-600/20 rounded-xl flex items-center justify-center shrink-0 border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                            <iconify-icon icon="solar:users-group-rounded-bold" className="text-indigo-400" width="28"></iconify-icon>
                        </div>
                        <h3 className="text-white text-2xl md:text-4xl font-bold uppercase tracking-tight">
                            Phase d'initialisation - Réunion de cadrage
                        </h3>
                    </div>
                    
                    <p className="text-indigo-400 text-sm md:text-lg mb-16 relative z-10 max-w-3xl leading-relaxed">
                        Pour garantir le bon déroulement des tests d'intrusion, certaines <span className="font-bold text-white underline decoration-indigo-500/50 underline-offset-4">préparations techniques</span> doivent être réalisées <span className="font-bold text-[#00ffa3]">en amont des prestations</span>
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 relative z-10">
                        <div>
                            <h4 className="text-indigo-400 font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-3">
                                <span className="w-8 h-px bg-indigo-500/30"></span>
                                Identification des actifs à auditer
                            </h4>
                            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl flex gap-6 items-center hover:bg-white/[0.04] transition-colors group/act">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover/act:scale-110 transition-transform">
                                  <iconify-icon icon="solar:check-circle-bold" className="text-blue-400" width="22"></iconify-icon>
                                </div>
                                <p className="text-gray-300 text-sm md:text-lg leading-relaxed">Identifier l'infrastructure Active Directory à tester (domaines, contrôleurs, serveurs)</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-indigo-400 font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-3">
                                <span className="w-8 h-px bg-indigo-500/30"></span>
                                Préparation des prérequis techniques
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { t: "Accès réseau interne", d: "VPN/VDI/jumpbox, badges d'accès physique si nécessaire", icon: "solar:network-bold" },
                                    { t: "Accès Active Directory", d: "Connexion réseau aux contrôleurs de domaine", icon: "solar:server-square-bold" },
                                    { t: "Comptes de test (grise)", d: "Identifiants d'utilisateur standard du domaine", icon: "solar:user-id-bold" },
                                    { t: "Documentation", d: "Schémas réseau, architecture AD, configurations pertinentes", icon: "solar:document-bold" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start p-6 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group/pre">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover/pre:bg-blue-500/20 transition-colors">
                                          <iconify-icon icon="solar:check-circle-bold" className="text-blue-400" width="20"></iconify-icon>
                                        </div>
                                        <div>
                                            <h5 className="text-white font-bold text-sm md:text-base uppercase tracking-wider mb-2">{item.t}</h5>
                                            <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
