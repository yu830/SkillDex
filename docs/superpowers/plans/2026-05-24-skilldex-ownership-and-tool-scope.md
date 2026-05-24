# SkillDex Ownership And Tool Scope Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add manual ownership classification and multi-tool compatibility to SkillDex, update `Frontend Design` for Claude Code and Codex, and record the change in `CHANGELOG.md`.

**Architecture:** Keep the app fully static and manually maintained. Replace single `toolScope` reads with `toolScopes: ToolScope[]`, expose `sourceType` through helpers and UI filters, and keep all catalog data in `src/data/skills.ts`.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Node test runner, ESLint.

---

## File Structure

- Modify `src/types/skill.ts`: update the `Skill` contract from `toolScope` to `toolScopes`.
- Modify `src/lib/skills.ts`: add labels and helper functions for tool scopes and source ownership.
- Modify `src/data/skills.ts`: migrate catalog entries to `toolScopes`; update `Frontend Design` to support both tools.
- Modify `src/app/[locale]/skills/SkillsExplorer.tsx`: add ownership state, filtering, and searchable text.
- Modify `src/components/SkillFilter.tsx`: add ownership select and wider filter grid.
- Modify `src/components/SkillCard.tsx`: show multiple tool tags and ownership tag.
- Modify `src/app/[locale]/skills/[slug]/page.tsx`: show ownership and multiple tools in detail view.
- Modify `src/app/[locale]/page.tsx`: compute home-page tool summaries from `toolScopes`.
- Modify `tests/skills.test.ts`: cover data model, helpers, and ownership grouping.
- Modify `tests/style.test.ts`: cover ownership UI and project log presence.
- Modify `README.md`: document manual ownership and multi-tool policy.
- Create `CHANGELOG.md`: record the 2026-05-24 catalog model change.

---

### Task 1: Write Failing Tests For Ownership And Multi-Tool Data

**Files:**
- Modify: `tests/skills.test.ts`
- Modify: `tests/style.test.ts`

- [ ] **Step 1: Update helper imports in `tests/skills.test.ts`**

Change the import block to include the new helper names:

```ts
import {
  CATEGORY_LABELS,
  SOURCE_TYPE_LABELS,
  TOOL_SCOPE_LABELS,
  getAllSkills,
  getCategories,
  getCategoryLabel,
  getLocalizedText,
  getSkillBySlug,
  getSkillsBySourceType,
  getSkillsByToolScope,
  getSourceTypeLabel,
  getTags,
  getToolScopeLabel,
  isLocale,
} from "#lib/skills";
```

- [ ] **Step 2: Replace the tool-scope helper test**

Replace the current `helpers return skills by slug and tool scope` test with:

```ts
test("helpers return skills by slug and multi-tool scope", () => {
  assert.deepEqual(getSkillBySlug("frontend-design")?.toolScopes, ["claude-code", "codex"]);
  assert.equal(getSkillBySlug("missing-skill"), undefined);
  assert.deepEqual(
    getSkillsByToolScope("claude-code").map((skill) => skill.slug),
    ["frontend-design"],
  );
  assert.deepEqual(
    getSkillsByToolScope("codex").map((skill) => skill.slug),
    ["vercel-deploy", "playwright", "react-component-performance", "bug-hunt-swarm", "frontend-design"],
  );
});
```

- [ ] **Step 3: Add ownership helper test**

Add this test after the multi-tool helper test:

```ts
test("ownership helpers expose stable labels and grouping", () => {
  assert.equal(getSourceTypeLabel("own", "en"), "My skill");
  assert.equal(getSourceTypeLabel("third-party", "en"), "Other skill");
  assert.equal(getToolScopeLabel("claude-code", "en"), "Claude Code");
  assert.equal(getToolScopeLabel("codex", "en"), "Codex");
  assert.ok(SOURCE_TYPE_LABELS.own);
  assert.ok(TOOL_SCOPE_LABELS.codex);
  assert.deepEqual(getSkillsBySourceType("own"), []);
  assert.deepEqual(
    getSkillsBySourceType("third-party").map((skill) => skill.slug),
    expectedSlugs,
  );
});
```

- [ ] **Step 4: Update structure assertions**

In `catalog contains exactly the five approved third-party skills`, add:

```ts
assert.ok(skills.every((skill) => Array.isArray(skill.toolScopes)));
assert.ok(skills.every((skill) => !Object.hasOwn(skill, "toolScope")));
```

In `install and compatibility data are structured`, replace:

```ts
assert.ok(skill.compatibility.tools.includes(skill.toolScope));
```

with:

