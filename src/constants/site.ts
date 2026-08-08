import type { NavItem } from '@/types';

export const SITE = {
  name: 'Nithin Sankar Bahunadam',
  shortName: 'Nithin Bahunadam',
  initials: 'NB',
  title: 'Nithin Bahunadam — Generative AI & Full Stack Java Engineer',
  role: 'Generative AI · Applied AI · Machine Learning · Full Stack Java',
  description:
    'Generative AI, Applied AI and Machine Learning Engineer with 6+ years building enterprise RAG systems, NLP pipelines and secure Java/Python backends at American Express, ADP and LTIMindtree.',
  // Trimmed: dashboard-pasted values pick up stray whitespace, and while
  // `new URL()` strips it for metadataBase, sitemap/robots/JSON-LD interpolate
  // this as a raw string and would emit an invalid URL.
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://nithinbahunadam.com',
  locale: 'en_US',
  location: 'Phoenix, Arizona, USA',
  availability: 'Open to Generative AI, Applied AI and Senior Full Stack roles',
  email: 'bnithinsnkr@gmail.com',
  phone: '+1 862-230-1525',
  resumePath: '/resume/Nitin_Bahunadam_GenAI_Resume.pdf',
  resumeFileName: 'Nitin-Bahunadam-GenAI-Resume.pdf',
  socials: {
    linkedin: 'https://linkedin.com/in/bnitinsnkr',
    github: 'https://github.com/bnithinsnkr',
  },
  keywords: [
    'Nithin Bahunadam',
    'Generative AI Engineer',
    'Applied AI Engineer',
    'Machine Learning Engineer',
    'RAG Engineer',
    'LangChain',
    'LLM Engineer',
    'Java Full Stack Engineer',
    'Spring Boot',
    'FastAPI',
    'Vector Databases',
    'Pinecone',
    'American Express',
    'Phoenix Arizona',
  ],
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about', index: '01' },
  { label: 'Journey', href: '#journey', index: '02' },
  { label: 'Skills', href: '#skills', index: '03' },
  { label: 'Generative AI', href: '#generative-ai', index: '04' },
  { label: 'Projects', href: '#projects', index: '05' },
  { label: 'Architecture', href: '#architecture', index: '06' },
  { label: 'Certifications', href: '#certifications', index: '07' },
  { label: 'Contact', href: '#contact', index: '08' },
];

/** Rotating job titles under the hero name. */
export const HERO_ROLES = [
  'Generative AI Engineer',
  'Applied AI Engineer',
  'Machine Learning Engineer',
  'Java Full Stack Engineer',
  'Software Engineer',
] as const;
