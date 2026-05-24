# SkillDex Ownership And Tool Scope Design

## Context

SkillDex is a manually maintained static catalog for managing and presenting Skills. It is not intended to scan local folders or synchronize from GitHub at runtime. The current catalog is stored in `src/data/skills.ts`, with routes and filters generated from static data.

The existing model already has `sourceType: "own" | "third-party"`, but the UI does not expose it as a primary browsing concept. The model also has a single `toolScope`, while some Skills, especially `Frontend Design`, should be usable from both Claude Code and Codex.

## Goals

- Add a visible ownership classification: "My skills" for user-created Skills and "Other skills" for public, bundled, curated, or third-party Skills.
- Preserve manual catalog maintenance. No automatic local scan, GitHub sync, database, API route, or backend storage.
- Support Skills that are compatible with multiple tools by replacing the single `toolScope` browsing model with `toolScopes: ToolScope[]`.
- Update `Frontend Design` so it appears under both Claude Code and Codex.
- Add `CHANGELOG.md` as the project log.
- Keep current static generation, search, filters, detail pages, and tests working.

## Non-Goals

- Do not import every locally discovered Skill into the catalog in this change.
- Do not add runtime scanning of `%USERPROFILE%\.codex\skills`, `%USERPROFILE%\.claude\skills`, plugin caches, or GitHub repositories.
- Do not add authentication, accounts, local file access, API routes, or online Skill execution.
- Do not copy full third-party `SKILL.md` content into SkillDex.

## Local Skill Inventory

The local machine currently has these candidate pools for future manual catalog additions:

- Codex local non-system: `frontend-design`, `vibe-coding-review`
- Codex system: `imagegen`, `openai-docs`, `plugin-creator`, `skill-creator`, `skill-installer`
- Agents local: `binance-crypto-strategy-research`, `ilm-alan-frontend-design`
- Claude Code local: `frontend-design`, `guizang-ppt-skill`, `ilm-alan-frontend-design`, `pptx`, `vibe-coding-review`
- Codex bundled plugins: `browser`, `Chrome`
- Codex curated plugins: GitHub, Vercel, Superpowers, HyperFrames, Remotion, and related plugin Skills

This inventory is informational only. The catalog remains curated by hand.

## Data Model

`ToolScope` remains the union of supported tools:

- `claude-code`
- `codex`

Each `Skill` should expose:

- `toolScopes: ToolScope[]`
- `sourceType: "own" | "third-party"`

`toolScope` should be removed from production use. Existing helper functions and components should read `toolScopes`. Tests should prevent accidental reintroduction of single-tool-only behavior.

Ownership display labels:

- `own`: English `My skill`, Chinese localized equivalent of `My skill`
- `third-party`: English `Other skill`, Chinese localized equivalent of `Other skill`

Tool display labels:

- `claude-code`: `Claude Code`
- `codex`: `Codex`

## Filtering And Search

The Skills index should add an ownership filter:

- All ownership
- My skills
- Other skills

Tool filtering should match membership:

- Selecting `Codex` shows every Skill whose `toolScopes` includes `codex`.
- Selecting `Claude Code` shows every Skill whose `toolScopes` includes `claude-code`.
- Selecting all tools preserves the current all-Skills behavior.

Search should include:

- Skill name
- Summary
- Description
- Category label
- All tool labels and tool ids
- Ownership label and `sourceType`
- Source author
- License
- Tags

## UI Changes

Skill cards should show:

- One tag per compatible tool
- Ownership tag: `My skill` or `Other skill`
- Existing status, category, tags, license, and detail link

The detail page should show:

- All compatible tools in the hero tag row
- Ownership in the metadata sidebar
- All compatible tools in the compatibility section
- Existing source metadata and copy actions

The home page can continue using total, tool scopes, categories, and featured cards, but tool summary logic must count from `toolScopes`.

## Documentation And Project Log

`README.md` should be updated to state:

- SkillDex is manually maintained.
- Ownership classification separates user-created Skills from other Skills.
- Multi-tool compatibility is modeled with `toolScopes`.
- The app does not scan local Skill folders or sync catalogs automatically.

`CHANGELOG.md` should be added with an entry dated 2026-05-24:

- Added ownership classification plan and UI support.
- Added multi-tool compatibility support.
- Updated `Frontend Design` to support Claude Code and Codex.
- Recorded that local Skills were inventoried as future manual catalog candidates.

## Testing Strategy

Use test-first changes before production edits:

- Add a failing catalog test proving `frontend-design` has both `claude-code` and `codex` in `toolScopes`.
- Add a failing helper test proving Codex filtering includes `frontend-design`.
- Add a failing helper test proving ownership labels and grouping are available.
- Add a failing UI source test proving `SkillFilter` has an ownership filter and `SkillsExplorer` filters by source type.
- Add a failing documentation/log test proving `CHANGELOG.md` exists and records the 2026-05-24 ownership/tool-scope change.

After implementation, run:

```bash
npm test
npm run lint
npm run build
```

## Rollout

Implement this as one small feature branch or direct update to `main`, depending on the publishing workflow selected after spec approval. Because the repository currently has no open PRs and no GitHub Actions CI, local verification output is required before pushing.

The recommended GitHub update path is:

1. Commit the implementation and documentation changes locally.
2. Push the branch.
3. If working on a branch, open a draft PR; if updating `main` directly is preferred, push only after all verification passes.
