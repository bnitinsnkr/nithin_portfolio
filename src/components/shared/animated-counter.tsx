'use client';

import { useInView } from 'framer-motion';
import * as React from 'react';

import { useCountUp } from '@/hooks';
import { formatMetric } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts up once the number scrolls into view, then stays put. */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1600,
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const current = useCountUp(value, inView, duration);

  return (
    <span ref={ref} className={className}>
      {/* Announce the final value immediately; the animation is decorative. */}
      <span className="sr-only">{formatMetric(value, prefix, suffix)}</span>
      <span aria-hidden>{formatMetric(current, prefix, suffix)}</span>
    </span>
  );
}
