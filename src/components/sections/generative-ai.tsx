'use client';

import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { Reveal, RevealGroup } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { Badge } from '@/components/ui/badge';
import { CAPABILITY_GROUPS, GENAI_CAPABILITIES, RAG_WORKFLOW } from '@/constants/genai';
import { usePrefersReducedMotion } from '@/hooks';
import { EASE_SPRING, fadeUp, slideInRight } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { Capability } from '@/types';

const GROUP_ORDER = Object.keys(CAPABILITY_GROUPS) as Capability['group'][];

export function GenerativeAI() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [autoplay, setAutoplay] = React.useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const active = RAG_WORKFLOW[activeIndex];

  // Auto-advance until the visitor takes control, then stop for good.
  React.useEffect(() => {
    if (!autoplay || reducedMotion) return;
    const id = window.setInterval(
      () => setActiveIndex((value) => (value + 1) % RAG_WORKFLOW.length),
      3800,
    );
    return () => window.clearInterval(id);
  }, [autoplay, reducedMotion]);

  const select = (index: number) => {
    setAutoplay(false);
    setActiveIndex(index);
  };

  return (
    <section id="generative-ai" aria-label="Generative AI" className="relative py-section">
      {/* Full-bleed treatment marks this as the flagship band. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-wash absolute inset-0 opacity-90" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
      </div>

      <div className="container">
        <SectionHeading
          eyebrow="Generative AI"
          title="A RAG system is ten decisions, not one API call."
          description="This is the lifecycle as actually shipped on an internal enterprise knowledge assistant — ingestion through observability. The interesting engineering lives in steps 04 to 09."
          aside={
            <div className="card-raised rounded-2xl px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-400">
                Measured on the assistant
              </p>
              <p className="mt-2 font-display text-3xl tracking-[-0.04em] text-gradient-accent">
                78% → 91%
              </p>
              <p className="mt-1 text-[12px] text-ink-500">
                Retrieval accuracy after chunk, filter and prompt tuning
              </p>
            </div>
          }
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12">
          {/* Stepper */}
          <Reveal variants={fadeUp}>
            <ol
              className="relative space-y-1"
              onMouseEnter={() => setAutoplay(false)}
            >
              <span
                aria-hidden
                className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-line"
              />
              {RAG_WORKFLOW.map((stage, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={stage.id} className="relative">
                    <button
                      type="button"
                      onClick={() => select(index)}
                      aria-current={isActive ? 'step' : undefined}
                      className={cn(
                        'group flex w-full items-center gap-3.5 rounded-xl px-2 py-2 text-left',
                        'transition-colors duration-300 ease-spring',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral',
                        isActive ? 'bg-ink-50' : 'hover:bg-ink-50',
                      )}
                    >
                      <span
                        className={cn(
                          'relative z-10 grid size-[30px] shrink-0 place-items-center rounded-full border font-mono text-[10px] tracking-[0.08em]',
                          'transition-[color,border-color,background-color,transform] duration-300 ease-spring',
                          isActive
                            ? 'scale-110 border-coral/60 bg-coral/15 text-coral-700'
                            : 'border-line bg-paper text-ink-400 group-hover:border-line-strong',
                        )}
                      >
                        {stage.step}
                      </span>
                      <span
                        className={cn(
                          'text-sm tracking-tight transition-colors duration-300 ease-spring',
                          isActive ? 'text-ink-900' : 'text-ink-500',
                        )}
                      >
                        {stage.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Detail panel */}
          <Reveal variants={slideInRight}>
            <div className="card-floating edge-light relative min-h-[320px] overflow-hidden rounded-3xl p-7 sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-coral/10 blur-3xl"
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE_SPRING }}
                  className="relative"
                >
                  <span className="font-mono text-[64px] leading-none tracking-[-0.04em] text-ink-100 sm:text-[86px]">
                    {active.step}
                  </span>

                  <h3 className="mt-2 font-display text-3xl tracking-[-0.035em] text-gradient">
                    {active.title}
                  </h3>

                  <p className="mt-5 max-w-xl text-[15px] leading-[1.85] text-ink-500">
                    {active.description}
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {active.tools.map((tool) => (
                      <li key={tool}>
                        <Badge variant="accent">{tool}</Badge>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* Progress rail */}
              <div className="absolute inset-x-7 bottom-7 h-px bg-ink-100 sm:inset-x-9">
                <motion.span
                  className="block h-full origin-left bg-gradient-to-r from-coral to-amber"
                  animate={{ scaleX: (activeIndex + 1) / RAG_WORKFLOW.length }}
                  transition={{ duration: 0.6, ease: EASE_SPRING }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Capability groups */}
        <RevealGroup step={0.06} className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {GROUP_ORDER.map((group) => {
            const meta = CAPABILITY_GROUPS[group];
            const items = GENAI_CAPABILITIES.filter((item) => item.group === group);

            return (
              <Reveal key={group} variants={fadeUp} className="h-full">
                <div className="card-raised edge-light h-full rounded-3xl p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-base tracking-[-0.02em] text-ink-900">
                      {meta.label}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-ink-400">
                      {String(items.length).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-400">{meta.blurb}</p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <li
                        key={item.name}
                        className="rounded-md border border-line bg-ink-50 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.09em] text-ink-500 transition-colors duration-300 ease-spring hover:border-coral/30 hover:text-coral-700"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
