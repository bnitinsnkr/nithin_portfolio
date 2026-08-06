import {
  HiChartBarSquare,
  HiCircleStack,
  HiCloud,
  HiCodeBracket,
  HiCog6Tooth,
  HiCpuChip,
  HiServerStack,
  HiSparkles,
  HiSquares2X2,
  HiWindow,
} from 'react-icons/hi2';

import type { SkillCategory } from '@/types';

/**
 * Skill matrix. `level` is a self-assessed depth indicator used only to drive
 * the progress bar — it is deliberately conservative and never presented as a
 * certification or benchmark score.
 */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'generative-ai',
    title: 'Generative AI',
    caption: 'Grounded, evaluated, production-facing LLM systems',
    icon: HiSparkles,
    skills: [
      { name: 'Retrieval-Augmented Generation', level: 95 },
      { name: 'LangChain', level: 92 },
      { name: 'Prompt & Context Engineering', level: 93 },
      { name: 'Structured Outputs & Tool Calling', level: 90 },
      { name: 'LLM Evaluation Workflows', level: 88 },
      { name: 'Guardrails & PII Validation', level: 88 },
      { name: 'Multi-Agent Orchestration', level: 82 },
      { name: 'LangGraph / LlamaIndex', level: 80 },
    ],
  },
  {
    id: 'ai',
    title: 'AI Platforms & Retrieval',
    caption: 'Models, embeddings and vector search',
    icon: HiCpuChip,
    skills: [
      { name: 'OpenAI API / GPT-4', level: 93 },
      { name: 'Pinecone', level: 92 },
      { name: 'FAISS', level: 90 },
      { name: 'Embeddings & Semantic Search', level: 92 },
      { name: 'Vertex AI', level: 85 },
      { name: 'Azure OpenAI / AWS Bedrock', level: 82 },
      { name: 'Claude & Gemini APIs', level: 82 },
      { name: 'Chroma / Weaviate / Qdrant', level: 78 },
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning & NLP',
    caption: 'From feature pipelines to explainable predictions',
    icon: HiChartBarSquare,
    skills: [
      { name: 'BERT', level: 88 },
      { name: 'SpaCy', level: 88 },
      { name: 'scikit-learn', level: 90 },
      { name: 'XGBoost / LightGBM', level: 88 },
      { name: 'Named-Entity Recognition', level: 88 },
      { name: 'Anomaly Detection', level: 86 },
      { name: 'Feature Engineering', level: 88 },
      { name: 'SHAP / LIME', level: 82 },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    caption: 'Languages used daily in production',
    icon: HiCodeBracket,
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Java 17', level: 93 },
      { name: 'SQL', level: 90 },
      { name: 'TypeScript', level: 86 },
      { name: 'JavaScript', level: 86 },
      { name: 'PL/SQL', level: 82 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Integration',
    caption: 'Secure enterprise services and API contracts',
    icon: HiServerStack,
    skills: [
      { name: 'Spring Boot', level: 93 },
      { name: 'FastAPI', level: 94 },
      { name: 'Microservices', level: 91 },
      { name: 'REST API Design', level: 93 },
      { name: 'Apache Kafka', level: 85 },
      { name: 'RabbitMQ', level: 82 },
      { name: 'OAuth2 / JWT / RBAC', level: 89 },
      { name: 'GraphQL', level: 74 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    caption: 'Interfaces on top of enterprise and AI services',
    icon: HiWindow,
    skills: [
      { name: 'React', level: 88 },
      { name: 'TypeScript', level: 86 },
      { name: 'Angular', level: 80 },
      { name: 'Redux', level: 80 },
      { name: 'Streamlit', level: 85 },
      { name: 'Tailwind CSS', level: 84 },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    caption: 'Three clouds, certified on two',
    icon: HiCloud,
    skills: [
      { name: 'AWS (S3, Lambda, SageMaker, Bedrock, IAM)', level: 88 },
      { name: 'GCP (Vertex AI, BigQuery, Cloud Functions)', level: 86 },
      { name: 'Azure (AKS, Azure OpenAI)', level: 84 },
      { name: 'Oracle Cloud Infrastructure', level: 74 },
      { name: 'Cloud Monitoring & Alerting', level: 85 },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & MLOps',
    caption: 'Repeatable builds, deployments and experiments',
    icon: HiCog6Tooth,
    skills: [
      { name: 'Docker', level: 91 },
      { name: 'Kubernetes', level: 84 },
      { name: 'Jenkins', level: 88 },
      { name: 'GitHub Actions', level: 84 },
      { name: 'MLflow', level: 85 },
      { name: 'Terraform', level: 76 },
      { name: 'Prometheus / Grafana', level: 78 },
      { name: 'SonarQube', level: 76 },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Data',
    caption: 'Structured, semi-structured and vector stores',
    icon: HiCircleStack,
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'Oracle', level: 85 },
      { name: 'MongoDB', level: 78 },
      { name: 'BigQuery', level: 82 },
      { name: 'Elasticsearch', level: 80 },
      { name: 'Apache Spark / PySpark', level: 86 },
      { name: 'Apache Airflow', level: 87 },
      { name: 'Pandas', level: 92 },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Quality',
    caption: 'The tooling that keeps releases boring',
    icon: HiSquares2X2,
    skills: [
      { name: 'pytest', level: 90 },
      { name: 'JUnit', level: 89 },
      { name: 'Mockito', level: 87 },
      { name: 'Pydantic', level: 90 },
      { name: 'TensorFlow', level: 74 },
      { name: 'Weights & Biases', level: 74 },
      { name: 'Tableau / Power BI', level: 78 },
      { name: 'Git / GitHub / JIRA', level: 93 },
    ],
  },
];

/** Flat, de-duplicated technology list — powers the marquee and the stat count. */
export const ALL_TECHNOLOGIES = Array.from(
  new Set(SKILL_CATEGORIES.flatMap((category) => category.skills.map((skill) => skill.name))),
);
