'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as React from 'react';

import { useIsCoarsePointer, usePrefersReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element is allowed to travel toward the pointer, in px. */
  strength?: number;
}

/**
 * Magnetic hover wrapper.
 *
 * Disabled entirely for coarse pointers and reduced-motion users — on touch
 * there is no hover to react to, and the spring would fire on tap instead.
 */
export function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const coarsePointer = useIsCoarsePointer();
  const reducedMotion = usePrefersReducedMotion();
  const disabled = coarsePointer || reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 18, mass: 0.4 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // The inner layer trails slightly further for a subtle parallax between
  // the container and its label.
  const innerX = useTransform(springX, (value) => value * 0.35);
  const innerY = useTransform(springY, (value) => value * 0.35);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set((offsetX / (rect.width / 2)) * strength);
    y.set((offsetY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (disabled) {
    return <div className={cn('inline-flex', className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
    >
      <motion.div style={{ x: innerX, y: innerY }} className="inline-flex">
        {children}
      </motion.div>
    </motion.div>
  );
}
