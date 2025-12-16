import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="relative z-40 border-t border-white/5 bg-black pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8" id="contact">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4 sm:mb-5 lg:mb-6">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-768x158-1764185479093.png?width=8000&height=8000&resize=contain"
                alt="SecuriTrust Logo"
                width={160}
                height={33}
                className="neon-logo h-8 sm:h-9 lg:h-10 w-auto"
              />
            </div>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xs font-light mb-4">
              Consultant informatique à Paris
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <p className="font-light">11 Rue Saint-Didier</p>
              <p className="font-light">75116 Paris</p>
              <p className="font-light">Tél: 06 08 94 87 97</p>
              <p className="font-light">Lun-Ven: 09:00-18:30</p>
            </div>
          </div>
          <div>
            <h4 className="text-white text-sm sm:text-base font-normal uppercase tracking-wider mb-4 sm:mb-5 lg:mb-6">
              SERVICES
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white/60">
              <li>
                <a href="/rssi-externalise" className="hover:text-white transition-colors font-light">
                  RSSI Externalisé
                </a>
              </li>
              <li>
                <a href="/audit-cybersecurite" className="hover:text-white transition-colors font-light">
                  Audits & Pentests
                </a>
              </li>
              <li>
                <a href="/mise-en-conformite-rgpd" className="hover:text-white transition-colors font-light">
                  Conformité RGPD
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm sm:text-base font-normal uppercase tracking-wider mb-4 sm:mb-5 lg:mb-6">
              CONFORMITÉ
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white/60">
              <li>
                <a href="/mise-en-conformite-rgpd" className="hover:text-white transition-colors font-light">
                  RGPD
                </a>
              </li>
              <li>
                <a href="/dora" className="hover:text-white transition-colors font-light">
                  DORA
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm sm:text-base font-normal uppercase tracking-wider mb-4 sm:mb-5 lg:mb-6">
              CONTACT
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white/60">
              <li>
                <a href="/proposition-commerciale" className="hover:text-white transition-colors font-light">
                  Devis
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors font-light">
                  Support
                </a>
              </li>
              <li>
                <a href="/cgv" className="hover:text-white transition-colors font-light">
                  CGV
                </a>
              </li>
              <li>
                <a href="/mentions-legales" className="hover:text-white transition-colors font-light">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="/politique-de-confidentialite" className="hover:text-white transition-colors font-light">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="/politique-de-cookies" className="hover:text-white transition-colors font-light">
                  Politique de cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-white/5 gap-3">
          <p className="text-sm sm:text-base text-white/40 text-center sm:text-left font-light">
            © 2024 Securitrust. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};