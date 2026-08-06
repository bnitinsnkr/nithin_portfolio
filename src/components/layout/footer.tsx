import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import { NAV_ITEMS, SITE } from '@/constants/site';

const SOCIALS = [
  { label: 'LinkedIn', href: SITE.socials.linkedin, icon: FaLinkedinIn },
  { label: 'GitHub', href: SITE.socials.github, icon: FaGithub },
  { label: 'Email', href: `mailto:${SITE.email}`, icon: HiOutlineEnvelope },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent"
      />

      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-[-0.03em] text-gradient">{SITE.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-[1.75] text-silver-muted">
              Building grounded, evaluated AI systems on top of secure enterprise engineering.
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-silver-dim">
              {SITE.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-silver-dim">
              Sections
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 lg:grid-cols-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-silver-muted transition-colors duration-300 ease-spring hover:text-silver-bright"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-silver-dim">
              Elsewhere
            </h2>
            <ul className="mt-5 space-y-2.5">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2.5 text-sm text-silver-muted transition-colors duration-300 ease-spring hover:text-silver-bright"
                  >
                    <Icon aria-hidden className="size-4 text-electric-400" />
                    {label}
                    <ArrowUpRight
                      aria-hidden
                      className="size-3.5 opacity-0 transition-[opacity,transform] duration-300 ease-spring group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={SITE.resumePath}
                  download={SITE.resumeFileName}
                  className="inline-flex items-center gap-2.5 text-sm text-silver-muted transition-colors duration-300 ease-spring hover:text-silver-bright"
                >
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-14" />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-[0.14em] text-silver-dim">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="font-mono text-[11px] tracking-[0.14em] text-silver-dim">
            Next.js · React Three Fiber · Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
