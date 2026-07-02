# SkillDex Data Schema

SkillDex uses static TypeScript data. There is no runtime database, API route, GitHub sync, or local folder scan.

## Skill Records

Canonical Skill records live in `src/data/skills.ts` and use the `Skill` interface in `src/types/skill.ts`.

Each Skill keeps source metadata explicit:

- `source.author`
- `source.repoUrl`
- `source.directoryUrl`
- `source.license`
- optional `source.licenseUrl`

Skills also carry `sourceType`, `toolScopes`, category, status, tags, install guidance, compatibility notes, and review dates.

## Evidence

Evidence is optional on the type, but Phase 17 expects every current Skill entry to include it.

```ts
evidence?: {
  status: 'implemented' | 'prototype' | 'planned' | 'research';
  artifacts?: Array<{
    label: string;
    kind: 'repo' | 'demo' | 'doc' | 'case-study' | 'workflow' | 'benchmark' | 'note';
    href?: string;
    summary?: string;
  }>;
  lastVerified?: string;
}
```

Use `lastVerified` only for records manually checked in the current phase. For Phase 17, the review date is `2026-07-02`.

## Project Evidence

Portfolio project evidence lives in `src/data/projects.ts` and uses `ProjectEvidenceRecord` from `src/types/project.ts`.

Project records include:

- `slug`
- `name`
- `summary`
- `highlights`
- `tags`
- `toolScopes`
- `evidence`
- `updatedAt`

Missing public proof must remain visible as a `TBD` summary or a `note` artifact. Do not fill placeholder URLs.
