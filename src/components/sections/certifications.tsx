'use client';

import { BadgeCheck } from 'lucide-react';
import { FaAws, FaDatabase, FaGoogle, FaMicrosoft } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

import { Reveal, RevealGroup } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { CERTIFICATIONS, VENDOR_META } from '@/constants/certifications';
import { scaleIn } from '@/lib/motion';
import type { Certification } from '@/types';

const VENDOR_ICON: Record<Certification['vendor'], IconType> = {
  aws: FaAws,
  azure: FaMicrosoft,
  // simple-icons dropped the Oracle mark, so this card uses a neutral glyph.
  oracle: FaDatabase,
  google: FaGoogle,
};

export function Certifications() {
  return (
    <section id="certifications" aria-label="Certifications" className="relative py-section">
      <div className="container">
        <SectionHeading
          eyebrow="Certifications"
          title="Verified across four clouds and platforms."
          description="Cloud and AI credentials backing the deployment, infrastructure and platform work — two AWS, one Azure, one Oracle Cloud, and Google's Generative AI intensive."
        />

        <RevealGroup step={0.07} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((certification) => {
            const meta = VENDOR_META[certification.vendor];
            const Icon = VENDOR_ICON[certification.vendor];

            return (
              <Reveal key={certification.id} variants={scaleIn} className="h-full">
                <SpotlightCard className="group h-full p-6">
                  {/* Vendor-tinted wash, kept far below the accent's saturation. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-60 blur-3xl transition-opacity duration-500 ease-spring group-hover/spot:opacity-100"
                    style={{ background: `radial-gradient(circle, ${meta.from}, ${meta.to})` }}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-2xl border border-line bg-ink-50 text-ink-900">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <BadgeCheck aria-hidden className="size-4 text-coral-600" />
                  </div>

                  <h3 className="relative mt-5 font-display text-base leading-snug tracking-[-0.02em] text-ink-900">
                    {certification.name}
                  </h3>

                  <div className="relative mt-4 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-[12px] text-ink-500">{certification.issuer}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-coral-600">
                      {certification.level}
                    </span>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}

          {/* Education card closes the grid rather than leaving a hole. */}
          <Reveal variants={scaleIn} className="h-full">
            <SpotlightCard className="flex h-full flex-col justify-between p-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
                  Education
                </span>
                <h3 className="mt-4 font-display text-base leading-snug tracking-[-0.02em] text-ink-900">
                  M.S., Big Data Analytics &amp; Information Technology
                </h3>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-[12px] text-ink-500">University of Central Missouri</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-coral-600">
                  2025
                </span>
              </div>
            </SpotlightCard>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
}
