# Phase 20 Project Routes Release Verification

## Goal

Release the Phase 19 project evidence index and detail routes to `main`, let the existing GitHub Actions workflow deploy Cloudflare Pages production, and verify the public routes without adding product scope.

## Baseline

- Phase 19 branch: `origin/codex/skilldex-phase-19-project-detail-routes`
- Phase 19 commit: `d5a87448016edaccd570fc683c5e9b8a081f7938`
- Main before release: `42fcae72f9e60d397f61062725264872ef96da9e`
- Main after release: `d5a87448016edaccd570fc683c5e9b8a081f7938`
- Fast-forward gate: `origin/main` was an ancestor of Phase 19.
- Secret names: `CLOUDFLARE_ACCOUNT_ID` present; `CLOUDFLARE_API_TOKEN` present. No secret values were printed or stored.

Phase 19 also carried the Phase 18 release record into `main`; this was expected because Phase 19 was branched from the Phase 18 record branch.

## Release Review Gate

- Diff scope was limited to project detail routes, project data/types/helpers, project card navigation, tests, docs, and the static output verifier.
- No `.github/workflows/*`, `next.config.ts`, `.env*`, `.dev.vars`, `.next/`, `out/`, token, or secret files changed.
- `scripts/verify-static-output.mjs` changed only to verify the new static project route files and was accepted as validation support.
- Six project slugs were ASCII and unique:
  - `insightcanvas-agent`
  - `memorybridge-mcp`
  - `repolens-rag`
  - `bug-hunter-replay`
  - `vibe-coding-review`
  - `loopengineering`
- Project detail copy kept missing proof visible through `TBD`, pending, planned, prototype, research, and note-style language.
- No new external repo, demo, documentation, benchmark, or case-study URLs were invented.
- Non-blocking documentation caveat: the Phase 19 progress note says "localized detail copy", while the records are English-first and rely on existing locale fallback for Chinese. User-facing README already documents the fallback behavior.

## Local Validation

Run on Phase 19 head before touching `main`:

- `npm ci --dry-run`: passed.
- `npm run test`: passed, 31/31 tests.
- `npm run lint`: passed.
- `npm run build`: passed, Next.js generated 44 static pages.
- `npm run verify:static-output`: passed.
- `git diff --check`: passed.

During the first pass, `npm audit --audit-level=moderate` failed because the local `node_modules` tree contained extraneous packages and npm reported `Invalid package tree`. Remediation was local only:

- `npm ci`: passed, rebuilt the local dependency tree, found 0 vulnerabilities.

After the clean install:

- `npm run test`: passed, 31/31 tests.
- `npm run lint`: passed.
- `npm audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `npm run build`: passed, 44 static pages.
- `npm run verify:static-output`: passed.
- `git diff --check`: passed.
- Worktree stayed clean.

## Local Smoke

Local static HTTP smoke from `out/` on `127.0.0.1:4192`:

- `/`: HTTP 200.
- `/en/`: HTTP 200.
- `/en/projects/`: HTTP 200.
- `/en/projects/insightcanvas-agent/`: HTTP 200.
- `/en/projects/loopengineering/`: HTTP 200.
- `/en/skills/gh-fix-ci/`: HTTP 200.

Local in-app browser smoke:

- `/en/projects/` rendered `Project evidence`, `InsightCanvas Agent`, and `LoopEngineering`.
- The `InsightCanvas Agent` card link navigated to `/en/projects/insightcanvas-agent/`.
- The detail page rendered `Evidence artifacts`, `Proof boundary`, `Repository TBD`, and `No verified URL attached`.
- Page console error/warn logs were empty.

## Feature Branch Workflow Refresh

- Workflow: `Deploy Cloudflare Pages`
- Run URL: `https://github.com/yu830/SkillDex/actions/runs/28592209599`
- Event: `workflow_dispatch`
- Branch: `codex/skilldex-phase-19-project-detail-routes`
- Head SHA: `d5a87448016edaccd570fc683c5e9b8a081f7938`
- Run conclusion: `success`
- `validate` job: `success`
- `deploy` job: `skipped`, as expected for non-main workflow dispatch.

## Main Integration

- Strategy: fast-forward only.
- Commands:
  - `git switch main`
  - `git merge --ff-only origin/codex/skilldex-phase-19-project-detail-routes`
  - `git push origin main`
- Push result: `main` updated from `42fcae7` to `d5a8744`.
- No squash, merge commit, force push, or history rewrite was used.

## GitHub Actions Deploy

- Workflow: `Deploy Cloudflare Pages`
- Run URL: `https://github.com/yu830/SkillDex/actions/runs/28592269535`
- Event: `push`
- Branch: `main`
- Head SHA: `d5a87448016edaccd570fc683c5e9b8a081f7938`
- Run conclusion: `success`
- `validate` job: `success`
- `deploy` job: `success`
- Cloudflare unique deployment URL: `https://805dcbef.skilldex.pages.dev`
- Non-blocking annotation: GitHub Actions reported Node.js 20 deprecation for upstream action runtimes being forced to Node.js 24. Project validation still ran on the configured Node 22 path.

## Production Verification

HTTP checks:

- `https://skilldex.pages.dev/`: HTTP 200.
- `https://skilldex.pages.dev/en/`: HTTP 200.
- `https://skilldex.pages.dev/en/projects/`: HTTP 200.
- `https://skilldex.pages.dev/en/projects/insightcanvas-agent/`: HTTP 200.
- `https://skilldex.pages.dev/en/projects/loopengineering/`: HTTP 200.
- `https://skilldex.pages.dev/en/skills/gh-fix-ci/`: HTTP 200.
- `https://805dcbef.skilldex.pages.dev/`: HTTP 200.

Content checks:

- `https://skilldex.pages.dev/en/projects/` contains `Project evidence`, `InsightCanvas Agent`, and `LoopEngineering`.
- `https://skilldex.pages.dev/en/projects/insightcanvas-agent/` contains `Evidence artifacts`, `Proof boundary`, `Repository TBD`, and `No verified URL attached`.
- `https://skilldex.pages.dev/en/projects/loopengineering/` contains `Evidence artifacts`, `Proof boundary`, `Case study TBD`, and `No verified URL attached`.
- `https://skilldex.pages.dev/en/skills/gh-fix-ci/` contains `GH Fix CI` and evidence text.

Production browser smoke:

- Attempted through the in-app browser against `https://skilldex.pages.dev/en/projects/`.
- The browser automation call timed out and reset the browser kernel.
- Result: production browser smoke is recorded as unavailable, not passed. HTTP and content smoke covered the public release gate.

## Risks And Follow-Up

- Several project records intentionally remain pending because public proof links are not yet verified.
- The project detail pages are a foundation only; they do not yet include related skill links or evidence filtering.
- The Phase 19 progress note's "localized detail copy" wording should be tightened in a future docs cleanup if that record is edited again.
- Phase 21 can focus on related-skill navigation, project evidence filters, or replacing `TBD` placeholders with verified artifacts.
