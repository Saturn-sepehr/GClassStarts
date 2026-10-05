# GClassStarts

A testing enviroment and documentation page for GClass (`gclass-anims`) on different frameworks.
[quick-start page](https://saturn-sepehr.github.io/GClass/documentation/quick-start/).

Every single page within this website uses the corresponding framework.

| | |
|---|---|
| Package | [`gclass-anims`](https://www.npmjs.com/package/gclass-anims) |
| Source | [Saturn-sepehr/GClass](https://github.com/Saturn-sepehr/GClass) |
| Docs | [saturn-sepehr.github.io/GClass](https://saturn-sepehr.github.io/GClass/) |

## Why this exists

The only reason this exists is to test all frameworks properly and spice up the documentation page.

## Environments

| Environment | Toolchain | Init hook used |
|---|---|---|
| `vanilla` | none — browser import map | `initAnimations()` from the entry module |
| `jquery` | vite 8, jQuery 4 | `$(function () { initAnimations() })` |
| `react` | vite 8, React 19 (StrictMode) | `useEffect(() => initAnimations(), [])` |
| `vue` | vite 8, Vue 3 | `onMounted` |
| `preact` | vite 8, Preact 11 | `useEffect` + `popstate` re-init |
| `solid` | vite 8, SolidJS | `onMount` |
| `lit` | vite 8, Lit 3 | `firstUpdated` (light DOM + scoped shadow DOM) |
| `svelte` | vite 8, Svelte 5 | `onMount` |
| `astro` | Astro 7 | layout `<script>` + `astro:after-swap` |
| `next` | Next 16 App Router | client component keyed on `usePathname` |
| `nuxt` | Nuxt 4 | `.client` plugin + `route.fullPath` watcher |
| `sveltekit` | SvelteKit 3 | `onMount` + `afterNavigate` |
| `remix` | Remix 2.17 | `useEffect` on `location.pathname` |
| `qwik` | Qwik 1.20 City | `useVisibleTask$` (not `useTask$`) |
| `angular` | Angular 22, zoneless | `ngAfterViewInit` + `isPlatformBrowser` |

The toolchains are deliberately **not** interchangeable — Qwik peers
`vite >=5 <8`, Remix peers `vite ^5 || ^6` and `typescript ^5`, Angular peers
`typescript >=6 <6.1`, SvelteKit 3 peers `vite ^8`. A matrix has to cover all of
them.

Every page renders the same documented class anatomy — behaviour + trigger +
tunables, per the docs:

```html
<div class="appear scroll spawn-up">…</div>
<div class="appear scroll order ease-expo time-1 priority-2">…</div>
<div class="float">…</div>
<button class="magnet click-expand">…</button>
<div class="scroll-progress"></div>
<div class="parallax-2">…</div>
```

## Tailwind

Every environment also has **Tailwind v4** wired up, so you can compare gclass's
utility classes against a real utility framework in each one.

| Path | Environments | Integration |
|---|---|---|
| Vite plugin | jquery, react, vue, preact, solid, lit, svelte, sveltekit, qwik, remix | `@tailwindcss/vite` |
| Nested Vite config | astro, nuxt | `vite.plugins` in `astro.config.mjs` / `nuxt.config.ts` |
| PostCSS | next, angular | `@tailwindcss/postcss` + `postcss.config.mjs` / `.postcssrc.json` |
| CLI | vanilla | `@tailwindcss/cli` as the CSS build step — still **no JS bundler** |

In every case it is a CSS-first setup: `@import "tailwindcss";` at the top of the
environment's stylesheet, no `tailwind.config.js`.

One thing to know while editing: the `.gc-*` demo styles are **unlayered**, and
in the CSS cascade unlayered rules beat layered ones. Tailwind's utilities live
in `@layer utilities`. So where a demo rule and a Tailwind utility target the
same property on the same element, the demo rule wins. Wrap the demo CSS in
`@layer components { … }` if you want Tailwind utilities to take precedence.

## Running it

```bash
npm test                     # install + build all 15
node scripts/verify-all.mjs --filter=vue
node scripts/verify-all.mjs --skip-install   # reuse node_modules
```

Output:

```
jquery      pass
react       pass
...
14/15 environments passed
```

## CI

[`.github/workflows/tests.yml`](./.github/workflows/tests.yml) runs one job per
environment with `fail-fast: false`, caches npm per environment, and re-asserts
the pinned version both before install and after resolution. That second
assertion matters: it catches a caret range quietly drifting off the version
under test.

## What this does and does not prove

**Proven:** the published tarball installs, resolves, imports and compiles in 15
environments — including SSR and SSG toolchains where Next, Nuxt, SvelteKit,
Astro, Qwik and Remix all prerender or emit server bundles successfully.

**Not proven:** runtime behaviour. No browser executed these builds. A green
build proves the import resolves and the modules compile — not that an animation
plays, that `.appear` replays on mutation, that scroll triggers fire, or that
reduced motion is honoured. That needs a headless-browser suite (Playwright)
asserting on computed styles, and it is the obvious next step.

Also unexercised here: Safari/Firefox rendering, and the `.preserve`,
`on-*-complete-*`, `customAnims` and `gclassDev` API surface.

## Deploying to GitHub Pages

One Pages site, fifteen sub-paths:

```
https://saturn-sepehr.github.io/GClassStarts/<env>/
```

GitHub Pages serves a project repo at `github.io/<repo-name>/`, so every
environment is configured with `base = /GClassStarts/<env>` and staged into
`public/<env>/`. `public/` is generated, not committed.

**One-time setup in the repo:** Settings → Pages → Source → **GitHub Actions**.
The workflow cannot do that part for you.

```bash
npm run pages:build      # build all 15 and stage public/
npm run pages:assemble   # re-stage from an existing stage/ (CI does this)
```

`public/` and `stage/` are gitignored.

### Static output configuration

Pages serves files only — no Node runtime — so the SSR frameworks are switched
to static output:

| Environment | Configuration |
|---|---|
| jquery, react, vue, preact, solid, lit, svelte | `base` in `vite.config.js` |
| astro | `base` in `astro.config.mjs` |
| next | `output: 'export'`, `basePath`, `trailingSlash` |
| nuxt | `nuxt generate` + `app.baseURL` |
| sveltekit | `paths.base` — kit 3 reads `kit.paths.base`, not a Vite `base` |
| qwik | static adapter + `basePathname` |
| angular | `baseHref` + `deployUrl` |
| remix | SPA mode (`ssr: false`) — Remix 2 has no static export |
| vanilla | no bundler; `node_modules` copies staged alongside the page |

### CI

[`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml)
builds each environment on its own matrix leg, stages to `stage/<env>/`,
assembles one `public/` tree, asserts that no asset path escapes its
subdirectory, then uploads a single Pages artifact.

Staging through `stage/<env>/` matters: `upload-artifact` strips the common
ancestor of the uploaded paths, so uploading `dist/` directly would drop the
environment name and every leg would collide on merge.

### Two upstream quirks worked around

- **Qwik** honours `basePathname` for its own `/build/…` URLs but still emits
  the bundle-graph preload as an absolute `/assets/…`. Vite's `base` only
  relocates the output directory, which then disagrees with the HTML — so
  `base` is left unset and `scripts/build-pages.mjs` rewrites that one path.
- **Remix**'s `base` must keep its trailing slash, or Vite concatenates
  `/GClassStarts/remix` + `assets/…` into `/GClassStarts/remixassets/…`.

## Licence

MIT, matching the `gclass-anims` package. GSAP is not bundled or redistributed here
either; it is installed as a dependency of `gclass-anims` under the Webflow
Standard No-Charge GSAP License.
