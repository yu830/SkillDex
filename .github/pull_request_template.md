## Summary

- What changed:
- Why it changed:

## Relationship / SkillDex Data Review

For unrelated PRs, mark relationship-specific items as not applicable in the PR description.

- [ ] I checked whether this PR changes `src/data/projects.ts` or any Project `relatedSkillSlugs`.
- [ ] If `relatedSkillSlugs` changed, I updated `docs/relationship-matrix.md` in the same PR.
- [ ] I used `docs/relationship-review-checklist.md` before changing relationship links.
- [ ] Relationship links, the matrix, and Related projects remain navigation and review context only; they are not proof or evidence artifacts.
- [ ] Missing public proof remains `TBD`, pending, or a note artifact; no placeholder URLs were added.

## Validation

- [ ] `npm run test`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run verify:static-output`
- [ ] `npx --yes npm@10.9.8 audit --audit-level=moderate`

## Safety

- [ ] This PR does not modify secrets, `.env*`, `.dev.vars`, Cloudflare configuration, or `.github/workflows/*`.
- [ ] This PR does not print, request, or store secret values.
