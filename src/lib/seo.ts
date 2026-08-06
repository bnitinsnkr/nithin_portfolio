import type { Metadata } from 'next';

import { CERTIFICATIONS } from '@/constants/certifications';
import { EXPERIENCE } from '@/constants/experience';
import { SITE } from '@/constants/site';
import { ALL_TECHNOLOGIES } from '@/constants/skills';

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.shortName,
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.shortName,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    creator: '@bnithinsnkr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Icons and social images come from the app-directory file conventions
  // (`icon.svg`, `apple-icon.tsx`, `opengraph-image.tsx`) rather than being
  // declared here — declaring them would override those files.
  formatDetection: { telephone: false, email: false, address: false },
};

/**
 * JSON-LD `Person` graph. Employment history and credentials are generated
 * from the same constants the UI renders, so structured data can never drift
 * from what a visitor actually sees.
 */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}#person`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    jobTitle: 'Generative AI & Full Stack Java Engineer',
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Phoenix',
      addressRegion: 'AZ',
      addressCountry: 'US',
    },
    sameAs: [SITE.socials.linkedin, SITE.socials.github],
    knowsAbout: ALL_TECHNOLOGIES.slice(0, 40),
    alumniOf: EXPERIENCE.filter((entry) => entry.kind === 'education').map((entry) => ({
      '@type': 'CollegeOrUniversity',
      name: entry.company,
    })),
    worksFor: {
      '@type': 'Organization',
      name: EXPERIENCE.find((entry) => entry.kind === 'work' && entry.end === null)?.company,
    },
    hasCredential: CERTIFICATIONS.map((certification) => ({
      '@type': 'EducationalOccupationalCredential',
      name: certification.name,
      credentialCategory: certification.level,
      recognizedBy: { '@type': 'Organization', name: certification.issuer },
    })),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    inLanguage: 'en-US',
    publisher: { '@id': `${SITE.url}#person` },
  };
}
