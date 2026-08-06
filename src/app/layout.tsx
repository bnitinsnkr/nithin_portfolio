import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Sora } from 'next/font/google';
import { Toaster } from 'sonner';

import { Cursor } from '@/components/layout/cursor';
import { Preloader } from '@/components/layout/preloader';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import { TooltipProvider } from '@/components/ui/tooltip';
import { baseMetadata, personJsonLd, websiteJsonLd } from '@/lib/seo';
import '@/styles/globals.css';

/* Fonts are self-hosted by next/font — no third-party request, no CLS. */
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: '#05070A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-void font-sans">
        {/* Structured data is generated from local constants, never user input. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />

        {/* First stop for keyboard users, before the nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-electric focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-navy-950"
        >
          Skip to content
        </a>

        <Preloader />
        <ScrollProgress />
        <Cursor />

        <TooltipProvider delayDuration={200}>
          <SmoothScroll>{children}</SmoothScroll>
        </TooltipProvider>

        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast:
                'glass-floating !rounded-2xl !border-line !bg-surface-floating/90 !text-silver-bright',
              description: '!text-silver-muted',
            },
          }}
        />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
