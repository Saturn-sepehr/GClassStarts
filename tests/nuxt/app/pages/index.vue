<script setup>
const install = "npm install gclass-anims";
const hook = "// plugins/gclass.client.ts\nexport default defineNuxtPlugin(() => {\n  if (import.meta.client) {\n    import('gclass-anims').then(({ initAnimations }) => {\n      initAnimations()\n    })\n  }\n})";
const anatomy = "// behaviour + trigger + tunables\n<div class=\"appear scroll spawn-up\">\u2026</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">\u2026</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>";

useHead({ title: "gclass-anims — Nuxt" });
</script>

<template>
  <div>
<div class="gc-bar scroll-progress" />
    
      <header class="sticky top-0 z-40 border-b border-line bg-page/90 backdrop-blur">
        <div class="mx-auto flex max-w-4xl items-center gap-6 px-6 py-4">
          <span class="font-display text-lg font-bold"><span class="text-brand">Nuxt</span> + gclass-anims</span>
          <nav class="ml-auto hidden gap-5 text-sm font-medium text-muted sm:flex"><a class="hover:text-brand" href="#install">Install</a><a class="hover:text-brand" href="#quick-start">Quick start</a><a class="hover:text-brand" href="#anatomy">Class anatomy</a><a class="hover:text-brand" href="#notes">Notes</a></nav>
        </div>
      </header>
    
      <main class="mx-auto max-w-4xl px-6 pb-24">
        <section class="py-16">
          <p class="font-mono text-sm text-brand">https://nuxt.com/</p>
          <h1 class="mt-3 font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            gclass-anims <span class="text-accent">for Nuxt</span>
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">A Tailwind-style utility layer on top of GSAP. A client plugin plus a route watcher covers SPA navigation.</p>
          <a href="#install" class="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-page transition-opacity hover:opacity-90">Get started</a>
        </section>
    
        <section id="install" class="scroll-mt-24 py-10">
          <h2 class="font-display text-3xl font-bold tracking-tight">Install</h2>
          <p class="mt-3 text-muted">GSAP is a regular dependency and is installed automatically — nothing is bundled or redistributed.</p>
          <div class="mt-5"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{{ install }}</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
        </section>
    
        <section id="quick-start" class="scroll-mt-24 py-10">
          <h2 class="font-display text-3xl font-bold tracking-tight">Quick start</h2>
          <p class="mt-3 text-muted">Initialise once, then drive everything with class names.</p>
          <h3 class="mt-7 font-display text-lg font-bold">Add a client plugin</h3>
          <div class="mt-4"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{{ hook }}</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
          <p class="mt-4 border-l-2 border-brand pl-4 text-sm text-muted">The .client suffix keeps it off the server. Then re-init in app.vue on route changes — Nuxt navigation swaps the DOM without a reload.</p>
        </section>
    
        <section id="anatomy" class="scroll-mt-24 py-10">
          <h2 class="font-display text-3xl font-bold tracking-tight">Class anatomy</h2>
          <p class="mt-3 text-muted">Every class is a <strong class="text-ink">behaviour</strong>, a <strong class="text-ink">trigger</strong>, or a <strong class="text-ink">tunable</strong>. Combine freely — order does not matter.</p>
          <div class="mt-5"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{{ anatomy }}</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
          <div class="mt-6 grid gap-4 sm:grid-cols-3"><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Behaviour</h4><p class="mt-1 font-mono text-[12px] text-muted">spawn-up, float, marquee, magnet</p></div><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Trigger</h4><p class="mt-1 font-mono text-[12px] text-muted">appear, scroll, preserve</p></div><div class="rounded-lg border border-line bg-panel p-4"><h4 class="font-display font-bold text-brand">Tunables</h4><p class="mt-1 font-mono text-[12px] text-muted">order, ease-expo, time-1, priority-2</p></div></div>
        </section>
    
        <section id="notes" class="scroll-mt-24 py-10">
          <h2 class="font-display text-3xl font-bold tracking-tight">Notes</h2>
          <ul class="mt-6 space-y-4"><li class="rounded-lg border border-line bg-panel p-5"><strong class="text-ink">Client-only plugin.</strong> GSAP touches the DOM, so keep it in a .client plugin and guard with import.meta.client.</li><li class="rounded-lg border border-line bg-panel p-5"><strong class="text-ink">Watch the route.</strong> Watch route.fullPath and re-init after nextTick so the new markup is mounted first.</li><li class="rounded-lg border border-line bg-panel p-5"><strong class="text-ink">Keep the shell still.</strong> Wrap persistent layout in preserve so it is not re-animated on every navigation.</li></ul>
        </section>
    
        <footer class="border-t border-line pt-8 text-sm text-muted">
          <p>Colours and type sampled from <a class="text-brand hover:underline" href="https://nuxt.com/">https://nuxt.com/</a>. This page is Nuxt's own build output, running gclass-anims 1.0.0-beta.23 from npm.</p>
        </footer>
      </main>
  </div>
</template>
