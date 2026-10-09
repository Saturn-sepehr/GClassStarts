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
| `alpine` | vite 8, Alpine 3 | `document.addEventListener('alpine:init', …)` |
| `backbone` | vite 8, Backbone 1.6 | `initAnimations()` on `DOMContentLoaded`, then `view.render()` |
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
| `ember` | Ember 7.3 (Embroider + Vite) | `initAnimations()` in a component constructor |
| `remix` | Remix 2.17 | `useEffect` on `location.pathname` |
| `qwik` | Qwik 1.20 City | `useVisibleTask$` (not `useTask$`) |
| `angular` | Angular 22, zoneless | `ngAfterViewInit` + `isPlatformBrowser` |
| `htmx` | vite 8, htmx 2 | `initAnimations()` on `DOMContentLoaded` |
| `stimulus` | vite 8, Stimulus 3 | `initAnimations()` after `Application.start()` |
| `marko` | vite 8, Marko 6 (`@marko/vite`) | `initAnimations()` after `Page.mount()` |
| `solidstart` | SolidStart 2, nitro prerender | `initAnimations()` in the root layout's `onMount` |
| `ripple` | vite 8, Ripple 0.4 (`.tsrx`) | `initAnimations()` after `mount(App)` |
| `riot` | vite 8, Riot 10 (`riot-plugin.js`) | `initAnimations()` after `component(...)` |
| `knockout` | vite 8, Knockout 3 | `initAnimations()` after `applyBindings()` |
| `elm` | vite 8, Elm 0.19 (`elm make`) | `initAnimations()` after `Elm.Main.init()` |
| `stencil` | Stencil 4, `www` output | `initAnimations()` in `componentDidLoad` |
| `meteor` | Meteor 3, Blaze | `initAnimations()` in `onRendered` |
| `mithril` | vite 8, Mithril 2 | `initAnimations()` after `m.mount()` |
| `enhance` | vite 8, Enhance (custom elements) | `initAnimations()` on `DOMContentLoaded` |
| `analog` | Analog 2, Angular 22, zoneless | `initAnimations()` in `ngOnInit` + `isPlatformBrowser` |
| `hotwire` | vite 8, Turbo 8 + Stimulus 3 | `initAnimations()` on `turbo:load` |

The toolchains are deliberately **not** interchangeable — Ember brings its own
Embroider + Vite pipeline, Qwik peers `vite >=5 <8`, Remix peers
`vite ^5 || ^6` and `typescript ^5`, Angular peers `typescript >=6 <6.1`,
SvelteKit 3 peers `vite ^8`, SolidStart 2 drives Vite through its own environment
API and refuses `app.config.ts`, and Meteor is not a bundler at all — its CLI is
a global tool with its own toolchain under `~/.meteor`. A matrix has to cover all
of them.

Several of the new environments need something the rest do not:

- **SolidStart** prerenders through nitro rather than Vite. Its `ssr: false` SPA
  mode emits route chunks and *no* `index.html`, so there is nothing to serve
  without a prerender pass.
- **Riot 10** ships a compiler but no official Vite plugin — there is no
  `@vitejs/plugin-riot` on the registry. `tests/riot/riot-plugin.js` is that
  integration written out.
- **Elm** compiles to a non-ESM IIFE whose footer ends in `}(this))`, which
  throws when imported. `tests/elm/scripts/build-elm.mjs` rewrites the footer and
  appends a real `export`.
- **Stencil** has no base-path concept, so its loader's `/build/` refs are
  rewritten during staging exactly like Qwik's `/assets/` refs.

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
| Vite plugin | jquery, alpine, backbone, htmx, stimulus, marko, react, vue, preact, solid, lit, svelte, sveltekit, qwik, remix, ripple, riot, knockout, elm, mithril, enhance, hotwire | `@tailwindcss/vite` |
| Nested Vite config | astro, nuxt | `vite.plugins` in `astro.config.mjs` / `nuxt.config.ts` |
| Top-level Vite plugin | solidstart, analog | `plugins: [solidStart()]` / `[analog()]` — both meta-frameworks *are* Vite plugins, so Tailwind sits beside them |
| PostCSS | next, ember, angular | `@tailwindcss/postcss` + `postcss.config.mjs` / `.postcssrc.json` |
| CLI | vanilla, stencil, meteor | `@tailwindcss/cli` as the CSS build step — vanilla still has **no JS bundler** |

In every case it is a CSS-first setup: `@import "tailwindcss";` at the top of the
environment's stylesheet, no `tailwind.config.js`.

