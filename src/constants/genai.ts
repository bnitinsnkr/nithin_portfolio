import type { Capability, WorkflowStage } from '@/types';

/**
 * The RAG lifecycle as actually shipped on the Internal Generative AI
 * Knowledge Assistant — ingestion through monitoring. Wording follows the
 * 16-step workflow documented in the career story.
 */
export const RAG_WORKFLOW: WorkflowStage[] = [
  {
    id: 'ingest',
    step: '01',
    title: 'Ingest & Extract',
    description:
      'Pull approved documents — PDFs, Word files, technical guides, policies and operating procedures — then extract text, with OCR for scanned and image-based sources.',
    tools: ['PDF / DOCX parsing', 'OCR', 'Text normalization'],
  },
  {
    id: 'chunk',
    step: '02',
    title: 'Chunk & Enrich',
    description:
      'Apply recursive and semantic chunking so retrieval units keep meaningful context, then attach version-aware metadata: source, category, section, page, access class and revision.',
    tools: ['Recursive chunking', 'Semantic chunking', 'Metadata schemas'],
  },
  {
    id: 'embed',
    step: '03',
    title: 'Embed & Index',
    description:
      'Generate vector embeddings per chunk and store vectors alongside metadata so semantic discovery stays filterable by access classification and document version.',
    tools: ['Embeddings', 'Pinecone', 'FAISS'],
  },
  {
    id: 'retrieve',
    step: '04',
    title: 'Retrieve',
    description:
      'Normalize the question, apply metadata filters, embed the query, and pull the top-K relevant chunks under a relevance threshold before anything reaches the model.',
    tools: ['Hybrid search', 'Metadata filtering', 'Top-K tuning'],
  },
  {
    id: 'prompt',
    step: '05',
    title: 'Compose the Prompt',
    description:
      'Assemble reusable templates carrying system instructions, retrieved passages, the user question, source-grounding rules, output format and explicit insufficient-context handling.',
    tools: ['Prompt templates', 'Context engineering', 'Output contracts'],
  },
  {
    id: 'generate',
    step: '06',
    title: 'Generate',
    description:
      'Invoke the LLM against grounded context only, parse the response into a structured contract, and emit answer, citations, metadata and workflow state together.',
    tools: ['GPT-4', 'Vertex AI', 'LangChain'],
  },
  {
    id: 'validate',
    step: '07',
    title: 'Validate & Guard',
    description:
      'Run rule-based, regex and named-entity validation for PII, restricted content, unsupported statements, incomplete citations and policy violations — with controlled fallbacks when confidence is low.',
    tools: ['Guardrails', 'PII detection', 'Fallback responses'],
  },
  {
    id: 'cite',
    step: '08',
    title: 'Cite',
    description:
      'Return the exact internal documents used during retrieval so any employee can verify a generated answer against its source rather than trusting it.',
    tools: ['Source citation', 'Traceability', 'Version awareness'],
  },
  {
    id: 'evaluate',
    step: '09',
    title: 'Evaluate',
    description:
      'Score behaviour on representative questions across retrieval relevance, factual grounding, source accuracy, completeness, format compliance and hallucination risk.',
    tools: ['Eval datasets', 'Reviewer feedback', 'Trace logs'],
  },
  {
    id: 'observe',
    step: '10',
    title: 'Serve & Observe',
    description:
      'Ship behind authenticated Java services with telemetry on retrieval latency, LLM latency, token usage, validation outcomes and integration failure paths.',
    tools: ['FastAPI', 'Spring Boot', 'Cloud Monitoring'],
  },
];

export const GENAI_CAPABILITIES: Capability[] = [
  { name: 'Prompt Engineering', group: 'orchestration' },
  { name: 'Context Engineering', group: 'orchestration' },
  { name: 'LangChain', group: 'orchestration' },
  { name: 'LangGraph', group: 'orchestration' },
  { name: 'LlamaIndex', group: 'orchestration' },
  { name: 'Multi-Agent Orchestration', group: 'orchestration' },
  { name: 'Tool Calling', group: 'orchestration' },
  { name: 'MCP', group: 'orchestration' },

  { name: 'RAG', group: 'retrieval' },
  { name: 'Embeddings', group: 'retrieval' },
  { name: 'Pinecone', group: 'retrieval' },
  { name: 'FAISS', group: 'retrieval' },
  { name: 'Chroma', group: 'retrieval' },
  { name: 'Weaviate', group: 'retrieval' },
  { name: 'Qdrant', group: 'retrieval' },
  { name: 'Hybrid Search', group: 'retrieval' },
  { name: 'Semantic Chunking', group: 'retrieval' },

  { name: 'OpenAI GPT-4', group: 'models' },
  { name: 'Claude', group: 'models' },
  { name: 'Gemini', group: 'models' },
  { name: 'Vertex AI', group: 'models' },
  { name: 'Azure OpenAI', group: 'models' },
  { name: 'AWS Bedrock', group: 'models' },
  { name: 'T5', group: 'models' },

  { name: 'Guardrails', group: 'quality' },
  { name: 'Evaluation Workflows', group: 'quality' },
  { name: 'Source Citation', group: 'quality' },
  { name: 'Structured Outputs', group: 'quality' },
  { name: 'PII Validation', group: 'quality' },
  { name: 'Hallucination Analysis', group: 'quality' },

  { name: 'FastAPI', group: 'serving' },
  { name: 'Model Serving', group: 'serving' },
  { name: 'Observability', group: 'serving' },
  { name: 'MLflow', group: 'serving' },
  { name: 'Java–Python Integration', group: 'serving' },
];

export const CAPABILITY_GROUPS: Record<Capability['group'], { label: string; blurb: string }> = {
  orchestration: {
    label: 'Orchestration',
    blurb: 'Composing prompts, tools and agents into workflows that can be reasoned about.',
  },
  retrieval: {
    label: 'Retrieval',
    blurb: 'Getting the right context in front of the model before it ever generates.',
  },
  models: {
    label: 'Models',
    blurb: 'Frontier and open models behind enterprise access boundaries.',
  },
  quality: {
    label: 'Quality & Safety',
    blurb: 'Validation, citation and evaluation — the difference between a demo and a system.',
  },
  serving: {
    label: 'Serving',
    blurb: 'Shipping it: APIs, integration contracts, telemetry and rollback paths.',
  },
};
