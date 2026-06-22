'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, ArrowRight, ArrowLeft, Box, Cpu } from 'lucide-react';

const rssiSmsi = [
  'Définition et suivi de la politique de sécurité',
  'Animation du Comité Sécurité (COSEC)',
  'Gestion des risques (EBIOS RM / ISO 27005)',
  'Suivi des indicateurs et tableau de bord RSSI',
  'Préparation et suivi des certifications (ISO 27001, TISAX...)',
  'Gestion des incidents et crises de sécurité',
];

const rssiCloud = [
  'Définition de la politique Cloud Security',
  'Évaluation de la posture cloud (AWS, Azure, GCP)',
  'Gestion des identités et accès (IAM / CIEM)',
  'Conformité CIS Cloud Benchmarks',
  'Gouvernance des tiers cloud (DORA, contractualisation)',
];

const rssiModalites = [
  { label: 'Temps partiel mensuel', value: '2 à 8 jours/mois selon les besoins' },
  { label: 'Engagement', value: 'Contrat de service mensuel résiliable' },
  { label: 'Format', value: 'Présentiel + distanciel' },
  { label: 'Livrables', value: 'Tableau de bord, comptes-rendus COSEC, rapports de risques' },
];

const dpoDpa = [
  'Tenue et mise à jour du registre des traitements',
  'Rédaction et négociation des DPA (Data Processing Agreements)',
  'Analyse d\'impact (AIPD / DPIA) pour les traitements à risque',
  'Gestion des violations de données (notification CNIL)',
  'Réponse aux demandes d\'exercice de droits (accès, effacement...)',
  'Interlocution officielle avec la CNIL',
];

const dpoSensibilisation = [
  'Sessions de sensibilisation RGPD pour les équipes',
  'Formation des référents données (Data Champions)',
  'Intégration de la protection des données dès la conception (Privacy by Design)',
  'Communication interne sur les bonnes pratiques',
];

const dpoModalites = [
  { label: 'Désignation officielle', value: 'Déclaration CNIL en tant que DPO désigné' },
  { label: 'Temps alloué', value: 'Adapté au volume et à la sensibilité des traitements' },
  { label: 'Format', value: 'Distanciel + présence sur site si nécessaire' },
  { label: 'Livrables', value: 'Registre, DPIA, rapport annuel DPO, DPA types' },
];

