import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();

const requiredFiles = [
  "src/app/page.tsx",
  "src/app/[locale]/layout.tsx",
  "src/app/[locale]/page.tsx",
  "src/app/[locale]/about/page.tsx",
  "src/app/[locale]/projects/page.tsx",
  "src/app/[locale]/projects/[slug]/page.tsx",
  "src/app/[locale]/skills/page.tsx",
  "src/app/[locale]/skills/SkillsExplorer.tsx",
  "src/app/[locale]/skills/[slug]/page.tsx",
  "src/components/CopyButton.tsx",
  "src/components/LanguageSwitcher.tsx",
  "src/components/ProjectEvidenceCard.tsx",
  "src/components/SearchBar.tsx",
  "src/components/SkillCard.tsx",
  "src/components/SkillFilter.tsx",
  "src/components/StatusBadge.tsx",
  "src/components/Tag.tsx",
];

test("all required route and component files exist", () => {
  for (const file of requiredFiles) {
    assert.equal(existsSync(join(root, file)), true, `${file} should exist`);
  }
});

test("root route provides a static-compatible English locale fallback", () => {
  const source = readFileSync(join(root, "src/app/page.tsx"), "utf8");

  assert.doesNotMatch(source, /next\/navigation/);
  assert.match(source, /httpEquiv=["']refresh["']/);
  assert.match(source, /url=\/en\//);
  assert.match(source, /href=["']\/en\/["']/);
});

test("locale routes are statically bounded to English and Chinese", () => {
  const source = readFileSync(join(root, "src/app/[locale]/layout.tsx"), "utf8");

  assert.match(source, /generateStaticParams/);
  assert.match(source, /dynamicParams\s*=\s*false/);
  assert.match(source, /LOCALES/);
});

test("skill detail route statically generates locales and slugs", () => {
  const source = readFileSync(join(root, "src/app/[locale]/skills/[slug]/page.tsx"), "utf8");

  assert.match(source, /generateStaticParams/);
  assert.match(source, /dynamicParams\s*=\s*false/);
  assert.match(source, /notFound\(\)/);
  assert.match(source, /getAllSkills/);
  assert.match(source, /getSkillBySlug/);
});

test("project detail route statically generates locales and project slugs", () => {
  const source = readFileSync(join(root, "src/app/[locale]/projects/[slug]/page.tsx"), "utf8");

  assert.match(source, /generateStaticParams/);
  assert.match(source, /dynamicParams\s*=\s*false/);
  assert.match(source, /notFound\(\)/);
  assert.match(source, /getProjectStaticParams/);
  assert.match(source, /getProjectEvidenceBySlug/);
});

test("project detail route renders related skills with locale-aware links", () => {
  const source = readFileSync(join(root, "src/app/[locale]/projects/[slug]/page.tsx"), "utf8");

  assert.match(source, /Related skills/);
  assert.match(source, /Related skills are navigation and workflow-capability links/);
  assert.match(source, /getProjectRelatedSkills/);
  assert.match(source, /getSkillPath\(locale,\s*skill\.slug\)/);
  assert.match(source, /getLocalizedText\(skill\.summary,\s*locale\)/);
});

test("project cards use locale-aware detail route links", () => {
  const source = readFileSync(join(root, "src/components/ProjectEvidenceCard.tsx"), "utf8");

  assert.match(source, /next\/link/);
  assert.match(source, /getProjectPath\(locale,\s*project\.slug\)/);
  assert.match(source, /Open evidence record/);
});

test("MVP does not define API routes", () => {
  const appEntries = readdirSync(join(root, "src/app"), { recursive: true }).map(String);

  assert.equal(appEntries.some((entry) => entry.includes("api")), false);
  assert.equal(appEntries.some((entry) => entry.endsWith("route.ts")), false);
});
