'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { getFormationBySlug } from '@/lib/formations-data';
import { Play, CheckCircle, ChevronLeft, ChevronRight, BookOpen, Clock } from 'lucide-react';
import type { FormationModule } from '@/lib/formations-data';

export default function FormationLearnPage() {
  const params = useParams();
  const slug = params.slug as string;
  const formation = getFormationBySlug(slug);
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`formation_progress_${slug}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.activeModuleId) setActiveModuleId(data.activeModuleId);
        if (data.completedModules) setCompletedModules(data.completedModules);
      } catch { /* ignore */ }
    }
  }, [slug]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(`formation_progress_${slug}`, JSON.stringify({
      activeModuleId,
      completedModules,
    }));
  }, [slug, activeModuleId, completedModules]);

  if (!formation) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#030303' }}>
        <p className="text-white text-xl">Formation introuvable</p>
      </div>
    );
  }

  const activeModule = formation.modules.find((m) => m.id === activeModuleId) || formation.modules[0];
  const currentIndex = formation.modules.findIndex((m) => m.id === activeModuleId);
  const prevModule = currentIndex > 0 ? formation.modules[currentIndex - 1] : null;
  const nextModule = currentIndex < formation.modules.length - 1 ? formation.modules[currentIndex + 1] : null;

  function markComplete(moduleId: number) {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
  }

  function goToModule(module: FormationModule) {
    markComplete(activeModuleId);
    setActiveModuleId(module.id);
  }

  const progress = Math.round((completedModules.length / formation.modules.length) * 100);

  return (
    <div className="relative min-h-screen antialiased text-slate-300" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>
      <div className="relative z-10">
        <Navbar />

        <div className="pt-20 flex min-h-screen">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} flex-shrink-0 border-r border-white/5 bg-black/50 overflow-hidden transition-all duration-300 hidden lg:block`}>
            <div className="p-6 w-80">
              <div className="mb-6">
                <h2 className="text-sm font-medium text-white mb-1 line-clamp-1">{formation.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{formation.modules.length} modules</span>
                  <span>{completedModules.length}/{formation.modules.length} termines</span>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{progress}% complete</p>
              </div>

              <div className="space-y-1">
                {formation.modules.map((module, index) => {
                  const isActive = module.id === activeModuleId;
                  const isCompleted = completedModules.includes(module.id);
                  return (
                    <button
                      key={module.id}
                      onClick={() => goToModule(module)}
                      className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-all text-sm ${
                        isActive
                          ? 'bg-cyan-500/10 border border-cyan-500/30'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                        isCompleted
                          ? 'bg-cyan-500 text-black'
                          : isActive
                            ? 'border border-cyan-500 text-cyan-400'
                            : 'border border-white/10 text-slate-500'
                      }`}>
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs ${isActive ? 'text-white' : 'text-slate-400'} line-clamp-2`}>
                          {module.title}
                        </p>
                        <p className="text-[0.65rem] text-slate-600 mt-0.5">{module.duration}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6">
              {/* Toggle sidebar button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden mb-4 text-xs text-cyan-400 flex items-center gap-1"
              >
                <BookOpen className="w-4 h-4" />
                {sidebarOpen ? 'Masquer les modules' : 'Voir les modules'}
              </button>

              {/* Module header */}
              <div className="mb-4">
                <span className="text-xs text-cyan-500 font-mono">
                  Module {String(currentIndex + 1).padStart(2, '0')} / {String(formation.modules.length).padStart(2, '0')}
                </span>
                <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mt-1">
                  {activeModule.title}
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeModule.duration}</span>
                </div>
              </div>

              {/* Video player */}
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-video mb-6">
                <iframe
                  src={activeModule.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={activeModule.title}
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                {prevModule ? (
                  <button
                    onClick={() => goToModule(prevModule)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Precedent</span>
                  </button>
                ) : <div />}

                <button
                  onClick={() => markComplete(activeModuleId)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all ${
                    completedModules.includes(activeModuleId)
                      ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  {completedModules.includes(activeModuleId) ? 'Termine' : 'Marquer comme termine'}
                </button>

                {nextModule ? (
                  <button
                    onClick={() => goToModule(nextModule)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm transition-all"
                  >
                    <span className="hidden sm:inline">Suivant</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : <div />}
              </div>

              {/* Mobile module list */}
              <div className="lg:hidden mt-8">
                <h3 className="text-sm font-medium text-white mb-3">Tous les modules</h3>
                <div className="space-y-1">
                  {formation.modules.map((module, index) => {
                    const isActive = module.id === activeModuleId;
                    const isCompleted = completedModules.includes(module.id);
                    return (
                      <button
                        key={module.id}
                        onClick={() => goToModule(module)}
                        className={`w-full text-left p-3 rounded-lg flex items-center gap-3 text-sm ${
                          isActive ? 'bg-cyan-500/10 border border-cyan-500/30' : 'border border-transparent hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[0.6rem] ${
                          isCompleted ? 'bg-cyan-500 text-black' : isActive ? 'border border-cyan-500 text-cyan-400' : 'border border-white/10 text-slate-500'
                        }`}>
                          {isCompleted ? <CheckCircle className="w-3 h-3" /> : index + 1}
                        </div>
                        <span className={isActive ? 'text-white' : 'text-slate-400'}>{module.title}</span>
                        <span className="text-[0.6rem] text-slate-600 ml-auto">{module.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}
