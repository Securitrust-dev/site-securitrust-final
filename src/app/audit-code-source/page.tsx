'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Code, CheckCircle, Bug, Shield, FileCode, ArrowRight, Box, Cpu, FileText } from 'lucide-react';

export default function AuditCodeSourcePage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300 selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
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
        
        <section className="relative pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">
                Cybersécurité Opérationnelle
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                AUDIT DE CODE SOURCE
              </h1>
              <p className="text-lg md:text-xl text-slate-300 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-6">
                L&apos;<strong>audit de code source</strong> consiste à analyser en profondeur le code de vos applications pour détecter les <strong>vulnérabilités de sécurité</strong>, les failles logiques et les erreurs de programmation qui pourraient être exploitées par des attaquants. Notre équipe d&apos;experts certifiés utilise des méthodologies éprouvées combinant analyse manuelle approfondie et outils spécialisés pour garantir une couverture exhaustive.
              </p>
              <p className="text-lg md:text-xl text-slate-300 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-8">
                Cette revue manuelle et automatisée du code permet d&apos;identifier les <strong>failles critiques</strong> avant leur exploitation, réduisant ainsi considérablement les risques de <strong>compromission</strong> de vos systèmes. Nous examinons chaque ligne de code avec une attention particulière aux patterns de vulnérabilités connus et aux erreurs de logique métier spécifiques à votre domaine.
              </p>
              
              <div className="flex justify-center">
                <a
                  href="/exemple-rapport-audit.pdf"
                  className="inline-flex items-center gap-3 glass-panel px-6 py-3 rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all group"
                >
                  <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium tracking-wide">Voir un exemple de rapport d&apos;audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-400">
                Technologies
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-slate-300/80 text-sm md:text-base">
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <span>Java / .NET</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <FileCode className="w-5 h-5 text-cyan-400" />
                  <span>PHP / Python</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <span>JavaScript / Node.js</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Bug className="w-5 h-5 text-cyan-400" />
                  <span>C / C++</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <span>Java / .NET</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Types de vulnérabilités détectées
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // DÉTECTION</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="tilt-card group relative z-10 p-1 md:col-span-2 lg:row-span-2">
                <div className="glass-panel h-full p-10 rounded-xl relative overflow-hidden border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                  <div className="absolute -right-4 -top-4 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all"></div>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-red-500/40 bg-black/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Bug className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold mb-3 tracking-wider">
                        CRITIQUE
                      </div>
                      <h4 className="text-2xl font-semibold text-white mb-4">Injections SQL/XSS</h4>
                      <p className="text-base text-slate-200 leading-relaxed mb-4">
                        Détection et analyse approfondie des failles d&apos;injection permettant l&apos;exécution de code malveillant. Nos experts identifient les vecteurs d&apos;attaque SQL, XSS (Cross-Site Scripting), LDAP et toutes formes d&apos;injection de commandes.
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        <strong className="text-white">Notre expertise :</strong> Analyse des flux de données non filtrées, validation des entrées utilisateur, vérification des requêtes paramétrées et des mécanismes d&apos;échappement. Nous testons également les injections de second ordre et les contournements de WAF.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[0.65rem] font-bold mb-3 tracking-wider">
                    ÉLEVÉ
                  </div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-orange-500/30 bg-black/50 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Gestion d&apos;authentification</h4>
                  <p className="text-sm text-slate-200 leading-relaxed mb-3">
                    Analyse approfondie des mécanismes d&apos;authentification et de gestion des sessions utilisateur.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Vérification des tokens JWT, cookies sécurisés, politiques de mots de passe, multi-facteurs et timeout de session.
                  </p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-yellow-500/30">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[0.65rem] font-bold mb-3 tracking-wider">
                    MOYEN
                  </div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-yellow-500/30 bg-black/50 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                    <FileCode className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Failles logiques</h4>
                  <p className="text-sm text-slate-200 leading-relaxed mb-3">
                    Identification des erreurs de logique métier exploitables par manipulation de workflows.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Détection des contournements de processus métier, race conditions et états incohérents.
                  </p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[0.65rem] font-bold mb-3 tracking-wider">
                    ÉLEVÉ
                  </div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-orange-500/30 bg-black/50 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                    <Code className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Données sensibles</h4>
                  <p className="text-sm text-slate-200 leading-relaxed mb-3">
                    Vérification complète du chiffrement et de la protection des données critiques.
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Audit des algorithmes de chiffrement, stockage sécurisé des secrets et transmission HTTPS/TLS.
                  </p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-yellow-500/30">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all"></div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[0.65rem] font-bold mb-3 tracking-wider">
                    MOYEN
                  </div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-yellow-500/30 bg-black/50 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                    <Bug className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Dépendances vulnérables</h4>
                  <p className="text-sm text-slate-200 leading-relaxed mb-3">
                    Analyse complète des bibliothèques tierces et de leurs vulnérabilités connues (CVE).
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Scan des dépendances npm, Maven, pip et identification des versions obsolètes ou compromises.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                OWASP Top 10
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01.5 // RÉFÉRENTIEL</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h4 className="text-2xl font-semibold text-cyan-400 mb-6">
                  Référentiel international de sécurité applicative
                </h4>
                <p className="text-slate-300 leading-relaxed mb-6">
                  L&apos;<strong className="text-white">OWASP</strong> (Open Web Application Security Project) est une organisation à but non lucratif reconnue mondialement qui publie régulièrement le <strong className="text-white">Top 10</strong> des vulnérabilités les plus critiques des applications web.
                </p>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Nos audits de code source s&apos;appuient sur ce référentiel pour garantir une <strong className="text-white">couverture exhaustive</strong> des risques de sécurité identifiés par la communauté internationale.
                </p>
                <div className="glass-panel p-6 rounded-xl border border-cyan-500/30 bg-cyan-500/5">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <strong className="text-cyan-400">Note :</strong> Le respect des recommandations OWASP est un prérequis pour de nombreuses certifications de sécurité et constitue une bonne pratique reconnue dans l&apos;industrie.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { num: "01", title: "Broken Access Control", desc: "Contrôle d'accès défaillant" },
                  { num: "02", title: "Cryptographic Failures", desc: "Défaillances cryptographiques" },
                  { num: "03", title: "Injection", desc: "Injections SQL, XSS, LDAP..." },
                  { num: "04", title: "Insecure Design", desc: "Conception non sécurisée" },
                  { num: "05", title: "Security Misconfiguration", desc: "Configuration de sécurité incorrecte" },
                  { num: "06", title: "Vulnerable Components", desc: "Composants vulnérables et obsolètes" },
                  { num: "07", title: "Authentication Failures", desc: "Défaillances d'authentification" },
                  { num: "08", title: "Data Integrity Failures", desc: "Défaillances d'intégrité des données" },
                  { num: "09", title: "Logging Failures", desc: "Défaillances de journalisation" },
                  { num: "10", title: "SSRF", desc: "Server-Side Request Forgery" }
                ].map((item) => (
                  <div key={item.num} className="glass-panel p-4 rounded-lg border border-white/5 hover:border-cyan-500/30 transition-all group">
                    <div className="flex items-start gap-4">
                      <span className="text-cyan-400 font-mono text-lg font-bold shrink-0 group-hover:text-cyan-300 transition-colors">
                        {item.num}
                      </span>
                      <div className="flex-1">
                        <h5 className="text-white font-medium mb-1">{item.title}</h5>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Notre approche
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // MÉTHODOLOGIE</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Analyse manuelle et automatisée</h3>
                <ul className="space-y-4 text-slate-200">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Revue manuelle par des experts sécurité certifiés</span>
                      <p className="text-sm text-slate-300 mt-1">Analyse ligne par ligne effectuée par des consultants OSCP, CEH et experts en sécurité applicative</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Outils d&apos;analyse statique (SAST) de dernière génération</span>
                      <p className="text-sm text-slate-300 mt-1">Utilisation de SonarQube, Checkmarx, Fortify pour une détection automatisée des vulnérabilités</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Détection des patterns dangereux et anti-patterns</span>
                      <p className="text-sm text-slate-300 mt-1">Identification des mauvaises pratiques de développement et des erreurs de conception sécuritaire</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Analyse des flux de données sensibles (Data Flow Analysis)</span>
                      <p className="text-sm text-slate-300 mt-1">Traçage complet du parcours des données critiques à travers l&apos;application</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Livrables détaillés</h3>
                <ul className="space-y-4 text-slate-200">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Rapport détaillé avec extraits de code vulnérable</span>
                      <p className="text-sm text-slate-300 mt-1">Documentation complète incluant le code source concerné et le contexte d&apos;exploitation</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Classification des vulnérabilités selon CVSS v3.1</span>
                      <p className="text-sm text-slate-300 mt-1">Scoring de criticité standardisé pour prioriser les corrections</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Recommandations de correction avec exemples de code sécurisé</span>
                      <p className="text-sm text-slate-300 mt-1">Guides pratiques de remediation adaptés à votre stack technologique</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium">Accompagnement personnalisé des équipes de développement</span>
                      <p className="text-sm text-slate-300 mt-1">Sessions de debriefing et support technique pour faciliter la remediation</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 text-center relative z-10">
          <ExpertCTAButton />
        </section>

        <Footer />
      </div>
    </div>
  );
}