```ts
for (const toolScope of skill.toolScopes) {
  assert.ok(skill.compatibility.tools.includes(toolScope));
}
```

- [ ] **Step 5: Add UI and changelog source tests to `tests/style.test.ts`**

Add these tests before the final `catalog and policy pages share the same editorial shell` test:

```ts
test("skill explorer exposes ownership filtering", () => {
  const explorerSource = readFileSync(join(root, "src/app/[locale]/skills/SkillsExplorer.tsx"), "utf8");
  const filterSource = readFileSync(join(root, "src/components/SkillFilter.tsx"), "utf8");

  assert.match(explorerSource, /sourceType/);
  assert.match(explorerSource, /setSourceType/);
  assert.match(explorerSource, /getSourceTypeLabel/);
  assert.match(filterSource, /Ownership/);
  assert.match(filterSource, /All ownership/);
});

test("project log records the ownership and tool-scope change", () => {
  const source = readFileSync(join(root, "CHANGELOG.md"), "utf8");

  assert.match(source, /2026-05-24/);
  assert.match(source, /ownership/i);
  assert.match(source, /toolScopes/);
  assert.match(source, /Frontend Design/);
});
```

- [ ] **Step 6: Run tests and verify RED**

Run:

```bash
npm test
```

Expected: FAIL because `SOURCE_TYPE_LABELS`, `TOOL_SCOPE_LABELS`, `getSkillsBySourceType`, `getSourceTypeLabel`, `getToolScopeLabel`, `toolScopes`, ownership UI, and `CHANGELOG.md` do not exist yet.

- [ ] **Step 7: Commit failing tests**

Commit only if the project convention allows committing RED tests. If not, leave them staged for the next task. Preferred command when committing:

```bash
git add tests/skills.test.ts tests/style.test.ts
git commit -m "test: cover skill ownership and multi-tool scopes"
```

---

### Task 2: Implement Data Model And Helper Functions

**Files:**
- Modify: `src/types/skill.ts`
- Modify: `src/lib/skills.ts`

- [ ] **Step 1: Update `Skill` type**

In `src/types/skill.ts`, replace the `Skill` interface field:

```ts
toolScope: ToolScope;
```

with:

```ts
toolScopes: ToolScope[];
```

- [ ] **Step 2: Add labels and helpers in `src/lib/skills.ts`**

Update the import:

```ts
import type { Locale, LocalizedText, Skill, SkillCategoryId, SourceType, ToolScope } from "#types/skill";
```

Add these constants below `CATEGORY_LABELS`:

```ts
export const TOOL_SCOPE_LABELS: Record<ToolScope, { en: string; zh?: string }> = {
  "claude-code": { en: "Claude Code", zh: "Claude Code" },
  codex: { en: "Codex", zh: "Codex" },
};

export const SOURCE_TYPE_LABELS: Record<SourceType, { en: string; zh?: string }> = {
  own: { en: "My skill", zh: "\u6211\u7684 Skill" },
  "third-party": { en: "Other skill", zh: "\u5176\u4ed6 Skill" },
};
```

Replace `getSkillsByToolScope` with membership filtering and add ownership helpers:

```ts
export function getSkillsByToolScope(scope: ToolScope): Skill[] {
  return skills.filter((skill) => skill.toolScopes.includes(scope));
}

export function getSkillsBySourceType(sourceType: SourceType): Skill[] {
  return skills.filter((skill) => skill.sourceType === sourceType);
}

export function getToolScopes(): ToolScope[] {
  return Array.from(new Set(skills.flatMap((skill) => skill.toolScopes))).sort();
}
```

Add label helpers after `getCategoryLabel`:

```ts
export function getToolScopeLabel(toolScope: ToolScope, locale: Locale): string {
  return getLocalizedText(TOOL_SCOPE_LABELS[toolScope], locale);
}

export function getSourceTypeLabel(sourceType: SourceType, locale: Locale): string {
  return getLocalizedText(SOURCE_TYPE_LABELS[sourceType], locale);
}
```

- [ ] **Step 3: Run tests and verify remaining failures**

Run:

```bash
npm test
```

Expected: helper import failures should be resolved; tests should still fail because catalog data and UI still use `toolScope`, and `CHANGELOG.md` is missing.

---

### Task 3: Migrate Catalog Data To `toolScopes`

**Files:**
- Modify: `src/data/skills.ts`

- [ ] **Step 1: Replace single-tool fields**

For each non-frontend Skill, replace:

```ts
toolScope: "codex",
```

with:

```ts
toolScopes: ["codex"],
```

For `Frontend Design`, replace:

```ts
toolScope: "claude-code",
```

with:

```ts
toolScopes: ["claude-code", "codex"],
```

