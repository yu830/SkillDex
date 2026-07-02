import type { ProjectEvidenceRecord } from "@/types/project";

const VERIFIED_DATE = "2026-07-02";

export const projectEvidence: ProjectEvidenceRecord[] = [
  {
    slug: "insightcanvas-agent",
    name: "InsightCanvas Agent",
    summary: {
      en: "Portfolio project record for a planned analysis canvas agent. Public repository and demo evidence are not yet verified.",
    },
    highlights: [
      { en: "Frames multi-step analysis work as a reviewable canvas rather than a single chat response." },
      { en: "Evidence is currently limited to project intent and local planning notes." },
    ],
    tags: ["agent", "analysis-canvas", "portfolio"],
    toolScopes: ["codex"],
    evidence: {
      status: "planned",
      lastVerified: VERIFIED_DATE,
      artifacts: [
        { label: "Repository TBD", kind: "repo", summary: "No public repository link has been verified for this project." },
        { label: "Demo TBD", kind: "demo", summary: "No public demo URL has been verified." },
        { label: "Portfolio note", kind: "note", summary: "Kept as a planned portfolio item until implementation evidence is added." },
      ],
    },
    updatedAt: VERIFIED_DATE,
  },
  {
    slug: "memorybridge-mcp",
    name: "MemoryBridge MCP",
    summary: {
      en: "Portfolio project record for a local-first memory bridge concept around MCP-style retrieval and continuity.",
    },
    highlights: [
      { en: "Tracks the intended boundary between local memory, retrieval, and external service connectors." },
      { en: "Public implementation evidence is still pending and should not be inferred." },
    ],
    tags: ["mcp", "memory", "local-first"],
    toolScopes: ["codex"],
    evidence: {
      status: "prototype",
      lastVerified: VERIFIED_DATE,
      artifacts: [
        { label: "Local prototype note", kind: "note", summary: "The project is recorded as a local prototype; no public source URL is listed." },
        { label: "Docs TBD", kind: "doc", summary: "Public usage documentation has not been verified." },
      ],
    },
    updatedAt: VERIFIED_DATE,
  },
  {
    slug: "repolens-rag",
    name: "RepoLens RAG",
    summary: {
      en: "Portfolio project record for repository-focused retrieval and codebase explanation workflows.",
    },
    highlights: [
      { en: "Targets repository reading, summarization, and traceable answer generation." },
      { en: "Evidence remains at concept/prototype level until runnable artifacts are linked." },
    ],
    tags: ["rag", "repository-analysis", "code-search"],
    toolScopes: ["codex"],
    evidence: {
      status: "prototype",
      lastVerified: VERIFIED_DATE,
      artifacts: [
        { label: "Workflow note", kind: "workflow", summary: "Cataloged as a repository-analysis workflow; public benchmark evidence is not present." },
        { label: "Benchmark TBD", kind: "benchmark", summary: "No benchmark report has been verified." },
      ],
    },
    updatedAt: VERIFIED_DATE,
  },
  {
    slug: "bug-hunter-replay",
    name: "Bug Hunter Replay",
    summary: {
      en: "Portfolio project record for replaying bug reports, logs, and verification evidence through a structured debugging loop.",
    },
    highlights: [
      { en: "Focuses on reproducibility, command evidence, and regression verification." },
      { en: "Public case-study evidence is still pending." },
    ],
    tags: ["debugging", "replay", "qa"],
    toolScopes: ["codex"],
    evidence: {
      status: "prototype",
      lastVerified: VERIFIED_DATE,
      artifacts: [
        { label: "Workflow note", kind: "workflow", summary: "Tracked as a debugging replay workflow with evidence-first closeout rules." },
        { label: "Case study TBD", kind: "case-study", summary: "No public case study link has been verified." },
      ],
    },
    updatedAt: VERIFIED_DATE,
  },
  {
    slug: "vibe-coding-review",
    name: "Vibe Coding Review",
    summary: {
      en: "Portfolio project record for phase-aware review gates used to keep AI-assisted coding work inside approved scope.",
    },
    highlights: [
      { en: "Maintains explicit phase boundaries, non-goals, and verification gates." },
      { en: "Represented in the Skill catalog as an owned workflow reference." },
    ],
    tags: ["project-governance", "review-gate", "scope-control"],
    toolScopes: ["claude-code", "codex"],
    evidence: {
      status: "implemented",
      lastVerified: VERIFIED_DATE,
      artifacts: [
        { label: "SkillDex catalog entry", kind: "doc", href: "/en/skills/vibe-coding-review/", summary: "The owned workflow is represented as a SkillDex record." },
        {
          label: "Phase 16B deploy verification",
          kind: "workflow",
          summary: "The prior Phase 16B record verified the production static app; Phase 17 does not create a new deployment.",
        },
      ],
    },
    updatedAt: VERIFIED_DATE,
  },
  {
    slug: "loopengineering",
    name: "LoopEngineering",
    summary: {
      en: "Portfolio project record for iterative plan-build-review loops in AI engineering work.",
    },
    highlights: [
      { en: "Captures the habit of closing loops with tests, review, and written progress records." },
      { en: "Implementation proof is not yet separated into a public repo or case study." },
    ],
    tags: ["engineering-process", "verification", "delivery-loop"],
    toolScopes: ["codex"],
    evidence: {
      status: "research",
      lastVerified: VERIFIED_DATE,
      artifacts: [
        { label: "Process note", kind: "note", summary: "Recorded as a research/process project pending a concrete public artifact." },
        { label: "Case study TBD", kind: "case-study", summary: "No case study URL has been verified." },
      ],
    },
    updatedAt: VERIFIED_DATE,
  },
];
