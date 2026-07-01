# Phase 8 - Dependency Audit Remediation

Date: 2026-07-01

## Goal

Clear the moderate-level npm audit gate for the existing Next.js SkillDex mainline before any Cloudflare production deployment, Cloudflare workflow work, or project evidence schema migration.

This phase does not deploy production, add Cloudflare workflows, change app UI, change routes, change catalog data, or migrate the Phase 4 evidence schema.

## Starting Branch

- Created from: `origin/codex/skilldex-phase-7-next-cloudflare-integration`
- Working branch: `codex/skilldex-phase-8-audit-remediation`
- Phase 7 baseline commit: `c6846e3 Record Phase 7 Next integration audit`

## Initial Audit Failure

Initial commands:

```powershell
npm audit --json
npm ls @babel/core js-yaml postcss next eslint eslint-config-next --all
npm outdated
npm run test
npm run lint
npm run build
```

Initial audit result:

- `npm audit --json`: failed
- Total vulnerabilities: 4
- Severity: 1 low, 3 moderate
- `npm run test`: passed, 21 tests
- `npm run lint`: passed
- `npm run build`: passed, Next.js generated 20 static/SSG pages

Initial dependency chains:

- `@babel/core@7.29.0`
  - Severity: low
  - Chain: `eslint-config-next -> eslint-plugin-react-hooks -> @babel/core`
  - Advisory: `GHSA-4x5r-pxfx-6jf8`
  - Audit range: `<=7.29.0`
- `js-yaml@4.1.1`
  - Severity: moderate
  - Chain: `eslint -> @eslint/eslintrc -> js-yaml`
  - Advisory: `GHSA-h67p-54hq-rp68`
  - Audit range: `4.0.0 - 4.1.1`
- `postcss@8.4.31`
  - Severity: moderate
  - Chain: `next@16.2.6 -> postcss`
  - Advisory: `GHSA-qx2v-qp2m-jg93`
  - Audit range: `<8.5.10`
- `next@16.2.6`
  - Severity: moderate through the vulnerable nested `postcss`
  - Direct dependency

`npm outdated` showed compatible patch updates for some direct dependencies, including `next@16.2.9` and `eslint-config-next@16.2.9`, but `npm view next@16.2.9 dependencies` still showed `postcss: 8.4.31`. A Next patch update alone would not remediate the PostCSS audit finding.

## Remediation Strategy

No `npm audit fix --force` was run.

The selected remediation was root-level npm `overrides`, scoped as narrowly as practical:

```json
{
  "overrides": {
    "@babel/core": "7.29.7",
    "js-yaml": "4.3.0",
    "postcss": "8.5.16"
  }
}
```

Reasoning:

- `@babel/core@7.29.7` stays on Babel 7 and clears the `<=7.29.0` advisory range.
- `js-yaml@4.3.0` stays on js-yaml 4 and clears the `4.0.0 - 4.1.1` advisory range.
- `postcss@8.5.16` stays on PostCSS 8 and clears the `<8.5.10` advisory range.
- The PostCSS override is global because a narrower `next -> postcss` override produced a safe installed tree but made `npm audit` return `Invalid package tree`; the global override lets Tailwind and Next share the same safe PostCSS version and passes npm's audit tree validation.
- This avoids a Next canary upgrade and avoids a major ESLint/TypeScript/React dependency jump.

Reference notes:

- npm documents `overrides` as the intended mechanism for replacing transitive dependency versions in the dependency tree.
- GitHub advisories identify the affected ranges for the three vulnerable packages.

## Package Changes

Changed files:

- `package.json`
- `package-lock.json`
- `docs/progress/2026-07-01-phase-8-audit-remediation.md`

Package behavior after `npm install`:

- `npm install`: completed and reported `found 0 vulnerabilities`
- `@babel/core`: `7.29.0` -> `7.29.7`
- `js-yaml`: `4.1.1` -> `4.3.0`
- `postcss`: `8.4.31` / `8.5.15` -> `8.5.16`
- Direct Next version remains `16.2.6`
- Direct ESLint version remains `9.39.4`
- Direct `eslint-config-next` version remains `16.2.6`

No app code, route code, catalog data, schema, Cloudflare config, workflow, secret file, `.env`, or `.dev.vars` was added or changed.

## Final Validation

Commands run after remediation:

```powershell
npm install
npm audit --json
npm ls @babel/core js-yaml postcss next eslint eslint-config-next --all
npm run test
npm run lint
npm audit --audit-level=moderate
npm run build
```

Results:

- `npm audit --json`: passed with `0` vulnerabilities
- `npm ls @babel/core js-yaml postcss next eslint eslint-config-next --all`: confirmed all three override targets resolved to safe versions
- `npm run test`: passed, 21 tests
- `npm run lint`: passed
- `npm audit --audit-level=moderate`: passed, `found 0 vulnerabilities`
- `npm run build`: passed, Next.js `16.2.6` generated 20 static/SSG pages

## Cloudflare Production Gate

The dependency audit gate is now clear.

Cloudflare production is still not deployed in this phase. The next production phase still needs to choose and verify a Next.js-compatible Cloudflare deployment path. Phase 7 found that this app currently has neither `output: "export"` for Pages static export nor OpenNext configuration for Workers.

## Known Gaps

- No Cloudflare workflow has been added for the Next.js app.
- No Cloudflare production deployment has been executed.
- `https://skilldex.pages.dev/` should not be claimed live until a later production phase performs and verifies deployment.
- The project evidence schema remains pending.
- The PostCSS remediation depends on an npm override until Next releases a stable direct version that no longer depends on vulnerable nested PostCSS.

## Phase 9 Recommendation

1. Re-run the verification set from a fresh install or CI context.
2. Decide the Cloudflare target for the Next.js app:
   - OpenNext on Cloudflare Workers for full Next.js support; or
   - Cloudflare Pages static export only if `output: "export"` is acceptable and validated.
3. Add only the selected deployment config/workflow.
4. Keep production deployment separate from config work, and verify the real public URL with HTTP 200 before claiming the site is live.
5. After deployment config is stable, migrate the project evidence model as a separate static Next module without touching the Skill catalog source.
