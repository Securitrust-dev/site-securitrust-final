'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Search, Shield, Database, Globe, CheckCircle, Building2, DollarSign, Users, Star, Archive, Box, Cpu, AlertTriangle, Mail } from 'lucide-react';

type ResultStatus = 'pending' | 'loading' | 'found' | 'partial' | 'notfound';

interface DetailItem {
  label: string;
  value: string;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  status: ResultStatus;
  details?: DetailItem[];
  icon: any;
}

// --- CORRECTION ICI : Ajout des champs manquants dans l'interface ---
interface CompanyData {
  legalInfo: {
    siret: string;
    siren: string;
    formeJuridique: string;
    capitalSocial: string;
    dateCreation: string;
    dirigeant: string;
    siegeSocial: string;
    codeNaf: string;
    statut: string;
    // Nouveaux champs ajoutés pour éviter l'erreur TypeScript
    effectif?: string;
    etablissementSiege?: string;
    categorieEntreprise?: string;
    caractereEmployeur?: string;
    economieSocialeSolidaire?: string;
    societeMission?: string;
  };
  financialData?: {
    annee: number;
    chiffreAffaires: string;
    resultatNet: string;
    effectif: string;
  } | null;
  digitalPresence: {
    siteWeb: string | null;
  };
  companyName: string;
  domain: string;
  breaches?: {
    totalBreaches: number;
    breaches: Array<{
      name: string;
      title: string;
      breachDate: string;
      pwnCount: number;
      dataClasses: string[];
    }>;
  };
}

const allResults: SearchResult[] = [
  {
    id: '1',
    title: 'Informations Légales',
    description: 'SIRET, SIREN, Forme juridique',
    status: 'pending',
    icon: Building2,
    details: [
      { label: 'SIRET', value: '88952245900015' },
      { label: 'SIREN', value: '889522459' },
      { label: 'Forme juridique', value: 'SAS (Société par actions simplifiée)' },
      { label: 'Capital social', value: '50 000 €' },
      { label: 'Date de création', value: '15/03/2021' },
      { label: 'Dirigeant', value: 'Jean DUPONT' },
      { label: 'Siège social', value: '42 Avenue des Champs-Élysées, 75008 Paris' },
      { label: 'Code NAF', value: '6201Z - Programmation informatique' },
      { label: 'Statut', value: 'Actif' }
    ]
  },
  {
    id: '2',
    title: 'Données Financières',
    description: 'CA, Employés, Notation',
    status: 'pending',
    icon: DollarSign,
    details: [
      { label: 'Chiffre d\'affaires 2023', value: '2 450 000 €' },
      { label: 'Résultat net 2023', value: '385 000 €' },
      { label: 'Croissance CA', value: '+28% vs 2022' },
      { label: 'Effectif salarié', value: '23 employés' },
      { label: 'Masse salariale', value: '1 150 000 €' },
      { label: 'Score de solvabilité', value: '8.5/10 - Excellent' },
      { label: 'Notation Banque de France', value: '3++ (Très forte capacité)' },
      { label: 'Délai de paiement moyen', value: '32 jours' },
      { label: 'Incidents de paiement', value: 'Aucun' }
    ]
  },
  {
    id: '3',
    title: 'Présence Digitale',
    description: 'Site web, Domaines, Stack',
    status: 'pending',
    icon: Globe,
    details: [
      { label: 'Site web principal', value: 'www.exemple-entreprise.fr' },
      { label: 'Domaines enregistrés', value: '4 domaines (.fr, .com, .eu, .net)' },
      { label: 'Hébergement', value: 'OVH Cloud - France' },
      { label: 'Technologies', value: 'Next.js, React, Tailwind CSS' },
      { label: 'CMS', value: 'Strapi' },
      { label: 'Certificat SSL', value: 'Valide jusqu\'au 15/08/2025' },
      { label: 'Score PageSpeed', value: '94/100' },
      { label: 'Analytics', value: 'Google Analytics 4' },
      { label: 'CDN', value: 'Cloudflare' }
    ]
  },
  {
    id: '4',
    title: 'Réseaux Sociaux',
    description: 'LinkedIn, Twitter, Facebook',
    status: 'pending',
    icon: Users,
    details: [
      { label: 'LinkedIn', value: '2 453 abonnés - Actif quotidiennement' },
      { label: 'Twitter/X', value: '1 247 followers - 3-4 posts/semaine' },
      { label: 'Facebook', value: '892 likes - Modérément actif' },
      { label: 'Instagram', value: '654 followers - Stories régulières' },
      { label: 'YouTube', value: '156 abonnés - 12 vidéos' },
      { label: 'Engagement moyen', value: '4.2% (Bon)' },
      { label: 'Croissance mensuelle', value: '+8.5%' }
    ]
  },
  {
    id: '5',
    title: 'Réputation',
    description: 'Avis clients, Glassdoor',
    status: 'pending',
    icon: Star,
    details: [
      { label: 'Google My Business', value: '4.6/5 (127 avis)' },
      { label: 'Trustpilot', value: '4.4/5 (89 avis)' },
      { label: 'Glassdoor (employés)', value: 'Données non disponibles' },
      { label: 'Avis positifs', value: '82%' },
      { label: 'Temps de réponse', value: '< 24h' },
      { label: 'Recommandation client', value: '91%' }
    ]
  },
  {
    id: '6',
    title: 'Archives Web',
    description: 'Wayback Machine',
    status: 'pending',
    icon: Archive,
    details: []
  },
  {
    id: '7',
    title: 'Fuites de Données',
    description: 'Have I Been Pwned',
    status: 'pending',
    icon: AlertTriangle,
    details: []
  }
];

