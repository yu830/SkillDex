# Phase 15 - External Secrets Setup Handoff

Date: 2026-07-02

## Goal

Provide a safe handoff for the external Cloudflare secrets setup required before automatic production deployment can resume. This phase does not merge `main`, trigger a production deploy, set fake secrets, or change product UI, routes, catalog data, schema, or content.

## Current Status

Status: blocked

Reason: the required GitHub repository secrets are still missing, and the local shell does not contain usable Cloudflare secret environment variables.

## Phase 14 Baseline

- Phase 14 blocker branch: `origin/codex/skilldex-phase-14-secrets-required`
- Phase 14 blocker commit: `e07b7db Record Phase 14 secrets requirement`
- Phase 14 conclusion: blocked by missing GitHub repository secrets
- Phase 14 safety boundary: no `main` merge, no `main` push, no production deploy

## Baseline Refs

- `origin/main`: `13e714cfd776787071e038b4847b9d62d1bd6db9`
- `origin/codex/skilldex-phase-11-ci-deploy-gate`: `0d18a203b037f5a32b4469b8dbf7004669be766f`
- `origin/codex/skilldex-phase-14-secrets-required`: `e07b7db42684b0fdb0b77976580b62c3c060abc7`
- `origin/main` is an ancestor of Phase 11: yes

Phase 11 remains eligible for a future fast-forward only after the deployment secrets gate is satisfied.

## Secrets State

Commands:

```powershell
gh secret list --repo yu830/SkillDex
$acct = if ([string]::IsNullOrWhiteSpace($env:CLOUDFLARE_ACCOUNT_ID)) { 'missing' } else { 'present' }
$token = if ([string]::IsNullOrWhiteSpace($env:CLOUDFLARE_API_TOKEN)) { 'missing' } else { 'present' }
```

Result:

- GitHub repository secret `CLOUDFLARE_ACCOUNT_ID`: missing
- GitHub repository secret `CLOUDFLARE_API_TOKEN`: missing
- Local environment variable `CLOUDFLARE_ACCOUNT_ID`: missing
- Local environment variable `CLOUDFLARE_API_TOKEN`: missing
- Secrets set in this phase: no
- Secret values printed, stored, or committed: no

## Production Health Check

Command:

```powershell
curl.exe -I -L https://skilldex.pages.dev/
```

Result:

- `https://skilldex.pages.dev/`: HTTP 200
- This was a read-only check, not a deployment attempt.

## External Setup Required

Configure these two repository secrets for `yu830/SkillDex`.

Option 1: GitHub web UI

1. Open `yu830/SkillDex` on GitHub.
2. Go to Settings -> Secrets and variables -> Actions.
3. Add repository secret `CLOUDFLARE_ACCOUNT_ID`.
4. Add repository secret `CLOUDFLARE_API_TOKEN`.

Option 2: GitHub CLI

Run these commands and enter the values manually when prompted:

```powershell
gh secret set CLOUDFLARE_ACCOUNT_ID --repo yu830/SkillDex
gh secret set CLOUDFLARE_API_TOKEN --repo yu830/SkillDex
```

Do not paste secret values into progress docs, issue comments, pull requests, chat logs, `.env`, `.dev.vars`, or source files.

Cloudflare API token guidance: configure only the Cloudflare Pages deploy permissions required for this repository, following Cloudflare's official least-privilege guidance.

## Phase 16 Resumption Gate

Phase 16 may resume deployment only when all of these conditions are true:

- `gh secret list --repo yu830/SkillDex` lists `CLOUDFLARE_ACCOUNT_ID`.
- `gh secret list --repo yu830/SkillDex` lists `CLOUDFLARE_API_TOKEN`.
- Phase 11 latest head is still `0d18a203b037f5a32b4469b8dbf7004669be766f`, or a newer Phase 11 head has a fresh successful validation run.
- The latest Phase 11 feature-branch run has:
  - `validate`: success
  - `deploy`: skipped
- `origin/main` remains an ancestor of `origin/codex/skilldex-phase-11-ci-deploy-gate`.
- Working tree is clean.
- No generated output, token, `.env`, `.dev.vars`, Cloudflare account metadata, or secret value is staged.

## Phase 16 Validation and Deploy Checklist

When the resumption gate is satisfied:

1. Fetch and recheck refs:
   - `git fetch origin --prune`
   - `git rev-parse origin/main`
   - `git rev-parse origin/codex/skilldex-phase-11-ci-deploy-gate`
   - `git merge-base --is-ancestor origin/main origin/codex/skilldex-phase-11-ci-deploy-gate`
2. Recheck secret names only:
   - `gh secret list --repo yu830/SkillDex`
3. Recheck latest Phase 11 CI evidence:
   - `gh run view 28529697717 --repo yu830/SkillDex --json conclusion,status,url,headSha,headBranch,event,workflowName,jobs`
   - If the head changed, trigger and wait for a new feature-branch workflow run before touching `main`.
4. Fast-forward `main` to Phase 11; do not squash and do not create a merge commit.
5. Run local validation:
   - `npm ci --dry-run`
   - `npm run test`
   - `npm run lint`
   - `npm run build`
   - `npm run verify:static-output`
   - `npm audit --audit-level=moderate`
6. Push `main`.
7. Monitor the resulting `Deploy Cloudflare Pages` workflow on `main`:
   - `validate`: success
   - `deploy`: success
8. Verify production:
   - `https://skilldex.pages.dev/`: HTTP 200
   - `https://skilldex.pages.dev/en/`: HTTP 200
   - `https://skilldex.pages.dev/en/skills/playwright/`: HTTP 200

## Work Not Performed

- `main` was not merged or pushed.
- No production deploy was triggered.
- No GitHub secrets were set.
- No application code, UI, routes, catalog data, schema, content, or workflow files were changed.

## Known Gaps

- Automatic production deploy remains blocked until both GitHub repository secrets are present.
- Branch protection and required status checks remain a separate governance step after deployment automation is stable.
