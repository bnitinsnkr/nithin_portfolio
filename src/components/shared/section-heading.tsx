import * as React from 'react';

import { Reveal } from '@/components/shared/reveal';
import { TextReveal } from '@/components/shared/text-reveal';
import { fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Rendered to the right of the heading on wide screens. */
  aside?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  aside,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between',
        align === 'center' && 'lg:flex-col lg:items-center lg:justify-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
        <Reveal variants={fadeUp}>
          <span className="eyebrow">
            <span aria-hidden className="size-1 rounded-full bg-coral" />
            {eyebrow}
          </span>
        </Reveal>

        <TextReveal
          as="h2"
          text={title}
          delay={0.06}
          className="mt-5 text-display-sm text-gradient"
        />

        {description ? (
          <Reveal variants={fadeUp} delay={0.14}>
            <p
              className={cn(
                'mt-5 text-[15px] leading-[1.75] text-ink-500 sm:text-base',
                align === 'center' && 'mx-auto',
              )}
            >
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>

      {aside ? (
        <Reveal variants={fadeUp} delay={0.2} className="shrink-0">
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}
