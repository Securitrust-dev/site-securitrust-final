'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { MapPin, Phone, Mail, Clock, Send, Linkedin } from 'lucide-react';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { InternalLinks } from '@/components/InternalLinks';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';

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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('request failed');

      toast.success('Message envoyé avec succès! Nous vous recontacterons dans les plus brefs délais.');
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch {
      toast.error("Une erreur est survenue. Réessayez ou écrivez-nous à contact@securitrust.fr.");
    } finally {
      setIsSubmitting(false);
    }
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
      details: ['01 86 04 44 31']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['jad.joumblat@securitrust.fr', 'expertise@securitrust.fr']
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
    <StaticThemeShell active="contact">
      <section className="hero-simple">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">›</span>
            <span className="now">Contact</span>
          </p>
          <h1>Contact</h1>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="ct-grid">
            <div className="ct-info reveal">
              <h2>Informations</h2>
              <div className="ct-details">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index}>
                      <Icon />
                      <div>
                        <span style={{ display: 'block', color: 'var(--ink)', fontWeight: 600, marginBottom: 4 }}>{info.title}</span>
                        {info.details.map((detail, idx) => (
                          <span key={idx} style={{ display: 'block' }}>{detail}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                href="https://fr.linkedin.com/company/securitrust"
                target="_blank"
                rel="noopener noreferrer"
                className="pilier"
                style={{ marginTop: 24, flexDirection: 'row', alignItems: 'center', gap: 16, padding: '22px 24px' }}
              >
                <div className="pilier-icon" style={{ marginBottom: 0 }}>
                  <Linkedin size={20} />
                </div>
                <div>
                  <h3 style={{ marginBottom: 4 }}>Suivez-nous sur LinkedIn</h3>
                  <p style={{ marginBottom: 0 }}>Restez informé de nos actualités</p>
                </div>
              </a>
            </div>

            <div className="form-card reveal">
              <h3>Envoyez-nous un message</h3>

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="name">Nom complet</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="contact@entreprise.fr"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="company">Entreprise</label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Nom de votre entreprise"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="subject">Sujet</label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Demande d'information"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Décrivez votre projet ou votre besoin..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    required
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? (
                    <>Envoi en cours...</>
                  ) : (
                    <>
                      <Send />
                      <span>Envoyer</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec--dark" style={{ textAlign: 'center' }}>
        <ExpertCTAButton />
      </section>

      <InternalLinks pageKey="contact" />
    </StaticThemeShell>
  );
}
