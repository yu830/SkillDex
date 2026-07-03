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

Skills also carry `sourceType`, `toolScopes`, category, status, `riskLevel`, tags, install guidance, compatibility notes, and review dates.

`riskLevel` is a required manual classification with one of these values:

- `low`
- `medium`
- `high`

Risk is a catalog-maintenance and usage-caution signal for applying or adapting a Skill. It is not a proof artifact, security certification, production-readiness claim, or substitute for `evidence`.

Use `high` for Skills that involve deployments, credentials, security review, MCP servers, CI, or external systems. Use `medium` for Skills that can materially affect code quality or workflow outcomes. Reserve `low` for bounded documentation, formatting, or other low-impact helpers.

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
- `problem`
- `approach`
- `highlights`
- `nextSteps`
- `tags`
- `toolScopes`
- `relatedSkillSlugs`
- `evidence`
- `updatedAt`

`slug` is the stable ASCII route key for static project detail pages at `/<locale>/projects/<slug>/`. Each project route is generated at build time from `src/data/projects.ts`; there is no API route, database, runtime fetch, GitHub sync, or local folder scan.

`relatedSkillSlugs` maps a project to existing Skill records for navigation and capability context. Every slug must exist in `src/data/skills.ts`, every project should list at least one related Skill, and the relationship must not be treated as evidence proof.

Skill detail pages may show reverse "Related projects" links, but those links are derived from `src/data/projects.ts` by looking up project records whose `relatedSkillSlugs` contain the current Skill slug. Do not add a separate `relatedProjectSlugs` field to Skill records unless the data ownership model is deliberately changed in a future phase.

Reverse related projects are navigation context only. They do not prove that a Skill was used in a project, that a project shipped, or that a missing artifact is verified.

The reviewable relationship matrix lives in `docs/relationship-matrix.md`. Keep it synchronized with `src/data/projects.ts` when `relatedSkillSlugs` changes.

Use `docs/relationship-review-checklist.md` before changing `relatedSkillSlugs`; it records slug, matrix, locale-link, and validation guardrails.

Missing public proof must remain visible as a `TBD` summary or a `note` artifact. Do not fill placeholder URLs.
