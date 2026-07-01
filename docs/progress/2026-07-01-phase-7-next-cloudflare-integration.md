# Phase 7 - Next.js Cloudflare Integration Audit

Date: 2026-07-01

## Goal

Respect `origin/main` as the canonical Next.js SkillDex application and selectively integrate only compatible Phase 4 outcomes. This phase must not replace the Next.js app with the unrelated-history Vite implementation, introduce a second frontend, modify `main`, or deploy production.

## Branch And Baseline

- Branch created from `origin/main`: `codex/skilldex-phase-7-next-cloudflare-integration`
- Baseline commit: `7d0500f29695257bbc24b4010ffe2c49b67f940b`
- Main classification: Case C - existing SkillDex implementation with a different stack
- Current stack: Next.js App Router, TypeScript, Tailwind CSS, static Skill catalog in `src/data/skills.ts`
- Production deploy status: not deployed in this phase
- Public production URL status from prior phases: `https://skilldex.pages.dev/` was still HTTP 404 and was not re-deployed here

## Next App Audit

The current `origin/main` app is a real Next.js SkillDex app, not an empty repository or placeholder.

Observed structure:

- Governance files: `AGENTS.md`, `CLAUDE.md`, `LICENSE`, `CHANGELOG.md`
- Package scripts: `dev`, `build`, `start`, `lint`, `test`
- Framework versions: Next.js `16.2.6`, React `19.2.4`
- Next config: `next.config.ts` only sets `turbopack.root = process.cwd()`
- App routes:
  - `/` redirects to `/en`
  - `/[locale]`
  - `/[locale]/about`
  - `/[locale]/skills`
  - `/[locale]/skills/[slug]`
- Data model:
  - `src/types/skill.ts`
  - `src/data/skills.ts`
  - `src/lib/skills.ts`
- Tests:
  - `tests/routes.test.ts`
  - `tests/skills.test.ts`
  - `tests/style.test.ts`
- No tracked `.github/workflows` directory on `origin/main`
- No Vite artifacts present on this branch: no `vite.config.ts`, root `index.html`, `src/main.tsx`, `src/App.tsx`, or Vitest setup

## Cloudflare Deployment Findings

Cloudflare's current documentation distinguishes two paths for Next.js:

- For full Next.js applications, Cloudflare documents deployment through Workers using the OpenNext adapter.
- For Cloudflare Pages static hosting, Cloudflare documents a static export path only when the Next.js app is explicitly configured for static export and emits `out`.

This repository currently runs `next build` and does not configure `output: "export"` or OpenNext. Phase 4's Vite workflow assumed `dist`, which is not valid for this Next.js app.

Decision:

- Do not copy the Phase 4 Vite Cloudflare workflow.
- Do not add a Cloudflare production deploy workflow yet.
- Do not add `@opennextjs/cloudflare`, Wrangler config, or static export settings while the baseline audit gate is failing.
- Treat Cloudflare deployment as a Phase 8 decision after dependency audit remediation.

References checked:

- Cloudflare Workers Next.js guide: `https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/`
- Cloudflare Pages static Next.js guide: `https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/`
- OpenNext Cloudflare guide: `https://opennext.js.org/cloudflare/get-started`

## Validation Results

Commands run on the Phase 7 branch:

```powershell
git fetch origin --prune
git switch -c codex/skilldex-phase-7-next-cloudflare-integration origin/main
npm install
npm run test
npm run lint
npm run build
npm audit --audit-level=moderate
npm ls @babel/core js-yaml postcss next
git diff --check
git status --short --branch
git log --oneline -5
```

Results:

- `npm install`: completed; no `package.json` or `package-lock.json` diff
- `npm run test`: passed, 21 tests
- `npm run lint`: passed
- `npm run build`: passed; generated 20 static pages using Next.js 16.2.6
- `npm audit --audit-level=moderate`: failed
- `npm ls @babel/core js-yaml postcss next`: identified the vulnerable dependency chains
- `git diff --check`: passed

Audit findings:

- `@babel/core <=7.29.0`: arbitrary file read advisory; present via `eslint-config-next -> eslint-plugin-react-hooks`
- `js-yaml 4.0.0 - 4.1.1`: moderate DoS advisory; present via `eslint -> @eslint/eslintrc`
- `postcss <8.5.10`: moderate XSS advisory; present under `next@16.2.6` as `next/node_modules/postcss@8.4.31`

Because the required baseline audit failed, this phase stopped before schema, workflow, or deployment changes.

## Integration Decision

Selected path: stop at audit and repair plan.

Reason:

- The existing Next app builds and tests successfully, but the required moderate-level dependency audit fails.
- The Phase 7 instructions require baseline build/test/audit to pass before adding deployment config or schema/data changes.
- Adding Cloudflare workflow or adapter configuration on a failing baseline would make the production path harder to review.
- Porting Phase 4's evidence schema is compatible in principle, but should be done after the dependency audit gate is clear.

What was not changed:

- No `src/**` files changed.
- No `package.json` or lockfile dependency changes.
- No `next.config.ts` changes.
- No Vite files introduced.
- No `.github/workflows` added.
- No Cloudflare deploy executed.
- No production URL claim made.

## Evidence Schema Fit For Later

The lowest-risk evidence model path is a separate static module inside the existing Next.js app, for example:

- `src/types/projectEvidence.ts`
- `src/data/projectEvidence.ts`
- `src/lib/projectEvidence.ts`
- `tests/projectEvidence.test.ts`

This would keep `src/data/skills.ts` as the canonical Skill catalog and avoid a second frontend, runtime data scan, database, API route, or Vite data source.

Required fields can follow the Phase 4 evidence model:

- `status`
- `links`
- `evidence`
- `highlights`
- `updatedAt`

Missing links must stay explicit as `TBD` or `null`, and no repo/demo/docs link should be invented.

## Known Gaps

- `npm audit --audit-level=moderate` currently fails on the Next.js main baseline.
- Cloudflare production remains undeployed.
- No Cloudflare workflow is present for the Next app.
- No OpenNext or static export choice has been made.
- Phase 4 preview URLs came from the unrelated Vite branch and are not production proof for the Next app.
- Project evidence schema has not yet been added to the Next app.

## Phase 8 Recommendation

1. Resolve or explicitly risk-accept the moderate audit findings on the Next.js baseline.
2. Re-run `npm install`, `npm run test`, `npm run lint`, `npm run build`, and `npm audit --audit-level=moderate`.
3. Choose one Cloudflare deployment path:
   - OpenNext on Cloudflare Workers for full Next.js compatibility; or
   - Next static export to Cloudflare Pages only if `output: "export"` is validated and acceptable.
4. Add the project evidence schema as a separate static module after the audit gate passes.
5. Only after the Next app has a verified deploy path should a production release phase deploy and verify `https://skilldex.pages.dev/` or the chosen Cloudflare hostname.