One thing to know while editing: the `.gc-*` demo styles are **unlayered**, and
in the CSS cascade unlayered rules beat layered ones. Tailwind's utilities live
in `@layer utilities`. So where a demo rule and a Tailwind utility target the
same property on the same element, the demo rule wins. Wrap the demo CSS in
`@layer components { … }` if you want Tailwind utilities to take precedence.

## Running it

```bash
npm test                     # install + build all 32
node scripts/verify-all.mjs --filter=vue
node scripts/verify-all.mjs --skip-install   # reuse node_modules
```

Output:

```
jquery      pass
react       pass
...
32/32 environments passed
```

## CI

[`.github/workflows/tests.yml`](./.github/workflows/tests.yml) runs one job per
environment with `fail-fast: false`, caches npm per environment, and re-asserts
the pinned version both before install and after resolution. That second
assertion matters: it catches a caret range quietly drifting off the version
under test.

## What this proves

**Automated** — `npm test` and CI: the published tarball installs, resolves,
imports and compiles in all 32 environments — including the SSR and SSG
toolchains where Next, Nuxt, SvelteKit, Astro, Qwik, Remix, SolidStart, Analog
and Meteor all prerender or emit server bundles successfully. Riot and Stencil
compile their own component languages (`.riot`, `.tsx`) through their own
compilers, and Elm goes through `elm make`. The `vanilla` environment adds a
static check on top of the build — that the import map covers every bare
specifier the published ESM bundle imports.

**Manual** — every environment has been opened in a browser and the library
exercised: spawn entrances, scroll and `.appear` triggers, the looping
behaviours, the pointer behaviours, and the reduced-motion opt-out all play as
documented. This is the part no build step can stand in for — only a running
page shows that a tween fires, that `.appear` replays when a mutation lands, that
scroll triggers resolve, or that reduced motion is honoured.

The automated half is deliberately the half that can run unattended and on every
commit. Keeping the two claims separate is the point: a green CI run says the
package resolves everywhere, and a page with animations on it says the package
works everywhere.

Still worth a browser suite if this grows: Safari and Firefox rendering, and
the `.preserve`, `on-*-complete-*`, `customAnims` and `gclassDev` API surface.

## Deploying to GitHub Pages

One Pages site, thirty-two sub-paths:

```
https://saturn-sepehr.github.io/GClassStarts/<env>/
```

GitHub Pages serves a project repo at `github.io/<repo-name>/`, so every
environment is configured with `base = /GClassStarts/<env>` and staged into
`public/<env>/`. `public/` is generated, not committed.

**One-time setup in the repo:** Settings → Pages → Source → **GitHub Actions**.
The workflow cannot do that part for you.

```bash
npm run pages:build      # build all 32 and stage public/
npm run pages:assemble   # re-stage from an existing stage/ (CI does this)
```

`public/` and `stage/` are gitignored.

### Static output configuration

Pages serves files only — no Node runtime — so the SSR frameworks are switched
to static output:

| Environment | Configuration |
|---|---|
| jquery, alpine, backbone, htmx, stimulus, marko, react, vue, preact, solid, lit, svelte, ripple, riot, knockout, elm | `base` in `vite.config.js` |
| astro | `base` in `astro.config.mjs` |
| next | `output: 'export'`, `basePath`, `trailingSlash` |
| nuxt | `nuxt generate` + `app.baseURL` |
| sveltekit | `paths.base` — kit 3 reads `kit.paths.base`, not a Vite `base` |
| ember | Vite `base` + `rootURL` in `config/environment.js`, hash routing |
| qwik | static adapter + `basePathname` |
| angular | `baseHref` + `deployUrl` |
| remix | SPA mode (`ssr: false`) — Remix 2 has no static export |
| solidstart | nitro prerenderer pointed at `/`; `.output/public` is the tree |
| analog | `dist/client` — the prerender path fails with NG0401 on this app's provider set, so it ships client-built |
| stencil | `www` output target with `srcDir: "src"`; `/build/` refs rewritten at stage time |
| meteor | `scripts/stage-static.mjs` unwraps the server tarball into a client-only tree |
| mithril, enhance, hotwire | plain `base` in `vite.config.js` |
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
- **Stencil** has no base-path option at all, so `build-pages.mjs` rewrites its
  `/build/` refs to `/GClassStarts/stencil/build/` the same way it rewrites
  Qwik's `/assets/` refs.

## Licence

MIT, matching the `gclass-anims` package. GSAP is not bundled or redistributed here
either; it is installed as a dependency of `gclass-anims` under the Webflow
Standard No-Charge GSAP License.
