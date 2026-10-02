import { render } from "preact";
import { useEffect } from "preact/hooks";
import { initAnimations } from "gclass-anims";
import "./styles.css";
import "./copy.js";

function App() {
  useEffect(() => {
    initAnimations();

    // preact-router has no afterEach, so re-init on history navigation
    const onRoute = () => setTimeout(() => initAnimations(), 0);
    window.addEventListener("popstate", onRoute);
    return () => window.removeEventListener("popstate", onRoute);

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
  }, []);

  return (
    <>
<div class="gc-bar scroll-progress" />

        <header class="sticky top-0 z-40 border-b border-line bg-page/90 backdrop-blur">
    <div class="mx-auto flex max-w-4xl items-center gap-6 px-6 py-4">
      <span class="font-display text-lg font-bold"><span class="text-brand">Preact</span> + gclass-anims</span>
      <nav class="ml-auto hidden gap-5 text-sm font-medium text-muted sm:flex"><a class="hover:text-brand" href="#install">Install</a><a class="hover:text-brand" href="#quick-start">Quick start</a><a class="hover:text-brand" href="#anatomy">Class anatomy</a><a class="hover:text-brand" href="#notes">Notes</a></nav>
    </div>
  </header>

  <main class="mx-auto max-w-4xl px-6 pb-24">
    <section class="py-16">
      <p class="font-mono text-sm text-brand">https://preactjs.com/</p>
      <h1 class="mt-3 font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
        gclass-anims <span class="text-accent">for Preact</span>
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">A Tailwind-style utility layer on top of GSAP. The same React-shaped API, about 4kB smaller.</p>
      <a href="#install" class="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-page transition-opacity hover:opacity-90">Get started</a>
    </section>

    <section id="install" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Install</h2>
      <p class="mt-3 text-muted">GSAP is a regular dependency and is installed automatically — nothing is bundled or redistributed.</p>
      <div class="mt-5"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"npm install gclass-anims"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
    </section>

    <section id="quick-start" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Quick start</h2>
      <p class="mt-3 text-muted">Initialise once, then drive everything with class names.</p>
      <h3 class="mt-7 font-display text-lg font-bold">Call it from an effect</h3>
      <div class="mt-4"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"import { render } from 'preact'\nimport { useEffect } from 'preact/hooks'\nimport { initAnimations } from 'gclass-anims'\n\nfunction Home() {\n  useEffect(() => {\n    initAnimations()\n  }, [])\n\n  return <div class=\"appear scroll spawn-up\">hello preact</div>\n}\n\nrender(<Home />, document.getElementById('app'))"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <p class="mt-4 border-l-2 border-brand pl-4 text-sm text-muted">preact-router has no afterEach, so listen for popstate and re-init after the route has rendered.</p>
    </section>

    <section id="anatomy" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Class anatomy</h2>
      <p class="mt-3 text-muted">Every class is a <strong class="text-ink">behaviour</strong>, a <strong class="text-ink">trigger</strong>, or a <strong class="text-ink">tunable</strong>. Combine freely — order does not matter.</p>
      <div class="mt-5"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"// behaviour + trigger + tunables\n<div class=\"appear scroll spawn-up\">\u2026</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">\u2026</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <div class="mt-6 grid gap-4 sm:grid-cols-3"><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Behaviour</h4><p class="mt-1 font-mono text-[12px] text-muted">spawn-up, float, marquee, magnet</p></div><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Trigger</h4><p class="mt-1 font-mono text-[12px] text-muted">appear, scroll, preserve</p></div><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Tunables</h4><p class="mt-1 font-mono text-[12px] text-muted">order, ease-expo, time-1, priority-2</p></div></div>
    </section>

    <section id="notes" class="scroll-mt-24 py-10">
      <h2 class="font-display text-3xl font-bold tracking-tight">Notes</h2>
      <ul class="mt-6 space-y-4"><li class="rounded-lg border border-line bg-panel p-5"><strong class="text-ink">Hooks work as expected.</strong> useEffect from preact/hooks behaves like React's; run initAnimations once with an empty dependency array.</li><li class="rounded-lg border border-line bg-panel p-5"><strong class="text-ink">Routing has no afterEach.</strong> Attach a popstate listener and re-init on a timeout so the new markup is in place.</li><li class="rounded-lg border border-line bg-panel p-5"><strong class="text-ink">Lightweight by design.</strong> gclass-anims adds the animation layer; Preact keeps the framework cost down while you do.</li></ul>
    </section>

    <footer class="border-t border-line pt-8 text-sm text-muted">
      <p>Colours and type sampled from <a class="text-brand hover:underline" href="https://preactjs.com/">https://preactjs.com/</a>. This page is Preact's own build output, running gclass-anims 1.0.0-beta.23 from npm.</p>
    </footer>
  </main>
    </>
  );
}

render(<App />, document.getElementById("app"));
