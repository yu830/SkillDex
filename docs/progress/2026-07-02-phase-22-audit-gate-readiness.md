# Phase 22 - Audit Gate Readiness

## Goal

Stabilize the release-readiness audit gate after Phase 21 exposed a local npm audit inconsistency. This phase does not release to `main` and does not trigger production deployment.

## Baseline

- Phase 21 branch: `origin/codex/skilldex-phase-21-project-skill-links`
- Phase 21 commit: `7808dc347095efca249a74be74ac78f224738d4d`
- `origin/main`: `d5a87448016edaccd570fc683c5e9b8a081f7938`
- Ancestry: `origin/main` is an ancestor of Phase 21.

## Local Toolchain

- Local Node: `v22.20.0`
- Local npm: `10.9.3`
- Registry: `https://registry.npmjs.org/`
- `npm ls --depth=0`: dependency tree exits successfully, but local `node_modules` can show extraneous optional wasm packages from the Tailwind/oxide stack.

## Audit Matrix

| Command | Result | Interpretation |
| --- | --- | --- |
| `npm audit --audit-level=moderate` with local npm 10.9.3 | Failed in this phase with `Invalid package tree` from npm's retiring quick audit endpoint. It also passed once during subagent testing, showing local instability. | Local npm/tooling endpoint inconsistency, not a confirmed vulnerability report. |
| `npm audit --audit-level=moderate --json` with local npm 10.9.3 | Failed in the main run with the same quick endpoint error; a read-only subagent observed a 0-vulnerability pass in a separate run. | Same instability as the plain local npm command. |
| `npx --yes npm@10.9.8 audit --audit-level=moderate` | Passed, 0 vulnerabilities. | CI-parity audit command for local release readiness because GitHub Actions currently uses npm 10.9.8. |
| `npx --yes npm@10.9.8 audit --audit-level=moderate --json` | Passed, 0 vulnerabilities. | Structured CI-parity diagnostic result. |
| `npx npm@latest audit --audit-level=moderate` | Passed once with 0 vulnerabilities; another concurrent run hit a registry `socket hang up`; final validation should rerun it as diagnostic evidence. | Useful comparison, but not the canonical release gate. |

## GitHub Actions Audit Gate

The current workflow remains `.github/workflows/deploy-cloudflare-pages.yml` and still runs:

- `npm ci`
- `npm run test`
- `npm run lint`
- `npm audit --audit-level=moderate`
- `npm run build`
- `npm run verify:static-output`

Latest inspected main run:

- Run: `https://github.com/yu830/SkillDex/actions/runs/28592269535`
- Head SHA: `d5a87448016edaccd570fc683c5e9b8a081f7938`
- Validate job: success
- Deploy job: success
- Node/npm in validate job: Node `v22.23.1`, npm `10.9.8`
- Audit step: `npm audit --audit-level=moderate`, passed with `found 0 vulnerabilities`

## Decision

Keep the workflow audit gate unchanged. The canonical release gate remains GitHub Actions validate with Node 22 and `npm audit --audit-level=moderate`.

For local release-readiness diagnosis, use the CI-parity command:

```bash
npx --yes npm@10.9.8 audit --audit-level=moderate
```

This avoids changing Cloudflare deployment semantics and avoids lockfile or dependency churn. `npx npm@latest audit --audit-level=moderate` remains a secondary diagnostic command, not the release gate.

## Changes

- Updated `README.md` with CI-parity audit guidance.
- Added this Phase 22 readiness record.

No changes were made to:

- `package.json` scripts
- `package-lock.json`
- `.github/workflows/*`
- product UI/routes/data
- Cloudflare deployment behavior

## Validation

- `npm ci --dry-run`: passed.
- `npm run test`: passed, 33/33 tests.
- `npm run lint`: passed.
- `npm run build`: passed, 44 static pages generated.
- `npm run verify:static-output`: passed.
- `npx --yes npm@10.9.8 audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `npx npm@latest audit --audit-level=moderate`: passed, 0 vulnerabilities in the final sequential validation run.
- `git diff --check`: passed.
- `git status`: pending final commit check.

HTTP/browser smoke was not repeated in Phase 22 because the phase only changes documentation and audit gate guidance, not product code or static output behavior.

## Release Readiness

Ready for Phase 23 only if final validation passes with the CI-parity audit command and the diagnostic `npx npm@latest audit` result is either successful or clearly identified as a transient registry/network failure.

Phase 23 should perform the release review for Phase 21/22, fast-forward `main` only after all gates pass, monitor GitHub Actions validate/deploy, and verify production URLs.
