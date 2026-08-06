'use client';

import * as React from 'react';

import { useIsCoarsePointer } from '@/hooks';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Radius of the cursor-tracking highlight, in px. */
  radius?: number;
}

/**
 * Glass card with a pointer-tracking specular highlight.
 *
 * The highlight position is written straight to CSS custom properties instead
 * of React state — pointer moves must not trigger a re-render.
 */
export function SpotlightCard({
  children,
  className,
  radius = 380,
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const coarsePointer = useIsCoarsePointer();

  const handleMove = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (coarsePointer || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      ref.current.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      ref.current.style.setProperty('--spot-opacity', '1');
    },
    [coarsePointer],
  );

  const handleLeave = React.useCallback(() => {
    ref.current?.style.setProperty('--spot-opacity', '0');
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        'glass-raised edge-light group/spot relative isolate overflow-hidden rounded-3xl',
        'transition-[transform,border-color,box-shadow] duration-500 ease-spring',
        'hover:-translate-y-1 hover:border-line-strong hover:shadow-floating',
        className,
      )}
      style={{ '--spot-opacity': 0 } as React.CSSProperties}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[var(--spot-opacity)] transition-opacity duration-500 ease-spring"
        style={{
          background: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(51,165,255,0.14), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
