'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the nav can highlight it.
 * Uses a single IntersectionObserver over all targets rather than a scroll
 * listener, so it costs nothing while idle.
 */
export function useActiveSection(ids: string[], rootMargin = '-45% 0px -50% 0px') {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
