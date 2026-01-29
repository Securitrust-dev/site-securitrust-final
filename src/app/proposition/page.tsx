'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    Lenis: any;
    UnicornStudio: any;
  }
}

export default function PropositionPage() {
  useEffect(() => {
    // --- 1. PRELOADER ---
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loader-bar');
    
    if (preloader && loaderBar) {
      let width = 0;
      const loadInterval = setInterval(() => {
        width += Math.random() * 15;
        if(width > 100) width = 100;
        loaderBar.style.width = width + '%';
        
        if(width === 100) {
          clearInterval(loadInterval);
          if (window.gsap) {
            window.gsap.to(preloader, {
              yPercent: -100,
              duration: 1,
              ease: "power4.inOut",
              delay: 0.5,
              onComplete: initSite
            });
          }
        }
      }, 100);
    }

    function initSite() {
      initAnimations();
    }

    // --- 3. ANIMATIONS (GSAP) ---
    function initAnimations() {
      if (!window.gsap || !window.ScrollTrigger) return;
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Hero Entrance
      gsap.to('.hero-anim', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Section Reveals
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        gsap.fromTo(el, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play reverse play reverse"
                }
            }
        );
      });
    }

    // --- 4. SMOOTH SCROLL ---
    if (window.Lenis) {
      const lenis = new window.Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true
      });
      function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }, []);

  return (
    <>
      <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" strategy="afterInteractive" />
      <Script id="unicorn-studio-loader" strategy="afterInteractive">
        {`
          !function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.2/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();
        `}
      </Script>

      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #030303; color: #e0e0e0; overflow-x: hidden; font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #030303; }
        ::-webkit-scrollbar-thumb { background: #333; }
        ::-webkit-scrollbar-thumb:hover { background: #00ffa3; }
        .text-stroke { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25); color: transparent; }
        .grid-bg { background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 50px 50px; }
        .hover-card { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-card:hover { background: rgba(255, 255, 255, 0.03); border-color: #00ffa3; }
        .preloader { position: fixed; inset: 0; background: #030303; z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .tech-separator {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            position: relative;
            margin: 40px auto;
        }
        .tech-separator::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 3px;
            background: #00ffa3;
            box-shadow: 0 0 10px rgba(0, 255, 163, 0.5);
        }
        .stats-grid { display: grid; grid-template-cols: repeat(4, 1fr); gap: 20px; }
        @media (max-width: 768px) { .stats-grid { grid-template-cols: repeat(2, 1fr); } }
      ` }} />

      <div className="bg-tech-grid grid-bg min-h-screen pb-20">

        {/* PRELOADER */}
        <div className="preloader" id="preloader" role="status" aria-label="Loading Website">
            <div className="text-center px-6">
                <div className="font-display text-3xl md:text-4xl font-semibold mb-2 tracking-tighter text-white">INITIALIZING</div>
                <div className="w-48 h-1 bg-gray-800 mx-auto overflow-hidden">
                    <div className="h-full bg-[#00ffa3] w-0" id="loader-bar"></div>
                </div>
                <div className="font-mono text-[10px] text-[#00ffa3] mt-2 tracking-widest uppercase">ESTABLISHING UPLINK...</div>
            </div>
        </div>
        
        {/* HUD OVERLAY */}
        <div className="fixed inset-0 pointer-events-none z-40 p-4 hidden md:block" aria-hidden="true">
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20"></div>
        </div>

        {/* HEADER */}
        <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-[#030303]/80 backdrop-blur-xl">
            <div className="flex h-16 max-w-[1920px] mx-auto px-6 md:px-12 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Image 
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-768x158-1764257964299.png?width=8000&height=8000&resize=contain"
                      alt="SecuriTrust"
                      width={150}
                      height={31}
                      className="h-8 w-auto"
                    />
                    <div className="hidden lg:flex flex-col border-l border-white/10 pl-6">
                        <span className="text-white text-xs font-semibold uppercase tracking-wider">Proposition Commerciale</span>
                        <span className="text-[#888888] text-[10px] uppercase">Pentest de Site de Société Securitrust</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <span className="hidden md:block text-[#888888] text-[10px] uppercase font-mono tracking-widest">29 JANVIER 2026</span>
                    <a href="/" className="bg-white/5 border border-white/10 text-white px-4 py-2 text-[10px] font-semibold uppercase hover:bg-white/10 transition-all tracking-widest flex items-center gap-2">
                        <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
                        Retour à l'accueil
                    </a>
                </div>
            </div>
        </nav>

        {/* HERO SECTION */}
        <section className="pt-32 pb-16 px-6 text-center reveal">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#00ffa3]/30 bg-[#00ffa3]/5 mb-8">
                <span className="text-[#00ffa3] text-[10px] font-mono uppercase tracking-[0.2em]">Proposition personnalisée pour votre entreprise</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-12">
                Securitrust propose une <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#00ffa3]">offre unique et innovante</span> pour vous
            </h1>

            {/* STATS */}
            <div className="max-w-4xl mx-auto stats-grid mt-16 border border-white/10 bg-[#080808]/50 backdrop-blur-md p-8 rounded-2xl">
                <div className="flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-bold text-white mb-2">+2500</span>
                    <span className="text-[10px] text-[#888888] uppercase tracking-widest text-center">jours R&D / d'expertise</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-bold text-white mb-2">+40</span>
                    <span className="text-[10px] text-[#888888] uppercase tracking-widest text-center">Certifications RGPD & DPO</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-bold text-white mb-2">+86</span>
                    <span className="text-[10px] text-[#888888] uppercase tracking-widest text-center">Audits et Tests d'intrusion</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-bold text-white mb-2">+105</span>
                    <span className="text-[10px] text-[#888888] uppercase tracking-widest text-center">RSSI & ISO 27001</span>
                </div>
            </div>
        </section>

        {/* TRUST CAROUSEL / GRID */}
        <section className="py-12 px-6 reveal">
            <h3 className="text-center text-[#888888] text-[10px] uppercase tracking-[0.4em] mb-10 italic">Ils nous font confiance</h3>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                    'SOCIETE GENERALE', 'abeille ASSURANCES', 'MINISTÈRE DE LA TRANSITION ÉCOLOGIQUE', 'BANQUE POPULAIRE', 'Afluens', 'VEOLIA', 'AVIVA'
                ].map((name, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg flex items-center justify-center h-20 grayscale hover:grayscale-0 transition-all cursor-crosshair">
                        <span className="text-black text-[10px] font-bold text-center uppercase">{name}</span>
                    </div>
                ))}
            </div>
        </section>

        <div className="tech-separator"></div>

        {/* CARDS PROPOSITION */}
        <section className="py-16 px-6 max-w-7xl mx-auto reveal">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">Notre <span className="text-[#00ffa3]">Proposition</span> pour la Sécurité et la Conformité</h2>
            <p className="text-center text-[#888888] text-sm mb-12">Services complets de tests de sécurité et de certification</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-[#080808] border border-white/10 p-8 rounded-2xl hover-card">
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                        <iconify-icon icon="solar:diploma-linear" width="28"></iconify-icon>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-4 uppercase">Notre Expertise en Attestation et Certification</h3>
                    <ul className="space-y-3 text-xs text-[#888888]">
                        <li className="flex items-center gap-2 italic"><span className="text-blue-400">•</span> Auditeur Principal ISO 27001</li>
                        <li className="flex items-center gap-2 italic"><span className="text-blue-400">•</span> Implementeur Principal ISO 27001</li>
                        <li className="flex items-center gap-2 italic"><span className="text-blue-400">•</span> Gestionnaire de Risques EBIOS</li>
                        <li className="flex items-center gap-2 italic"><span className="text-blue-400">•</span> Certifié OSCP</li>
                        <li className="flex items-center gap-2 italic"><span className="text-blue-400">•</span> Certifié CEH</li>
                        <li className="flex items-center gap-2 italic"><span className="text-blue-400">•</span> Qualification PASSI (En cours)</li>
                    </ul>
                </div>
                {/* Card 2 */}
                <div className="bg-[#080808] border border-white/10 p-8 rounded-2xl hover-card">
                    <div className="w-12 h-12 bg-[#00ffa3]/10 border border-[#00ffa3]/20 rounded-xl flex items-center justify-center text-[#00ffa3] mb-6">
                        <iconify-icon icon="solar:shield-keyhole-linear" width="28"></iconify-icon>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-4 uppercase">Gouvernance, Risques & Conformité (GRC)</h3>
                    <ul className="space-y-3 text-xs text-[#888888]">
                        <li className="flex items-center gap-2 italic"><span className="text-[#00ffa3]">•</span> Conformité ISO 27001</li>
                        <li className="flex items-center gap-2 italic"><span className="text-[#00ffa3]">•</span> RGPD & Protection des Données</li>
                        <li className="flex items-center gap-2 italic"><span className="text-[#00ffa3]">•</span> NIS 2 & DORA</li>
                        <li className="flex items-center gap-2 italic"><span className="text-[#00ffa3]">•</span> TISAX Automobile</li>
                        <li className="flex items-center gap-2 italic"><span className="text-[#00ffa3]">•</span> Conformité LPM</li>
                        <li className="flex items-center gap-2 italic"><span className="text-[#00ffa3]">•</span> Services DPO</li>
                    </ul>
                </div>
                {/* Card 3 */}
                <div className="bg-[#080808] border border-white/10 p-8 rounded-2xl hover-card">
                    <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                        <iconify-icon icon="solar:target-linear" width="28"></iconify-icon>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-4 uppercase">Cybersécurité Opérationnelle</h3>
                    <ul className="space-y-3 text-xs text-[#888888]">
                        <li className="flex items-center gap-2 italic"><span className="text-purple-400">•</span> Opérations Red Team</li>
                        <li className="flex items-center gap-2 italic"><span className="text-purple-400">•</span> Tests d'Intrusion (Web, Mobile, Infra)</li>
                        <li className="flex items-center gap-2 italic"><span className="text-purple-400">•</span> Simulation de Ransomware</li>
                        <li className="flex items-center gap-2 italic"><span className="text-purple-400">•</span> Campagnes de Phishing</li>
                        <li className="flex items-center gap-2 italic"><span className="text-purple-400">•</span> Analyse OSINT</li>
                        <li className="flex items-center gap-2 italic"><span className="text-purple-400">•</span> Audit de Sécurité</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* METHODOLOGY SECTION */}
        <section className="py-20 px-6 max-w-7xl mx-auto reveal">
            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">La <span className="text-[#00ffa3]">Méthodologie</span> Securitrust</h2>
            <p className="text-center text-[#888888] text-sm mb-16 italic">Nous vous proposons la réalisation de la prestation suivante</p>

            <div className="bg-blue-900/10 border border-blue-500/30 rounded-3xl overflow-hidden mb-12">
                <div className="bg-blue-500/20 p-6 flex items-center gap-4 border-b border-blue-500/30">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">1</div>
                    <h3 className="text-xl font-bold text-white">Test d'intrusion <span className="text-[#00ffa3]">interne</span></h3>
                </div>
                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[#00ffa3] text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#00ffa3] rounded-full"></span>
                                Objectifs
                            </h4>
                            <ul className="space-y-3 text-xs text-[#888888]">
                                <li className="flex items-start gap-2 italic"><iconify-icon icon="solar:check-circle-linear" class="text-[#00ffa3] mt-0.5"></iconify-icon> Évaluer la sécurité de l'Active Directory et identifier les vulnérabilités critiques</li>
                                <li className="flex items-start gap-2 italic"><iconify-icon icon="solar:check-circle-linear" class="text-[#00ffa3] mt-0.5"></iconify-icon> Tester les mécanismes d'authentification, les autorisations et la sécurité des comptes privilégiés</li>
                                <li className="flex items-start gap-2 italic"><iconify-icon icon="solar:check-circle-linear" class="text-[#00ffa3] mt-0.5"></iconify-icon> Simuler des scénarios d'attaque réalistes depuis une position d'utilisateur authentifié (boite grise)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-blue-400 text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                Périmètre
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                                    <iconify-icon icon="solar:server-linear" class="text-white mb-2"></iconify-icon>
                                    <p className="text-[10px] text-white font-bold uppercase">Infrastructure Active Directory</p>
                                    <p className="text-[9px] text-[#888888] italic">Contrôleurs de domaine, serveurs, architecture AD</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                                    <iconify-icon icon="solar:users-group-rounded-linear" class="text-white mb-2"></iconify-icon>
                                    <p className="text-[10px] text-white font-bold uppercase">Comptes utilisateurs et groupes</p>
                                    <p className="text-[9px] text-[#888888] italic">Permissions, élévation de privilèges, comptes sensibles</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#030303] border border-blue-500/20 p-8 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4">
                            <iconify-icon icon="solar:lock-keyhole-linear" class="text-blue-500 opacity-20" width="80"></iconify-icon>
                        </div>
                        <h4 className="text-white text-lg font-bold mb-6 flex items-center gap-3 italic">
                            Méthode : <span className="text-blue-400">Intrusion en boite grise</span>
                        </h4>
                        <p className="text-xs text-[#888888] mb-6 italic leading-relaxed">
                            L'attaquant dispose d'un accès authentifié et d'informations privilégiées pour simuler une menace interne ou un partenaire compromis.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-[10px] text-white uppercase tracking-widest font-mono">
                                <iconify-icon icon="solar:map-arrow-right-linear" class="text-blue-500"></iconify-icon>
                                Accès réseau interne
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-white uppercase tracking-widest font-mono">
                                <iconify-icon icon="solar:map-arrow-right-linear" class="text-blue-500"></iconify-icon>
                                Compte utilisateur standard
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-white uppercase tracking-widest font-mono">
                                <iconify-icon icon="solar:map-arrow-right-linear" class="text-blue-500"></iconify-icon>
                                Documentation fournie
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PHASE D'INITIALISATION */}
            <div className="bg-purple-900/10 border border-purple-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 reveal">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 shrink-0">
                    <iconify-icon icon="solar:calendar-date-linear" width="32"></iconify-icon>
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2">Phase d'initialisation - Réunion de cadrage</h3>
                    <p className="text-xs text-[#888888] italic">Pour garantir le bon déroulement des tests d'intrusion, certaines préparations techniques doivent être réalisées en amont de la prestation.</p>
                </div>
                <button className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-purple-400 transition-all flex items-center gap-2">
                    Voir les prérequis
                    <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
                </button>
            </div>
        </section>

        {/* SCOPE TABLE */}
        <section className="py-20 px-6 max-w-7xl mx-auto reveal">
            <h2 className="text-center text-3xl font-bold mb-12 uppercase italic">Périmètre des <span className="text-[#00ffa3]">Travaux</span></h2>
            <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#080808]/50">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-[#888888] font-mono">
                        <tr>
                            <th className="p-6">Phase</th>
                            <th className="p-6">Activité</th>
                            <th className="p-6">Durée</th>
                            <th className="p-6">Livrables</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs text-[#e0e0e0] divide-y divide-white/5 font-mono">
                        <tr>
                            <td className="p-6 italic">Reconnaissance</td>
                            <td className="p-6 italic">OSINT, Cartographie réseau, Découverte d'actifs</td>
                            <td className="p-6">1 jour</td>
                            <td className="p-6 italic text-[#00ffa3]">Rapport d'inventaire des actifs</td>
                        </tr>
                        <tr>
                            <td className="p-6 italic">Évaluation des Vulnérabilités</td>
                            <td className="p-6 italic">Analyse automatisée, Tests manuels</td>
                            <td className="p-6">1 jour</td>
                            <td className="p-6 italic text-[#00ffa3]">Rapport de vulnérabilités</td>
                        </tr>
                        <tr>
                            <td className="p-6 italic">Exploitation</td>
                            <td className="p-6 italic">Tests d'intrusion, Élévation de privilèges</td>
                            <td className="p-6">2 jours</td>
                            <td className="p-6 italic text-[#00ffa3]">Rapport d'exploitation</td>
                        </tr>
                        <tr>
                            <td className="p-6 italic">Rapport</td>
                            <td className="p-6 italic">Documentations, Recommandations</td>
                            <td className="p-6">1 jour</td>
                            <td className="p-6 italic text-[#00ffa3]">Rapport final & présentation</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        {/* CALENDAR */}
        <section className="py-20 px-6 max-w-5xl mx-auto reveal text-center">
            <h2 className="text-3xl font-bold mb-4 uppercase italic">Calendrier <span className="text-[#00ffa3]">Estimé</span></h2>
            <div className="inline-block px-4 py-2 bg-[#00ffa3]/10 border border-[#00ffa3]/30 rounded-full mb-12">
                <span className="text-[#00ffa3] font-bold">5 Jours</span> <span className="text-[10px] uppercase text-[#888888]">Durée Totale</span>
            </div>
            
            {/* GANTT STYLE CHART */}
            <div className="space-y-4 font-mono">
                {[
                    { label: 'Lancement du Projet', day: 1, color: 'bg-blue-500' },
                    { label: 'Reconnaissance & OSINT', day: 1, color: 'bg-blue-400' },
                    { label: 'Évaluation des Vulnérabilités', day: 2, color: 'bg-blue-300' },
                    { label: 'Tests d\'Intrusion', day: 3, color: 'bg-[#00ffa3]', width: 'w-2/5' },
                    { label: 'Rapport Final', day: 5, color: 'bg-[#00ffa3]/50' }
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6">
                        <div className="w-1/3 text-right text-[10px] text-[#888888] uppercase tracking-widest">{item.label}</div>
                        <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden relative">
                            <div className={`absolute top-0 h-full rounded-full ${item.color} ${item.width || 'w-1/5'}`} style={{ left: `${(item.day - 1) * 20}%` }}></div>
                        </div>
                    </div>
                ))}
                <div className="flex items-center gap-6 pt-4">
                    <div className="w-1/3"></div>
                    <div className="flex-1 flex justify-between text-[10px] text-[#888888] font-bold font-mono">
                        <span>JOUR 1</span>
                        <span>JOUR 2</span>
                        <span>JOUR 3</span>
                        <span>JOUR 4</span>
                        <span>JOUR 5</span>
                    </div>
                </div>
            </div>
        </section>

        {/* NEXT STEPS */}
        <section className="py-20 px-6 max-w-7xl mx-auto reveal">
            <h2 className="text-center text-3xl font-bold mb-16 uppercase italic">Prochaines <span className="text-[#00ffa3]">Étapes</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { icon: 'solar:pen-new-square-linear', title: 'Signature du Contrat', desc: 'Examiner et signer l\'accord de service' },
                    { icon: 'solar:users-group-two-rounded-linear', title: 'Réunion de Lancement', desc: 'Rencontrer l\'équipe et définir les objectifs' },
                    { icon: 'solar:magnifer-linear', title: 'Évaluation', desc: 'Réaliser les tests de sécurité complets' },
                    { icon: 'solar:delivery-linear', title: 'Livraison', desc: 'Recevoir le rapport détaillé et les recommandations' }
                ].map((step, i) => (
                    <div key={i} className="bg-[#080808] border border-white/10 p-8 rounded-2xl text-center group hover:border-[#00ffa3]/30 transition-all">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[#00ffa3] mx-auto mb-6 group-hover:scale-110 transition-all">
                            <iconify-icon icon={step.icon} width="24"></iconify-icon>
                        </div>
                        <div className="text-[#00ffa3] font-bold text-xl mb-2">{i + 1}</div>
                        <h4 className="text-white font-bold mb-4 uppercase italic">{step.title}</h4>
                        <p className="text-xs text-[#888888] italic">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* INVESTMENT SECTION */}
        <section className="py-24 px-6 reveal">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-950 via-purple-950 to-black border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,255,163,0.05),_transparent_70%)]"></div>
                
                <h2 className="text-[#e0e0e0] text-sm uppercase tracking-[0.5em] mb-8 italic">Votre <span className="text-white font-bold">Investissement</span></h2>
                
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-lg mx-auto relative z-10">
                    <h3 className="text-white text-xl font-bold mb-2 italic">Évaluation de Sécurité Complète</h3>
                    <div className="text-6xl font-bold text-white mb-2">4 999 €</div>
                    <div className="text-[#888888] text-[10px] uppercase tracking-widest mb-10 italic">Hors taxes</div>
                    
                    <div className="text-left space-y-4 mb-10">
                        <p className="text-[#00ffa3] text-[10px] font-bold uppercase tracking-widest mb-4 italic">Services Inclus :</p>
                        {[
                            'Test d\'Intrusion Complet',
                            'OSINT & Reconnaissance Externe',
                            'Évaluation des Vulnérabilités',
                            'Exploitation & Tests de Réaction',
                            'Rapport de Sécurité Complet',
                            'Réunion Débrief & Recommandations',
                            'Délai de Livraison de 5 Jours',
                            'Support Post-Évaluation'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs text-[#e0e0e0] italic">
                                <iconify-icon icon="solar:check-read-linear" class="text-[#00ffa3]"></iconify-icon>
                                {item}
                            </div>
                        ))}
                    </div>

                    <button className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2">
                        Signer
                        <iconify-icon icon="solar:pen-linear" width="20"></iconify-icon>
                    </button>
                    
                    <p className="mt-8 text-[9px] text-[#888888] italic leading-relaxed">
                        Pour toute question ou commentaire, veuillez contacter <span className="text-blue-400 underline cursor-pointer">contact@securitrust.pro</span> ou <span className="text-blue-400 underline cursor-pointer">0736692270</span>
                    </p>
                    <p className="mt-4 text-[8px] text-[#666] italic leading-relaxed">
                        La signature électronique est nécessaire pour valider la proposition. Celle-ci peut être réalisée en ligne via notre plateforme sécurisée.
                    </p>
                </div>
            </div>
        </section>

        {/* FOOTER */}
        <footer className="reveal py-10 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] text-[#888888] uppercase tracking-widest italic">© 2026 SecuriTrust — Tous droits réservés.</p>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] shadow-[0_0_8px_#00ffa3] animate-pulse"></div>
                    <span className="text-[10px] text-[#00ffa3] uppercase tracking-widest font-mono italic">Système de Proposition Sécurisé</span>
                </div>
            </div>
        </footer>

      </div>
    </>
  );
}
