'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Image from 'next/image';
import { 
  Users, Target, CheckCircle2, FileCheck, Search, Database, 
  Server, Network, Lock, FileSignature, CreditCard, 
  Home, Feather, Clock, Calendar, ShieldCheck, Zap, Globe,
  ArrowRight, Menu, X, ChevronRight
} from 'lucide-react';

declare global {
  interface Window {
    UnicornStudio: any;
    gsap: any;
    ScrollTrigger: any;
    Lenis: any;
  }
}

// Tech Separator Component
const TechSeparator = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative my-0 mx-auto" aria-hidden="true">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[3px] bg-[#00ffa3] shadow-[0_0_10px_rgba(0,255,163,0.5)]" />
  </div>
);

export default function PropositionPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const loaderBarRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem('eligibilityData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setOrderData(data);
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }

    const propositionSigned = sessionStorage.getItem('propositionSigned');
    if (propositionSigned === 'true') {
      setIsSigned(true);
    }
  }, []);

  // Preloader Logic
  useEffect(() => {
    let width = 0;
    const interval = setInterval(() => {
      width += Math.random() * 15;
      if (width > 100) width = 100;
      if (loaderBarRef.current) {
        loaderBarRef.current.style.width = width + '%';
      }
      
      if (width === 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (window.gsap && preloaderRef.current) {
            window.gsap.to(preloaderRef.current, {
              yPercent: -100,
              duration: 1,
              ease: "power4.inOut",
              delay: 0.5,
              onComplete: () => setIsInitialized(true)
            });
          } else {
            if (preloaderRef.current) preloaderRef.current.style.display = 'none';
            setIsInitialized(true);
          }
        }, 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isInitialized || !window.gsap || !window.ScrollTrigger) return;

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

    // Token Chart Animation
    const tokenRing = document.querySelector('.token-chart-ring');
    if (tokenRing) {
      gsap.to(tokenRing, {
        strokeDashoffset: 100, 
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '#investment',
          start: "top 70%",
          toggleActions: "play reverse play reverse"
        }
      });
    }

    // Numbers Count Up
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target') || '0');
      gsap.to(stat, {
        innerText: target,
        duration: 2,
        snap: { innerText: 0.1 },
        ease: "power1.out",
        scrollTrigger: {
          trigger: '#investment',
          start: "top 70%",
          toggleActions: "play reverse play reverse"
        }
      });
    });

    // Smooth Scroll (Lenis)
    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
      });
      
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }, [isInitialized]);

  const handleSignProposal = () => {
    router.push('/signer-proposition');
  };

  const handlePayment = () => {
    router.push('/paiement');
  };

  return (
    <div className="antialiased selection:bg-[#00ffa3] selection:text-[#030303] overflow-x-hidden text-[#e0e0e0] font-['Inter',sans-serif] bg-[#030303] min-h-screen bg-tech-grid">
      {/* External Scripts */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.2/dist/unicornStudio.umd.js" strategy="lazyOnload" onLoad={() => {
        if (window.UnicornStudio) window.UnicornStudio.init();
      }} />

      {/* Styles */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes tunnelMove {
          0% { transform: translateZ(-500px) scale(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateZ(800px) scale(2); opacity: 0; }
        }
        .text-stroke { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25); color: transparent; }
        .bg-tech-grid { 
          background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .tracking-tightest { letter-spacing: -0.04em; }
        .singularity-wrapper {
          perspective: 800px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0; left: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tunnel-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(0, 255, 163, 0.15);
          box-shadow: 0 0 20px rgba(0, 255, 163, 0.05);
          animation: tunnelMove 6s linear infinite;
          opacity: 0;
        }
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(to right, transparent, #00ffa3, transparent);
          opacity: 0.5;
          box-shadow: 0 0 15px #00ffa3;
          animation: scan 4s linear infinite;
        }
        /* Custom styles for Aetheris look */
        .hover-card:hover { background: rgba(255, 255, 255, 0.03); border-color: #00ffa3; }
      `}</style>

      {/* PRELOADER */}
      <div ref={preloaderRef} className="fixed inset-0 bg-[#030303] z-[9999] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="font-['Inter',sans-serif] text-3xl md:text-4xl font-semibold mb-2 tracking-tighter text-white uppercase">INITIALIZING</div>
          <div className="w-48 h-1 bg-[#1a1a1a] mx-auto overflow-hidden">
            <div ref={loaderBarRef} className="h-full bg-[#00ffa3] w-0"></div>
          </div>
          <div className="font-mono text-[10px] text-[#00ffa3] mt-2 tracking-widest uppercase italic">ESTABLISHING SECURE UPLINK...</div>
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
      <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-[#030303]/90 backdrop-blur-xl">
        <div className="flex h-16 max-w-[1920px] mx-auto px-6 md:px-12 items-center justify-between">
          <a href="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-lg font-semibold tracking-tight font-['Inter',sans-serif] text-white">SECURITRUST</span>
          </a>

          <div className="hidden lg:flex items-center border-x border-white/10 h-full px-8 divide-x divide-white/10">
            <div className="uppercase text-[#888888] text-[10px] font-semibold tracking-widest px-6">
              CLIENT: <span className="text-white ml-2">{orderData?.company?.name || orderData?.companyName || "CONFIDENTIAL"}</span>
            </div>
            <div className="uppercase text-[#888888] text-[10px] font-semibold tracking-widest px-6">
              REF: <span className="text-white ml-2">PROP_2026_AD</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[#00ffa3] tracking-widest uppercase italic">
              <span className="w-1.5 h-1.5 bg-[#00ffa3] rounded-full animate-pulse"></span>
              STATUS: SECURE
            </div>
            <button 
              onClick={() => router.push('/')}
              className="bg-white text-[#030303] px-4 md:px-6 py-2 text-xs font-semibold uppercase hover:bg-[#00ffa3] transition-colors whitespace-nowrap"
            >
              Retour
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative w-full h-screen min-h-[600px] bg-[#030303] overflow-hidden flex flex-col items-center justify-end pb-24 md:pb-32">
        {/* Top Visual: Unicorn Studio Background */}
        <div className="absolute top-0 left-0 w-full h-[65vh] z-0 pointer-events-none">
          <div data-us-project="7zydvovZReD8YsoiUwj3" style={{ width: '100%', height: '100%' }}></div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10"></div>
        </div>
        
        <div className="relative z-20 flex flex-col items-center w-full max-w-[1920px] px-6 text-center">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="font-['Inter',sans-serif] text-4xl md:text-7xl font-semibold text-white tracking-tightest leading-none relative z-20 mix-blend-lighten uppercase">
              VOTRE
            </h1>
            <div className="h-2 md:h-4"></div>
            <div 
              className="font-['Inter',sans-serif] text-[13vw] leading-[0.85] font-semibold tracking-tighter text-transparent z-10 select-none pointer-events-none opacity-90 transition-opacity uppercase text-stroke"
            >
              PROPOSITION
            </div>
          </div>

          <p className="max-w-xl text-center text-[#888888] text-sm md:text-lg font-medium leading-relaxed mt-6 mb-8 hero-anim opacity-0 translate-y-4">
            Une approche de cybersécurité offensive sur mesure pour garantir l'intégrité de vos actifs critiques et la résilience de votre SI.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto hero-anim opacity-0 translate-y-4">
            <button 
              onClick={() => document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-[#00ffa3] text-[#030303] px-10 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-white transition-all hover:scale-[1.02] min-w-[180px] text-center shadow-[0_0_20px_rgba(0,255,163,0.3)]"
            >
              Voir l'offre
            </button>
            <button className="group bg-black/50 backdrop-blur-md border border-white/20 text-white px-10 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-white/10 transition-all hover:border-white/40 min-w-[180px] text-center">
              Whitepaper
            </button>
          </div>
        </div>
      </header>

      <TechSeparator />

      {/* PARTNERS */}
      <section className="border-b border-white/10 bg-[#030303]" aria-label="Trusted Partners">
        <div className="max-w-[1920px] mx-auto grid grid-cols-2 md:grid-cols-6 divide-x divide-y md:divide-y-0 divide-white/10">
          {[
            "SOCIÉTÉ GÉNÉRALE", "AVIVA", "VEOLIA", "ABEILLE", "BANQUE POPULAIRE", "AFFLUENS"
          ].map((partner) => (
            <div key={partner} className="p-6 md:p-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
              <span className="font-['Inter',sans-serif] font-semibold text-lg md:text-xl tracking-tight text-white">{partner}</span>
            </div>
          ))}
        </div>
      </section>

      <TechSeparator />

      {/* CORE FEATURES (Livrables) */}
      <section id="features" className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex items-end justify-between reveal">
            <div>
              <h2 className="font-['Inter',sans-serif] text-3xl md:text-4xl font-semibold mb-2 tracking-tight text-white uppercase italic">Core Architecture</h2>
              <p className="text-[#888888] text-sm md:text-base max-w-md">Stratégie offensive multi-couches pour une protection absolue.</p>
            </div>
            <div className="hidden md:block text-right">
              <div className="font-mono text-[10px] text-[#00ffa3] tracking-widest uppercase">SYS_ARCH_V2.6</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            <article className="group border-b md:border-b-0 md:border-r border-white/10 p-6 md:p-8 hover-card bg-[#080808] reveal transition-all duration-300">
              <div className="w-10 h-10 bg-[#030303] border border-white/10 flex items-center justify-center mb-6 text-[#00ffa3]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-['Inter',sans-serif] text-xl font-semibold mb-3 tracking-tight text-white uppercase italic">Hyper-Throughput</h3>
              <p className="text-sm md:text-base text-[#888888] leading-relaxed mb-4 italic">Identification rapide et précise des vulnérabilités critiques sous 48h.</p>
            </article>
            <article className="group border-b md:border-b-0 md:border-r border-white/10 p-6 md:p-8 hover-card bg-[#080808] reveal transition-all duration-300">
              <div className="w-10 h-10 bg-[#030303] border border-white/10 flex items-center justify-center mb-6 text-[#00ffa3]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-['Inter',sans-serif] text-xl font-semibold mb-3 tracking-tight text-white uppercase italic">ZK-Privacy Layer</h3>
              <p className="text-sm md:text-base text-[#888888] leading-relaxed mb-4 italic">Anonymisation totale des données sensibles durant toute la phase d'audit.</p>
            </article>
            <article className="group border-b md:border-b-0 border-white/10 p-6 md:p-8 hover-card bg-[#080808] reveal transition-all duration-300">
              <div className="w-10 h-10 bg-[#030303] border border-white/10 flex items-center justify-center mb-6 text-[#00ffa3]">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-['Inter',sans-serif] text-xl font-semibold mb-3 tracking-tight text-white uppercase italic">Interoperability</h3>
              <p className="text-sm md:text-base text-[#888888] leading-relaxed mb-4 italic">Intégration fluide avec vos outils de ticketing (Jira, ServiceNow, etc).</p>
            </article>
          </div>
        </div>
      </section>

      <TechSeparator />

      {/* INVESTMENT */}
      <section id="investment" className="grid grid-cols-1 md:grid-cols-2">
        {/* Chart Area */}
        <div className="bg-[#080808] p-8 md:p-24 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center items-center relative overflow-hidden reveal">
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="45" stroke="#1a1a1a" strokeWidth="8" fill="none"></circle>
              <circle cx="50" cy="50" r="45" stroke="#00ffa3" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset="283" className="token-chart-ring"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl md:text-5xl font-bold text-white tracking-tighter italic">4 990€</span>
              <span className="text-xs text-[#888888] uppercase tracking-widest italic mt-1 font-mono">Investissement HT</span>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-8 text-center w-full max-w-sm">
            <div>
              <div className="text-xl md:text-2xl font-semibold text-white uppercase italic tracking-tighter"><span className="stat-number font-mono" data-target="14">0</span> Jours</div>
              <div className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-mono mt-1">Delivery Time</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold text-[#00ffa3] uppercase italic tracking-tighter"><span className="stat-number font-mono" data-target="100">0</span>%</div>
              <div className="text-[10px] text-[#888888] uppercase tracking-[0.2em] font-mono mt-1">Result Warranty</div>
            </div>
          </div>
        </div>

        {/* Utility List */}
        <div className="bg-[#030303] p-8 md:p-24 flex flex-col justify-center reveal">
          <h3 className="font-['Inter',sans-serif] text-2xl md:text-3xl font-semibold mb-8 tracking-tight text-white uppercase italic">Investment Utility ($SEC)</h3>
          <div className="space-y-6 mb-10">
            {[
              { id: 1, title: 'Audit Active Directory', desc: 'Analyse critique des configurations de sécurité et chemins de compromission AD.' },
              { id: 2, title: 'Test d\'intrusion Interne', desc: 'Simulation d\'une intrusion physique ou compromise d\'un poste utilisateur.' },
              { id: 3, title: 'Revue de Gouvernance', desc: 'Évaluation des processus de gestion des identités et des accès sensibles.' }
            ].map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00ffa3] font-semibold font-mono shrink-0 border border-white/10 group-hover:border-[#00ffa3] transition-colors">{item.id}</div>
                <div>
                  <h4 className="font-semibold text-white text-lg uppercase italic">{item.title}</h4>
                  <p className="text-sm md:text-base text-[#888888] italic">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {isSigned ? (
            <button 
              onClick={handlePayment}
              className="w-full bg-[#00ffa3] text-[#030303] py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,255,163,0.3)] hover:scale-[1.01]"
            >
              <CreditCard className="w-5 h-5" />
              Procéder au Règlement
            </button>
          ) : (
            <button 
              onClick={handleSignProposal}
              className="w-full bg-white text-[#030303] py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#00ffa3] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.01]"
            >
              Signer la Proposition
              <Feather className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      <TechSeparator />

      {/* ROADMAP */}
      <section id="roadmap" className="py-16 md:py-24 bg-[#030303]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            <div className="md:w-1/3 reveal">
              <div className="inline-block px-3 py-1 border border-white/10 bg-white/5 rounded-full mb-6">
                <span className="text-[10px] font-mono text-[#00ffa3] uppercase tracking-widest italic">Execution Log</span>
              </div>
              <h2 className="font-['Inter',sans-serif] text-3xl md:text-4xl font-semibold mb-4 tracking-tight text-white uppercase italic">Strategic<br/>Roadmap</h2>
              <p className="text-[#888888] text-sm md:text-base leading-relaxed mb-8 italic">
                Déploiement en phases séquentielles pour assurer une analyse exhaustive sans impact sur la production.
              </p>
            </div>
            <div className="md:w-2/3 space-y-0 relative border-l border-white/10 ml-2 md:ml-0">
              <div className="relative pl-8 md:pl-10 pb-12 reveal group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#00ffa3] rounded-full shadow-[0_0_10px_#00ffa3]"></div>
                <div className="border border-white/10 bg-[#080808]/50 p-6 hover:bg-[#080808] transition-colors">
                  <h3 className="font-semibold text-lg text-white mb-2 uppercase italic">Phase 01 — Discovery</h3>
                  <p className="text-xs text-[#888888] italic">Initialisation, collecte des données et définition du périmètre (Kick-off).</p>
                </div>
              </div>
              <div className="relative pl-8 md:pl-10 pb-12 reveal group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white border-2 border-[#030303]"></div>
                <div className="absolute -left-[9px] top-1 w-4.5 h-4.5 border border-[#00ffa3] rounded-full animate-ping opacity-50"></div>
                <div className="border border-[#00ffa3]/30 bg-[#00ffa3]/5 p-6 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-2 relative z-10 font-mono">
                    <span className="text-xs text-white uppercase tracking-widest">PHASE 02 — IN PROGRESS</span>
                    <span className="text-[9px] bg-[#00ffa3] text-[#030303] px-2 py-0.5 font-bold rounded uppercase">LIVE</span>
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-4 relative z-10 uppercase italic">Ecosystem Expansion</h3>
                  <p className="text-xs text-white/70 italic">Phase offensive, tests d'intrusion et identification des chemins de compromission.</p>
                </div>
              </div>
              <div className="relative pl-8 md:pl-10 reveal group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#080808] border border-white/10"></div>
                <div className="border border-white/10 border-dashed bg-transparent p-6 opacity-60 hover:opacity-100 transition-opacity">
                  <h3 className="font-semibold text-lg text-gray-400 mb-2 uppercase italic">Global Sovereignty</h3>
                  <p className="text-xs text-[#888888] italic">Restitution finale, plan de remédiation et transfert de compétences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TechSeparator />

      {/* NETWORK INFRASTRUCTURE */}
      <section id="network" className="py-16 md:py-24 bg-[#030303]">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 border border-white/10 bg-[#080808] p-2 relative overflow-hidden reveal min-h-[400px] md:min-h-[500px]">
              <div className="absolute inset-0 z-0">
                <Image 
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3e590790-e144-4deb-9989-37794b67c60e_1600w.webp" 
                  alt="Topology"
                  fill
                  className="object-cover opacity-30 grayscale brightness-75 contrast-125"
                />
              </div>
              <div className="scan-line z-10 pointer-events-none"></div>
              <div className="relative z-20 p-6 md:p-8 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div className="bg-[#030303]/80 backdrop-blur-md p-4 border border-white/10">
                    <h2 className="font-['Inter',sans-serif] text-xl md:text-2xl font-semibold mb-1 text-white tracking-tight uppercase italic">Live Topology</h2>
                    <p className="text-[#888888] text-[10px] font-mono tracking-widest uppercase italic">STATUS: SYNCHRONIZED</p>
                  </div>
                  <div className="flex gap-2 font-mono">
                    <div className="w-2 h-2 bg-[#00ffa3] rounded-full animate-pulse"></div>
                    <div className="text-[10px] text-[#00ffa3] hidden md:block uppercase tracking-widest italic">UPLINK ACTIVE</div>
                  </div>
                </div>
                <div className="absolute top-[30%] left-[20%] w-20 h-20 md:w-32 md:h-32 border border-[#00ffa3]/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-1 h-1 bg-[#00ffa3] rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-[#030303] border border-white/10 p-6 reveal h-full flex flex-col justify-center">
                <h3 className="font-semibold text-white mb-6 text-sm uppercase flex items-center gap-2 tracking-widest font-mono">
                  <span className="w-2 h-2 bg-[#00ffa3] rounded-sm"></span>
                  Network Health
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#080808] border border-white/10 font-mono">
                    <span className="text-xs text-[#888888] uppercase">Active Validators</span>
                    <span className="text-white font-semibold">4,120</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#080808] border border-white/10 font-mono">
                    <span className="text-xs text-[#888888] uppercase">Global Latency</span>
                    <span className="text-[#00ffa3] font-semibold">12ms</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#080808] border border-white/10 font-mono">
                    <span className="text-xs text-[#888888] uppercase">Total Secured</span>
                    <span className="text-white font-semibold">450M ATH</span>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="text-[10px] text-[#888888] mb-2 uppercase tracking-widest font-mono italic">Region Distribution</div>
                  <div className="flex gap-1 h-2 w-full">
                    <div className="h-full bg-[#00ffa3] w-[40%]"></div>
                    <div className="h-full bg-[#00ffa3]/70 w-[30%]"></div>
                    <div className="h-full bg-[#00ffa3]/40 w-[20%]"></div>
                    <div className="h-full bg-[#00ffa3]/20 w-[10%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TechSeparator />

      {/* DIGITAL SINGULARITY */}
      <section className="py-24 md:py-32 bg-[#080808] relative overflow-hidden flex flex-col items-center justify-center h-[70vh] md:h-[90vh]">
        <div className="absolute inset-0 opacity-10 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/aa933a24-d4de-4c67-83f6-b8676b3bab35_1600w.webp)] bg-cover bg-center"></div>
        
        <div className="singularity-wrapper">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
            <div 
              key={i} 
              className="tunnel-ring"
              style={{
                width: `${i * 100}px`,
                height: `${i * 100}px`,
                animationDelay: `${(i-1) * 0.5}s`,
                borderStyle: i % 2 === 0 ? 'dashed' : 'solid'
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center reveal pointer-events-none px-6">
          <span className="text-[#00ffa3] font-mono text-[10px] tracking-[0.5em] uppercase bg-black/50 backdrop-blur-md px-4 py-1 rounded-full border border-[#00ffa3]/20 italic">The Singularity</span>
          <h2 className="font-['Inter',sans-serif] text-4xl md:text-8xl font-bold mt-6 text-white mix-blend-difference tracking-tight uppercase italic">
            INFINITE SCALE
          </h2>
          <p className="text-[#888888] text-sm md:text-base max-w-md mx-auto mt-6 bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/5 italic">
            Une méthodologie offensive qui s'adapte à la complexité de votre infrastructure. Plus vous croissez, plus nous sécurisons.
          </p>
        </div>
      </section>

      <TechSeparator />

      {/* PURPOSE & VISION */}
      <section className="py-16 md:py-32 relative overflow-hidden" id="vision">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16 items-center">
            <div className="md:w-1/2 reveal">
              <div className="inline-block px-3 py-1 border border-white/10 bg-white/5 rounded-full mb-6 font-mono">
                <span className="text-[10px] text-[#00ffa3] uppercase tracking-widest italic">Our Mandate</span>
              </div>
              <h2 className="font-['Inter',sans-serif] text-3xl md:text-4xl font-semibold mb-4 tracking-tight text-white uppercase italic">Prophecy & Purpose</h2>
              <p className="text-[#888888] text-sm md:text-base leading-relaxed mb-6 italic">
                SecuriTrust a été fondée sur le principe de l'autonomie numérique totale. Nous bâtissons les fondations d'un monde où la sécurité est une certitude mathématique, pas une option.
              </p>
              <p className="text-[#888888] text-sm md:text-base leading-relaxed italic">
                Notre protocole d'audit n'est pas seulement technique ; il est le garant de votre souveraineté opérationnelle dans un environnement hostile.
              </p>
            </div>
            <div className="md:w-1/2 reveal">
              <Image 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa050e23-c777-40ee-aabe-cc76269a2e47_1600w.jpg"
                alt="Vision"
                width={800}
                height={600}
                className="w-full h-auto object-cover rounded-xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/10 p-6 md:p-8 bg-[#080808] reveal">
            <div className="space-y-6 text-[#888888] text-sm md:text-base leading-relaxed border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8 italic">
              <p>
                L'infrastructure IT moderne est devenue trop complexe et centralisée. Notre mission est de démanteler les vecteurs d'attaque avant qu'ils ne soient exploités, en offrant une résilience totale à nos partenaires.
              </p>
              <ul className="space-y-2 pl-4 border-l border-[#00ffa3]/30 font-mono italic">
                <li className="flex items-start gap-2 text-white font-medium uppercase text-xs"><span className="text-[#00ffa3] text-lg leading-none">•</span> Decentralized Foundation</li>
                <li className="flex items-start gap-2 text-white font-medium uppercase text-xs"><span className="text-[#00ffa3] text-lg leading-none">•</span> Inclusive Access</li>
                <li className="flex items-start gap-2 text-white font-medium uppercase text-xs"><span className="text-[#00ffa3] text-lg leading-none">•</span> Innovation Catalyst</li>
              </ul>
            </div>
            <div className="space-y-6 text-[#888888] text-sm md:text-base leading-relaxed md:pl-8 italic">
              <Image 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/89dadee1-b89d-415a-a6c9-b3d01200c4cd_1600w.jpg"
                alt="Quantum"
                width={800}
                height={600}
                className="w-full h-auto object-cover rounded-md border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
              />
              <p>
                Nous bâtissons le bouclier numérique de demain. Explorez notre approche pour comprendre comment nous redéfinissons les standards de l'audit offensif.
              </p>
              <a href="#" className="text-[#00ffa3] text-sm font-semibold uppercase tracking-widest flex items-center gap-2 hover:underline font-mono italic">
                Explore Our Manifesto <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <TechSeparator />

      {/* COMMUNITY CTA */}
      <section className="overflow-hidden group py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,163,0.15),_transparent_70%)] opacity-50"></div>
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10 reveal">
          <h2 className="font-['Inter',sans-serif] text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-8 text-white italic">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00ffa3]">Revolution</span>
          </h2>
          <p className="font-mono text-sm md:text-base text-[#888888] mb-10 max-w-lg mx-auto italic uppercase tracking-widest">
            &gt; Governance is live.<br/>
            &gt; Be part of the consensus.<br/>
            &gt; Claim your sovereignty.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-[#00ffa3] text-[#030303] px-10 py-4 font-semibold uppercase hover:shadow-[0_0_20px_rgba(0,255,163,0.5)] transition-shadow tracking-widest">
              Lancer l'audit
            </button>
            <button className="bg-transparent border border-white/20 text-white px-10 py-4 font-semibold uppercase hover:bg-white/10 transition-colors tracking-widest">
              Follow on X
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 pt-16 md:pt-20 pb-10 bg-[#030303]">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <span className="text-lg font-medium text-white font-['Inter',sans-serif] uppercase tracking-tighter italic">SecuriTrust</span>
              <p className="text-[#888888] text-xs leading-relaxed max-w-xs mt-4 italic">
                Architecting the invisible layer of trust for the next generation of decentralized applications.
              </p>
            </div>
            <div>
              <h5 className="text-white font-medium text-sm mb-4 uppercase tracking-widest font-mono italic">Ecosystem</h5>
              <ul className="space-y-2.5 text-[10px] text-[#888888] uppercase tracking-[0.2em] font-mono italic">
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">Block Explorer</a></li>
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">Governance</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-medium text-sm mb-4 uppercase tracking-widest font-mono italic">Developers</h5>
              <ul className="space-y-2.5 text-[10px] text-[#888888] uppercase tracking-[0.2em] font-mono italic">
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#00ffa3] transition-colors">Github</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-medium text-sm mb-4 uppercase tracking-widest font-mono italic">Security</h5>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] text-[#00ffa3] font-mono uppercase tracking-widest italic">
                  <span className="w-1.5 h-1.5 bg-[#00ffa3] rounded-full"></span>
                  Verified Node
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
            <p className="text-[10px] text-[#888888] uppercase tracking-wider italic font-mono">© {new Date().getFullYear()} SecuriTrust Foundation. Built for sovereign enterprises.</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] shadow-[0_0_8px_#00ffa3] animate-pulse"></div>
              <span className="text-[10px] text-[#00ffa3] uppercase tracking-widest italic">System Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
