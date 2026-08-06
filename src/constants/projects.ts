import { SITE } from '@/constants/site';
import type { Project } from '@/types';

const placeholder = (label: string) =>
  `https://placehold.co/1280x800/0B0F14/33A5FF/png?text=${encodeURIComponent(label)}`;

/**
 * Featured work.
 *
 * Projects carrying metrics are the ones documented in the resume / career
 * story — those numbers are quoted verbatim. Projects without metrics are
 * described by scope only; no outcomes are asserted that the source documents
 * do not support.
 *
 * `links.github` currently points at the profile. Swap in per-repository URLs
 * once the repositories are public.
 */
export const PROJECTS: Project[] = [
  {
    id: 'documentation-rag-assistant',
    title: 'Documentation RAG Assistant',
    tagline: 'Source-referenced answers over a living documentation corpus',
    category: 'Generative AI',
    year: '2025',
    featured: true,
    problem:
      'Technical documentation grows faster than anyone can read it. Keyword search returns pages, not answers, and revision history makes it easy to trust a paragraph that a newer version already replaced.',
    solution:
      'A document-ingestion and retrieval application that processes PDFs and office documents, applies recursive and semantic chunking, enriches chunks with version-aware metadata, generates embeddings, indexes them for semantic retrieval, and returns answers with the exact sources behind them.',
    features: [
      'Recursive and semantic chunking tuned per document type',
      'Version-aware metadata to distinguish document revisions',
      'FastAPI endpoints for ingestion, retrieval, generation, feedback and source inspection',
      'Diagnostics for weak retrieval, missing context and incomplete source coverage',
      'Feedback capture so reviewers can flag wrong or unsupported answers',
    ],
    architecture: [
      'Ingestion worker → text extraction → normalization → chunker',
      'Embedding service → vector index with metadata filters',
      'Query pipeline → retrieval → prompt assembly → LLM → validation',
      'Citation resolver → structured API response → feedback store',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'GPT-4', 'Pinecone', 'Embeddings', 'PostgreSQL'],
    metrics: [
      { value: 50, suffix: 'K+', label: 'Document chunks indexed' },
      { value: 90, suffix: '%+', label: 'Retrieval precision' },
      { value: 2, prefix: '<', suffix: 's', label: 'Average response time' },
    ],
    image: placeholder('Documentation RAG Assistant'),
    links: { github: SITE.socials.github },
  },
  {
    id: 'rag-insighthub',
    title: 'RAG InsightHub',
    tagline: 'Grounded knowledge assistant with an upload-to-answer loop',
    category: 'Generative AI',
    year: '2025',
    featured: true,
    problem:
      'Teams sit on document stores nobody can question in plain language, and answer quality is impossible to audit once an LLM is in the loop.',
    solution:
      'A retrieval-based knowledge assistant that ingests documents from object storage, generates embeddings, stores vectors, and returns grounded answers with citations — wrapped in a React interface where the source review and feedback loop is a first-class part of the product, not an afterthought.',
    features: [
      'Document upload and ingestion from object storage',
      'Natural-language question answering with semantic retrieval',
      'Response validation before an answer is ever rendered',
      'Source review panel next to every generated answer',
      'Structured feedback collection to drive retrieval tuning',
    ],
    architecture: [
      'Object storage → ingestion pipeline → embedding generation',
      'Vector store → semantic retrieval → grounded prompt',
      'FastAPI backend → validation → citation assembly',
      'React client → answer + sources + feedback capture',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'Vector DB', 'Embeddings', 'React', 'TypeScript'],
    metrics: [],
    image: placeholder('RAG InsightHub'),
    links: { github: SITE.socials.github },
  },
  {
    id: 'text-to-sql-assistant',
    title: 'Text-to-SQL Assistant',
    tagline: 'Schema-aware agentic workflow from question to validated query',
    category: 'Data & Agents',
    year: '2024',
    featured: true,
    problem:
      'Analysts wait on engineers for one-off reports, and letting a model write SQL directly against a warehouse is a correctness and safety problem before it is a productivity win.',
    solution:
      'An agentic natural-language-to-SQL workflow using schema-aware prompting, generation, validation, execution controls, error correction and retry logic — with a Streamlit surface where the generated query is reviewed before it runs.',
    features: [
      'Schema-aware prompting grounded in the live table catalogue',
      'Validation checks that block unsafe, malformed or unsupported queries',
      'Automatic error correction with bounded retry logic',
      'Generated-query review step before execution',
      'Documented failure patterns: schema misunderstanding, ambiguous questions, incorrect joins',
    ],
    architecture: [
      'Question → schema retrieval → prompt construction',
      'SQL generation → static validation → execution guardrails',
      'Execution → error capture → correction loop → retry',
      'Streamlit UI → query review → results → feedback-driven refinement',
    ],
    stack: ['Python', 'LLM Agents', 'SQL', 'Streamlit', 'Prompt Engineering', 'PostgreSQL'],
    metrics: [
      { value: 92, suffix: '%', label: 'SQL execution success rate' },
      { value: 60, suffix: '%', label: 'Reduction in manual reporting effort' },
    ],
    image: placeholder('Text-to-SQL Assistant'),
    links: { github: SITE.socials.github },
  },
  {
    id: 'market-monitoring-agent',
    title: 'Market Monitoring Agent',
    tagline: 'Multi-agent workflow for anomaly review and signal explanation',
    category: 'Data & Agents',
    year: '2024',
    problem:
      'Automated market signals are easy to produce and hard to trust. An alert without an explanation is an alert nobody acts on.',
    solution:
      'A prototype multi-agent workflow that separates market-data ingestion, anomaly review, signal explanation and risk checks over simulated or publicly available data — deliberately built for transparent analysis and risk review rather than automated trading execution.',
    features: [
      'Clearly separated agent responsibilities per stage',
      'Defined inter-agent communication contracts',
      'Workflow traceability across the full analysis chain',
      'Explicit error-handling paths per agent',
      'Human-readable alert explanations rather than bare signals',
    ],
    architecture: [
      'Ingestion agent → normalized market snapshot',
      'Anomaly agent → candidate events with confidence',
      'Explanation agent → natural-language rationale',
      'Risk agent → checks and escalation → traced alert',
    ],
    stack: ['Python', 'Multi-Agent Orchestration', 'LLMs', 'Pandas', 'FastAPI'],
    metrics: [],
    image: placeholder('Market Monitoring Agent'),
    links: { github: SITE.socials.github },
  },
  {
    id: 'financial-risk-fraud-detection',
    title: 'Financial Risk & Fraud Detection',
    tagline: 'Transaction-pattern analysis with analyst-facing evidence',
    category: 'Machine Learning',
    year: '2024',
    featured: true,
    problem:
      'Fraud models that optimise recall alone drown analysts in false positives, and a score with no supporting evidence cannot be actioned or defended.',
    solution:
      'A machine-learning prototype for transaction-pattern analysis and anomaly identification on sample and publicly available datasets, including data cleaning, feature engineering, candidate-model comparison and threshold analysis — plus document-processing components that extract structured fields from sample financial forms.',
    features: [
      'Feature engineering across transaction and account behaviour',
      'Candidate-model comparison and threshold analysis',
      'Explicit false-positive / false-negative trade-off review',
      'Structured field extraction from sample financial forms',
      'Analyst-facing presentation of scores with supporting evidence',
    ],
    architecture: [
      'Raw transactions → cleaning → feature pipeline',
      'Model training → comparison → threshold selection',
      'Scoring service → evidence assembly',
      'Analyst interface → review → disposition',
    ],
    stack: ['Python', 'scikit-learn', 'XGBoost', 'LightGBM', 'Pandas', 'SHAP'],
    metrics: [
      { value: 94, suffix: '%', label: 'Fraud detection precision' },
      { value: 20, suffix: '%', label: 'Reduction in false positives' },
    ],
    image: placeholder('Financial Risk %26 Fraud Detection'),
    links: { github: SITE.socials.github },
  },
  {
    id: 'loan-risk-prediction',
    title: 'Loan Risk Prediction',
    tagline: 'Interpretable credit-risk scoring on tabular data',
    category: 'Machine Learning',
    year: '2024',
    problem:
      'Credit decisions need more than an accurate score — they need a reason. A model that cannot explain a rejection is a model that cannot be deployed.',
    solution:
      'A gradient-boosted classification pipeline over applicant and loan-performance features, built with the same discipline as the production ML work: reproducible feature engineering, held-out validation, threshold analysis tied to business cost, and SHAP attribution so every prediction carries its drivers.',
    features: [
      'Reproducible feature-engineering pipeline over tabular applicant data',
      'Train / validation splits with hyperparameter experimentation',
      'Threshold analysis framed around approval-cost trade-offs',
      'SHAP attribution surfaced per prediction',
      'Documented model limitations and cases requiring human judgement',
    ],
    architecture: [
      'Applicant + loan data → cleaning → feature store',
      'Model training → comparison → calibration',
      'Threshold policy → scoring endpoint',
      'Explanation layer → reviewer-facing output',
    ],
    stack: ['Python', 'scikit-learn', 'XGBoost', 'LightGBM', 'Pandas', 'SHAP', 'MLflow'],
    metrics: [],
    image: placeholder('Loan Risk Prediction'),
    links: { github: SITE.socials.github },
  },
  {
    id: 'tailorresume-ai',
    title: 'TailorResume AI',
    tagline: 'Resume optimizer that rewrites against the actual job description',
    category: 'Generative AI',
    year: '2025',
    problem:
      'Generic resumes lose to keyword filters, and manually retargeting one for every application is slow, repetitive and easy to get subtly wrong.',
    solution:
      'An LLM application that parses a resume and a target job description, extracts the requirements and skill gaps between them, and produces grounded rewrite suggestions — every suggestion traced back to a line that already exists in the resume rather than invented from scratch.',
    features: [
      'Resume and job-description parsing into structured fields',
      'Requirement-to-experience gap analysis',
      'Grounded rewrite suggestions anchored to existing content',
      'Keyword and coverage scoring against the target role',
      'Export of the tailored document',
    ],
    architecture: [
      'Upload → document parsing → structured extraction',
      'JD parsing → requirement extraction → gap matrix',
      'Prompt assembly with grounding constraints → LLM',
      'Validation → suggestion diff → export',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'Structured Outputs', 'React'],
    metrics: [],
    image: placeholder('TailorResume AI'),
    links: { github: SITE.socials.github },
  },
  {
    id: 'ai-interview-assistant',
    title: 'AI Interview Assistant',
    tagline: 'Practice loop with role-aware questions and structured feedback',
    category: 'Generative AI',
    year: '2025',
    problem:
      'Interview preparation is mostly unguided. Generic question lists ignore the candidate’s actual background, and self-assessment gives no reliable signal on where an answer fell short.',
    solution:
      'A conversational assistant that generates role-aware questions from a target job description and a candidate profile, then evaluates answers against a structured rubric — returning specific, rubric-anchored feedback instead of a vague score.',
    features: [
      'Role- and level-aware question generation',
      'Multi-turn conversational session state',
      'Rubric-based answer evaluation with structured outputs',
      'Follow-up probing on shallow or incomplete answers',
      'Session history and progress review',
    ],
    architecture: [
      'Profile + JD → context assembly → question planner',
      'Session state store → multi-turn orchestration',
      'Answer → rubric evaluation → structured feedback',
      'History persistence → progress view',
    ],
    stack: ['Python', 'FastAPI', 'LangChain', 'LLMs', 'Structured Outputs', 'React', 'PostgreSQL'],
    metrics: [],
    image: placeholder('AI Interview Assistant'),
    links: { github: SITE.socials.github },
  },
  {
    id: 'embedded-robotics',
    title: 'Embedded & Robotics Systems',
    tagline: 'Where the debugging instinct was trained — on hardware',
    category: 'Hardware',
    year: 'Pre-2018',
    problem:
      'Hardware gives no stack trace. A circuit that behaves differently at 40°C than on the bench teaches a kind of debugging that software rarely forces you to learn.',
    solution:
      'Embedded systems, PCB design and robotics work across Arduino and Raspberry Pi platforms — including power electronics and LED driver design, EMI/EMC considerations, reverse engineering of existing assemblies, and RC aircraft and vehicle builds.',
    features: [
      'Microcontroller firmware on Arduino and Raspberry Pi',
      'PCB design and power-electronics work',
      'LED driver design',
      'EMI/EMC-aware layout and hardware debugging',
      'Reverse engineering of existing hardware assemblies',
      'RC aircraft and RC vehicle build and control',
    ],
    architecture: [
      'Sensor input → microcontroller → control logic',
      'Power stage → driver → actuator',
      'Bench instrumentation → measurement → iteration',
    ],
    stack: ['Arduino', 'Raspberry Pi', 'PCB Design', 'Power Electronics', 'EMI / EMC', 'Robotics'],
    metrics: [],
    image: placeholder('Embedded %26 Robotics Systems'),
    links: {},
  },
];

export const PROJECT_CATEGORIES = [
  'All',
  ...Array.from(new Set(PROJECTS.map((project) => project.category))),
] as const;
