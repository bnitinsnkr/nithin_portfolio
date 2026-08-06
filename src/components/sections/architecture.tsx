'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import * as React from 'react';

import { Reveal } from '@/components/shared/reveal';
import { SectionHeading } from '@/components/shared/section-heading';
import { ARCHITECTURES } from '@/constants/architecture';
import { usePrefersReducedMotion } from '@/hooks';
import { EASE_SPRING, fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { ArchitectureDiagram, ArchitectureNode } from '@/types';

/* -------------------------------------------------------------------------- */
/*                              Diagram geometry                              */
/* -------------------------------------------------------------------------- */

const VIEW = { width: 1000, height: 440 };
const NODE = { width: 168, height: 64 };
const COLUMN_X = [100, 300, 500, 700, 900];
const ROW_Y = [56, 160, 264, 368];

const centerOf = (node: ArchitectureNode) => ({
  x: COLUMN_X[node.column - 1] ?? COLUMN_X[0],
  y: ROW_Y[node.row - 1] ?? ROW_Y[0],
});

/** Cubic path between two node boxes, exiting from whichever edge faces the target. */
function edgePath(from: ArchitectureNode, to: ArchitectureNode) {
  const a = centerOf(from);
  const b = centerOf(to);
  const halfW = NODE.width / 2;
  const halfH = NODE.height / 2;

  if (from.column === to.column) {
    const dir = b.y > a.y ? 1 : -1;
    const start = { x: a.x, y: a.y + halfH * dir };
    const end = { x: b.x, y: b.y - halfH * dir };
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }

  const goingRight = to.column > from.column;
  const start = { x: a.x + (goingRight ? halfW : -halfW), y: a.y };
  const end = { x: b.x + (goingRight ? -halfW : halfW), y: b.y };
  const bend = Math.abs(end.x - start.x) * 0.5;

  return `M ${start.x} ${start.y} C ${start.x + (goingRight ? bend : -bend)} ${start.y}, ${
    end.x - (goingRight ? bend : -bend)
  } ${end.y}, ${end.x} ${end.y}`;
}

const TONE_STYLES: Record<ArchitectureNode['tone'], { fill: string; stroke: string; dot: string }> =
  {
    entry: { fill: 'rgba(233,238,246,0.05)', stroke: 'rgba(233,238,246,0.20)', dot: '#c6ceda' },
    compute: { fill: 'rgba(51,165,255,0.09)', stroke: 'rgba(51,165,255,0.36)', dot: '#33a5ff' },
    data: { fill: 'rgba(76,221,240,0.08)', stroke: 'rgba(76,221,240,0.32)', dot: '#4cddf0' },
    model: { fill: 'rgba(51,165,255,0.16)', stroke: 'rgba(51,165,255,0.55)', dot: '#70c1ff' },
    ops: { fill: 'rgba(233,238,246,0.035)', stroke: 'rgba(233,238,246,0.14)', dot: '#78849a' },
  };

/* -------------------------------------------------------------------------- */

export function Architecture() {
  const [activeId, setActiveId] = React.useState(ARCHITECTURES[0].id);
  const active = ARCHITECTURES.find((diagram) => diagram.id === activeId) ?? ARCHITECTURES[0];

  return (
    <section id="architecture" aria-label="Architecture showcase" className="relative py-section">
      <div className="container">
        <SectionHeading
          eyebrow="Architecture"
          title="The shape of the systems behind the résumé bullets."
          description="Three patterns that show up in most of the work: a retrieval pipeline with a security perimeter, an event-driven service mesh, and an ML pipeline that ends in a versioned, monitored endpoint."
        />

        {/* Diagram switcher */}
        <Reveal variants={fadeUp} className="mt-12">
          <div
            role="tablist"
            aria-label="Architecture diagrams"
            className="flex flex-wrap gap-2"
          >
            {ARCHITECTURES.map((diagram) => {
              const isActive = diagram.id === activeId;
              return (
                <button
                  key={diagram.id}
                  type="button"
                  role="tab"
                  id={`arch-tab-${diagram.id}`}
                  aria-selected={isActive}
                  aria-controls={`arch-panel-${diagram.id}`}
                  onClick={() => setActiveId(diagram.id)}
                  className={cn(
                    'relative rounded-full border px-4 py-2 text-[13px] tracking-tight',
                    'transition-[color,border-color,transform] duration-300 ease-spring active:scale-[0.98]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric',
                    isActive
                      ? 'border-electric/50 text-silver-bright'
                      : 'border-line text-silver-muted hover:border-line-strong hover:text-silver',
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="arch-tab"
                      className="absolute inset-0 -z-10 rounded-full bg-electric/10"
                      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    />
                  ) : null}
                  {diagram.title}
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            role="tabpanel"
            id={`arch-panel-${active.id}`}
            aria-labelledby={`arch-tab-${active.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE_SPRING }}
            className="mt-8"
          >
            <div className="glass-floating edge-light overflow-hidden rounded-3xl">
              <div className="border-b border-line px-6 py-5 sm:px-8">
                <h3 className="font-display text-xl tracking-[-0.03em] text-silver-bright">
                  {active.title}
                </h3>
                <p className="mt-1.5 max-w-3xl text-[13px] leading-relaxed text-silver-muted">
                  {active.caption}
                </p>
              </div>

              <DiagramCanvas diagram={active} />

              <ul className="grid gap-3 border-t border-line px-6 py-6 sm:grid-cols-3 sm:px-8">
                {active.notes.map((note) => (
                  <li key={note} className="flex gap-2.5 text-[12px] leading-[1.7] text-silver-muted">
                    <span
                      aria-hidden
                      className="mt-[0.62em] size-1 shrink-0 rounded-full bg-electric/60"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function DiagramCanvas({ diagram }: { diagram: ArchitectureDiagram }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reducedMotion = usePrefersReducedMotion();
  const animate = inView && !reducedMotion;

  const nodeById = React.useMemo(
    () => new Map(diagram.nodes.map((node) => [node.id, node])),
    [diagram.nodes],
  );

  return (
    // Wide diagrams scroll inside their own container — the page body never does.
    <div ref={ref} className="scrollbar-none overflow-x-auto px-6 py-8 sm:px-8">
      <svg
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        role="img"
        aria-label={`${diagram.title} diagram. ${diagram.caption}`}
        className="h-auto w-full min-w-[720px]"
      >
        <defs>
          <linearGradient id={`edge-${diagram.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#33a5ff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#4cddf0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#33a5ff" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Edges first so nodes paint above them. */}
        <g fill="none">
          {diagram.edges.map((edge, index) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);
            if (!from || !to) return null;

            const path = edgePath(from, to);
            const midpoint = {
              x: (centerOf(from).x + centerOf(to).x) / 2,
              y: (centerOf(from).y + centerOf(to).y) / 2,
            };

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <motion.path
                  d={path}
                  stroke="rgba(233,238,246,0.13)"
                  strokeWidth={1.25}
                  strokeDasharray={edge.async ? '4 6' : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.9, ease: EASE_SPRING, delay: 0.1 + index * 0.07 }}
                />
                {/* Flow overlay — the moving dashes that read as traffic. */}
                <path
                  d={path}
                  stroke={`url(#edge-${diagram.id})`}
                  strokeWidth={1.5}
                  strokeDasharray="5 19"
                  className={reducedMotion ? undefined : 'animate-flow-dash'}
                  style={{ animationDelay: `${index * 0.22}s` }}
                />
                {edge.label ? (
                  <text
                    x={midpoint.x}
                    y={midpoint.y - 9}
                    textAnchor="middle"
                    className="fill-silver-dim font-mono"
                    fontSize={10}
                    letterSpacing={1.1}
                  >
                    {edge.label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {diagram.nodes.map((node, index) => {
            const { x, y } = centerOf(node);
            const tone = TONE_STYLES[node.tone];

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, y: 10 }}
                animate={animate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE_SPRING, delay: index * 0.05 }}
              >
                <rect
                  x={x - NODE.width / 2}
                  y={y - NODE.height / 2}
                  width={NODE.width}
                  height={NODE.height}
                  rx={14}
                  fill={tone.fill}
                  stroke={tone.stroke}
                  strokeWidth={1}
                />
                <circle cx={x - NODE.width / 2 + 16} cy={y - NODE.height / 2 + 16} r={2.5} fill={tone.dot} />
                <text
                  x={x}
                  y={node.sub ? y - 1 : y + 4}
                  textAnchor="middle"
                  className="fill-silver-bright"
                  fontSize={13}
                  fontWeight={500}
                  letterSpacing={-0.2}
                >
                  {node.label}
                </text>
                {node.sub ? (
                  <text
                    x={x}
                    y={y + 16}
                    textAnchor="middle"
                    className="fill-silver-dim font-mono"
                    fontSize={9.5}
                    letterSpacing={0.6}
                  >
                    {node.sub}
                  </text>
                ) : null}
              </motion.g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
