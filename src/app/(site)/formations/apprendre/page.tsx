import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { getPublishedFormations, formatPrice } from '@/lib/formations-data';
import { verifyAccessToken } from '@/lib/formations-auth';
import { BookOpen, Clock, ArrowRight, Lock } from 'lucide-react';

export default async function FormationsApprendre() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const accessCookies = allCookies.filter((c) => c.name.startsWith('formation_access_'));

  if (accessCookies.length === 0) {
    redirect('/formations');
  }

  // Verify which formations the user has access to
  const accessibleSlugs: string[] = [];
  for (const cookie of accessCookies) {
    const result = await verifyAccessToken(cookie.value);
    if (result.valid && result.formationSlug) {
      accessibleSlugs.push(result.formationSlug);
    }
  }

  if (accessibleSlugs.length === 0) {
    redirect('/formations');
  }

  const allFormations = getPublishedFormations();

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

        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mb-12">
              <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">Espace Formation</h2>
              <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                Mes formations
              </h1>
              <p className="text-slate-400">
                Retrouvez ici toutes vos formations. Cliquez sur une formation pour acceder aux modules video.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allFormations.map((formation) => {
                const hasAccess = accessibleSlugs.includes(formation.slug);
                return (
                  <div key={formation.slug} className="relative">
                    {hasAccess ? (
                      <a href={`/formations/apprendre/${formation.slug}`} className="block group">
                        <div className="glass-panel rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all h-full">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-cyan-400" />
                            </div>
                            <span className="text-[0.6rem] uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">Acces actif</span>
                          </div>
                          <h3 className="text-lg font-medium text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {formation.title}
                          </h3>
                          <p className="text-sm text-slate-400 mb-4 line-clamp-2">{formation.shortDescription}</p>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{formation.duration}</span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-cyan-400 font-medium group-hover:gap-2 transition-all">
                              Continuer <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="glass-panel rounded-xl p-6 border border-white/5 h-full opacity-50">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-slate-500" />
                          </div>
                        </div>
                        <h3 className="text-lg font-medium text-slate-500 mb-2">{formation.title}</h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{formation.shortDescription}</p>
                        <a
                          href={`/formations-paiement?formation=${formation.slug}`}
                          className="text-xs text-cyan-500 hover:text-cyan-400 transition-colors"
                        >
                          Debloquer - {formatPrice(formation.price)}
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
