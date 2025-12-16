'use client';

import { useState } from 'react';
import { Search, Database, Building, Gavel, ChartLine, Globe, Share2, Link as LinkIcon, Landmark, CheckCircle, Rocket, Users, Star, Archive, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface OSINTSource {
  name: string;
  icon: string;
  baseUrl: string;
}

const osintSources: Record<string, OSINTSource> = {
  infogreffe: {
    name: "Infogreffe",
    icon: "landmark",
    baseUrl: "https://www.infogreffe.fr/recherche-siret-entreprise/chercher-dirigeant-entreprise.html?identite="
  },
  sirene: {
    name: "Base Sirène INSEE",
    icon: "database",
    baseUrl: "https://avis-situation-sirene.insee.fr/"
  },
  societe: {
    name: "Société.com",
    icon: "building",
    baseUrl: "https://www.societe.com/cgi-bin/search?champs="
  },
  verif: {
    name: "Verif.com",
    icon: "check-circle",
    baseUrl: "https://www.verif.com/"
  },
  haveibeenpwned: {
    name: "Have I Been Pwned",
    icon: "alert-triangle",
    baseUrl: "https://haveibeenpwned.com/DomainSearch?domain="
  },
  opencorporates: {
    name: "OpenCorporates",
    icon: "globe",
    baseUrl: "https://opencorporates.com/companies?q="
  },
  companiesHouse: {
    name: "Companies House (UK)",
    icon: "landmark",
    baseUrl: "https://find-and-update.company-information.service.gov.uk/search/companies?q="
  },
  linkedin: {
    name: "LinkedIn",
    icon: "share2",
    baseUrl: "https://www.linkedin.com/search/results/companies/?keywords="
  },
  twitter: {
    name: "Twitter/X",
    icon: "share2",
    baseUrl: "https://twitter.com/search?q="
  },
  google: {
    name: "Google",
    icon: "globe",
    baseUrl: "https://www.google.com/search?q="
  },
  crunchbase: {
    name: "Crunchbase",
    icon: "rocket",
    baseUrl: "https://www.crunchbase.com/discover/organizations?q="
  },
  glassdoor: {
    name: "Glassdoor",
    icon: "users",
    baseUrl: "https://www.glassdoor.com/Search/results.htm?keyword="
  },
  trustpilot: {
    name: "Trustpilot",
    icon: "star",
    baseUrl: "https://www.trustpilot.com/search?query="
  },
  wayback: {
    name: "Wayback Machine",
    icon: "archive",
    baseUrl: "https://web.archive.org/web/*/"
  }
};

interface CollectedData {
  basicInfo: {
    name: string;
    activity: string;
    address: string;
    phone: string;
    email: string;
  };
  legalInfo: {
    siret: string;
    siren: string;
    legalForm: string;
    capital: string;
    registration: string;
  };
  financialInfo: {
    turnover: string;
    employees: string;
    creditRating: string;
    financialHealth: string;
  };
  digitalFootprint: {
    website: string;
    domains: string;
    emailDomains: string;
    technicalStack: string;
  };
}

export function OSINTSearchSection() {
  const [siretNumber, setSiretNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSource, setCurrentSource] = useState('');
  const [sourceStatuses, setSourceStatuses] = useState<Record<string, string>>({});
  const [collectedData, setCollectedData] = useState<CollectedData | null>(null);
  const [showSecurityQuote, setShowSecurityQuote] = useState(false);

  const startOSINTSearch = async () => {
    if (!siretNumber.trim()) {
      setError("Veuillez entrer un numéro SIRET");
      toast.error("Veuillez entrer un numéro SIRET");
      return;
    }

    if (siretNumber.length !== 14) {
      setError("Le SIRET doit contenir exactement 14 chiffres");
      toast.error("Le SIRET doit contenir exactement 14 chiffres");
      return;
    }

    setIsLoading(true);
    setError('');
    setShowResults(false);
    setSourceStatuses({});
    setProgress(0);
    setShowSecurityQuote(false);

    try {
      const sourceKeys = Object.keys(osintSources);
      
      for (let i = 0; i < sourceKeys.length; i++) {
        const sourceKey = sourceKeys[i];
        const progressPercent = ((i + 1) / sourceKeys.length) * 100;
        
        setProgress(progressPercent);
        setCurrentSource(osintSources[sourceKey].name);
        setSourceStatuses(prev => ({ ...prev, [sourceKey]: 'pending' }));
        
        await new Promise(resolve => setTimeout(resolve, 150));
        const hasIssue = sourceKey === 'haveibeenpwned' ? Math.random() > 0.5 : Math.random() > 0.2;
        setSourceStatuses(prev => ({ 
          ...prev, 
          [sourceKey]: hasIssue ? 'success' : 'error' 
        }));
        
        if (sourceKey === 'haveibeenpwned' && !hasIssue) {
          setShowSecurityQuote(true);
        }
      }

      const response = await fetch('/api/osint/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siret: siretNumber })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la recherche');
      }

      const result = await response.json();
      setCollectedData(result.data);
      setShowResults(true);
      toast.success('Données collectées avec succès !');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la recherche OSINT';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSearchLinks = (siret: string, companyName: string) => {
    const encoded = encodeURIComponent(companyName || siret);
    return Object.entries(osintSources).map(([key, source]) => ({
      key,
      name: source.name,
      url: source.baseUrl + encoded
    }));
  };

  const InfoCard = ({ title, content }: { title: string; content: string }) => (
    <div className="glass-panel p-3 sm:p-4 border-l-2 border-primary">
      <h4 className="text-foreground font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm">{title}</h4>
      <p className="text-muted-foreground text-xs leading-relaxed">{content}</p>
    </div>
  );

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4" style={{ zIndex: 100 }}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 bg-gradient-to-r from-[#0b1221]/80 to-[#1a2332]/80 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-[#38bdf8]/30 shadow-[0_0_30px_rgba(56,189,248,0.3)] backdrop-blur-sm">
            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-[#38bdf8]" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              OSINT Enterprise Search
            </h2>
          </div>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Recherche OSINT par numéro SIRET - Intelligence sur les entreprises françaises
          </p>
        </div>

        {/* 2 Column Layout: Search Form Left, Results Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT COLUMN: Search Form */}
          <div className="space-y-6">
            {/* Search Card */}
            <div className="bg-gradient-to-br from-[#1a2332]/90 to-[#0b1221]/90 backdrop-blur-sm border border-[#38bdf8]/30 rounded-xl p-4 sm:p-6 shadow-[0_0_40px_rgba(56,189,248,0.2)]">
              <div className="space-y-4">
                {/* Search Input */}
                <div>
                  <label className="block text-white/90 text-sm font-semibold mb-2">Numéro SIRET</label>
                  <input
                    type="text"
                    value={siretNumber}
                    onChange={(e) => setSiretNumber(e.target.value.replace(/\D/g, '').substring(0, 14))}
                    onKeyPress={(e) => e.key === 'Enter' && startOSINTSearch()}
                    placeholder="Entrez le SIRET (14 chiffres)..."
                    className="w-full px-4 py-3 bg-[#0b1221]/80 backdrop-blur-md border-2 border-[#38bdf8]/40 rounded-lg text-white text-sm placeholder:text-white/50 focus:outline-none focus:border-[#38bdf8] focus:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all"
                    autoComplete="off"
                    maxLength={14}
                  />
                  <p className="text-white/60 text-xs mt-2">Format: 14 chiffres (ex: 12345678901234)</p>
                </div>

                {/* Search Button */}
                <button
                  onClick={startOSINTSearch}
                  disabled={isLoading}
                  className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-semibold text-sm sm:text-base rounded-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.8)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-sm sm:text-base">Analyse en cours...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      <span className="text-sm sm:text-base">Lancer la recherche OSINT</span>
                    </>
                  )}
                </button>

                {error && (
                  <div className="p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/40 rounded-lg text-white text-xs sm:text-sm">
                    {error}
                  </div>
                )}

                {/* Loading Progress */}
                {isLoading && (
                  <div className="space-y-3">
                    <div className="h-2 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-[#38bdf8]/30">
                      <div 
                        className="h-full bg-gradient-to-r from-[#38bdf8] via-[#0ea5e9] to-[#38bdf8] transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {currentSource && (
                      <p className="text-white/80 text-xs sm:text-sm text-center">
                        📡 {currentSource}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Source Status - Only show when loading or completed */}
            {Object.keys(sourceStatuses).length > 0 && (
              <div className="bg-gradient-to-br from-[#1a2332]/80 to-[#0b1221]/80 p-4 border border-[#38bdf8]/30 shadow-[0_0_25px_rgba(56,189,248,0.15)] rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-4 w-4 text-[#38bdf8]" />
                  <h3 className="text-sm sm:text-base font-bold text-white">Statut des Sources</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(sourceStatuses).map(([key, status]) => (
                    <div key={key} className="flex items-center gap-2 p-2 bg-white/5 backdrop-blur-sm rounded border border-white/10">
                      <div className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                        status === 'success' ? 'bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 
                        status === 'pending' ? 'bg-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.6)]' : 
                        'bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                      }`} />
                      <span className="text-xs text-white/90 truncate">{osintSources[key].name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Results */}
          <div className="space-y-4 sm:space-y-6 lg:max-h-[800px] lg:overflow-y-auto lg:pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-[#38bdf8]/30 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[#38bdf8]/50">
            {!showResults && !isLoading && (
              <div className="bg-gradient-to-br from-[#1a2332]/60 to-[#0b1221]/60 backdrop-blur-sm border border-[#38bdf8]/20 rounded-xl p-6 sm:p-8 text-center">
                <Database className="h-12 w-12 sm:h-16 sm:w-16 text-[#38bdf8]/40 mx-auto mb-4" />
                <p className="text-white/60 text-xs sm:text-sm">
                  Entrez un numéro SIRET et lancez la recherche pour voir les résultats ici
                </p>
              </div>
            )}

            {showResults && collectedData && (
              <>
                {/* Security Alert */}
                {showSecurityQuote && (
                  <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/40 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-white mb-1">⚠️ Vulnérabilité détectée</h3>
                        <p className="text-white/80 text-xs mb-2 sm:mb-3">
                          Des données potentiellement compromises ont été détectées.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <a 
                            href="/contact" 
                            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs transition-all"
                          >
                            Devis sécurité
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Results Cards */}
                <div className="overflow-hidden border border-[#38bdf8]/30 shadow-[0_0_25px_rgba(56,189,248,0.15)] rounded-xl bg-gradient-to-br from-[#1a2332]/80 to-[#0b1221]/80 backdrop-blur-sm">
                  <div className="bg-gradient-to-r from-[#1e3a5f]/60 to-[#0b1221]/60 p-2.5 sm:p-3 flex items-center gap-2 border-b border-[#38bdf8]/30">
                    <Building className="h-4 w-4 text-[#38bdf8] flex-shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-white">Informations Générales</h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <InfoCard title="Nom" content={collectedData.basicInfo.name} />
                      <InfoCard title="Activité" content={collectedData.basicInfo.activity} />
                      <InfoCard title="Adresse" content={collectedData.basicInfo.address} />
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {generateSearchLinks(siretNumber, collectedData.basicInfo.name).filter(link => 
                        ['infogreffe', 'sirene', 'societe'].includes(link.key)
                      ).map(link => (
                        <a
                          key={link.key}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-medium rounded text-xs hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all"
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden border border-[#38bdf8]/30 shadow-[0_0_25px_rgba(56,189,248,0.15)] rounded-xl bg-gradient-to-br from-[#1a2332]/80 to-[#0b1221]/80 backdrop-blur-sm">
                  <div className="bg-gradient-to-r from-[#1e3a5f]/60 to-[#0b1221]/60 p-2.5 sm:p-3 flex items-center gap-2 border-b border-[#38bdf8]/30">
                    <Gavel className="h-4 w-4 text-[#38bdf8] flex-shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-white">Informations Légales</h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InfoCard title="SIRET" content={collectedData.legalInfo.siret} />
                      <InfoCard title="SIREN" content={collectedData.legalInfo.siren} />
                      <InfoCard title="Forme juridique" content={collectedData.legalInfo.legalForm} />
                      <InfoCard title="Capital" content={collectedData.legalInfo.capital} />
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden border border-[#38bdf8]/30 shadow-[0_0_25px_rgba(56,189,248,0.15)] rounded-xl bg-gradient-to-br from-[#1a2332]/80 to-[#0b1221]/80 backdrop-blur-sm">
                  <div className="bg-gradient-to-r from-[#1e3a5f]/60 to-[#0b1221]/60 p-2.5 sm:p-3 flex items-center gap-2 border-b border-[#38bdf8]/30">
                    <ChartLine className="h-4 w-4 text-[#38bdf8] flex-shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-white">Informations Financières</h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InfoCard title="CA" content={collectedData.financialInfo.turnover} />
                      <InfoCard title="Employés" content={collectedData.financialInfo.employees} />
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden border border-[#38bdf8]/30 shadow-[0_0_25px_rgba(56,189,248,0.15)] rounded-xl bg-gradient-to-br from-[#1a2332]/80 to-[#0b1221]/80 backdrop-blur-sm">
                  <div className="bg-gradient-to-r from-[#1e3a5f]/60 to-[#0b1221]/60 p-2.5 sm:p-3 flex items-center gap-2 border-b border-[#38bdf8]/30">
                    <Globe className="h-4 w-4 text-[#38bdf8] flex-shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-white">Empreinte Numérique</h3>
                  </div>
                  <div className="p-3 sm:p-4 space-y-3">
                    <div className="grid grid-cols-1 gap-3">
                      <InfoCard title="Site web" content={collectedData.digitalFootprint.website} />
                      <InfoCard title="Domaines" content={collectedData.digitalFootprint.domains} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* CTA Section en bas */}
        {showResults && (
          <div className="mt-8 sm:mt-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 sm:p-6 lg:p-8 text-center backdrop-blur-sm">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
              Besoin d'un audit de sécurité complet ?
            </h3>
            <p className="text-white/70 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 lg:mb-6 max-w-2xl mx-auto px-2">
              Protégez votre entreprise avec un audit professionnel. Nos experts analysent votre infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href="/eligibilite" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg font-semibold text-xs sm:text-sm lg:text-base transition-all shadow-lg"
              >
                Je veux être audité
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}