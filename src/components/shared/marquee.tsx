'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: readonly string[];
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
}

/**
 * Infinite ticker. The list is duplicated once and translated by exactly −50%,
 * so the seam is never visible and the animation is a single transform.
 * Pauses on hover and freezes entirely under `prefers-reduced-motion`
 * (handled globally in `globals.css`).
 */
export function Marquee({
  items,
  duration = 42,
  reverse = false,
  className,
  itemClassName,
}: MarqueeProps) {
  return (
    <div className={cn('mask-fade-x group relative overflow-hidden', className)}>
      <div
        className="animate-marquee flex w-max items-center gap-3 group-hover:[animation-play-state:paused]"
        style={
          {
            '--marquee-duration': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {[0, 1].map((copy) => (
          <React.Fragment key={copy}>
            {items.map((item, index) => (
              <span
                key={`${copy}-${item}-${index}`}
                aria-hidden={copy === 1}
                className={cn(
                  'inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2',
                  'font-mono text-[11px] uppercase tracking-[0.14em] text-silver-muted',
                  'transition-colors duration-300 ease-spring hover:border-electric/30 hover:text-electric-200',
                  itemClassName,
                )}
              >
                <span aria-hidden className="size-1 rounded-full bg-electric/60" />
                {item}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
