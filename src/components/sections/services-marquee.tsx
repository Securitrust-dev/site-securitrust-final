'use client';

export const ServicesMarquee = () => {
  const services = [
    "RSSI EXTERNALISÉ",
    "MISES EN CONFORMITÉ RGPD & DPO",
    "AUDITS ET PENTEST RÉALISÉS",
    "MISE EN CONFORMITÉ SMSI & ISO 27001"
  ];

  return (
    <div className="fixed top-[50px] left-0 right-0 z-[90] bg-gradient-to-r from-[#0b1221] via-[#0c4a6e] to-[#0b1221] border-b border-[#38bdf8]/20 overflow-hidden">
      <div className="relative flex">
        {/* First set of services */}
        <div className="flex animate-scroll-left whitespace-nowrap py-3">
          {services.map((service, index) => (
            <div key={`first-${index}`} className="inline-flex items-center">
              <span className="text-[#38bdf8] font-bold text-sm tracking-wider uppercase px-8">
                {service}
              </span>
              {index < services.length - 1 && (
                <span className="text-[#38bdf8]/40">•</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex animate-scroll-left whitespace-nowrap py-3" aria-hidden="true">
          {services.map((service, index) => (
            <div key={`second-${index}`} className="inline-flex items-center">
              <span className="text-[#38bdf8] font-bold text-sm tracking-wider uppercase px-8">
                {service}
              </span>
              {index < services.length - 1 && (
                <span className="text-[#38bdf8]/40">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};