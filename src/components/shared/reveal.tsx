'use client';

import { motion, type Variants } from 'framer-motion';
import * as React from 'react';

import { usePrefersReducedMotion } from '@/hooks';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * React's drag/animation handlers collide with Framer Motion's props of the
 * same name, so they are dropped from the passthrough surface.
 */
type PassthroughProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
>;

/**
 * Set by `RevealGroup`. When a `Reveal` is inside a group it hands scroll
 * triggering to the parent and only declares its variants, which is what makes
 * the parent's `staggerChildren` actually apply — a child with its own
 * `whileInView` would animate independently and silently ignore the stagger.
 */
const GroupContext = React.createContext(false);

interface RevealProps extends PassthroughProps {
  variants?: Variants;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
}

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = 'div',
  ...props
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const inGroup = React.useContext(GroupContext);

  if (reducedMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] as typeof motion.div;

  if (inGroup) {
    return (
      <MotionTag className={cn(className)} variants={variants} {...props}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps extends PassthroughProps {
  /** Seconds between each child's entrance. */
  step?: number;
  delay?: number;
  as?: 'div' | 'ul' | 'section';
}

export function RevealGroup({
  children,
  className,
  step = 0.08,
  delay = 0,
  as = 'div',
  ...props
}: RevealGroupProps) {
  const reducedMotion = usePrefersReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reducedMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <GroupContext.Provider value>
      <MotionTag
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={stagger(step, delay)}
        {...props}
      >
        {children}
      </MotionTag>
    </GroupContext.Provider>
  );
}
