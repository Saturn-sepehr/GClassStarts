import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { initAnimations } from "gclass-anims";

const install = "npm install gclass-anims";
const hook = "import { component$, useVisibleTask$ } from '@builder.io/qwik'\nimport { initAnimations } from 'gclass-anims'\n\nexport default component$(() => {\n  // useVisibleTask$ runs in the browser only\n  useVisibleTask$(() => {\n    initAnimations()\n  })\n\n  return <div class=\"appear scroll spawn-up\">hello qwik</div>\n})";
const anatomy = "// behaviour + trigger + tunables\n<div class=\"appear scroll spawn-up\">\u2026</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">\u2026</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>";

export default component$(() => {
  // useVisibleTask$ runs in the browser only. useTask$ would run on the
  // server before the element has a rect, so GSAP would get no geometry.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    initAnimations();

const COPY = (e) => {
  const btn = e.target.closest("[data-copy]");
  if (!btn) return;
  const code = btn.parentElement.querySelector("code");
  if (!code) return;
  navigator.clipboard.writeText(code.innerText).then(
    () => {
      btn.textContent = "Copied";
      btn.classList.add("text-ok", "border-ok");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("text-ok", "border-ok");
      }, 1400);
    },
    () => {
      btn.textContent = "Failed";
      setTimeout(() => (btn.textContent = "Copy"), 1400);
    },
  );
};

if (!window.__gclassCopy) {
  window.__gclassCopy = true;
  document.addEventListener("click", COPY);
}
  });

  return (
    <>
<div class="gc-bar scroll-progress" />

        <header class="sticky top-0 z-40 border-b border-line bg-page/90 backdrop-blur">
    <div class="mx-auto flex max-w-4xl items-center gap-6 px-6 py-4">
      <span class="font-display text-lg font-bold"><span class="text-brand">Qwik</span> + gclass-anims</span>
      <nav class="ml-auto hidden gap-5 text-sm font-medium text-muted sm:flex"><a class="hover:text-brand" href="#install">Install</a><a class="hover:text-brand" href="#quick-start">Quick start</a><a class="hover:text-brand" href="#anatomy">Class anatomy</a><a class="hover:text-brand" href="#notes">Notes</a></nav>
    </div>
  </header>

  <main class="mx-auto max-w-4xl px-6 pb-24">
    <section class="py-16">
      <p class="font-mono text-sm text-brand">https://qwik.dev/</p>
      <h1 class="mt-3 font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
        gclass-anims <span class="text-accent">for Qwik</span>
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">Qwik is resumable — no hydration replay. Use useVisibleTask$ (client only), not useTask$ (runs on server before DOM is visible, so gsap.fromTo gets no rect).</p>
      <a href="#install" class="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-page transition-opacity hover:opacity-90">Get started</a>
    </section>

    <section id="install" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Install</h2>
      <p class="mt-3 text-muted">GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed automatically — nothing is bundled or redistributed.</p>
      <div class="mt-5"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"npm install gclass-anims"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
    </section>

    <section id="quick-start" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Quick start</h2>
      <p class="mt-3 text-muted">Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a utility class to an element and it animates — no per-element JS, no config files.</p>
      <h3 class="mt-7 font-display text-lg font-bold">Usage — Qwik City page</h3>
      <div class="mt-4"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"import { component$, useVisibleTask$ } from '@builder.io/qwik'\nimport { initAnimations } from 'gclass-anims'\n\nexport default component$(() => {\n  // useVisibleTask$ runs in the browser only\n  useVisibleTask$(() => {\n    initAnimations()\n  })\n\n  return <div class=\"appear scroll spawn-up\">hello qwik</div>\n})"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <p class="mt-4 border-l-2 border-brand pl-4 text-sm text-muted">Qwik City does not replay root — each route component needs its own useVisibleTask$ re-init, same as SvelteKit afterNavigate.</p>
    </section>

    <section id="anatomy" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Class anatomy</h2>
      <p class="mt-3 text-muted">Class anatomy: <strong className="text-ink">behaviour</strong> (.spawn-up) + <strong className="text-ink">trigger</strong> (.scroll, .appear) + <strong className="text-ink">tunables</strong> (.time-1, .ease-back, .priority-2). Combine freely — order in class does not matter.</p>
      <div class="mt-5"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"// behaviour + trigger + tunables\n<div class=\"appear scroll spawn-up\">\u2026</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">\u2026</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <div class="mt-6 grid gap-4 sm:grid-cols-3"><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Behaviour</h4><p class="mt-1 font-mono text-[12px] text-muted">spawn-up, float, marquee, magnet</p></div><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Trigger</h4><p class="mt-1 font-mono text-[12px] text-muted">appear, scroll, preserve</p></div><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Tunables</h4><p class="mt-1 font-mono text-[12px] text-muted">order, ease-expo, time-1, priority-2</p></div></div>
    </section>

    <section id="notes" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Notes</h2>
      <ul className="mt-6 space-y-4"><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">Dual ESM + CJS.</strong> The package ships dual ESM + CJS and is framework-agnostic. It never touches your build config: every feature is driven by class names you put on markup.</li><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">GSAP stays external.</strong> ESM is dist/gclass.esm.js and CJS is dist/gclass.cjs via vite.lib.config.js — GSAP is external, not bundled. The build is tree-shakable with sideEffects: false and prepublishOnly: build.</li><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">Requirements.</strong> gsap ^3.15 is installed automatically as a dependency (package.json:52 gsap ^3.15.0). Node &gt;=16 is required for build (package.json:56 engines). A modern browser with ES module support is expected — CJS via require() is also available.</li></ul>
    </section>

    <footer class="border-t border-line pt-8 text-sm text-muted">
      <p>Colours and type sampled from <a class="text-brand hover:underline" href="https://qwik.dev/">https://qwik.dev/</a>. This page is Qwik's own build output, running gclass-anims 1.0.0-beta.23 from npm.</p>
    </footer>
  </main>
    </>
  );
});
