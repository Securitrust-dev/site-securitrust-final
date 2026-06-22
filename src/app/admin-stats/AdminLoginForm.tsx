'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        setError('Mot de passe incorrect');
      }
    } catch {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-white/60 text-xs uppercase tracking-widest font-mono">SecuriTrust — Admin</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-white/20"
                placeholder="••••••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400/80 text-xs font-mono">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-lg text-sm font-medium tracking-wider uppercase transition-colors"
            >
              {loading ? 'Vérification...' : 'Accéder au dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
