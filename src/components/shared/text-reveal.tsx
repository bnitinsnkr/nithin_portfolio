'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

import { usePrefersReducedMotion } from '@/hooks';
import { revealChild, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  text: string;
  className?: string;
  /** Per-word delay step. */
  step?: number;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Word-by-word masked reveal.
 *
 * Each word sits inside an `overflow-hidden` span so the entrance reads as the
 * line rising out of the page rather than simply fading. The full string stays
 * available to assistive tech via `aria-label` while the visual fragments are
 * hidden from the accessibility tree.
 *
 * Spaces are real text nodes placed *between* the clipping spans, not margins.
 * A margin would look correct but make the heading copy and extract as one
 * run-on word. Whitespace only collapses inside an inline-block, not between
 * two of them, so the gap survives.
 */
export function TextReveal({
  text,
  className,
  step = 0.045,
  delay = 0,
  as = 'span',
}: TextRevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const words = React.useMemo(() => text.split(' ').filter(Boolean), [text]);

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion[as] as typeof motion.span;

  return (
    <MotionTag
      className={cn('inline-block', className)}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(step, delay)}
    >
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <span
            aria-hidden
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span className="inline-block" variants={revealChild}>
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </MotionTag>
  );
}
