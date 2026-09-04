'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const services = [
  {
    name: 'Pentest Interne',
    tag: 'RÉSEAU',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_15px_rgba(118,166,209,0.1)]',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    tags: ['Réseau', 'Active Directory', 'Lateral Movement'],
    description: 'Simulation d\'attaque depuis l\'intérieur du réseau pour identifier les mouvements latéraux, escalades de privilèges et accès non autorisés aux systèmes critiques.',
    enjeu: 'Une menace interne non détectée peut chiffrer l\'intégralité du parc en moins de 24h.',
    href: '/pentest-interne',
  },
  {
    name: 'Pentest Externe',
    tag: 'EXPOSITION',
    accent: 'text-sky-400',
    border: 'border-sky-500/30',
    glow: 'shadow-[0_0_15px_rgba(118,166,209,0.1)]',
    badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    tags: ['VPN', 'RDP', 'API', 'Applications Web'],
    description: 'Cartographie et exploitation des points d\'entrée exposés publiquement — VPN, RDP, applications web, API — avant qu\'un attaquant ne les découvre.',
    enjeu: 'La surface d\'attaque externe est le premier vecteur d\'intrusion pour 80 % des incidents.',
    href: '/pentest-externe',
  },
  {
    name: 'Pentest Web / Mobile',
    tag: 'APPLICATIF',
    accent: 'text-teal-400',
    border: 'border-teal-500/30',
    glow: 'shadow-[0_0_15px_rgba(20,184,166,0.1)]',
    badgeBg: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
    tags: ['Injection', 'Auth', 'Logique Métier', 'API'],
    description: 'Audit approfondi des applications métier accessibles aux utilisateurs, clients ou partenaires. Injection, authentification, logique métier, API.',
    enjeu: 'Une faille applicative peut exposer les données clients et déclencher des obligations RGPD.',
    href: '/pentest-web-mobile',
  },
  {
    name: 'Test de Résistance Ransomware',
    tag: 'RANSOMWARE',
    accent: 'text-orange-400',
    border: 'border-orange-500/30',
    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.1)]',
    badgeBg: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
    tags: ['Sauvegardes', 'Cloisonnement', 'EDR', 'PCA'],
    description: 'Évaluation de la capacité de votre organisation à détecter, contenir et survivre à une attaque par ransomware. Sauvegardes, cloisonnement, EDR.',
    enjeu: 'Le coût moyen d\'un ransomware en 2024 dépasse 1,5 M€ pour une PME française.',
    href: '/pentest-interne',
  },
];

const riskMatrix = [
  { vecteur: 'Ransomware', pentest_int: true, pentest_ext: false, pentest_web: false, ransomware: true, description: 'Chiffrement des systèmes et arrêt de production' },
  { vecteur: 'Mouvement latéral', pentest_int: true, pentest_ext: false, pentest_web: false, ransomware: true, description: 'Propagation silencieuse dans le réseau interne' },
  { vecteur: 'Fuite de données', pentest_int: true, pentest_ext: true, pentest_web: true, ransomware: false, description: 'Exfiltration de données clients ou opérationnelles' },
  { vecteur: 'Injection / RCE', pentest_int: false, pentest_ext: true, pentest_web: true, ransomware: false, description: 'Exécution de code arbitraire sur les serveurs' },
  { vecteur: 'Compromission VPN', pentest_int: false, pentest_ext: true, pentest_web: false, ransomware: false, description: 'Accès non autorisé via les accès distants' },
  { vecteur: 'Vol de credentials', pentest_int: true, pentest_ext: true, pentest_web: true, ransomware: true, description: 'Utilisation de comptes légitimes compromis' },
];

