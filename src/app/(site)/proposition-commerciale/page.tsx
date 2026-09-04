'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PropositionCommercialePage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la nouvelle page de proposition
    router.replace('/proposition');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center">
      <div className="text-cyan-400 animate-pulse">Redirection...</div>
    </div>
  );
}