'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { OrangeBeamCTA } from '@/components/ui/orange-beam-cta';
import ThreeBackground from '@/components/three-background';
import MatrixRain from '@/components/matrix-rain';
import { Shield, Award, Target, Users, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function PortfolioPage() {
  const projects = [
    {
      title: "Société Générale",
      category: "Finance",
      description: "Audit de cybersécurité complet et mise en conformité ISO 27001",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      achievements: [
        "Conformité ISO 27001",
        "Audit de sécurité",
        "Formation des équipes"
      ]
    },
    {
      title: "Abeille Assurances",
      category: "Assurance",
      description: "Mise en conformité RGPD et DPO externalisé",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      achievements: [
        "Conformité RGPD complète",
        "DPO externalisé",
        "Registre des traitements"
      ]
    },
    {
      title: "Banque Française Mutualiste",
      category: "Banque",
      description: "Tests d'intrusion et analyse des vulnérabilités",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      achievements: [
        "Pentest complet",
        "Remédiation des failles",
        "Amélioration continue"
      ]
    },
    {
      title: "Ma Place en Crèche",
      category: "Services",
      description: "Protection des données personnelles et conformité",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      achievements: [
        "Sécurisation des données",
        "Formation RGPD",
        "Mise en conformité"
      ]
    },
    {
      title: "Affluens",
      category: "Technologie",
      description: "RSSI externalisé et stratégie cybersécurité",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      achievements: [
        "RSSI à temps partagé",
        "Stratégie cyber",
        "Gestion des risques"
      ]
    },
    {
      title: "Veolia Eau d'Île-de-France",
      category: "Services Publics",
      description: "Conformité NIS 2 et protection des infrastructures critiques",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      achievements: [
        "Conformité NIS 2",
        "Audit infrastructure",
        "Plan de continuité"
      ]
    }
  ];

  const stats = [
    { number: "+2500", label: "Heures d'expertise", icon: Shield },
    { number: "+40", label: "Clients accompagnés", icon: Users },
    { number: "+86", label: "Audits réalisés", icon: Target },
    { number: "100%", label: "Satisfaction client", icon: Award }
  ];

  return (
    <>
      <PromoBanner />
      <div className="relative min-h-screen" style={{ background: '#02040a' }}>
        <ThreeBackground />
        <MatrixRain />
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              Nos Réalisations
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
              Découvrez nos projets de cybersécurité et les entreprises qui nous font confiance
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="glass-panel p-6 rounded-xl border border-white/5">
                    <Icon className="w-8 h-8 text-[#38bdf8] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Clients de Confiance */}
        <section className="relative py-20 px-6 bg-gradient-to-b from-transparent via-[#0b1221]/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-6">
              Clients de <span className="text-[#38bdf8]">Confiance</span>
            </h2>
            <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
              Des entreprises de tous secteurs nous font confiance pour leur cybersécurité
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-societe-generale2-e1436481313147-1764595764935.png?width=8000&height=8000&resize=contain',
                'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/43-abeille-assurance-1764596006375.jpg?width=8000&height=8000&resize=contain',
                'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-150x150-1764596042844.png?width=8000&height=8000&resize=contain',
                'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-4-150x150-1764596061442.png?width=8000&height=8000&resize=contain',
                'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Af-150x150-1764596072367.png?width=8000&height=8000&resize=contain',
                'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients-150x150-1764596078949.png?width=8000&height=8000&resize=contain',
                'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-clients_Plan-de-travail-1-copie-150x150-1764596094822.png?width=8000&height=8000&resize=contain',
              ].map((logo, idx) => (
                <div key={idx} className="group relative aspect-video rounded-xl overflow-hidden bg-white/95 border border-white/10 hover:border-[#38bdf8]/30 transition-all duration-300 flex items-center justify-center p-8">
                  <Image 
                    src={logo}
                    alt={`Client ${idx + 1}`}
                    width={200}
                    height={100}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-6">
              Projets <span className="text-[#38bdf8]">Récents</span>
            </h2>
            <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
              Exemples de missions réalisées pour nos clients
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="group glass-panel rounded-2xl border border-white/5 hover:border-[#38bdf8]/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-[#1a2332]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1221] via-transparent to-transparent opacity-60" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#38bdf8]/90 backdrop-blur-sm rounded-full">
                      <span className="text-xs font-semibold text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#38bdf8] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-6">
                      {project.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-400">{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[#38bdf8] font-semibold text-sm hover:gap-3 transition-all group/btn"
                    >
                      <span>En savoir plus</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-[#38bdf8]/30">
              <h2 className="text-4xl font-bold text-white mb-6">
                Prêt à sécuriser votre entreprise ?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Rejoignez nos clients satisfaits et bénéficiez d'une expertise en cybersécurité de premier plan
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <OrangeBeamCTA href="/contact" text="Demander un devis" />
                <OrangeBeamCTA href="/services" text="Nos services" />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}