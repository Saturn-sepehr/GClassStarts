#!/usr/bin/env node
/**
 * Builds every environment for GitHub Pages and stages the results into a
 * single `public/` tree:
 *
 *   public/<env>/…      one directory per framework
 *
 * GitHub Pages serves the repository at github.io/<repo-name>/, so each
 * environment is configured with base = /GClassStarts/<env>. That is why the
 * output directories keep their per-environment structure here instead of
 * being flattened.
 *
 *   node scripts/build-pages.mjs                # build all, then assemble
 *   node scripts/build-pages.mjs --assemble     # assemble only (no builds)
 *   node scripts/build-pages.mjs --env=vue      # one environment
 *   node scripts/build-pages.mjs --env=vue --out=stage
 *
 * --out is used by CI: each matrix leg stages into stage/<env>/ so the
 * per-environment directory survives upload-artifact, instead of every leg
 * uploading a bare dist/ that would collide on merge.
 */

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const testsDir = join(repoRoot, "tests");
// GitHub Pages serves a project repo at github.io/<repo-name>/
const BASE = "GClassStarts";

const args = process.argv.slice(2);
const assembleOnly = args.includes("--assemble");
const only = args.find((a) => a.startsWith("--env="))?.split("=")[1];
const outArg = args.find((a) => a.startsWith("--out="))?.split("=")[1] ?? "public";
const outDir = join(repoRoot, outArg);

/**
 * Where each framework's static output lands, and what it must contain.
 * `from` is relative to tests/<env>/.
 */
const LAYOUT = {
  jquery:    { from: "dist", index: "index.html" },
  alpine:    { from: "dist", index: "index.html" },
  backbone:  { from: "dist", index: "index.html" },
  // Ember builds through Embroider + Vite, but its stylesheet is imported from
  // app/app.js rather than linked in index.html - the virtual app.css is a
  // verbatim copy that skips the PostCSS/Tailwind pipeline. See vite.config.mjs.
  ember:     { from: "dist", index: "index.html" },
  react:     { from: "dist", index: "index.html" },
  vue:       { from: "dist", index: "index.html" },
  preact:    { from: "dist", index: "index.html" },
  solid:     { from: "dist", index: "index.html" },
  lit:       { from: "dist", index: "index.html" },
  svelte:    { from: "dist", index: "index.html" },
  astro:     { from: "dist", index: "index.html" },
  next:      { from: "out",  index: "index.html" },
  nuxt:      { from: ".output/public", index: "index.html" },
  sveltekit: { from: "build", index: "index.html" },
  qwik:      { from: "dist", index: "index.html" },
  angular:   { from: "dist/gclass-tests-angular/browser", index: "index.html" },
  // Remix SPA mode emits a client-only build; build/client is the servable tree.
  remix:     { from: "build/client", index: "index.html" },
  // Vanilla has no bundler and no build output directory: index.html, the
  // compiled stylesheet, the entry module and the packages its import map
  // points at are copied individually.
  vanilla:   { from: null, index: "index.html", manual: true },
};

// With --assemble the builds already happened, either in this process or in a
// previous CI leg. Prefer a staged tree when one exists, because that is what
// upload-artifact round-tripped.
const stageDir = join(repoRoot, "stage");
const fromStage = assembleOnly && existsSync(stageDir);
const sourceRoot = fromStage ? stageDir : testsDir;

