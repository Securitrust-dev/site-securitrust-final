'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

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
    
    let width = 0;
    const loadInterval = setInterval(() => {
        width += Math.random() * 15;
        if(width > 100) width = 100;
        if (loaderBar) loaderBar.style.width = width + '%';
        
        if(width === 100) {
            clearInterval(loadInterval);
            if (window.gsap && preloader) {
                window.gsap.to(preloader, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut",
                    delay: 0.5,
                    onComplete: initSite
                });
            } else {
                if (preloader) preloader.style.display = 'none';
                initSite();
            }
        }
    }, 100);

    function initSite() {
        initAnimations();
    }

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

        // Section Reveals (Play In / Play Out)
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

        // Token Chart Animation
        const tokenRing = document.querySelector('.token-chart-ring');
        if(tokenRing) {
            gsap.to(tokenRing, {
                strokeDashoffset: 100, // Draw 2/3rds roughly
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '#token',
                    start: "top 70%",
                    toggleActions: "play reverse play reverse"
                }
            });
        }

        // Token Numbers Count Up
        const tokenStats = document.querySelectorAll('.token-stat-number');
        tokenStats.forEach(stat => {
            const targetAttr = stat.getAttribute('data-target');
            if (!targetAttr) return;
            const target = parseFloat(targetAttr);
            gsap.to(stat, {
                innerText: target,
                duration: 2,
                snap: { innerText: 0.1 },
                ease: "power1.out",
                scrollTrigger: {
                    trigger: '#token',
                    start: "top 70%",
                    toggleActions: "play reverse play reverse"
                }
            });
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
    <div className="font-body bg-tech-grid grid-bg selection:bg-mint selection:text-void text-[#e0e0e0] overflow-x-hidden min-h-screen">
      <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.2/dist/unicornStudio.umd.js" strategy="afterInteractive" onLoad={() => {
        if (window.UnicornStudio) window.UnicornStudio.init();
      }} />

      <style jsx global>{`
        :root {
          --void: #030303;
          --panel: #080808;
          --mint: #00ffa3;
          --mint-dark: #00b372;
          --border: rgba(255, 255, 255, 0.08);
          --border-strong: rgba(255, 255, 255, 0.15);
          --sub: #888888;
        }
        body { background-color: #030303; color: #e0e0e0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #030303; }
        ::-webkit-scrollbar-thumb { background: #333; }
        ::-webkit-scrollbar-thumb:hover { background: #00ffa3; }
        
        .text-stroke { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25); color: transparent; }
        .grid-bg { background-size: 50px 50px; }
        .bg-tech-grid {
          background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
        .hover-card { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-card:hover { background: rgba(255, 255, 255, 0.03); border-color: #00ffa3; }
        
        .scan-line {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 5px;
          background: linear-gradient(to right, transparent, #00ffa3, transparent);
          opacity: 0.5; box-shadow: 0 0 15px #00ffa3;
          animation: scan 4s linear infinite;
        }
        @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
        
        .tech-separator {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          position: relative; margin: 0 auto;
        }
        .tech-separator::after {
          content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 50px; height: 3px; background: #00ffa3; box-shadow: 0 0 10px rgba(0, 255, 163, 0.5);
        }
        
        .singularity-wrapper {
          perspective: 800px; width: 100%; height: 100%; position: absolute; top: 0; left: 0;
          overflow: hidden; display: flex; align-items: center; justify-content: center;
        }
        .tunnel-ring {
          position: absolute; border-radius: 50%; border: 1px solid rgba(0, 255, 163, 0.15);
          box-shadow: 0 0 20px rgba(0, 255, 163, 0.05); animation: tunnelMove 6s linear infinite; opacity: 0;
        }
        .tunnel-ring:nth-child(even) { border-style: dashed; border-width: 1px; border-color: rgba(255, 255, 255, 0.1); }
        @keyframes tunnelMove {
          0% { transform: translateZ(-500px) scale(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateZ(800px) scale(2); opacity: 0; }
        }
        .tunnel-ring:nth-child(1) { animation-delay: 0s; }
        .tunnel-ring:nth-child(2) { animation-delay: 0.5s; }
        .tunnel-ring:nth-child(3) { animation-delay: 1s; }
        .tunnel-ring:nth-child(4) { animation-delay: 1.5s; }
        .tunnel-ring:nth-child(5) { animation-delay: 2s; }
        .tunnel-ring:nth-child(6) { animation-delay: 2.5s; }
        .tunnel-ring:nth-child(7) { animation-delay: 3s; }
        .tunnel-ring:nth-child(8) { animation-delay: 3.5s; }
        .tunnel-ring:nth-child(9) { animation-delay: 4s; }
        .tunnel-ring:nth-child(10) { animation-delay: 4.5s; }
        .tunnel-ring:nth-child(11) { animation-delay: 5s; }
        .tunnel-ring:nth-child(12) { animation-delay: 5.5s; }
      `}</style>

      {/* PRELOADER */}
      <div className="preloader fixed inset-0 bg-void z-[9999] flex items-center justify-center" id="preloader" role="status">
          <div className="text-center px-6">
              <div className="font-display text-3xl md:text-4xl font-semibold mb-2 tracking-tighter uppercase">INITIALIZING</div>
              <div className="w-48 h-1 bg-gray-800 mx-auto overflow-hidden">
                  <div className="h-full bg-mint w-0" id="loader-bar"></div>
              </div>
              <div className="font-mono text-[10px] text-mint mt-2 tracking-widest uppercase">ESTABLISHING UPLINK...</div>
          </div>
      </div>
      
      {/* HUD OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-40 p-4 hidden md:block" aria-hidden="true">
          <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/50"></div>
          <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/50"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/50"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/50"></div>
      </div>

      {/* NAV */}
      <nav className="fixed w-full z-50 top-0 border-b border-border bg-void/90 backdrop-blur-xl" aria-label="Main Navigation">
          <div className="flex h-16 max-w-[1920px] mx-auto px-6 md:px-12 items-center justify-between">
              <a href="/" className="flex items-center gap-2 group shrink-0" aria-label="Aetheris Homepage">
                  <span className="text-lg font-semibold tracking-tight font-display uppercase">SECURITRUST</span>
              </a>

              <div className="hidden lg:flex items-center border-x border-border h-full px-8">
                  <a href="/services" className="uppercase text-sub hover:text-mint transition-colors text-xs font-semibold tracking-wide pt-2 pr-6 pb-2 pl-6">Services</a>
                  <a href="/proposition" className="uppercase text-mint transition-colors text-xs font-semibold tracking-wide pt-2 pr-6 pb-2 pl-6">Proposition</a>
                  <a href="/contact" className="uppercase text-sub hover:text-mint transition-colors text-xs font-semibold tracking-wide pt-2 pr-6 pb-2 pl-6">Contact</a>
                  <a href="/articles" className="uppercase text-sub hover:text-mint transition-colors text-xs font-semibold tracking-wide pt-2 pr-6 pb-2 pl-6">Blog</a>
              </div>

              <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-mint">
                      <span className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse"></span>
                      SYSTEM: SECURED
                  </div>
                  <button className="bg-white text-void px-4 md:px-6 py-2 text-xs font-semibold uppercase hover:bg-mint transition-colors whitespace-nowrap">
                      Mon Espace
                  </button>
              </div>
          </div>
      </nav>

      {/* HERO */}
      <header className="relative w-full h-screen min-h-[600px] bg-void overflow-hidden flex flex-col items-center justify-end pb-24 md:pb-32">
          
          {/* Top Visual: Unicorn Studio Background */}
          <div className="absolute top-0 left-0 w-full h-[65vh] z-0 pointer-events-none">
               <div data-us-project="7zydvovZReD8YsoiUwj3" style={{width:'100%', height: '100%'}}></div>
               <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void via-void/80 to-transparent z-10"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-20 flex flex-col items-center w-full max-w-[1920px] px-6 text-center">
              
              {/* Typography Title */}
              <div className="flex flex-col items-center justify-center w-full">
                  <h1 className="font-display text-4xl md:text-7xl font-semibold text-white tracking-[-0.04em] leading-none relative z-20 mix-blend-lighten uppercase">
                      SECURITRUST
                  </h1>
                  
                  <div className="h-2 md:h-4"></div>

                  <div className="font-display text-[13vw] leading-[0.85] font-semibold tracking-tighter text-transparent z-10 select-none pointer-events-none text-stroke opacity-90 transition-opacity uppercase" aria-label="PROPOSITION">
                      PROPOSITION
                  </div>
              </div>

              {/* Description */}
              <p className="max-w-xl text-center text-gray-400 text-sm md:text-lg font-medium leading-relaxed mt-6 mb-8 hero-anim opacity-0 translate-y-4">
                  Audit de sécurité et tests d'intrusion experts. Évaluation complète de votre infrastructure sous 5 jours avec rapport de remédiation détaillé.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto hero-anim opacity-0 translate-y-4">
                  <a href="/signer-proposition" className="group bg-mint text-void px-10 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-white transition-all hover:scale-[1.02] min-w-[180px] text-center shadow-[0_0_20px_rgba(0,255,163,0.3)]">
                      Signer la proposition
                  </a>
                  <a href="#features" className="group bg-void/50 backdrop-blur-md border border-white/20 text-white px-10 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-white/10 transition-all hover:border-white/40 min-w-[180px] text-center">
                      Voir le détail
                  </a>
              </div>
          </div>
      </header>

      <div className="tech-separator" aria-hidden="true"></div>

      {/* PARTNERS */}
      <section className="border-b border-border bg-void" aria-label="Trusted Partners">
          <div className="max-w-[1920px] mx-auto grid grid-cols-2 md:grid-cols-6 divide-x divide-y md:divide-y-0 divide-border">
              {["SOCIÉTÉ GÉNÉRALE", "ABEILLE ASSURANCES", "BANQUE MUTUALISTE", "VEOLIA EAU", "AFFLUENS", "AVIVA"].map((partner, i) => (
                <div key={i} className="p-6 md:p-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                    <span className="font-display font-semibold text-[10px] md:text-xs tracking-widest uppercase text-center text-sub group-hover:text-white transition-colors">{partner}</span>
                </div>
              ))}
          </div>
      </section>

      <div className="tech-separator" aria-hidden="true"></div>

      {/* CORE FEATURES */}
      <section id="features" className="py-16 md:py-24 relative" aria-label="Protocol Features">
          <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12 flex items-end justify-between reveal">
                  <div className="">
                      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2 tracking-tight uppercase">Notre Méthodologie</h2>
                      <p className="text-sub text-sm md:text-base max-w-md">Un processus rigoureux combinant tests automatisés et expertise manuelle.</p>
                  </div>
                  <div className="hidden md:block text-right">
                      <div className="font-mono text-[10px] text-mint uppercase tracking-widest">SEC_METHOD_V3</div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
                  <article className="group border-b md:border-b-0 md:border-r border-border p-6 md:p-8 hover-card bg-panel reveal">
                      <div className="w-10 h-10 bg-void border border-border flex items-center justify-center mb-6 text-mint">
                          <iconify-icon icon="solar:shield-warning-linear" width="24" height="24"></iconify-icon>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-3 tracking-tight uppercase">Pentest & Intrusion</h3>
                      <p className="text-sm md:text-base text-sub leading-relaxed mb-4">Tests d'intrusion externes et internes pour identifier les failles exploitables avant les cybercriminels.</p>
                  </article>
                  <article className="group border-b md:border-b-0 md:border-r border-border p-6 md:p-8 hover-card bg-panel reveal">
                      <div className="w-10 h-10 bg-void border border-border flex items-center justify-center mb-6 text-mint">
                          <iconify-icon icon="solar:lock-password-linear" width="24" height="24"></iconify-icon>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-3 tracking-tight uppercase">Audit Configuration</h3>
                      <p className="text-sm md:text-base text-sub leading-relaxed mb-4">Analyse approfondie de vos systèmes, annuaires AD et infrastructures cloud pour garantir un durcissement maximal.</p>
                  </article>
                  <article className="group border-b md:border-b-0 border-border p-6 md:p-8 hover-card bg-panel reveal">
                      <div className="w-10 h-10 bg-void border border-border flex items-center justify-center mb-6 text-mint">
                          <iconify-icon icon="solar:document-text-linear" width="24" height="24"></iconify-icon>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-3 tracking-tight uppercase">Remédiation</h3>
                      <p className="text-sm md:text-base text-sub leading-relaxed mb-4">Rapport détaillé incluant des recommandations concrètes et un accompagnement à la mise en œuvre des correctifs.</p>
                  </article>
              </div>
          </div>
      </section>

      <div className="tech-separator" aria-hidden="true"></div>

      {/* TOKEN UTILITY (ANIMATED) */}
      <section id="token" className="grid grid-cols-1 md:grid-cols-2" aria-label="Tokenomics">
          {/* Chart Area */}
          <div className="bg-panel p-8 md:p-24 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center items-center relative overflow-hidden reveal order-2 md:order-1">
              <div className="relative w-56 h-56 md:w-64 md:h-64">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="45" stroke="#1a1a1a" stroke-width="8" fill="none"></circle>
                      {/* Animated Circle */}
                      <circle cx="50" cy="50" r="45" stroke="#00ffa3" stroke-width="8" fill="none" strokeDasharray="283" strokeDashoffset="283" className="token-chart-ring"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl md:text-4xl font-semibold text-white tracking-tighter uppercase">5 Jours</span>
                      <span className="text-xs text-sub uppercase tracking-wider">Délai d'exécution</span>
                  </div>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-8 text-center w-full max-w-sm">
                  <div className="">
                      <div className="text-xl md:text-2xl font-semibold text-white tracking-tight"><span className="token-stat-number" data-target="4999">0</span>€</div>
                      <div className="text-[10px] text-sub uppercase tracking-widest font-mono">Forfait HT</div>
                  </div>
                  <div className="">
                      <div className="text-xl md:text-2xl font-semibold text-mint tracking-tight"><span className="token-stat-number" data-target="3">0</span></div>
                      <div className="text-[10px] text-sub uppercase tracking-widest font-mono">Experts dédiés</div>
                  </div>
              </div>
          </div>

          {/* Utility List */}
          <div className="bg-void p-8 md:p-24 flex flex-col justify-center reveal order-1 md:order-2">
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-8 tracking-tight uppercase">Détails de l'Offre</h3>
              <div className="space-y-6">
                  <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-mint font-semibold font-mono shrink-0">1</div>
                      <div className="">
                          <h4 className="font-semibold text-white text-lg uppercase tracking-tight">Audit Complet</h4>
                          <p className="text-sm md:text-base text-sub">Tests d'intrusion sur le périmètre défini et analyse des vulnérabilités critiques.</p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-mint font-semibold font-mono shrink-0">2</div>
                      <div className="">
                          <h4 className="font-semibold text-white text-lg uppercase tracking-tight">Gestion des Risques</h4>
                          <p className="text-sm md:text-base text-sub">Évaluation de la maturité et recommandations basées sur les standards OWASP & ISO.</p>
                      </div>
                  </div>
                  <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-mint font-semibold font-mono shrink-0">3</div>
                      <div className="">
                          <h4 className="font-semibold text-white text-lg uppercase tracking-tight">Soutenance Live</h4>
                          <p className="text-sm md:text-base text-sub">Présentation des résultats en visio-conférence avec vos équipes techniques.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <div className="tech-separator" aria-hidden="true"></div>

      {/* ROADMAP */}
      <section id="roadmap" className="py-16 md:py-24 bg-void" aria-label="Development Roadmap">
          <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-12 md:gap-16">
                  <div className="md:w-1/3 reveal">
                      <div className="inline-block px-3 py-1 border border-border bg-white/5 rounded-full mb-6">
                          <span className="text-[10px] font-mono text-mint uppercase tracking-widest font-bold">Timeline</span>
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 tracking-tight uppercase">Déroulement du Projet</h2>
                      <p className="text-sub text-sm md:text-base leading-relaxed mb-8">
                          Un calendrier structuré pour garantir une exécution rapide sans compromis sur la profondeur de l'analyse.
                      </p>
                  </div>
                  <div className="md:w-2/3 space-y-0 relative border-l border-border ml-2 md:ml-0">
                      <div className="relative pl-8 md:pl-10 pb-12 reveal group">
                          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-mint rounded-full shadow-[0_0_10px_#00ffa3]"></div>
                          <div className="border border-border bg-panel/50 p-6 hover:bg-panel transition-colors">
                              <h3 className="font-semibold text-lg text-white mb-2 uppercase tracking-tight">Cadrage & Préparation</h3>
                              <p className="text-xs text-sub">Définition du périmètre, collecte des informations et validation des accès techniques.</p>
                          </div>
                      </div>
                      <div className="relative pl-8 md:pl-10 pb-12 reveal group">
                          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white border-2 border-void"></div>
                          <div className="absolute -left-[9px] top-1 w-[18px] h-[18px] border border-mint rounded-full animate-ping opacity-50"></div>
                          <div className="border border-mint/30 bg-mint/5 p-6 relative overflow-hidden">
                              <div className="flex justify-between items-start mb-2 relative z-10">
                                  <span className="font-mono text-xs text-white uppercase tracking-widest">PHASE EXÉCUTION</span>
                                  <span className="text-[9px] bg-mint text-void px-2 py-0.5 font-bold rounded">LIVE</span>
                              </div>
                              <h3 className="font-semibold text-lg text-white mb-4 relative z-10 uppercase tracking-tight">Offensive & Tests</h3>
                              <p className="text-xs text-white/70">Tests d'intrusion manuels, scans de vulnérabilités et tentatives d'exploitation réelles.</p>
                          </div>
                      </div>
                      <div className="relative pl-8 md:pl-10 reveal group">
                          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-panel border border-sub"></div>
                          <div className="border border-border border-dashed bg-transparent p-6 opacity-60 hover:opacity-100 transition-opacity">
                              <h3 className="font-semibold text-lg text-gray-400 mb-2 uppercase tracking-tight">Rapport & Soutenance</h3>
                              <p className="text-xs text-sub">Rédaction du rapport final, classification des risques et réunion de restitution.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <div className="tech-separator" aria-hidden="true"></div>

      {/* NETWORK INFRASTRUCTURE */}
      <section id="network" className="py-16 md:py-24 bg-void" aria-label="Global Network Statistics">
          <div className="max-w-[1920px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left: Cinematic Node Map */}
                  <div className="lg:col-span-8 border border-border bg-panel p-2 relative overflow-hidden reveal min-h-[400px] md:min-h-[500px]">
                      
                      {/* Fixed Image: Deep Data Servers */}
                      <div className="absolute inset-0 z-0">
                          <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3e590790-e144-4deb-9989-37794b67c60e_1600w.webp" alt="Decentralized Global Validator Node Server Network" className="w-full h-full object-cover opacity-40 grayscale brightness-75 contrast-125" />
                      </div>

                      {/* CSS Radar Scan Overlay */}
                      <div className="scan-line z-10 pointer-events-none"></div>
                      
                      {/* Overlay UI */}
                      <div className="relative z-20 p-6 md:p-8 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start">
                              <div className="bg-void/80 backdrop-blur-md p-4 border border-border">
                                  <h2 className="font-display text-xl md:text-2xl font-semibold mb-1 text-white tracking-tight uppercase">Topology Défensive</h2>
                                  <p className="text-sub text-[10px] font-mono uppercase tracking-widest">STATUS: MONITORING</p>
                              </div>
                              <div className="flex gap-2 items-center">
                                  <div className="w-2 h-2 bg-mint rounded-full animate-pulse"></div>
                                  <div className="font-mono text-[10px] text-mint hidden md:block uppercase tracking-widest">SECURE LINK ACTIVE</div>
                              </div>
                          </div>

                          {/* Hotspots */}
                          <div className="absolute top-[30%] left-[20%] w-20 h-20 md:w-32 md:h-32 border border-mint/20 rounded-full flex items-center justify-center animate-pulse">
                              <div className="w-1 h-1 bg-mint rounded-full"></div>
                          </div>
                           <div className="absolute bottom-[20%] right-[30%] w-16 h-16 md:w-24 md:h-24 border border-mint/10 rounded-full flex items-center justify-center animate-pulse delay-700">
                              <div className="w-1 h-1 bg-mint rounded-full"></div>
                          </div>
                      </div>
                  </div>

                  {/* Right: Node Stats */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                      <div className="bg-void border border-border p-6 reveal h-full flex flex-col justify-center">
                          <h3 className="font-semibold text-white mb-6 text-sm uppercase flex items-center gap-2 tracking-widest font-mono">
                              <span className="w-2 h-2 bg-mint rounded-sm"></span>
                              Statistiques Experts
                          </h3>
                          <div className="space-y-4 font-mono">
                              <div className="flex justify-between items-center p-3 bg-panel border border-border">
                                  <span className="text-[10px] text-sub uppercase tracking-widest">Consultants Certifiés</span>
                                  <span className="text-xs text-white font-semibold tracking-tighter">15+</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-panel border border-border">
                                  <span className="text-[10px] text-sub uppercase tracking-widest">Missions Réalisées</span>
                                  <span className="text-xs text-mint font-semibold tracking-tighter">500+</span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-panel border border-border">
                                  <span className="text-[10px] text-sub uppercase tracking-widest">Score R&D</span>
                                  <span className="text-xs text-white font-semibold tracking-tighter">A+</span>
                              </div>
                          </div>
                          <div className="mt-8">
                              <div className="text-[10px] text-sub mb-2 uppercase tracking-widest font-mono">Répartition Expertises</div>
                              <div className="flex gap-1 h-2 w-full">
                                  <div className="h-full bg-mint w-[40%]"></div>
                                  <div className="h-full bg-mint/70 w-[30%]"></div>
                                  <div className="h-full bg-mint/40 w-[20%]"></div>
                                  <div className="h-full bg-mint/20 w-[10%]"></div>
                              </div>
                              <div className="flex justify-between text-[9px] text-gray-600 mt-1 font-mono tracking-tighter uppercase">
                                  <span>Web</span>
                                  <span>Network</span>
                                  <span>Cloud</span>
                                  <span>AD</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <div className="tech-separator" aria-hidden="true"></div>

      {/* DIGITAL SINGULARITY */}
      <section className="py-24 md:py-32 bg-panel relative overflow-hidden flex flex-col items-center justify-center h-[70vh] md:h-[90vh]" aria-label="Infinite Scalability Animation">
          <div className="absolute inset-0 opacity-10 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/aa933a24-d4de-4c67-83f6-b8676b3bab35_1600w.webp)] bg-cover bg-center"></div>
          
          <div className="singularity-wrapper">
              {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map((size, i) => (
                <div key={i} className="tunnel-ring" style={{ width: size, height: size }}></div>
              ))}
          </div>

          <div className="relative z-10 text-center reveal pointer-events-none px-6">
              <span className="text-mint font-mono text-[9px] md:text-[10px] tracking-[0.5em] uppercase bg-black/50 backdrop-blur-md px-4 py-1 rounded-full border border-mint/20">Souveraineté Numérique</span>
              <h2 className="font-display text-4xl md:text-8xl font-bold mt-6 text-white mix-blend-difference tracking-tight uppercase">
                  SÉCURITÉ ABSOLUE
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mt-6 bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/5 italic font-light leading-relaxed">
                  Une approche offensive qui renforce vos défenses à chaque mission. Votre résilience est notre priorité absolue.
              </p>
          </div>
      </section>

      <div className="tech-separator" aria-hidden="true"></div>

      {/* PURPOSE & VISION */}
      <section className="pt-16 md:pt-24 pb-16 md:pb-24" aria-label="Mission Statement" id="vision">
          <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16 items-center">
                  <div className="md:w-1/2 reveal">
                      <div className="inline-block px-3 py-1 border border-border bg-white/5 rounded-full mb-6">
                          <span className="text-[10px] font-mono text-mint uppercase tracking-widest font-bold">Notre Vision</span>
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 tracking-tight uppercase">Éthique & Expertise</h2>
                      <p className="text-sub text-sm md:text-base leading-relaxed mb-6 italic font-light">
                          SecuriTrust est né d'une conviction profonde : la confiance numérique est le socle de l'innovation future. Nous œuvrons pour un monde où chaque entreprise peut innover sans crainte des cyber-menaces.
                      </p>
                      <p className="text-sub text-sm md:text-base leading-relaxed italic font-light">
                          Notre équipe d'experts passionnés s'engage à fournir une analyse impartiale et de haut niveau pour protéger vos actifs les plus précieux.
                      </p>
                  </div>
                  <div className="md:w-1/2 reveal">
                      <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa050e23-c777-40ee-aabe-cc76269a2e47_1600w.jpg" alt="SecuriTrust Vision" className="w-full h-auto object-cover rounded-xl border border-border shadow-xl grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-border p-6 md:p-8 bg-panel reveal">
                  <div className="space-y-6 text-sub text-sm md:text-base leading-relaxed border-b md:border-b-0 md:border-r border-border pb-8 md:pb-0 md:pr-8 italic font-light">
                      <p>
                          Dans un paysage de menaces en constante évolution, la réactivité et la précision sont vitales. Notre mission est de démocratiser l'accès à l'expertise cyber pour toutes les entreprises.
                      </p>
                      <ul className="space-y-2 pl-4 border-l border-mint/30 not-italic font-normal">
                          <li className="flex items-start gap-2 text-white"><span className="text-mint text-lg leading-none">•</span> Excellence Technique : Formation continue de nos consultants.</li>
                          <li className="flex items-start gap-2 text-white"><span className="text-mint text-lg leading-none">•</span> Intégrité Totale : Confidentialité absolue sur toutes nos missions.</li>
                          <li className="flex items-start gap-2 text-white"><span className="text-mint text-lg leading-none">•</span> Engagement Durable : Accompagnement post-audit sur le long terme.</li>
                      </ul>
                  </div>
                  <div className="space-y-6 text-sub text-sm md:text-base leading-relaxed md:pl-8">
                      <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/89dadee1-b89d-415a-a6c9-b3d01200c4cd_1600w.jpg" alt="Cybersecurity Lab" className="w-full h-auto object-cover rounded-md border border-border shadow-md grayscale hover:grayscale-0 transition-all duration-500" />
                      <p className="italic font-light leading-relaxed">
                          Chaque ligne de code analysée est une étape vers un cyber-espace plus sûr. Nous sommes vos architectes de la confiance.
                      </p>
                      <a href="/services" className="text-mint text-sm font-semibold uppercase tracking-widest flex items-center gap-2 hover:underline">
                          Découvrir nos services <span className="text-lg">→</span>
                      </a>
                  </div>
              </div>
          </div>
      </section>

      <div className="tech-separator" aria-hidden="true"></div>

      {/* COMMUNITY CTA */}
      <section className="overflow-hidden group pt-24 pb-24 md:pt-32 md:pb-32 relative" aria-label="Join Community">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,163,0.15),_transparent_70%)] opacity-50"></div>
          
          <div className="max-w-4xl mx-auto text-center px-6 relative z-10 reveal">
              <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-8 text-white leading-tight">
                  Sécurisez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-mint uppercase">Futur</span>
              </h2>
              
              <p className="font-mono text-xs md:text-sm text-gray-400 mb-10 max-w-lg mx-auto tracking-widest uppercase leading-relaxed">
                  &gt; Offre à durée limitée. <br />
                  &gt; Rejoignez l'élite cyber. <br />
                  &gt; Protégez vos actifs dès aujourd'hui.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                  <a href="/signer-proposition" className="bg-mint text-void px-10 py-4 font-semibold uppercase hover:shadow-[0_0_20px_rgba(0,255,163,0.5)] transition-shadow tracking-widest">
                      Signer maintenant
                  </a>
                  <a href="/contact" className="bg-transparent border border-white/20 text-white px-10 py-4 font-semibold uppercase hover:bg-white/10 transition-colors tracking-widest">
                      Contacter un expert
                  </a>
              </div>
          </div>
      </section>

      {/* FOOTER */}
      <footer className="border-border reveal border-t pt-16 md:pt-20 pb-10 bg-void">
          <div className="max-w-[1920px] mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
                  <div className="col-span-2 md:col-span-1">
                      <div className="flex gap-2 mb-4 items-center">
                          <span className="text-lg font-medium text-white font-display uppercase tracking-tighter">SECURITRUST</span>
                      </div>
                      <p className="text-sub text-[10px] leading-relaxed max-w-xs uppercase tracking-widest">
                          Audit de sécurité et expertise offensive pour protéger les entreprises de demain.
                      </p>
                  </div>
                  
                  <div className="">
                      <h5 className="text-white font-medium text-xs mb-4 uppercase tracking-widest">Services</h5>
                      <ul className="space-y-2.5 text-[10px] text-sub uppercase tracking-widest font-mono">
                          <li><a href="/pentest-externe" className="hover:text-mint transition-colors">Pentest Externe</a></li>
                          <li><a href="/audit-configuration" className="hover:text-mint transition-colors">Audit Configuration</a></li>
                      </ul>
                  </div>

                  <div className="">
                      <h5 className="text-white font-medium text-xs mb-4 uppercase tracking-widest">Société</h5>
                      <ul className="space-y-2.5 text-[10px] text-sub uppercase tracking-widest font-mono">
                          <li><a href="/contact" className="hover:text-mint transition-colors">Contact</a></li>
                          <li><a href="/mentions-legales" className="hover:text-mint transition-colors">Légal</a></li>
                      </ul>
                  </div>

                  <div className="">
                      <h5 className="text-white font-medium text-xs mb-4 uppercase tracking-widest">Social</h5>
                      <div className="flex gap-4">
                          <a href="#" className="w-8 h-8 flex items-center justify-center text-sub hover:text-white transition-colors bg-surface rounded-full border border-white/5 hover:border-white/20">
                              <iconify-icon icon="ri:linkedin-fill" width="16"></iconify-icon>
                          </a>
                          <a href="#" className="w-8 h-8 flex items-center justify-center text-sub hover:text-white transition-colors bg-surface rounded-full border border-white/5 hover:border-white/20">
                              <iconify-icon icon="ri:twitter-x-fill" width="16"></iconify-icon>
                          </a>
                      </div>
                  </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
                  <p className="text-[9px] text-sub uppercase tracking-[0.3em]">© 2026 SecuriTrust. Tous droits réservés.</p>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-mint shadow-[0_0_8px_rgba(102,224,163,0.8)] animate-pulse"></div>
                      <span className="font-mono text-[9px] text-mint uppercase tracking-[0.3em]">System Secure</span>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
}
