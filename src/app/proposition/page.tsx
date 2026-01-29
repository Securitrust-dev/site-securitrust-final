'use client';

import { Users, Target, CheckCircle2, FileCheck, Search, Database, Server, Network, Lock, FileSignature, CreditCard, Home, Feather, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ProposalHeader } from '@/components/sections/proposal-header';

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
    router.push('/signer-proposition');
  };

  const handlePayment = () => {
    router.push('/paiement');
  };

  return (
    <div className="antialiased selection:bg-white selection:text-black overflow-x-hidden text-white font-['Inter',sans-serif] bg-[#011C1C]">
      {/* Proposal Header Banner */}
      <ProposalHeader clientName={orderData?.company?.name || orderData?.companyName || "Client"} />

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
      <header className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="">
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Proposition Commerciale</p>
              <p className="text-sm font-medium text-cyan-400">
                {orderData?.company?.name || orderData?.companyName || "Votre Entreprise"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-200 transition-all duration-300 hover:scale-105"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Retour</span>
            </button>
            <div className="text-xs text-zinc-400">
              {getCurrentDate()}
            </div>
          </div>
        </nav>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
        
        {/* Hero Section - Inspired by screenshot */}
        <section className="relative h-[60vh] flex flex-col items-center justify-center bg-[#011C1C] overflow-hidden -mx-6 mb-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <h1 className="flex items-center gap-6 text-[10vw] lg:text-[120px] font-black leading-none tracking-tighter uppercase text-white">
              <span className="text-[#D9FF99]">→</span>
              <div className="flex flex-col items-center">
                <span>VOTRE</span>
                <span className="text-[#D9FF99]">BESOIN</span>
              </div>
            </h1>
          </div>
        </section>

        {/* Content Layout - Inspired by screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* CONTEXTE Box */}
          <div className="lg:col-span-2 rounded-3xl bg-[#0a0c10] border border-white/5 p-8 md:p-12">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-8">CONTEXTE</h2>
            <div className="space-y-6 text-zinc-400 leading-relaxed">
              <p className="text-lg">
                <span className="font-bold text-white uppercase">{orderData?.company?.name || orderData?.companyName || "VOTRE ENTREPRISE"}</span> souhaite être accompagnée dans l'évaluation et le renforcement de sa posture de cybersécurité.
              </p>
              <p>
                L'objectif est de réaliser un <span className="text-white font-medium">test d'intrusion interne</span> complet sur l'environnement Active Directory afin d'identifier les vulnérabilités critiques et proposer une remédiation concrète.
              </p>
              <p>
                Le travail consistera à analyser la structure de l'Active Directory, évaluer la sécurité des comptes privilégiés et tester les mécanismes d'authentification. L'approche en boîte grise permettra de simuler un scénario d'attaque réaliste depuis une position d'utilisateur authentifié.
              </p>
              <p>
                SecuriTrust accompagnera vos équipes sur l'ensemble du processus : de la reconnaissance initiale à l'exploitation des failles, jusqu'à la livraison d'un rapport détaillé incluant un résumé exécutif pour la direction et des recommandations techniques pour les administrateurs.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Livrables attendus Box */}
            <div className="flex-1 rounded-3xl bg-[#D9FF99] p-8 md:p-10">
              <h3 className="text-3xl font-bold text-[#011C1C] mb-6">Livrables attendus</h3>
              <ul className="space-y-4">
                {[
                  'Rapport de test d\'intrusion complet',
                  'Résumé exécutif pour la direction',
                  'Plan de remédiation détaillé',
                  'Support post-audit (1 mois)',
                  'Attestation de sécurité'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#011C1C]">
                    <div className="mt-1 w-5 h-5 rounded border-2 border-[#011C1C] flex items-center justify-center bg-[#011C1C]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D9FF99]" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Période de collaboration Box */}
            <div className="rounded-3xl bg-[#6366F1] p-8 md:p-10 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-medium mb-4 opacity-90 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Période de collaboration
                </h3>
                <div className="flex flex-col">
                  <span className="text-6xl font-black uppercase tracking-tighter italic">2 semaines</span>
                  <span className="text-sm opacity-80 mt-2 font-medium bg-black/20 self-start px-3 py-1 rounded-full">— du lancement au rapport final</span>
                </div>
              </div>
              
              {/* Illustration Placeholder - Calendar/Clock feel */}
              <div className="absolute bottom-[-10px] right-[-10px] opacity-20 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                <Clock className="w-48 h-48" />
              </div>
            </div>
          </div>
        </div>

        {/* Trusted Clients */}
        <section className="mb-16">
          <h2 className="text-3xl font-light text-white mb-8 text-center">
            Ils nous font <span className="font-semibold italic">confiance</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
              <div key={idx} className="group relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center p-4">
                <Image 
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={60}
                  className="w-full h-full object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Prochaines Étapes */}
        <section className="rounded-3xl bg-[#0a0c10] border border-white/5 p-12">
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
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                          >
                          <span>Signer</span>
                          <Feather className="w-5 h-5" />
                        </button>
                )}

              {/* Info Text */}
              <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm text-zinc-400 mb-2">
                    Pour toute question ou commentaire, veuillez contacter{' '}
                    <a href="mailto:jad.joumblat@securitrust.fr" className="text-cyan-400 hover:underline font-medium">
                      jad.joumblat@securitrust.fr
                    </a> ou <span className="text-cyan-400">06 08 94 87 97</span>
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