import { AfterViewInit, Component, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { initAnimations } from "gclass-anims";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <div class="gc-bar scroll-progress"></div>

  <header class="sticky top-0 z-40 border-b border-line bg-page/90 backdrop-blur">
    <div class="mx-auto flex max-w-4xl items-center gap-6 px-6 py-4">
      <span class="font-display text-lg font-bold"><span class="text-brand">Angular</span> + gclass-anims</span>
      <nav class="ml-auto hidden gap-5 text-sm font-medium text-muted sm:flex"><a class="hover:text-brand" href="#install">Install</a><a class="hover:text-brand" href="#quick-start">Quick start</a><a class="hover:text-brand" href="#anatomy">Class anatomy</a><a class="hover:text-brand" href="#notes">Notes</a></nav>
    </div>
  </header>

  <main class="mx-auto max-w-4xl px-6 pb-24">
    <section class="py-16">
      <p class="font-mono text-sm text-brand">https://angular.dev/</p>
      <h1 class="mt-3 font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
        gclass-anims <span class="text-accent">for Angular</span>
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">Framework-agnostic — call initAnimations() once the view is ready and re-call it after SPA navigation. The engine is SSR-safe (checks window) but you should still guard with isPlatformBrowser and run only on the client.</p>
      <a href="#install" class="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-page transition-opacity hover:opacity-90">Get started</a>
    </section>

    <section id="install" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Install</h2>
      <p class="mt-3 text-muted">GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed automatically — nothing is bundled or redistributed.</p>
      <div class="mt-5"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{{ install }}</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
    </section>

    <section id="quick-start" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Quick start</h2>
      <p class="mt-3 text-muted">Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a utility class to an element and it animates — no per-element JS, no config files.</p>
      <h3 class="mt-7 font-display text-lg font-bold">Usage — Standalone root component</h3>
      <div class="mt-4"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{{ hook }}</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <p class="mt-4 border-l-2 border-brand pl-4 text-sm text-muted">Add utility classes to your templates (class="appear scroll spawn-up", class="float magnet"). No directives or wrappers needed. Mark persistent layout shells with .preserve so they skip re-animation on route change.</p>
    </section>

    <section id="anatomy" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Class anatomy</h2>
      <p class="mt-3 text-muted">Class anatomy: <strong class="text-ink">behaviour</strong> (.spawn-up) + <strong class="text-ink">trigger</strong> (.scroll, .appear) + <strong class="text-ink">tunables</strong> (.time-1, .ease-back, .priority-2). Combine freely — order in class does not matter.</p>
      <div class="mt-5"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{{ anatomy }}</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <div class="mt-6 grid gap-4 sm:grid-cols-3"><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Behaviour</h4><p class="mt-1 font-mono text-[12px] text-muted">spawn-up, float, marquee, magnet</p></div><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Trigger</h4><p class="mt-1 font-mono text-[12px] text-muted">appear, scroll, preserve</p></div><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Tunables</h4><p class="mt-1 font-mono text-[12px] text-muted">order, ease-expo, time-1, priority-2</p></div></div>
    </section>

    <section id="notes" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Notes</h2>
      <ul class="mt-6 space-y-4"><li class="rounded-lg border border-line bg-panel p-5"><strong class="text-ink">Dual ESM + CJS.</strong> The package ships dual ESM + CJS and is framework-agnostic. It never touches your build config: every feature is driven by class names you put on markup.</li><li class="rounded-lg border border-line bg-panel p-5"><strong class="text-ink">GSAP stays external.</strong> ESM is dist/gclass.esm.js and CJS is dist/gclass.cjs via vite.lib.config.js — GSAP is external, not bundled. The build is tree-shakable with sideEffects: false and prepublishOnly: build.</li><li class="rounded-lg border border-line bg-panel p-5"><strong class="text-ink">Requirements.</strong> gsap ^3.15 is installed automatically as a dependency (package.json:52 gsap ^3.15.0). Node >=16 is required for build (package.json:56 engines). A modern browser with ES module support is expected — CJS via require() is also available.</li></ul>
    </section>

    <footer class="border-t border-line pt-8 text-sm text-muted">
      <p>Colours and type sampled from <a class="text-brand hover:underline" href="https://angular.dev/">https://angular.dev/</a>. This page is Angular's own build output, running gclass-anims 1.0.0-beta.24 from npm.</p>
    </footer>
  </main>
  `,
})
export class AppComponent implements AfterViewInit {
  // Exposed as component members: an Angular template can only bind to
  // class properties, not to module-scope constants.
  protected readonly install = "npm install gclass-anims";
  protected readonly hook = "import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';\nimport { isPlatformBrowser } from '@angular/common';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  template: `<div class=\"appear scroll spawn-up\">hello angular</div>`,\n})\nexport class AppComponent implements AfterViewInit {\n  constructor(@Inject(PLATFORM_ID) private platformId: object) {}\n\n  ngAfterViewInit(): void {\n    if (!isPlatformBrowser(this.platformId)) return;\n\n    import('gclass-anims').then(({ initAnimations }) => initAnimations());\n  }\n}";
  protected readonly anatomy = "// behaviour + trigger + tunables\n<div class=\"appear scroll spawn-up\">\u2026</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">\u2026</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>";

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    // never touch the DOM during server rendering
    if (!isPlatformBrowser(this.platformId)) return;
    initAnimations();
  }
}
