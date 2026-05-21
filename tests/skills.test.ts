import assert from "node:assert/strict";
import test from "node:test";

import {
  CATEGORY_LABELS,
  getAllSkills,
  getCategories,
  getCategoryLabel,
  getLocalizedText,
  getSkillBySlug,
  getSkillsByToolScope,
  getTags,
  isLocale,
} from "#lib/skills";

const expectedSlugs = [
  "vercel-deploy",
  "playwright",
  "react-component-performance",
  "bug-hunt-swarm",
  "frontend-design",
];

test("catalog contains exactly the five approved third-party skills", () => {
  const skills = getAllSkills();

  assert.deepEqual(
    skills.map((skill) => skill.slug),
    expectedSlugs,
  );
  assert.equal(skills.length, 5);
  assert.ok(skills.every((skill) => skill.sourceType === "third-party"));
  assert.ok(skills.every((skill) => skill.visibility === "reference-only"));
  assert.ok(skills.every((skill) => skill.source.directoryUrl.startsWith("https://github.com/")));
});

test("catalog excludes ChatGPT skills and local source paths", () => {
  const serialized = JSON.stringify(getAllSkills()).toLowerCase();

  assert.equal(serialized.includes("chatgpt"), false);
  assert.equal(serialized.includes("d:\\"), false);
  assert.equal(serialized.includes("c:\\"), false);
});

test("helpers return skills by slug and tool scope", () => {
  assert.equal(getSkillBySlug("frontend-design")?.toolScope, "claude-code");
  assert.equal(getSkillBySlug("missing-skill"), undefined);
  assert.deepEqual(
    getSkillsByToolScope("claude-code").map((skill) => skill.slug),
    ["frontend-design"],
  );
  assert.equal(getSkillsByToolScope("codex").length, 4);
});

test("category and tag helpers expose stable ids and labels", () => {
  assert.ok(getCategories().includes("design-image"));
  assert.ok(getCategories().includes("testing-qa"));
  assert.equal(getCategoryLabel("design-image", "en"), "Design / Image");
  assert.equal(getCategoryLabel("design-image", "zh"), "设计 / 图像");
  assert.ok(getTags().includes("browser-automation"));
  assert.ok(CATEGORY_LABELS["devops-deployment"]);
});

test("localized text falls back to English and locale validation is strict", () => {
  assert.equal(getLocalizedText({ en: "English only" }, "zh"), "English only");
  assert.equal(getLocalizedText({ en: "English", zh: "中文" }, "zh"), "中文");
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("zh"), true);
  assert.equal(isLocale("fr"), false);
});

test("example prompts are titled safe prompt objects", () => {
  for (const skill of getAllSkills()) {
    assert.ok(skill.examplePrompts.length > 0);
    for (const example of skill.examplePrompts) {
      assert.ok(example.title.en.length > 0);
      assert.ok(example.prompt.en.length > 0);
      assert.equal(example.prompt.en.includes("SKILL.md"), false);
    }
  }
});

test("install and compatibility data are structured", () => {
  for (const skill of getAllSkills()) {
    assert.ok(["reference", "manual"].includes(skill.install.type));
    assert.ok(skill.install.label.en.length > 0);
    assert.ok(skill.install.steps.length > 0);
    assert.ok(skill.compatibility.tools.includes(skill.toolScope));
    assert.ok(skill.compatibility.environments.length > 0);
    assert.ok(skill.compatibility.requirements.length > 0);
    assert.match(skill.indexedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(skill.lastReviewedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
});
