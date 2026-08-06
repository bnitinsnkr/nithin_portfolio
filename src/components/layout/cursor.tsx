'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import * as React from 'react';

import { useIsCoarsePointer, usePrefersReducedMotion } from '@/hooks';

/**
 * Custom cursor: a hard dot that tracks 1:1 and a soft ring that lags behind
 * on a spring. Grows and inverts over anything interactive.
 *
 * Never mounted for touch/pen input or reduced-motion users — and the native
 * cursor is only hidden while this component is actually on screen, so a
 * hydration failure can't leave the page cursor-less.
 */
export function Cursor() {
  const coarsePointer = useIsCoarsePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = !coarsePointer && !reducedMotion;

  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 });

  React.useEffect(() => {
    if (!enabled) return;

    document.body.dataset.customCursor = 'true';

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest('a, button, [role="button"], input, textarea, select')));
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      delete document.body.dataset.customCursor;
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <motion.span
        className="absolute left-0 top-0 size-1.5 rounded-full bg-electric"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="absolute left-0 top-0 rounded-full border border-electric/50 mix-blend-screen"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          width: active ? 44 : 26,
          height: active ? 44 : 26,
          backgroundColor: active ? 'rgba(51,165,255,0.14)' : 'rgba(51,165,255,0)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      />
    </div>
  );
}
