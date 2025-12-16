'use client';

import { useState } from 'react';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import ThreeBackground from '@/components/three-background';
import MatrixRain from '@/components/matrix-rain';
import { MapPin, Phone, Mail, Clock, Send, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message envoyé avec succès! Nous vous recontacterons dans les plus brefs délais.');
    setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: [
        'SecuriTrust',
        '11 Rue Saint-Didier',
        '75116 Paris'
      ]
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['06 08 94 87 97']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@securitrust.fr', 'expertise@securitrust.fr']
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: [
        'Lundi - Vendredi: 09:00 - 18:30',
        'Samedi - Dimanche: Fermé'
      ]
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
                Contact
              </h1>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">01 // CONTACT</span>
            </div>
            <p className="text-lg text-slate-400 max-w-3xl font-light tracking-wide border-l-2 border-cyan-500 pl-6">
              Notre équipe d'experts en cybersécurité est à votre écoute pour répondre à vos questions et vous accompagner dans vos projets.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="relative z-10 pb-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="perspective-normal">
                <div className="glass-panel p-8 rounded-2xl transform hover:rotate-y-0 transition-transform duration-500 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                  <h2 className="text-3xl font-light text-white mb-6 tracking-tight">Envoyez-nous un message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-xs uppercase tracking-widest text-slate-500">
                        Nom complet
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-700"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="email" className="text-xs uppercase tracking-widest text-slate-500">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="contact@entreprise.fr"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-700"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="phone" className="text-xs uppercase tracking-widest text-slate-500">
                          Téléphone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+33 6 12 34 56 78"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          required
                          className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="company" className="text-xs uppercase tracking-widest text-slate-500">
                        Entreprise
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Nom de votre entreprise"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-700"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="subject" className="text-xs uppercase tracking-widest text-slate-500">
                        Sujet
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="Demande d'information"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        required
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-700"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="message" className="text-xs uppercase tracking-widest text-slate-500">
                        Message
                      </label>
                      <textarea
                        id="message"
                        placeholder="Décrivez votre projet ou votre besoin..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        required
                        className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-700 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Envoyer</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-6">
                <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-4">
                  <h2 className="text-3xl font-light text-white tracking-tight">Informations</h2>
                  <span className="text-cyan-500 font-mono text-xs">02 // INFO</span>
                </div>
                
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="tilt-card group relative p-1">
                      <div className="glass-panel p-6 rounded-xl relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-black/50 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-white mb-2">{info.title}</h3>
                            <div className="space-y-1">
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-slate-400 text-sm font-light">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* LinkedIn Link */}
                <a 
                  href="https://fr.linkedin.com/company/securitrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel p-6 rounded-xl border-cyan-500/20 flex items-center gap-4 hover:border-cyan-500/40 transition-all group"
                >
                  <div className="w-12 h-12 bg-black/50 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Suivez-nous sur LinkedIn</h3>
                    <p className="text-slate-400 text-sm font-light">Restez informé de nos actualités</p>
                  </div>
                </a>
              </div>
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