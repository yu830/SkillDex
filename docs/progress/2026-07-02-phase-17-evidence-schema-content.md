# Phase 17 - Evidence Schema And Content Credibility

## Goal

Add a conservative evidence layer to the existing Next.js SkillDex app without changing the Cloudflare deployment workflow or production release path.

## Baseline

- Base branch: `origin/codex/skilldex-phase-16b-main-deploy-verification`
- Phase 16B record commit: `4e8e7ed Record Phase 16B deploy verification`
- `origin/main` was an ancestor of the Phase 16B record branch.
- Current work branch: `codex/skilldex-phase-17-evidence-schema-content`

## Changes

- Added shared evidence types to `src/types/skill.ts`.
- Added project evidence records in `src/data/projects.ts`.
- Added project evidence helpers in `src/lib/projects.ts`.
- Added runtime evidence validation helpers in `src/lib/evidence.ts`.
- Added a compact project evidence card component for the homepage.
- Added Skill evidence summaries to Skill cards and Skill detail pages.
- Expanded the Skill catalog from 5 to 10 evidence-ready records.
- Added schema and content governance docs.

## Evidence Coverage

Required project records covered:

- InsightCanvas Agent
- MemoryBridge MCP
- RepoLens RAG
- Bug Hunter Replay
- Vibe Coding Review
- LoopEngineering

Skill evidence coverage target: at least 10 Skill entries.

## Validation

Validation commands run:

- `npm ci --dry-run`: passed
- `npm run test`: passed, 26/26 tests
- `npm run lint`: passed
- `npm run build`: passed, 30 static pages generated
- `npm run verify:static-output`: passed
- `npm audit --audit-level=moderate`: passed, 0 vulnerabilities
- `git diff --check`: passed with line-ending warnings only
- Local static smoke from `out/`: `/`, `/en/`, `/zh/`, `/en/skills/playwright/`, and `/en/skills/gh-fix-ci/` returned HTTP 200; homepage evidence content check found `Project evidence` and `InsightCanvas Agent`
- In-app browser smoke: `/en/` had `SkillDex`, `Project evidence`, and `InsightCanvas Agent`; console error/warn count was 0; searching `gh-fix-ci` on `/en/skills/` rendered 1 matching Skill card for `GH Fix CI`

## Deployment Status

No production deploy is part of Phase 17. Cloudflare and GitHub Actions workflow files were intentionally left unchanged.

## Known Gaps

- Several portfolio project records remain `planned`, `prototype`, or `research` because public repository/demo evidence is not yet verified.
- The project evidence surface is homepage-only in this phase; there are no dedicated project detail routes.
- Chinese evidence copy is mostly English fallback until a separate localization pass.

## Phase 18 Suggestions

- Add a project detail route only if the homepage evidence cards prove useful.
- Add evidence filters after confirming the evidence taxonomy is stable.
- Replace `TBD` project artifacts with verified repository, demo, documentation, benchmark, or case-study links as they become real.
