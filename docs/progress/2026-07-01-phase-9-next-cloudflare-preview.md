# Phase 9 - Next.js Cloudflare Preview Path Validation

Date: 2026-07-01

## Goal

Validate whether the existing Next.js SkillDex application can be safely deployed to Cloudflare Pages as a static export, without returning to the earlier Vite implementation, changing the catalog model, adding evidence schema, or deploying production.

This phase does not modify `main`, does not deploy `https://skilldex.pages.dev/`, and does not introduce OpenNext or Workers configuration.

## Starting Point

- Created from: `origin/codex/skilldex-phase-8-audit-remediation`
- Working branch: `codex/skilldex-phase-9-next-cloudflare-preview`
- Phase 8 baseline commit: `24f837a Remediate dependency audit gate`
- Current app: Next.js App Router with static catalog data in `src/data/skills.ts`

## Baseline Verification

Baseline commands:

```powershell
git fetch origin --prune
npm run test
npm run lint
npm run build
npm audit --audit-level=moderate
```

Results:

- `npm run test`: passed, 21 tests
- `npm run lint`: passed
- `npm run build`: passed, Next.js 16.2.6 generated 20 static/SSG routes
- Initial `npm audit --audit-level=moderate`: intermittently returned npm audit endpoint 400 with `Invalid package tree`
- `npm audit --package-lock-only`: passed, 0 vulnerabilities
- `npm audit --omit=dev`: passed, 0 vulnerabilities
- `npm ls @babel/core js-yaml postcss next eslint eslint-config-next --all`: confirmed Phase 8 overrides resolved to safe versions
- `npm prune`: removed the invalid-tree audit state and reported 0 vulnerabilities
- Final `npm audit --audit-level=moderate`: passed, 0 vulnerabilities

The audit interruption was local `node_modules` state, not a new vulnerability or lockfile change.

## Path Decision

Selected path: **Path S - Static Export + Cloudflare Pages preview**.

Evidence:

- Cloudflare Pages static Next.js guidance supports static export projects with build output directory `out`.
- Cloudflare Workers/OpenNext remains the appropriate route for full-stack or SSR Next.js features, but this app currently does not require them.
- Next.js static export is enabled through `output: "export"` and emits `out/` from `next build`.
- Route scan found no API routes, route handlers, middleware/proxy, cookies, headers, server actions, runtime fetch dependency, ISR, or `next/image` default optimization.
- Locale routes already enumerate English and Chinese through `generateStaticParams()` and `dynamicParams = false`.
- Skill detail routes enumerate locale/slug pairs through `generateStaticParams()` and now explicitly set `dynamicParams = false`.
- The root route no longer depends on a runtime `redirect()` and now renders a static-compatible `/en/` fallback.

Path W was not selected because OpenNext/Workers would add deployment complexity for server-only features the current app does not use.

## Changes Made

- `next.config.ts`
  - Added `output: "export"` so `next build` emits `out/`.
  - Added `trailingSlash: true` so static hosts serve nested routes with directory `index.html` files.
- `src/app/page.tsx`
  - Replaced the server redirect with a static-compatible root page containing a meta refresh and visible `/en/` link.
- `src/app/[locale]/skills/[slug]/page.tsx`
  - Added `dynamicParams = false` for explicit static export compatibility.
- `tests/routes.test.ts`
  - Updated root-route assertions for the static fallback.
  - Added a detail-route assertion for `dynamicParams = false`.
- `.github/workflows/deploy-cloudflare-pages.yml`
  - Added a prepared Cloudflare Pages workflow using GitHub Secrets placeholders.
  - Trigger scope is `main` push and `workflow_dispatch`, with a job guard so deployment only runs on `refs/heads/main`.
- `README.md`
  - Documented Cloudflare Pages as the static deployment target.
  - Documented build command `npm run build`, output directory `out`, manual preview deployment, required GitHub Secrets, and the production verification boundary.

No Vite files, catalog data, schema files, app feature changes, secrets, `.env`, `.dev.vars`, `.next`, or `out` artifacts were committed.

## Static Export Verification

Commands:

```powershell
npm run build
Test-Path out/index.html
Test-Path out/en/index.html
Test-Path out/zh/index.html
Test-Path out/en/skills/playwright/index.html
rg -n '/SkillDex|NEXT_REDIRECT|__next_error__' out/index.html out/en/index.html out/zh/index.html
git check-ignore -v out out/index.html .next
```

Results:

- `out/index.html`: present
- `out/en/index.html`: present
- `out/zh/index.html`: present
- `out/en/skills/playwright/index.html`: present
- No `/SkillDex`, `NEXT_REDIRECT`, or `__next_error__` markers in checked export HTML
- `.next/` and `out/` are ignored by `.gitignore`

## Local Static Smoke Test

Command:

```powershell
python -m http.server 4179 --directory out
```

HTTP checks:

- `http://127.0.0.1:4179/`: 200
- `http://127.0.0.1:4179/en/`: 200
- `http://127.0.0.1:4179/zh/`: 200
- `http://127.0.0.1:4179/en/about/`: 200
- `http://127.0.0.1:4179/zh/about/`: 200
- `http://127.0.0.1:4179/en/skills/`: 200
- `http://127.0.0.1:4179/en/skills/playwright/`: 200
- `http://127.0.0.1:4179/zh/skills/frontend-design/`: 200

## Cloudflare Preview Deployment

Wrangler state:

```powershell
npx wrangler --version
npx wrangler pages project list --json
```

Results:

- Wrangler version: `4.106.0`
- Existing Cloudflare Pages project found: `skilldex`
- Production URL remains out of scope for this phase.

Preview command:

```powershell
npx wrangler pages deploy out --project-name skilldex --branch codex/skilldex-phase-9-next-cloudflare-preview
```

Preview URLs verified during branch validation:

- Unique preview URL: `https://b0799537.skilldex.pages.dev/` - HTTP 200
- Branch alias URL: `https://codex-skilldex-phase-9-next.skilldex.pages.dev/` - HTTP 200
- Branch alias `/en/`: HTTP 200
- Branch alias `/en/skills/playwright/`: HTTP 200

Because the first preview deploy happened before the final commit, the branch should be redeployed from the final commit after commit and push. The branch alias is the stable review URL; the final unique URL is recorded in the Phase 9 handoff.

## Production Status

Production was not deployed.

`https://skilldex.pages.dev/` should not be claimed live in this phase. Production deployment remains a later `main` release task after review and merge.

## Known Gaps

- The Cloudflare workflow is prepared but has not run from `main`.
- Production URL is not verified and remains outside Phase 9.
- The static export path depends on keeping the app free of server-only Next.js features.
- If future work adds API routes, middleware/proxy, request headers/cookies, server actions, runtime redirects, ISR, or image optimization requirements, the deployment path must be re-evaluated and likely moved to Cloudflare Workers/OpenNext.
- Project evidence schema migration remains a separate future phase.

## Phase 10 Recommendations

1. Review and merge the Phase 9 static export branch into the main integration path only if production should use Cloudflare Pages static export.
2. Run the Cloudflare workflow from `main` only after GitHub Secrets are configured and the release is approved.
3. Execute a separate production deployment phase that verifies `https://skilldex.pages.dev/` with HTTP 200.
4. Keep evidence schema migration separate from deployment work.
5. Add a CI check for static export artifacts if production remains on Cloudflare Pages static export.
