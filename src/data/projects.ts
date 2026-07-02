import type { ProjectEvidenceRecord } from "@/types/project";

const VERIFIED_DATE = "2026-07-02";

export const projectEvidence: ProjectEvidenceRecord[] = [
  {
    slug: "insightcanvas-agent",
    name: "InsightCanvas Agent",
    summary: {
      en: "Portfolio project record for a planned analysis canvas agent. Public repository and demo evidence are not yet verified.",
    },
    problem: [
      { en: "Analysis tasks often lose intermediate assumptions, source notes, and review decisions inside a chat transcript." },
      { en: "No public artifact has been verified yet, so the record must keep the boundary between intent and proof explicit." },
    ],
    approach: [
      { en: "Model the project as a reviewable canvas for multi-step analysis plans, artifacts, and verification checkpoints." },
      { en: "Keep the current evidence state as planned until a runnable repository, demo, or case study is linked." },
    ],
    highlights: [
      { en: "Frames multi-step analysis work as a reviewable canvas rather than a single chat response." },
      { en: "Evidence is currently limited to project intent and local planning notes." },
    ],
    nextSteps: [
      { en: "Publish a minimal local prototype note or repository before changing the status beyond planned." },
      { en: "Replace Repository TBD and Demo TBD only after those URLs are publicly verified." },
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
    problem: [
      { en: "Long-running AI work needs continuity, but memory and connector boundaries can become opaque or overly broad." },
      { en: "Public implementation evidence is incomplete, so the page must avoid implying a production memory service." },
    ],
    approach: [
      { en: "Frame the project around local-first memory continuity, retrieval boundaries, and MCP-compatible handoff notes." },
      { en: "Use note artifacts until public source, setup docs, or a reproducible smoke test are available." },
    ],
    highlights: [
      { en: "Tracks the intended boundary between local memory, retrieval, and external service connectors." },
      { en: "Public implementation evidence is still pending and should not be inferred." },
    ],
    nextSteps: [
      { en: "Document the local prototype boundary and required privacy constraints." },
      { en: "Add public usage documentation only after it has been reviewed for secret and local-path leakage." },
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
    problem: [
      { en: "Codebase Q&A needs traceable retrieval and source-grounded summaries rather than unverified answer generation." },
      { en: "Benchmark evidence is not present, so capability claims must stay at concept/prototype level." },
    ],
    approach: [
      { en: "Represent the project as a repository analysis workflow with explicit retrieval, citation, and review checkpoints." },
      { en: "Keep benchmark and runnable artifact links as pending until verified reports are available." },
    ],
    highlights: [
      { en: "Targets repository reading, summarization, and traceable answer generation." },
      { en: "Evidence remains at concept/prototype level until runnable artifacts are linked." },
    ],
    nextSteps: [
      { en: "Add a small reproducible repository fixture before presenting benchmark results." },
      { en: "Link a benchmark report only when the methodology and output are public and reviewable." },
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
    problem: [
      { en: "Bug fixes are hard to trust when reproduction steps, command output, and regression checks are scattered." },
      { en: "No public case study is verified yet, so the detail page must separate workflow intent from proof." },
    ],
    approach: [
      { en: "Track debugging replay as a workflow centered on reproduction, logs, minimal fixes, and verification evidence." },
      { en: "Use workflow notes until a public case study or replay artifact is available." },
    ],
    highlights: [
      { en: "Focuses on reproducibility, command evidence, and regression verification." },
      { en: "Public case-study evidence is still pending." },
    ],
    nextSteps: [
      { en: "Publish one sanitized bug replay case study with commands, observed failure, fix, and regression test." },
      { en: "Keep private logs or user data out of any public evidence artifact." },
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
    problem: [
      { en: "AI-assisted implementation can drift into unapproved scope unless phase gates, evidence, and review rules are explicit." },
      { en: "The workflow has catalog evidence, but future proof should still distinguish process records from product claims." },
    ],
    approach: [
      { en: "Capture phase boundaries, non-goals, validation commands, and review criteria as an owned workflow record." },
      { en: "Link only to verified internal SkillDex routes or release records rather than inventing external proof." },
    ],
    highlights: [
      { en: "Maintains explicit phase boundaries, non-goals, and verification gates." },
      { en: "Represented in the Skill catalog as an owned workflow reference." },
    ],
    nextSteps: [
      { en: "Add a public case study only after a complete review cycle can be shown without exposing private project data." },
      { en: "Keep release records and validation commands attached to future workflow examples." },
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
    problem: [
      { en: "AI engineering work is easier to audit when planning, implementation, review, testing, and release evidence stay connected." },
      { en: "The concept is currently research/process oriented, not a separately published product." },
    ],
    approach: [
      { en: "Use the record to describe a delivery loop that closes each phase with tests, review, written evidence, and explicit next steps." },
      { en: "Keep public proof as notes until a dedicated repository or case study exists." },
    ],
    highlights: [
      { en: "Captures the habit of closing loops with tests, review, and written progress records." },
      { en: "Implementation proof is not yet separated into a public repo or case study." },
    ],
    nextSteps: [
      { en: "Turn one completed delivery loop into a public, source-safe case study." },
      { en: "Keep Case study TBD visible until the artifact is reviewed and linked." },
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
