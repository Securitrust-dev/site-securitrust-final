import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, Calendar, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Demande envoyée — Cyber-Pilote | SecuriTrust',
  robots: { index: false },
};

const PLAN_NAMES: Record<string, string> = {
  starter: 'Starter',
  standard: 'Standard',
  advanced: 'Advanced',
  enterprise: 'Enterprise',
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; nom?: string }>;
}) {
  const { plan, nom } = await searchParams;
  const planName = PLAN_NAMES[plan ?? ''] ?? 'sélectionné';
  const firstName = nom ?? 'Cher client';

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#030303] flex items-center justify-center px-4 pt-28 pb-20">
        <div className="max-w-xl w-full text-center">

          <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-cyan-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Demande envoyée !
          </h1>
          <p className="text-slate-400 mb-10 leading-relaxed">
            Merci {firstName}. Votre demande de souscription au plan{' '}
            <span className="text-cyan-400 font-semibold">RSSI {planName}</span> a bien été reçue.
            Notre équipe vous contactera <strong className="text-white">sous 24 heures</strong> pour
            finaliser votre contrat.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-left">
              <Mail className="w-5 h-5 text-cyan-400 mb-3" />
              <p className="text-white font-semibold text-sm mb-1">Confirmation par email</p>
              <p className="text-slate-400 text-xs">Un récapitulatif vous sera envoyé à l'adresse fournie.</p>
            </div>
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-left">
              <Calendar className="w-5 h-5 text-cyan-400 mb-3" />
              <p className="text-white font-semibold text-sm mb-1">Planifier un appel</p>
              <p className="text-slate-400 text-xs">
                Vous pouvez aussi réserver un créneau directement.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://calendly.com/expert-securitrust"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#030303] font-bold text-sm uppercase tracking-widest rounded-lg transition-colors"
            >
              Prendre rendez-vous
            </a>
            <Link
              href="/cyber-pilote"
              className="px-6 py-3 border border-white/20 hover:border-cyan-500/50 text-white hover:text-cyan-400 font-semibold text-sm rounded-lg transition-colors"
            >
              Retour aux offres
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
