import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Vanilla has no bundler, so instead of a build step this asserts that the
// published package would actually resolve in the browser: the exact version,
// that the ESM bundle ships, that every bare specifier it imports is covered
// by the import map in index.html, and that the gsap subpaths are installed.

const root = join(dirname(fileURLToPath(import.meta.url)));
const fail = [];

const check = (label, ok, detail = "") => {
  console.log(`${ok ? "  ok  " : " FAIL "} ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) fail.push(label);
};

const pkgPath = join(root, "node_modules", "gclass-anims", "package.json");
check("gclass-anims is installed", existsSync(pkgPath));
if (existsSync(pkgPath)) {
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  check("version is 1.0.0-beta.23", pkg.version === "1.0.0-beta.23", pkg.version);
}

const esm = join(root, "node_modules", "gclass-anims", "dist", "gclass.esm.js");
check("dist/gclass.esm.js ships in the tarball", existsSync(esm));

if (existsSync(esm)) {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const mapBlock = html.match(/<script type="importmap">([\s\S]*?)<\/script>/);
  check("index.html declares an import map", Boolean(mapBlock));

  const imports = new Set();
  const source = readFileSync(esm, "utf8");
  for (const m of source.matchAll(/(?:from|import)\s*["']([^"']+)["']/g)) {
    if (!m[1].startsWith(".") && !m[1].startsWith("/")) imports.add(m[1]);
  }
  console.log(`       bare specifiers in bundle: ${[...imports].join(", ") || "(none)"}`);

  const mapped = new Set(Object.keys(JSON.parse(mapBlock[1]).imports));
  for (const spec of imports) {
    const covered = mapped.has(spec) || [...mapped].some((k) => k.endsWith("/") && spec.startsWith(k));
    check(`import map covers "${spec}"`, covered);
  }
}

for (const p of ["gsap/index.js", "gsap/all.js"]) {
  check(`gsap provides ${p}`, existsSync(join(root, "node_modules", p)));
}

if (fail.length) {
  console.error(`\nvanilla: ${fail.length} check(s) failed`);
  process.exit(1);
}
console.log("\nvanilla: all checks passed");
