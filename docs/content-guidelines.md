# SkillDex Content Guidelines

SkillDex is a reference-only catalog and portfolio evidence surface. It should make proof state visible without turning unverified ideas into claims.

## Evidence Rules

- Do not invent repository links, demo URLs, case studies, benchmarks, HTTP status, stars, user counts, production usage, or CI results.
- Use a `note` artifact when evidence is local, planned, or not yet public.
- Use `TBD` in the artifact summary when a link or proof item is expected but not verified.
- Only set `lastVerified` to the current phase date when the record was manually reviewed in that phase.
- Keep evidence summaries short, factual, and engineering-oriented.
- Do not copy full third-party `SKILL.md` content into SkillDex.

## Skill Records

Skill records should summarize real Claude Code or Codex Skills. They must keep source metadata, license, ownership, and compatibility explicit.

### Risk classification

Every Skill record must include `riskLevel` as `low`, `medium`, or `high`.

Risk is a review and usage-caution label. It helps users filter the catalog by how much care a Skill needs before use or adaptation. It must not be written as evidence, proof of safety, production readiness, or a verified security result.

Use `high` for Skills that touch deployments, API credentials, security analysis, MCP servers, CI, or external systems. Use `medium` for Skills that can materially affect code, release, or workflow quality. Use `low` only for bounded documentation, formatting, or low-impact helper workflows.

Preferred evidence artifacts for third-party Skills:

- `repo` for public source directories
- `doc` for public documentation
- `note` for bounded review notes

## Project Records

Project records should describe proof state honestly. If a project is planned or a local prototype, say so directly.

Project detail pages may expand the record with problem, approach, evidence, proof-boundary, and next-step sections, but they must preserve the same proof status. A missing repository, demo, benchmark, or case study stays `TBD`, pending, or note-style evidence until a real public artifact is verified.

Project detail pages may also list related Skills. Related Skills are navigation and capability mappings only; they do not replace evidence artifacts, prove that a project shipped, or justify adding unverified external links.

Skill detail pages may list related Projects derived from project `relatedSkillSlugs`. Treat those links as navigation and portfolio context only. Avoid wording such as "built with this Skill", "powered by this Skill", "case study", or "evidence" unless the Project evidence artifacts independently verify that claim.

When editing relationships, use this checklist:

- The Skill slug exists in `src/data/skills.ts`.
- The Project slug exists in `src/data/projects.ts`.
- Reverse Skill -> Project links are derived, not stored separately on Skill records.
- Empty reverse sections are allowed when no Project maps to a Skill.
- Relationship tests prove route integrity, not semantic fit.
- No proof status, repository URL, demo URL, benchmark, or deployment claim is upgraded by adding a relationship link.

Use `docs/relationship-matrix.md` as the review surface for the current Project <-> Skill mapping. Update that matrix in the same phase as any `relatedSkillSlugs` data change.

Use `docs/relationship-review-checklist.md` before editing relationship links so proof boundaries, locale-aware routes, and validation commands stay consistent.

Required project evidence records:

- InsightCanvas Agent
- MemoryBridge MCP
- RepoLens RAG
- Bug Hunter Replay
- Vibe Coding Review
- LoopEngineering

These records may show missing public proof as `TBD`, but they must not use fake URLs or implied production status.
