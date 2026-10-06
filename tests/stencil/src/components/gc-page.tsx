import { Component, h } from "@stencil/core";
import { initAnimations } from "gclass-anims";

/**
 * The page itself.
 *
 * Stencil components return JSX, so the whole document below is a component
 * rather than static markup — that is the framework's own model, not a
 * workaround. index.html holds only the two custom elements and the script
 * Stencil injects.
 *
 * Light DOM throughout, for the reason documented on gc-row-list.
 */
@Component({
  tag: "gc-page",
  shadow: false,
})
export class Page {
  /**
   * The one initAnimations() call for the whole page.
   *
   * componentDidLoad fires after this component's own render has been attached,
   * and this is the outermost component, so by the time it runs every element
   * the page contains is a real child of the document — which is what the engine
   * walks. Custom elements Stencil lazy-loads later insert their own nodes, and
   * the MutationObserver covers those without another call.
   */
  componentDidLoad() {
    initAnimations();

    // One delegated handler on document covers every code block's copy button,
    // including any a lazy component renders later.
    document.addEventListener("click", (event) => {
      // EventTarget is not guaranteed to be an Element, so narrow it before
      // calling closest(). Every other environment in this repo gets this for
      // free from plain JS; TypeScript does not.
      const target = event.target;
      if (!(target instanceof Element)) return;

      const btn = target.closest("[data-copy]");
      if (!btn) return;

      const code = btn.parentElement.querySelector("code");
      if (!code) return;

      const done = (label) => {
        btn.textContent = label;
        btn.classList.add("text-ok");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("text-ok");
        }, 1400);
      };

      navigator.clipboard
        .writeText(code.innerText)
        .then(() => done("Copied"), () => done("Failed"));
    });

    console.log("gclass-anims 1.0.0-beta.24 initialised (stencil)");
  }

  render() {
    return (
      <div>
        <header class="site-header expand-down ease-expo">
          <a class="text-lg font-bold text-ink" href="https://stenciljs.com/">
            stencil
          </a>
          <nav class="flex items-center">
            <a href="#install">Install</a>
            <span class="header-separator"></span>
            <a href="#quick-start">Quick start</a>
            <span class="header-separator"></span>
            <a href="#anatomy">Class anatomy</a>
            <span class="header-separator"></span>
            <a href="#notes">Notes</a>
          </nav>
        </header>

        <main>
          <section class="px-6 py-20 text-center">
            <span class="pill mb-6">gclass-anims 1.0.0-beta.24</span>
            <p class="font-mono text-sm">
              <a class="text-brand" href="https://stenciljs.com/">
                https://stenciljs.com/
              </a>
            </p>
            <h1 class="mx-auto mt-6 max-w-3xl text-5xl font-extrabold leading-none tracking-tight scroll letter spawn-text-spawn-down">
              The <em class="grad-text">compiler</em> that turns JSX into web
              components
            </h1>
            <p class="mx-auto mt-6 max-w-2xl scroll typewriter time-2">
              Stencil compiles JSX into standards-based custom elements with a
              real build step. gclass-anims animates whatever those elements put
              in the document. One <code>initAnimations()</code> call covers the
              whole page.
            </p>
            <p class="mt-10">
              <a href="#install" class="btn click-expand compatibility amount-4">
                Get started
              </a>
            </p>
          </section>

          <section class="band px-6 py-16">
            <div class="mx-auto grid max-w-6xl gap-6 sm:grid-cols-3">
              <div class="card scroll spawn-up order priority-2">
                <h3 class="text-brand">Behaviour</h3>
                <p class="mt-1 font-mono text-[12px]">
                  spawn-up, float, marquee, magnet
                </p>
              </div>
              <div class="card scroll spawn-up order priority-3">
                <h3 class="text-brand">Trigger</h3>
                <p class="mt-1 font-mono text-[12px]">appear, scroll, preserve</p>
              </div>
              <div class="card scroll spawn-up order priority-4">
                <h3 class="text-brand">Tunables</h3>
                <p class="mt-1 font-mono text-[12px]">
                  order, ease-expo, time-1, priority-2
                </p>
              </div>
            </div>
          </section>

          <section id="install" class="scroll-mt-24 px-6 py-16">
            <div class="mx-auto max-w-3xl">
              <h2 class="scroll letter spawn-text-spawn-down text-4xl">Install</h2>
              <p class="scroll typewriter">
                GClass ships as the npm package gclass-anims. GSAP is a regular
                dependency and is installed automatically - nothing is bundled or
                redistributed. Stencil is a peer of this page, not a dependency of
                the library.
              </p>
              <div class="code-panel scroll spawn-down mt-5">
                <code>npm install gclass-anims @stencil/core</code>
              </div>
            </div>
          </section>

          <section id="quick-start" class="scroll-mt-24 px-6 py-16">
            <div class="mx-auto max-w-3xl">
              <h2 class="scroll letter spawn-text-spawn-down text-4xl">
                Quick start
              </h2>
              <p class="scroll typewriter">
                Import initAnimations once your DOM is ready. From then on,
                everything is class-driven: add a utility class to an element and
                it animates - no per-element JS, no config files.
              </p>

              <h3 class="mt-8 text-2xl">One call, in componentDidLoad</h3>
              <p class="scroll typewriter">
                Stencil components have a lifecycle and a lazy-loaded entry, so
                this page calls the engine from the root component's
                <code> componentDidLoad</code> rather than from an external
                script. Because that component renders light DOM, the elements
                it produced are ordinary document children by then.
              </p>
              <div class="code-panel scroll spawn-down mt-4">
                <code>{`// src/components/gc-page.tsx
@Component({ tag: 'gc-page', shadow: false })
export class Page {
  componentDidLoad() {
    initAnimations()
  }

  render() {
    return <div class="appear scroll spawn-up">…</div>
  }
}`}</code>
              </div>

              <h3 class="mt-8 text-2xl">
                Live — rows from a <code>@State()</code> array
              </h3>
              <p class="scroll typewriter">
                Nothing re-initialises after this point. The button updates the
                component's <code>@State()</code>, Stencil's virtual DOM diff
                inserts real elements, and each one plays its entrance because
                the engine is watching for insertions.
              </p>

              <gc-row-list></gc-row-list>

              <div class="code-panel scroll spawn-down mt-5">
                <code>{`// gc-row-list.tsx
@Component({ tag: 'gc-row-list', shadow: false })
export class RowList {
  @State() rows: number[] = []

  private add = () => {
    this.rows = [...this.rows, this.rows.length + 1]
  }

  render() {
    return (
      <>
        <button onClick={this.add}>Add a row</button>
        {this.rows.map((row) => (
          <div key={row} class="appear spawn-up time-1">
            row {row}
          </div>
        ))}
      </>
    )
  }
}`}</code>
              </div>
            </div>
          </section>

          <section id="anatomy" class="scroll-mt-24 px-6 py-16">
            <div class="mx-auto max-w-3xl">
              <h2 class="scroll letter spawn-text-spawn-down text-4xl">
                Class anatomy
              </h2>
              <p class="scroll typewriter-split letter">
                Class anatomy: <strong class="text-ink">behaviour</strong> (
                <code>.spawn-up</code>) +{" "}
                <strong class="text-ink">trigger</strong> (
                <code>.scroll</code>, <code>.appear</code>) +{" "}
                <strong class="text-ink">tunables</strong> (
                <code>.time-1</code>, <code>.ease-back</code>,{" "}
                <code>.priority-2</code>). Combine freely — order in class does
                not matter.
              </p>
              <div class="code-panel scroll spawn-down mt-5">
                <code>{`<!-- behaviour + trigger + tunables -->
<div class="appear scroll spawn-up">…</div>
<div class="appear scroll order ease-expo time-1 priority-2">…</div>
<div class="float">loops forever</div>
<button class="magnet click-expand">magnet + click</button>`}</code>
              </div>
            </div>
          </section>

          <section id="notes" class="scroll-mt-24 px-6 py-16">
            <div class="mx-auto max-w-3xl">
              <h2 class="scroll letter spawn-text-spawn-down text-4xl">Notes</h2>
              <ul class="grid gap-4">
                <li class="card scroll spawn-down order priority-2">
                  <strong class="text-ink">Shadow DOM hides the classes.</strong>{" "}
                  gclass-anims queries the document. Inside a shadow root, neither
                  the utility classes on the host nor the elements the engine
                  watches are visible to it — so these components use{" "}
                  <code>shadow: false</code>.
                </li>
                <li class="card scroll spawn-down order priority-2">
                  <strong class="text-ink">Lazy components are fine.</strong> The
                  engine's MutationObserver picks up each custom element's contents
                  when it is appended, which is the only hook a lazy-loaded
                  component needs.
                </li>
                <li class="card scroll spawn-down order priority-2">
                  <strong class="text-ink">GSAP stays external.</strong> ESM is{" "}
                  <code>dist/gclass.esm.js</code> and CJS is{" "}
                  <code>dist/gclass.cjs</code> - GSAP is external, not bundled,
                  and the build is tree-shakable with{" "}
                  <code>sideEffects: false</code>.
                </li>
              </ul>
            </div>
          </section>

          <footer class="band mt-8 px-6 py-16 text-center text-sm text-muted">
            <p>
              Not affiliated with or endorsed by the Stencil team. Colours and
              type sampled from{" "}
              <a class="text-brand hover:underline" href="https://stenciljs.com/">
                https://stenciljs.com/
              </a>
              , including its <code>:root</code> token block and its 100px button
              radius. Running gclass-anims 1.0.0-beta.24 from npm with Stencil 4.
            </p>
          </footer>
        </main>
      </div>
    );
  }
}