import assert from "node:assert/strict";
import test from "node:test";

import { getAllProjectEvidence, getProjectEvidenceBySlug, getProjectPath, getProjectRelatedSkills, getProjectStaticParams } from "#lib/projects";
import { getAllSkills, getSkillBySlug, getSkillPath, getSkillSearchText, getSkillsBySourceType, getSkillsByToolScope } from "#lib/skills";
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
    assert.ok(project.problem.length >= 2, project.name);
    assert.ok(project.approach.length >= 2, project.name);
    assert.ok(project.nextSteps.length >= 2, project.name);
    assert.ok(project.evidence.artifacts && project.evidence.artifacts.length > 0, project.name);
  }
});

test("project slugs are unique, stable, and statically routable", () => {
  const projects = getAllProjectEvidence();
  const slugs = projects.map((project) => project.slug);

  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) {
    assert.match(slug, /^[a-z0-9-]+$/);
    assert.equal(getProjectEvidenceBySlug(slug)?.slug, slug);
    assert.equal(getProjectPath("en", slug), `/en/projects/${slug}`);
  }

  const routeKeys = new Set(getProjectStaticParams().map((param) => `${param.locale}/${param.slug}`));
  for (const slug of slugs) {
    assert.equal(routeKeys.has(`en/${slug}`), true, slug);
    assert.equal(routeKeys.has(`zh/${slug}`), true, slug);
  }
});

test("project TBD evidence stays unlinked until proof is verified", () => {
  const projects = getAllProjectEvidence();
  const tbdArtifacts = projects.flatMap((project) =>
    (project.evidence.artifacts ?? [])
      .filter((artifact) => `${artifact.label} ${artifact.summary ?? ""}`.toLowerCase().includes("tbd"))
      .map((artifact) => ({ project: project.name, artifact })),
  );

  assert.ok(tbdArtifacts.length > 0);

  for (const { project, artifact } of tbdArtifacts) {
    assert.equal(artifact.href, undefined, `${project} ${artifact.label}`);
    assert.doesNotMatch(`${artifact.label} ${artifact.summary ?? ""}`, /https?:\/\//i, `${project} ${artifact.label}`);
  }
});

test("project related skill slugs are populated, valid, and diverse", () => {
  const projects = getAllProjectEvidence();
  const skillSlugs = new Set(getAllSkills().map((skill) => skill.slug));
  const coveredSkillSlugs = new Set<string>();

  for (const project of projects) {
    assert.ok(project.relatedSkillSlugs.length >= 1, project.name);
    assert.equal(new Set(project.relatedSkillSlugs).size, project.relatedSkillSlugs.length, project.name);

    const relatedSkills = getProjectRelatedSkills(project);
    assert.equal(relatedSkills.length, project.relatedSkillSlugs.length, project.name);

    for (const slug of project.relatedSkillSlugs) {
      assert.equal(skillSlugs.has(slug), true, `${project.name} references missing Skill ${slug}`);
      assert.equal(getSkillBySlug(slug)?.slug, slug);
      assert.equal(getSkillPath("en", slug), `/en/skills/${slug}`);
      assert.equal(getSkillPath("zh", slug), `/zh/skills/${slug}`);
      coveredSkillSlugs.add(slug);
    }
  }

  assert.ok(coveredSkillSlugs.size >= 6, `expected at least 6 related Skills, found ${coveredSkillSlugs.size}`);
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
