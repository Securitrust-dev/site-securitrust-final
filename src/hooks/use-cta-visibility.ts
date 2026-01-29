'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

const FLOW_PAGES = [
  '/eligibilite',
  '/non-eligible-offre-15',
  '/proposition',
  '/proposition-commerciale',
  '/signer-proposition',
  '/paiement',
  '/paiement/success',
  '/evaluation-maturite'
];

export const useCTAVisibility = () => {
  const pathname = usePathname();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const started = localStorage.getItem('pentest_started') === 'true';
      setIsStarted(started);
    };

    checkStatus();
    window.addEventListener('storage', checkStatus);
    return () => window.removeEventListener('storage', checkStatus);
  }, []);

  const hideCTA = useCallback(() => {
    localStorage.setItem('pentest_started', 'true');
    setIsStarted(true);
    // Trigger storage event for same window
    window.dispatchEvent(new Event('storage'));
  }, []);

  const isInFlow = FLOW_PAGES.some(page => pathname === page || pathname?.startsWith(page + '/'));
  
  const isVisible = !isStarted && !isInFlow;

  return { isVisible, hideCTA };
};
