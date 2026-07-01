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

Filter groups combine conservatively: category, risk, tags, tools, and search text must all match. Within the `tags` and `tools` groups, selecting multiple values means a card may match any selected value in that group. Project cards participate in search and tag filters; category, risk, and compatible-tool filters hide Project cards because those fields belong to Skill cards.

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
- `status`: `active`, `building`, `planned`, or `archived`.
- `tags`: searchable project tags.
- `repo`, `demo`, `docs`: URLs, or empty strings when not confirmed.

## Adding A Skill

1. Add one object to `src/data/skills.json`.
2. Use a unique `id`; run `npm run test` to catch duplicates.
3. Keep claims evidence-based. If a link is not confirmed, leave it as an empty string; the UI renders it as `TBD`.
4. Add at least one safety note that explains scope, risk, or review needs.

## Adding A Project

1. Add one object to `src/data/projects.json`.
2. Use `active` only for work that is currently usable or documented.
3. Use `building` for in-progress work and avoid production claims until evidence exists.
4. Leave `repo`, `demo`, or `docs` blank until the link is real; the UI renders missing links as `TBD`.

## Current Scope

- Static Vite + React + TypeScript site.
- Search across names, summaries, tags, and tools.
- Filters for category, multiple tags, risk level, and multiple compatible tools.
- URL-shareable filter state without a routing framework.
- Skill and Project card sections.
- Conservative visual style using Yu Serif/system serif fallbacks.

## Deployment

The confirmed GitHub repository is `https://github.com/yu830/SkillDex`. Deployment can be added later through Vercel or GitHub Pages; no hosted production URL is claimed yet.
