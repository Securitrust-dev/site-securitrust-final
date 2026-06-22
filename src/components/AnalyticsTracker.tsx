'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string>('');
  const startTimeRef = useRef<number>(0);
  const currentPathRef = useRef<string>('');

  useEffect(() => {
    // Skip admin and API pages
    if (pathname.startsWith('/admin-stats') || pathname.startsWith('/api/')) return;

    // Get or create 30-min session ID
    const SESSION_TTL = 30 * 60 * 1000;
    let sessionId = '';
    try {
      const stored = localStorage.getItem('_st_sid');
      const storedTs = parseInt(localStorage.getItem('_st_sid_t') || '0');
      if (stored && Date.now() - storedTs < SESSION_TTL) {
        sessionId = stored;
      } else {
        sessionId = crypto.randomUUID();
        localStorage.setItem('_st_sid', sessionId);
      }
      localStorage.setItem('_st_sid_t', Date.now().toString());
    } catch {
      sessionId = crypto.randomUUID();
    }

    sessionIdRef.current = sessionId;
    startTimeRef.current = Date.now();
    currentPathRef.current = pathname;

    const ua = navigator.userAgent;
    const deviceType = /Mobi|Android/i.test(ua)
      ? 'mobile'
      : /Tablet|iPad/i.test(ua)
      ? 'tablet'
      : 'desktop';

    // Record page view
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        sessionId,
        referrer: document.referrer || null,
        deviceType,
      }),
    }).catch(() => {});

    // Send duration on leave
    const sendDuration = () => {
      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (duration < 2) return;
      const data = JSON.stringify({
        _method: 'PATCH',
        sessionId: sessionIdRef.current,
        path: currentPathRef.current,
        duration,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/track', data);
      }
    };

    const onHide = () => {
      if (document.visibilityState === 'hidden') sendDuration();
    };

    window.addEventListener('beforeunload', sendDuration);
    document.addEventListener('visibilitychange', onHide);

    return () => {
      window.removeEventListener('beforeunload', sendDuration);
      document.removeEventListener('visibilitychange', onHide);
    };
  }, [pathname]);

  return null;
}
