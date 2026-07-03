# SkillDex Relationship Matrix

This document records the current Project <-> Skill relationship layer for editorial review. It is derived from `src/data/projects.ts` and does not create a second data source.

Related Skills and Related Projects are navigation and capability-context links only. They are not evidence artifacts, proof that a project shipped, proof that a Skill was used, or justification for adding external links.

## Source Of Truth

- Project -> Skill relationships live in each Project record's `relatedSkillSlugs` field.
- Skill -> Project relationships are derived by filtering Projects whose `relatedSkillSlugs` include the current Skill slug.
- Do not add `relatedProjectSlugs` to Skill records unless a future phase changes the ownership model.

## Project -> Related Skills

Current coverage: 6 required Project records.

| Project slug | Project | Related Skill slugs |
|---|---|---|
| `insightcanvas-agent` | InsightCanvas Agent | `frontend-design`, `vibe-coding-review` |
| `memorybridge-mcp` | MemoryBridge MCP | `mcp-builder` |
| `repolens-rag` | RepoLens RAG | `vibe-coding-review`, `mcp-builder` |
| `bug-hunter-replay` | Bug Hunter Replay | `gh-fix-ci`, `playwright`, `vibe-coding-review` |
| `vibe-coding-review` | Vibe Coding Review | `vibe-coding-review`, `gh-address-comments`, `gh-fix-ci`, `skill-creator` |
| `loopengineering` | LoopEngineering | `vibe-coding-review`, `gh-address-comments`, `gh-fix-ci`, `playwright`, `vercel-deploy` |

## Derived Skill -> Related Projects

Current coverage: 8 Skill slugs with at least one related Project.

| Skill slug | Related Project slugs |
|---|---|
| `frontend-design` | `insightcanvas-agent` |
| `vibe-coding-review` | `insightcanvas-agent`, `repolens-rag`, `bug-hunter-replay`, `vibe-coding-review`, `loopengineering` |
| `mcp-builder` | `memorybridge-mcp`, `repolens-rag` |
| `gh-fix-ci` | `bug-hunter-replay`, `vibe-coding-review`, `loopengineering` |
| `playwright` | `bug-hunter-replay`, `loopengineering` |
| `gh-address-comments` | `vibe-coding-review`, `loopengineering` |
| `skill-creator` | `vibe-coding-review` |
| `vercel-deploy` | `loopengineering` |

Skills with no related Project omit the Related projects section.

## Review Checklist

Use this checklist before editing any `relatedSkillSlugs` value:

- The Project slug already exists in `src/data/projects.ts`.
- The Skill slug already exists in `src/data/skills.ts`.
- The relationship describes navigation or capability context, not proof.
- The Project evidence record still carries the proof boundary and any missing proof notes.
- No repository, demo, benchmark, production, usage, or case-study claim is added only because a relationship link exists.
- English and Chinese links must resolve through locale-aware helpers such as `getProjectPath(locale, project.slug)` and `getSkillPath(locale, skill.slug)`.
- Empty reverse relationships are allowed; do not add weak relationships only to fill a section.
- Tests should verify route integrity and slug coverage, but semantic fit still needs human review.

## Link Expectations

- Project detail pages link to Skills at `/<locale>/skills/<skill-slug>/`.
- Skill detail pages link to Projects at `/<locale>/projects/<project-slug>/`.
- Static export checks should include at least one English and one Chinese relationship link.
