'use client';

import { useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '@/hooks/use-media-query';

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Count-up animation driven by rAF rather than a timer, so it stays in step
 * with the compositor and stops cleanly when the tab is backgrounded.
 * Respects `prefers-reduced-motion` by jumping straight to the final value.
 */
export function useCountUp(target: number, start: boolean, duration = 1600) {
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    if (reducedMotion) {
      setValue(target);
      return;
    }

    const began = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - began) / duration, 1);
      const eased = easeOutExpo(progress);
      // Keep one decimal for fractional targets (e.g. 99.9) and none otherwise.
      const next = Number.isInteger(target)
        ? Math.round(target * eased)
        : Number((target * eased).toFixed(1));

      setValue(next);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [target, start, duration, reducedMotion]);

  return value;
}
