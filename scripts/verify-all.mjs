#!/usr/bin/env node
// Builds every environment under tests/ against the published gclass-anims
// package and prints a pass/fail table.
//
//   node scripts/verify-all.mjs                 # all environments
//   node scripts/verify-all.mjs --filter=vue    # one environment
//   node scripts/verify-all.mjs --skip-install  # reuse existing node_modules
//
// Exits non-zero if any environment fails.

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const testsDir = join(repoRoot, "tests");

const args = process.argv.slice(2);
const filter = args.find((a) => a.startsWith("--filter="))?.split("=")[1];
const skipInstall = args.includes("--skip-install");

const run = (cmd, cmdArgs, cwd) =>
  spawnSync(cmd, cmdArgs, { cwd, encoding: "utf8", shell: false });

const envs = readdirSync(testsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((name) => !filter || name === filter)
  .sort();

if (!envs.length) {
  console.error(filter ? `no environment named "${filter}"` : "no environments found");
  process.exit(1);
}

// Every environment must pin the exact version under test.
const EXPECTED = "1.0.0-beta.23";

const pad = (s, n) => String(s).padEnd(n);
const results = [];

for (const name of envs) {
  const cwd = join(testsDir, name);
  process.stdout.write(`${pad(name, 12)}`);

  const pkgPath = join(cwd, "node_modules", "gclass-anims", "package.json");
  if (!skipInstall) {
    const lock = join(cwd, "package-lock.json");
    const r = run("npm", [existsSync(lock) ? "ci" : "install", "--no-audit", "--no-fund"], cwd);
    if (r.status !== 0) {
      console.log("FAIL (install)");
      results.push({ name, ok: false, stage: "install", log: r.stderr || r.stdout });
      continue;
    }
  }

  if (!existsSync(pkgPath)) {
    console.log("FAIL (gclass-anims not installed)");
    results.push({ name, ok: false, stage: "version", log: "gclass-anims missing from node_modules" });
    continue;
  }

  const installed = JSON.parse(readFileSync(pkgPath, "utf8")).version;
  if (installed !== EXPECTED) {
    console.log(`FAIL (version ${installed}, expected ${EXPECTED})`);
    results.push({ name, ok: false, stage: "version", log: `installed ${installed}` });
    continue;
  }

  const build = run("npm", ["run", "--silent", "build"], cwd);
  if (build.status !== 0) {
    console.log("FAIL (build)");
    results.push({ name, ok: false, stage: "build", log: `${build.stdout}\n${build.stderr}` });
    continue;
  }

  console.log("pass");
  results.push({ name, ok: true });
}

const failed = results.filter((r) => !r.ok);

console.log();
console.log(`${results.length - failed.length}/${results.length} environments passed`);

if (failed.length) {
  console.log();
  for (const f of failed) {
    console.log(`--- ${f.name} (${f.stage}) ---`);
    console.log(f.log.trim().split("\n").slice(-25).join("\n"));
    console.log();
  }
  process.exit(1);
}
