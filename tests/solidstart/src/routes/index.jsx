import { createSignal, For } from "solid-js";

export default function Home() {
  const [rows, setRows] = createSignal([]);

  // Solid has no VDOM: these are real DOM insertions, which is exactly what the
  // gclass engine's MutationObserver reacts to. The <For> below re-renders and
  // each new node plays its entrance with no second initAnimations() call.
  const add = () => setRows((r) => [...r, r.length + 1]);
  const reset = () => setRows([]);

  return (
    <>
      {/* .scroll-progress is a modifier, not a behaviour - it sets no geometry,
          so the rule is in app.css under .gc-bar. */}
      <div class="gc-bar scroll-progress"></div>

      <header class="site-header expand-down ease-expo">
        <div class="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6">
          <a href="https://www.solidjs.com/" class="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="var(--color-brand)" />
              <circle cx="50" cy="50" r="22" fill="var(--color-page)" />
            </svg>
            <span class="font-display text-lg font-bold text-white">solid</span>
          </a>
          <nav class="site-nav ml-auto hidden items-center sm:flex">
            <a href="#install">Install</a>
            <a href="#quick-start">Quick start</a>
            <a href="#anatomy">Class anatomy</a>
            <a href="#notes">Notes</a>
          </nav>
          <a href="#install" class="btn ml-auto text-xs sm:ml-0">
            Get started
          </a>
        </div>
      </header>

      <main id="main" class="mx-auto max-w-6xl px-6 pb-24">
        <section class="py-20">
          <p class="font-mono text-sm text-brandlight">https://www.solidjs.com/</p>
          <h1 class="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.1] tracking-tight scroll letter spawn-text-spawn-down sm:text-6xl">
            gclass-anims <span class="text-brandlight">for SolidStart</span>
          </h1>
          <p class="lede mt-6 max-w-2xl scroll typewriter time-2">
            SolidStart is Solid's meta-framework: Vinxi, file routes, and{" "}
            <code>@solidjs/meta</code> for the document head. Call{" "}
            <code>initAnimations()</code> once from the root layout's{" "}
            <code>onMount</code> and every route it renders afterwards animates
            too.
          </p>
          <p class="lede mt-4 max-w-2xl">
            This build runs <code>ssr: false</code> because GitHub Pages serves
            files only - no Node runtime. That makes it a pure SPA, so there is
            no hydration boundary to wait on.
          </p>
          <a href="#install" class="btn mt-8 click-expand compatibility amount-4">
            Get started
          </a>
        </section>

        <section id="install" class="scroll-mt-24 py-10">
          <h2 class="scroll letter spawn-text-spawn-down text-4xl">Install</h2>
          <p class="lede mt-3 scroll typewriter">
            GClass ships as the npm package gclass-anims. GSAP is a regular
            dependency and is installed automatically - nothing is bundled or
            redistributed. SolidStart is a peer of this page, not a dependency of
            the library.
          </p>
          <div class="mt-5 scroll spawn-down">
            <Code>{`npm install gclass-anims @solidjs/start solid-js`}</Code>
          </div>
        </section>

        <section id="quick-start" class="scroll-mt-24 py-10">
          <h2 class="scroll letter spawn-text-spawn-down text-4xl">Quick start</h2>
          <p class="lede mt-3 scroll typewriter">
            Import initAnimations once your DOM is ready. From then on,
            everything is class-driven: add a utility class to an element and it
            animates - no per-element JS, no config files.
          </p>

          <h3 class="mt-8 text-xl font-bold text-white">One call, in onMount</h3>
          <div class="mt-4 scroll spawn-down">
            <Code>{`// src/entry-client.jsx
import { onMount } from 'solid-js'
import { initAnimations } from 'gclass-anims'

onMount(() => {
  initAnimations()
})`}</Code>
          </div>

          <h3 class="mt-8 text-xl font-bold text-white">
            Live - a{" "}
            <code class="text-brandlight">&lt;For&gt;</code> driven by a signal
          </h3>
          <p class="lede mt-3 scroll typewriter">
            The button calls a signal setter. <code>&lt;For&gt;</code>{" "}
            re-renders and inserts real DOM nodes, and each one plays its
            entrance because the engine is watching for insertions - not because
            anything re-initialised.
          </p>
          <div class="mt-5 flex flex-wrap items-center gap-3">
            <button type="button" onClick={add} class="btn click-hover amount-2">
              Add a row
            </button>
            <button type="button" onClick={reset} class="btn btn--ghost click-hover amount-2">
              Reset
            </button>
            <span class="font-mono text-xs text-muted">
              {rows().length} rows
            </span>
          </div>
          <div class="mt-4 grid gap-2">
            <For each={rows()}>
              {(row) => (
                <div class="card appear spawn-up time-1 font-mono text-[13px]">
                  row {row} — inserted by a Solid signal
                </div>
              )}
            </For>
          </div>

          <div class="mt-5 scroll spawn-down">
            <Code>{`const [rows, setRows] = createSignal([])

<For each={rows()}>
  {(row) => (
    <div class="appear spawn-up time-1">
      row {row}
    </div>
  )}
</For>`}</Code>
          </div>
        </section>

        <section id="anatomy" class="scroll-mt-24 py-10">
          <h2 class="scroll letter spawn-text-spawn-down text-4xl">
            Class anatomy
          </h2>
          <p class="lede mt-3 scroll typewriter-split letter">
            Class anatomy: <strong class="text-white">behaviour</strong> (
            <code>.spawn-up</code>) + <strong class="text-white">trigger</strong> (
            <code>.scroll</code>, <code>.appear</code>) +{" "}
            <strong class="text-white">tunables</strong> (
            <code>.time-1</code>, <code>.ease-back</code>,{" "}
            <code>.priority-2</code>). Combine freely - order in class does not
            matter.
          </p>
          <div class="mt-5 scroll spawn-down">
            <Code>{`<!-- behaviour + trigger + tunables -->
<div class="appear scroll spawn-up">…</div>
<div class="appear scroll order ease-expo time-1 priority-2">…</div>
<div class="float">loops forever</div>
<button class="magnet click-expand">magnet + click</button>`}</Code>
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-3">
            <div class="card scroll spawn-down order priority-2">
              <h3 class="font-bold text-brandlight">Behaviour</h3>
              <p class="mt-1 font-mono text-[12px]">
                spawn-up, float, marquee, magnet
              </p>
            </div>
            <div class="card scroll spawn-down order priority-2">
              <h3 class="font-bold text-brandlight">Trigger</h3>
              <p class="mt-1 font-mono text-[12px]">appear, scroll, preserve</p>
            </div>
            <div class="card scroll spawn-down order priority-2">
              <h3 class="font-bold text-brandlight">Tunables</h3>
              <p class="mt-1 font-mono text-[12px]">
                order, ease-expo, time-1, priority-2
              </p>
            </div>
          </div>
        </section>

        <section id="notes" class="scroll-mt-24 py-10">
          <h2 class="scroll letter spawn-text-spawn-down text-4xl">Notes</h2>
          <ul class="mt-6 grid gap-4">
            <li class="card scroll spawn-down order priority-3">
              <strong class="text-white">Routes need nothing special.</strong>{" "}
              This page calls <code>initAnimations()</code> once from the root
              layout. A route rendered later is covered by the same
              MutationObserver - and if you boot with{" "}
              <code>ssr: true</code>, call it from a client-only hook instead.
            </li>
            <li class="card scroll spawn-down order priority-3">
              <strong class="text-white">Solid has no VDOM.</strong> Nodes
              persist across updates rather than being recreated, so a class that
              only needs wiring once keeps its tween. This is the one framework
              where re-init on update actively works against you.
            </li>
            <li class="card scroll spawn-down order priority-3">
              <strong class="text-white">Tailwind rides along.</strong>{" "}
              SolidStart drives Vite itself, so Tailwind goes in as a nested{" "}
              <code>vite.plugins</code> entry rather than a top-level plugin.
            </li>
          </ul>
        </section>

        <footer class="site-footer mt-12 px-6 py-12">
          <div class="mx-auto max-w-6xl text-sm text-muted">
            <p>
              Not affiliated with or endorsed by the Solid team. Colours and
              type sampled from{" "}
              <a
                class="text-brandlight hover:underline"
                href="https://www.solidjs.com/"
              >
                https://www.solidjs.com/
              </a>
              . Running gclass-anims 1.0.0-beta.24 from npm with SolidStart,
              prerendered by nitro into static HTML.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

// The code block, with its copy button. Kept as a local component so the page
// itself stays readable - this is page structure, not an animation demo.
function Code(props) {
  return (
    <pre class="group relative overflow-x-auto p-4 pr-16">
      <code>{props.children}</code>
      <button
        type="button"
        data-copy
        class="absolute right-2 top-2 rounded border border-line bg-panel2 px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:text-brandlight"
        aria-label="Copy code"
      >
        Copy
      </button>
    </pre>
  );
}