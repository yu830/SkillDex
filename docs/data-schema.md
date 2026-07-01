# SkillDex Data Schema

SkillDex uses static JSON data with TypeScript types in `src/data/schema.ts`.

## Skill Cards

Required fields:

- `id`
- `name`
- `category`
- `summary`
- `tools`
- `tags`
- `risk_level`
- `license`
- `repo`
- `safety_notes`

`repo` may be an empty string when a real repository URL has not been confirmed. The UI renders this as `TBD` instead of inventing a link.

## Project Cards

Required fields:

- `id`
- `name`
- `type`
- `summary`
- `status`
- `tags`
- `repo`
- `demo`
- `docs`

`repo`, `demo`, and `docs` may be empty strings until real links are available.

## Validation

Run:

```bash
npm run test
```

The current tests check:

- at least 20 total Skill / Project cards;
- no duplicate ids across both datasets;
- required Skill fields;
- required Project fields;
- required portfolio project entries.
