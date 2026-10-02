import { useEffect } from "react";
import { initAnimations } from "gclass-anims";
import "./copy.js";

export default function App() {
  // Hooks must live inside the component — calling this at module scope runs
  // before React installs its dispatcher and throws
  // "Cannot read properties of null (reading 'useEffect')".
  //
  // An empty dependency array runs it once after mount. A MutationObserver then
  // discovers .appear and .scroll elements as they render, so nothing else
  // needs wiring.
  useEffect(() => {
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
  }, []);

  return (
    <>
<div className="gc-bar scroll-progress" />

  <header className="sticky top-0 z-40 border-b border-line bg-page/90 backdrop-blur">
    <div className="mx-auto flex max-w-4xl items-center gap-6 px-6 py-4">
      <span className="font-display text-lg font-bold"><span className="text-brand">React</span> + gclass-anims</span>
      <nav className="ml-auto hidden gap-5 text-sm font-medium text-muted sm:flex"><a className="hover:text-brand" href="#install">Install</a><a className="hover:text-brand" href="#quick-start">Quick start</a><a className="hover:text-brand" href="#anatomy">Class anatomy</a><a className="hover:text-brand" href="#notes">Notes</a></nav>
    </div>
  </header>

  <main className="mx-auto max-w-4xl px-6 pb-24">
    <section className="py-16">
      <p className="font-mono text-sm text-brand">https://react.dev/</p>
      <h1 className="mt-3 font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
        gclass-anims <span className="text-accent">for React</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">A Tailwind-style utility layer on top of GSAP. Class-driven, so there are no per-element effects, no wrapper components and no config file — just add a class name to your JSX.</p>
      <a href="#install" className="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-page transition-opacity hover:opacity-90">Get started</a>
    </section>

    <section id="install" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">Install</h2>
      <p className="mt-3 text-muted">GSAP is a regular dependency and is installed automatically — nothing is bundled or redistributed.</p>
      <div className="mt-5"><pre className="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"npm install gclass-anims"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
    </section>

    <section id="quick-start" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">Quick start</h2>
      <p className="mt-3 text-muted">Initialise once, then drive everything with class names.</p>
      <h3 className="mt-7 font-display text-lg font-bold">Call initAnimations() once, after mount</h3>
      <div className="mt-4"><pre className="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"import { useEffect } from 'react'\nimport { initAnimations } from 'gclass-anims'\n\nexport default function App() {\n  useEffect(() => {\n    initAnimations()\n  }, [])\n\n  return <div className=\"appear scroll spawn-up\">hello react</div>\n}"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <p className="mt-4 border-l-2 border-brand pl-4 text-sm text-muted">An empty dependency array runs it once after mount. The engine then installs a MutationObserver, so components that mount later are discovered on their own.</p>
    </section>

    <section id="anatomy" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">Class anatomy</h2>
      <p className="mt-3 text-muted">Every class is a <strong className="text-ink">behaviour</strong>, a <strong className="text-ink">trigger</strong>, or a <strong className="text-ink">tunable</strong>. Combine freely — order does not matter.</p>
      <div className="mt-5"><pre className="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"// behaviour + trigger + tunables\n<div class=\"appear scroll spawn-up\">\u2026</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">\u2026</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Behaviour</h4><p className="mt-1 font-mono text-[12px] text-muted">spawn-up, float, marquee, magnet</p></div><div className="rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Trigger</h4><p className="mt-1 font-mono text-[12px] text-muted">appear, scroll, preserve</p></div><div className="rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Tunables</h4><p className="mt-1 font-mono text-[12px] text-muted">order, ease-expo, time-1, priority-2</p></div></div>
    </section>

    <section id="notes" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">Notes</h2>
      <ul className="mt-6 space-y-4"><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">Strict Mode is fine.</strong> useEffect runs twice in development and the engine handles it — .appear elements simply replay their entrance on the second pass.</li><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">Client-side routing.</strong> Route changes swap the DOM without a reload, so call initAnimations() again on navigation. Wrap persistent shells in preserve so they are skipped.</li><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">Reduced motion.</strong> The engine honours prefers-reduced-motion, and toggleAnimations() gives you a manual off switch to offer.</li></ul>
    </section>

    <footer className="border-t border-line pt-8 text-sm text-muted">
      <p>Colours and type sampled from <a className="text-brand hover:underline" href="https://react.dev/">https://react.dev/</a>. This page is React's own build output, running gclass-anims 1.0.0-beta.23 from npm.</p>
    </footer>
  </main>
    </>
  );
}
