# Phase 26 - Relationship Matrix And Label Polish

## Goal

Polish the Skill detail Related projects labels and add a reviewable relationship matrix for the current Project <-> Skill mapping.

This phase does not release to `main`, does not trigger production deployment, and does not add Skill or Project catalog entries.

## Baseline

- Starting branch: `origin/codex/skilldex-phase-25-skill-related-projects-release-verification`
- Production baseline before this phase: `origin/main` at `ef8b0569147dbc01106f3fc1f646f11fe3909010`
- Phase 25 record head: `1289fdec90b786ea5ae0794581a56bc5263237a2`
- Branch created: `codex/skilldex-phase-26-relationship-matrix-label-polish`
- Ancestry gate: `origin/main` is an ancestor of the Phase 25 record branch.

## Changes

- Labeled the Related projects row metadata as `Project evidence status: ...` and `Project record updated: ...` instead of showing bare status/date tags.
- Added `docs/relationship-matrix.md` as the review surface for the current Project <-> Skill mapping.
- Updated schema and content guidance to point relationship edits back to the matrix.
- Updated tests and static export verification for:
  - explicit Related projects labels;
  - relationship matrix slug coverage;
  - locale-aware project links;
  - proof-boundary wording.

## Relationship Coverage

Project -> Skill:

- 6 required Project records have `relatedSkillSlugs`.
- No new Project or Skill catalog entries were added.

Derived Skill -> Project:

- 8 Skill slugs currently have related Projects:
  - `frontend-design`
  - `vibe-coding-review`
  - `mcp-builder`
  - `gh-fix-ci`
  - `playwright`
  - `gh-address-comments`
  - `skill-creator`
  - `vercel-deploy`

Examples:

- `frontend-design` -> `insightcanvas-agent`
- `vibe-coding-review` -> `insightcanvas-agent`, `repolens-rag`, `bug-hunter-replay`, `vibe-coding-review`, `loopengineering`
- `playwright` -> `bug-hunter-replay`, `loopengineering`

## Proof Boundary

Related projects and the relationship matrix are navigation and editorial review context only. They are not evidence artifacts, proof that a project shipped, proof that a Skill was used, or justification for adding unverified URLs.

## Validation

- `npm ci --dry-run`: passed.
- `npm run test`: passed, 36/36 tests.
- `npm run lint`: passed.
- `npm run build`: passed, 44 static pages generated.
- `npm run verify:static-output`: passed; verifier now checks all 8 English Skill pages with reverse related Projects.
- `npx --yes npm@10.9.8 audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `npx npm@latest audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `git diff --check`: passed.

Local smoke:

- Static HTTP smoke returned 200 for `/`, `/en/skills/frontend-design/`, `/en/skills/vibe-coding-review/`, and `/en/projects/insightcanvas-agent/`.
- Browser smoke confirmed the Skill detail Related projects section, explicit `Project evidence status` / `Project record updated` labels, and navigation from `frontend-design` to `insightcanvas-agent`.
- Browser network logs included known Next static export RSC `.txt` prefetch 404s; no page error or missing app route was observed.

## Known Caveats

- Relationship tests prove route integrity and documentation coverage, not semantic fit.
- Local static export browser navigation can produce known Next static export RSC prefetch `.txt` 404s depending on the server; classify those separately from app route failures.

## Phase 27 Suggestions

- Run a release review for Phase 26 and deploy only after separate approval.
- Consider a small relationship-editing checklist in PR templates or docs if relationship edits become frequent.
- Keep any relationship matrix visualization or filtering for a separate product phase.
