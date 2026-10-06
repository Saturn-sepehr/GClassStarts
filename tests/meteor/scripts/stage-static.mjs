#!/usr/bin/env node
/**
 * Turns a Meteor build into a tree GitHub Pages can actually serve.
 *
 * `meteor build <dir>` produces a tarball of a **Node server** bundle. Pages
 * serves files only — there is no Node runtime — so the server bundle is dead
 * weight and the client has to boot as plain static files.
 *
 * What Meteor emits, and what happens to each piece:
 *
 *   programs/web.browser/head.html       the <head> content of client/main.html
 *   programs/web.browser/body.html       the body, with every {{> template}}
 *                                        include already resolved into
 *                                        <template> blocks
 *   programs/web.browser/app/            the bundled client JS, including
 *                                        node_modules/gclass-anims
 *   programs/web.browser/packages/       Meteor's own client packages
 *   programs/web.browser/program.json    the file manifest
 *
 * Two things stop this being a straight copy:
 *
 *   1. There is no index.html. Meteor's server assembles the response at request
 *      time from head.html + body.html + a runtime config, and fetches a file
 *      manifest from a server route. With no server, all three have to be
 *      supplied here: the HTML is assembled from the two partials, the manifest
 *      is inlined as a global, and the runtime config is written as a literal.
 *
 *   2. Everything is referenced by absolute, origin-rooted paths, because in
 *      production Meteor serves the app at /. Those have to be prefixed with
 *      /GClassStarts/meteor like every other environment in this repo.
 *
 * What this does NOT give you: a working Meteor runtime. The client bundle still
 * contains DDP, the minimongo/collection layer and the methods, and they will try
 * to open a websocket to /sockjs. That request will simply fail, which is why
 * nothing on this page uses a collection or a method. What it does prove is the
 * part this repo cares about: gclass-anims resolves, compiles and bundles inside
 * Meteor's own toolchain, and the client boot path works without a server.
 */

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoEnv = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const BASE = "GClassStarts";
const ENV = "meteor";
const PREFIX = `/${BASE}/${ENV}`;

// The tarball `meteor build` writes, and where the staged tree goes. Both are
// overridable so the build script can keep them outside the repo if it wants.
const tarball = resolve(process.env.METEOR_TARBALL ?? join(repoEnv, "..", "..", "meteor-out", "meteor.tar.gz"));
// NOTE the two-directories-up default. The staged tree must NOT sit anywhere
// under tests/, for two independent reasons:
//
//   1. Meteor scans its own app directory for .html files, so a staged
//      index.html left in tests/meteor/ is read as an app file on the next build
//      and static-html fails with "Can't set DOCTYPE here. (Meteor sets
//      <!DOCTYPE html> for you)". That error only appears on the *second*
//      build, which makes it a genuinely confusing one to debug.
//
//   2. verify-all.mjs treats every directory under tests/ as an environment, so
//      a staged tree there shows up as a failing env with no gclass-anims in it.
const UP = join(repoEnv, "..", "..");
const outDir = resolve(process.env.METEOR_OUT_DIR ?? join(UP, "meteor-static"));

if (!existsSync(tarball)) {
  console.error(`\n  meteor build output not found at ${tarball}`);
  console.error("  Did `meteor build` run? Check the npm build script.");
  process.exit(1);
}

// ── 1. unpack the tarball ────────────────────────────────────────────────────
// `tar` is available on every platform this repo already targets, and shelling
// out avoids pulling in a dependency for one archive. -C and no leading ./ so
// the paths are relative and predictable.
const unpackDir = join(outDir, ".unpacked");
rmSync(unpackDir, { recursive: true, force: true });
mkdirSync(unpackDir, { recursive: true });

const untar = spawnSync("tar", ["xzf", tarball, "-C", unpackDir], { stdio: "inherit" }).status;
if (untar !== 0) {
  console.error(`\n  tar could not unpack ${tarball}`);
  process.exit(1);
}

