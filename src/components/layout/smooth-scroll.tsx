'use client';

import Lenis from 'lenis';
import * as React from 'react';

import { usePrefersReducedMotion } from '@/hooks';

/**
 * Lenis smooth scrolling.
 *
 * Skipped entirely when the user prefers reduced motion, so native scrolling
 * (and the OS's own scroll behaviour) stays intact. Anchor clicks are
 * delegated here so in-page navigation eases instead of jumping.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href?.startsWith('#') || href === '#') return;

      const destination = document.querySelector(href);
      if (!destination) return;

      event.preventDefault();
      lenis.scrollTo(destination as HTMLElement, { offset: -80, duration: 1.2 });
      // Keep the URL in sync without pushing a history entry per click.
      window.history.replaceState(null, '', href);
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
