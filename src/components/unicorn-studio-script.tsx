'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    UnicornStudio: {
      init: () => void;
      isInitialized: boolean;
    };
  }
}

export function UnicornStudioScript() {
  useEffect(() => {
    // Poll for UnicornStudio to be available and initialize it
    const checkAndInit = () => {
      if (typeof window !== 'undefined' && window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    // Check immediately
    checkAndInit();

    // Also set up an interval to catch it when it loads
    const interval = setInterval(checkAndInit, 100);

    // Clean up after 5 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Script
      src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
      strategy="afterInteractive"
    />
  );
}