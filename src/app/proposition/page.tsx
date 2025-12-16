'use client';

import { Award, Shield, Users, Target, CheckCircle2, FileCheck, Search, Building2, Database, Server, Network, Lock, FileSignature, CreditCard, Home } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PropositionPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [isSigned, setIsSigned] = useState(false);

  // Format date in French
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

    // Vérifier si la proposition a déjà été signée
    const propositionSigned = sessionStorage.getItem('propositionSigned');
    if (propositionSigned === 'true') {
      setIsSigned(true);
    }
  }, []);

  const handleSignProposal = () => {
    if (!orderData) {
      toast.error('Aucune donnée de proposition trouvée. Veuillez compléter le test d\'éligibilité d\'abord.');
      return;
    }

    // Rediriger vers la page de signature dédiée
    router.push('/signer-proposition');
  };

  const handlePayment = () => {
    router.push('/paiement');
  };

  return (
    <div className="antialiased selection:bg-white selection:text-black overflow-x-hidden text-white font-['Inter',sans-serif] bg-[#02040a]">
      {/* Background Grid */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(56, 189, 248, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gradient Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-20 z-0" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-20 z-0" />

      {/* Navigation */}
      <header className="relative z-10 border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-1764601146487.png?width=8000&height=8000&resize=contain"
              alt="SecuriTrust Logo"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
            <div className="ml-4">
              <p className="text-xs text-zinc-400">Proposition de Test de Sécurité et Conformité</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-200 transition-all duration-300 hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Retour à l'accueil</span>
            </button>
            <div className="text-sm text-zinc-400">
              {getCurrentDate()}
            </div>
          </div>
        </nav>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm text-blue-300">Proposition de Test de Sécurité et Conformité</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-light tracking-tight text-white mb-6">
            <span className="font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Securitrust propose une offre unique et innovante, n'attendez plus
            </span>
          </h1>
        </section>

        {/* Proposal Summary Statistics */}
        <section className="rounded-3xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-white/10 p-12">
          <h2 className="text-3xl font-light text-white mb-12 text-center">
            Résumé de la <span className="font-semibold">Proposition</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '+2500', sublabel: 'jours RSSI Externalisé', color: 'cyan' },
              { label: '+40', sublabel: 'Conformité RGPD & DPO', color: 'blue' },
              { label: '+86', sublabel: 'Audits et Tests d\'Intrusion', color: 'purple' },
              { label: '+105', sublabel: 'SMSI & ISO 27001', color: 'pink' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-zinc-400">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Trusted Clients */}
        <section>
          <h2 className="text-3xl font-light text-white mb-8 text-center">
            Ils nous font <span className="font-semibold">confiance</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'Société Générale',
                logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-societe-generale2-e1436481313147-1764595764935.png?width=8000&height=8000&resize=contain'
              },
              { 
                name: 'Abeille Assurances',
                logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/43-abeille-assurance-1764596006375.jpg?width=8000&height=8000&resize=contain'
              },
              { 
                name: 'Banque Française Mutualiste',
                logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-150x150-1764596042844.png?width=8000&height=8000&resize=contain'
              },
              { 
                name: 'Ma Place en Crèche',
                logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-4-150x150-1764596061442.png?width=8000&height=8000&resize=contain'
              },
              { 
                name: 'Affluens',
                logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Af-150x150-1764596072367.png?width=8000&height=8000&resize=contain'
              },
              { 
                name: 'Veolia Eau d\'Île-de-France',
                logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients-150x150-1764596078949.png?width=8000&height=8000&resize=contain'
              },
              { 
                name: 'Aviva',
                logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-150x150-1764596094822.png?width=8000&height=8000&resize=contain'
              },
            ].map((client, idx) => (
              <div key={idx} className="group relative aspect-video rounded-xl overflow-hidden bg-white/95 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center p-8">
                <Image 
                  src={client.logo}
                  alt={client.name}
                  width={200}
                  height={100}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Our Proposition */}
        <section className="rounded-3xl bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 border border-white/10 p-12">
          <h2 className="text-4xl font-light text-white mb-4 text-center">
            Notre <span className="font-semibold">Proposition</span> pour la Sécurité et la Conformité
          </h2>
          <p className="text-zinc-400 text-center max-w-3xl mx-auto mb-12">
            Services complets de tests de sécurité et de certification
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Notre Expertise en Attestation et Certification',
                items: [
                  'Auditeur Principal ISO 27001',
                  'Implémenteur Principal ISO 27001',
                  'Gestionnaire de Risques EBIOS',
                  'Certifié OSCP',
                  'Certifié CEH',
                  'Qualification PASSI (En cours)',
                ],
                icon: Award,
                color: 'cyan',
              },
              {
                title: 'Gouvernance, Risques & Conformité (GRC)',
                items: [
                  'Conformité ISO 27001',
                  'RGPD & Protection des Données',
                  'NIS 2 & DORA',
                  'TISAX Automobile',
                  'Conformité LPM',
                  'Services DPO',
                ],
                icon: Building2,
                color: 'blue',
              },
              {
                title: 'Cybersécurité Opérationnelle',
                items: [
                  'Opérations Red Team',
                  'Tests d\'Intrusion',
                  'Simulation de Ransomware',
                  'Campagnes de Phishing',
                  'Analyse OSINT',
                  'Audits de Sécurité',
                ],
                icon: Shield,
                color: 'purple',
              },
            ].map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={idx} className={`rounded-2xl bg-gradient-to-br from-${section.color}-900/20 to-${section.color}-800/10 border border-${section.color}-500/30 p-6 hover:scale-[1.02] transition-all duration-300`}>
                  <div className={`p-4 rounded-xl bg-${section.color}-500/20 border border-${section.color}-500/30 w-fit mb-6`}>
                    <Icon className={`w-8 h-8 text-${section.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-4 h-4 text-${section.color}-400 flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* La méthodologie Securitrust */}
        <section className="rounded-3xl bg-gradient-to-br from-blue-900/30 via-slate-900/40 to-blue-900/30 border border-blue-500/20 p-12">
          <h2 className="text-4xl font-light text-white mb-4 text-center">
            La <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Méthodologie</span> Securitrust
          </h2>
          <p className="text-zinc-400 text-center max-w-3xl mx-auto mb-12">
            Nous vous proposons la réalisation de la prestation suivante
          </p>

          {/* Main Content Box */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-white/10 overflow-hidden">
            
            {/* Header - Test Type */}
            <div className="bg-blue-900/40 border-b border-white/10 p-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
                  <span className="text-2xl font-bold text-cyan-400">1</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">Test d'intrusion <span className="text-cyan-400">interne</span></h3>
                  <p className="text-sm text-zinc-400 mt-1">Approche en boîte grise sur l'environnement Active Directory</p>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-8 space-y-8">
              
              {/* Objectifs */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-white uppercase tracking-wider">Objectifs</h4>
                </div>
                <div className="pl-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-zinc-300 text-sm">
                      Évaluer la sécurité de l'Active Directory et identifier les vulnérabilités critiques pouvant permettre une compromission du domaine
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-zinc-300 text-sm">
                      Tester les mécanismes d'authentification, les autorisations et la sécurité des comptes privilégiés
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-zinc-300 text-sm">
                      Simuler des scénarios d'attaque réalistes depuis une position d'utilisateur authentifié (boîte grise)
                    </p>
                  </div>
                </div>
              </div>

              {/* Périmètre */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-white uppercase tracking-wider">Périmètre</h4>
                </div>
                <div className="pl-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-900/50 border border-white/5 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Server className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-medium text-white">Infrastructure Active Directory</span>
                      </div>
                      <p className="text-xs text-zinc-400">Contrôleurs de domaine, serveurs, architecture AD</p>
                    </div>
                    <div className="rounded-xl bg-slate-900/50 border border-white/5 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Users className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-medium text-white">Comptes utilisateurs et groupes</span>
                      </div>
                      <p className="text-xs text-zinc-400">Permissions, élévation de privilèges, comptes sensibles</p>
                    </div>
                    <div className="rounded-xl bg-slate-900/50 border border-white/5 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Network className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-medium text-white">Réseau interne</span>
                      </div>
                      <p className="text-xs text-zinc-400">Segmentation, flux réseau, accès latéraux</p>
                    </div>
                    <div className="rounded-xl bg-slate-900/50 border border-white/5 p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Database className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-medium text-white">GPO et politiques</span>
                      </div>
                      <p className="text-xs text-zinc-400">Politiques de groupe, configurations de sécurité</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Méthode - Boîte Grise */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-white uppercase tracking-wider">Méthode</h4>
                </div>
                <div className="pl-6">
                  <div className="rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/30 p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-600/50 border border-white/10">
                        <Lock className="w-8 h-8 text-zinc-400" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold text-white mb-2">Intrusion en boîte <span className="text-cyan-400">grise</span></h5>
                        <p className="text-sm text-zinc-400">L'attaquant dispose d'accès authentifiés et d'informations privilégiées</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                        <p className="text-sm text-zinc-300">
                          <span className="font-medium text-white">Accès réseau interne :</span> Connexion VPN/VDI ou accès physique au réseau de l'entreprise
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                        <p className="text-sm text-zinc-300">
                          <span className="font-medium text-white">Compte utilisateur standard :</span> Identifiants d'un utilisateur du domaine sans privilèges élevés
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                        <p className="text-sm text-zinc-300">
                          <span className="font-medium text-white">Documentation fournie :</span> Architecture réseau, diagrammes AD, liste des serveurs critiques
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Phase d'initialisation */}
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-white/10 overflow-hidden">
            <div className="bg-purple-900/30 border-b border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
                Phase d'initialisation - Réunion de cadrage
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-zinc-400 mb-6">
                Pour garantir le bon déroulement des tests d'intrusion, certaines <span className="text-white font-medium">préparations techniques</span> doivent être réalisées <span className="text-cyan-400 font-medium">en amont des prestations</span>
              </p>

              <div className="space-y-4">
                <div className="rounded-xl bg-slate-900/50 border border-white/5 p-5">
                  <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Identification des actifs à auditer</h4>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-300">Identifier l'infrastructure Active Directory à tester (domaines, contrôleurs, serveurs)</p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900/50 border border-white/5 p-5">
                  <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Préparation des prérequis techniques</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Accès réseau interne</p>
                        <p className="text-xs text-zinc-400">VPN/VDI/jumpbox, badges d'accès physique si nécessaire</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Accès Active Directory</p>
                        <p className="text-xs text-zinc-400">Connexion réseau aux contrôleurs de domaine</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Comptes de test (grise)</p>
                        <p className="text-xs text-zinc-400">Identifiants d'utilisateur standard du domaine</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Documentation</p>
                        <p className="text-xs text-zinc-400">Schémas réseau, architecture AD, configurations pertinentes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scope of Work */}
        <section>
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            Périmètre des <span className="font-semibold">Travaux</span>
          </h2>
          <div className="rounded-2xl border border-white/10 bg-zinc-900/30 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-800/50 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Phase</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Activités</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Durée</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Livrables</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  {
                    phase: 'Reconnaissance',
                    activities: 'OSINT, Cartographie réseau, Découverte d\'actifs',
                    timeline: '1 jour',
                    deliverables: 'Rapport d\'inventaire des actifs',
                  },
                  {
                    phase: 'Évaluation des Vulnérabilités',
                    activities: 'Analyse automatisée, Tests manuels',
                    timeline: '1 jour',
                    deliverables: 'Rapport de vulnérabilités',
                  },
                  {
                    phase: 'Exploitation',
                    activities: 'Tests d\'intrusion, Élévation de privilèges',
                    timeline: '2 jours',
                    deliverables: 'Rapport d\'exploitation',
                  },
                  {
                    phase: 'Rapport',
                    activities: 'Documentation, Recommandations',
                    timeline: '1 jour',
                    deliverables: 'Rapport final & présentation',
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{row.phase}</td>
                    <td className="px-6 py-4 text-sm text-zinc-400 text-center">{row.activities}</td>
                    <td className="px-6 py-4 text-sm text-zinc-400 text-center">{row.timeline}</td>
                    <td className="px-6 py-4 text-sm text-zinc-400 text-center">{row.deliverables}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Estimated Timeline */}
        <section>
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            Calendrier <span className="font-semibold">Estimé</span>
          </h2>
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <span className="text-3xl font-bold text-white">5 Jours</span>
                <span className="text-sm text-zinc-400">Durée Totale</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/30 overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-800/50 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Activité</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Jour 1</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Jour 2</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Jour 3</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Jour 4</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-white">Jour 5</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    { name: 'Lancement du Projet', days: [true, false, false, false, false] },
                    { name: 'Reconnaissance & OSINT', days: [true, false, false, false, false] },
                    { name: 'Évaluation des Vulnérabilités', days: [false, true, false, false, false] },
                    { name: 'Tests d\'Intrusion', days: [false, false, true, true, false] },
                    { name: 'Rapport Final', days: [false, false, false, false, true] },
                  ].map((activity, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white">{activity.name}</td>
                      {activity.days.map((active, dIdx) => (
                        <td key={dIdx} className="px-6 py-4 text-center">
                          {active && (
                            <div className="inline-block w-full h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="rounded-3xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-white/10 p-12">
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            Prochaines <span className="font-semibold">Étapes</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Signature du Contrat',
                description: 'Examiner et signer l\'accord de service',
                icon: FileCheck,
              },
              {
                step: '2',
                title: 'Réunion de Lancement',
                description: 'Rencontrer l\'équipe et définir les objectifs',
                icon: Users,
              },
              {
                step: '3',
                title: 'Évaluation',
                description: 'Réaliser des tests de sécurité complets',
                icon: Search,
              },
              {
                step: '4',
                title: 'Livraison',
                description: 'Recevoir le rapport détaillé et les recommandations',
                icon: Target,
              },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative group">
                  <div className="rounded-2xl bg-zinc-900/50 border border-white/10 p-6 hover:bg-zinc-900/70 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 mb-4 mx-auto">
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">{step.step}</div>
                      <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-zinc-400">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Investment */}
        <section className="rounded-3xl bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20 border border-purple-500/30 p-12">
          <h2 className="text-4xl font-light text-white mb-12 text-center">
            Votre <span className="font-semibold">Investissement</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl p-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 text-center">
              <h3 className="text-3xl font-semibold text-white mb-4">Évaluation de Sécurité Complète</h3>
              <div className="text-6xl font-bold text-white mb-2">4 999 €</div>
              <p className="text-lg text-zinc-300 mb-8">Hors taxes</p>
              
              <div className="text-left max-w-md mx-auto mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Services Inclus :</h4>
                <ul className="space-y-3">
                  {[
                    'Test d\'Intrusion Complet',
                    'OSINT & Reconnaissance Externe',
                    'Évaluation des Vulnérabilités',
                    'Exploitation & Tests de Sécurité',
                    'Rapport de Sécurité Complet',
                    'Résumé Exécutif & Recommandations',
                    'Délai de Livraison de 5 Jours',
                    'Support Post-Évaluation',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              {isSigned ? (
                <div className="space-y-4">
                  {/* Confirmation de signature */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                      <p className="text-green-300 font-semibold text-lg">Proposition Signée !</p>
                    </div>
                    <p className="text-green-200 text-sm">
                      Votre signature a été enregistrée avec succès
                    </p>
                  </div>

                  {/* Bouton de paiement */}
                  <button 
                    onClick={handlePayment}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Procéder au Paiement</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleSignProposal}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
                >
                  <FileSignature className="w-5 h-5" />
                  <span>Signer ma proposition</span>
                </button>
              )}

              {/* Info Text */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-zinc-400 mb-2">
                  Pour toute question ou commentaire, veuillez contacter{' '}
                  <a href="mailto:contact@securitrust.com" className="text-cyan-400 hover:underline font-medium">
                    contact@securitrust.com
                  </a> ou <span className="text-cyan-400">07308030070</span>
                </p>
                <p className="text-xs text-zinc-500 italic">
                  La signature électronique est requise avant de procéder au paiement. Cela garantit l'authenticité et la validité de votre engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-1764601146487.png?width=8000&height=8000&resize=contain"
                alt="SecuriTrust Logo"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            </div>
            <div className="text-sm text-zinc-500 text-center">
              © {new Date().getFullYear()} SecuriTrust — Tous droits réservés
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}