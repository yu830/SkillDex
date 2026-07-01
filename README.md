# SkillDex

SkillDex is a static AI Skills search and ecosystem index. It presents structured Skill and Project cards with compatibility notes, tags, risk levels, safety notes, and portfolio project entries.

The first MVP is intentionally local-first and static. It does not execute skills, store accounts, store API keys, provide login, or claim official certification.

## Quick Start

```bash
npm install
npm run dev
```

Build and test:

```bash
npm run test
npm run build
```

## Search And Filter URLs

Search and filter state is synchronized to the URL, so filtered views can be refreshed or shared without losing state.

Supported query parameters:

- `query`: search text for names, summaries, tags, and tools.
- `category`: one Skill category.
- `risk`: one risk level.
- `tags`: repeated tag values, for example `?tags=workflow&tags=testing`.
- `tools`: repeated compatible tool values, for example `?tools=Codex&tools=Claude+Code`.

Filter groups combine conservatively: category, risk, tags, tools, and search text must all match. Within the `tags` and `tools` groups, selecting multiple values means a card may match any selected value in that group. Project cards participate in search, tag, and compatible-tool filters; category and risk filters remain Skill-only.

## Data Model

Skill data lives in `src/data/skills.json`. Project data lives in `src/data/projects.json`. Shared TypeScript types and lightweight required-field checks live in `src/data/schema.ts`.

Each Skill card should include:

- `id`: stable, unique slug.
- `name`: display name.
- `category`: one of the categories defined in `schema.ts`.
- `summary`: short, honest description.
- `tools`: compatible tools such as `Codex`, `Claude Code`, `GitHub`, or `Vercel`.
- `tags`: searchable tags.
- `risk_level`: `low`, `medium`, or `high`.
- `license`: license label, if known.
- `repo`: repository URL, or an empty string when not confirmed.
- `safety_notes`: concrete limitations or review notes.

Each Project card should include:

- `id`: stable, unique slug.
- `name`: display name.
- `type`: always `project`.
- `summary`: short, conservative project positioning.
- `status`: `draft`, `local`, `published`, or `archived`.
- `tags`: searchable project tags.
- `tools`: project tool surface tags.
- `links`: `repo`, `demo`, `docs`, and `caseStudy` URLs, or empty strings when not confirmed.
- `evidence`: short audit notes such as `local prototype`, `repo link TBD`, or `demo TBD`.
  Prefer concrete artifact paths, commits, screenshots, or verification records when they exist.
- `highlights`: 2-3 concrete capability points.
- `updated_at`: maintenance date in `YYYY-MM-DD` format.

## Adding A Skill

1. Add one object to `src/data/skills.json`.
2. Use a unique `id`; run `npm run test` to catch duplicates.
3. Keep claims evidence-based. If a link is not confirmed, leave it as an empty string; the UI renders it as `TBD`.
4. Add at least one safety note that explains scope, risk, or review needs.

## Adding A Project

1. Add one object to `src/data/projects.json`.
2. Use `published` only when a real public repo, demo, docs, or case study link exists.
3. Use `local` or `draft` for in-progress work and avoid production claims until evidence exists.
4. Leave `links.repo`, `links.demo`, `links.docs`, or `links.caseStudy` blank until the link is real; the UI renders missing links as `TBD`.
5. Keep `evidence` and `highlights` specific and audit-friendly, not marketing copy.
6. If a project has no public artifact yet, record the gap as `TBD` instead of implying proof.

## Current Scope

- Static Vite + React + TypeScript site.
- Search across names, summaries, tags, and tools.
- Filters for category, multiple tags, risk level, and multiple compatible tools.
- URL-shareable filter state without a routing framework.
- Skill and Project card sections with lightweight same-page Project details.
- Conservative visual style using Yu Serif/system serif fallbacks.

## Deployment

The confirmed GitHub repository is `https://github.com/yu830/SkillDex`.

GitHub Pages deployment is prepared but not claimed as live:

- Vite is configured with `base: '/SkillDex/'` for the expected project-site URL.
- `.github/workflows/deploy-pages.yml` builds and deploys the `dist` artifact.
- The workflow runs only on `main` pushes and manual `workflow_dispatch`, not on feature branch pushes.
- Expected URL after merging to `main` and enabling Pages from GitHub Actions: `https://yu830.github.io/SkillDex/`.

Before expecting a live page, enable GitHub Pages with GitHub Actions as the publishing source in repository settings. Do not treat the expected URL as verified until a `main` deployment completes and the URL returns HTTP 200.
