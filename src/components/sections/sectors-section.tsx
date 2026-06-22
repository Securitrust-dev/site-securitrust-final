import Link from 'next/link';
import Image from 'next/image';

const sectors = [
  {
    img: '/sector-banque-finance.png',
    title: 'Banque & Finance',
    desc: 'Pilotez la cybersécurité avec rigueur, conformité et agilité.',
    href: '/secteurs/banque-finance',
  },
  {
    img: '/sector-sante.png',
    title: 'Santé',
    desc: 'Protection des patients, des données sensibles et des SI critiques.',
    href: '/secteurs/sante',
  },
  {
    img: '/sector-tech.png',
    title: 'Tech',
    desc: 'Sécurisez vos devs et infra sans perdre en agilité.',
    href: '/secteurs/tech',
  },
  {
    img: '/sector-public.png',
    title: 'Public',
    desc: 'Accompagnement cybersécurité pour collectivités et organismes publics.',
    href: '/secteurs/public',
  },
  {
    img: '/sector-retail.png',
    title: 'Retail',
    desc: 'Protégez vos données, vos ventes et votre image en ligne.',
    href: '/secteurs/retail',
  },
  {
    img: '/sector-industrie.png',
    title: 'Industrie',
    desc: 'Sécurisez vos environnements industriels, données sensibles et continuité opérationnelle.',
    href: '/secteurs/industrie',
  },
];

export const SectorsSection = () => (
  <section className="py-24 bg-[#020817]">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-cyan-500/70 text-xs uppercase tracking-widest font-semibold mb-3">Secteurs d&apos;activité</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
          Nous intervenons dans votre secteur
        </h2>
        <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
          Des enjeux cyber différents selon votre métier — notre approche s&apos;adapte à votre contexte réglementaire et opérationnel.
        </p>
      </div>

      {/* Grid 3×2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {sectors.map(({ img, title, desc, href }) => (
          <div key={title} className="flex flex-col items-center text-center group">
            {/* Large illustration */}
            <div className="w-72 h-72 flex items-center justify-center mb-6">
              <Image
                src={img}
                alt={title}
                width={288}
                height={288}
                unoptimized
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Title */}
            <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
              {title}
            </h3>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-[220px]">
              {desc}
            </p>

            {/* CTA */}
            <Link href={href}
              className="inline-block px-6 py-2 text-xs font-bold tracking-widest uppercase border border-slate-700 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors duration-200">
              Voir plus
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);
