import { Cookie } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';

export default function PolitiqueCookiesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#02040a' }}>
      <Navbar />
      
      <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 mb-6">
            <Cookie className="h-4 w-4 text-[#38bdf8]" />
            <span className="text-xs sm:text-sm font-mono text-[#38bdf8]">SECURITRUST</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Politique de cookies
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Dernière mise à jour : 24 avril 2019
          </p>
        </div>

        {/* Content */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 lg:p-12 space-y-8">
          {/* Main Content */}
          <section>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Le Site ne collecte aucune donnée à caractère personnel concernant les Utilisateurs qui le consultent. Toutefois, le Site peut recourir aux cookies dits de statistiques et d'informations sur le trafic dans le but de faciliter la navigation et d'améliorer le service pour les Utilisateurs qui le consultent. Ces cookies s'ils sont déposés, servent uniquement à produire des statistiques anonymes afin de déterminer la fréquentation des Utilisateurs du Site par ville mais ne permettent pas à la Société de suivre la navigation des Utilisateurs du Site une fois qu'ils quittent ce dernier.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Les données collectées grâce au dépôt de cookies ne sont pas recoupées avec d'autres traitements de données dans la mesure où la Société ne réalise pas d'autre traitements. Les cookies sont conservés pour une durée maximale de 13 mois à compter de la première visite de l'Utilisateur sur le Site.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Les personnes qui souhaitent s'opposer au dépôt de tels cookies peuvent le faire en modifiant les paramètres de leur navigateur internet. Le site internet SecuriTrust (ci-après le « Site ») est accessible à l'adresse suivante : <a href="https://www.securitrust.com" target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] hover:underline">https://www.securitrust.com</a>
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              L'accès et l'utilisation du Site sont soumis aux présentes "Mentions Légales" et aux suivantes « Conditions Générales », ainsi qu'aux lois et/ou règlements applicables. La connexion, l'utilisation et l'accès au Site impliquent l'acceptation intégrale et sans réserve de l'internaute de toutes les dispositions des présentes.
            </p>
          </section>

          {/* Footer info */}
          <section className="pt-8 border-t border-white/10">
            <div className="space-y-2 text-sm text-slate-400">
              <p><strong className="text-white">Adresse :</strong></p>
              <p>SecuriTrust</p>
              <p>11 Rue Saint-Didier, 75116 Paris</p>
              <p>Email : contact@securitrust.fr</p>
              <p>Tél : 06 08 94 87 97</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}