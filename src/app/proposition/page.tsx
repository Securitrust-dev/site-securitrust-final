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
        width += Math.random() * 25;
        if(width > 100) width = 100;
        if (loaderBar) loaderBar.style.width = width + '%';
        
        if(width === 100) {
            clearInterval(loadInterval);
            if (window.gsap && preloader) {
                window.gsap.to(preloader, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: "power4.inOut",
                    delay: 0.2,
                    onComplete: initSite
                });
            } else {
                if (preloader) preloader.style.display = 'none';
                initSite();
            }
        }
    }, 80);

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

        // Token Chart
        const tokenRing = document.querySelector('.token-chart-ring');
        if(tokenRing) {
            gsap.to(tokenRing, {
                strokeDashoffset: 100,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '#token',
                    start: "top 70%",
                    toggleActions: "play reverse play reverse"
                }
            });
        }

        // Stats Count
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

    // Lenis
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
    <div className="font-body bg-tech-grid grid-bg selection:bg-[#00ffa3] selection:text-[#030303] text-[#e0e0e0] overflow-x-hidden min-h-screen bg-[#030303]">
      <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" strategy="afterInteractive" />
      
      <Script id="unicorn-studio-init" strategy="afterInteractive">
        {`
          !function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:!1};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.2/dist/unicornStudio.umd.js",i.onload=function(){window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)},(document.head || document.body).appendChild(i)}}();
        `}
      </Script>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --void: #030303;
          --panel: #080808;
          --mint: #00ffa3;
          --mint-dark: #00b372;
          --border: rgba(255, 255, 255, 0.08);
          --border-strong: rgba(255, 255, 255, 0.15);
          --sub: #888888;
        }
        body { background-color: #030303; color: #e0e0e0; overflow-x: hidden; }
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
      ` }} />

      {/* PRELOADER */}
      <div className="preloader fixed inset-0 bg-[#030303] z-[9999] flex items-center justify-center" id="preloader">
          <div className="text-center px-6">
              <div className="font-display text-3xl md:text-4xl font-semibold mb-2 tracking-tighter uppercase text-white">INITIALIZING</div>
              <div className="w-48 h-1 bg-gray-800 mx-auto overflow-hidden">
                  <div className="h-full bg-[#00ffa3] w-0" id="loader-bar"></div>
              </div>
              <div className="font-mono text-[10px] text-[#00ffa3] mt-2 tracking-widest uppercase">ESTABLISHING UPLINK...</div>
          </div>
      </div>
      
      {/* HUD OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-40 p-4 hidden md:block">
          <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/50"></div>
          <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/50"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/50"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/50"></div>
      </div>

      {/* HERO */}
      <header className="relative w-full h-screen min-h-[600px] bg-[#030303] overflow-hidden flex flex-col items-center justify-end pb-24 md:pb-32">
          <div className="absolute top-0 left-0 w-full h-[65vh] z-0 pointer-events-none">
               <div data-us-project="7zydvovZReD8YsoiUwj3" style={{width:'100%', height: '100%'}}></div>
               <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10"></div>
          </div>
          
            <div className="relative z-20 flex flex-col items-center w-full max-w-[1920px] px-6 text-center">
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="font-display text-4xl md:text-7xl font-semibold text-white tracking-[-0.04em] leading-none relative z-20 mix-blend-lighten uppercase">
                        PROPOSITION
                    </h1>
                    <div className="font-display text-base md:text-xl font-medium tracking-[0.4em] text-white z-10 uppercase mt-4">
                        COMMERCIALE
                    </div>
                </div>

              <p className="max-w-xl text-center text-gray-400 text-sm md:text-lg font-medium leading-relaxed mt-6 mb-8 hero-anim opacity-0 translate-y-4">
                  Audit de sécurité et tests d'intrusion experts. Évaluation complète de votre infrastructure sous 5 jours avec rapport de remédiation détaillé.
              </p>

              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto hero-anim opacity-0 translate-y-4">
                  <a href="/signer-proposition" className="group bg-[#00ffa3] text-[#030303] px-10 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-white transition-all hover:scale-[1.02] min-w-[180px] text-center shadow-[0_0_20px_rgba(0,255,163,0.3)]">
                      Signer la proposition
                  </a>
                  <a href="#features" className="group bg-[#030303]/50 backdrop-blur-md border border-white/20 text-white px-10 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-white/10 transition-all hover:border-white/40 min-w-[180px] text-center">
                      Voir le détail
                  </a>
              </div>
          </div>
      </header>

      <div className="tech-separator"></div>

      {/* PARTNERS */}
      <section className="border-b border-border bg-[#030303]">
          <div className="max-w-[1920px] mx-auto grid grid-cols-2 md:grid-cols-6 divide-x divide-y md:divide-y-0 divide-border">
              {["SOCIÉTÉ GÉNÉRALE", "ABEILLE ASSURANCES", "BANQUE MUTUALISTE", "VEOLIA EAU", "AFFLUENS", "AVIVA"].map((partner, i) => (
                <div key={i} className="p-6 md:p-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                    <span className="font-display font-semibold text-[10px] md:text-xs tracking-widest uppercase text-center text-[#888888]">{partner}</span>
                </div>
              ))}
          </div>
      </section>

      <div className="tech-separator"></div>

      {/* CORE FEATURES */}
      <section id="features" className="py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
              <div className="mb-12 flex items-end justify-between reveal">
                  <div>
                      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2 tracking-tight uppercase text-white">Notre Méthodologie</h2>
                      <p className="text-[#888888] text-sm md:text-base max-w-md">Un processus rigoureux combinant tests automatisés et expertise manuelle.</p>
                  </div>
                  <div className="hidden md:block text-right">
                      <div className="font-mono text-[10px] text-[#00ffa3] uppercase tracking-widest">SEC_METHOD_V3</div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
                  <article className="group border-b md:border-b-0 md:border-r border-border p-6 md:p-8 hover-card bg-[#080808] reveal">
                      <div className="w-10 h-10 bg-[#030303] border border-border flex items-center justify-center mb-6 text-[#00ffa3]">
                          <iconify-icon icon="solar:shield-warning-linear" width="24" height="24"></iconify-icon>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-3 tracking-tight uppercase text-white">Pentest & Intrusion</h3>
                      <p className="text-sm md:text-base text-[#888888] leading-relaxed mb-4">Tests d'intrusion externes et internes pour identifier les failles exploitables avant les cybercriminels.</p>
                  </article>
                  <article className="group border-b md:border-b-0 md:border-r border-border p-6 md:p-8 hover-card bg-[#080808] reveal">
                      <div className="w-10 h-10 bg-[#030303] border border-border flex items-center justify-center mb-6 text-[#00ffa3]">
                          <iconify-icon icon="solar:lock-password-linear" width="24" height="24"></iconify-icon>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-3 tracking-tight uppercase text-white">Audit Configuration</h3>
                      <p className="text-sm md:text-base text-[#888888] leading-relaxed mb-4">Analyse approfondie de vos systèmes, annuaires AD et infrastructures cloud pour garantir un durcissement maximal.</p>
                  </article>
                  <article className="group border-b md:border-b-0 border-border p-6 md:p-8 hover-card bg-[#080808] reveal">
                      <div className="w-10 h-10 bg-[#030303] border border-border flex items-center justify-center mb-6 text-[#00ffa3]">
                          <iconify-icon icon="solar:document-text-linear" width="24" height="24"></iconify-icon>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-3 tracking-tight uppercase text-white">Remédiation</h3>
                      <p className="text-sm md:text-base text-[#888888] leading-relaxed mb-4">Rapport détaillé incluant des recommandations concrètes et un accompagnement à la mise en œuvre des correctifs.</p>
                  </article>
              </div>
          </div>
      </section>

      <div className="tech-separator"></div>

      {/* STATS / OFFER */}
      <section id="token" className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#080808] p-8 md:p-24 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center items-center relative overflow-hidden reveal order-2 md:order-1">
              <div className="relative w-56 h-56 md:w-64 md:h-64">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="45" stroke="#1a1a1a" strokeWidth="8" fill="none"></circle>
                      <circle cx="50" cy="50" r="45" stroke="#00ffa3" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset="283" className="token-chart-ring"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl md:text-4xl font-semibold text-white tracking-tighter uppercase">5 Jours</span>
                      <span className="text-xs text-[#888888] uppercase tracking-wider">Délai d'exécution</span>
                  </div>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-8 text-center w-full max-w-sm">
                  <div>
                      <div className="text-xl md:text-2xl font-semibold text-white tracking-tight"><span className="token-stat-number" data-target="4999">0</span>€</div>
                      <div className="text-[10px] text-[#888888] uppercase tracking-widest font-mono">Forfait HT</div>
                  </div>
                  <div>
                      <div className="text-xl md:text-2xl font-semibold text-[#00ffa3] tracking-tight"><span className="token-stat-number" data-target="3">0</span></div>
                      <div className="text-[10px] text-[#888888] uppercase tracking-widest font-mono">Experts dédiés</div>
                  </div>
              </div>
          </div>

          <div className="bg-[#030303] p-8 md:p-24 flex flex-col justify-center reveal order-1 md:order-2">
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-8 tracking-tight uppercase text-white">Détails de l'Offre</h3>
              <div className="space-y-6">
                  {[
                    { t: "Audit Complet", p: "Tests d'intrusion sur le périmètre défini et analyse des vulnérabilités critiques.", n: "1" },
                    { t: "Gestion des Risques", p: "Évaluation de la maturité et recommandations basées sur les standards OWASP & ISO.", n: "2" },
                    { t: "Soutenance Live", p: "Présentation des résultats en visio-conférence avec vos équipes techniques.", n: "3" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00ffa3] font-semibold font-mono shrink-0">{item.n}</div>
                        <div>
                            <h4 className="font-semibold text-white text-lg uppercase tracking-tight">{item.t}</h4>
                            <p className="text-sm md:text-base text-[#888888]">{item.p}</p>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      <div className="tech-separator"></div>

      {/* TIMELINE */}
      <section id="roadmap" className="py-16 md:py-24 bg-[#030303]">
          <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-col md:flex-row gap-12 md:gap-16">
                  <div className="md:w-1/3 reveal">
                      <div className="inline-block px-3 py-1 border border-border bg-white/5 rounded-full mb-6">
                          <span className="text-[10px] font-mono text-[#00ffa3] uppercase tracking-widest font-bold">Timeline</span>
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 tracking-tight uppercase text-white">Déroulement du Projet</h2>
                      <p className="text-[#888888] text-sm md:text-base leading-relaxed mb-8">
                          Un calendrier structuré pour garantir une exécution rapide sans compromis sur la profondeur de l'analyse.
                      </p>
                  </div>
                  <div className="md:w-2/3 space-y-0 relative border-l border-border ml-2 md:ml-0">
                      <div className="relative pl-8 md:pl-10 pb-12 reveal group">
                          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#00ffa3] rounded-full shadow-[0_0_10px_#00ffa3]"></div>
                          <div className="border border-border bg-[#080808]/50 p-6 hover:bg-[#080808] transition-colors">
                              <h3 className="font-semibold text-lg text-white mb-2 uppercase tracking-tight">Cadrage & Préparation</h3>
                              <p className="text-xs text-[#888888]">Définition du périmètre, collecte des informations et validation des accès techniques.</p>
                          </div>
                      </div>
                      <div className="relative pl-8 md:pl-10 pb-12 reveal group">
                          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white border-2 border-[#030303]"></div>
                          <div className="absolute -left-[9px] top-1 w-[18px] h-[18px] border border-[#00ffa3] rounded-full animate-ping opacity-50"></div>
                          <div className="border border-[#00ffa3]/30 bg-[#00ffa3]/5 p-6 relative overflow-hidden">
                              <div className="flex justify-between items-start mb-2 relative z-10">
                                  <span className="font-mono text-xs text-white uppercase tracking-widest">PHASE EXÉCUTION</span>
                                  <span className="text-[9px] bg-[#00ffa3] text-[#030303] px-2 py-0.5 font-bold rounded">LIVE</span>
                              </div>
                              <h3 className="font-semibold text-lg text-white mb-4 relative z-10 uppercase tracking-tight">Offensive & Tests</h3>
                              <p className="text-xs text-white/70">Tests d'intrusion manuels, scans de vulnérabilités et tentatives d'exploitation réelles.</p>
                          </div>
                      </div>
                      <div className="relative pl-8 md:pl-10 reveal group">
                          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#080808] border border-[#888888]"></div>
                          <div className="border border-border border-dashed bg-transparent p-6 opacity-60 hover:opacity-100 transition-opacity">
                              <h3 className="font-semibold text-lg text-gray-400 mb-2 uppercase tracking-tight">Rapport & Soutenance</h3>
                              <p className="text-xs text-[#888888]">Rédaction du rapport final, classification des risques et réunion de restitution.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <div className="tech-separator"></div>

      {/* MAP */}
      <section id="network" className="py-16 md:py-24 bg-[#030303]">
          <div className="max-w-[1920px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 border border-border bg-[#080808] p-2 relative overflow-hidden reveal min-h-[400px] md:min-h-[500px]">
                      <div className="absolute inset-0 z-0">
                          <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3e590790-e144-4deb-9989-37794b67c60e_1600w.webp" alt="SecuriTrust Network Map" className="w-full h-full object-cover opacity-40 grayscale brightness-75 contrast-125" />
                      </div>
                      <div className="scan-line z-10 pointer-events-none"></div>
                      <div className="relative z-20 p-6 md:p-8 flex flex-col justify-between h-full">
                          <div className="flex justify-between items-start">
                              <div className="bg-[#030303]/80 backdrop-blur-md p-4 border border-border">
                                  <h2 className="font-display text-xl md:text-2xl font-semibold mb-1 text-white tracking-tight uppercase">Topology Défensive</h2>
                                  <p className="text-[#888888] text-[10px] font-mono uppercase tracking-widest">STATUS: MONITORING</p>
                              </div>
                              <div className="flex gap-2 items-center text-[#00ffa3]">
                                  <div className="w-2 h-2 bg-[#00ffa3] rounded-full animate-pulse"></div>
                                  <div className="font-mono text-[10px] hidden md:block uppercase tracking-widest">SECURE LINK ACTIVE</div>
                              </div>
                          </div>
                          <div className="absolute top-[30%] left-[20%] w-20 h-20 border border-[#00ffa3]/20 rounded-full flex items-center justify-center animate-pulse">
                              <div className="w-1 h-1 bg-[#00ffa3] rounded-full"></div>
                          </div>
                      </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-6">
                      <div className="bg-[#030303] border border-border p-6 reveal h-full flex flex-col justify-center">
                          <h3 className="font-semibold text-white mb-6 text-sm uppercase flex items-center gap-2 tracking-widest font-mono">
                              <span className="w-2 h-2 bg-[#00ffa3] rounded-sm"></span>
                              Statistiques Experts
                          </h3>
                          <div className="space-y-4 font-mono text-[#888888]">
                              {[
                                { l: "Consultants Certifiés", v: "15+", c: "text-white" },
                                { l: "Missions Réalisées", v: "500+", c: "text-[#00ffa3]" },
                                { l: "Score R&D", v: "A+", c: "text-white" }
                              ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-[#080808] border border-border">
                                    <span className="text-[10px] uppercase tracking-widest">{s.l}</span>
                                    <span className={`text-xs font-semibold tracking-tighter ${s.c}`}>{s.v}</span>
                                </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <div className="tech-separator"></div>

      {/* SINGULARITY */}
      <section className="py-24 md:py-32 bg-[#080808] relative overflow-hidden flex flex-col items-center justify-center h-[70vh] md:h-[90vh]">
          <div className="absolute inset-0 opacity-10 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/aa933a24-d4de-4c67-83f6-b8676b3bab35_1600w.webp)] bg-cover bg-center"></div>
          <div className="singularity-wrapper">
              {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map((size, i) => (
                <div key={i} className="tunnel-ring" style={{ width: size, height: size }}></div>
              ))}
          </div>
          <div className="relative z-10 text-center reveal pointer-events-none px-6">
              <span className="text-[#00ffa3] font-mono text-[9px] md:text-[10px] tracking-[0.5em] uppercase bg-black/50 backdrop-blur-md px-4 py-1 rounded-full border border-[#00ffa3]/20">Souveraineté Numérique</span>
              <h2 className="font-display text-4xl md:text-8xl font-bold mt-6 text-white mix-blend-difference tracking-tight uppercase">
                  SÉCURITÉ ABSOLUE
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mt-6 bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/5 italic font-light leading-relaxed">
                  Une approche offensive qui renforce vos défenses à chaque mission. Votre résilience est notre priorité absolue.
              </p>
          </div>
      </section>

      <div className="tech-separator"></div>

      {/* FOOTER */}
      <footer className="border-border reveal border-t pt-16 md:pt-20 pb-10 bg-[#030303]">
          <div className="max-w-[1920px] mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
                  <div className="col-span-2 md:col-span-1">
                      <span className="text-lg font-medium text-white font-display uppercase tracking-tighter">SECURITRUST</span>
                      <p className="text-[#888888] text-[10px] mt-4 leading-relaxed max-w-xs uppercase tracking-widest">
                          Audit de sécurité et expertise offensive pour protéger les entreprises de demain.
                      </p>
                  </div>
                  <div className="flex flex-col gap-4">
                      <h5 className="text-white font-medium text-xs uppercase tracking-widest">Services</h5>
                      <a href="/pentest-externe" className="text-[#888888] text-[10px] uppercase hover:text-[#00ffa3]">Pentest Externe</a>
                      <a href="/audit-configuration" className="text-[#888888] text-[10px] uppercase hover:text-[#00ffa3]">Audit Configuration</a>
                  </div>
                  <div className="flex flex-col gap-4">
                      <h5 className="text-white font-medium text-xs uppercase tracking-widest">Société</h5>
                      <a href="/contact" className="text-[#888888] text-[10px] uppercase hover:text-[#00ffa3]">Contact</a>
                      <a href="/mentions-legales" className="text-[#888888] text-[10px] uppercase hover:text-[#00ffa3]">Légal</a>
                  </div>
                  <div className="flex gap-4">
                      <a href="#" className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white border border-white/5 rounded-full"><iconify-icon icon="ri:linkedin-fill"></iconify-icon></a>
                      <a href="#" className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white border border-white/5 rounded-full"><iconify-icon icon="ri:twitter-x-fill"></iconify-icon></a>
                  </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
                  <p className="text-[9px] text-[#888888] uppercase tracking-[0.3em]">© 2026 SecuriTrust. Tous droits réservés.</p>
                  <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] animate-pulse"></div>
                      <span className="font-mono text-[9px] text-[#00ffa3] uppercase tracking-[0.3em]">System Secure</span>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
}
