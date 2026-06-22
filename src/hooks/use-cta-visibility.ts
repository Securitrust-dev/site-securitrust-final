'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

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

  const hideCTA = useCallback(() => {}, []);

  const isInFlow = FLOW_PAGES.some(page => pathname === page || pathname?.startsWith(page + '/'));
  
  const isVisible = !isInFlow;

  return { isVisible, hideCTA };
};
