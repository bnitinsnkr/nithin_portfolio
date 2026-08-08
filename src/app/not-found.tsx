import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="noise relative flex min-h-[100svh] items-center justify-center px-6">
      <div aria-hidden className="glow-wash pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="grid-lines mask-radial pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="relative max-w-xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-coral-600">
          404 — Not found
        </p>

        <h1 className="mt-6 text-display-md text-gradient">
          That route returned nothing grounded.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.75] text-ink-500">
          The page you asked for doesn’t exist. Rather than guess, here are the sections that do.
        </p>

        <nav aria-label="Site sections" className="mt-9">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  className="inline-flex rounded-full border border-line bg-ink-50 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 transition-[color,border-color,transform] duration-300 ease-spring hover:-translate-y-0.5 hover:border-coral/35 hover:text-coral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-9">
          <Button asChild size="lg">
            <Link href="/">Back to homepage</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
