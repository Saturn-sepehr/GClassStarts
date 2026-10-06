import { RippleArray, track } from "ripple";

export function App() @{
  const rows = new RippleArray();
  let nextId = 1;

  const add = () => {
    rows.push({ id: nextId++ });
  };

  const reset = () => {
    rows.length = 0;
    nextId = 1;
  };

  <>
    {/* .scroll-progress is a modifier, not a behaviour — it sets no geometry,
        so the rule is in styles.css under .gc-bar. */}
    <div class="gc-bar scroll-progress"></div>

    <div class="container">
      <header class="expand-down ease-expo">
        <p class="font-mono text-sm" style={{ color: 'var(--color-brand)' }}>
          https://ripple-ts.com
        </p>
        <h1 class="mt-4 text-center text-5xl font-semibold leading-[1.1] tracking-tight scroll letter spawn-text-spawn-down">
          gclass-anims for Ripple
        </h1>
        <p class="subtitle mt-6 text-center scroll typewriter time-2">
          Ripple composes behaviour with <code>track()</code> and template-native
          control flow. gclass-anims composes it with class names. Mount the
          component, then call <code>initAnimations()</code> once.
        </p>
        <p class="subtitle mt-4 text-center">
          This build is <code>ssr: false</code> — Ripple's client-only mode, where
          components compile to bare DOM reads with no hydration cursor. That is
          also the only mode that produces a tree GitHub Pages can serve.
        </p>
        <p class="mt-8 text-center">
          <a href="#install" class="pill click-expand compatibility amount-4">
            Get started
          </a>
        </p>
      </header>

      <section id="install" class="content-section scroll-mt-24 scroll spawn-down section-blue">
        <h2 class="text-2xl font-semibold">Install</h2>
        <p class="mt-4 leading-relaxed" style={{ color: 'var(--color-body)' }}>
          GClass ships as the npm package gclass-anims. GSAP is a regular
          dependency and is installed automatically - nothing is bundled or
          redistributed. Ripple is a peer of this page, not a dependency of the
          library.
        </p>
        <pre class="mt-6">
          <code>npm install gclass-anims ripple</code>
          <button
            type="button"
            data-copy
            class="absolute right-4 top-4 rounded-[4px] border border-white/10 bg-black/30 px-2 py-1 text-[11px] font-medium text-white/60 transition-colors hover:text-[var(--color-brand)]"
            aria-label="Copy code"
          >
            Copy
          </button>
        </pre>
      </section>

      <section id="quick-start" class="content-section scroll-mt-24 scroll spawn-down">
        <h2 class="text-2xl font-semibold">Quick start</h2>
        <p class="mt-4 leading-relaxed" style={{ color: 'var(--color-body)' }}>
          Import initAnimations once your DOM is ready. From then on, everything
          is class-driven: add a utility class to an element and it animates - no
          per-element JS, no config files.
        </p>

        <h3 class="mt-8 text-lg font-semibold">Mount, then init</h3>
        <pre class="mt-4">
          <code>// main.js
import {'{'} mount {'}'} from 'ripple'
import {'{'} initAnimations {'}'} from 'gclass-anims'
import {'{'} App {'}'} from './App.tsrx'

mount(App, {'{'} target: document.getElementById('root') {'}'})

initAnimations()</code>
          <button
            type="button"
            data-copy
            class="absolute right-4 top-4 rounded-[4px] border border-white/10 bg-black/30 px-2 py-1 text-[11px] font-medium text-white/60 transition-colors hover:text-[var(--color-brand)]"
            aria-label="Copy code"
          >
            Copy
          </button>
        </pre>

        <h3 class="mt-8 text-lg font-semibold">Live - a RippleArray</h3>
        <p class="mt-4 leading-relaxed" style={{ color: 'var(--color-body)' }}>
          The button pushes onto a <code>RippleArray</code>. Ripple's compiler
          generates the keyed insert, and the new node plays its entrance because
          the engine is watching for insertions - not because anything
          re-initialised.
        </p>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" onClick={add} class="pill click-hover amount-2">
            Add a row
          </button>
          <button type="button" onClick={reset} class="pill click-hover amount-2">
            Reset
          </button>
          <span class="font-mono text-sm" style={{ color: 'var(--color-brand)' }}>
            {rows.length} rows
          </span>
        </div>

        <div class="mt-6 grid gap-3">
          @for (const row of rows; key row.id) {
            <div class="appear spawn-up time-1 rounded-[12px] border border-white/10 bg-black/30 p-4 font-mono text-[13px]">
              row {row.id} — inserted by a RippleArray
            </div>
          }
        </div>

        <pre class="mt-6">
          <code>const rows = new RippleArray()

@for (const row of rows; key row.id) {'{'}
  &lt;div class="appear spawn-up time-1"&gt;
    row {'{'}row.id{'}'}
  &lt;/div&gt;
{'}'}</code>
          <button
            type="button"
            data-copy
            class="absolute right-4 top-4 rounded-[4px] border border-white/10 bg-black/30 px-2 py-1 text-[11px] font-medium text-white/60 transition-colors hover:text-[var(--color-brand)]"
            aria-label="Copy code"
          >
            Copy
          </button>
        </pre>
      </section>

      <section id="anatomy" class="content-section scroll-mt-24 scroll spawn-down">
        <h2 class="text-2xl font-semibold">Class anatomy</h2>
        <p class="mt-4 leading-relaxed" style={{ color: 'var(--color-body)' }}>
          Class anatomy: <strong>behaviour</strong> (<code>.spawn-up</code>) +{" "}
          <strong>trigger</strong> (<code>.scroll</code>, <code>.appear</code>) +{" "}
          <strong>tunables</strong> (<code>.time-1</code>, <code>.ease-back</code>,{" "}
          <code>.priority-2</code>). Combine freely - order in class does not
          matter.
        </p>
        <pre class="mt-6">
          <code>&lt;!-- behaviour + trigger + tunables --&gt;
&lt;div class="appear scroll spawn-up"&gt;…&lt;/div&gt;
&lt;div class="appear scroll order ease-expo time-1 priority-2"&gt;…&lt;/div&gt;
&lt;div class="float"&gt;loops forever&lt;/div&gt;
&lt;button class="magnet click-expand"&gt;magnet + click&lt;/button&gt;</code>
          <button
            type="button"
            data-copy
            class="absolute right-4 top-4 rounded-[4px] border border-white/10 bg-black/30 px-2 py-1 text-[11px] font-medium text-white/60 transition-colors hover:text-[var(--color-brand)]"
            aria-label="Copy code"
          >
            Copy
          </button>
        </pre>

        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          <div class="card scroll spawn-down order priority-2">
            <h3 class="font-semibold" style={{ color: 'var(--color-brand)' }}>
              Behaviour
            </h3>
            <p class="mt-2 font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
              spawn-up, float, marquee, magnet
            </p>
          </div>
          <div class="card scroll spawn-down order priority-2">
            <h3 class="font-semibold" style={{ color: 'var(--color-brand)' }}>
              Trigger
            </h3>
            <p class="mt-2 font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
              appear, scroll, preserve
            </p>
          </div>
          <div class="card scroll spawn-down order priority-2">
            <h3 class="font-semibold" style={{ color: 'var(--color-brand)' }}>
              Tunables
            </h3>
            <p class="mt-2 font-mono text-xs" style={{ color: 'var(--color-muted)' }}>
              order, ease-expo, time-1, priority-2
            </p>
          </div>
        </div>
      </section>

      <section id="notes" class="content-section scroll-mt-24 scroll spawn-down">
        <h2 class="text-2xl font-semibold">Notes</h2>
        <ul class="features">
          <li>
            <strong>Reactive collections are covered.</strong>{" "}
            <code>RippleArray</code>, <code>RippleObject</code> and{" "}
            <code>RippleMap</code> all compile to real DOM writes. Each insertion
            is what the MutationObserver reacts to.
          </li>
          <li>
            <strong>Scoped styles do not reach gclass.</strong> Ripple hashes a{" "}
            <code>&lt;style&gt;</code> block's class names per component. gclass
            reads the ordinary <code>class</code> attribute, so utility classes on
            the same element survive the scoping untouched.
          </li>
          <li>
            <strong>GSAP stays external.</strong> ESM is{" "}
            <code>dist/gclass.esm.js</code> and CJS is <code>dist/gclass.cjs</code>{" "}
            - GSAP is external, not bundled, and the build is tree-shakable with{" "}
            <code>sideEffects: false</code>.
          </li>
        </ul>
      </section>

      <div class="notice scroll spawn-down">
        <p>
          Not affiliated with or endorsed by the Ripple team. Colours and type
          sampled from <code>https://ripple-ts.com</code>, including its{" "}
          <code>Recursive</code> CASL axis, its tiled starfield and its 12px
          panel radius. Running gclass-anims 1.0.0-beta.24 from npm with Ripple.
        </p>
      </div>
    </div>
  </>
}