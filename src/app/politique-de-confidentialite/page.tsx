import { Shield } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';

export default function PolitiqueConfidentialitePage() {
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
            Politique de confidentialité
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Dernière mise à jour : Décembre 2024
          </p>
        </div>

        {/* Content */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 lg:p-12 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              1. Identité du responsable du traitement
            </h2>
            <div className="space-y-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p><strong className="text-white">Responsable du site :</strong> SecuriTrust – SASU, immatriculée au RCS de Paris sous le numéro 818 187 825</p>
              <p><strong className="text-white">Dirigeant :</strong> Jad Joumblat (Président)</p>
              <p><strong className="text-white">Siège social :</strong> 11 rue Saint-Didier, 75116 Paris</p>
              <p><strong className="text-white">Numéro de TVA intracommunautaire :</strong> FR21818187825</p>
              <p><strong className="text-white">Adresse email de contact :</strong> expertise@securitrust.fr</p>
              <p><strong className="text-white">Hébergeur :</strong> OVH</p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              2. Données personnelles collectées
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              Nous collectons les données suivantes via notre site :
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-white font-semibold mb-2">Formulaire de contact :</p>
                <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base leading-relaxed space-y-1 ml-4">
                  <li>Nom</li>
                  <li>Adresse email</li>
                  <li>Objet et contenu du message</li>
                </ul>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Outils d'analyse (type Google Analytics, Matomo) :</p>
                <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base leading-relaxed space-y-1 ml-4">
                  <li>Adresse IP (anonymisée si possible)</li>
                  <li>Données de navigation (pages visitées, durée, etc.)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              3. Finalité du traitement
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-3">
              Nous utilisons vos données pour :
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base leading-relaxed space-y-2 ml-4">
              <li>Répondre à vos demandes via notre formulaire de contact</li>
              <li>Améliorer l'expérience utilisateur et la sécurité du site</li>
              <li>Envoyer des emails d'information et vous abonner à notre newsletter</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              4. Base légale du traitement
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Les traitements reposent sur :
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base leading-relaxed space-y-2 ml-4 mt-3">
              <li><strong className="text-white">Votre consentement explicite</strong> (formulaire, newsletter)</li>
              <li><strong className="text-white">Notre intérêt légitime</strong> à améliorer notre site (statistiques anonymisées)</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              5. Destinataires des données
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-3">
              Vos données sont uniquement accessibles par :
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base leading-relaxed space-y-2 ml-4">
              <li>L'équipe de SecuriTrust</li>
              <li>Nos sous-traitants techniques (hébergeur, outils d'analyse) sous contrat conforme RGPD</li>
            </ul>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
              Aucune donnée n'est vendue ni cédée à des tiers.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              6. Durée de conservation
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm sm:text-base">Type de donnée</th>
                    <th className="text-left py-3 px-4 text-white font-semibold text-sm sm:text-base">Durée de conservation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-slate-300 text-sm sm:text-base">Formulaire de contact</td>
                    <td className="py-3 px-4 text-slate-300 text-sm sm:text-base">12 mois maximum</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-slate-300 text-sm sm:text-base">Statistiques anonymes</td>
                    <td className="py-3 px-4 text-slate-300 text-sm sm:text-base">Jusqu'à 25 mois</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-slate-300 text-sm sm:text-base">Abonnement newsletter</td>
                    <td className="py-3 px-4 text-slate-300 text-sm sm:text-base">Jusqu'au désabonnement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              7. Vos droits RGPD
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-3">
              Vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base leading-relaxed space-y-2 ml-4">
              <li><strong className="text-white">Accès</strong> à vos données</li>
              <li><strong className="text-white">Rectification</strong></li>
              <li><strong className="text-white">Suppression</strong> (droit à l'oubli)</li>
              <li><strong className="text-white">Opposition</strong> au traitement</li>
              <li><strong className="text-white">Retrait du consentement</strong></li>
              <li><strong className="text-white">Portabilité</strong></li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              8. Sécurité des données
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles pour assurer la sécurité de vos données (SSL, restrictions d'accès, anti-spam, etc.).
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              9. Cookies
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-3">
              Notre site utilise des <strong className="text-white">cookies</strong> pour :
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base leading-relaxed space-y-2 ml-4">
              <li>Assurer le bon fonctionnement technique</li>
              <li>Réaliser des statistiques anonymes de visite</li>
            </ul>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
              Lors de votre première visite, une bannière vous permet d'accepter ou refuser ces cookies.
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
              Voir notre Politique de cookies pour plus de détails.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              10. Modifications
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Nous nous réservons le droit de modifier cette politique à tout moment. En cas de changement important, vous serez informé via notre site.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#38bdf8] mb-4">
              11. Réclamations
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              En cas de doute sur la gestion de vos données, vous pouvez :
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm sm:text-base leading-relaxed space-y-2 ml-4 mt-3">
              <li>Nous contacter directement</li>
              <li>Ou saisir la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] hover:underline">www.cnil.fr</a></li>
            </ul>
          </section>

          {/* Footer info */}
          <section className="pt-8 border-t border-white/10">
            <div className="space-y-2 text-sm text-slate-400">
              <p><strong className="text-white">Adresse :</strong></p>
              <p>SecuriTrust</p>
              <p>11 Rue Saint-Didier, 75116 Paris</p>
              <p>Email : expertise@securitrust.fr</p>
              <p>Tél : 06 08 94 87 97</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}