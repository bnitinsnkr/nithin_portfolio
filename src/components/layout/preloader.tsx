'use client';

import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { SITE } from '@/constants/site';
import { usePrefersReducedMotion } from '@/hooks';
import { EASE_SPRING } from '@/lib/motion';

const PHASES = ['Initialising scene', 'Loading vectors', 'Composing shaders', 'Ready'] as const;

/**
 * Entry curtain.
 *
 * Deliberately short and non-blocking: the page underneath is already
 * interactive, so this reads as a transition rather than a loading gate. It
 * exits on `window.load` (or after a hard cap) and never mounts at all for
 * reduced-motion users.
 */
export function Preloader() {
  const reducedMotion = usePrefersReducedMotion();
  const [done, setDone] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (reducedMotion) {
      setDone(true);
      return;
    }

    let frame = 0;
    const started = performance.now();
    // Ease toward 100% over ~1.4s; `window.load` can end it sooner.
    const tick = (now: number) => {
      const elapsed = (now - started) / 1400;
      setProgress(Math.min(100, Math.round((1 - Math.pow(1 - Math.min(elapsed, 1), 3)) * 100)));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const finish = () => {
      setProgress(100);
      window.setTimeout(() => setDone(true), 320);
    };

    const cap = window.setTimeout(finish, 1800);
    if (document.readyState === 'complete') {
      window.setTimeout(finish, 900);
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(cap);
      window.removeEventListener('load', finish);
    };
  }, [reducedMotion]);

  const phase = PHASES[Math.min(PHASES.length - 1, Math.floor((progress / 100) * PHASES.length))];

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="preloader"
          aria-hidden
          className="noise fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.6, ease: EASE_SPRING }}
        >
          <div className="aurora pointer-events-none absolute inset-0 opacity-70" />

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SPRING }}
            className="font-display text-2xl tracking-[-0.04em] text-silver-bright"
          >
            {SITE.initials}
          </motion.span>

          <div className="relative mt-7 h-px w-56 overflow-hidden bg-white/10 sm:w-72">
            <motion.span
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric to-cyanide"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 flex w-56 items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-silver-dim sm:w-72">
            <span>{phase}</span>
            <span className="tabular-nums text-electric-300">
              {String(progress).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
