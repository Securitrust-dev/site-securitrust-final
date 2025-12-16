export const MetricsSection = () => {
  return (
    <section className="relative z-30 border-y border-white/5 bg-black">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Metric 1 */}
          <div className="flex flex-col items-center text-center">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight tabular-nums text-white leading-none mb-4 sm:mb-5">
              +2500
            </p>
            <p className="text-sm sm:text-base text-white/60 uppercase tracking-wide font-light leading-snug px-2">
              jours de RSSI externalisé
            </p>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col items-center text-center">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight tabular-nums text-white leading-none mb-4 sm:mb-5">
              +40
            </p>
            <p className="text-sm sm:text-base text-white/60 uppercase tracking-wide font-light leading-snug px-2">
              Mises en conformité RGPD & DPO
            </p>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col items-center text-center">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight tabular-nums text-white leading-none mb-4 sm:mb-5">
              +86
            </p>
            <p className="text-sm sm:text-base text-white/60 uppercase tracking-wide font-light leading-snug px-2">
              Audits et Pentest réalisés
            </p>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col items-center text-center">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight tabular-nums text-white leading-none mb-4 sm:mb-5">
              +105
            </p>
            <p className="text-sm sm:text-base text-white/60 uppercase tracking-wide font-light leading-snug px-2">
              Mise en conformité SMSI & ISO 27001
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};