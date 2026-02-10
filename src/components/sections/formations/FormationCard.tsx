import { Clock, BookOpen, ArrowRight, BarChart3 } from 'lucide-react';
import { Formation, formatPrice } from '@/lib/formations-data';

const levelColors: Record<string, string> = {
  Debutant: 'text-green-400 border-green-400/30',
  Intermediaire: 'text-yellow-400 border-yellow-400/30',
  Avance: 'text-red-400 border-red-400/30',
};

export function FormationCard({ formation }: { formation: Formation }) {
  return (
    <a
      href={`/formations/${formation.slug}`}
      className="tilt-card group relative z-10 p-1 block"
    >
      <div className="glass-panel h-full rounded-xl relative overflow-hidden border-cyan-500/10 hover:border-cyan-500/30 transition-all">
        {/* Thumbnail placeholder */}
        <div className="relative h-44 bg-gradient-to-br from-cyan-900/30 to-black overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-cyan-500/30" />
          </div>
          <div className="absolute top-3 left-3">
            <span className={`text-[0.6rem] uppercase tracking-wider px-2 py-1 rounded border ${levelColors[formation.level] || 'text-slate-400 border-slate-400/30'}`}>
              {formation.level}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="text-[0.6rem] uppercase tracking-wider px-2 py-1 rounded border border-cyan-500/30 text-cyan-400 bg-black/50">
              {formation.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-lg font-medium text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {formation.title}
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {formation.shortDescription}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{formation.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{formation.modules.length} modules</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{formation.level}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div>
              <span className="text-xl font-bold text-white">{formatPrice(formation.price)}</span>
              {formation.priceMonthly && (
                <span className="text-xs text-slate-500 ml-2">
                  ou {formatPrice(formation.priceMonthly)}/mois
                </span>
              )}
            </div>
            <span className="inline-flex items-center gap-1 text-cyan-400 text-xs font-medium group-hover:gap-2 transition-all">
              Voir <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
