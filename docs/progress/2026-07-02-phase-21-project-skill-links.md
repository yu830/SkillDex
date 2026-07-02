# Phase 21 - Project-Skill Relationship Navigation

## Goal

Add a maintainable Project -> Skill relationship layer so each project detail page can show related Skill navigation without treating those links as evidence proof.

## Changes

- Added `relatedSkillSlugs` to every project evidence record.
- Added a project helper that resolves related Skill slugs and fails when a project references a missing Skill.
- Added locale-aware Skill path helper usage for project detail related Skill links.
- Rendered a lightweight Related skills section on project detail pages.
- Extended static output checks to confirm related Skill links are emitted for project detail pages.
- Updated schema and content guidance to clarify that related Skills are navigation/capability mappings, not proof.

## Relationship Coverage

| Project | Related Skill slugs |
| --- | --- |
| InsightCanvas Agent | `frontend-design`, `vibe-coding-review` |
| MemoryBridge MCP | `mcp-builder` |
| RepoLens RAG | `vibe-coding-review`, `mcp-builder` |
| Bug Hunter Replay | `gh-fix-ci`, `playwright`, `vibe-coding-review` |
| Vibe Coding Review | `vibe-coding-review`, `gh-address-comments`, `gh-fix-ci`, `skill-creator` |
| LoopEngineering | `vibe-coding-review`, `gh-address-comments`, `gh-fix-ci`, `playwright`, `vercel-deploy` |

Unique related Skill coverage: 8 Skill slugs.

## Proof Boundary

Related Skills are intentionally not evidence artifacts. They only describe workflow-capability navigation from a project to existing Skill detail pages. Evidence proof remains limited to the structured project evidence artifacts and their verified or pending status.

## Validation

- `npm ci --dry-run`: passed.
- `npm run test`: passed, 33/33 tests.
- `npm run lint`: passed.
- `npm run build`: passed, 44 static pages generated.
- `npm run verify:static-output`: passed.
- `npx npm@latest audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `git diff --check`: passed.

Local npm 10.9.3 note: `npm audit --audit-level=moderate` was executed and failed against npm's retiring quick audit endpoint with `Invalid package tree, run npm install to rebuild your package-lock.json`. The same dependency tree returned 0 vulnerabilities with `npx npm@latest audit --audit-level=moderate`; no package or lockfile change was made for this environment-specific audit endpoint issue.

## Smoke

- Local static HTTP smoke with `python -m http.server` over `out/`: `/`, `/en/projects/`, `/en/projects/insightcanvas-agent/`, `/en/projects/loopengineering/`, and `/en/skills/frontend-design/` all returned HTTP 200.
- Playwright DOM smoke: `/en/projects/insightcanvas-agent/` showed the Related skills section and proof-boundary copy; the `frontend-design` related Skill link navigated to `/en/skills/frontend-design/`.
- Browser caveat: Python static serving logged Next static export RSC prefetch `.txt` 404s for existing locale/navigation links. No page error was thrown and the tested navigation completed, but console was not clean.

## Risks

- Relationship strength is manually curated; tests validate existence, uniqueness, diversity, and routing, but not semantic correctness.
- The current npm 10 audit endpoint behavior should be revisited before any release gate that requires the exact global npm command.

## Phase 22 Suggestions

- Add a small review checklist for project-to-skill relationship changes.
- Consider a release gate that standardizes the npm CLI version used for audit validation.
- After release approval, publish Phase 21 through the same main fast-forward and GitHub Actions deploy flow used in Phase 18/20.
