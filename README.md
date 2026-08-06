# Nithin Sankar Bahunadam — Portfolio

A production-ready 3D portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS,
Framer Motion and React Three Fiber. Dark, minimal, and optimised for Vercel.

---

## Quick start

Requires **Node.js 20.11+**.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

| Script              | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Development server                       |
| `npm run build`     | Production build                         |
| `npm run start`     | Serve the production build               |
| `npm run lint`      | ESLint (`next/core-web-vitals`)          |
| `npm run typecheck` | `tsc --noEmit`                           |

---

## Environment

Copy `.env.example` to `.env.local` and fill in what you need. Everything is optional
for local development.

| Variable               | Required | Purpose                                                       |
| ---------------------- | -------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | For prod | Canonical origin for metadata, sitemap, robots and OG images.  |
| `RESEND_API_KEY`       | No       | Enables real delivery from `/api/contact`.                     |
| `CONTACT_TO_EMAIL`     | No       | Inbox that receives submissions. Defaults to the resume email. |
| `CONTACT_FROM_EMAIL`   | No       | Verified sender address on your Resend domain.                 |

Without `RESEND_API_KEY` the contact route still validates, rate-limits and accepts
submissions — it logs them server-side instead of dropping them silently. Wire the key
in Vercel's project settings to switch on delivery.

---

## Project structure

```
src/
├── app/                     App Router: layout, page, error/404, API, SEO files
│   ├── api/contact/         Contact form endpoint (validation + rate limit + Resend)
│   ├── apple-icon.tsx       Generated apple touch icon
│   ├── opengraph-image.tsx  Generated 1200×630 social card
│   ├── robots.ts            robots.txt
│   └── sitemap.ts           sitemap.xml
├── components/
│   ├── layout/              Navbar, footer, preloader, cursor, smooth scroll, progress
│   ├── sections/            Hero, About, Journey, Skills, GenAI, Projects, …
│   ├── shared/              Reveal, TextReveal, Magnetic, Marquee, SpotlightCard, …
│   └── ui/                  shadcn-style primitives (button, card, dialog, …)
├── constants/               All copy and data — the single content layer
├── hooks/                   Media queries, pointer, active section, count-up
├── lib/                     cn(), motion presets, SEO builders, contact schema
├── styles/globals.css       Design tokens, glass system, utilities
├── three/                   R3F scene: neural net, particles, glass, rig, effects
└── types/                   Shared TypeScript contracts
```

---

## Editing content

**All copy lives in `src/constants/`.** No section component hardcodes text, so updating
the site never means touching layout code.

| File                | Controls                                                 |
| ------------------- | -------------------------------------------------------- |
| `site.ts`           | Name, contact details, socials, nav, rotating hero roles  |
| `about.ts`          | About narrative and principles                            |
| `experience.ts`     | Career timeline (work + education)                        |
| `skills.ts`         | Ten skill categories and levels                           |
| `genai.ts`          | RAG lifecycle stages and capability groups                |
| `projects.ts`       | Project case studies, metrics and links                   |
| `architecture.ts`   | Animated system diagrams (node/edge lattice)              |
| `certifications.ts` | Certifications and vendor styling                         |
| `stats.ts`          | Headline statistics and the impact ticker                 |

### Things worth swapping before you ship

1. **Project repository links.** `projects.ts` currently points every `links.github`
   at the GitHub profile. Replace with per-repo URLs, and add `links.demo` where a
   live deployment exists.
2. **Images.** Every image is a `placehold.co` placeholder — the portrait in
   `about.tsx` and each project cover in `projects.ts`. Drop real assets into
   `public/` and reference them locally; the `remotePatterns` entry for
   `placehold.co` in `next.config.ts` can then be removed.
3. **Novus Hi-Tech Robotics dates.** That entry uses `period: 'Before 2018'` because
   the source documents don't record the exact range. Set the real dates in
   `experience.ts`.
4. **Resume PDF.** `public/resume/` holds the GenAI resume. Replace the file and update
   `SITE.resumePath` if you swap in a different version.
5. **Twitter handle.** `lib/seo.ts` guesses `@bnithinsnkr`. Correct or remove it.

---

## Architecture notes

**Content is data, not markup.** Sections read from `constants/`, and the JSON-LD in
`lib/seo.ts` is generated from those same arrays — structured data can't drift from
what a visitor actually sees.

**The 3D scene is defensive by construction.** `three/config.ts` defines three quality
tiers; the scene picks one from viewport class rather than probing the GPU, then keeps
particle counts, geometry and postprocessing inside that budget. Bloom is dropped
entirely on the low tier. The canvas pauses (`frameloop="never"`) when the tab is
hidden, and reduced-motion visitors get a static gradient instead of a canvas.

**Pointer input never re-renders React.** The camera rig reads the cursor from a ref
inside `useFrame`; the spotlight cards write straight to CSS custom properties.

**Performance.** Hero and About ship in the first chunk; every section below them is
dynamically imported but still server-rendered, so crawlers and no-JS visitors get the
complete document. The R3F canvas is `ssr: false` and mounted ~120ms after paint so it
never competes with LCP. Fonts are self-hosted through `next/font`.

**Accessibility.** Semantic landmarks, a skip link, labelled sections, `role="meter"` on
skill bars, `aria-expanded`/`aria-controls` on every disclosure, real tab semantics on
the architecture switcher, visible focus rings, and count-up numbers that announce their
final value immediately while the animation stays `aria-hidden`. Every decorative
animation is disabled under `prefers-reduced-motion`.

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it in Vercel — the framework preset is detected automatically.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain, plus the Resend variables if
   you want live contact delivery.
4. Deploy. `@vercel/analytics` and `@vercel/speed-insights` activate on their own.

No additional restructuring is required.
