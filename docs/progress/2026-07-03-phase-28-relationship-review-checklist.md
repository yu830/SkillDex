# Phase 28 - Relationship Review Checklist

## Goal

Add a maintainable relationship-edit checklist and validation guardrails so future `relatedSkillSlugs`, relationship matrix, and Related projects UI changes are easier to review without drifting into unverified proof claims.

This phase does not release to `main`, does not trigger production deployment, and does not change Skill or Project catalog data.

## Baseline

- Starting branch: `origin/codex/skilldex-phase-27-relationship-matrix-release-verification`
- Production baseline before this phase: `origin/main` at `bf0fe2948d2f71d13154acfbc4a4b1fc823cd149`
- Phase 27 record head: `1e724ab8f7ebbb33f09b3fb5e43d65a8d3b2c955`
- Branch created: `codex/skilldex-phase-28-relationship-review-checklist`
- Ancestry gate: `origin/main` is an ancestor of the Phase 27 record branch.
- Initial diff over `origin/main`: only `docs/progress/2026-07-03-phase-27-relationship-matrix-release-verification.md`.

## Changes

- Added `docs/relationship-review-checklist.md` as the canonical maintenance checklist for relationship edits.
- Linked the checklist from:
  - `docs/relationship-matrix.md`
  - `docs/data-schema.md`
  - `docs/content-guidelines.md`
  - `README.md`
- Extended tests to verify:
  - checklist references real current Project and Skill slugs;
  - checklist validation commands are real package scripts or previously used audit/git commands;
  - matrix/checklist wording does not turn relationships into proof or evidence artifacts;
  - current coverage stays derived from real Project data.

## Relationship Coverage

Project -> Skill:

- 6 required Project records currently have `relatedSkillSlugs`.
- No Project or Skill catalog entries were changed.

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
- `mcp-builder` -> `memorybridge-mcp`, `repolens-rag`
- `vibe-coding-review` -> `insightcanvas-agent`, `repolens-rag`, `bug-hunter-replay`, `vibe-coding-review`, `loopengineering`

## Proof Boundary

The checklist, relationship matrix, Related skills, and Related projects remain maintenance, navigation, and portfolio-context surfaces only. They are not evidence artifacts, proof that a project shipped, proof that a Skill was used, or justification for adding unverified URLs.

## Validation

- `npm ci --dry-run`: passed.
- `npm run test`: passed, 37/37 tests.
- `npm run lint`: passed.
- `npm run build`: passed, 44 static pages generated.
- `npm run verify:static-output`: passed.
- `npx --yes npm@10.9.8 audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `npx npm@latest audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `git diff --check`: passed.

Local smoke:

- Static HTTP smoke returned 200 for `/`, `/en/skills/frontend-design/`, and `/en/projects/insightcanvas-agent/`.
- Browser smoke confirmed `/en/skills/frontend-design/` still renders Related projects, shows `Project evidence status` and `Project record updated`, and can navigate to `/en/projects/insightcanvas-agent/`.
- Browser network logs included known Next static export RSC `.txt` prefetch 404s; no page error or non-prefetch failure was observed.

## Known Caveats

- Tests can verify slug resolution, route helper references, command accuracy, and proof-boundary wording. Semantic fit of a Project-Skill relationship remains a human review responsibility.
- Future edits to `relatedSkillSlugs` should update `docs/relationship-matrix.md`, `docs/relationship-review-checklist.md` when needed, and `scripts/verify-static-output.mjs` in the same phase if static output expectations change.
- Local static export browser navigation can produce known Next static export RSC `.txt` prefetch 404s depending on the server. Treat those separately from real app route failures.

## Phase 29 Suggestions

- Run a release review for Phase 28 only after separate approval.
- Consider adding a small PR-template checkbox for relationship edits if this repository starts using pull requests for routine content maintenance.
- Keep relationship visualization, filtering, or broader IA changes for a separate product phase.
