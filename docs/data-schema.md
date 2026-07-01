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
- `tools`
- `links`
- `evidence`
- `highlights`
- `updated_at`

`status` must be one of:

- `draft`
- `local`
- `published`
- `archived`

`links` must include:

- `repo`
- `demo`
- `docs`
- `caseStudy`

Each link may be an empty string until a real URL is available. The UI renders missing links as `TBD`; do not invent placeholder URLs.

`evidence` should record verifiable state or gaps, such as `local prototype`, `repo link TBD`, or `demo TBD`.
When concrete artifacts exist, prefer paths, commit ids, screenshots, validation logs, or public links. When they do not exist, keep the missing proof visible with `TBD`.

`highlights` should contain 2-3 concrete capability points, not marketing claims.

`updated_at` uses `YYYY-MM-DD` format.

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
- required portfolio project entries;
- Project evidence fields and link honesty rules.
