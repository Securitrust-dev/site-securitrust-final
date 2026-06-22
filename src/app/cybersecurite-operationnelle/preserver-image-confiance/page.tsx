'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const services = [
  {
    name: 'OSINT',
    tag: 'EXPOSITION',
    accent: 'text-violet-400',
    border: 'border-violet-500/30',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.1)]',
    badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    tags: ['Données publiques', 'Comptes exposés', 'Dark Web'],
    description: 'Cartographie exhaustive de votre exposition publique — données accessibles, comptes exposés, informations sensibles indexées — avant qu\'un attaquant ne les exploite.',
    enjeu: 'Vos données sont peut-être déjà disponibles sur le dark web sans que vous le sachiez.',
    href: '/osint',
  },
  {
    name: 'Campagnes de Phishing',
    tag: 'INGÉNIERIE SOCIALE',
    accent: 'text-pink-400',
    border: 'border-pink-500/30',
    glow: 'shadow-[0_0_15px_rgba(236,72,153,0.1)]',
    badgeBg: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
    tags: ['Spear Phishing', 'Vishing', 'Sensibilisation'],
    description: 'Simulation d\'attaques d\'ingénierie sociale ciblant vos collaborateurs pour mesurer la résistance humaine et identifier les vecteurs d\'intrusion les plus probables.',
    enjeu: '91 % des cyberattaques commencent par un e-mail de phishing ciblant un employé.',
    href: '/pentest-interne',
  },
  {
    name: 'Pentest Externe',
    tag: 'SURFACE D\'ATTAQUE',
    accent: 'text-fuchsia-400',
    border: 'border-fuchsia-500/30',
    glow: 'shadow-[0_0_15px_rgba(217,70,239,0.1)]',
    badgeBg: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20',
    tags: ['Reconnaissance', 'Exposition Internet', 'API'],
    description: 'Identification des portes d\'entrée visibles depuis Internet susceptibles d\'être exploitées pour compromettre votre infrastructure et accéder à des données sensibles.',
    enjeu: 'Une compromission publique nuit immédiatement à votre image et peut déclencher des sanctions réglementaires.',
    href: '/pentest-externe',
  },
  {
    name: 'Red Team',
    tag: 'APT SIMULATION',
    accent: 'text-rose-400',
    border: 'border-rose-500/30',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.1)]',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    tags: ['Multi-vecteurs', 'APT', 'Détection', 'Réponse'],
    description: 'Scénario d\'attaque réaliste multi-vecteurs simulant un adversaire avancé (APT). Teste l\'ensemble de votre posture défensive : détection, réponse, cloisonnement.',
    enjeu: 'Un adversaire réel n\'utilise qu\'un seul vecteur — le Red Team teste votre résistance globale.',
    href: '/red-team',
  },
];

const attackVectors = [
  { vecteur: 'Fuite de données clients', osint: true, phishing: false, pentest: true, redteam: true, description: 'Exposition de données personnelles ou contractuelles' },
  { vecteur: 'Compte dirigeant compromis', osint: true, phishing: true, pentest: false, redteam: true, description: 'Usurpation d\'identité ou fraude au président' },
  { vecteur: 'Credential stuffing', osint: true, phishing: true, pentest: true, redteam: false, description: 'Réutilisation de mots de passe exposés' },
  { vecteur: 'Défacement de site', osint: false, phishing: false, pentest: true, redteam: false, description: 'Modification du site public — atteinte directe à l\'image' },
  { vecteur: 'Campagne d\'extorsion', osint: true, phishing: true, pentest: false, redteam: true, description: 'Menace de divulgation de données exfiltrées' },
  { vecteur: 'Intrusion réseau silencieuse', osint: false, phishing: true, pentest: true, redteam: true, description: 'Présence prolongée avant toute action visible' },
];

