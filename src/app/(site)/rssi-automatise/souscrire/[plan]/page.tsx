import { notFound } from 'next/navigation';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, Shield, ArrowLeft, FileSignature, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const PLANS: Record<string, {
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  target: string;
  popular: boolean;
  features: string[];
}> = {
  essentiel: {
    name: 'Essentiel',
    priceMonthly: 1950,
    priceAnnual: 23400,
    target: '20 à 80 collaborateurs',
    popular: false,
    features: [
      'Registre des risques & contrôles ISO 27001',
      'KPI & dashboards (basique)',
      'Scan de vulnérabilités mensuel',
      'Monitoring SSL / ports exposés',
      'Analyse logs sécurité partielle',
      'Tickets automatiques + escalade',
      'Rapports PDF mensuels',
      'Veille réglementaire partielle',
    ],
  },
  pro: {
    name: 'Pro',
    priceMonthly: 3500,
    priceAnnual: 42000,
    target: '80 à 250 collaborateurs',
    popular: true,
    features: [
      'Tout le pack Essentiel',
      'KPI & dashboards par service',
      'Scan Cloud exposé',
      'Dark Web monitoring mensuel',
      'OSINT / veille réputation mensuel',
      'Alertes fuite de données',
      'Notifications bi-hebdomadaires',
      "Plan d'action automatisé",
    ],
  },
  business: {
    name: 'Business',
    priceMonthly: 5800,
    priceAnnual: 69600,
    target: '250 à 500 collaborateurs',
    popular: false,
    features: [
      'Tout le pack Pro',
      'Scan de vulnérabilités 2×/mois',
      'Dark Web monitoring hebdomadaire',
      'OSINT & veille réputation hebdo',
      'Notifications quotidiennes',
      'Rapports PDF entièrement automatisés',
      'Documentation de sécurité dynamique',
      'KPI multi-services',
    ],
  },
  premium: {
    name: 'Premium',
    priceMonthly: 9500,
    priceAnnual: 114000,
    target: '500 à 1 000 collaborateurs',
    popular: false,
    features: [
      'Tout le pack Business',
      'Scan de vulnérabilités hebdomadaire',
      'Dark Web & OSINT quotidiens',
      'Notifications en temps réel',
      'KPI & reporting comité de direction',
      'Documentation auto-générée (Wiki)',
      "Plan d'action quasi autonome",
      'Déploiement & onboarding dédié',
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params;
  const p = PLANS[plan];
  if (!p) return {};
  return {
    title: `Souscription Cyber-Pilote — Plan ${p.name} | SecuriTrust`,
    robots: { index: false },
  };
}

export default async function SouscrirePage({
  params,
  searchParams,
}: {
  params: Promise<{ plan: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { plan } = await params;
  const { error } = await searchParams;
  const p = PLANS[plan];
  if (!p) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#030303] pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Back link */}
          <Link
            href="/rssi-automatise"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux offres
          </Link>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-8 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error === 'config'
                ? 'Erreur de configuration serveur. Veuillez nous contacter directement.'
                : 'Une erreur est survenue lors de la génération du contrat. Veuillez réessayer ou nous contacter.'}
            </div>
          )}

          <div className="grid lg:grid-cols-[1fr_420px] gap-10">

            {/* ── LEFT: form ── */}
            <div>
              <div className="mb-8">
                <p className="text-cyan-400 text-xs uppercase tracking-widest font-semibold mb-2">
                  Souscription
                </p>
                <h1 className="text-3xl font-bold text-white leading-tight">
                  Vos informations
                </h1>
                <p className="text-slate-400 mt-2 text-sm">
                  Remplissez ce formulaire et notre équipe vous contactera sous 24 h pour finaliser votre contrat.
                </p>
              </div>

              <form
                action="/api/rssi-subscribe"
                method="POST"
                className="space-y-5"
              >
                <input type="hidden" name="plan" value={plan} />
                <input type="hidden" name="planName" value={p.name} />
                <input type="hidden" name="planPrice" value={p.priceMonthly.toString()} />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
                      Prénom <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="Jean"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
                      Nom <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Dupont"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
                    Email professionnel <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jean.dupont@entreprise.fr"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
                    Entreprise <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    placeholder="Mon Entreprise SAS"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
                      Téléphone <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+33 6 00 00 00 00"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
                      SIRET
                      <span className="text-slate-500 ml-1 normal-case">(optionnel)</span>
                    </label>
                    <input
                      type="text"
                      name="siret"
                      placeholder="123 456 789 00010"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wide">
                    Besoins spécifiques
                    <span className="text-slate-500 ml-1 normal-case">(optionnel)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Décrivez votre contexte, vos contraintes ou vos questions…"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-[#030303] font-bold text-sm uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FileSignature className="w-4 h-4" />
                  Signer mon contrat
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Vos données sont traitées conformément à notre{' '}
                  <Link href="/politique-de-confidentialite" className="text-cyan-400 hover:underline">
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </form>
            </div>

            {/* ── RIGHT: plan recap ── */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className={`rounded-2xl border p-7 bg-white/[0.03] ${p.popular ? 'border-cyan-500/50' : 'border-white/10'}`}>
                {p.popular && (
                  <div className="inline-block px-3 py-1 bg-cyan-500 text-[#030303] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                    Populaire
                  </div>
                )}
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Plan sélectionné</p>
                <h2 className={`text-2xl font-bold mb-1 ${p.popular ? 'text-cyan-400' : 'text-white'}`}>
                  RSSI {p.name}
                </h2>
                <p className="text-slate-400 text-sm mb-5">{p.target}</p>

                <div className="border-t border-white/10 pt-5 mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      {p.priceMonthly.toLocaleString('fr-FR')} €
                    </span>
                    <span className="text-slate-400 text-sm">/mois</span>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-white/10 space-y-2 text-xs text-slate-400">
                  <p className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-500" />
                    Engagement sans frais cachés
                  </p>
                  <p className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-500" />
                    Résiliable à tout moment
                  </p>
                  <p className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-500" />
                    Onboarding dédié inclus
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
