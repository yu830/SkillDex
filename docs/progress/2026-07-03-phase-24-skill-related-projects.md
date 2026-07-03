# Phase 24 - Skill Related Projects

## Goal

Add reverse navigation from Skill detail pages to related Project detail pages by deriving Skill -> Project links from existing Project `relatedSkillSlugs`.

This phase does not release to `main`, does not trigger production deployment, and does not add new Skill or Project catalog entries.

## Baseline

- Starting branch: `origin/codex/skilldex-phase-23-project-skill-release-verification`
- Production baseline before this phase: `origin/main` at `9a1c9465a81e3e88ad5e94c1d4dd8c895730124d`
- Phase 23 record head: `1ddaf9cee806704a68d4f090adfb8ae21c6b4a81`
- Branch created: `codex/skilldex-phase-24-skill-related-projects`
- Ancestry gate: `origin/main` is an ancestor of the Phase 23 record branch.

## Implementation

- Added `getProjectsByRelatedSkillSlug(skillSlug)` in `src/lib/projects.ts`.
- Rendered a conditional Related projects section on Skill detail pages.
- Kept links locale-aware through `getProjectPath(locale, project.slug)`.
- Kept the section as navigation and portfolio context, not evidence proof.
- Left Skill and Project catalog entries unchanged.
- Left workflows, Cloudflare configuration, secrets, and `next.config.ts` unchanged.

## Relationship Coverage

The current Project -> Skill data derives reverse links for 8 unique Skill slugs:

- `frontend-design`: `insightcanvas-agent`
- `vibe-coding-review`: `insightcanvas-agent`, `repolens-rag`, `bug-hunter-replay`, `vibe-coding-review`, `loopengineering`
- `mcp-builder`: `memorybridge-mcp`, `repolens-rag`
- `gh-fix-ci`: `bug-hunter-replay`, `vibe-coding-review`, `loopengineering`
- `playwright`: `bug-hunter-replay`, `loopengineering`
- `gh-address-comments`: `vibe-coding-review`, `loopengineering`
- `skill-creator`: `vibe-coding-review`
- `vercel-deploy`: `loopengineering`

Skills without mapped projects simply omit the Related projects section.

## Proof Boundary

Related projects do not prove that a Skill was used, that a project shipped, or that a missing artifact is verified. Project evidence remains the source of truth for proof state. Missing proof still stays as `TBD`, pending, note-style, planned, prototype, or research evidence until a real artifact is verified.

## Validation

- `npm ci --dry-run`: passed.
- `npm run test`: passed, 35/35 tests.
- `npm run lint`: passed.
- `npm run build`: passed, 44 static pages generated.
- `npm run verify:static-output`: passed.
- `npx --yes npm@10.9.8 audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `npx npm@latest audit --audit-level=moderate`: passed, 0 vulnerabilities.
- `git diff --check`: passed; Git reported only existing LF-to-CRLF working-copy warnings.

## Smoke

- Local static HTTP smoke over `out/` returned HTTP 200 for `/`, `/en/skills/frontend-design/`, `/en/skills/vibe-coding-review/`, and `/en/projects/insightcanvas-agent/`.
- Browser smoke through Playwright confirmed:
  - `/en/skills/frontend-design/` shows the Related projects section and proof-boundary copy.
  - The `/en/projects/insightcanvas-agent/` link navigates to the Project detail page.
  - `/en/skills/vibe-coding-review/` shows a Related projects link for `loopengineering`.
  - App issue count was 0.
- Caveat: local static serving produced 14 known Next static export RSC prefetch `.txt` 404s. These were classified separately from app errors.

## Known Caveats

- Relationship tests prove route integrity and reverse lookup behavior, not the semantic quality of each association.
- Local static export browser navigation can produce known Next static export RSC prefetch `.txt` 404s depending on the server; those should be separated from app route failures.

## Phase 25 Suggestions

- Run a release review for Phase 24 and deploy only after a separate approval.
- Add a small editorial review checklist for future `relatedSkillSlugs` changes.
- Consider a relationship matrix view only after the current route foundation has been reviewed.
