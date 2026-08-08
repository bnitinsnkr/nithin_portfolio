'use client';

import { RotateCcw } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Surface the digest in the browser console so a production report can be
    // matched back to the server-side log entry.
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <main className="noise relative flex min-h-[100svh] items-center justify-center px-6">
      <div aria-hidden className="glow-wash pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="grid-lines mask-radial pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative max-w-lg text-center">
        <p className="eyebrow justify-center">
          <span aria-hidden className="size-1 rounded-full bg-coral" />
          Error
        </p>

        <h1 className="mt-6 text-display-sm text-gradient">Something broke on our side.</h1>

        <p className="mt-5 text-[15px] leading-[1.75] text-ink-500">
          An unexpected error interrupted this page. Retrying usually resolves it — if it doesn’t,
          the homepage is a safe landing spot.
        </p>

        {error.digest ? (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} size="lg">
            <RotateCcw aria-hidden />
            Try again
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/">Back to homepage</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