export default function ProtegerChiffreAffairesPage() {
  return (
    <div className="relative min-h-screen antialiased text-white selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
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
            <a href="/cybersecurite-operationnelle" className="inline-flex items-center gap-2 text-sm text-white hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Cybersécurité Opérationnelle
            </a>
          </div>
        </section>

        {/* Hero */}
        <section className="relative pt-8 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">
                Cybersécurité Opérationnelle — Pilier 1
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                Pentest &amp; Sécurité des Systèmes Critiques
              </h1>
              <p className="text-lg md:text-xl text-white font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-6">
                Une faille non détectée peut stopper votre production, bloquer vos accès et déclencher une crise en quelques heures. Chaque service de ce pilier teste ce qui peut bloquer votre activité — réseau, applications, postes de travail, accès distants.
              </p>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-400">Services</span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent" />
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-white text-sm">
                {['Pentest Interne', 'Pentest Externe', 'Pentest Web / Mobile', 'Ransomware', 'EDR', 'Active Directory', 'VPN', 'API', 'PCA', 'SOC'].map((s) => (
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
              <h2 className="text-4xl font-light text-white tracking-tight">Pentest Entreprise en France : Services Inclus</h2>
              <span className="text-cyan-500 font-mono text-xs">01 // SERVICES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <a key={service.name} href={service.href} className={`tilt-card group relative z-10 p-1`}>
                  <div className={`glass-panel h-full p-8 rounded-xl relative overflow-hidden ${service.border} ${service.glow} hover:border-opacity-60 transition-all`}>
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
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

        {/* Matrice risques */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h2 className="text-4xl font-light text-white tracking-tight">Couverture des Risques par Type de Pentest</h2>
              <span className="text-cyan-500 font-mono text-xs">02 // RISQUES</span>
            </div>
            <div className="glass-panel rounded-xl border border-white/5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40">
                    <th className="text-left px-6 py-4 font-semibold text-white w-48">Vecteur d&apos;attaque</th>
                    <th className="text-center px-4 py-4 font-semibold text-cyan-400">Pentest Int.</th>
                    <th className="text-center px-4 py-4 font-semibold text-sky-400">Pentest Ext.</th>
                    <th className="text-center px-4 py-4 font-semibold text-teal-400">Web / Mobile</th>
                    <th className="text-center px-4 py-4 font-semibold text-orange-400">Ransomware</th>
                    <th className="text-left px-6 py-4 font-semibold text-white hidden lg:table-cell">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {riskMatrix.map((row, i) => (
                    <tr key={row.vecteur} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="px-6 py-4 font-semibold text-white">{row.vecteur}</td>
                      <td className="text-center px-4 py-4">
                        {row.pentest_int ? <CheckCircle className="w-5 h-5 text-cyan-400 mx-auto" /> : <span className="text-white text-lg">—</span>}
                      </td>
                      <td className="text-center px-4 py-4">
                        {row.pentest_ext ? <CheckCircle className="w-5 h-5 text-sky-400 mx-auto" /> : <span className="text-white text-lg">—</span>}
                      </td>
                      <td className="text-center px-4 py-4">
                        {row.pentest_web ? <CheckCircle className="w-5 h-5 text-teal-400 mx-auto" /> : <span className="text-white text-lg">—</span>}
                      </td>
                      <td className="text-center px-4 py-4">
                        {row.ransomware ? <CheckCircle className="w-5 h-5 text-orange-400 mx-auto" /> : <span className="text-white text-lg">—</span>}
                      </td>
                      <td className="px-6 py-4 text-white text-xs hidden lg:table-cell">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ — Featured Snippets: pentest entreprise prix / test intrusion France */}
        <section className="py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-light text-white mb-10 tracking-tight">Questions fréquentes — Pentest Entreprise &amp; Test d&apos;Intrusion en France</h2>
            <div className="space-y-4">
              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Quel est le prix d&apos;un pentest entreprise en France ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">Le prix d&apos;un pentest entreprise en France dépend du périmètre : un pentest externe démarre généralement à partir de 3 500 €, un pentest interne entre 5 000 € et 15 000 €, et un pentest web/mobile entre 2 500 € et 8 000 €. SecuriTrust propose des offres à résultat garanti adaptées aux budgets PME et ETI, avec un rapport livré en 5 à 10 jours ouvrés.</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Qu&apos;est-ce qu&apos;un test d&apos;intrusion entreprise ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">Un test d&apos;intrusion (ou pentest) est une simulation d&apos;attaque informatique autorisée, réalisée par des experts certifiés OSCP, pour identifier les vulnérabilités exploitables dans votre système d&apos;information. En France, il est recommandé par l&apos;ANSSI et exigé par certains référentiels (ISO 27001, NIS2, DORA, HDS).</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Pourquoi faire un test d&apos;intrusion en France pour une PME ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">Les PME françaises représentent 60 % des victimes de cyberattaques. Un test d&apos;intrusion permet d&apos;identifier les failles avant un ransomware ou une exfiltration de données, d&apos;obtenir des livrables pour les assureurs cyber, et de démontrer sa conformité aux partenaires et clients.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight relative z-10">
                Sécurisez votre activité avec un test d&apos;intrusion professionnel
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto relative z-10">
                Identifiez les failles qui menacent votre production avant qu&apos;un attaquant ne les exploite.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a
                  href="https://calendly.com/expert-securitrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)] hover:shadow-[0_0_30px_rgba(118,166,209,0.5)]"
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
