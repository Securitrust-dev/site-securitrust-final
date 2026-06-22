import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="relative z-40 border-t border-white/5 bg-black pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8" id="contact">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          {/* Logo + coordonnées */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4 sm:mb-5 lg:mb-6">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b678629c-2039-47c7-900d-278085219d70/image-1769766433152.png?width=8000&height=8000&resize=contain"
                alt="SecuriTrust Logo"
                width={160}
                height={33}
                className="h-8 sm:h-9 lg:h-10 w-auto"
              />
            </div>
            <p className="text-sm text-white leading-relaxed max-w-xs font-light mb-4 opacity-90">
              Cabinet de conseil en cybersécurité à Paris
            </p>
            <div className="space-y-2 text-sm text-white opacity-80">
              <p className="font-light">11 Rue Saint-Didier</p>
              <p className="font-light">75116 Paris</p>
              <p className="font-light">Tél: 01 86 04 44 31</p>
              <p className="font-light">Lun-Ven: 09:00-18:30</p>
            </div>
          </div>

          {/* Cybersécurité opérationnelle */}
          <div>
            <h4 className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5">
              Cybersécurité opérationnelle
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm text-white opacity-80">
              <li><a href="/cybersecurite-operationnelle" className="hover:text-cyan-400 transition-colors font-light">Sécurité offensive</a></li>
              <li><a href="/cybersecurite-operationnelle/proteger-chiffre-affaires" className="hover:text-cyan-400 transition-colors font-light">Protéger le CA</a></li>
              <li><a href="/cybersecurite-operationnelle/preserver-image-confiance" className="hover:text-cyan-400 transition-colors font-light">Image & Confiance</a></li>
              <li><a href="/cybersecurite-operationnelle/exigences-reglementaires" className="hover:text-cyan-400 transition-colors font-light">Exigences réglementaires</a></li>
            </ul>
          </div>

          {/* Gouvernance & Conformité */}
          <div>
            <h4 className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5">
              Gouvernance & Conformité
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm text-white opacity-80">
              <li><a href="/gouvernance-conformite/domaines-expertise" className="hover:text-cyan-400 transition-colors font-light">Domaines d&apos;expertise</a></li>
              <li><a href="/gouvernance-conformite/accompagnement" className="hover:text-cyan-400 transition-colors font-light">Accompagnement</a></li>
              <li><a href="/gouvernance-conformite/audits" className="hover:text-cyan-400 transition-colors font-light">Audits</a></li>
              <li><a href="/gouvernance-conformite/services-externalises" className="hover:text-cyan-400 transition-colors font-light">RSSI / DPO externalisé</a></li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-5">
              Liens utiles
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm text-white opacity-80">
              <li><a href="/articles" className="hover:text-cyan-400 transition-colors font-light">Articles</a></li>
              <li><a href="/nous-rejoindre" className="hover:text-cyan-400 transition-colors font-light">Nous rejoindre</a></li>
              <li><a href="/contact" className="hover:text-cyan-400 transition-colors font-light">Contact</a></li>
              <li><a href="/mentions-legales" className="hover:text-cyan-400 transition-colors font-light">Mentions légales</a></li>
              <li><a href="/politique-de-confidentialite" className="hover:text-cyan-400 transition-colors font-light">Confidentialité</a></li>
            </ul>
          </div>
        </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-white/5 gap-3">
            <p className="text-sm sm:text-base text-white/40 text-center sm:text-left font-light">
              © 2016–{new Date().getFullYear()} SecuriTrust. Tous droits réservés.
            </p>
          </div>
      </div>
    </footer>
  );
};