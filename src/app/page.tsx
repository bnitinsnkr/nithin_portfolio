import dynamic from 'next/dynamic';

import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { About } from '@/components/sections/about';
import { Hero } from '@/components/sections/hero';

/**
 * Everything below the fold is code-split.
 *
 * Hero and About ship in the initial chunk because they are what the first
 * ten seconds are judged on; the rest streams in as the visitor scrolls.
 * These stay server-rendered (no `ssr: false`) so crawlers and no-JS visitors
 * still get the full document.
 */
const Journey = dynamic(() =>
  import('@/components/sections/journey').then((mod) => mod.Journey),
);
const Skills = dynamic(() => import('@/components/sections/skills').then((mod) => mod.Skills));
const GenerativeAI = dynamic(() =>
  import('@/components/sections/generative-ai').then((mod) => mod.GenerativeAI),
);
const Projects = dynamic(() =>
  import('@/components/sections/projects').then((mod) => mod.Projects),
);
const Architecture = dynamic(() =>
  import('@/components/sections/architecture').then((mod) => mod.Architecture),
);
const Certifications = dynamic(() =>
  import('@/components/sections/certifications').then((mod) => mod.Certifications),
);
const Contact = dynamic(() => import('@/components/sections/contact').then((mod) => mod.Contact));

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <GenerativeAI />
        <Projects />
        <Architecture />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
