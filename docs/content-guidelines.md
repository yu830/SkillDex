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

Preferred evidence artifacts for third-party Skills:

- `repo` for public source directories
- `doc` for public documentation
- `note` for bounded review notes

## Project Records

Project records should describe proof state honestly. If a project is planned or a local prototype, say so directly.

Project detail pages may expand the record with problem, approach, evidence, proof-boundary, and next-step sections, but they must preserve the same proof status. A missing repository, demo, benchmark, or case study stays `TBD`, pending, or note-style evidence until a real public artifact is verified.

Required project evidence records:

- InsightCanvas Agent
- MemoryBridge MCP
- RepoLens RAG
- Bug Hunter Replay
- Vibe Coding Review
- LoopEngineering

These records may show missing public proof as `TBD`, but they must not use fake URLs or implied production status.
