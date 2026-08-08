'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownToLine, MousePointerClick } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Magnetic } from '@/components/shared/magnetic';
import { Button } from '@/components/ui/button';
import { COMPANIES } from '@/constants/experience';
import { HERO_ROLES, SITE } from '@/constants/site';
import { usePrefersReducedMotion } from '@/hooks';
import { EASE_SPRING } from '@/lib/motion';

const NAME_PARTS = ['Nithin', 'Sankar', 'Bahunadam'] as const;

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(
      () => setRoleIndex((value) => (value + 1) % HERO_ROLES.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-height)]"
    >
      {/*
        Decorative backdrop, CSS only. This replaced a three.js canvas: the
        blurred blobs read as depth at a fraction of the cost, and because
        nothing here is scripted there is no work competing with scrolling.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 -top-32 size-[34rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,90,54,0.24),transparent_68%)] blur-2xl sm:-right-16" />
        <div className="absolute -left-40 top-40 size-[30rem] rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(255,158,44,0.20),transparent_66%)] blur-2xl" />
        <div className="absolute bottom-[-14rem] right-1/4 size-[26rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,54,0.12),transparent_70%)] blur-2xl" />
        <div className="grid-lines mask-radial absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <div className="container relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_SPRING, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-50 px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-coral" />
              <span className="relative inline-flex size-1.5 rounded-full bg-coral" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-600">
              {SITE.availability}
            </span>
          </motion.div>

          <h1 id="hero-heading" className="mt-8">
            <span className="sr-only">
              {SITE.name} — {HERO_ROLES.join(', ')}
            </span>

            <span aria-hidden className="block text-display-lg">
              {NAME_PARTS.map((part, partIndex) => (
                <span key={part} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block text-gradient"
                    initial={{ y: '108%' }}
                    animate={{ y: '0%' }}
                    transition={{
                      duration: 1,
                      ease: EASE_SPRING,
                      delay: 0.16 + partIndex * 0.09,
                    }}
                  >
                    {part}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          {/* Rotating discipline line */}
          <div
            aria-hidden
            className="mt-7 flex h-9 items-center gap-3 sm:h-10"
          >
            <span className="hidden h-px w-10 bg-gradient-to-r from-coral to-transparent sm:block" />
            {/* self-stretch: the row is `items-center`, so without it this
                wrapper collapses to zero height and the absolutely-positioned
                role text inside becomes invisible. */}
            <div className="relative flex-1 self-stretch overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={HERO_ROLES[roleIndex]}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5, ease: EASE_SPRING }}
                  className="absolute inset-0 flex items-center font-display text-xl tracking-[-0.02em] text-coral-600 sm:text-2xl"
                >
                  {HERO_ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_SPRING, delay: 0.5 }}
            className="mt-8 max-w-2xl text-[15px] leading-[1.8] text-ink-600 sm:text-base"
          >
            Six years building enterprise systems that have to be right — Retrieval-Augmented
            Generation, NLP pipelines and secure Java/Python backends at{' '}
            <span className="text-ink-900">American Express</span>,{' '}
            <span className="text-ink-900">ADP</span> and{' '}
            <span className="text-ink-900">LTIMindtree</span>. Grounded answers, evaluated
            retrieval, boring releases.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_SPRING, delay: 0.62 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Button asChild size="lg">
                <a href={SITE.resumePath} download={SITE.resumeFileName}>
                  <ArrowDownToLine aria-hidden />
                  Download Resume
                </a>
              </Button>
            </Magnetic>

            <Magnetic>
              <Button asChild size="lg" variant="secondary">
                <Link href="#contact">
                  <MousePointerClick aria-hidden />
                  Contact Me
                </Link>
              </Button>
            </Magnetic>
          </motion.div>

          {/* Company strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE_SPRING, delay: 0.8 }}
            className="mt-14 border-t border-line pt-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-400">
              Engineering across
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              {COMPANIES.map((company) => (
                <li
                  key={company}
                  className="text-sm tracking-tight text-ink-500 transition-colors duration-300 ease-spring hover:text-ink-900"
                >
                  {company}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="group absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-400 transition-colors duration-300 ease-spring group-hover:text-ink-600">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-ink-200">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-coral to-transparent"
            animate={reducedMotion ? undefined : { y: ['-100%', '250%'] }}
            transition={{ duration: 1.9, ease: 'easeInOut', repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  );
}
