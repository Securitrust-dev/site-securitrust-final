'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

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
        if (targetAttr) {
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
        }
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
        body { background-color: #030303; color: #e0e0e0; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #030303; }
        ::-webkit-scrollbar-thumb { background: #333; }
        ::-webkit-scrollbar-thumb:hover { background: #00ffa3; }
        .text-stroke { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25); color: transparent; }
        .text-stroke-hover:hover { -webkit-text-stroke: 1px #00ffa3; color: rgba(0, 255, 163, 0.1); }
        .grid-bg { background-size: 50px 50px; }
        .hover-card { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-card:hover { background: rgba(255, 255, 255, 0.03); border-color: #00ffa3; }
        .preloader { position: fixed; inset: 0; background: #030303; z-index: 9999; display: flex; align-items: center; justify-content: center; }
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
        @keyframes scan {
            0% { top: 0; }
            100% { top: 100%; }
        }
        .tech-separator {
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            position: relative;
            margin: 0 auto;
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
            border: 1px solid rgba(0, 255, 163, 0.15); /* Mint low opacity */
            box-shadow: 0 0 20px rgba(0, 255, 163, 0.05);
            animation: tunnelMove 6s linear infinite;
            opacity: 0;
        }
        .tunnel-ring:nth-child(even) {
            border-style: dashed;
            border-width: 1px;
            border-color: rgba(255, 255, 255, 0.1);
        }
        @keyframes tunnelMove {
            0% { transform: translateZ(-500px) scale(0); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateZ(800px) scale(2); opacity: 0; }
        }
        .bg-tech-grid {
          background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
        .text-void { color: #030303; }
        .bg-void { background-color: #030303; }
        .text-mint { color: #00ffa3; }
        .bg-mint { background-color: #00ffa3; }
        .border-border { border-color: rgba(255, 255, 255, 0.08); }
        .bg-panel { background-color: #080808; }
        .text-sub { color: #888888; }
        .font-display { font-family: 'Inter', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .tracking-tightest { letter-spacing: -0.04em; }
      ` }} />

      <div className="font-body bg-tech-grid grid-bg selection:bg-[#00ffa3] selection:text-[#030303] text-[#e0e0e0] min-h-screen">

        {/* PRELOADER */}
        <div className="preloader" id="preloader" role="status" aria-label="Loading Website">
            <div className="text-center px-6">
                <div className="font-display text-3xl md:text-4xl font-semibold mb-2 tracking-tighter">INITIALIZING</div>
                <div className="w-48 h-1 bg-gray-800 mx-auto overflow-hidden">
                    <div className="h-full bg-[#00ffa3] w-0" id="loader-bar"></div>
                </div>
                <div className="font-mono text-[10px] text-[#00ffa3] mt-2 tracking-widest uppercase">ESTABLISHING UPLINK...</div>
            </div>
        </div>
        
        <div className="fixed inset-0 pointer-events-none z-40 p-4 hidden md:block" aria-hidden="true">
            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/50"></div>
            <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/50"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/50"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/50"></div>
        </div>

        {/* NAV */}
        <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-[#030303]/90 backdrop-blur-xl" aria-label="Main Navigation">
            <div className="flex h-16 max-w-[1920px] mx-auto px-6 md:px-12 items-center justify-between">
                <a href="/home" className="flex items-center gap-2 group shrink-0" aria-label="Aetheris Homepage">
                    <span className="text-lg font-semibold tracking-tight font-display">AETHERIS</span>
                </a>

                <div className="hidden lg:flex items-center border-x border-white/10 h-full px-8">
                    <a href="/about" className="uppercase text-[#888888] hover:text-[#00ffa3] transition-colors text-xs font-semibold tracking-wide pt-2 pr-6 pb-2 pl-6">About</a>
                    <a href="/tokenomics" className="uppercase text-[#888888] hover:text-[#00ffa3] transition-colors text-xs font-semibold tracking-wide pt-2 pr-6 pb-2 pl-6">Tokenomics</a>
                    <a href="/roadmap" className="uppercase text-[#888888] hover:text-[#00ffa3] transition-colors text-xs font-semibold tracking-wide pt-2 pr-6 pb-2 pl-6">Roadmap</a>
                    <a href="/staking-dashboard" className="uppercase text-[#888888] hover:text-[#00ffa3] transition-colors text-xs font-semibold tracking-wide pt-2 pr-6 pb-2 pl-6">Staking</a>
                    <a href="/blog-list" className="uppercase text-[#888888] hover:text-[#00ffa3] transition-colors text-xs font-semibold tracking-wide pt-2 pr-6 pb-2 pl-6">Blog</a>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[#00ffa3]">
                        <span className="w-1.5 h-1.5 bg-[#00ffa3] rounded-full animate-pulse"></span>
                        GAS: 4 GWEI
                    </div>
                    <button className="bg-white text-[#030303] px-4 md:px-6 py-2 text-xs font-semibold uppercase hover:bg-[#00ffa3] transition-colors whitespace-nowrap">
                        Connect
                    </button>
                </div>
            </div>
        </nav>

        {/* HERO */}
        <header className="relative w-full h-screen min-h-[600px] bg-[#030303] overflow-hidden flex flex-col items-center justify-end pb-24 md:pb-32">
            
            {/* Top Visual: Unicorn Studio Background */}
            <div className="absolute top-0 left-0 w-full h-[65vh] z-0 pointer-events-none">
                 <div data-us-project="7zydvovZReD8YsoiUwj3" style={{ width: '100%', height: '100%' }}></div>
                 {/* Gradient mask to blend bottom of animation */}
                 <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-20 flex flex-col items-center w-full max-w-[1920px] px-6 text-center">
                
                {/* Typography Title */}
                <div className="flex flex-col items-center justify-center w-full">
                    {/* Top Solid Text */}
                    <h1 className="font-display text-4xl md:text-7xl font-semibold text-white tracking-tightest leading-none relative z-20 mix-blend-lighten">
                        INFINITE
                    </h1>
                    
                    {/* Spacing */}
                    <div className="h-2 md:h-4"></div>

                    {/* Bottom Transparent/Stroked Text */}
                    <div className="font-display text-[13vw] leading-[0.85] font-semibold tracking-tighter text-transparent z-10 select-none pointer-events-none text-stroke opacity-90 transition-opacity uppercase" aria-label="SCALABILITY">
                        SCALABILITY
                    </div>
                </div>

                {/* Description */}
                <p className="max-w-xl text-center text-gray-400 text-sm md:text-lg font-medium leading-relaxed mt-6 mb-8 hero-anim opacity-0 translate-y-4">
                    The world's first hybrid DAG-Blockchain architecture. Instant finality, zero-knowledge privacy, and quantum-resistant security.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto hero-anim opacity-0 translate-y-4">
                    <button className="group bg-[#00ffa3] text-[#030303] px-10 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-white transition-all hover:scale-[1.02] min-w-[180px] text-center shadow-[0_0_20px_rgba(0,255,163,0.3)]">
                        Start Building
                    </button>
                    <button className="group bg-black/50 backdrop-blur-md border border-white/20 text-white px-10 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-white/10 transition-all hover:border-white/40 min-w-[180px] text-center">
                        Read Whitepaper
                    </button>
                </div>
            </div>
        </header>

        <div className="tech-separator" aria-hidden="true"></div>

        {/* PARTNERS */}
        <section className="border-b border-white/10 bg-[#030303]" aria-label="Trusted Partners">
            <div className="max-w-[1920px] mx-auto grid grid-cols-2 md:grid-cols-6 divide-x divide-y md:divide-y-0 divide-white/10">
                <div className="p-6 md:p-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                    <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-white uppercase">BINANCE</span>
                </div>
                <div className="p-6 md:p-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                    <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-white uppercase">COINBASE</span>
                </div>
                <div className="p-6 md:p-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                    <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-white uppercase">SEQUOIA</span>
                </div>
                <div className="p-6 md:p-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                    <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-white uppercase">a16z</span>
                </div>
                <div className="p-6 md:p-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                    <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-white uppercase">POLYCHAIN</span>
                </div>
                <div className="p-6 md:p-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                    <span className="font-display font-semibold text-lg md:text-xl tracking-tight text-white uppercase">PANTERA</span>
                </div>
            </div>
        </section>

        <div className="tech-separator" aria-hidden="true"></div>

        {/* CORE FEATURES */}
        <section id="features" className="py-16 md:py-24 relative" aria-label="Protocol Features">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 flex items-end justify-between reveal">
                    <div className="">
                        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2 tracking-tight text-white uppercase">Core Architecture</h2>
                        <p className="text-[#888888] text-sm md:text-base max-w-md">Built on the Trinity Protocol, combining speed, security, and scalability.</p>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="font-mono text-[10px] text-[#00ffa3] uppercase tracking-widest">SYS_ARCH_V2</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
                    <article className="group border-b md:border-b-0 md:border-r border-white/10 p-6 md:p-8 hover-card bg-[#080808] reveal">
                        <div className="w-10 h-10 bg-[#030303] border border-white/10 flex items-center justify-center mb-6 text-[#00ffa3]">
                            <iconify-icon icon="solar:bolt-linear" width="24" height="24"></iconify-icon>
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-3 tracking-tight text-white uppercase italic">Hyper-Throughput</h3>
                        <p className="text-sm md:text-base text-[#888888] leading-relaxed mb-4 italic">Parallel transaction processing via DAG structure allowing 150k+ TPS on mainnet.</p>
                    </article>
                    <article className="group border-b md:border-b-0 md:border-r border-white/10 p-6 md:p-8 hover-card bg-[#080808] reveal">
                        <div className="w-10 h-10 bg-[#030303] border border-white/10 flex items-center justify-center mb-6 text-[#00ffa3]">
                            <iconify-icon icon="solar:shield-check-linear" width="24" height="24"></iconify-icon>
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-3 tracking-tight text-white uppercase italic">ZK-Privacy Layer</h3>
                        <p className="text-sm md:text-base text-[#888888] leading-relaxed mb-4 italic">Native Zero-Knowledge proofs for optional transactional privacy and compliance.</p>
                    </article>
                    <article className="group border-b md:border-b-0 border-white/10 p-6 md:p-8 hover-card bg-[#080808] reveal">
                        <div className="w-10 h-10 bg-[#030303] border border-white/10 flex items-center justify-center mb-6 text-[#00ffa3]">
                            <iconify-icon icon="solar:global-linear" width="24" height="24"></iconify-icon>
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-3 tracking-tight text-white uppercase italic">Interoperability</h3>
                        <p className="text-sm md:text-base text-[#888888] leading-relaxed mb-4 italic">Native bridges to Ethereum, Solana, and Cosmos via the Aetheris Nexus.</p>
                    </article>
                </div>
            </div>
        </section>

        <div className="tech-separator" aria-hidden="true"></div>

        {/* TOKEN UTILITY */}
        <section id="token" className="grid grid-cols-1 md:grid-cols-2" aria-label="Tokenomics">
            {/* Chart Area */}
            <div className="bg-[#080808] p-8 md:p-24 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center items-center relative overflow-hidden reveal order-2 md:order-1">
                <div className="relative w-56 h-56 md:w-64 md:h-64">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="45" stroke="#1a1a1a" strokeWidth="8" fill="none"></circle>
                        {/* Animated Circle */}
                        <circle cx="50" cy="50" r="45" stroke="#00ffa3" strokeWidth="8" fill="none" strokeDasharray="283" strokeDashoffset="283" className="token-chart-ring"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl md:text-4xl font-semibold text-white">1B</span>
                        <span className="text-xs text-[#888888] uppercase tracking-wider">Total Supply</span>
                    </div>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-8 text-center w-full max-w-sm">
                    <div className="">
                        <div className="text-xl md:text-2xl font-semibold text-white uppercase italic">$<span className="token-stat-number" data-target="452">0</span>M</div>
                        <div className="text-[10px] text-[#888888] uppercase tracking-widest font-mono">Market Cap</div>
                    </div>
                    <div className="">
                        <div className="text-xl md:text-2xl font-semibold text-[#00ffa3] uppercase italic"><span className="token-stat-number" data-target="12.5">0</span>%</div>
                        <div className="text-[10px] text-[#888888] uppercase tracking-widest font-mono">Staking APY</div>
                    </div>
                </div>
            </div>

            {/* Utility List */}
            <div className="bg-[#030303] p-8 md:p-24 flex flex-col justify-center reveal order-1 md:order-2">
                <h3 className="font-display text-2xl md:text-3xl font-semibold mb-8 tracking-tight text-white uppercase italic">Token Utility ($ATH)</h3>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00ffa3] font-semibold font-mono shrink-0">1</div>
                        <div className="">
                            <h4 className="font-semibold text-white text-lg uppercase italic">Network Fees</h4>
                            <p className="text-sm md:text-base text-[#888888] italic">Used to pay for transactions and smart contract execution across the mesh.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00ffa3] font-semibold font-mono shrink-0">2</div>
                        <div className="">
                            <h4 className="font-semibold text-white text-lg uppercase italic">Governance</h4>
                            <p className="text-sm md:text-base text-[#888888] italic">Vote on protocol upgrades, treasury allocation, and parameter adjustments.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#00ffa3] font-semibold font-mono shrink-0">3</div>
                        <div className="">
                            <h4 className="font-semibold text-white text-lg uppercase italic">Validator Staking</h4>
                            <p className="text-sm md:text-base text-[#888888] italic">Secure the network by delegating to validators and earning yield.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="tech-separator" aria-hidden="true"></div>

        {/* ROADMAP */}
        <section id="roadmap" className="py-16 md:py-24 bg-[#030303]" aria-label="Development Roadmap">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-12 md:gap-16">
                    <div className="md:w-1/3 reveal">
                        <div className="inline-block px-3 py-1 border border-white/10 bg-white/5 rounded-full mb-6 font-mono">
                            <span className="text-[10px] text-[#00ffa3] uppercase tracking-widest italic">Execution Log</span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 tracking-tight text-white uppercase italic">Strategic<br/>Roadmap</h2>
                        <p className="text-[#888888] text-sm md:text-base leading-relaxed mb-8 italic">
                            Aetheris is deployed in sequential phases to ensure network stability and security. We are currently in Phase 2.
                        </p>
                    </div>
                    <div className="md:w-2/3 space-y-0 relative border-l border-white/10 ml-2 md:ml-0">
                        <div className="relative pl-8 md:pl-10 pb-12 reveal group">
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#00ffa3] rounded-full shadow-[0_0_10px_#00ffa3]"></div>
                            <div className="border border-white/10 bg-[#080808]/50 p-6 hover:bg-[#080808] transition-colors">
                                <h3 className="font-semibold text-lg text-white mb-2 uppercase italic">Genesis &amp; Foundation</h3>
                                <p className="text-xs text-[#888888] italic">Mainnet Alpha, TGE, and Audits completed.</p>
                            </div>
                        </div>
                        <div className="relative pl-8 md:pl-10 pb-12 reveal group">
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-white border-2 border-[#030303]"></div>
                            <div className="absolute -left-[9px] top-1 w-4.5 h-4.5 border border-[#00ffa3] rounded-full animate-ping opacity-50"></div>
                            <div className="border border-[#00ffa3]/30 bg-[#00ffa3]/5 p-6 relative overflow-hidden">
                                <div className="flex justify-between items-start mb-2 relative z-10 font-mono">
                                    <span className="text-xs text-white uppercase tracking-widest italic">PHASE 02 — IN PROGRESS</span>
                                    <span className="text-[9px] bg-[#00ffa3] text-[#030303] px-2 py-0.5 font-bold rounded uppercase">LIVE</span>
                                </div>
                                <h3 className="font-semibold text-lg text-white mb-4 relative z-10 uppercase italic">Ecosystem Expansion</h3>
                                <p className="text-xs text-white/70 italic">Rolling out the Aetheris DEX, Mobile Wallet, and Governance DAO.</p>
                            </div>
                        </div>
                        <div className="relative pl-8 md:pl-10 reveal group">
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-[#080808] border border-[#888888]"></div>
                            <div className="border border-white/10 border-dashed bg-transparent p-6 opacity-60 hover:opacity-100 transition-opacity">
                                <h3 className="font-semibold text-lg text-gray-400 mb-2 uppercase italic">Global Sovereignty</h3>
                                <p className="text-xs text-[#888888] italic">Full decentralization of the sequencer and satellite integration.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="tech-separator" aria-hidden="true"></div>

        {/* NETWORK INFRASTRUCTURE */}
        <section id="network" className="py-16 md:py-24 bg-[#030303]" aria-label="Global Network Statistics">
            <div className="max-w-[1920px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left: Cinematic Node Map */}
                    <div className="lg:col-span-8 border border-white/10 bg-[#080808] p-2 relative overflow-hidden reveal min-h-[400px] md:min-h-[500px]">
                        
                        {/* Fixed Image: Deep Data Servers */}
                        <div className="absolute inset-0 z-0">
                            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3e590790-e144-4deb-9989-37794b67c60e_1600w.webp" alt="Decentralized Global Validator Node Server Network" className="w-full h-full object-cover opacity-40 grayscale brightness-75 contrast-125" />
                        </div>

                        {/* CSS Radar Scan Overlay */}
                        <div className="scan-line z-10 pointer-events-none"></div>
                        
                        {/* Overlay UI */}
                        <div className="relative z-20 p-6 md:p-8 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <div className="bg-[#030303]/80 backdrop-blur-md p-4 border border-white/10 text-white">
                                    <h2 className="font-display text-xl md:text-2xl font-semibold mb-1 tracking-tight uppercase italic">Live Topology</h2>
                                    <p className="text-[#888888] text-[10px] font-mono tracking-widest uppercase italic">STATUS: SYNCHRONIZED</p>
                                </div>
                                <div className="flex gap-2 font-mono">
                                    <div className="w-2 h-2 bg-[#00ffa3] rounded-full animate-pulse"></div>
                                    <div className="text-[10px] text-[#00ffa3] hidden md:block uppercase tracking-widest italic">UPLINK ACTIVE</div>
                                </div>
                            </div>

                            {/* Hotspots */}
                            <div className="absolute top-[30%] left-[20%] w-20 h-20 md:w-32 md:h-32 border border-[#00ffa3]/20 rounded-full flex items-center justify-center animate-pulse">
                                <div className="w-1 h-1 bg-[#00ffa3] rounded-full"></div>
                            </div>
                             <div className="absolute bottom-[20%] right-[30%] w-16 h-16 md:w-24 md:h-24 border border-[#00ffa3]/10 rounded-full flex items-center justify-center animate-pulse delay-700">
                                <div className="w-1 h-1 bg-[#00ffa3] rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Node Stats */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-[#030303] border border-white/10 p-6 reveal h-full flex flex-col justify-center">
                            <h3 className="font-semibold text-white mb-6 text-sm uppercase flex items-center gap-2 tracking-widest font-mono">
                                <span className="w-2 h-2 bg-[#00ffa3] rounded-sm"></span>
                                Network Health
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-[#080808] border border-white/10 font-mono">
                                    <span className="text-xs text-[#888888] uppercase tracking-widest">Active Validators</span>
                                    <span className="text-white font-semibold italic">4,120</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-[#080808] border border-white/10 font-mono">
                                    <span className="text-xs text-[#888888] uppercase tracking-widest">Global Latency</span>
                                    <span className="text-[#00ffa3] font-semibold italic">12ms</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-[#080808] border border-white/10 font-mono">
                                    <span className="text-xs text-[#888888] uppercase tracking-widest">Total Staked</span>
                                    <span className="text-white font-semibold italic">450M ATH</span>
                                </div>
                            </div>
                            <div className="mt-8 font-mono">
                                <div className="text-[10px] text-[#888888] mb-2 uppercase tracking-widest italic">Region Distribution</div>
                                <div className="flex gap-1 h-2 w-full">
                                    <div className="h-full bg-[#00ffa3] w-[40%]"></div>
                                    <div className="h-full bg-[#00ffa3]/70 w-[30%]"></div>
                                    <div className="h-full bg-[#00ffa3]/40 w-[20%]"></div>
                                    <div className="h-full bg-[#00ffa3]/20 w-[10%]"></div>
                                </div>
                                <div className="flex justify-between text-[9px] text-gray-600 mt-1 uppercase tracking-widest italic">
                                    <span>NA</span>
                                    <span>EU</span>
                                    <span>ASIA</span>
                                    <span>SA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="tech-separator" aria-hidden="true"></div>

        {/* DIGITAL SINGULARITY */}
        <section className="py-24 md:py-32 bg-[#080808] relative overflow-hidden flex flex-col items-center justify-center h-[70vh] md:h-[90vh]" aria-label="Infinite Scalability Animation">
            <div className="absolute inset-0 opacity-10 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/aa933a24-d4de-4c67-83f6-b8676b3bab35_1600w.webp)] bg-cover bg-center"></div>
            
            <div className="singularity-wrapper">
                {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200].map((s, i) => (
                    <div key={i} className="tunnel-ring" style={{ width: s, height: s, animationDelay: `${i * 0.5}s` }}></div>
                ))}
            </div>

            <div className="relative z-10 text-center reveal pointer-events-none px-6">
                <span className="text-[#00ffa3] font-mono text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase bg-black/50 backdrop-blur-md px-4 py-1 rounded-full border border-[#00ffa3]/20 italic">The Singularity</span>
                <h2 className="font-display text-4xl md:text-8xl font-bold mt-6 text-white mix-blend-difference tracking-tight uppercase italic">
                    INFINITE SCALE
                </h2>
                <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mt-6 bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/5 italic">
                    A consensus mechanism that gets faster as the network grows. The more usage, the higher the throughput.
                </p>
            </div>
        </section>

        <div className="tech-separator" aria-hidden="true"></div>

        {/* PURPOSE & VISION */}
        <section className="pt-16 md:pt-24 pb-16 md:pb-24" aria-label="Mission Statement" id="vision">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16 items-center">
                    <div className="md:w-1/2 reveal">
                        <div className="inline-block px-3 py-1 border border-white/10 bg-white/5 rounded-full mb-6 font-mono">
                            <span className="text-[10px] text-[#00ffa3] uppercase tracking-widest italic">Our Mandate</span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 tracking-tight text-white uppercase italic">Prophecy &amp; Purpose</h2>
                        <p className="text-[#888888] text-sm md:text-base leading-relaxed mb-6 italic">
                            Aetheris was born from a vision of true digital autonomy. We believe in a future where value is exchanged freely, securely, and without intermediaries, empowering individuals and fostering global innovation.
                        </p>
                        <p className="text-[#888888] text-sm md:text-base leading-relaxed italic">
                            Our protocol is not merely a technical advancement; it is a foundational layer for a new era of decentralized applications, digital identities, and sovereign economies.
                        </p>
                    </div>
                    <div className="md:w-1/2 reveal">
                        {/* Fixed Image: Digital Neural Network */}
                        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/fa050e23-c777-40ee-aabe-cc76269a2e47_1600w.jpg" alt="Abstract digital neural network and blockchain mesh connectivity" className="w-full h-auto object-cover rounded-xl border border-white/10 shadow-xl grayscale hover:grayscale-0 transition-all duration-500" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/10 p-6 md:p-8 bg-[#080808] reveal italic">
                    <div className="space-y-6 text-[#888888] text-sm md:text-base leading-relaxed border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
                        <p className="">
                            The current internet infrastructure, while transformative, has become centralized and prone to data silos, censorship, and control by a few dominant entities. Our mission is to dismantle these barriers, building a new public good that is resilient, fair, and accessible to all. We are architects of digital freedom.
                        </p>
                        <ul className="space-y-2 pl-4 border-l border-[#00ffa3]/30 font-mono">
                            <li className="flex items-start gap-2 text-white font-semibold uppercase text-xs tracking-widest">Decentralized Foundation</li>
                            <li className="flex items-start gap-2 text-white font-semibold uppercase text-xs tracking-widest">Inclusive Access</li>
                            <li className="flex items-start gap-2 text-white font-semibold uppercase text-xs tracking-widest">Innovation Catalyst</li>
                        </ul>
                    </div>
                    <div className="space-y-6 text-[#888888] text-sm md:text-base leading-relaxed md:pl-8">
                        {/* Fixed Image: Quantum Processor */}
                        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/89dadee1-b89d-415a-a6c9-b3d01200c4cd_1600w.jpg" alt="Quantum computing processor chip for cryptography" className="w-full h-auto object-cover rounded-md border border-white/10 shadow-md grayscale hover:grayscale-0 transition-all duration-500" />
                        <p className="">
                            Every line of code, every design decision, and every community initiative is guided by this overarching philosophy. We envision a future where Aetheris is not just a platform, but a global operating system for a more equitable and open digital world.
                        </p>
                        <a href="#" className="text-[#00ffa3] text-sm font-semibold uppercase tracking-widest flex items-center gap-2 hover:underline font-mono italic">
                            Explore Our Manifesto <span className="text-lg">→</span>
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
                <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-8 text-white italic">
                    Join the  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00ffa3]">Revolution</span>
                </h2>
                
                <p className="font-mono text-sm md:text-base text-gray-400 mb-10 max-w-lg mx-auto italic uppercase tracking-widest">
                    &gt; Governance is live.<br/>
                    &gt; Be part of the consensus.<br/>
                    &gt; Claim your sovereignty.
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <button className="bg-[#00ffa3] text-[#030303] px-10 py-4 font-semibold uppercase hover:shadow-[0_0_20px_rgba(0,255,163,0.5)] transition-shadow tracking-widest font-mono italic">
                        Join Discord
                    </button>
                    <button className="bg-transparent border border-white/20 text-white px-10 py-4 font-semibold uppercase hover:bg-white/10 transition-colors tracking-widest font-mono italic">
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
                        <div className="flex gap-2 mb-4 items-center">
                            <span className="text-lg font-medium text-white font-display uppercase tracking-tighter italic">Aetheris</span>
                        </div>
                        <p className="text-[#888888] text-xs leading-relaxed max-w-xs italic">
                            Architecting the invisible layer of trust for the next generation of decentralized applications.
                        </p>
                    </div>
                    
                    <div className="">
                        <h5 className="text-white font-medium text-sm mb-4 uppercase font-mono tracking-widest italic">Ecosystem</h5>
                        <ul className="space-y-2.5 text-[10px] text-[#888888] font-mono uppercase tracking-[0.2em] italic">
                            <li className=""><a href="#" className="hover:text-[#00ffa3] transition-colors">Block Explorer</a></li>
                            <li><a href="#" className="hover:text-[#00ffa3] transition-colors">Governance Forum</a></li>
                        </ul>
                    </div>

                    <div className="">
                        <h5 className="text-white font-medium text-sm mb-4 uppercase font-mono tracking-widest italic">Developers</h5>
                        <ul className="space-y-2.5 text-[10px] text-[#888888] font-mono uppercase tracking-[0.2em] italic">
                            <li className=""><a href="#" className="hover:text-[#00ffa3] transition-colors">Documentation</a></li>
                            <li className=""><a href="#" className="hover:text-[#00ffa3] transition-colors">Github</a></li>
                        </ul>
                    </div>

                    <div className="">
                        <h5 className="text-white font-medium text-sm mb-4 uppercase font-mono tracking-widest italic">Social</h5>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 flex items-center justify-center text-[#888888] hover:text-white transition-colors border border-white/5 hover:border-white/20 rounded-full">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 font-mono">
                    <p className="text-[10px] text-[#888888] uppercase tracking-wider italic">© 2024 Aetheris Foundation. All rights reserved.</p>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00ffa3] shadow-[0_0_8px_#00ffa3] animate-pulse"></div>
                        <span className="text-[10px] text-[#00ffa3] uppercase tracking-widest italic">System Operational</span>
                    </div>
                </div>
            </div>
        </footer>
      </div>
    </>
  );
}
