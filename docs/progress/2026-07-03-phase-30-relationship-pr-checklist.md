# Phase 30 - Relationship PR Checklist Integration

## Goal

Add a GitHub pull request review surface for relationship edits so future `relatedSkillSlugs`, relationship matrix, docs, and test changes explicitly confirm the existing proof-boundary and validation gates before review.

This phase is repository governance only. It does not release to `main`, does not trigger production deployment, and does not change Skill or Project catalog data.

## Baseline

- Starting branch: `origin/codex/skilldex-phase-29-relationship-checklist-release-verification`
- Production baseline before this phase: `origin/main` at `ef9eba4aece896b86657f189d1342e227d402d7a`
- Phase 29 record head: `e28145edc6813d43270df938df82c7b560108c71`
- Branch created: `codex/skilldex-phase-30-relationship-pr-checklist`
- Ancestry gate: `origin/main` is an ancestor of the Phase 29 record branch.
- Initial diff over `origin/main`: only `docs/progress/2026-07-03-phase-29-relationship-checklist-release-verification.md`.
- Existing `.github` contents before this phase: `.github/workflows/deploy-cloudflare-pages.yml`; no existing pull request template.

## Changes

- Added `.github/pull_request_template.md`.
- Added a Relationship / SkillDex Data Review checklist covering:
  - whether Project `relatedSkillSlugs` changed;
  - whether `docs/relationship-matrix.md` was synchronized when relationship data changes;
  - whether `docs/relationship-review-checklist.md` was used;
  - whether relationship links, matrix rows, and Related projects remain navigation/review context instead of proof or evidence artifacts;
  - required validation commands;
  - secret, `.env*`, `.dev.vars`, Cloudflare config, and workflow safety boundaries.
- Linked the PR template from `docs/relationship-review-checklist.md`.
- Added a light README note pointing pull requests to `.github/pull_request_template.md`.
- Extended `tests/evidence.test.ts` to verify the PR template:
  - exists;
  - references the relationship checklist and matrix docs;
  - uses real `npm run` scripts from `package.json`;
  - includes the CI-parity audit command;
  - keeps proof-boundary and secret-safety wording;
  - avoids misleading proof/evidence phrases.

## Relationship Coverage

No relationship data changed.

Current Project -> Skill coverage remains derived from `src/data/projects.ts`:

- 6 required Project records have `relatedSkillSlugs`.
- 8 Skill slugs currently have related Projects:
  - `frontend-design`
  - `vibe-coding-review`
  - `mcp-builder`
  - `gh-fix-ci`
  - `playwright`
  - `gh-address-comments`
  - `skill-creator`
  - `vercel-deploy`

The PR template is a review aid only. It does not prove semantic fit, project shipment, Skill usage, repository availability, demo status, benchmark results, deployment status, or public proof.

## Validation

- `npm ci --dry-run`: passed.
- `npm run test`: passed, 38/38 tests.
- `npm run lint`: passed.
- `npm run build`: passed, 44 static pages generated.
- `npm run verify:static-output`: passed.
- `npx --yes npm@10.9.8 audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `npx npm@latest audit --audit-level=moderate`: passed, 0 vulnerabilities.

Local smoke:

- Static HTTP smoke returned 200 for `/`, `/en/skills/frontend-design/`, and `/en/projects/insightcanvas-agent/`.
- Browser smoke confirmed `/en/skills/frontend-design/` renders Related projects, shows `Project evidence status` and `Project record updated`, and can navigate to `/en/projects/insightcanvas-agent/`.
- Browser logs included local static-export prefetch/navigation abort noise. The rendered page, labels, and navigation worked.

## Known Caveats

- The PR template reminds reviewers to check relationship semantics, but human review is still required to judge semantic fit.
- Tests verify template shape, command accuracy, route/data linkage, and proof-boundary wording. They do not prove that a future relationship edit is conceptually correct.
- This phase intentionally avoids changes to `.github/workflows/*`, deployment config, secrets, data, UI, and production.

## Phase 31 Suggestions

- Review and release Phase 30 only after separate approval.
- If pull requests become routine, consider a small issue template or maintainer checklist that links to the same relationship review docs.
- Keep product-facing relationship filtering, visualization, or evidence workflow changes for separate phases.
