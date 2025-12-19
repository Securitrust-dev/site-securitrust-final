'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SuccessRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Marquer comme signé dans le storage
    sessionStorage.setItem('propositionSigned', 'true');

    // Forcer la redirection du parent si on est dans une iframe
    if (window.self !== window.top) {
      try {
        window.top!.location.href = '/paiement';
      } catch (e) {
        // Fallback si cross-origin blocke window.top
        router.push('/paiement');
      }
    } else {
      router.push('/paiement');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto" />
        <p className="text-slate-400">Signature confirmée. Redirection vers le paiement...</p>
      </div>
    </div>
  );
}
