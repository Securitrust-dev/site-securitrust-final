import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { PromoBanner } from '@/components/sections/promo-banner';
import { SkyCTAButton } from '@/components/ui/sky-cta-button';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import ThreeBackground from '@/components/three-background';
import MatrixRain from '@/components/matrix-rain';
import { Users, Lightbulb, Award, Target, BrainCircuit, Hammer, Rocket } from 'lucide-react';

export default function NousRejoindre() {
  const positions = [
    {
      slug: 'consultant-junior-cybersecurite',
      icon: BrainCircuit,
      category: 'Junior',
      title: 'Consultant(e) Junior Cybersécurité',
      description: 'Pour les talents en début de parcours, motivés à apprendre et à relever de nouveaux défis techniques et stratégiques.'
    },
    {
      slug: 'consultant-senior-cybersecurite',
      icon: Hammer,
      category: 'Senior',
      title: 'Consultant(e) Senior Cybersécurité',
      description: 'Tu veux évoluer dans un environnement dynamique, au cœur des enjeux cyber des grandes organisations ? Rejoins une équipe engagée, experte et passionnée !'
    },
    {
      slug: 'manager-cybersecurite',
      icon: Rocket,
      category: 'Manager',
      title: 'Manager Cybersécurité',
      description: 'Pour les leaders confirmés souhaitant piloter des équipes et faire grandir les talents.'
    }
  ];

  const values = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Esprit d\'équipe',
      description: 'Nous croyons que les plus grandes réussites naissent de la collaboration. Chez SecuriTrust, chaque collaborateur participe à la compétence de ses collègues.'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Montée en compétences',
      description: 'Nous accompagnons chacun dans le développement continu de ses compétences techniques et managériales, pour grandir et se perfectionner.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Cadre',
      description: 'Vous rejoindrez une équipe à taille humaine, dans un cadre de travail clair et structuré, propice à la concentration et au bien-être.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Expertise',
      description: 'Chez SecuriTrust, l\'expertise n\'est pas un acquis, c\'est un engagement. Nous œuvrons en faveur du niveau de pratique le plus élevé qui s\'élève.'
    }
  ];

  return (
    <>
      <PromoBanner />
      <div className="relative min-h-screen bg-[#030303]">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-full bg-void opacity-60"></div>
          <div className="stars opacity-20"></div>
        </div>
        <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>
        
        <ThreeBackground />
        <MatrixRain />
        <Navbar />

        {/* Hero Section */}
        <section className="relative z-10 pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-4 border-b border-white/10 pb-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight">
                Carrières
              </h1>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">01 // CAREERS</span>
            </div>
            <p className="text-lg text-slate-400 max-w-3xl font-light tracking-wide border-l-2 border-cyan-500 pl-6">
              Rejoignez une équipe d&apos;experts qui partagent une même vision : l&apos;excellence du service de la cybersécurité. SecuriTrust vous offre un cadre propice à la montée en compétences, à l&apos;autonomie et à l&apos;impact.
            </p>
          </div>
        </section>

        {/* Positions Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-4xl font-light text-white tracking-tight">Postes disponibles</h2>
              <span className="text-cyan-500 font-mono text-xs">02 // OPENINGS</span>
            </div>
            
            {/* Connecting Line */}
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>
              
              <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {positions.map((position, index) => {
                  const Icon = position.icon;
                  return (
                    <div key={index} className="tilt-card group relative p-1">
                      <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden flex flex-col">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                        
                        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 rounded text-xs text-cyan-400 font-semibold mb-4 uppercase tracking-wider">
                          {position.category}
                        </div>
                        
                        <h3 className="text-xl font-medium text-white mb-4">{position.title}</h3>
                        
                        <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow font-light">
                          {position.description}
                        </p>
                        
                        <SkyCTAButton href={`/nous-rejoindre/${position.slug}`} text="Voir l'offre" className="w-full mt-auto" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-4xl font-light text-white tracking-tight">Nos Valeurs</h2>
              <span className="text-cyan-500 font-mono text-xs">03 // VALUES</span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="tilt-card group relative p-1">
                  <div className="glass-panel h-full p-6 rounded-xl relative overflow-hidden text-center">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                    
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    
                    <h3 className="text-lg font-medium text-white mb-3">{value.title}</h3>
                    
                    <p className="text-sm text-slate-400 leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass-panel p-12 rounded-2xl border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] text-center">
              <h2 className="text-4xl font-light text-white mb-6 tracking-tight">
                Prêt à rejoindre l&apos;aventure ?
              </h2>
              <p className="text-slate-400 mb-6 max-w-2xl mx-auto font-light leading-relaxed">
                Chez SecuriTrust, l&apos;expertise se construit chaque jour grâce à la pratique et au partage. Vous évoluez dans un cadre à taille humaine, où la montée en compétences est un moteur essentiel.
              </p>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                Vous évoluez dans des contextes variés et stimulants, où chaque projet contribue à faire grandir les compétences de l&apos;équipe et à lever des défis concrets.
              </p>
              <SkyCTAButton href="/contact" text="Nous contacter" />
            </div>
          </div>
        </section>

        <section className="py-16 px-6 text-center relative z-10">
          <ExpertCTAButton />
        </section>

        <Footer />
      </div>
    </>
  );
}