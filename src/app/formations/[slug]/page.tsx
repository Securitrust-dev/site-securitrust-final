import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { getFormationBySlug, getPublishedFormations, formatPrice } from '@/lib/formations-data';
import { Clock, BookOpen, BarChart3, User, CheckCircle, ArrowRight, Play } from 'lucide-react';

export async function generateStaticParams() {
  return getPublishedFormations().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const formation = getFormationBySlug(slug);
  if (!formation) return { title: 'Formation introuvable' };
  return {
    title: formation.title,
    description: formation.shortDescription,
    alternates: { canonical: `https://securitrust.fr/formations/${slug}` },
  };
}

export default async function FormationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formation = getFormationBySlug(slug);
  if (!formation) notFound();

  return (
    <div className="relative min-h-screen antialiased text-slate-300 selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* Hero */}
        <section className="relative pt-32 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded border border-cyan-500/30 text-cyan-400">
                    {formation.category}
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded border border-white/10 text-slate-400">
                    {formation.level}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
                  {formation.title}
                </h1>

                <p className="text-lg text-slate-400 font-light leading-relaxed border-l-2 border-cyan-500 pl-6 mb-8">
                  {formation.shortDescription}
                </p>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>{formation.duration} de contenu</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>{formation.modules.length} modules</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span>Niveau {formation.level}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>{formation.instructor}</span>
                  </div>
                </div>
              </div>

              {/* Sidebar pricing */}
              <div className="lg:col-span-1">
                <div className="glass-panel rounded-xl p-8 border border-cyan-500/20 sticky top-28">
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold text-white">{formatPrice(formation.price)}</span>
                    <p className="text-sm text-slate-500 mt-1">Paiement unique - Acces a vie</p>
                  </div>
                  {formation.priceMonthly && (
                    <div className="text-center mb-6 pb-6 border-b border-white/10">
                      <span className="text-slate-400">ou</span>
                      <span className="text-2xl font-bold text-white ml-2">{formatPrice(formation.priceMonthly)}</span>
                      <span className="text-slate-500">/mois</span>
                    </div>
                  )}
                  <a
                    href={`/formations-paiement?formation=${formation.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)] hover:shadow-[0_0_30px_rgba(118,166,209,0.5)] text-sm"
                  >
                    S&apos;inscrire maintenant
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <ul className="mt-6 space-y-3 text-sm text-slate-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      Acces immediat apres paiement
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      {formation.modules.length} modules video HD
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      Certificat de formation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      Support pedagogique inclus
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="lg:max-w-2xl">
              <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                <h3 className="text-2xl font-light text-white tracking-tight">Description</h3>
                <span className="text-cyan-500 font-mono text-xs">02 // DETAILS</span>
              </div>
              <div className="text-slate-400 leading-relaxed whitespace-pre-line">
                {formation.description}
              </div>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="py-16 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
              <h3 className="text-2xl font-light text-white tracking-tight">Programme de la formation</h3>
              <span className="text-cyan-500 font-mono text-xs">03 // MODULES</span>
            </div>
            <div className="space-y-3">
              {formation.modules.map((module, index) => (
                <div key={module.id} className="glass-panel rounded-lg p-5 border border-white/5 hover:border-cyan-500/20 transition-all flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-cyan-500/30 bg-black/50 flex items-center justify-center flex-shrink-0">
                    <Play className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-cyan-500 font-mono">Module {String(index + 1).padStart(2, '0')}</span>
                    <h4 className="text-white font-medium">{module.title}</h4>
                  </div>
                  <span className="text-xs text-slate-500">{module.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none"></div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight relative z-10">
                Pret a vous former ?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Commencez des maintenant et maitrisez les competences en cybersecurite les plus demandees.
              </p>
              <a
                href={`/formations-paiement?formation=${formation.slug}`}
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)] hover:shadow-[0_0_30px_rgba(118,166,209,0.5)] relative z-10"
              >
                S&apos;inscrire - {formatPrice(formation.price)}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