- [ ] **Step 2: Update `Frontend Design` summary and compatibility**

In the `frontend-design` entry, update the English summary to:

```ts
en: "A frontend design Skill usable from Claude Code and Codex for creating distinctive, production-grade interfaces for components, pages, applications, and visual web artifacts.",
```

Update compatibility tools:

```ts
tools: ["claude-code", "codex"],
```

Update compatibility environments:

```ts
environments: ["Claude Code", "Codex CLI or compatible Codex skill runtime", "Frontend codebase or web UI artifact"],
```

- [ ] **Step 3: Run tests and verify model progress**

Run:

```bash
npm test
```

Expected: catalog and helper tests should pass or move past data-model failures. UI source tests and changelog test may still fail.

---

### Task 4: Update UI Filtering And Display

**Files:**
- Modify: `src/components/SkillFilter.tsx`
- Modify: `src/app/[locale]/skills/SkillsExplorer.tsx`
- Modify: `src/components/SkillCard.tsx`
- Modify: `src/app/[locale]/skills/[slug]/page.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Add ownership filter props**

In `src/components/SkillFilter.tsx`, update imports:

```ts
import type { SkillCategoryId, SkillStatus, SourceType, ToolScope } from "@/types/skill";
```

Add props:

```ts
sourceType: SourceType | "all";
onSourceTypeChange: (value: SourceType | "all") => void;
```

Add source options:

```ts
const sourceTypes: Option<SourceType | "all">[] = [
  { value: "all", label: "All ownership" },
  { value: "own", label: "My skills" },
  { value: "third-party", label: "Other skills" },
];
```

Render the fifth select and widen the grid:

```tsx
<div className="grid border-b border-[var(--line)] bg-[var(--paper-soft)] md:grid-cols-5">
  <Select label="Tool" value={toolScope} options={toolScopes} onChange={onToolScopeChange} />
  <Select label="Ownership" value={sourceType} options={sourceTypes} onChange={onSourceTypeChange} />
  ...
</div>
```

- [ ] **Step 2: Filter by ownership and multi-tool scopes**

In `src/app/[locale]/skills/SkillsExplorer.tsx`, update imports to include `getSourceTypeLabel`, `getToolScopeLabel`, and `SourceType`.

Add state:

```ts
const [sourceType, setSourceType] = useState<SourceType | "all">("all");
```

Update filter logic:

```ts
if (toolScope !== "all" && !skill.toolScopes.includes(toolScope)) return false;
if (sourceType !== "all" && skill.sourceType !== sourceType) return false;
```

Update searchable text:

```ts
...skill.toolScopes,
...skill.toolScopes.map((scope) => getToolScopeLabel(scope, locale)),
skill.sourceType,
getSourceTypeLabel(skill.sourceType, locale),
```

Pass props to `SkillFilter`:

```tsx
sourceType={sourceType}
onSourceTypeChange={setSourceType}
```

Add `sourceType` to the `useMemo` dependency list.

- [ ] **Step 3: Show ownership and multiple tools on cards**

In `src/components/SkillCard.tsx`, update helper imports:

```ts
import { getCategoryLabel, getLocalizedText, getSourceTypeLabel, getToolScopeLabel } from "@/lib/skills";
```

Replace the single tool text with:

```tsx
<div className="flex flex-wrap gap-2">
  {skill.toolScopes.map((scope) => (
    <Tag key={scope}>{getToolScopeLabel(scope, locale)}</Tag>
  ))}
  <Tag>{getSourceTypeLabel(skill.sourceType, locale)}</Tag>
