# SkillDex Relationship Review Checklist

Use this checklist before changing any Project `relatedSkillSlugs` value or updating the relationship matrix. This document is a maintenance guardrail only. It is not an evidence artifact, proof that a project shipped, or proof that a Skill was used.

Pull requests should also use `.github/pull_request_template.md`, which reuses these relationship review gates as a short PR review surface.

## Current Review Surface

- Relationship data owner: `src/data/projects.ts`
- Relationship matrix: `docs/relationship-matrix.md`
- Schema notes: `docs/data-schema.md`
- Content rules: `docs/content-guidelines.md`

Current required Project slugs:

- `insightcanvas-agent`
- `memorybridge-mcp`
- `repolens-rag`
- `bug-hunter-replay`
- `vibe-coding-review`
- `loopengineering`

Current derived Skill coverage:

- `frontend-design`
- `vibe-coding-review`
- `mcp-builder`
- `gh-fix-ci`
- `playwright`
- `gh-address-comments`
- `skill-creator`
- `vercel-deploy`

## Before Editing

1. Confirm the Project slug exists in `src/data/projects.ts`.
2. Confirm every Skill slug exists in `src/data/skills.ts`.
3. Confirm the relationship describes navigation or capability context only.
4. Confirm Skill -> Project links remain derived from Project records through `getProjectsByRelatedSkillSlug`.
5. Confirm no `relatedProjectSlugs` field is added to Skill records.
6. Confirm empty reverse relationships stay acceptable; do not add weak links only to make a section appear.

## Add, Remove, Or Stop

Adding a relationship is acceptable when the Project record reasonably helps a reader navigate to a real Skill capability already present in SkillDex.

Removing a relationship is acceptable when the Skill no longer describes the Project context, the link is misleading, or the relationship was only added to fill coverage.

Stop and add a content note or a note-style evidence artifact that says proof is missing when the edit would imply any of the following without independent Project evidence:

- a repository, demo, benchmark, case study, CI result, production deployment, user count, or usage claim;
- a statement that a Project was built with a Skill;
- a statement that a Skill is proven by a Project;
- a claim that missing public proof is now verified.

If public proof is missing, keep it as `TBD`, pending, or a `note` artifact. Do not add placeholder URLs.

## Matrix Sync

When `relatedSkillSlugs` changes:

1. Update `docs/relationship-matrix.md` in the same phase.
2. Keep the Project -> Skill table in the same order as `src/data/projects.ts`.
3. Recompute derived Skill -> Project rows from Project data; do not hand-author a separate ownership model.
4. Keep coverage counts factual. If the count changes from 6 Projects or 8 Skills, record the new value and why.

## Locale-Aware Link Expectations

- Project detail pages link to Skills through `getSkillPath(locale, skill.slug)`.
- Skill detail pages link to Projects through `getProjectPath(locale, project.slug)`.
- English links should resolve under `/en/`.
- Chinese links should resolve under `/zh/`.
- Do not hard-code a single locale into reusable relationship helpers or components.

## Required Validation

Run these commands before publishing relationship edits:

```bash
npm ci --dry-run
npm run test
npm run lint
npm run build
npm run verify:static-output
npx --yes npm@10.9.8 audit --audit-level=moderate
npx npm@latest audit --audit-level=moderate
git diff --check
git status
```

The `npx npm@latest audit --audit-level=moderate` command is diagnostic evidence. The CI-parity audit gate remains `npx --yes npm@10.9.8 audit --audit-level=moderate` unless the workflow is deliberately changed.

## Review Outcome

Before merging a relationship edit, the reviewer should be able to answer:

- Which Project row changed?
- Which Skill reverse row changed?
- Does the matrix match `src/data/projects.ts`?
- Does the UI still describe Related projects as navigation or portfolio context?
- Are evidence artifacts still the only proof surface?
- Did local validation pass?
