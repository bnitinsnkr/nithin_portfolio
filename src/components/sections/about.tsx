'use client';

import { MapPin } from 'lucide-react';
import Image from 'next/image';

import { AnimatedCounter } from '@/components/shared/animated-counter';
import { Marquee } from '@/components/shared/marquee';
import { Reveal, RevealGroup } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { ABOUT } from '@/constants/about';
import { SITE } from '@/constants/site';
import { IMPACT_HIGHLIGHTS, STATS } from '@/constants/stats';
import { fadeUp, scaleIn, slideInRight } from '@/lib/motion';

export function About() {
  return (
    <section id="about" aria-label="About" className="relative py-section">
      <div className="container">
        <SectionHeading eyebrow={ABOUT.eyebrow} title={ABOUT.heading} description={ABOUT.lead} />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          {/* Narrative */}
          <RevealGroup className="space-y-6">
            {ABOUT.paragraphs.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 32)} variants={fadeUp} as="div">
                <p className="text-[15px] leading-[1.85] text-ink-500 sm:text-base">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal variants={fadeUp} className="pt-2">
              <div className="grid gap-4 sm:grid-cols-2">
                {ABOUT.principles.map((principle) => (
                  <SpotlightCard key={principle.title} className="p-5" radius={280}>
                    <h3 className="font-display text-[15px] tracking-[-0.02em] text-ink-900">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-ink-500">
                      {principle.body}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </Reveal>
          </RevealGroup>

          {/* Portrait + facts */}
          <Reveal variants={slideInRight} className="lg:sticky lg:top-28 lg:self-start">
            <div className="card-floating edge-light relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://placehold.co/720x900/0B0F14/33A5FF/png?text=Portrait"
                  alt={`Portrait of ${SITE.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  className="object-cover"
                />
                {/* Colour treatment + gradient scrim, per the image treatment rules. */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-coral/25 mix-blend-multiply"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                />
              </div>

              <div className="relative p-6">
                <p className="font-display text-lg tracking-[-0.02em] text-ink-900">
                  {SITE.name}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{SITE.role}</p>

                <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
                  <MapPin aria-hidden className="size-3.5 text-coral-600" />
                  {SITE.location}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Statistics */}
        <RevealGroup
          step={0.07}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3 lg:grid-cols-5"
        >
          {STATS.map((stat) => (
            <Reveal
              key={stat.label}
              variants={scaleIn}
              className="group relative bg-surface-raised p-6 transition-colors duration-500 ease-spring hover:bg-surface-elevated"
            >
              <p className="font-display text-4xl tracking-[-0.04em] text-gradient-accent">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[13px] font-medium tracking-tight text-ink-900">
                {stat.label}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-ink-400">{stat.caption}</p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-coral to-transparent transition-transform duration-500 ease-spring group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </RevealGroup>

        {/* Impact ticker */}
        <Reveal variants={fadeUp} className="mt-10">
          <h3 className="sr-only">Measured outcomes</h3>
          <Marquee items={IMPACT_HIGHLIGHTS} duration={48} />
        </Reveal>
      </div>
    </section>
  );
}
