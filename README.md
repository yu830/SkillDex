# SkillDex

SkillDex is a static Personal AI Skills Hub for browsing and managing a curated library of Claude Code Skills and Codex Skills. It is designed for personal use first, while remaining suitable for public browsing, learning, and copying safe usage prompts.

SkillDex is reference-only: it does not execute Skills, store credentials, scan local files, sync with GitHub, or copy full third-party Skill contents.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Static data in `src/data/skills.ts`
- Manual ownership classification with `sourceType`
- Multi-tool compatibility with `toolScopes`
- Vercel-ready static/SSG deployment

## Routes

English is the default language. The root route redirects to English.

- `/` -> `/en`
- `/en`
- `/en/skills`
- `/en/skills/[slug]`
- `/en/about`
- `/zh`
- `/zh/skills`
- `/zh/skills/[slug]`
- `/zh/about`

The Chinese routes are structurally supported. Chinese content may be partial and can fall back to English where needed.

## Static data policy

The MVP catalog is maintained manually in `src/data/skills.ts`.

Rules for static data:

- Use only real Claude Code or Codex Skills.
- Do not add fake sample Skills.
- Do not add ChatGPT Skills.
- Do not scan local files dynamically.
- Do not fetch or sync Skill entries from GitHub at runtime.
- Do not add API routes or backend data storage for the catalog.
- Keep source metadata structured and explicit: author, repository URL, directory URL, license, and optional license URL.
- Classify user-created Skills as `sourceType: "own"` and other public, bundled, curated, or third-party Skills as `sourceType: "third-party"`.
- Use `toolScopes` for tool compatibility so a Skill can appear under Claude Code, Codex, or both.
- Local Skill folders may be used as manual review candidates, but SkillDex must not scan them at runtime or build time.
- Use stable category IDs and render display labels through the UI helper layer.
- Use `indexedAt` and `lastReviewedAt` for catalog review dates. Do not claim upstream update timestamps unless they were actually fetched and verified.

## Third-party reference-only content policy

Initial Skill entries are third-party reference-only records. SkillDex may show:

- short original summaries
- source-grounded capabilities
- use cases and anti-use cases
- inputs and outputs
- safe example prompts
- GitHub source links
- license metadata
- compatibility information
- installation or usage hints

SkillDex must not show or copy:

- full third-party `SKILL.md` content
- private files
- local source paths
- API keys or account data
- online Skill execution controls

## Adding a new Skill entry safely

Before adding a new entry:

1. Confirm the Skill is for Claude Code or Codex only.
2. Confirm it is a real public or owned Skill, not a fabricated sample.
3. Inspect the upstream source manually.
4. Write original short summaries based on factual source information.
5. Do not copy the full third-party Skill text.
6. Add the entry to `src/data/skills.ts` using the existing `Skill` data model.
7. Use a stable category ID from the existing category union, or update the category type and label mapping deliberately.
8. Add safe example prompts as `{ title, prompt }` objects.
9. Keep install and compatibility information structured.
10. Run the full verification commands before publishing.
11. Choose the correct `sourceType`: `own` for user-created Skills, `third-party` for public, bundled, curated, or third-party Skills.
12. Choose one or more `toolScopes` values so each Skill appears under Claude Code, Codex, or both as appropriate.

Do not add a database, auth system, API routes, GitHub sync, local file scanning, online Skill execution, or ChatGPT Skill support when adding catalog entries.

## Local commands

```bash
npm run dev
npm test
npm run lint
npm run build
```

Use `npm run dev` for local development, then verify with `npm test`, `npm run lint`, and `npm run build` before deployment.

## Vercel deployment

SkillDex is intended to deploy as a standard Next.js project on Vercel. The MVP uses static data and prerendered routes, so no database, server runtime, environment variables, or API keys are required for deployment.
