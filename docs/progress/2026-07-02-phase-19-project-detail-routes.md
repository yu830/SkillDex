# Phase 19 Project Detail Routes

## Goal

Add a static project evidence detail route foundation so the existing six project evidence cards can navigate to `/<locale>/projects/<slug>/` pages without changing deployment workflow, production secrets, or the broader visual system.

## Baseline

- Base branch: `origin/codex/skilldex-phase-18-evidence-release-verification`
- Production baseline: Phase 18 evidence release was already deployed from `main` at `42fcae72f9e60d397f61062725264872ef96da9e`.
- Phase 18 record branch head: `751f1a77272ba997af5bb4d7d96505d83ca84dc8`.
- Integration branch: `codex/skilldex-phase-19-project-detail-routes`.
- Main was not modified, pushed, or deployed in this phase.

## Changes

- Added project detail fields to the project evidence model:
  - `problem`
  - `approach`
  - `nextSteps`
- Extended all six project records with conservative, localized detail copy.
- Added route helpers for locale-aware project links and static params.
- Added `/[locale]/projects/` as a compact project evidence index.
- Added `/[locale]/projects/[slug]/` as static detail pages with:
  - project name and summary;
  - project status and evidence status;
  - tools, updated date, and last verified date;
  - evidence artifacts;
  - explicit proof boundary text;
  - next steps or missing proof notes;
  - links back to projects, skills, and home.
- Updated project cards so each card links to its locale-aware detail page.
- Updated the static output verifier to include project index and detail pages for both `en` and `zh`.
- Updated tests for project slug uniqueness, static params, locale-aware links, route source contracts, and TBD anti-fabrication behavior.
- Updated schema/content documentation and README route notes.

## Project Detail Coverage

All six required projects now have stable ASCII slugs and static detail routes:

- `insightcanvas-agent`: InsightCanvas Agent
- `memorybridge-mcp`: MemoryBridge MCP
- `repolens-rag`: RepoLens RAG
- `bug-hunter-replay`: Bug Hunter Replay
- `vibe-coding-review`: Vibe Coding Review
- `loopengineering`: LoopEngineering

Each route is generated for both locales, for example:

- `/en/projects/insightcanvas-agent/`
- `/zh/projects/insightcanvas-agent/`

## Evidence Integrity

- No new external repo, demo, documentation, benchmark, or case-study URLs were invented.
- Missing proof remains explicit through `TBD`, pending, planned, prototype, research, or note-style artifacts.
- Artifacts with `TBD` copy remain unlinked until a real URL is verified.
- Detail pages show `No verified URL attached` when an artifact has no trusted `href`.

## Validation

- `npm ci --dry-run`: passed.
- `npm run test`: passed, 31/31 tests.
- `npm run lint`: passed.
- `npm run build`: passed, Next.js generated 44 static pages.
- `npm run verify:static-output`: passed.
- `npm audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `git diff --check`: passed, with only existing CRLF conversion warnings.

Local static HTTP smoke from `out/` on `127.0.0.1:4191`:

- `/`: HTTP 200.
- `/en/`: HTTP 200.
- `/en/projects/`: HTTP 200.
- `/en/projects/insightcanvas-agent/`: HTTP 200.
- `/en/projects/loopengineering/`: HTTP 200.

Local in-app browser smoke:

- Project index rendered `Project evidence`, `InsightCanvas Agent`, and `LoopEngineering`.
- The `InsightCanvas Agent` project card link navigated to `/en/projects/insightcanvas-agent/`.
- The detail page rendered `Evidence artifacts`, `Proof boundary`, `Repository TBD`, and `No verified URL attached`.
- Page console error/warn logs were empty.
- The browser tool emitted one unrelated Statsig telemetry timeout outside the SkillDex page context; the page-level console log check stayed empty.

## Known Gaps

- Project detail pages are intentionally compact; they do not yet include evidence filtering, related skills, or richer case-study sections.
- Several projects still have pending public proof because no verified repo/demo/case-study URL is available.
- Production deployment was not performed in this phase; release should happen in a separate production gate phase.

## Phase 20 Suggestions

- Run a release review and production deploy gate for Phase 19 after project director approval.
- Add related-skill links on project detail pages only after confirming the desired information architecture.
- Replace `TBD` placeholders with verified artifacts as real public repos, demos, docs, or case studies become available.
