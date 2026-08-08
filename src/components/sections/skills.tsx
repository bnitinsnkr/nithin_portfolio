'use client';

import { motion, useInView } from 'framer-motion';
import * as React from 'react';

import { Reveal, RevealGroup } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { SKILL_CATEGORIES } from '@/constants/skills';
import { usePrefersReducedMotion } from '@/hooks';
import { EASE_SPRING, fadeUp } from '@/lib/motion';
import type { SkillCategory } from '@/types';

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="relative py-section">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Depth where it matters, breadth where it helps."
          description="Ten disciplines, ordered by how much of the last two years they account for. The bars are a self-assessment of working depth — not a benchmark, and not a certification."
        />

        <RevealGroup
          step={0.06}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6"
        >
          {SKILL_CATEGORIES.map((category) => (
            <SkillCard key={category.id} category={category} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const reducedMotion = usePrefersReducedMotion();
  const Icon = category.icon;

  return (
    <Reveal variants={fadeUp} className="h-full">
      {/* Wrapper carries the in-view ref so the card keeps its own internal ref. */}
      <div ref={ref} className="h-full">
        <SpotlightCard className="flex h-full flex-col p-6">
        <div className="flex items-start gap-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-coral/[0.08] text-coral-600">
            <Icon aria-hidden className="size-[18px]" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-lg tracking-[-0.025em] text-ink-900">
              {category.title}
            </h3>
            <p className="mt-0.5 text-[12px] leading-snug text-ink-400">{category.caption}</p>
          </div>
        </div>

        <ul className="mt-6 flex-1 space-y-3.5">
          {category.skills.map((skill, index) => (
            <li key={skill.name}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-[13px] text-ink-600">{skill.name}</span>
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-[10px] tabular-nums tracking-[0.1em] text-ink-400"
                >
                  {skill.level}
                </span>
              </div>

              <div
                role="meter"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency`}
                className="relative mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-ink-100"
              >
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-coral-600 via-coral to-amber"
                  initial={{ width: 0 }}
                  animate={inView || reducedMotion ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : 1.1,
                    ease: EASE_SPRING,
                    delay: reducedMotion ? 0 : 0.1 + index * 0.06,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
        </SpotlightCard>
      </div>
    </Reveal>
  );
}