export default function PreserverImageConfiancePage() {
  return (
    <div className="relative min-h-screen antialiased text-white selection:bg-violet-500 selection:text-white" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60" />
        <div className="stars opacity-20" />
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* Breadcrumb */}
        <section className="pt-28 pb-0 px-6">
          <div className="max-w-7xl mx-auto">
            <a href="/cybersecurite-operationnelle" className="inline-flex items-center gap-2 text-sm text-white hover:text-violet-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Cybersécurité Opérationnelle
            </a>
          </div>
        </section>

        {/* Hero */}
        <section className="relative pt-8 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-violet-400 tracking-[0.2em] text-xs uppercase mb-4">
                Cybersécurité Opérationnelle — Pilier 2
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                Gestion des Risques Cyber &amp; Protection de la Réputation
              </h1>
              <p className="text-lg md:text-xl text-white font-light tracking-wide border-l-2 border-violet-500 pl-6 text-left mb-6">
                Une donnée qui fuite, un compte compromis exposé publiquement ou une campagne de phishing ciblant vos collaborateurs — votre réputation est en jeu. Ce pilier cible tout ce qui peut fuiter ou être weaponisé contre votre marque.
              </p>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-violet-400">Services</span>
              <div className="h-px w-12 bg-gradient-to-r from-violet-500/60 to-transparent" />
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-white text-sm">
                {['OSINT', 'Phishing', 'Red Team', 'APT', 'Dark Web', 'Réputation', 'Image', 'Spear Phishing', 'Pentest Externe', 'Exposition'].map((s) => (
                  <span key={s} className="uppercase tracking-[0.25em] text-xs">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h2 className="text-4xl font-light text-white tracking-tight">Sécurité Informatique PME : Services de Protection Réputationnelle</h2>
              <span className="text-violet-500 font-mono text-xs">01 // SERVICES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <a key={service.name} href={service.href} className="tilt-card group relative z-10 p-1">
                  <div className={`glass-panel h-full p-8 rounded-xl relative overflow-hidden ${service.border} ${service.glow} hover:border-opacity-60 transition-all`}>
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all" />
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-medium text-white">{service.name}</h3>
                      <span className={`px-2.5 py-1 text-xs font-bold border rounded-md ${service.badgeBg}`}>{service.tag}</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed mb-5">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.tags.map((tag) => (
                        <span key={tag} className={`px-2.5 py-1 text-xs font-semibold border rounded-md ${service.badgeBg}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-xs text-white uppercase tracking-wide mb-1 font-semibold">Enjeu clé</p>
                      <p className="text-sm text-white leading-relaxed">{service.enjeu}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Matrice vecteurs */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h2 className="text-4xl font-light text-white tracking-tight">Vecteurs d&apos;Attaque Couverts par Service de Cybersécurité</h2>
              <span className="text-violet-500 font-mono text-xs">02 // VECTEURS</span>
            </div>
            <div className="glass-panel rounded-xl border border-white/5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40">
                    <th className="text-left px-6 py-4 font-semibold text-white w-56">Scénario de risque</th>
                    <th className="text-center px-4 py-4 font-semibold text-violet-400">OSINT</th>
                    <th className="text-center px-4 py-4 font-semibold text-pink-400">Phishing</th>
                    <th className="text-center px-4 py-4 font-semibold text-fuchsia-400">Pentest Ext.</th>
                    <th className="text-center px-4 py-4 font-semibold text-rose-400">Red Team</th>
                    <th className="text-left px-6 py-4 font-semibold text-white hidden lg:table-cell">Impact réputationnel</th>
                  </tr>
                </thead>
                <tbody>
                  {attackVectors.map((row, i) => (
                    <tr key={row.vecteur} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="px-6 py-4 font-semibold text-white">{row.vecteur}</td>
                      <td className="text-center px-4 py-4">
                        {row.osint ? <CheckCircle className="w-5 h-5 text-violet-400 mx-auto" /> : <span className="text-white text-lg">—</span>}
                      </td>
                      <td className="text-center px-4 py-4">
                        {row.phishing ? <CheckCircle className="w-5 h-5 text-pink-400 mx-auto" /> : <span className="text-white text-lg">—</span>}
                      </td>
                      <td className="text-center px-4 py-4">
                        {row.pentest ? <CheckCircle className="w-5 h-5 text-fuchsia-400 mx-auto" /> : <span className="text-white text-lg">—</span>}
                      </td>
                      <td className="text-center px-4 py-4">
                        {row.redteam ? <CheckCircle className="w-5 h-5 text-rose-400 mx-auto" /> : <span className="text-white text-lg">—</span>}
                      </td>
                      <td className="px-6 py-4 text-white text-xs hidden lg:table-cell">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-violet-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 to-transparent pointer-events-none" />
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight relative z-10">
                Protégez votre réputation proactivement
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto relative z-10">
                Mesurez votre exposition réelle avant qu&apos;un incident n&apos;impacte la confiance de vos clients et partenaires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a
                  href="https://calendly.com/expert-securitrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                >
                  Échanger avec un expert
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/cybersecurite-operationnelle"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all"
                >
                  Voir les autres piliers
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
