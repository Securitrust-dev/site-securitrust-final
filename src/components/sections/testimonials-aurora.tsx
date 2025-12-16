'use client';

import { AuroraBackground } from './aurora-background';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    date: 'Mars 15, 2024',
    dateColor: 'blue',
    quote:
      "Ce produit a complètement transformé notre flux de travail. L'attention aux détails et l'expérience utilisateur sont phénoménales. Hautement recommandé!",
    name: 'Sarah Anderson',
    role: 'Product Designer',
    initials: 'SA',
    avatarGradient: 'from-purple-400 to-blue-500',
    borderColor: 'border-purple-400/30',
    animationDelay: 'animate-float',
  },
  {
    id: 2,
    date: 'Février 28, 2024',
    dateColor: 'emerald',
    quote:
      "Service et qualité exceptionnels! L'équipe a fait tout son possible pour s'assurer que tout était parfait. Je les utiliserai certainement à nouveau.",
    name: 'Michael Johnson',
    role: 'Marketing Director',
    initials: 'MJ',
    avatarGradient: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-400/30',
    animationDelay: 'animate-float-delayed',
  },
  {
    id: 3,
    date: 'Janvier 12, 2024',
    dateColor: 'orange',
    quote:
      "Expérience incroyable du début à la fin. Les résultats ont dépassé mes attentes et l'équipe de support a été formidable tout au long du processus.",
    name: 'Emily Chen',
    role: 'Startup Founder',
    initials: 'EC',
    avatarGradient: 'from-orange-400 to-red-500',
    borderColor: 'border-orange-400/30',
    animationDelay: 'animate-float-delayed-2',
  },
];

const getDateColorClasses = (color: string) => {
  switch (color) {
    case 'blue':
      return 'text-blue-300 border-blue-400/20';
    case 'emerald':
      return 'text-emerald-300 border-emerald-400/20';
    case 'orange':
      return 'text-orange-300 border-orange-400/20';
    default:
      return 'text-blue-300 border-blue-400/20';
  }
};

export const TestimonialsAurora = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black py-20">
      {/* Aurora Background */}
      <AuroraBackground />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-4 py-12">
        <div className="flex max-w-6xl w-full justify-center flex-wrap lg:flex-nowrap gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="w-full max-w-sm">
              <div
                className={`relative card-border overflow-hidden rounded-2xl flex flex-col ${testimonial.animationDelay}`}
              >
                <div className="p-6">
                  {/* Date and Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-block px-3 py-1 glass rounded-full text-xs font-medium border ${getDateColorClasses(
                        testimonial.dateColor
                      )}`}
                    >
                      {testimonial.date}
                    </span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-star-twinkle"
                          style={{ animationDelay: `${index * 0.5 + i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-white/90 mb-6 leading-relaxed text-sm italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 ${testimonial.borderColor}`}
                    >
                      <div
                        className={`w-full h-full bg-gradient-to-br ${testimonial.avatarGradient} flex items-center justify-center`}
                      >
                        <span className="text-white text-sm font-semibold">
                          {testimonial.initials}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">
                        {testimonial.name}
                      </div>
                      <div className="text-white/60 text-xs">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
