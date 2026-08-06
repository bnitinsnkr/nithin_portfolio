'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe media query hook. Returns `false` on the server and during the
 * first client render, then settles synchronously after hydration — so it can
 * gate expensive work (3D, postprocessing) without causing a mismatch.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);

    update();
    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, [query]);

  return matches;
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(max-width: 1023px)');
export const useIsCoarsePointer = () => useMediaQuery('(pointer: coarse)');

/** Honours the OS "reduce motion" preference across every animation surface. */
export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)');
