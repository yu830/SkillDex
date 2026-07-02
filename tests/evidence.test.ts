import assert from "node:assert/strict";
import test from "node:test";

import { getAllProjectEvidence } from "#lib/projects";
import { getAllSkills, getSkillBySlug, getSkillSearchText, getSkillsBySourceType, getSkillsByToolScope } from "#lib/skills";
import { isEvidence } from "#lib/evidence";

const requiredProjectNames = [
  "InsightCanvas Agent",
  "MemoryBridge MCP",
  "RepoLens RAG",
  "Bug Hunter Replay",
  "Vibe Coding Review",
  "LoopEngineering",
];

test("evidence validator accepts valid evidence", () => {
  assert.equal(
    isEvidence({
      status: "implemented",
      lastVerified: "2026-07-02",
      artifacts: [
        {
          label: "Source directory",
          kind: "repo",
          href: "https://github.com/example/repo",
          summary: "Public source directory checked for this record.",
        },
      ],
    }),
    true,
  );
});

test("evidence validator rejects invalid status and artifact kind", () => {
  assert.equal(isEvidence({ status: "shipped", artifacts: [{ label: "Note", kind: "note" }] }), false);
  assert.equal(isEvidence({ status: "implemented", artifacts: [{ label: "Video", kind: "video" }] }), false);
});

test("required portfolio projects all have evidence", () => {
  const projects = getAllProjectEvidence();
  const names = projects.map((project) => project.name).sort();

  assert.deepEqual(names, [...requiredProjectNames].sort());

  for (const project of projects) {
    assert.equal(isEvidence(project.evidence), true, project.name);
    assert.match(project.updatedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(project.highlights.length >= 2, project.name);
    assert.ok(project.evidence.artifacts && project.evidence.artifacts.length > 0, project.name);
  }
});

test("at least ten skills have structured evidence", () => {
  const skillsWithEvidence = getAllSkills().filter((skill) => isEvidence(skill.evidence));

  assert.ok(skillsWithEvidence.length >= 10);
  assert.ok(skillsWithEvidence.every((skill) => skill.evidence?.lastVerified === "2026-07-02"));
});

test("search and filter helpers still return the established records", () => {
  assert.equal(getSkillBySlug("playwright")?.name, "Playwright");
  assert.ok(getSkillsByToolScope("codex").some((skill) => skill.slug === "playwright"));
  assert.deepEqual(getSkillsBySourceType("own").map((skill) => skill.slug), ["vibe-coding-review"]);
  assert.match(getSkillSearchText(getSkillBySlug("playwright")!, "en"), /browser automation/);
  assert.match(getSkillSearchText(getSkillBySlug("gh-fix-ci")!, "en"), /github actions/);
  assert.match(getSkillSearchText(getSkillBySlug("vibe-coding-review")!, "en"), /owned catalog record/);
});
