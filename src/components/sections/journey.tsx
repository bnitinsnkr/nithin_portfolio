'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, GraduationCap, MapPin } from 'lucide-react';
import * as React from 'react';

import { AnimatedCounter } from '@/components/shared/animated-counter';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { Badge } from '@/components/ui/badge';
import { EXPERIENCE } from '@/constants/experience';
import { usePrefersReducedMotion } from '@/hooks';
import { EASE_SPRING, fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { ExperienceEntry } from '@/types';

const ACCENT_RING: Record<ExperienceEntry['accent'], string> = {
  electric: 'bg-electric shadow-[0_0_0_4px_rgba(51,165,255,0.16),0_0_22px_rgba(51,165,255,0.75)]',
  cyan: 'bg-cyanide shadow-[0_0_0_4px_rgba(76,221,240,0.14),0_0_22px_rgba(76,221,240,0.7)]',
  silver: 'bg-silver shadow-[0_0_0_4px_rgba(169,179,196,0.12),0_0_18px_rgba(169,179,196,0.55)]',
};

export function Journey() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Progress of the vertical rail, tied to how far the section has scrolled.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 65%', 'end 65%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="journey" aria-label="Career journey" className="relative py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50rem_36rem_at_20%_10%,rgba(51,165,255,0.07),transparent_60%)]"
      />

      <div className="container">
        <SectionHeading
          eyebrow="Career Journey"
          title="Enterprise Java to machine learning to Generative AI."
          description="Three roles, one direction of travel: closer to the hard part of the problem. Enterprise Java taught reliability, ML and NLP taught evaluation, and Generative AI needs both at once."
        />

        <div ref={trackRef} className="relative mt-16 lg:mt-20">
          {/* Rail */}
          <div
            aria-hidden
            className="absolute left-[15px] top-2 h-full w-px bg-line md:left-1/2 md:-translate-x-1/2"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-electric via-cyanide to-transparent"
              style={{ scaleY: reducedMotion ? 1 : scaleY }}
            />
          </div>

          <ol className="space-y-12 md:space-y-16">
            {EXPERIENCE.map((entry, index) => (
              <TimelineItem key={entry.id} entry={entry} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const [expanded, setExpanded] = React.useState(index === 0);
  const isEducation = entry.kind === 'education';
  const alignRight = index % 2 === 1;
  const panelId = `timeline-panel-${entry.id}`;

  return (
    <li className="relative pl-11 md:pl-0">
      {/* Node */}
      <span
        aria-hidden
        className={cn(
          'absolute left-[10px] top-3 size-2.5 rounded-full md:left-1/2 md:-translate-x-1/2',
          ACCENT_RING[entry.accent],
        )}
      />

      <div
        className={cn(
          'md:grid md:grid-cols-2 md:gap-12',
          alignRight && 'md:[&>*:first-child]:col-start-2',
        )}
      >
        <Reveal
          variants={fadeUp}
          className={cn('md:pt-0', alignRight ? 'md:pl-12' : 'md:pr-12 md:text-right')}
        >
          <article
            className={cn(
              'glass-raised edge-light relative overflow-hidden rounded-3xl p-6 sm:p-7',
              'transition-[transform,border-color,box-shadow] duration-500 ease-spring',
              'hover:-translate-y-1 hover:border-line-strong hover:shadow-floating',
            )}
          >
            <div
              className={cn(
                'flex flex-wrap items-center gap-2',
                alignRight ? '' : 'md:justify-end',
              )}
            >
              <Badge variant={isEducation ? 'outline' : 'accent'}>
                {isEducation ? (
                  <GraduationCap aria-hidden className="size-3" />
                ) : null}
                {entry.period}
              </Badge>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-silver-dim">
                <MapPin aria-hidden className="size-3" />
                {entry.location}
              </span>
            </div>

            <h3 className="mt-4 font-display text-2xl tracking-[-0.03em] text-gradient">
              {entry.company}
            </h3>
            <p className="mt-1.5 text-sm font-medium tracking-tight text-electric-300">
              {entry.role}
            </p>
            <p className="mt-4 text-sm leading-[1.75] text-silver">{entry.headline}</p>

            {entry.summary.map((paragraph) => (
              <p
                key={paragraph.slice(0, 28)}
                className="mt-3 text-[13px] leading-[1.8] text-silver-muted"
              >
                {paragraph}
              </p>
            ))}

            {/* Metrics */}
            {entry.metrics.length > 0 ? (
              <dl
                className={cn(
                  'mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5',
                  alignRight ? 'text-left' : 'md:text-right',
                )}
              >
                {entry.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <span className="font-display text-2xl tracking-[-0.03em] text-silver-bright">
                        <AnimatedCounter
                          value={metric.value}
                          prefix={metric.prefix}
                          suffix={metric.suffix}
                        />
                      </span>
                      <span className="mt-1 block text-[11px] leading-snug text-silver-dim">
                        {metric.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {/* Expandable highlights */}
            {entry.highlights.length > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  className={cn(
                    'mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5',
                    'font-mono text-[11px] uppercase tracking-[0.16em] text-silver-muted',
                    'transition-[color,border-color,transform] duration-300 ease-spring',
                    'hover:border-electric/35 hover:text-electric-200 active:scale-[0.97]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric',
                  )}
                >
                  {expanded ? 'Hide detail' : `${entry.highlights.length} highlights`}
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      'size-3.5 transition-transform duration-300 ease-spring',
                      expanded && 'rotate-180',
                    )}
                  />
                </button>

                <motion.div
                  id={panelId}
                  initial={false}
                  animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE_SPRING }}
                  className="overflow-hidden"
                >
                  <ul
                    className={cn(
                      'mt-5 space-y-2.5 text-[13px] leading-[1.75] text-silver-muted',
                      alignRight ? '' : 'md:text-right',
                    )}
                  >
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight.slice(0, 30)}
                        className={cn(
                          'flex gap-2.5',
                          alignRight ? '' : 'md:flex-row-reverse md:text-right',
                        )}
                      >
                        <span
                          aria-hidden
                          className="mt-[0.55em] size-1 shrink-0 rounded-full bg-electric/60"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            ) : null}

            {/* Stack */}
            <ul
              className={cn(
                'mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5',
                alignRight ? '' : 'md:justify-end',
              )}
            >
              {entry.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-silver-dim transition-colors duration-300 ease-spring hover:border-electric/30 hover:text-electric-200"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </li>
  );
}
