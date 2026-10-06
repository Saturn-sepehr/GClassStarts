import { Component, ChangeDetectionStrategy, ElementRef, inject, input, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CodeBlock } from "../shared/code-block";

@Component({
  selector: "app-index",
  standalone: true,
  // RouterLink for the nav, CodeBlock for the code panels.
  imports: [RouterLink, CodeBlock],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!--
      The scroll-progress rule. The scroll-progress modifier is not a behaviour
      class: it sets no geometry of its own, so the gc-bar rule lives in
      styles.css.

      Note the backticks: this template is a JS template literal, so backticks
      cannot appear anywhere inside it - not even in a comment. A comment
      mentioning .scroll-progress with backticks terminates the string and the
      compiler reports it as a type error on line 9, several lines away from the
      real cause.
    -->
    <div class="gc-bar scroll-progress"></div>

    <header class="site-header expand-down ease-expo">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a routerLink="/" class="font-display text-lg font-bold text-ink">analog</a>
        <nav class="flex flex-wrap items-center gap-5 text-sm">
          <a routerLink="/" fragment="install">Install</a>
          <a routerLink="/" fragment="quick-start">Quick start</a>
          <a routerLink="/" fragment="anatomy">Class anatomy</a>
          <a routerLink="/" fragment="notes">Notes</a>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-4 pb-24">
      <section class="py-16">
        <p class="font-mono text-sm text-muted">https://analogjs.org/</p>
        <h1
          class="mt-3 font-display text-5xl font-bold leading-[1.1] tracking-tight scroll letter spawn-text-spawn-down"
        >
          gclass-anims <span class="text-brand">for Analog</span>
        </h1>
        <p class="lede mt-6 max-w-2xl scroll typewriter time-2">
          Analog is the Angular meta-framework: file-based routes, Vite, and a
          build that can prerender to static HTML. Call
          <code>initAnimations()</code> once from the root component and every
          route it renders afterwards animates too.
        </p>
        <p class="lede mt-4 max-w-2xl">
          This build prerenders <code>/</code> through nitro because GitHub Pages
          serves files only. The same component runs in both places, which is why
          the init call sits behind an <code>isPlatformBrowser</code> guard.
        </p>
        <a
          routerLink="/"
          fragment="install"
          class="btn mt-8 click-expand compatibility amount-4"
        >
          Get started
        </a>
      </section>

      <section id="install" class="scroll-mt24 py-8">
        <h2 class="scroll letter spawn-text-spawn-down text-4xl">Install</h2>
        <p class="lede mt-3 scroll typewriter">
          GClass ships as the npm package gclass-anims. GSAP is a regular
          dependency and is installed automatically - nothing is bundled or
          redistributed. Analog and Angular are peers of this page, not
          dependencies of the library.
        </p>
        <div class="mt-5 scroll spawn-down">
          <code-block [text]="'npm install gclass-anims @analogjs/platform @angular/core'" />
        </div>
      </section>

      <section id="quick-start" class="scroll-mt24 py-8">
        <h2 class="scroll letter spawn-text-spawn-down text-4xl">Quick start</h2>
        <p class="lede mt-3 scroll typewriter">
          Import initAnimations once your DOM is ready. From then on, everything
          is class-driven: add a utility class to an element and it animates - no
          per-element JS, no config files.
        </p>

        <h3 class="mt-8 text-xl font-semibold text-ink">One call, in the root component</h3>
        <p class="lede mt-3 scroll typewriter">
          Because Analog can prerender, the guard is load-bearing: the same
          <code>ngOnInit</code> runs in Node during the prerender, where there is
          no <code>document</code> to walk.
        </p>
        <div class="mt-4 scroll spawn-down">
          <code-block
            [text]="
              'ngOnInit() {\n' +
              '  if (isPlatformBrowser(this.platformId)) {\n' +
              '    initAnimations()\n' +
              '  }\n' +
              '}'
            "
          />
        </div>

        <h3 class="mt-8 text-xl font-semibold text-ink">Live — rows from a signal</h3>
        <p class="lede mt-3 scroll typewriter">
          Nothing re-initialises after this point. The button updates a signal,
          Angular's change detection inserts real nodes, and each one plays its
          entrance because the engine watches for insertions.
        </p>

        <div class="mt-5">
          <div class="flex flex-wrap items-center gap-3">
            <button type="button" class="btn btn--accent click-hover amount-2" (click)="addRow()">
              Add a row
            </button>
            <button type="button" class="btn click-hover amount-2" (click)="reset()">Reset</button>
            <span class="pill">{{ rows().length }} rows</span>
          </div>

          <div class="mt-4 grid gap-2">
            @for (row of rows(); track row) {
              <div class="card appear spawn-up time-1 font-mono text-[13px]">
                row {{ row }} — inserted by an Angular signal
              </div>
            }
          </div>
        </div>

        <div class="mt-5 scroll spawn-down">
          <code-block
            [text]="
              'readonly rows = signal<number[]>([])\n' +
              '\n' +
              'addRow() {\n' +
              '  this.rows.update((rows) => [...rows, rows.length + 1])\n' +
              '}'
            "
          />
        </div>
      </section>

      <section id="anatomy" class="scroll-mt24 py-8">
        <h2 class="scroll letter spawn-text-spawn-down text-4xl">Class anatomy</h2>
        <p class="lede mt-3 scroll typewriter-split letter">
          Class anatomy: <strong class="text-ink">behaviour</strong> (
          <code>.spawn-up</code>) + <strong class="text-ink">trigger</strong> (
          <code>.scroll</code>, <code>.appear</code>) +
          <strong class="text-ink">tunables</strong> (<code>.time-1</code>,
          <code>.ease-back</code>, <code>.priority-2</code>). Combine freely —
          order in class does not matter.
        </p>
        <div class="mt-5 scroll spawn-down">
          <code-block
            [text]="
              '&lt;!-- behaviour + trigger + tunables --&gt;\n' +
              '&lt;div class=&quot;appear scroll spawn-up&quot;&gt;…&lt;/div&gt;\n' +
              '&lt;div class=&quot;appear scroll order ease-expo time-1 priority-2&quot;&gt;…&lt;/div&gt;\n' +
              '&lt;div class=&quot;float&quot;&gt;loops forever&lt;/div&gt;\n' +
              '&lt;button class=&quot;magnet click-expand&quot;&gt;magnet + click&lt;/button&gt;'
            "
          />
        </div>
        <div class="mt-6 grid gap-4 sm:grid-cols-3">
          <div class="card scroll spawn-down order priority-2">
            <h3 class="text-brand">Behaviour</h3>
            <p class="mt-1 font-mono text-[12px] text-muted">spawn-up, float, marquee, magnet</p>
          </div>
          <div class="card scroll spawn-down order priority-2">
            <h3 class="text-brand">Trigger</h3>
            <p class="mt-1 font-mono text-[12px] text-muted">appear, scroll, preserve</p>
          </div>
          <div class="card scroll spawn-down order priority-2">
            <h3 class="text-brand">Tunables</h3>
            <p class="mt-1 font-mono text-[12px] text-muted">order, ease-expo, time-1, priority-2</p>
          </div>
        </div>
      </section>

      <section id="notes" class="scroll-mt24 py-8">
        <h2 class="scroll letter spawn-text-spawn-down text-4xl">Notes</h2>
        <ul class="mt-6 grid gap-4">
          <li class="card scroll spawn-down order priority-3">
            <strong class="text-ink">Prerendering is the whole wrinkle.</strong>
            A component that runs in both Node and the browser needs the
            <code>isPlatformBrowser</code> guard, or it will try to walk a
            document that does not exist during the static render.
          </li>
          <li class="card scroll spawn-down order priority-3">
            <strong class="text-ink">Signals insert real nodes.</strong>
            Angular's <code>&#64;for</code> creates elements when a signal's value
            grows, which is the case the MutationObserver covers. Updating an
            existing binding patches in place, which gclass-anims ignores.
          </li>
          <li class="card scroll spawn-down order priority-3">
            <strong class="text-ink">GSAP stays external.</strong> ESM is
            <code>dist/gclass.esm.js</code> and CJS is <code>dist/gclass.cjs</code>
            — GSAP is external, not bundled, and the build is tree-shakable with
            <code>sideEffects: false</code>.
          </li>
        </ul>
      </section>

      <footer class="mt-8 border-t border-line pt-8 text-sm text-muted">
        <p>
          Not affiliated with or endorsed by the Analog team. Colours and type
          sampled from
          <a class="text-brand hover:underline" href="https://analogjs.org/">https://analogjs.org/</a>,
          including its <code>:root</code> token block. Running gclass-anims
          1.0.0-beta.24 from npm with Analog.
        </p>
      </footer>
    </main>
  `,
})
export default class IndexPage {
  // A signal, not a plain array: Angular 22's change detection tracks the read
  // in the template, and @for inserts real elements when it changes.
  readonly rows = signal<number[]>([]);

  addRow() {
    this.rows.update((rows) => [...rows, rows.length + 1]);
  }

  reset() {
    this.rows.set([]);
  }
}
