'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { useState } from 'react';
import { FileText, Shield, TrendingUp, FileCheck, DollarSign, AlertTriangle, Users, Grid, Lock, Activity, CheckCircle, Target, Zap } from 'lucide-react';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('power-grc');

  const tabs = [
    { id: 'power-grc', label: 'POWER GRC' },
    { id: 'cybersecurity', label: 'CYBERSECURITY' },
    { id: 'app-continues', label: 'APP CYBERSECURITY CONTINUES' },
    { id: 'pentrages', label: 'PENTRAGES' },
    { id: 'scenarios', label: 'SCENARIOS' },
    { id: 'expertise', label: 'EXPERTISE' },
  ];

  const accompaniment = [
    {
      icon: Target,
      title: 'Stratégie personnalisée',
      description: 'Une approche sur mesure pour structurer votre conformité cyber'
    },
    {
      icon: FileCheck,
      title: 'Conformité garantie',
      description: 'Respect des normes RGPD, ISO 27001, NIS 2 et DORA'
    },
    {
      icon: TrendingUp,
      title: 'Amélioration continue',
      description: 'Analyse et optimisation de vos processus'
    }
  ];

  const grcTools = [
    {
      icon: FileText,
      title: 'Politique de sécurité',
      description: 'Définition des normes de sécurité de votre entreprise'
    },
    {
      icon: Shield,
      title: 'Registre des risques',
      description: 'Identification des risques et leurs impacts'
    },
    {
      icon: Grid,
      title: 'Plans de remédiation',
      description: 'Plans stratégiques pour améliorer votre sécurité'
    },
    {
      icon: Users,
      title: 'Comité de pilotage',
      description: 'Suivi et décisions stratégiques'
    },
    {
      icon: Activity,
      title: 'Plans de formation',
      description: 'Programmes de sensibilisation pour vos équipes'
    },
    {
      icon: AlertTriangle,
      title: "Gestion des incidents",
      description: "Procédures de réponse aux incidents"
    }
  ];

  const riskCategories = [
    {
      title: 'Risques financiers',
      items: ['Fraude', 'Extorsion/rançon', 'Ransomware', 'Interruption']
    },
    {
      title: 'Risques réglementaires',
      items: ['Non-conformité RGPD', 'Sanctions', 'Amendes ISO']
    },
    {
      title: 'Risques opérationnels',
      items: ['Vol de données', 'Perte de données', 'Fuites expositions', 'Défiguration de sites']
    },
    {
      title: 'Risques stratégiques',
      items: ['Cessation d\'activité', 'Perte contractuelle', 'E-réputation', 'Désorganisation']
    },
    {
      title: 'Risques émergents',
      items: ['IA et deepfake', 'IoT et SI', 'Chaîne approvisionnement']
    }
  ];

  const conformityStandards = [
    {
      title: 'RGPD',
      items: ['Registre des traitements', 'Analyse d\'impact (PIA)', 'Data protection']
    },
    {
      title: 'ISO 27001',
      items: ['SMSI certifié', 'Plan d\'action', 'Certification']
    },
    {
      title: 'NIS2',
      items: ['Secteur critique', 'Notification incidents', 'Exigences techniques']
    },
    {
      title: 'DORA',
      items: ['Résilience opérationnelle', 'Tests de résilience', 'Tiers contractuels']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-6 text-xs tracking-[0.3em] text-cyan-400 uppercase">
            FOCUS CYBERSECURITE
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block">GOUVERNANCE</span>
            <span className="block">RISQUES</span>
            <span className="block">CONFORMITÉ</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed mb-12">
            Face à la complexité croissante et à la sophistication des attaques, une approche tactique solide n'est plus suffisante. Pour établir une résilience durable face aux cybermenaces, il faut une approche globale et stratégique de gestion des risques cyber.
          </p>

          {/* Tabs */}
          <div className="inline-flex items-center gap-2 p-1 bg-card/50 backdrop-blur-sm border border-border rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-black'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* L'accompagnement SecuriTrust */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">L'accompagnement SecuriTrust</h2>
            <a href="#" className="text-cyan-400 text-sm hover:underline flex items-center gap-2">
              01 / DEMARCHE
            </a>
          </div>

          <p className="text-muted-foreground mb-8 max-w-3xl">
            SecuriTrust se positionne comme le partenaire de choix pour structurer votre stratégie GRC robuste, adaptée aux spécificités de votre entreprise et à vos enjeux métiers.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {accompaniment.map((item, index) => (
              <div 
                key={index}
                className="glass-panel p-8 rounded-xl hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="px-8 py-3 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors inline-flex items-center gap-2">
              Je réserve mon premier gratuit
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Les outils de la Gouvernance Cybersécurité */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-cyan-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Les outils de la Gouvernance Cybersécurité</h2>
            <a href="#" className="text-cyan-400 text-sm hover:underline flex items-center gap-2">
              02 / OUTILS
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grcTools.map((tool, index) => (
              <div 
                key={index}
                className="glass-panel p-6 rounded-xl group hover:border-cyan-500/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <tool.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gestion des risques cyber */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Gestion des risques cyber</h2>
            <a href="#" className="text-cyan-400 text-sm hover:underline flex items-center gap-2">
              03 / RISQUES
            </a>
          </div>

          <p className="text-muted-foreground mb-8 max-w-3xl">
            La gestion des risques cyber permet aux organisations d'identifier et d'évaluer proactivement les menaces qui pèsent sur leurs actifs informationnels critiques.
          </p>

          <div className="mb-8 text-sm text-muted-foreground">
            <strong className="text-foreground">Référentiel ISO/CEI :</strong> 27005 Risk Manager et ISO 31000
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskCategories.map((category, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conformité en Cybersécurité */}
      <section className="py-20 px-6 bg-gradient-to-b from-cyan-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Conformité en Cybersécurité</h2>
            <a href="#" className="text-cyan-400 text-sm hover:underline flex items-center gap-2">
              04 / CONFORMITE
            </a>
          </div>

          <p className="text-muted-foreground mb-8 max-w-3xl">
            La conformité n'est pas seulement une contrainte réglementaire mais un levier stratégique. En se conformant aux normes (RGPD, ISO 27001, NIS2, DORA), les entreprises renforcent leur crédibilité et créent un environnement de confiance.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conformityStandards.map((standard, index) => (
              <div 
                key={index}
                className="glass-panel p-6 rounded-xl"
              >
                <h3 className="text-lg font-bold mb-4">{standard.title}</h3>
                <ul className="space-y-2">
                  {standard.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-panel p-12 rounded-2xl border-2 border-cyan-500/20">
            <h2 className="text-3xl font-bold mb-6">
              Besoin d'un accompagnement<br />GRC ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nos experts vous accompagnent dans la structuration de votre stratégie GRC cyber.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-cyan-500 text-black font-medium rounded-lg hover:bg-cyan-400 transition-colors">
                Demander un diagnostic
              </button>
              <button className="px-8 py-3 border border-cyan-500 text-cyan-400 font-medium rounded-lg hover:bg-cyan-500/10 transition-colors">
                Voir nos offres
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-center">
        <ExpertCTAButton />
      </section>

      <Footer />
    </div>
  );
}