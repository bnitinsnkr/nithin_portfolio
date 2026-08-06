'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import { AnimatedCounter } from '@/components/shared/animated-counter';
import { Reveal, RevealGroup } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { PROJECT_CATEGORIES, PROJECTS } from '@/constants/projects';
import { EASE_SPRING, fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

export function Projects() {
  const [filter, setFilter] = React.useState<(typeof PROJECT_CATEGORIES)[number]>('All');
  const [selected, setSelected] = React.useState<Project | null>(null);

  const visible = React.useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" aria-label="Featured projects" className="relative py-section">
      <div className="container">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Systems, not demos."
          description="Retrieval pipelines, agent workflows, ML services and the hardware work that started it. Open any card for the problem, the architecture and the numbers behind it."
          aside={
            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={filter === category}
                  className={cn(
                    'relative rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]',
                    'transition-[color,border-color,transform] duration-300 ease-spring active:scale-[0.97]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric',
                    filter === category
                      ? 'border-electric/50 text-electric-200'
                      : 'border-line text-silver-dim hover:border-line-strong hover:text-silver',
                  )}
                >
                  {filter === category ? (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-electric/10"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  ) : null}
                  {category}
                </button>
              ))}
            </div>
          }
        />

        <RevealGroup step={0.06} className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
          ))}
        </RevealGroup>
      </div>

      <ProjectDialog project={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <Reveal variants={fadeUp} className={cn('h-full', project.featured && 'xl:col-span-1')}>
      <motion.article
        layout
        className={cn(
          'glass-raised edge-light group relative flex h-full flex-col overflow-hidden rounded-3xl',
          'transition-[transform,border-color,box-shadow] duration-500 ease-spring',
          'hover:-translate-y-1.5 hover:border-line-strong hover:shadow-floating',
        )}
      >
        {/* Cover */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.04]"
          />
          <div aria-hidden className="absolute inset-0 bg-electric/20 mix-blend-multiply" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/20 to-transparent"
          />
          <div className="absolute left-5 top-5 flex gap-2">
            <Badge variant="accent">{project.category}</Badge>
          </div>
          <span className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.18em] text-silver-dim">
            {project.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-xl tracking-[-0.03em] text-silver-bright">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-electric-300">{project.tagline}</p>
          <p className="mt-4 line-clamp-3 text-[13px] leading-[1.75] text-silver-muted">
            {project.problem}
          </p>

          {project.metrics.length > 0 ? (
            <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="font-display text-lg tracking-[-0.03em] text-gradient-accent">
                      <AnimatedCounter
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                      />
                    </span>
                    <span className="ml-1.5 text-[11px] text-silver-dim">{metric.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.09em] text-silver-dim"
              >
                {tech}
              </li>
            ))}
            {project.stack.length > 5 ? (
              <li className="rounded-md px-2 py-1 font-mono text-[10px] tracking-[0.09em] text-silver-dim">
                +{project.stack.length - 5}
              </li>
            ) : null}
          </ul>

          <div className="mt-auto flex items-center gap-2 pt-6">
            <Button size="sm" variant="secondary" onClick={onOpen}>
              Case study
              <ArrowUpRight aria-hidden />
            </Button>

            {project.links.github ? (
              <Button asChild size="sm" variant="ghost" aria-label={`${project.title} on GitHub`}>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden />
                  GitHub
                </a>
              </Button>
            ) : null}

            {project.links.demo ? (
              <Button asChild size="sm" variant="ghost" aria-label={`${project.title} live demo`}>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink aria-hidden />
                  Demo
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */

function ProjectDialog({
  project,
  onOpenChange,
}: {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={Boolean(project)} onOpenChange={onOpenChange}>
      <DialogContent>
        {project ? (
          <div>
            <div className="relative aspect-[21/9] overflow-hidden">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-electric/20 mix-blend-multiply" />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-surface-floating to-transparent"
              />
            </div>

            <div className="p-7 sm:p-9">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{project.category}</Badge>
                <Badge variant="outline">{project.year}</Badge>
              </div>

              <DialogTitle className="mt-4">{project.title}</DialogTitle>
              <DialogDescription className="mt-1.5 text-electric-300">
                {project.tagline}
              </DialogDescription>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_SPRING, delay: 0.08 }}
                className="mt-8 grid gap-8 md:grid-cols-2"
              >
                <Block title="Problem">
                  <p className="text-[13px] leading-[1.8] text-silver-muted">{project.problem}</p>
                </Block>
                <Block title="Solution">
                  <p className="text-[13px] leading-[1.8] text-silver-muted">{project.solution}</p>
                </Block>

                <Block title="Architecture">
                  <ol className="space-y-2.5">
                    {project.architecture.map((step, index) => (
                      <li
                        key={step}
                        className="flex gap-3 text-[13px] leading-[1.7] text-silver-muted"
                      >
                        <span className="font-mono text-[10px] leading-[1.9] text-electric-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </Block>

                <Block title="Features">
                  <ul className="space-y-2.5">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-2.5 text-[13px] leading-[1.7] text-silver-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.6em] size-1 shrink-0 rounded-full bg-electric/60"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
              </motion.div>

              {project.metrics.length > 0 ? (
                <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-[11px] leading-snug text-silver-dim">{metric.label}</dt>
                      <dd className="mt-1 font-display text-2xl tracking-[-0.03em] text-gradient-accent">
                        <AnimatedCounter
                          value={metric.value}
                          prefix={metric.prefix}
                          suffix={metric.suffix}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <div className="mt-8 border-t border-line pt-6">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver-dim">
                  Tech stack
                </h4>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </div>

              {project.links.github || project.links.demo ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.links.github ? (
                    <Button asChild variant="secondary">
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github aria-hidden />
                        View on GitHub
                      </a>
                    </Button>
                  ) : null}
                  {project.links.demo ? (
                    <Button asChild>
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink aria-hidden />
                        Live demo
                      </a>
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver-dim">{title}</h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}
