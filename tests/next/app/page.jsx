export default function Page() {
  return (
    <>
<div class="gc-bar scroll-progress" />

        <header className="sticky top-0 z-40 border-b border-line bg-page/90 backdrop-blur">
    <div className="mx-auto flex max-w-4xl items-center gap-6 px-6 py-4">
      <span className="font-display text-lg font-bold"><span className="text-brand">Next.js</span> + gclass-anims</span>
      <nav className="ml-auto hidden gap-5 text-sm font-medium text-muted sm:flex"><a className="hover:text-brand" href="#install">Install</a><a className="hover:text-brand" href="#quick-start">Quick start</a><a className="hover:text-brand" href="#anatomy">Class anatomy</a><a className="hover:text-brand" href="#notes">Notes</a></nav>
    </div>
  </header>

  <main className="mx-auto max-w-4xl px-6 pb-24">
    <section className="py-16">
      <p className="font-mono text-sm text-brand">https://nextjs.org/</p>
      <h1 className="mt-3 font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
        gclass-anims <span className="text-accent">for Next.js</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">The docs site itself is a Next.js App Router app! Re-call initAnimations() on pathname changes because the root layout persists across route navigations.</p>
      <a href="#install" className="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-page transition-opacity hover:opacity-90">Get started</a>
    </section>

    <section id="install" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">Install</h2>
      <p className="mt-3 text-muted">GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed automatically — nothing is bundled or redistributed.</p>
      <div className="mt-5"><pre className="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"npm install gclass-anims"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
    </section>

    <section id="quick-start" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">Quick start</h2>
      <p className="mt-3 text-muted">Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a utility class to an element and it animates — no per-element JS, no config files.</p>
      <h3 className="mt-7 font-display text-lg font-bold">Usage — App Router (recommended)</h3>
      <div className="mt-4"><pre className="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"// app/anim-init.jsx\n\"use client\"\n\nimport { useEffect } from 'react'\nimport { usePathname } from 'next/navigation'\nimport { initAnimations } from 'gclass-anims'\n\nexport default function AnimInit() {\n  const pathname = usePathname()\n\n  useEffect(() => {\n    initAnimations()\n  }, [pathname])\n\n  return null\n}"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <p className="mt-4 border-l-2 border-brand pl-4 text-sm text-muted">Mark elements you want to keep across navigations with .preserve (header, nav). All other .appear / .scroll elements replay per route.</p>
    </section>

    <section id="anatomy" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">Class anatomy</h2>
      <p className="mt-3 text-muted">Class anatomy: <strong className="text-ink">behaviour</strong> (.spawn-up) + <strong className="text-ink">trigger</strong> (.scroll, .appear) + <strong className="text-ink">tunables</strong> (.time-1, .ease-back, .priority-2). Combine freely — order in class does not matter.</p>
      <div className="mt-5"><pre className="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"// behaviour + trigger + tunables\n<div class=\"appear scroll spawn-up\">\u2026</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">\u2026</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Behaviour</h4><p className="mt-1 font-mono text-[12px] text-muted">spawn-up, float, marquee, magnet</p></div><div className="rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Trigger</h4><p className="mt-1 font-mono text-[12px] text-muted">appear, scroll, preserve</p></div><div className="rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Tunables</h4><p className="mt-1 font-mono text-[12px] text-muted">order, ease-expo, time-1, priority-2</p></div></div>
    </section>

    <section id="notes" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">Notes</h2>
      <ul className="mt-6 space-y-4"><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">Dual ESM + CJS.</strong> The package ships dual ESM + CJS and is framework-agnostic. It never touches your build config: every feature is driven by class names you put on markup.</li><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">GSAP stays external.</strong> ESM is dist/gclass.esm.js and CJS is dist/gclass.cjs via vite.lib.config.js — GSAP is external, not bundled. The build is tree-shakable with sideEffects: false and prepublishOnly: build.</li><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">Requirements.</strong> gsap ^3.15 is installed automatically as a dependency (package.json:52 gsap ^3.15.0). Node &gt;=16 is required for build (package.json:56 engines). A modern browser with ES module support is expected — CJS via require() is also available.</li></ul>
    </section>

    <footer className="border-t border-line pt-8 text-sm text-muted">
      <p>Colours and type sampled from <a className="text-brand hover:underline" href="https://nextjs.org/">https://nextjs.org/</a>. This page is Next.js's own build output, running gclass-anims 1.0.0-beta.23 from npm.</p>
    </footer>
  </main>
    </>
  );
}
