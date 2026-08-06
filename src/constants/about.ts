/**
 * Long-form narrative for the About section, condensed from the professional
 * summary in the resume and the "Introduction" chapter of the career story.
 */
export const ABOUT = {
  eyebrow: 'About',
  heading: 'From circuit boards to retrieval pipelines.',
  lead:
    'Generative AI, Applied AI and Machine Learning Engineer with 6+ years building enterprise AI applications, Retrieval-Augmented Generation systems, NLP pipelines, semantic-search services and secure backend integrations.',
  paragraphs: [
    'The thread through every role is the same: build secure, well-tested, production-ready systems — Java and Spring Boot at the core — and keep extending that foundation outward. First into Python data engineering, then into machine learning and NLP, and now into Generative AI and Retrieval-Augmented Generation.',
    'At American Express, that means an Internal Generative AI Knowledge Assistant where authorized employees ask questions in plain language and get answers grounded in approved enterprise documents — with citations they can verify, validation that catches unsupported claims, and a Java security perimeter that never lets an unauthenticated request near the model.',
    'Before that, at ADP, it meant NLP and machine-learning services for payroll and workforce analytics: entity extraction from HR documents, attrition and anomaly models, SHAP attribution so auditors could interpret a score, and FastAPI endpoints that enterprise Java systems could actually depend on.',
    'And it started somewhere less obvious — embedded systems, PCB design and robotics, where nothing prints a stack trace. That grounding still shows up in how the software gets built: measure before you optimise, respect the constraints, and debug from first principles.',
  ],
  principles: [
    {
      title: 'Grounded, not plausible',
      body: 'Citations, structured outputs and validation rules — an answer that cannot be traced to a source is a defect, not a feature.',
    },
    {
      title: 'Evaluation before scale',
      body: 'Representative question sets, reviewer feedback and trace logs. Retrieval accuracy moved from ~78% to 91% because it was measured, not guessed.',
    },
    {
      title: 'Security is the perimeter',
      body: 'OAuth2, JWT and RBAC in front of every AI endpoint. Access classification is a retrieval filter, not a UI concern.',
    },
    {
      title: 'Boring releases',
      body: 'Containerized services, pipeline-driven promotion, telemetry on the failure paths. 85%+ coverage across Python and Java.',
    },
  ],
} as const;
