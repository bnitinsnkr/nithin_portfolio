'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowDownToLine, Menu, X } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Magnetic } from '@/components/shared/magnetic';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS, SITE } from '@/constants/site';
import { useActiveSection } from '@/hooks';
import { EASE_SPRING } from '@/lib/motion';
import { cn } from '@/lib/utils';

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace('#', ''));

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(SECTION_IDS);

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 24);
  });

  // Lock body scroll while the mobile overlay is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-spring',
          scrolled
            ? 'border-b border-line bg-void/70 shadow-glass backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label="Primary"
          className="container flex h-[var(--header-height)] items-center justify-between gap-6"
        >
          <Link
            href="#hero"
            className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
            aria-label={`${SITE.name} — back to top`}
          >
            <span className="relative grid size-9 place-items-center rounded-full border border-line bg-white/[0.04] font-display text-[13px] tracking-[-0.02em] text-silver-bright transition-colors duration-300 ease-spring group-hover:border-electric/40">
              {SITE.initials}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border border-electric/40 opacity-0 transition-opacity duration-300 ease-spring group-hover:opacity-100"
              />
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-silver-bright sm:block">
              {SITE.shortName}
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-[13px] tracking-tight transition-colors duration-300 ease-spring',
                      'hover:text-silver-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric',
                      isActive ? 'text-silver-bright' : 'text-silver-muted',
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-flex">
              <Button asChild size="sm" variant="secondary">
                <a href={SITE.resumePath} download={SITE.resumeFileName}>
                  <ArrowDownToLine aria-hidden />
                  Resume
                </a>
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cn(
                'grid size-10 place-items-center rounded-full border border-line bg-white/[0.04] text-silver-bright lg:hidden',
                'transition-[transform,border-color] duration-300 ease-spring active:scale-95 hover:border-line-strong',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric',
              )}
            >
              {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SPRING }}
            className="noise fixed inset-0 z-40 flex flex-col bg-void/95 pt-[var(--header-height)] backdrop-blur-2xl lg:hidden"
          >
            <div className="aurora pointer-events-none absolute inset-0 opacity-60" />
            <ul className="container relative flex flex-1 flex-col justify-center gap-1">
              {NAV_ITEMS.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.5, ease: EASE_SPRING }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-line py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                  >
                    <span className="font-mono text-[11px] tracking-[0.2em] text-electric-400">
                      {item.index}
                    </span>
                    <span className="font-display text-2xl tracking-[-0.03em] text-silver-bright transition-transform duration-300 ease-spring group-hover:translate-x-1">
                      {item.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="container relative pb-10">
              <Button asChild size="lg" className="w-full">
                <a href={SITE.resumePath} download={SITE.resumeFileName}>
                  <ArrowDownToLine aria-hidden />
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