</div>
```

Keep `StatusBadge` in the same top row.

- [ ] **Step 4: Show ownership and multiple tools on detail pages**

In `src/app/[locale]/skills/[slug]/page.tsx`, import `getSourceTypeLabel` and `getToolScopeLabel`.

Add `metaOwnership` to `sectionTitles.en` and `sectionTitles.zh`:

```ts
metaOwnership: "Ownership",
```

```ts
metaOwnership: "\u5f52\u5c5e",
```

Replace hero tool tag:

```tsx
{skill.toolScopes.map((scope) => (
  <Tag key={scope}>{getToolScopeLabel(scope, locale)}</Tag>
))}
<Tag>{getSourceTypeLabel(skill.sourceType, locale)}</Tag>
```

Add sidebar metadata:

```tsx
<MetaBlock label={text.metaOwnership} value={getSourceTypeLabel(skill.sourceType, locale)} />
```

Replace compatibility tool rendering:

```tsx
<strong className="font-medium text-[var(--ink)]">Tools:</strong>{" "}
{skill.compatibility.tools.map((scope) => getToolScopeLabel(scope, locale)).join(", ")}
```

- [ ] **Step 5: Update home-page tool summaries**

In `src/app/[locale]/page.tsx`, remove the unused `ToolScope` type import and import `getToolScopeLabel` and `getToolScopes`:

```ts
import { getAllSkills, getCategories, getCategoryLabel, getLocalizedText, getToolScopeLabel, getToolScopes, isLocale } from "@/lib/skills";
```

Replace:

```ts
const toolScopes = Array.from(new Set(skills.map((skill) => skill.toolScope))) as ToolScope[];
```

with:

```ts
const toolScopes = getToolScopes();
```

Render labels:

```tsx
<Tag key={scope}>{getToolScopeLabel(scope, locale)}</Tag>
```

In featured rows, replace `skill.toolScope` with:

```tsx
{skill.toolScopes.map((scope) => getToolScopeLabel(scope, locale)).join(", ")} / {getCategoryLabel(skill.categoryId, locale)}
```

- [ ] **Step 6: Run tests and lint**

Run:

```bash
npm test
npm run lint
```

Expected: tests may still fail only because `CHANGELOG.md` is missing. Type and lint errors from old `toolScope` references should be fixed before moving on.

---

### Task 5: Update README And Add Project Log

**Files:**
- Modify: `README.md`
- Create: `CHANGELOG.md`

- [ ] **Step 1: Create `CHANGELOG.md`**

Create:

```md
# Changelog

## 2026-05-24

- Added ownership classification for manually maintained catalog entries: `own` for user-created Skills and `third-party` for other Skills.
- Added multi-tool compatibility through `toolScopes` so one Skill can appear under both Claude Code and Codex.
- Updated `Frontend Design` to support both Claude Code and Codex in the SkillDex catalog.
- Recorded the local Claude Code and Codex Skill inventory as future manual catalog candidates; SkillDex still does not scan local folders or sync catalogs automatically.
```

- [ ] **Step 2: Update README tech stack and policy**

In `README.md`, add bullets under Tech stack:

```md
- Manual ownership classification with `sourceType`
- Multi-tool compatibility with `toolScopes`
```

Under Static data policy, add:

```md
- Classify user-created Skills as `sourceType: "own"` and other public, bundled, curated, or third-party Skills as `sourceType: "third-party"`.
- Use `toolScopes` for tool compatibility so a Skill can appear under Claude Code, Codex, or both.
- Local Skill folders may be used as manual review candidates, but SkillDex must not scan them at runtime or build time.
```

Update the "Adding a new Skill entry safely" numbered list with:

```md
11. Choose the correct `sourceType`: `own` for user-created Skills, `third-party` for other Skills.
12. Choose one or more `toolScopes` that reflect where the Skill can actually be used.
```

- [ ] **Step 3: Run tests and verify green**

Run:

```bash
npm test
```

Expected: all tests pass.

---

### Task 6: Full Verification, Commit, And GitHub Update

**Files:**
- All modified implementation, test, and documentation files.

- [ ] **Step 1: Run full local verification**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected:

- `npm test`: all tests pass.
- `npm run lint`: exits 0 with no lint errors.
- `npm run build`: Next.js production build completes.

- [ ] **Step 2: Inspect final diff**

Run:

```bash
git status --short
git diff -- src/types/skill.ts src/lib/skills.ts src/data/skills.ts src/app/[locale]/skills/SkillsExplorer.tsx src/components/SkillFilter.tsx src/components/SkillCard.tsx src/app/[locale]/skills/[slug]/page.tsx src/app/[locale]/page.tsx tests/skills.test.ts tests/style.test.ts README.md CHANGELOG.md
```

Expected: diff only includes ownership, multi-tool, frontend-design compatibility, README, changelog, and tests.

- [ ] **Step 3: Commit implementation**

Run:

```bash
git add src/types/skill.ts src/lib/skills.ts src/data/skills.ts src/app/[locale]/skills/SkillsExplorer.tsx src/components/SkillFilter.tsx src/components/SkillCard.tsx src/app/[locale]/skills/[slug]/page.tsx src/app/[locale]/page.tsx tests/skills.test.ts tests/style.test.ts README.md CHANGELOG.md
git commit -m "feat: add skill ownership and multi-tool scopes"
```

- [ ] **Step 4: Push to GitHub**

If updating `main` directly:

```bash
git push origin main
```

If using a feature branch:

```bash
git switch -c feat/skill-ownership-tool-scopes
git push -u origin feat/skill-ownership-tool-scopes
```

After push, report the commit SHA, verification results, and whether GitHub/Vercel reports a successful status.