// The tarball unpacks to a single top-level bundle/ directory.
const bundleRoot = join(unpackDir, "bundle");
if (!existsSync(bundleRoot)) {
  const found = readdirSync(unpackDir);
  console.error(`\n  ${tarball} unpacked but contained no bundle/ directory`);
  console.error(`  found: ${found.join(", ") || "(empty)"}`);
  process.exit(1);
}

const browserDir = join(bundleRoot, "programs", "web.browser");

if (!existsSync(browserDir)) {
  console.error(`\n  web.browser program missing at ${browserDir}`);
  process.exit(1);
}

// ── 2. copy the client program, excluding the two html partials ──────────────
// head.html and body.html are inputs to the assembly below, not outputs — they
// belong inside <head> and <body>, not at the document root.
cpSync(browserDir, outDir, {
  recursive: true,
  filter: (p) => {
    const n = basename(p);
    return n !== "head.html" && n !== "body.html";
  },
});

const head = readFileSync(join(browserDir, "head.html"), "utf8").trim();
const body = readFileSync(join(browserDir, "body.html"), "utf8").trim();

// ── 3. inline the file manifest ──────────────────────────────────────────────
// Meteor's client bootstrap fetches program.json from a server route to learn
// its own file names. Reading a static file is strictly less work, so it is
// fetched the normal way but under the prefixed path.
const program = JSON.parse(readFileSync(join(browserDir, "program.json"), "utf8"));
writeFileSync(
  join(outDir, "program.json"),
  JSON.stringify({
    format: program.format,
    manifest: program.manifest.map((m) => ({ ...m, path: `${PREFIX}/${m.path}` })),
  }),
);

// ── 4. assemble index.html ───────────────────────────────────────────────────
// The runtime config is what Meteor's server would normally inject as a <script>
// before the bundle: it tells the client which release it is running and where
// the sockjs endpoint is. Only the release and settings are meaningful here —
// the endpoint is deliberately absent because there is no server to reach.
const runtimeConfig = {
  meteorRelease: "METEOR@3.5.2",
  meteorSettings: { public: {} },
  runtimeConfig: {},
};

const html =
  `<!doctype html>\n` +
  `<html lang="en">\n` +
  `<head>\n` +
  head
    // client/styles.css is a Meteor app path; the built program has it at the
    // root of web.browser under a content hash, so swap the reference.
    .replace(
      /<link rel="stylesheet" href="\/styles\.css">/,
      `<link rel="stylesheet" href="${PREFIX}/${builtCss(program)}">`,
    )
    .split("\n")
    .map((l) => (l.trim() ? `  ${l.trim()}` : l))
    .join("\n") +
  `\n  <!-- generated by scripts/stage-static.mjs — see that file for why the\n` +
  `       server bundle is not deployed and the manifest is served as a file -->\n` +
  `  <script type="text/javascript">window.__meteor_runtime_config__ = ${JSON.stringify(runtimeConfig)};</script>\n` +
  `</head>\n` +
  `<body>\n` +
  body +
  `\n  <script type="text/javascript" src="${PREFIX}/app/global-imports.js"></script>\n` +
  `  <script type="module" src="${PREFIX}/app/client/main.js"></script>\n` +
  `</body>\n` +
  `</html>\n`;

writeFileSync(join(outDir, "index.html"), html);

rmSync(unpackDir, { recursive: true, force: true });

console.log(`  staged meteor into ${outDir}`);
console.log(`    ${program.manifest.length} files, all paths prefixed with ${PREFIX}/`);

/**
 * The compiled stylesheet's built name. Meteor hashes it, so the source's
 * /styles.css link has to be repointed at whatever the build actually emitted.
 */
function builtCss(prog) {
  const css = prog.manifest.find((m) => m.type === "css" && m.where === "client");
  return css ? css.path : "app/styles.css";
}
