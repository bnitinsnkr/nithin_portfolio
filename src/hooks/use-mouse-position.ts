'use client';

import { useEffect, useRef, useState } from 'react';

export interface Pointer {
  /** Normalized to −1…1 with the origin at the viewport centre. */
  x: number;
  y: number;
  /** Raw client coordinates in CSS pixels. */
  clientX: number;
  clientY: number;
}

const INITIAL: Pointer = { x: 0, y: 0, clientX: 0, clientY: 0 };

/**
 * Pointer tracking for parallax and the custom cursor.
 *
 * Updates are coalesced into a single rAF tick so a fast mouse cannot force
 * more React renders than there are frames.
 */
export function useMousePosition(enabled = true): Pointer {
  const [pointer, setPointer] = useState<Pointer>(INITIAL);
  const frame = useRef<number | null>(null);
  const latest = useRef<Pointer>(INITIAL);

  useEffect(() => {
    if (!enabled) return;

    const handle = (event: MouseEvent) => {
      latest.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
        clientX: event.clientX,
        clientY: event.clientY,
      };

      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        setPointer(latest.current);
      });
    };

    window.addEventListener('mousemove', handle, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handle);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  return pointer;
}

/**
 * Ref-based variant for consumers that must not re-render (the R3F scene reads
 * this every frame inside `useFrame`).
 */
export function useMousePositionRef(enabled = true) {
  const ref = useRef<Pointer>(INITIAL);

  useEffect(() => {
    if (!enabled) return;

    const handle = (event: MouseEvent) => {
      ref.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -((event.clientY / window.innerHeight) * 2 - 1),
        clientX: event.clientX,
        clientY: event.clientY,
      };
    };

    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, [enabled]);

  return ref;
}
