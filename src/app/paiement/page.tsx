'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle2, AlertCircle, FileSignature } from 'lucide-react';
import { toast } from 'sonner';

export default function PaiementPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSigned, setIsSigned] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    country: 'France'
  });

  const planPrices = {
    'Starter': 2499,
    'Pro': 4999,
    'Team': 9999
  };

  const currentAmount = planPrices[selectedPlan as keyof typeof planPrices];

  useEffect(() => {
    const propositionSigned = sessionStorage.getItem('propositionSigned');
    
    if (propositionSigned !== 'true') {
      toast.error('Vous devez d\'abord signer la proposition commerciale.');
      setTimeout(() => {
        router.push('/signer-proposition');
      }, 2000);
      return;
    }

    setIsSigned(true);
    const storedData = sessionStorage.getItem('eligibilityData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setOrderData(data);
        const emailAnswer = data.answers?.find((a: any) => a.questionId === 'email')?.answer;
        if (emailAnswer) {
          setFormData(prev => ({ ...prev, email: emailAnswer }));
        }
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
    setLoading(false);
  }, [router]);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.name) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsProcessing(true);
    toast.info('Création de la session de paiement...');
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          amount: currentAmount,
          email: formData.email,
          name: formData.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création de la session');
      }

      if (data.url) {
        const isInIframe = window.self !== window.top;
        if (isInIframe) {
          window.parent.postMessage(
            { type: 'OPEN_EXTERNAL_URL', data: { url: data.url } },
            '*'
          );
        } else {
          window.location.href = data.url;
        }
      }
    } catch (error: any) {
      console.error('Erreur paiement:', error);
      toast.error(error.message || 'Erreur lors de la création du paiement');
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Vérification...</p>
        </div>
      </div>
    );
  }

  if (!isSigned) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Signature requise
            </h2>
            <p className="text-zinc-400 mb-6">
              Vous devez d'abord signer la proposition commerciale avant d'accéder au paiement.
            </p>
            <button
              onClick={() => router.push('/signer-proposition')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all"
            >
              <FileSignature className="w-5 h-5" />
              Signer la proposition
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 bg-cover py-20 w-full min-h-screen" style={{ fontFamily: "'Geist', 'Inter', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Checkout Form */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/70 to-black p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg tracking-tight text-white">Paiement sécurisé</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 text-white">
                SSL 256‑bit
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-400">
              Finalisez votre commande. Aucun frais caché.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm mb-1 text-white">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={isProcessing}
                  placeholder="vous@entreprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white bg-black/40 border-white/10 border rounded-lg pt-2 pr-3 pb-2 pl-3 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Name and Country */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="name" className="block text-sm mb-1 text-white">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isProcessing}
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white bg-black/40 border-white/10 border rounded-lg pt-2 pr-3 pb-2 pl-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm mb-1 text-white">
                    Pays
                  </label>
                  <select
                    id="country"
                    name="country"
                    disabled={isProcessing}
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/40 border-white/10 border rounded-lg pt-2 pr-3 pb-2 pl-3 text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option style={{ backgroundColor: '#000', color: '#fff' }}>France</option>
                    <option style={{ backgroundColor: '#000', color: '#fff' }}>Belgique</option>
                    <option style={{ backgroundColor: '#000', color: '#fff' }}>Suisse</option>
                    <option style={{ backgroundColor: '#000', color: '#fff' }}>Canada</option>
                    <option style={{ backgroundColor: '#000', color: '#fff' }}>Luxembourg</option>
                    <option style={{ backgroundColor: '#000', color: '#fff' }}>Autre</option>
                  </select>
                </div>
              </div>

              {/* Summary */}
              <div className="pt-4 border-t border-white/10">
                <dl className="text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <dt className="text-gray-400">Formule sélectionnée</dt>
                    <dd className="text-gray-200">{selectedPlan}</dd>
                  </div>
                  <div className="flex items-center justify-between font-medium pt-2 border-t border-white/10">
                    <dt className="text-white">Total HT</dt>
                    <dd className="text-white">{currentAmount.toLocaleString('fr-FR')} €</dd>
                  </div>
                </dl>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm bg-blue-400 text-black hover:bg-blue-300 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      Payer en toute sécurité
                      <Lock className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="mt-3 text-xs text-gray-500 text-center">
                  En continuant, vous acceptez les Conditions Générales et la Politique de Confidentialité.
                </p>
              </div>
            </form>
          </div>

          {/* Right Column - What You Get */}
          <div className="border-white/10 border rounded-2xl bg-black/20 backdrop-blur-xl pt-6 pr-6 pb-6 pl-6">
            <h3 className="text-lg tracking-tight text-white">Ce que vous obtenez</h3>
            
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="flex-1">Test d'Intrusion Complet</span>
                <span className="mt-0.5 inline-flex w-6 h-6 items-center justify-center rounded-md bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-teal-300" />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-1">OSINT & Reconnaissance Externe</span>
                <span className="mt-0.5 inline-flex w-6 h-6 items-center justify-center rounded-md bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-teal-300" />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-1">Évaluation Active Directory</span>
                <span className="mt-0.5 inline-flex w-6 h-6 items-center justify-center rounded-md bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-teal-300" />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-1">Rapport de Sécurité Détaillé</span>
                <span className="mt-0.5 inline-flex w-6 h-6 items-center justify-center rounded-md bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-teal-300" />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-1">Résumé Exécutif & Recommandations</span>
                <span className="mt-0.5 inline-flex w-6 h-6 items-center justify-center rounded-md bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-teal-300" />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-1">Support Post-Évaluation (30 jours)</span>
                <span className="mt-0.5 inline-flex w-6 h-6 items-center justify-center rounded-md bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-teal-300" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}