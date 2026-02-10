'use client';

import { useState } from 'react';
import { getPublishedFormations, getFormationCategories } from '@/lib/formations-data';
import { FormationCard } from './FormationCard';

export function FormationsCatalog() {
  const formations = getPublishedFormations();
  const categories = ['Toutes', ...getFormationCategories()];
  const [activeCategory, setActiveCategory] = useState('Toutes');

  const filtered = activeCategory === 'Toutes'
    ? formations
    : formations.filter((f) => f.category === activeCategory);

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
          <h3 className="text-4xl font-light text-white tracking-tight">
            Catalogue des formations
          </h3>
          <span className="text-cyan-500 font-mono text-xs">01 // CATALOGUE</span>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-black font-medium'
                  : 'border border-white/10 text-slate-400 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((formation) => (
            <FormationCard key={formation.slug} formation={formation} />
          ))}
        </div>
      </div>
    </section>
  );
}
