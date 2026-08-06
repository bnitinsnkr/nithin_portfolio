import { SITE } from '@/constants/site';

/** Route-level suspense boundary. Matches the preloader so the two never clash. */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="noise fixed inset-0 z-[90] flex flex-col items-center justify-center bg-void"
    >
      <div aria-hidden className="aurora pointer-events-none absolute inset-0 opacity-70" />
      <span className="font-display text-2xl tracking-[-0.04em] text-silver-bright">
        {SITE.initials}
      </span>
      <div className="relative mt-7 h-px w-56 overflow-hidden bg-white/10">
        <span className="animate-sheen absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-electric to-transparent" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
