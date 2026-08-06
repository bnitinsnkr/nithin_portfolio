import type { ArchitectureDiagram } from '@/types';

/**
 * Animated system diagrams. Node positions are expressed on a 5-column ×
 * 4-row lattice; the renderer converts them to SVG coordinates so the layout
 * stays declarative and responsive.
 */
export const ARCHITECTURES: ArchitectureDiagram[] = [
  {
    id: 'rag',
    title: 'Enterprise RAG Pipeline',
    caption:
      'Documents become retrievable context; a Java security perimeter stays in front of every model call.',
    nodes: [
      { id: 'docs', label: 'Approved Docs', sub: 'PDF · DOCX · Policies', column: 1, row: 1, tone: 'entry' },
      { id: 'ingest', label: 'Ingestion', sub: 'Extract · OCR · Clean', column: 2, row: 1, tone: 'compute' },
      { id: 'chunk', label: 'Chunk + Embed', sub: 'Recursive · Semantic', column: 3, row: 1, tone: 'compute' },
      { id: 'vector', label: 'Vector Store', sub: 'Pinecone · Metadata', column: 4, row: 1, tone: 'data' },
      { id: 'store', label: 'PostgreSQL', sub: 'Sessions · Feedback', column: 5, row: 1, tone: 'data' },
      { id: 'user', label: 'Employee', sub: 'OAuth2 · JWT · RBAC', column: 1, row: 3, tone: 'entry' },
      { id: 'java', label: 'Spring Boot', sub: 'AuthN/Z · Contracts', column: 2, row: 3, tone: 'compute' },
      { id: 'rag', label: 'FastAPI RAG', sub: 'Retrieve · Prompt', column: 3, row: 3, tone: 'compute' },
      { id: 'llm', label: 'GPT-4 / Vertex', sub: 'Grounded generation', column: 4, row: 3, tone: 'model' },
      { id: 'guard', label: 'Validation', sub: 'Guardrails · Citations', column: 5, row: 3, tone: 'ops' },
    ],
    edges: [
      { from: 'docs', to: 'ingest' },
      { from: 'ingest', to: 'chunk' },
      { from: 'chunk', to: 'vector', label: 'embeddings' },
      { from: 'user', to: 'java' },
      { from: 'java', to: 'rag', label: 'signed context' },
      { from: 'vector', to: 'rag', label: 'top-K', async: true },
      { from: 'rag', to: 'llm' },
      { from: 'llm', to: 'guard' },
      { from: 'guard', to: 'store', label: 'persist', async: true },
    ],
    notes: [
      'Unauthorized callers never reach the AI endpoints — the Java tier owns identity.',
      'Retrieval is metadata-filtered by access classification before context assembly.',
      'Every answer is validated and cited before it leaves the service boundary.',
    ],
  },
  {
    id: 'event-driven',
    title: 'Event-Driven Microservices',
    caption:
      'Synchronous request paths stay thin; anything that can be decoupled moves onto the broker.',
    nodes: [
      { id: 'client', label: 'React Client', sub: 'TypeScript', column: 1, row: 2, tone: 'entry' },
      { id: 'gateway', label: 'API Gateway', sub: 'OAuth2 · JWT · RBAC', column: 2, row: 2, tone: 'compute' },
      { id: 'claims', label: 'Claims Service', sub: 'Spring Boot', column: 3, row: 1, tone: 'compute' },
      { id: 'txn', label: 'Transaction Service', sub: 'Spring Boot', column: 3, row: 3, tone: 'compute' },
      { id: 'kafka', label: 'Kafka', sub: 'Topics · Consumers', column: 4, row: 2, tone: 'data' },
      { id: 'redis', label: 'Redis', sub: 'Cache · Sessions', column: 5, row: 1, tone: 'data' },
      { id: 'db', label: 'PostgreSQL / Oracle', sub: 'Tuned indexes', column: 5, row: 3, tone: 'data' },
      { id: 'ci', label: 'Jenkins CI/CD', sub: 'Build · Test · Scan', column: 1, row: 4, tone: 'ops' },
      { id: 'k8s', label: 'Kubernetes', sub: 'Docker · Rollouts', column: 2, row: 4, tone: 'ops' },
      { id: 'obs', label: 'Observability', sub: 'Logs · Metrics · Traces', column: 4, row: 4, tone: 'ops' },
    ],
    edges: [
      { from: 'client', to: 'gateway' },
      { from: 'gateway', to: 'claims' },
      { from: 'gateway', to: 'txn' },
      { from: 'claims', to: 'kafka', label: 'events', async: true },
      { from: 'txn', to: 'kafka', async: true },
      { from: 'kafka', to: 'redis', async: true },
      { from: 'kafka', to: 'db', async: true },
      { from: 'ci', to: 'k8s', label: 'deploy' },
      { from: 'k8s', to: 'obs', async: true },
    ],
    notes: [
      'Producers and consumers carry retry and dead-letter handling, not just happy paths.',
      'Read-heavy workloads sit behind a cache so the database is not the throughput ceiling.',
      'Releases are pipeline-driven: build, test, quality gate, promote, monitor.',
    ],
  },
  {
    id: 'mlops',
    title: 'ML Pipeline & Model Serving',
    caption:
      'Notebooks become services: repeatable pipelines, tracked experiments, versioned models behind an API.',
    nodes: [
      { id: 'raw', label: 'Source Data', sub: 'Payroll · HR · Docs', column: 1, row: 1, tone: 'entry' },
      { id: 'airflow', label: 'Airflow', sub: 'DAGs · Retries · SLAs', column: 2, row: 1, tone: 'compute' },
      { id: 'spark', label: 'Spark / PySpark', sub: 'Clean · Transform', column: 3, row: 1, tone: 'compute' },
      { id: 'features', label: 'Feature Sets', sub: 'Validated schemas', column: 4, row: 1, tone: 'data' },
      { id: 'monitor', label: 'Monitoring', sub: 'Latency · Drift · SHAP', column: 5, row: 1, tone: 'ops' },
      { id: 'train', label: 'Training', sub: 'XGBoost · LightGBM · BERT', column: 2, row: 3, tone: 'model' },
      { id: 'mlflow', label: 'MLflow', sub: 'Experiments · Versions', column: 3, row: 3, tone: 'ops' },
      { id: 'serve', label: 'FastAPI Serving', sub: 'Pydantic contracts', column: 4, row: 3, tone: 'compute' },
      { id: 'consumer', label: 'Java Consumers', sub: 'Spring Boot workflows', column: 5, row: 3, tone: 'entry' },
    ],
    edges: [
      { from: 'raw', to: 'airflow' },
      { from: 'airflow', to: 'spark' },
      { from: 'spark', to: 'features' },
      { from: 'features', to: 'train' },
      { from: 'train', to: 'mlflow', label: 'track' },
      { from: 'mlflow', to: 'serve', label: 'promote' },
      { from: 'serve', to: 'consumer' },
      { from: 'serve', to: 'monitor', async: true },
    ],
    notes: [
      'Every model that ships has a tracked experiment, a version and a rollback target.',
      'Serving contracts are typed end-to-end so Java callers fail loudly, not silently.',
      'Explainability artifacts ship with the prediction, not as a follow-up request.',
    ],
  },
];