export default function ServicesExternalisesPage() {
  return (
    <div className="relative min-h-screen antialiased text-white selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60" />
        <div className="stars opacity-20" />
      </div>
      <div className="absolute top-1/4 left-10 opacity-20 animate-float hidden md:block" style={{ animationDelay: '0s' }}>
        <Box className="w-24 h-24 text-cyan-500" />
      </div>
      <div className="absolute bottom-1/3 right-20 opacity-20 animate-float hidden md:block" style={{ animationDelay: '2s' }}>
        <Cpu className="w-16 h-16 text-cyan-500" />
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* Breadcrumb */}
        <section className="pt-28 pb-0 px-6">
          <div className="max-w-7xl mx-auto">
            <a href="/gouvernance-conformite" className="inline-flex items-center gap-2 text-sm text-white hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Gouvernance &amp; Conformité
            </a>
          </div>
        </section>

        {/* Hero */}
        <section className="relative pt-8 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">
                Gouvernance &amp; Conformité
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                SERVICES EXTERNALISÉS
              </h1>
              <p className="text-lg md:text-xl text-white font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-8">
                Un RSSI ou un DPO à temps plein coûte entre 80 000 et 120 000 €/an. L&apos;externalisation permet d&apos;accéder à la même expertise, calibrée au besoin réel de l&apos;organisation, avec une réactivité immédiate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <a href="/contact?service=accompagnement" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)]">
                  Je souscris à mon accompagnement
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/contact?service=audit" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all">
                  Je souscris à mon audit
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
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
                {['RSSI à temps partagé', 'DPO externalisé', 'Pilotage SMSI', 'Cloud Security', 'RGPD', 'DPA', 'CNIL', 'ISO 27001', 'EBIOS RM'].map((ref) => (
                  <span key={ref} className="uppercase tracking-[0.25em] text-xs">{ref}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RSSI */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-4xl font-light text-white tracking-tight">RSSI à temps partagé</h3>
                <p className="text-white text-sm mt-2">Pilotez la sécurité sans recruter un profil senior à plein temps.</p>
              </div>
              <span className="text-cyan-500 font-mono text-xs">01 // RSSI</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Focus SMSI */}
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-cyan-500/30 shadow-[0_0_15px_rgba(118,166,209,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
                  <h4 className="text-xl font-bold text-cyan-400 mb-6">Pilotage SMSI</h4>
                  <ul className="space-y-3">
                    {rssiSmsi.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Focus Cloud */}
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-sky-500/30 shadow-[0_0_15px_rgba(118,166,209,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all" />
                  <h4 className="text-xl font-bold text-sky-400 mb-6">Sécurité Cloud</h4>
                  <ul className="space-y-3 mb-8">
                    {rssiCloud.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white">
                        <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {/* Modalités */}
                  <div className="border-t border-white/10 pt-6 space-y-3">
                    <p className="text-xs text-white uppercase tracking-wide font-semibold mb-3">Modalités d&apos;intervention</p>
                    {rssiModalites.map((m) => (
                      <div key={m.label} className="flex justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-white">{m.label}</span>
                        <span className="text-white font-medium text-right ml-4">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Logique métier RSSI */}
            <div className="mt-8 glass-panel p-6 rounded-xl border border-cyan-500/20">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-cyan-400 uppercase tracking-widest font-semibold mb-1">Logique métier</p>
                  <p className="text-sm text-white leading-relaxed">
                    Une ETI ou une PME n&apos;a pas besoin d&apos;un RSSI 5 jours sur 5. Elle a besoin d&apos;une décision de sécurité juste, au bon moment, portée par quelqu&apos;un qui connaît l&apos;organisation. Le RSSI externalisé garantit cette présence sans le coût fixe d&apos;un recrutement senior.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a href="/contact" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)]">
                Discuter du besoin RSSI
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* DPO */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-4xl font-light text-white tracking-tight">DPO externalisé</h3>
                <p className="text-white text-sm mt-2">Respectez le RGPD sans dédier une ressource interne à plein temps.</p>
              </div>
              <span className="text-cyan-500 font-mono text-xs">02 // DPO</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* DPA */}
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all" />
                  <h4 className="text-xl font-bold text-violet-400 mb-6">Data Protection &amp; DPA</h4>
                  <ul className="space-y-3">
                    {dpoDpa.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white">
                        <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sensibilisation */}
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all" />
                  <h4 className="text-xl font-bold text-pink-400 mb-6">Sensibilisation &amp; Culture Data</h4>
                  <ul className="space-y-3 mb-8">
                    {dpoSensibilisation.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white">
                        <CheckCircle className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {/* Modalités */}
                  <div className="border-t border-white/10 pt-6 space-y-3">
                    <p className="text-xs text-white uppercase tracking-wide font-semibold mb-3">Modalités d&apos;intervention</p>
                    {dpoModalites.map((m) => (
                      <div key={m.label} className="flex justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-white">{m.label}</span>
                        <span className="text-white font-medium text-right ml-4">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Logique métier DPO */}
            <div className="mt-8 glass-panel p-6 rounded-xl border border-violet-500/20">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-violet-400 uppercase tracking-widest font-semibold mb-1">Logique métier</p>
                  <p className="text-sm text-white leading-relaxed">
                    La désignation d&apos;un DPO externalisé est obligatoire pour les organismes publics et les entreprises traitant des données sensibles à grande échelle. Au-delà de l&apos;obligation, un DPO actif transforme la conformité RGPD en argument de confiance vis-à-vis des clients, partenaires et assureurs.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a href="/contact" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Discuter du besoin DPO
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA global */}
        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight relative z-10">
                RSSI, DPO ou les deux ?
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto relative z-10">
                Les deux fonctions sont complémentaires. Un accompagnement combiné garantit une gouvernance cohérente entre sécurité et protection des données.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a href="/contact?service=accompagnement" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)]">
                  Je souscris à mon accompagnement
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/contact?service=audit" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all">
                  Je souscris à mon audit
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
