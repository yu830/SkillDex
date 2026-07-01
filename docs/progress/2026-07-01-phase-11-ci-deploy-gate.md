# Phase 11 - CI and GitHub Actions Deploy Gate Hardening

Date: 2026-07-01

## Goal

Harden the GitHub Actions validation and deploy gate after the Phase 10 production release, without changing product UI, routes, catalog data, schema, or production deployment state.

Production baseline from Phase 10:

- Public URL: `https://skilldex.pages.dev/`
- Production unique URL: `https://257cbead.skilldex.pages.dev/`
- Production HTTP checks passed for `/`, `/en/`, and `/en/skills/playwright/`
- `origin/main`: `13e714cfd776787071e038b4847b9d62d1bd6db9`

## Baseline Audit

Started from `origin/main` and created:

```powershell
git switch -c codex/skilldex-phase-11-ci-deploy-gate origin/main
```

GitHub Actions state:

```powershell
gh run list --repo yu830/SkillDex --limit 10
gh run view 28524145024 --repo yu830/SkillDex --log-failed
```

Latest failed workflow:

- Workflow: `Deploy Cloudflare Pages`
- Branch: `main`
- Event: `push`
- Failed step: `Run tests`
- Root cause:

```text
node: bad option: --experimental-strip-types
```

The workflow used Node 20, while the project test script is:

```json
"test": "node --test --experimental-strip-types tests/*.test.ts"
```

Local Node check:

- `node --version`: `v22.20.0`
- `node --test --experimental-strip-types tests/routes.test.ts`: passed, 5 route tests

Secrets state:

```powershell
gh secret list --repo yu830/SkillDex
```

Result: no repository secrets were listed. The automatic deploy job still requires:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

No real secrets were requested, stored, or committed.

## Changes Made

- `.github/workflows/deploy-cloudflare-pages.yml`
  - Changed Actions Node version from `20` to `22`.
  - Split workflow into `validate` and `deploy` jobs.
  - `validate` runs install, test, lint, audit, build, and static export verification.
  - `deploy` depends on `validate`, runs only on `push` to `refs/heads/main`, rebuilds static output, verifies it, then checks Cloudflare secrets before deploying.
  - `workflow_dispatch` is validation-only and does not deploy production.
  - If secrets are missing on `main`, the deploy job fails with a clear error instead of silently succeeding.
- `package.json`
  - Added `verify:static-output`.
  - Added `engines.node >=22.6.0` to make the test-runtime requirement explicit.
- `scripts/verify-static-output.mjs`
  - Verifies required static export files exist across root, English, Chinese, list, about, and deep-link pages.
  - Rejects static export error markers and generated asset/link URLs that use the old `/SkillDex/` GitHub Pages base path.
- `.gitignore`
  - Explicitly ignores `.dev.vars` and `.wrangler/`.
- `README.md`
  - Documents Node 22 CI requirement.
  - Documents validation commands and static output check.
  - Clarifies Cloudflare secrets and deploy-job behavior.
  - Aligns route examples with trailing slash static export output.

## Local Validation

Required validation commands for this phase:

```powershell
npm run test
npm run lint
npm run build
npm audit --audit-level=moderate
npm run verify:static-output
git diff --check
git status
git log --oneline -5
```

Results are recorded in the final Phase 11 handoff after the commands are run.

Local results:

- `npm run test`: passed, 21 tests
- `npm run lint`: passed
- `npm audit --audit-level=moderate`: passed, 0 vulnerabilities
- `npm run build`: passed, generated 20 static/SSG routes and `out/`
- `npm run verify:static-output`: passed, required static export files verified
- `git diff --check`: passed
- `https://skilldex.pages.dev/`: HTTP 200 with SkillDex content

Generated `.next/`, `.wrangler/`, and `out/` directories remained ignored and were not staged.

## GitHub Actions Verification

The workflow can be manually triggered on the Phase 11 branch with:

```powershell
gh workflow run deploy-cloudflare-pages.yml --ref codex/skilldex-phase-11-ci-deploy-gate
```

Expected behavior on the Phase 11 branch:

- `validate` job runs.
- `deploy` job is skipped because the ref is not `refs/heads/main`.
- No Cloudflare production deploy occurs.

Expected behavior for manual `workflow_dispatch` on any ref:

- `validate` job runs.
- `deploy` job is skipped because deployment is restricted to `push` on `main`.
- No Cloudflare production deploy occurs.

Production deploy remains out of scope for this phase.

## Known Gaps

- Cloudflare GitHub Secrets are not configured yet.
- The `main` deploy job will fail clearly if secrets are missing.
- Production remains live from Phase 10, but Phase 11 does not redeploy production.
- Future server-only Next.js features would still require re-evaluating the static export path.

## Phase 12 Recommendations

1. Configure `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as GitHub repository secrets.
2. Re-run the workflow from `main` only after reviewing the deploy gate and secrets.
3. Consider adding a branch protection rule requiring the `validate` job before merge.
4. Keep product evidence schema migration as a separate phase.
