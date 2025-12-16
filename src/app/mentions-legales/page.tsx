import { Shield, Check } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';

export default function MentionsLegalesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#02040a' }}>
      <Navbar />
      
      <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 mb-6">
            <Shield className="h-4 w-4 text-[#38bdf8]" />
            <span className="text-xs sm:text-sm font-mono text-[#38bdf8]">SECURITRUST</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Mentions légales
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Dernière mise à jour : 24 avril 2019
          </p>
        </div>

        {/* Content */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 lg:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs du site SecuriTrust les présentes mentions légales. Le site Internet SecuriTrust (ci-après le « Site ») est accessible à l'adresse suivante : https://www.securitrust.com L'accès et l'utilisation du Site sont soumis aux présentes "Mentions Légales" et aux suivantes « Conditions Générales », ainsi qu'aux lois et/ou règlements applicables. La connexion, l'utilisation et l'accès au Site impliquent l'acceptation intégrale et sans réserve de l'internaute de toutes les dispositions des présentes
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">Dénomination sociale:</strong> SecuriTrust
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">Siège social:</strong> 11, rue Saint Didier, 75116 PARIS
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">Téléphone:</strong> +33 6 08 94 87 97
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">Société par actions simplifiée à associé unique au capital de 5000 euros</strong>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">RCS:</strong> Paris B 818 187 825
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">SIREN:</strong> 818 187 825
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">Code APE:</strong> 6202
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">Directeur de la publication:</strong> Jad JOUMBLAT
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">Contact:</strong> info@securitrust.com
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">Hébergeur:</strong> Netlify
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">Siège social:</strong> 2, rue Kellermann 59100 ROUBAIX
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm sm:text-base">
                  <strong className="text-white">Téléphone:</strong> +33 6 08 94 87 97
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
