import { SITE } from '@/constants/site';

/** Route-level suspense boundary. Matches the preloader so the two never clash. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="noise fixed inset-0 z-[90] flex flex-col items-center justify-center bg-paper"
    >
      <div aria-hidden className="glow-wash pointer-events-none absolute inset-0 opacity-70" />
      <span className="font-display text-2xl tracking-[-0.04em] text-ink-900">
        {SITE.initials}
      </span>
      <div className="relative mt-7 h-px w-56 overflow-hidden bg-ink-200">
        <span className="animate-sheen absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-coral to-transparent" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
