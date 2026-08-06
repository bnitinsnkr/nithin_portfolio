import { CERTIFICATIONS } from '@/constants/certifications';
import { PROJECTS } from '@/constants/projects';
import { ALL_TECHNOLOGIES } from '@/constants/skills';
import type { Stat } from '@/types';

/** Round down to the nearest ten so the headline number stays honest. */
const floorToTen = (value: number) => Math.floor(value / 10) * 10;

export const STATS: Stat[] = [
  {
    value: 6,
    suffix: '+',
    label: 'Years Experience',
    caption: 'Enterprise Java → ML & NLP → Generative AI',
  },
  {
    value: PROJECTS.length,
    label: 'Featured Projects',
    caption: 'RAG systems, agents, ML pipelines and hardware',
  },
  {
    value: floorToTen(ALL_TECHNOLOGIES.length),
    suffix: '+',
    label: 'Technologies',
    caption: 'Across AI, backend, data, cloud and DevOps',
  },
  {
    value: CERTIFICATIONS.length,
    label: 'Certifications',
    caption: 'AWS, Azure, Oracle Cloud and Google',
  },
  {
    value: 2,
    label: 'Countries Worked',
    caption: 'India and the United States',
  },
];

/** Marquee numbers for the About band — all sourced from the career story. */
export const IMPACT_HIGHLIGHTS = [
  '99.9% API availability',
  '2M+ embeddings indexed',
  '10M+ payroll records processed',
  '91% RAG retrieval accuracy',
  '40% fewer hallucinated responses',
  '45% faster ETL execution',
  '100K+ claims processed monthly',
  '85%+ test coverage',
  '25% fewer production incidents',
] as const;