export default function VotreEntreprisePage() {
  const [siretNumber, setSiretNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [results, setResults] = useState<SearchResult[]>(allResults);
  const [currentResultIndex, setCurrentResultIndex] = useState(-1);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [breachResults, setBreachResults] = useState<any>(null);

  const resetResults = () => {
    setResults(allResults.map(r => ({ ...r, status: 'pending' })));
    setCurrentResultIndex(-1);
    setSearchProgress(0);
    setExpandedResult(null);
    setError(null);
    setBreachResults(null);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailAddress(value);
    
    if (value && !validateEmail(value)) {
      setEmailError('Format d\'email invalide');
    } else {
      setEmailError(null);
    }
  };

  const handleEmailSearch = async () => {
    if (!emailAddress || !validateEmail(emailAddress)) {
      setEmailError('Veuillez entrer une adresse email valide');
      return;
    }
    
    setIsSearching(true);
    setError(null);
    setBreachResults(null);
    
    try {
      const response = await fetch(`/api/osint/email-breaches?email=${encodeURIComponent(emailAddress)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la recherche');
      }

      setBreachResults(data);
      setIsSearching(false);

    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la recherche');
      setIsSearching(false);
    }
  };

  const handleSearch = async () => {
    if (!siretNumber || siretNumber.length !== 14) return;
    
    setIsSearching(true);
    resetResults();
    
    try {
      // Simulate search progress
      const progressInterval = setInterval(() => {
        setSearchProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return newProgress;
        });
      }, 200);

      // Call API to get real company data
      const response = await fetch(`/api/osint/company?siret=${siretNumber}`);
      const data = await response.json();

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la recherche');
      }

      const companyData = data as CompanyData;

      // Fetch breach data if domain exists or email is provided
      let breachData = null;
      let emailBreachData = null;
      
      if (companyData.digitalPresence.siteWeb) {
        try {
          const domain = new URL(companyData.digitalPresence.siteWeb).hostname.replace('www.', '');
          const breachResponse = await fetch(`/api/osint/breaches?domain=${domain}`);
          if (breachResponse.ok) {
            breachData = await breachResponse.json();
          }
        } catch (error) {
          console.error('Error fetching breach data:', error);
        }
      }

      // Fetch email breach data if email is provided
      if (emailAddress) {
        try {
          const emailBreachResponse = await fetch(`/api/osint/email-breaches?email=${encodeURIComponent(emailAddress)}`);
          if (emailBreachResponse.ok) {
            emailBreachData = await emailBreachResponse.json();
          }
        } catch (error) {
          console.error('Error fetching email breach data:', error);
        }
      }

      // Update results with real data
      setResults(prev => prev.map(result => {
        if (result.id === '1') {
          // Legal info
          return {
            ...result,
            status: 'found' as ResultStatus,
            details: [
              { label: 'SIRET', value: companyData.legalInfo.siret },
              { label: 'SIREN', value: companyData.legalInfo.siren },
              { label: 'Forme juridique', value: companyData.legalInfo.formeJuridique },
              { label: 'Capital social', value: companyData.legalInfo.capitalSocial },
              { label: 'Date de création', value: companyData.legalInfo.dateCreation },
              { label: 'Dirigeant', value: companyData.legalInfo.dirigeant },
              { label: 'Siège social', value: companyData.legalInfo.siegeSocial },
              { label: 'Code NAF', value: companyData.legalInfo.codeNaf },
              { label: 'Statut', value: companyData.legalInfo.statut },
              { label: 'Effectif', value: companyData.legalInfo.effectif || 'Non renseigné' },
              { label: 'Établissement siège', value: companyData.legalInfo.etablissementSiege || 'Non renseigné' },
              { label: 'Catégorie entreprise', value: companyData.legalInfo.categorieEntreprise || 'Non renseigné' },
              { label: 'Caractère employeur', value: companyData.legalInfo.caractereEmployeur || 'Non renseigné' },
              { label: 'Économie sociale solidaire', value: companyData.legalInfo.economieSocialeSolidaire || 'Non' },
              { label: 'Société à mission', value: companyData.legalInfo.societeMission || 'Non' }
            ]
          };
        } else if (result.id === '2') {
          // Financial data
          if (companyData.financialData) {
            return {
              ...result,
              status: 'found' as ResultStatus,
              details: [
                { label: `Chiffre d'affaires ${companyData.financialData.annee}`, value: companyData.financialData.chiffreAffaires },
                { label: `Résultat net ${companyData.financialData.annee}`, value: companyData.financialData.resultatNet },
                { label: 'Effectif', value: companyData.financialData.effectif },
              ]
            };
          } else {
            return {
              ...result,
              status: 'partial' as ResultStatus,
              details: [
                { label: 'Données financières', value: 'Non disponibles' }
              ]
            };
          }
        } else if (result.id === '3') {
          // Digital presence
          if (companyData.digitalPresence.siteWeb) {
            return {
              ...result,
              status: 'found' as ResultStatus,
              details: [
                { label: 'Site web principal', value: companyData.digitalPresence.siteWeb },
                { label: 'Domaine d\'activité', value: companyData.domain }
              ]
            };
          } else {
            return {
              ...result,
              status: 'partial' as ResultStatus,
              details: [
                { label: 'Site web', value: 'Non renseigné' },
                { label: 'Domaine d\'activité', value: companyData.domain }
              ]
            };
          }
        } else if (result.id === '4') {
          // Social networks - not available from Pappers
          return {
            ...result,
            status: 'partial' as ResultStatus,
            details: []
          };
        } else if (result.id === '5') {
          // Reputation - not available from Pappers
          return {
            ...result,
            status: 'partial' as ResultStatus,
            details: []
          };
        } else if (result.id === '6') {
          // Web archives
          return {
            ...result,
            status: 'notfound' as ResultStatus,
            details: []
          };
        } else if (result.id === '7') {
          // Breaches - combine both domain and email breaches
          const allBreaches = [];
          let totalBreaches = 0;
          
          if (breachData && breachData.totalBreaches > 0) {
            totalBreaches += breachData.totalBreaches;
            allBreaches.push({
              label: `Fuites du domaine`,
              value: `${breachData.totalBreaches} incident(s)`
            });
            
            breachData.breaches.forEach((breach: any) => {
              allBreaches.push({
                label: breach.title,
                value: `${new Date(breach.breachDate).toLocaleDateString('fr-FR')} - ${breach.pwnCount.toLocaleString()} comptes`
              });
              if (breach.dataClasses && breach.dataClasses.length > 0) {
                allBreaches.push({
                  label: '  └ Données compromises',
                  value: breach.dataClasses.slice(0, 3).join(', ')
                });
              }
            });
          }
          
          if (emailBreachData && emailBreachData.totalBreaches > 0) {
            totalBreaches += emailBreachData.totalBreaches;
            allBreaches.push({
              label: `Fuites de l'email ${emailAddress}`,
              value: `${emailBreachData.totalBreaches} incident(s)`
            });
            
            emailBreachData.breaches.forEach((breach: any) => {
              allBreaches.push({
                label: breach.title,
                value: `${new Date(breach.breachDate).toLocaleDateString('fr-FR')} - ${breach.pwnCount.toLocaleString()} comptes`
              });
              if (breach.dataClasses && breach.dataClasses.length > 0) {
                allBreaches.push({
                  label: '  └ Données compromises',
                  value: breach.dataClasses.slice(0, 3).join(', ')
                });
              }
            });
          }
          
          if (totalBreaches > 0) {
            return {
              ...result,
              status: 'found' as ResultStatus,
              details: allBreaches
            };
          } else if ((breachData && breachData.totalBreaches === 0) || (emailBreachData && emailBreachData.totalBreaches === 0)) {
            return {
              ...result,
              status: 'found' as ResultStatus,
              details: [
                { label: 'Statut', value: '✓ Aucune fuite de données détectée' }
              ]
            };
          } else {
            return {
              ...result,
              status: 'partial' as ResultStatus,
              details: []
            };
          }
        }
        return result;
      }));

      setSearchProgress(100);
      setIsSearching(false);

    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la recherche');
      setIsSearching(false);
      setSearchProgress(0);
      setResults(allResults.map(r => ({ ...r, status: 'notfound' as ResultStatus })));
    }
  };


  const getStatusColor = (status: ResultStatus) => {
    switch (status) {
      case 'pending': return 'bg-slate-700';
      case 'loading': return 'bg-cyan-400 animate-pulse';
      case 'found': return 'bg-green-400';
      case 'partial': return 'bg-yellow-400';
      case 'notfound': return 'bg-red-400';
      default: return 'bg-slate-700';
    }
  };

  const getStatusText = (status: ResultStatus) => {
    switch (status) {
      case 'pending': return '⋯ En attente';
      case 'loading': return '⟳ Recherche...';
      case 'found': return '✓ Données trouvées';
      case 'partial': return '⚠ Données partielles';
      case 'notfound': return '✗ Non disponible';
      default: return '';
    }
  };

  const getStatusTextColor = (status: ResultStatus) => {
    switch (status) {
      case 'pending': return 'text-slate-600';
      case 'loading': return 'text-cyan-400';
      case 'found': return 'text-green-400';
      case 'partial': return 'text-yellow-400';
      case 'notfound': return 'text-red-400';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="relative min-h-screen antialiased text-slate-300 selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
      </div>

      <div className="absolute top-1/4 left-4 md:left-10 opacity-20 animate-float hidden sm:block" style={{ animationDelay: '0s' }}>
        <Box className="w-16 h-16 md:w-24 md:h-24 text-cyan-500" />
      </div>
      <div className="absolute bottom-1/3 right-4 md:right-20 opacity-20 animate-float hidden sm:block" style={{ animationDelay: '2s' }}>
        <Cpu className="w-12 h-12 md:w-16 md:h-16 text-cyan-500" />
      </div>

      <style jsx global>{`
        @keyframes neonPulse {
          0%, 100% {
            box-shadow:
              inset 0 0 0 1px rgba(255,255,255,0.1),
              inset 0 2px 4px rgba(0,0,0,0.3),
              inset 0 0 15px rgba(6,182,212,0.3),
              inset 0 0 25px rgba(59,130,246,0.2);
          }
          50% {
            box-shadow:
              inset 0 0 0 1px rgba(255,255,255,0.15),
              inset 0 2px 4px rgba(0,0,0,0.3),
              inset 0 0 25px rgba(6,182,212,0.5),
              inset 0 0 40px rgba(59,130,246,0.3),
              inset 0 0 60px rgba(6,182,212,0.2);
          }
        }
        .neon-border {
          animation: neonPulse 3s ease-in-out infinite;
        }
        @keyframes entranceSlideUp {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .entrance-animation-1 {
          animation: entranceSlideUp 0.8s ease-out forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
        .entrance-animation-2 {
          animation: entranceSlideUp 0.8s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }
        .entrance-animation-3 {
          animation: entranceSlideUp 0.8s ease-out forwards;
          animation-delay: 0.6s;
          opacity: 0;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideInResult {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .result-appear {
          animation: slideInResult 0.4s ease-out forwards;
        }
      `}</style>
      
      <div className="relative z-10">
        <PromoBanner />
        <Navbar />
        
        <section className="relative pt-32 sm:pt-36 md:pt-40 pb-12 md:pb-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 md:mb-16 border-b border-white/10 pb-4">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-cyan-400 tracking-[0.2em] text-[10px] sm:text-xs uppercase mb-3 md:mb-4">
                  Découvrez votre empreinte digitale
                </h2>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tighter leading-[0.9]">
                  VOTRE IMAGE
                  <br />
                  SUR INTERNET
                </h1>
              </div>
              <span className="text-cyan-500 font-mono text-[10px] sm:text-xs">01 // OSINT</span>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl font-light tracking-wide border-l-2 border-cyan-500 pl-4 sm:pl-6 mb-8 md:mb-12">
              Découvrez ce qui est visible publiquement sur votre image grâce à l'OSINT (Open Source Intelligence). 
              Une analyse complète de votre présence digitale et de vos données publiques.
            </p>

            {/* Search Section - Before the 3 phones */}
            <div className="max-w-4xl mx-auto mb-16 md:mb-24">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight" style={{ fontStyle: 'italic' }}>
                  Mon entreprise a-t-elle
                  <br />
                  <span className="text-cyan-400">été compromise ?</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-400 mb-8">
                  Vérifiez si votre adresse email a été compromise dans des fuites de données
                </p>

                <div className="max-w-xl mx-auto space-y-4">
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={handleEmailChange}
                      placeholder="Entrez votre adresse email"
                      className="w-full px-6 py-4 md:py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-base md:text-lg placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    />
                    {emailError && <p className="text-sm text-red-400 text-left">{emailError}</p>}
                    <button
                      onClick={handleEmailSearch}
                      disabled={!emailAddress || !!emailError || isSearching}
                      className="w-full py-4 md:py-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-base md:text-lg font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 disabled:hover:shadow-none flex items-center justify-center gap-3"
                    >
                      <Search className="w-5 h-5" />
                      {isSearching ? 'Recherche en cours...' : 'Rechercher'}
                    </button>
                  </div>
                </div>

                {/* Breach Results */}
                {breachResults && (
                  <div className="mt-8 max-w-3xl mx-auto entrance-animation-1">
                    {breachResults.totalBreaches === 0 ? (
                      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                              ✓ Aucune fuite détectée
                            </h3>
                            <p className="text-sm md:text-base text-green-200">
                              L'adresse email <span className="font-medium">{breachResults.email}</span> n'apparaît dans aucune fuite de données connue.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                              <AlertTriangle className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                                ⚠ {breachResults.totalBreaches} fuite{breachResults.totalBreaches > 1 ? 's' : ''} détectée{breachResults.totalBreaches > 1 ? 's' : ''}
                              </h3>
                              <p className="text-sm md:text-base text-red-200">
                                L'adresse email <span className="font-medium">{breachResults.email}</span> a été compromise dans les incidents suivants :
                              </p>
                            </div>
                          </div>
                        </div>

                        {breachResults.breaches.map((breach: any, index: number) => (
                          <div 
                            key={index}
                            className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="text-lg md:text-xl font-semibold text-white mb-1">
                                  {breach.title}
                                </h4>
                                {breach.domain && (
                                  <p className="text-sm text-slate-400">
                                    Domaine: {breach.domain}
                                  </p>
                                )}
                              </div>
                              {breach.isVerified && (
                                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-semibold">
                                  Vérifié
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Date de la fuite</p>
                                <p className="text-sm text-white font-medium">
                                  {new Date(breach.breachDate).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Comptes compromis</p>
                                <p className="text-sm text-white font-medium">
                                  {breach.pwnCount.toLocaleString('fr-FR')}
                                </p>
                              </div>
                            </div>

                            {breach.description && (
                              <div className="mb-4">
                                <p className="text-xs text-slate-500 mb-2">Description</p>
                                <div 
                                  className="text-sm text-slate-300 leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: breach.description }}
                                />
                              </div>
                            )}

                            {breach.dataClasses && breach.dataClasses.length > 0 && (
                              <div>
                                <p className="text-xs text-slate-500 mb-2">Données compromises</p>
                                <div className="flex flex-wrap gap-2">
                                  {breach.dataClasses.map((dataClass: string, idx: number) => (
                                    <span 
                                      key={idx}
                                      className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs"
                                    >
                                      {dataClass}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="mt-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/30 max-w-3xl mx-auto">
                    <p className="text-red-400 text-center">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 relative z-10 pb-24 md:pb-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:gap-8 xl:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
              
              {/* Screen 1 - Intro */}
              <div className="w-full max-w-[390px] entrance-animation-1">
                <div className="relative rounded-[2.5rem] sm:rounded-[3rem] p-[2px] bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-cyan-500/60 shadow-[0_20px_80px_-12px_rgba(6,182,212,0.4)]">
                  <div className="rounded-[2.4rem] sm:rounded-[2.9rem] bg-black overflow-hidden h-[720px] sm:h-[800px] lg:h-[844px] relative neon-border">
                    
                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 sm:px-8 pt-3 sm:pt-4 pb-2">
                      <div className="text-white text-xs sm:text-sm">9:41</div>
                      <div className="w-5 h-4 sm:w-6 sm:h-5 rounded-full bg-neutral-800/70"></div>
                      <div className="flex items-center gap-1 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4"><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path><path d="M22 4v16"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4"><path d="M12 20h.01"></path><path d="M2 8.82a15 15 0 0 1 20 0"></path><path d="M5 12.859a10 10 0 0 1 14 0"></path><path d="M8.5 16.429a5 5 0 0 1 7 0"></path></svg>
                        <div className="w-5 h-2.5 sm:w-6 sm:h-3 rounded-sm border border-white/60 relative">
                          <div className="absolute inset-0.5 bg-white rounded-[1px]"></div>
                          <div className="absolute -right-0.5 top-0.5 sm:top-1 w-0.5 h-1 bg-white/60 rounded-r-sm"></div>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex flex-col h-full pt-8 sm:pt-12 pr-6 sm:pr-8 pb-6 sm:pb-8 pl-6 sm:pl-8 overflow-y-auto no-scrollbar">
                      <div className="relative mx-auto mt-4 sm:mt-8 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
                        <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" />
                      </div>

                      <div className="flex-1 flex flex-col justify-center mt-4 sm:mt-6">
                        <h2 className="text-[26px] sm:text-[32px] leading-[1.1] text-white/90 tracking-tight font-semibold text-center">
                          OSINT pour Entreprises
                        </h2>
                        <p className="text-[12px] sm:text-[14px] leading-5 sm:leading-6 text-neutral-400 mt-3 sm:mt-4 text-center">
                          L'OSINT (Open Source Intelligence) collecte des informations publiques sur les entreprises à partir de sources ouvertes.
                        </p>

                        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                          <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-neutral-900/40 border border-white/5">
                            <Database className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[12px] sm:text-[13px] text-white font-medium">Données Légales</p>
                              <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">SIRET, SIREN, forme juridique, capital</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-neutral-900/40 border border-white/5">
                            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[12px] sm:text-[13px] text-white font-medium">Présence Digitale</p>
                              <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Sites web, réseaux sociaux, domaines</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-neutral-900/40 border border-white/5">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[12px] sm:text-[13px] text-white font-medium">Sources Multiples</p>
                              <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Infogreffe, INSEE, OpenCorporates, etc.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-28 h-1 sm:w-36 sm:h-1 bg-white/30 rounded-full mx-auto mt-4 sm:mt-6"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 2 - Info */}
              <div className="w-full max-w-[390px] entrance-animation-2">
                <div className="relative shadow-[0_20px_80px_-12px_rgba(6,182,212,0.4)] bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-cyan-500/60 rounded-[2.5rem] sm:rounded-[3rem] p-[2px]">
                  <div className="overflow-hidden h-[720px] sm:h-[800px] lg:h-[844px] relative bg-black rounded-[2.4rem] sm:rounded-[2.9rem] neon-border">
                    
                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 sm:px-8 pt-3 sm:pt-4 pb-2">
                      <div className="text-white text-xs sm:text-sm">9:41</div>
                      <div className="w-5 h-4 sm:w-6 sm:h-5 rounded-full bg-neutral-800/70"></div>
                      <div className="flex items-center gap-1 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4"><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path><path d="M22 4v16"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4"><path d="M12 20h.01"></path><path d="M2 8.82a15 15 0 0 1 20 0"></path><path d="M5 12.859a10 10 0 0 1 14 0"></path><path d="M8.5 16.429a5 5 0 0 1 7 0"></path></svg>
                        <div className="w-5 h-2.5 sm:w-6 sm:h-3 rounded-sm border border-white/60 relative">
                          <div className="absolute inset-0.5 bg-white rounded-[1px]"></div>
                          <div className="absolute -right-0.5 top-0.5 sm:top-1 w-0.5 h-1 bg-white/60 rounded-r-sm"></div>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex flex-col h-full pt-3 sm:pt-4 pr-5 sm:pr-6 pb-5 sm:pb-6 pl-5 sm:pl-6">
                      <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500">
                            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-neutral-900 flex items-center justify-center">
                              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                            </div>
                          </div>
                          <div>
                            <h2 className="text-[16px] sm:text-[18px] text-white tracking-tight">OSINT Search</h2>
                            <p className="text-[10px] sm:text-xs text-neutral-400">Recherche d'entreprise</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-center space-y-3">
                        <div className="relative">
                          <input
                            type="text"
                            value={siretNumber}
                            onChange={(e) => setSiretNumber(e.target.value.replace(/\D/g, '').substring(0, 14))}
                            placeholder="Numéro SIRET"
                            className="w-full px-4 py-3 bg-neutral-900/40 border border-white/10 rounded-lg text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                            maxLength={14}
                          />
                        </div>

                        <button
                          onClick={handleSearch}
                          disabled={!siretNumber || siretNumber.length !== 14 || isSearching}
                          className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 disabled:hover:shadow-none flex items-center justify-center gap-2"
                        >
                          <Search className="w-4 h-4" />
                          Rechercher
                        </button>

                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mt-2">
                          <div className="p-2.5 sm:p-3 bg-neutral-900/40 border border-white/5 rounded-lg text-center">
                            <Database className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mx-auto mb-1.5 sm:mb-2" />
                            <p className="text-[10px] sm:text-[11px] text-neutral-400">+13 Sources</p>
                          </div>
                          <div className="p-2.5 sm:p-3 bg-neutral-900/40 border border-white/5 rounded-lg text-center">
                            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mx-auto mb-1.5 sm:mb-2" />
                            <p className="text-[10px] sm:text-[11px] text-neutral-400">Données Publiques</p>
                          </div>
                        </div>
                      </div>

                      <div className="w-28 h-1 sm:w-36 sm:h-1 bg-white/30 rounded-full mx-auto mt-4 sm:mt-6"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 3 - Results */}
              <div className="w-full max-w-[390px] entrance-animation-3">
                <div className="relative rounded-[2.5rem] sm:rounded-[3rem] p-[2px] bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-cyan-500/60 shadow-[0_20px_80px_-12px_rgba(6,182,212,0.4)]">
                  <div className="rounded-[2.4rem] sm:rounded-[2.9rem] bg-black overflow-hidden h-[720px] sm:h-[800px] lg:h-[844px] relative neon-border">
                    
                    {/* Status Bar */}
                    <div className="flex items-center justify-between px-6 sm:px-8 pt-3 sm:pt-4 pb-2">
                      <div className="text-white text-xs sm:text-sm">9:41</div>
                      <div className="w-5 h-4 sm:w-6 sm:h-5 rounded-full bg-neutral-800/70"></div>
                      <div className="flex items-center gap-1 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4"><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path><path d="M22 4v16"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4"><path d="M12 20h.01"></path><path d="M2 8.82a15 15 0 0 1 20 0"></path><path d="M5 12.859a10 10 0 0 1 14 0"></path><path d="M8.5 16.429a5 5 0 0 1 7 0"></path></svg>
                        <div className="w-5 h-2.5 sm:w-6 sm:h-3 rounded-sm border border-white/60 relative">
                          <div className="absolute inset-0.5 bg-white rounded-[1px]"></div>
                          <div className="absolute -right-0.5 top-0.5 sm:top-1 w-0.5 h-1 bg-white/60 rounded-r-sm"></div>
                        </div>
                      </div>
                    </div>

                    <div className="relative px-5 sm:px-6 pb-6 sm:pb-8 pt-5 sm:pt-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h2 className="text-[16px] sm:text-[18px] text-white tracking-tight font-semibold">Résultats OSINT</h2>
                        {searchProgress === 100 && (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                        )}
                      </div>

                      <div className="flex-1 overflow-y-auto no-scrollbar space-y-2.5 sm:space-y-3 pb-14 sm:pb-16">
                        {results.filter(result => result.status === 'found').map((result) => {
                          const Icon = result.icon;
                          const isExpanded = expandedResult === result.id;
                          const hasDetails = result.details && result.details.length > 0;
                          
                          return (
                            <div
                              key={result.id}
                              className={`rounded-xl bg-neutral-900/40 border border-white/5 transition-all ${
                                result.status !== 'pending' ? 'result-appear' : 'opacity-30'
                              } ${isExpanded && hasDetails ? 'bg-neutral-900/60' : ''}`}
                            >
                              <button
                                onClick={() => {
                                  if (hasDetails && result.status === 'found') {
                                    setExpandedResult(isExpanded ? null : result.id);
                                  }
                                }}
                                disabled={!hasDetails || result.status !== 'found'}
                                className="w-full p-2.5 sm:p-3 text-left"
                              >
                                <div className="flex items-start gap-2.5 sm:gap-3">
                                  <div className="mt-0.5 sm:mt-1">
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className="text-[12px] sm:text-[13px] text-neutral-200 font-medium">{result.title}</p>
                                      <div className={`size-1.5 sm:size-2 rounded-full ${getStatusColor(result.status)} flex-shrink-0`}></div>
                                    </div>
                                    <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1">{result.description}</p>
                                    {result.status !== 'pending' && (
                                      <div className="flex items-center justify-between mt-1.5 sm:mt-2">
                                        <span className={`text-[10px] sm:text-xs ${getStatusTextColor(result.status)}`}>
                                          {getStatusText(result.status)}
                                        </span>
                                        {hasDetails && result.status === 'found' && (
                                          <span className="text-[10px] sm:text-xs text-cyan-400">
                                            {isExpanded ? '▼ Masquer' : '▶ Voir détails'}
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </button>
                              
                              {isExpanded && hasDetails && result.status === 'found' && (
                                <div className="px-2.5 sm:px-3 pb-2.5 sm:pb-3 space-y-1.5 sm:space-y-2 border-t border-white/5 pt-2.5 sm:pt-3 mt-2">
                                  {result.details!.map((detail, idx) => (
                                    <div key={idx} className="flex justify-between text-[10px] sm:text-xs gap-2">
                                      <span className="text-neutral-400 flex-shrink-0">{detail.label}</span>
                                      <span className="text-neutral-200 font-medium text-right">{detail.value}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {searchProgress === 100 && (
                        <div className="absolute bottom-16 sm:bottom-20 left-5 right-5 sm:left-6 sm:right-6 p-3 sm:p-4 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 rounded-xl result-appear">
                          <div className="flex items-center justify-between text-[10px] sm:text-xs">
                            <span className="text-neutral-400">Sources consultées</span>
                            <span className="text-cyan-400 font-semibold">13/13</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] sm:text-xs mt-1.5 sm:mt-2">
                            <span className="text-neutral-400">Données collectées</span>
                            <span className="text-green-400 font-semibold">85%</span>
                          </div>
                        </div>
                      )}

                      <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 w-28 h-1 sm:w-36 sm:h-1 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section - Below search bar */}
            {results.some(r => r.status === 'found') && (
              <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6 md:mb-8">Résultats de la recherche</h3>
                <div className="space-y-4 md:space-y-6">
                  {results.filter(result => result.status === 'found').map((result) => {
                    const Icon = result.icon;
                    const isExpanded = expandedResult === result.id;
                    const hasDetails = result.details && result.details.length > 0;
                    
                    return (
                      <div
                        key={result.id}
                        className="rounded-2xl bg-white/5 border border-white/10 transition-all result-appear"
                      >
                        <button
                          onClick={() => {
                            if (hasDetails && result.status === 'found') {
                              setExpandedResult(isExpanded ? null : result.id);
                            }
                          }}
                          disabled={!hasDetails || result.status !== 'found'}
                          className="w-full p-5 md:p-6 text-left"
                        >
                          <div className="flex items-start gap-4 md:gap-5">
                            <div className="mt-1">
                              <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-lg md:text-xl text-white font-semibold">{result.title}</p>
                                <div className={`size-3 md:size-4 rounded-full ${getStatusColor(result.status)} flex-shrink-0`}></div>
                              </div>
                              <p className="text-sm md:text-base text-neutral-400 mb-3">{result.description}</p>
                              <div className="flex items-center justify-between">
                                <span className={`text-sm md:text-base ${getStatusTextColor(result.status)}`}>
                                  {getStatusText(result.status)}
                                </span>
                                {hasDetails && result.status === 'found' && (
                                  <span className="text-sm md:text-base text-cyan-400">
                                    {isExpanded ? '▼ Masquer les détails' : '▶ Voir les détails'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                        
                        {isExpanded && hasDetails && result.status === 'found' && (
                          <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3 md:space-y-4 border-t border-white/10 pt-5 md:pt-6">
                            {result.details!.map((detail, idx) => (
                              <div key={idx} className="flex justify-between text-sm md:text-base gap-4">
                                <span className="text-neutral-400 flex-shrink-0">{detail.label}</span>
                                <span className="text-white font-medium text-right">{detail.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {searchProgress === 100 && (
                  <div className="mt-8 md:mt-10 p-5 md:p-6 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 rounded-2xl result-appear">
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="text-neutral-400">Sources consultées</span>
                      <span className="text-cyan-400 font-semibold">13/13</span>
                    </div>
                    <div className="flex items-center justify-between text-sm md:text-base mt-3">
                      <span className="text-neutral-400">Données collectées</span>
                      <span className="text-green-400 font-semibold">85%</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 px-6 text-center">
          <ExpertCTAButton />
        </section>

        <Footer />
      </div>
    </div>
  );
}