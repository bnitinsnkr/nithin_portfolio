import type { IconType } from 'react-icons';

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                  */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  label: string;
  href: `#${string}` | `/${string}`;
  /** Two-digit index rendered beside the label in the nav overlay. */
  index: string;
}

/* -------------------------------------------------------------------------- */
/*                              Career / timeline                              */
/* -------------------------------------------------------------------------- */

export type TimelineKind = 'work' | 'education';

export interface Metric {
  /** Numeric portion, e.g. `91`. Used to drive the count-up animation. */
  value: number;
  /** Rendered before the number, e.g. `~` or `$`. */
  prefix?: string;
  /** Rendered after the number, e.g. `%`, `M+`, `K+`. */
  suffix?: string;
  label: string;
}

export interface ExperienceEntry {
  id: string;
  kind: TimelineKind;
  company: string;
  role: string;
  location: string;
  period: string;
  /** ISO-ish start date used purely for ordering and schema.org output. */
  start: string;
  end: string | null;
  /** One-line framing of what the role was really about. */
  headline: string;
  summary: string[];
  highlights: string[];
  metrics: Metric[];
  stack: string[];
  /** Accent hue rotation so consecutive cards do not read identically. */
  accent: 'coral' | 'cyan' | 'silver';
}

/* -------------------------------------------------------------------------- */
/*                                   Skills                                    */
/* -------------------------------------------------------------------------- */

export interface Skill {
  name: string;
  /** 0–100 self-assessed depth; drives the progress indicator. */
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  caption: string;
  icon: IconType;
  skills: Skill[];
}

/* -------------------------------------------------------------------------- */
/*                              Generative AI band                             */
/* -------------------------------------------------------------------------- */

export interface WorkflowStage {
  id: string;
  step: string;
  title: string;
  description: string;
  tools: string[];
}

export interface Capability {
  name: string;
  group: 'orchestration' | 'retrieval' | 'models' | 'quality' | 'serving';
}

/* -------------------------------------------------------------------------- */
/*                                  Projects                                   */
/* -------------------------------------------------------------------------- */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Generative AI' | 'Machine Learning' | 'Full Stack' | 'Data & Agents' | 'Hardware';
  year: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string[];
  stack: string[];
  metrics: Metric[];
  image: string;
  links: {
    github?: string;
    demo?: string;
  };
  /** Featured cards get the wide grid slot. */
  featured?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                             Architecture showcase                           */
/* -------------------------------------------------------------------------- */

export interface ArchitectureNode {
  id: string;
  label: string;
  sub?: string;
  /** Grid column (1-indexed) inside the diagram lane. */
  column: number;
  row: number;
  tone: 'entry' | 'compute' | 'data' | 'model' | 'ops';
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
  /** Dashed edges represent asynchronous / event-driven hops. */
  async?: boolean;
}

export interface ArchitectureDiagram {
  id: string;
  title: string;
  caption: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  notes: string[];
}

/* -------------------------------------------------------------------------- */
/*                                Certifications                               */
/* -------------------------------------------------------------------------- */

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  vendor: 'aws' | 'azure' | 'oracle' | 'google';
  level: string;
}

/* -------------------------------------------------------------------------- */
/*                                    Stats                                    */
/* -------------------------------------------------------------------------- */

export interface Stat extends Metric {
  caption: string;
}
