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
  assert.match(source, /leading-\[1\.02\]/);
  assert.doesNotMatch(source, /clamp\(/);
  assert.doesNotMatch(source, /vw/);
  assert.doesNotMatch(source, /rounded-3xl/);
  assert.doesNotMatch(source, /text-stone/);
  assert.doesNotMatch(source, /bg-\[#fff9e8\]/);
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

test("catalog and policy pages share the same editorial shell", () => {
  const files = [
    "src/app/[locale]/skills/page.tsx",
    "src/app/[locale]/skills/SkillsExplorer.tsx",
    "src/app/[locale]/about/page.tsx",
    "src/components/SearchBar.tsx",
    "src/components/SkillFilter.tsx",
    "src/components/SkillCard.tsx",
  ];

  for (const file of files) {
    const source = readFileSync(join(root, file), "utf8");
    assert.doesNotMatch(source, /rounded-(?:full|2xl|3xl)/, file);
    assert.doesNotMatch(source, /text-stone|bg-amber|shadow-\[/, file);
  }
});
