'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { CYBER_CATEGORIES } from '@/lib/articles';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

function CategoryTabsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategorySlug = searchParams.get('category') || '';

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (category === 'Tous') {
      params.delete('category');
    } else {
      params.set('category', generateSlug(category));
    }
    
    router.push(`/articles?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar mb-8 pb-2">
      <div className="flex items-center gap-3 min-w-max px-1">
        <button
          onClick={() => handleCategoryClick('Tous')}
          className={cn(
            "px-5 py-2 rounded-full border text-xs font-medium transition-all uppercase tracking-wider",
            currentCategorySlug === ''
              ? "bg-cyan-500 border-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              : "bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400"
          )}
          aria-selected={currentCategorySlug === ''}
          role="tab"
        >
          Tous
        </button>
        {CYBER_CATEGORIES.map((category) => {
          const slug = generateSlug(category);
          const isActive = currentCategorySlug === slug;
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "px-5 py-2 rounded-full border text-xs font-medium transition-all uppercase tracking-wider",
                isActive
                  ? "bg-cyan-500 border-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400"
              )}
              aria-selected={isActive}
              role="tab"
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CategoryTabs() {
  return (
    <Suspense fallback={<div className="h-10 mb-8 animate-pulse bg-white/5 rounded-full w-full" />}>
      <CategoryTabsContent />
    </Suspense>
  );
}
