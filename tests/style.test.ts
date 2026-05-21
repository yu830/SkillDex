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

test("global CSS defines the paper toolbench visual system", () => {
  const source = readFileSync(join(root, "src/app/globals.css"), "utf8");

  assert.match(source, /--paper/);
  assert.match(source, /--ink/);
  assert.match(source, /radial-gradient/);
  assert.match(source, /selection/);
});
