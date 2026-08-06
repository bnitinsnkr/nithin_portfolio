'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownToLine, MousePointerClick } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import * as React from 'react';

import { Magnetic } from '@/components/shared/magnetic';
import { Button } from '@/components/ui/button';
import { COMPANIES } from '@/constants/experience';
import { HERO_ROLES, SITE } from '@/constants/site';
import { usePrefersReducedMotion } from '@/hooks';
import { EASE_SPRING } from '@/lib/motion';

// The 3D scene is client-only and lazily fetched — it must never sit on the
// critical path for LCP or block hydration of the headline.
const HeroScene = dynamic(() => import('@/three/hero-scene'), {
  ssr: false,
  loading: () => (
    <div aria-hidden className="absolute inset-0">
      <div className="aurora absolute inset-0" />
    </div>
  ),
});

const NAME_PARTS = ['Nithin', 'Sankar', 'Bahunadam'] as const;

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [sceneReady, setSceneReady] = React.useState(false);

  // Defer the canvas past first paint so the hero text renders immediately.
  React.useEffect(() => {
    const id = window.setTimeout(() => setSceneReady(true), 120);
    return () => window.clearTimeout(id);
  }, []);

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
      {/* Layer 0 — 3D scene */}
      <div className="absolute inset-0 -z-20">{sceneReady ? <HeroScene /> : null}</div>

      {/* Layer 1 — atmospheric wash and grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute inset-0 opacity-80" />
        <div className="grid-lines mask-radial absolute inset-0 opacity-[0.55]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void to-transparent" />
      </div>

      <div className="container relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_SPRING, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-electric" />
              <span className="relative inline-flex size-1.5 rounded-full bg-electric" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver">
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
            <span className="hidden h-px w-10 bg-gradient-to-r from-electric to-transparent sm:block" />
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={HERO_ROLES[roleIndex]}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5, ease: EASE_SPRING }}
                  className="absolute inset-0 flex items-center font-display text-xl tracking-[-0.02em] text-electric-300 sm:text-2xl"
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
            className="mt-8 max-w-2xl text-[15px] leading-[1.8] text-silver sm:text-base"
          >
            Six years building enterprise systems that have to be right — Retrieval-Augmented
            Generation, NLP pipelines and secure Java/Python backends at{' '}
            <span className="text-silver-bright">American Express</span>,{' '}
            <span className="text-silver-bright">ADP</span> and{' '}
            <span className="text-silver-bright">LTIMindtree</span>. Grounded answers, evaluated
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
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-silver-dim">
              Engineering across
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              {COMPANIES.map((company) => (
                <li
                  key={company}
                  className="text-sm tracking-tight text-silver-muted transition-colors duration-300 ease-spring hover:text-silver-bright"
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
        <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-silver-dim transition-colors duration-300 ease-spring group-hover:text-silver">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-white/12">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-electric to-transparent"
            animate={reducedMotion ? undefined : { y: ['-100%', '250%'] }}
            transition={{ duration: 1.9, ease: 'easeInOut', repeat: Infinity }}
          />
        </span>
      </motion.a>
    </section>
  );
}
