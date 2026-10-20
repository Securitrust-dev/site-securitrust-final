'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

const FLOW_PAGES = [
  '/evaluation-maturite'
];

export const useCTAVisibility = () => {
  const pathname = usePathname();

  const hideCTA = useCallback(() => {}, []);

  const isInFlow = FLOW_PAGES.some(page => pathname === page || pathname?.startsWith(page + '/'));
  
  const isVisible = !isInFlow;

  return { isVisible, hideCTA };
};