const present = readdirSync(sourceRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const envs = present.filter((n) => LAYOUT[n] && (!only || n === only)).sort();

// Loud failure beats a silent empty deploy. This exact situation happened once:
// upload-artifact stripped the per-environment directory, the merge collapsed
// every env onto the same files, assemble recognised none of them, public/ came
// out empty, and the deployment still reported success while every URL 404'd.
if (assembleOnly && fromStage && !envs.length) {
  console.error(`\n  ${sourceRoot} contains no recognised environment directories.`);
  console.error(`  found: ${present.join(", ") || "(empty)"}`);
  console.error("  expected one of: " + Object.keys(LAYOUT).sort().join(", "));
  console.error("\n  This means the CI artifacts merged without preserving their");
  console.error("  per-environment directory. Check the upload-artifact path.");
  process.exit(1);
}

const run = (cmd, cmdArgs, cwd) => spawnSync(cmd, cmdArgs, { cwd, encoding: "utf8" });

// ── 1. build ──────────────────────────────────────────────────────────────────
const built = [];
for (const env of envs) {
  if (!assembleOnly) {
    process.stdout.write(`  building ${env.padEnd(11)}`);
    const t0 = Date.now();
    const r = run("npm", ["run", "--silent", "build"], join(testsDir, env));
    const secs = ((Date.now() - t0) / 1000).toFixed(1);
    if (r.status !== 0) {
      console.log(`FAIL (${secs}s)`);
      console.log((r.stdout || "") + (r.stderr || ""));
      process.exitCode = 1;
      continue;
    }
    console.log(`ok (${secs}s)`);
  }
  built.push(env);
}

// ── 2. stage ──────────────────────────────────────────────────────────────────
if (!only) {
  rmSync(outDir, { recursive: true, force: true });
}
mkdirSync(outDir, { recursive: true });

const staged = [];
const failed = [];

for (const env of built) {
  const spec = LAYOUT[env];
  const src = join(sourceRoot, env);
  const dest = join(outDir, env);
  mkdirSync(dest, { recursive: true });

  if (fromStage) {
    // already assembled by the build leg - copy across as-is
    cpSync(src, dest, { recursive: true });
  } else if (spec.manual) {
    // vanilla: copy what index.html actually references
    cpSync(join(src, "index.html"), join(dest, "index.html"));
    cpSync(join(src, "dist"), join(dest, "dist"), { recursive: true });
    cpSync(join(src, "src"), join(dest, "src"), { recursive: true });
    // its import map resolves bare specifiers out of node_modules
    const nm = join(dest, "node_modules");
    mkdirSync(join(nm, "gclass-anims", "dist"), { recursive: true });
    cpSync(join(src, "node_modules/gclass-anims/dist"),
          join(nm, "gclass-anims", "dist"), { recursive: true });
    cpSync(join(src, "node_modules/gclass-anims/package.json"),
          join(nm, "gclass-anims", "package.json"));
    cpSync(join(src, "node_modules/gsap"), join(nm, "gsap"),
          { recursive: true, filter: (p) => !p.includes(`${sep}dist${sep}`) || p.endsWith(".js") });
  } else {
    const from = join(src, spec.from);
    if (!existsSync(from)) {
      failed.push(`${env}: expected output at ${spec.from}/ is missing`);
      continue;
    }
    cpSync(from, dest, { recursive: true });
  }

  // Qwik City's SSG honours basePathname for its own /build/… URLs but still
  // emits the bundle-graph preload as an absolute /assets/… path. One targeted
  // rewrite is cheaper than fighting the generator.
  if (env === "qwik") {
    const f = join(dest, spec.index);
    if (existsSync(f)) {
      {
        const before = readFileSync(f, "utf8");
        const after = before.replaceAll('"/assets/', `"/${BASE}/qwik/assets/`);
        writeFileSync(f, after);
        if (before !== after) console.log(`             rewrote absolute /assets/ refs for qwik`);
      }
    }
  }

  const index = join(dest, spec.index);
  if (!existsSync(index)) {
    failed.push(`${env}: ${spec.index} missing from the staged output`);
    continue;
  }
  staged.push(env);
}

console.log();
console.log(`  staged ${staged.length}/${envs.length} environments into ${outArg}/`
            + (fromStage ? " (from stage/)" : ""));
if (failed.length) {
  console.log();
  for (const f of failed) console.log(`  FAIL ${f}`);
  process.exitCode = 1;
} else {
  console.log("  " + staged.join(" "));
}