# Phase 18 Evidence Release Verification

## Goal

Release the Phase 17 evidence schema and credibility layer to `main`, let the existing GitHub Actions workflow deploy Cloudflare Pages production, and verify the public site without adding new product scope.

## Baseline

- Phase 17 branch: `origin/codex/skilldex-phase-17-evidence-schema-content`
- Phase 17 commit: `42fcae72f9e60d397f61062725264872ef96da9e`
- Main before release: `0d18a203b037f5a32b4469b8dbf7004669be766f`
- Main after release: `42fcae72f9e60d397f61062725264872ef96da9e`
- Fast-forward gate: `origin/main` was an ancestor of Phase 17.
- Secret names: `CLOUDFLARE_ACCOUNT_ID` present; `CLOUDFLARE_API_TOKEN` present. No secret values were printed or stored.

## Release Review Gate

- Diff scope contained evidence schema/data/UI/tests/docs only, plus the Phase 16B release record.
- No `.github/workflows/*`, `next.config.ts`, `.env*`, `.dev.vars`, `.next/`, `out/`, token, or secret files changed.
- Phase 16B record entered `main` as part of this evidence release, not as a standalone docs-only deploy trigger.
- Evidence copy keeps missing public proof as `TBD`, pending, planned, prototype, or note-style artifacts rather than presenting unverified links as production proof.

## Local Validation

Run on Phase 17 head before touching `main`:

- `npm ci --dry-run`: passed.
- `npm run test`: passed, 26/26 tests.
- `npm run lint`: passed.
- `npm run build`: passed, Next.js generated 30 static pages.
- `npm run verify:static-output`: passed.
- `npm audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `git diff --check`: passed.

Local static HTTP smoke from `out/` on `127.0.0.1:4187`:

- `/`: HTTP 200.
- `/en/`: HTTP 200.
- `/en/skills/`: HTTP 200.
- `/en/skills/gh-fix-ci/`: HTTP 200.
- `/en/skills/playwright/`: HTTP 200.

Local in-app browser smoke:

- Homepage rendered with `SkillDex`, `Project evidence`, and `InsightCanvas Agent`.
- Skill search for `gh-fix-ci` returned one `GH Fix CI` card with evidence text.
- Console error/warn logs were empty.

## Main Integration

- Strategy: fast-forward only.
- Commands:
  - `git switch main`
  - `git merge --ff-only origin/codex/skilldex-phase-17-evidence-schema-content`
  - `git push origin main`
- Push result: `main` updated from `0d18a20` to `42fcae7`.
- No squash, merge commit, force push, or history rewrite was used.

## GitHub Actions Deploy

- Workflow: `Deploy Cloudflare Pages`
- Run URL: `https://github.com/yu830/SkillDex/actions/runs/28589658855`
- Event: `push`
- Branch: `main`
- Head SHA: `42fcae72f9e60d397f61062725264872ef96da9e`
- Run conclusion: `success`
- `validate` job: `success`
- `deploy` job: `success`
- Cloudflare unique deployment URL: `https://d702ef20.skilldex.pages.dev`
- Non-blocking annotation: GitHub Actions reported Node.js 20 deprecation for upstream action runtimes being forced to Node.js 24. Project validation still ran on the configured Node 22 path.

## Production Verification

HTTP checks:

- `https://skilldex.pages.dev/`: HTTP 200.
- `https://skilldex.pages.dev/en/`: HTTP 200.
- `https://skilldex.pages.dev/en/skills/`: HTTP 200.
- `https://skilldex.pages.dev/en/skills/gh-fix-ci/`: HTTP 200.
- `https://skilldex.pages.dev/en/skills/playwright/`: HTTP 200.
- `https://d702ef20.skilldex.pages.dev/`: HTTP 200.

Content checks:

- `https://skilldex.pages.dev/en/` contains `Project evidence`, `InsightCanvas Agent`, and `SkillDex`.
- `https://skilldex.pages.dev/en/skills/` contains `GH Fix CI` and evidence text.
- `https://skilldex.pages.dev/en/skills/gh-fix-ci/` contains `GH Fix CI`, `Evidence`, and `Source directory`.

Production browser smoke:

- In-app browser production smoke timed out twice and reset the browser automation kernel.
- Temporary standalone Playwright fallback via `npx -p playwright` could not resolve the `playwright` package in the execution context.
- Result: production browser smoke is recorded as unavailable, not passed. HTTP and content smoke covered the public release gate.

## Risks And Follow-Up

- The evidence validator checks shape and approved status/kind values, but future evidence links still require review discipline.
- Project evidence is intentionally conservative; several records remain planned, prototype, research, or pending public artifacts.
- Phase 19 can focus on project detail pages, evidence filtering, or replacing `TBD` placeholders with verified artifacts.
- If the GitHub Actions Node runtime annotation persists, review action versions during a CI-maintenance phase rather than mixing it with product changes.
