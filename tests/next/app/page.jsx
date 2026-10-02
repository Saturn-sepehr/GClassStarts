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
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">A Tailwind-style utility layer on top of GSAP. Class-driven, App Router aware, and safe with React Server Components.</p>
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
      <h3 className="mt-7 font-display text-lg font-bold">Add a small client component</h3>
      <div className="mt-4"><pre className="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"// app/anim-init.jsx\n\"use client\"\n\nimport { useEffect } from 'react'\nimport { usePathname } from 'next/navigation'\nimport { initAnimations } from 'gclass-anims'\n\nexport default function AnimInit() {\n  const pathname = usePathname()\n\n  useEffect(() => {\n    initAnimations()\n  }, [pathname])\n\n  return null\n}"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <p className="mt-4 border-l-2 border-brand pl-4 text-sm text-muted">The root layout persists across navigations, so key the effect on usePathname — otherwise route changes swap the DOM without re-wiring it.</p>
    </section>

    <section id="anatomy" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">Class anatomy</h2>
      <p className="mt-3 text-muted">Every class is a <strong className="text-ink">behaviour</strong>, a <strong className="text-ink">trigger</strong>, or a <strong className="text-ink">tunable</strong>. Combine freely — order does not matter.</p>
      <div className="mt-5"><pre className="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{"// behaviour + trigger + tunables\n<div class=\"appear scroll spawn-up\">\u2026</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">\u2026</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Behaviour</h4><p className="mt-1 font-mono text-[12px] text-muted">spawn-up, float, marquee, magnet</p></div><div className="rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Trigger</h4><p className="mt-1 font-mono text-[12px] text-muted">appear, scroll, preserve</p></div><div className="rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Tunables</h4><p className="mt-1 font-mono text-[12px] text-muted">order, ease-expo, time-1, priority-2</p></div></div>
    </section>

    <section id="notes" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight">Notes</h2>
      <ul className="mt-6 space-y-4"><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">Mark it "use client".</strong> GSAP needs the DOM, so the init component must run on the client. Render it once from your root layout.</li><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">Re-init per route.</strong> Client navigation does not reload the page. Depending on the pathname makes every route wire itself up.</li><li className="rounded-lg border border-line bg-panel p-5"><strong className="text-ink">Wrap persistent shells in preserve.</strong> Headers and navs stay mounted between routes; the preserve class stops them re-animating on every navigation.</li></ul>
    </section>

    <footer className="border-t border-line pt-8 text-sm text-muted">
      <p>Colours and type sampled from <a className="text-brand hover:underline" href="https://nextjs.org/">https://nextjs.org/</a>. This page is Next.js's own build output, running gclass-anims 1.0.0-beta.23 from npm.</p>
    </footer>
  </main>
    </>
  );
}
