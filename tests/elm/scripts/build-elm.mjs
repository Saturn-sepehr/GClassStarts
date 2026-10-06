#!/usr/bin/env node
/**
 * Compiles src/Main.elm to src/elm.js, then makes the output importable.
 *
 * Elm's output is not an ES module. It is an IIFE that ends:
 *
 *     _Platform_export({ 'Main': { init: ... } }); }(this));
 *
 * `this` at the top level of an ES module is `undefined`, so importing that
 * file directly throws. And there are no `export` statements to import from
 * either, so `import { Elm } from './elm.js'` fails on "missing export" even
 * before the `this` problem.
 *
 * Both are fixed here by two textual rewrites of the generated file, which is
 * the least invasive option available: the compiler owns that file, so nothing
 * in it should be hand-edited and nothing in it should be re-derived. Only the
 * two characters that decide where the namespace lands are touched.
 *
 *   }(this));                      ->  }(globalThis));
 *
 * so the namespace lands on the global object as intended, plus one appended
 * line re-exporting it as a real ES export:
 *
 *   export const Elm = globalThis.Elm;
 *
 * --optimize matches what a production deploy of an Elm app looks like; the
 * unoptimised output is roughly 3x the size for no benefit here.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const envDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(envDir, "src");
const outFile = join(srcDir, "elm.js");

mkdirSync(srcDir, { recursive: true });

// `elm` resolves through node_modules/.bin because npm puts it there when this
// package installs. spawnSync-style execFileSync does not consult that, so the
// local shim is invoked explicitly.
execFileSync(
  process.platform === "win32" ? "elm.cmd" : "elm",
  ["make", join(srcDir, "Main.elm"), "--optimize", "--output", outFile],
  { cwd: envDir, stdio: "inherit" },
);

const compiled = readFileSync(outFile, "utf8");

// The IIFE footer is a fixed shape, but assert on it rather than trusting it -
// a silent no-op here would produce a bundle that fails at runtime instead of a
// build that fails here.
const FOOTER = "}(this));";
if (!compiled.trimEnd().endsWith(FOOTER)) {
  console.error(
    `\n  elm.js does not end with the expected IIFE footer ${FOOTER}`,
  );
  console.error(
    "  The compiler's output shape has changed. Re-check build-elm.mjs before",
  );
  console.error("  changing anything else - this rewrite is what makes the");
  console.error("  output importable as an ES module at all.");
  process.exit(1);
}

const patched =
  compiled.trimEnd().slice(0, -FOOTER.length) +
  "}(globalThis));\n\n" +
  "// appended by scripts/build-elm.mjs - see that file for why\n" +
  "export const Elm = globalThis.Elm;\n";

writeFileSync(outFile, patched);

console.log(`  elm.js written (${(patched.length / 1024).toFixed(0)} kB)`);