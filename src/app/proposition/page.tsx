'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Image from 'next/image';
import { 
  Users, Target, CheckCircle2, FileCheck, Search, Database, 
  Server, Network, Lock, FileSignature, CreditCard, 
  Home, Feather, Clock, Calendar, ShieldCheck, Zap, Globe
} from 'lucide-react';
import { PartnersScrollingBanner } from '@/components/sections/partners-scrolling-banner';

declare global {
  interface Window {
    UnicornStudio: any;
    gsap: any;
    ScrollTrigger: any;
    Lenis: any;
  }
}

export default function PropositionPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const loaderBarRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('fr-FR', options);
  };

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

    // Token Chart Animation (Adapted for Investment Circle)
    const tokenRing = document.querySelector('.token-chart-ring');
    if (tokenRing) {
      gsap.to(tokenRing, {
        strokeDashoffset: 70, 
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
        snap: { innerText: 1 },
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
    <div className="antialiased selection:bg-[#00ffa3] selection:text-[#030303] overflow-x-hidden text-[#e0e0e0] font-['Inter',sans-serif] bg-[#030303] min-h-screen">
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.2/dist/unicornStudio.umd.js" strategy="lazyOnload" onLoad={() => {
        if (window.UnicornStudio) window.UnicornStudio.init();
      }} />

      {/* PRELOADER */}
      <div ref={preloaderRef} className="fixed inset-0 bg-[#030303] z-[9999] flex items-center justify-center">
        <div className="text-center px-6">
          <div className="font-['Inter',sans-serif] text-3xl md:text-4xl font-semibold mb-2 tracking-tighter text-white">INITIALIZING</div>
          <div className="w-48 h-1 bg-gray-800 mx-auto overflow-hidden">
            <div ref={loaderBarRef} className="h-full bg-[#00ffa3] w-0"></div>
          </div>
          <div className="font-mono text-[10px] text-[#00ffa3] mt-2 tracking-widest">ESTABLISHING SECURE UPLINK...</div>
        </div>
      </div>

      {/* HUD OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-40 p-4 hidden md:block">
        <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/50"></div>
        <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/50"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/50"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/50"></div>
      </div>

      {/* NAV */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-[#030303]/90 backdrop-blur-xl">
        <div className="flex h-16 max-w-[1920px] mx-auto px-6 md:px-12 items-center justify-between">
          <a href="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-lg font-semibold tracking-tight font-['Inter',sans-serif] text-white">SECURITRUST</span>
          </a>

          <div className="hidden lg:flex items-center border-x border-white/5 h-full px-8">
            <div className="uppercase text-gray-500 text-xs font-semibold tracking-wide px-6">
              CLIENT: {orderData?.company?.name || orderData?.companyName || "CONFIDENTIAL"}
            </div>
            <div className="h-full w-[1px] bg-white/5" />
            <div className="uppercase text-gray-500 text-xs font-semibold tracking-wide px-6">
              REF: PROP_2026_AD
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[#00ffa3]">
              <span className="w-1.5 h-1.5 bg-[#00ffa3] rounded-full animate-pulse"></span>
              STATUS: SECURE
            </div>
            <button 
              onClick={() => router.push('/')}
              className="bg-white text-[#030303] px-4 md:px-6 py-2 text-xs font-semibold uppercase hover:bg-[#00ffa3] transition-colors whitespace-nowrap"
            >
              Back
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
          <div className="mb-6 hero-anim opacity-0 translate-y-4">
            <span className="text-white font-mono text-[10px] tracking-[0.4em] uppercase py-1 px-4 border border-white/20 bg-black/50 backdrop-blur-md rounded-full">
              PROPOSITION COMMERCIALE
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="font-['Inter',sans-serif] text-4xl md:text-7xl font-semibold text-white tracking-tightest leading-none relative z-20 mix-blend-lighten uppercase">
              VOTRE
            </h1>
            <div className="h-2 md:h-4"></div>
            <div 
              className="font-['Inter',sans-serif] text-[13vw] leading-[0.85] font-semibold tracking-tighter text-transparent z-10 select-none pointer-events-none opacity-90 transition-opacity uppercase"
              style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)' }}
            >
              BESOIN
            </div>
          </div>

          <p className="max-w-xl text-center text-gray-400 text-sm md:text-lg font-medium leading-relaxed mt-6 mb-8 hero-anim opacity-0 translate-y-4">
            Une approche sur mesure pour sécuriser vos actifs numériques et garantir la résilience de votre infrastructure critique.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto hero-anim opacity-0 translate-y-4">
            <button 
              onClick={() => document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-[#00ffa3] text-[#030303] px-10 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-white transition-all hover:scale-[1.02] min-w-[180px] text-center shadow-[0_0_20px_rgba(0,255,163,0.3)]"
            >
              Voir l'offre
            </button>
            <button className="group bg-black/50 backdrop-blur-md border border-white/20 text-white px-10 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-white/10 transition-all hover:border-white/40 min-w-[180px] text-center">
              Méthodologie
            </button>
          </div>
        </div>
      </header>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-[3px] bg-[#00ffa3] shadow-[0_0_10px_#00ffa3]" />
      </div>

      {/* PARTNERS */}
      <PartnersScrollingBanner />

      {/* CONTEXT & VISION */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="inline-block px-3 py-1 border border-white/10 bg-white/5 rounded-full mb-6">
                <span className="text-[10px] font-mono text-[#00ffa3] uppercase tracking-widest">CONTEXTE</span>
              </div>
              <h2 className="font-['Inter',sans-serif] text-3xl md:text-5xl font-semibold mb-6 tracking-tight text-white uppercase">Souveraineté & Identité</h2>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-6">
                Dans un paysage cyber de plus en plus complexe, la maîtrise de l'identité est le premier rempart de votre souveraineté numérique. Notre audit de l'Active Directory cible les vulnérabilités structurelles avant qu'elles ne soient exploitées.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#00ffa3] rounded-full" />
                  <span className="text-sm text-white font-medium">Analyse structurelle des privilèges</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#00ffa3] rounded-full" />
                  <span className="text-sm text-white font-medium">Détection de chemins d'attaque furtifs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#00ffa3] rounded-full" />
                  <span className="text-sm text-white font-medium">Durcissement Kerberos & NTLM</span>
                </div>
              </div>
            </div>
            <div className="relative reveal h-[400px] border border-white/10 overflow-hidden group">
              <Image 
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa050e23-c777-40ee-aabe-cc76269a2e47_1600w.jpg"
                alt="Digital Security Mesh"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES (Livrables) */}
      <section id="features" class="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex items-end justify-between reveal">
            <div>
              <h2 className="font-['Inter',sans-serif] text-3xl md:text-4xl font-semibold mb-2 tracking-tight text-white uppercase">Livrables Techniques</h2>
              <p className="text-gray-500 text-sm md:text-base max-w-md">Un arsenal complet de documents pour piloter votre remédiation.</p>
            </div>
            <div className="hidden md:block text-right">
              <div className="font-mono text-[10px] text-[#00ffa3]">DOC_VERSION_2.6</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5">
            <article className="group border-b md:border-b-0 md:border-r border-white/5 p-6 md:p-8 hover:bg-white/[0.02] transition-all duration-300 bg-[#080808] reveal">
              <div className="w-10 h-10 bg-[#030303] border border-white/10 flex items-center justify-center mb-6 text-[#00ffa3]">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-['Inter',sans-serif] text-xl font-semibold mb-3 tracking-tight text-white uppercase">Rapport Complet</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">Une analyse exhaustive de chaque vulnérabilité avec preuve de concept (PoC).</p>
            </article>
            <article className="group border-b md:border-b-0 md:border-r border-white/5 p-6 md:p-8 hover:bg-white/[0.02] transition-all duration-300 bg-[#080808] reveal">
              <div className="w-10 h-10 bg-[#030303] border border-white/10 flex items-center justify-center mb-6 text-[#00ffa3]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-['Inter',sans-serif] text-xl font-semibold mb-3 tracking-tight text-white uppercase">Matrice de Risque</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">Priorisation des actions selon l'impact business et la complexité technique.</p>
            </article>
            <article className="group border-b md:border-b-0 border-white/5 p-6 md:p-8 hover:bg-white/[0.02] transition-all duration-300 bg-[#080808] reveal">
              <div className="w-10 h-10 bg-[#030303] border border-white/10 flex items-center justify-center mb-6 text-[#00ffa3]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-['Inter',sans-serif] text-xl font-semibold mb-3 tracking-tight text-white uppercase">Support 30j</h3>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">Accompagnement de vos équipes IT pour la mise en œuvre des correctifs.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="py-16 md:py-24 bg-[#030303]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            <div className="md:w-1/3 reveal">
              <div className="inline-block px-3 py-1 border border-white/10 bg-white/5 rounded-full mb-6">
                <span className="text-[10px] font-mono text-[#00ffa3] uppercase tracking-widest">TIMELINE</span>
              </div>
              <h2 className="font-['Inter',sans-serif] text-3xl md:text-4xl font-semibold mb-4 tracking-tight text-white uppercase">Roadmap<br/>Opérationnelle</h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
                L'engagement SecuriTrust se déploie en phases séquentielles pour garantir une analyse sans interruption de service.
              </p>
            </div>
            <div className="md:w-2/3 space-y-0 relative border-l border-white/5 ml-2 md:ml-0">
              <div className="relative pl-8 md:pl-10 pb-12 reveal group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#00ffa3] rounded-full shadow-[0_0_10px_#00ffa3]"></div>
                <div className="border border-white/5 bg-[#080808]/50 p-6 hover:bg-[#080808] transition-colors">
                  <h3 className="font-semibold text-lg text-white mb-2 uppercase">Initialisation (Jour 1)</h3>
                  <p className="text-xs text-gray-500">Collecte des informations et définition précise du périmètre d'audit.</p>
                </div>
              </div>
              <div className="relative pl-8 md:pl-10 pb-12 reveal group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white border-2 border-[#030303]"></div>
                <div className="absolute -left-[9px] top-1 w-4.5 h-4.5 border border-[#00ffa3] rounded-full animate-ping opacity-50"></div>
                <div className="border border-[#00ffa3]/30 bg-[#00ffa3]/5 p-6 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <span className="font-mono text-xs text-white uppercase tracking-widest">PHASE 02 — EN COURS</span>
                    <span className="text-[9px] bg-[#00ffa3] text-[#030303] px-2 py-0.5 font-bold rounded uppercase">LIVE</span>
                  </div>
                  <h3 className="font-semibold text-lg text-white mb-4 relative z-10 uppercase">Analyse & Exploitation</h3>
                  <p className="text-xs text-white/70">Recherche active de vulnérabilités et simulation de chemins d'attaque furtifs.</p>
                </div>
              </div>
              <div className="relative pl-8 md:pl-10 reveal group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#080808] border border-gray-500"></div>
                <div className="border border-white/5 border-dashed bg-transparent p-6 opacity-60 hover:opacity-100 transition-opacity">
                  <h3 className="font-semibold text-lg text-gray-400 mb-2 uppercase">Restitution (Jour 14)</h3>
                  <p className="text-xs text-gray-500">Présentation du rapport final et réunion de transfert de compétences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT (Adapted Staking) */}
      <section id="investment" className="grid grid-cols-1 md:grid-cols-2 border-y border-white/5">
        {/* Chart Area */}
        <div className="bg-[#080808] p-8 md:p-24 border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center items-center relative overflow-hidden reveal">
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="45" stroke="#1a1a1a" stroke-width="8" fill="none"></circle>
              <circle cx="50" cy="50" r="45" stroke="#00ffa3" stroke-width="8" fill="none" stroke-dasharray="283" stroke-dashoffset="283" className="token-chart-ring"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl md:text-5xl font-bold text-white tracking-tighter italic">4 990€</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Investissement HT</span>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-8 text-center w-full max-w-sm">
            <div>
              <div className="text-xl md:text-2xl font-semibold text-white uppercase"><span className="stat-number" data-target="14">0</span> Jours</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Délai de livraison</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold text-[#00ffa3] uppercase"><span className="stat-number" data-target="100">0</span>%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Garantie résultat</div>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="bg-[#030303] p-8 md:p-24 flex flex-col justify-center reveal">
          <h3 className="font-['Inter',sans-serif] text-2xl md:text-3xl font-semibold mb-8 tracking-tight text-white uppercase">Engagement Global</h3>
          <div className="space-y-6 mb-10">
            {[
              'Audit complet de l\'architecture Active Directory',
              'Tests d\'intrusion internes (Poste utilisateur)',
              'Revue des privilèges et groupes sensibles',
              'Analyse des vulnérabilités critiques (ZeroLogon, etc.)'
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00ffa3] font-semibold font-mono shrink-0 border border-white/10">{i+1}</div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {isSigned ? (
            <div className="space-y-4">
              <div className="p-6 bg-[#00ffa3]/5 border border-[#00ffa3]/20 flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#00ffa3]" />
                <div>
                  <p className="text-white font-bold text-lg uppercase tracking-tight">PROPOSITION SIGNÉE</p>
                  <p className="text-[#00ffa3] text-xs font-mono uppercase">AUTHENTICATION_SUCCESS</p>
                </div>
              </div>
              <button 
                onClick={handlePayment}
                className="w-full bg-[#00ffa3] text-[#030303] py-4 text-sm font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,255,163,0.3)]"
              >
                <CreditCard className="w-5 h-5" />
                Procéder au Paiement
              </button>
            </div>
          ) : (
            <button 
              onClick={handleSignProposal}
              className="w-full bg-white text-[#030303] py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#00ffa3] transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Signer le document
              <Feather className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* NETWORK INFRASTRUCTURE (Topology) */}
      <section id="network" className="py-16 md:py-24 bg-[#030303]">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 border border-white/5 bg-[#080808] p-2 relative overflow-hidden reveal min-h-[400px] md:min-h-[500px]">
              <div className="absolute inset-0 z-0">
                <Image 
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3e590790-e144-4deb-9989-37794b67c60e_1600w.webp" 
                  alt="Network Topology"
                  fill
                  className="object-cover opacity-30 grayscale brightness-75 contrast-125"
                />
              </div>
              <div className="absolute top-0 left-0 width-full height-[5px] bg-gradient-to-r from-transparent via-[#00ffa3] to-transparent opacity-50 shadow-[0_0_15px_#00ffa3] animate-[scan_4s_linear_infinite]" />
              <div className="relative z-20 p-6 md:p-8 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div className="bg-[#030303]/80 backdrop-blur-md p-4 border border-white/5">
                    <h2 className="font-['Inter',sans-serif] text-xl md:text-2xl font-semibold mb-1 text-white tracking-tight uppercase">Topology Scan</h2>
                    <p className="text-gray-500 text-[10px] font-mono tracking-widest">STATUS: MONITORING</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#00ffa3] rounded-full animate-pulse"></div>
                    <div className="font-mono text-[10px] text-[#00ffa3] hidden md:block">NETWORK_SECURE</div>
                  </div>
                </div>
                <div className="absolute top-[30%] left-[20%] w-20 h-20 md:w-32 md:h-32 border border-[#00ffa3]/20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-1 h-1 bg-[#00ffa3] rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-[#030303] border border-white/5 p-6 reveal h-full flex flex-col justify-center">
                <h3 className="font-semibold text-white mb-6 text-sm uppercase flex items-center gap-2 tracking-widest">
                  <span className="w-2 h-2 bg-[#00ffa3] rounded-sm"></span>
                  Périmètre Audit
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#080808] border border-white/5">
                    <span className="text-xs text-gray-500 uppercase">Serveurs AD</span>
                    <span className="font-mono text-white font-semibold">ALL</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#080808] border border-white/5">
                    <span className="text-xs text-gray-500 uppercase">Utilisateurs</span>
                    <span className="font-mono text-[#00ffa3] font-semibold">UNLIMITED</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-[#080808] border border-white/5">
                    <span className="text-xs text-gray-500 uppercase">Confiance Foret</span>
                    <span className="font-mono text-white font-semibold">INCLUS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL SINGULARITY (Infinite Scalability adapted) */}
      <section className="py-24 md:py-32 bg-[#080808] relative overflow-hidden flex flex-col items-center justify-center h-[70vh] md:h-[90vh]">
        <div className="absolute inset-0 opacity-10 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/aa933a24-d4de-4c67-83f6-b8676b3bab35_1600w.webp)] bg-cover bg-center"></div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {[1,2,3,4,5,6,7,8,9,10,11].map(i => (
            <div 
              key={i} 
              className="absolute border border-[#00ffa3]/15 rounded-full shadow-[0_0_20px_rgba(0,255,163,0.05)] animate-[tunnelMove_6s_linear_infinite]"
              style={{
                width: `${i * 100}px`,
                height: `${i * 100}px`,
                animationDelay: `${(i-1) * 0.5}s`,
                opacity: 0,
                borderStyle: i % 2 === 0 ? 'dashed' : 'solid'
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center reveal pointer-events-none px-6">
          <span className="text-[#00ffa3] font-mono text-[10px] tracking-[0.5em] uppercase bg-black/50 backdrop-blur-md px-4 py-1 rounded-full border border-[#00ffa3]/20">SECURITRUST MISSION</span>
          <h2 className="font-['Inter',sans-serif] text-4xl md:text-8xl font-bold mt-6 text-white mix-blend-difference tracking-tight uppercase">
            SÉCURITÉ ABSOLUE
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mt-6 bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/5">
            Une architecture de confiance résiliente face aux menaces les plus sophistiquées.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 pt-16 md:pt-20 pb-10 bg-[#030303]">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <span className="text-lg font-medium text-white font-['Inter',sans-serif]">SecuriTrust</span>
              <p className="text-gray-500 text-xs leading-relaxed max-w-xs mt-4">
                L'excellence en cybersécurité au service de votre souveraineté numérique.
              </p>
            </div>
            <div>
              <h5 className="text-white font-medium text-sm mb-4">Contact</h5>
              <ul className="space-y-2.5 text-xs text-gray-500 font-mono uppercase tracking-widest">
                <li>jad.joumblat@securitrust.fr</li>
                <li>+33 6 08 94 87 97</li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-medium text-sm mb-4">Légal</h5>
              <ul className="space-y-2.5 text-xs text-gray-500 uppercase tracking-widest">
                <li><a href="/mentions-legales" className="hover:text-[#00ffa3] transition-colors">Mentions Légales</a></li>
                <li><a href="/cgv" className="hover:text-[#00ffa3] transition-colors">CGV</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">© {new Date().getFullYear()} SecuriTrust Foundation. All rights reserved.</p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] shadow-[0_0_8px_#00ffa3] animate-pulse"></div>
              <span className="font-mono text-[10px] text-[#00ffa3] uppercase tracking-widest">System Operational</span>
            </div>
          </div>
        </div>
      </footer>

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
        .tracking-tightest { letter-spacing: -0.04em; }
      `}</style>
    </div>
  );
}
