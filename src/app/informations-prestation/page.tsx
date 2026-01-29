'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Server, ShieldAlert, Clock, PhoneCall, Info, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function InformationsPrestationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    activeDirectoryList: '',
    testAccounts: '',
    timeSlots: '',
    urgencyContact: '',
    techRestrictions: ''
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem('eligibilityData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        if (data.prestationInfo) {
          setFormData(data.prestationInfo);
        }
      } catch (error) {
        console.error("Error loading stored data:", error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get existing data
      const existingDataStr = sessionStorage.getItem('eligibilityData');
      const existingData = existingDataStr ? JSON.parse(existingDataStr) : {};

      // Merge with new data
      const updatedData = {
        ...existingData,
        prestationInfo: formData
      };

      sessionStorage.setItem('eligibilityData', JSON.stringify(updatedData));
      
      toast.success("Informations enregistrées");
      router.push('/signer-proposition');
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Une erreur est survenue lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-white selection:bg-cyan-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20">
        <button 
          onClick={() => router.push('/proposition')}
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Retour à la proposition</span>
        </button>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Informations Techniques de Prestation
          </h1>
          <p className="text-zinc-400 text-lg">
            Veuillez compléter ces informations nécessaires à la préparation du contrat et de l'audit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: AD List */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Server className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold">Liste des serveurs Active Directory</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4">Précisez les noms FQDN ou adresses IP inclus dans l'audit.</p>
            <textarea
              name="activeDirectoryList"
              required
              value={formData.activeDirectoryList}
              onChange={handleChange}
              placeholder="Ex: dc01.entreprise.local (192.168.1.10), ..."
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[100px]"
            />
          </div>

          {/* Section 2: Test Accounts */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <ShieldAlert className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold">Comptes test fournis</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4">Identifiant, niveau de privilèges, durée de validité.</p>
            <textarea
              name="testAccounts"
              required
              value={formData.testAccounts}
              onChange={handleChange}
              placeholder="Ex: svc_audit, utilisateur standard, valide du 01/01 au 05/01"
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 min-h-[100px]"
            />
          </div>

          {/* Section 3: Time Slots */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold">Plages horaires autorisées</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4">Précisez les créneaux pour la réalisation de la Prestation.</p>
            <input
              type="text"
              name="timeSlots"
              required
              value={formData.timeSlots}
              onChange={handleChange}
              placeholder="Ex: Lundi au Vendredi, 09:00 - 18:00"
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Section 4: Escalation Contact */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <PhoneCall className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold">Contact d'escalade / d'urgence</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4">Nom, fonction, téléphone, courriel.</p>
            <textarea
              name="urgencyContact"
              required
              value={formData.urgencyContact}
              onChange={handleChange}
              placeholder="Ex: Jean Dupont, RSSI, +33 6 00 00 00 00, j.dupont@entreprise.fr"
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 min-h-[100px]"
            />
          </div>

          {/* Section 5: Specific Instructions */}
          <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:border-pink-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
                <Info className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold">Instructions spécifiques</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4">Restrictions techniques ou consignes particulières.</p>
            <textarea
              name="techRestrictions"
              value={formData.techRestrictions}
              onChange={handleChange}
              placeholder="Ex: Ne pas scanner les serveurs de production critiques entre 12h et 14h..."
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-pink-500/50 min-h-[100px]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Continuer vers le contrat</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
