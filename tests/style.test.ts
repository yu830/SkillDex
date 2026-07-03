import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();

test("layout metadata is branded for SkillDex", () => {
  const source = readFileSync(join(root, "src/app/layout.tsx"), "utf8");

  assert.match(source, /title:\s*"SkillDex"/);
  assert.match(source, /Personal AI Skills Hub/);
});

test("global CSS defines the Anthropic editorial font and color system", () => {
  const source = readFileSync(join(root, "src/app/globals.css"), "utf8");

  assert.match(source, /Anthropic Sans/);
  assert.match(source, /Anthropic Serif/);
  assert.match(source, /Anthropic Mono/);
  assert.match(source, /--paper:\s*#f5efe3/);
  assert.match(source, /--line:\s*#171511/);
  assert.doesNotMatch(source, /radial-gradient/);
});

test("home page uses editorial grid rows instead of rounded feature cards", () => {
  const source = readFileSync(join(root, "src/app/[locale]/page.tsx"), "utf8");

  assert.match(source, /Skills for agent work, indexed with care/);
  assert.match(source, /editorial-shell/);
  assert.match(source, /font-serif text-2xl font-normal/);
  assert.match(source, /Featured skills/);
  assert.match(source, /Project evidence/);
  assert.match(source, /getAllProjectEvidence/);
  assert.match(source, /No online execution/);
  assert.match(source, /leading-\[1\.02\]/);
  assert.doesNotMatch(source, /clamp\(/);
  assert.doesNotMatch(source, /vw/);
  assert.doesNotMatch(source, /leading-\[0\.88\]/);
  assert.doesNotMatch(source, /rounded-3xl/);
  assert.doesNotMatch(source, /shadow-\[/);
});

test("skill detail page uses the same editorial type system as the home page", () => {
  const source = readFileSync(join(root, "src/app/[locale]/skills/[slug]/page.tsx"), "utf8");

  assert.match(source, /editorial-shell/);
  assert.match(source, /font-serif text-2xl font-normal/);
  assert.match(source, /font-serif text-\[4\.25rem\]/);
  assert.match(source, /Evidence summary/);
  assert.match(source, /Related projects/);
  assert.match(source, /portfolio context/);
  assert.match(source, /Project evidence status/);
  assert.match(source, /leading-\[1\.02\]/);
  assert.doesNotMatch(source, /clamp\(/);
  assert.doesNotMatch(source, /vw/);
  assert.doesNotMatch(source, /rounded-3xl/);
  assert.doesNotMatch(source, /text-stone/);
  assert.doesNotMatch(source, /bg-\[#fff9e8\]/);
});

test("project pages keep the same editorial evidence surface", () => {
  const indexSource = readFileSync(join(root, "src/app/[locale]/projects/page.tsx"), "utf8");
  const detailSource = readFileSync(join(root, "src/app/[locale]/projects/[slug]/page.tsx"), "utf8");

  assert.match(indexSource, /editorial-shell/);
  assert.match(indexSource, /Project evidence/);
  assert.match(indexSource, /ProjectEvidenceCard/);
  assert.match(detailSource, /editorial-shell/);
  assert.match(detailSource, /Proof boundary/);
  assert.match(detailSource, /Related skills/);
  assert.match(detailSource, /workflow-capability links/);
  assert.match(detailSource, /No verified URL attached/);
  assert.match(detailSource, /font-serif text-\[4\.25rem\]/);
  assert.doesNotMatch(indexSource, /clamp\(|vw|rounded-3xl|shadow-\[/);
  assert.doesNotMatch(detailSource, /clamp\(|vw|rounded-3xl|shadow-\[/);
});

test("shared action badges use rectangular Anthropic-style controls", () => {
  const statusSource = readFileSync(join(root, "src/components/StatusBadge.tsx"), "utf8");
  const copySource = readFileSync(join(root, "src/components/CopyButton.tsx"), "utf8");

  assert.match(statusSource, /font-mono/);
  assert.match(statusSource, /active:\s*"border-\[#3f6239\]/);
  assert.match(statusSource, /draft:\s*"border-\[#8b4239\]/);
  assert.match(statusSource, /experimental:\s*"border-\[#8b4239\]/);
  assert.match(statusSource, /archived:\s*"border-\[#8b4239\]/);
  assert.match(copySource, /bg-\[var\(--ink\)\]/);
  assert.doesNotMatch(statusSource, /rounded-full/);
  assert.doesNotMatch(copySource, /rounded-full/);
});

test("skill explorer exposes ownership filtering", () => {
  const explorerSource = readFileSync(join(root, "src/app/[locale]/skills/SkillsExplorer.tsx"), "utf8");
  const filterSource = readFileSync(join(root, "src/components/SkillFilter.tsx"), "utf8");

  assert.match(explorerSource, /useState<SourceType \| "all">\("all"\)/);
  assert.match(explorerSource, /skill\.sourceType !== sourceType/);
  assert.match(explorerSource, /sourceType=\{sourceType\}/);
  assert.match(explorerSource, /onSourceTypeChange=\{setSourceType\}/);
  assert.match(explorerSource, /getSkillSearchText\(skill, locale\)/);
  assert.match(filterSource, /sourceType: SourceType \| "all"/);
  assert.match(filterSource, /onSourceTypeChange/);
  assert.match(filterSource, /const sourceTypes/);
  assert.match(filterSource, /label="Ownership"/);
  assert.match(filterSource, /All ownership/);
});

test("project log records the ownership and tool-scope change", () => {
  const source = readFileSync(join(root, "CHANGELOG.md"), "utf8");
  const match = source.match(/## 2026-05-24\r?\n([\s\S]*?)(?:\r?\n## |$)/);

  assert.ok(match);
  const section = match[1];
  assert.match(section, /ownership classification/i);
  assert.match(section, /`own`/);
  assert.match(section, /`third-party`/);
  assert.match(section, /multi-tool compatibility/i);
  assert.match(section, /`toolScopes`/);
  assert.match(section, /Frontend Design/);
  assert.match(section, /Claude Code and Codex/);
});

test("catalog and policy pages share the same editorial shell", () => {
  const files = [
    "src/app/[locale]/skills/page.tsx",
    "src/app/[locale]/projects/page.tsx",
    "src/app/[locale]/projects/[slug]/page.tsx",
    "src/app/[locale]/skills/SkillsExplorer.tsx",
    "src/app/[locale]/about/page.tsx",
    "src/components/SearchBar.tsx",
    "src/components/SkillFilter.tsx",
    "src/components/SkillCard.tsx",
    "src/components/ProjectEvidenceCard.tsx",
  ];

  for (const file of files) {
    const source = readFileSync(join(root, file), "utf8");
    assert.doesNotMatch(source, /rounded-(?:full|2xl|3xl)/, file);
    assert.doesNotMatch(source, /text-stone|bg-amber|shadow-\[/, file);
  }
});
