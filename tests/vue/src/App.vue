<script setup>
import "./copy.js";
import { onMounted } from "vue";
import { initAnimations } from "gclass-anims";

const install = "npm install gclass-anims";
const hook = "<script setup>\nimport { onMounted } from 'vue'\nimport { initAnimations } from 'gclass-anims'\n\nonMounted(() => {\n  initAnimations()\n})\n<\/script>";
const anatomy = "// behaviour + trigger + tunables\n<div class=\"appear scroll spawn-up\">\u2026</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">\u2026</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>";

onMounted(() => {
  initAnimations();
});
</script>

<template>
  <div>
    <div class="gc-bar scroll-progress"></div>

  <header class="sticky top-0 z-40 border-b border-line  bg-page/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center gap-6 px-6 py-2">
      <span class="font-display shrink-0 flex text-lg font-bold">
        <svg width="32px" height="32px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect id="Icons" x="-512" y="-128" width="1280" height="800" style="fill:none;"></rect> <g id="Icons1" serif:id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1"> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif:id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> <path d="M17.595,11.204l8.91,0l5.536,9.391l5.591,-9.391l8.831,0l-14.422,25.359l-14.446,-25.359Z" style="fill:#435466;"></path> <path d="M8.089,11.204l23.952,41.845l24.126,-41.845l-9.704,0l-14.422,25.359l-14.446,-25.359l-9.506,0Z" style="fill:#4dba87;"></path> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <g id="toggle-off"> </g> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g id="coffee-beans"> <g id="coffee-bean1" serif:id="coffee-bean"> </g> </g> <g id="coffee-bean-filled"> </g> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif:id="coffee-bean"> </g> </g> <g id="clipboard"> </g> <g id="clipboard-paste"> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g></svg>
        +
        <svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 54 54"
     width="32px"
     height="32px"
     role="img"
     aria-label="GClass logo">
  <path fill="#42b883" d="M14.64 0 L8.30 23.87 L12.85 25.44 C12.86 25.41 12.88 25.38 12.89 25.36 C13.76 23.58 15.03 22.07 16.62 20.94 L16.62 20.93 C17.14 20.56 17.69 20.25 18.27 19.99 Z M22.70 21.60 C21.06 21.60 19.60 22.05 18.32 22.96 C17.07 23.85 16.09 25.01 15.39 26.45 C14.69 27.86 14.34 29.31 14.34 30.80 C14.34 32.30 14.67 33.72 15.31 35.07 C15.98 36.40 16.91 37.47 18.12 38.29 C19.34 39.12 20.74 39.53 22.31 39.53 C24.16 40.42 25.74 39.93 27.03 38.91 C28.34 37.88 29.24 36.55 29.73 34.93 L30.04 34.88 C30.30 34.79 30.52 34.64 30.69 34.43 C30.87 34.21 30.96 33.94 30.96 33.65 C30.96 33.00 30.68 32.59 30.12 32.42 C29.17 32.12 28.20 31.97 27.21 31.97 C26.51 31.97 25.82 32.01 25.14 32.10 C24.47 32.19 23.99 32.29 23.70 32.42 C23.07 32.68 22.75 33.11 22.75 33.70 C22.75 34.10 22.88 34.42 23.12 34.67 C23.38 34.90 23.69 35.01 24.04 35.01 C24.21 35.01 24.45 34.97 24.74 34.88 C25.46 34.70 26.11 34.60 26.71 34.56 L27.10 34.56 C26.70 35.59 26.08 36.40 25.24 36.97 C24.40 37.53 23.42 37.81 22.31 37.81 C21.17 37.81 20.19 37.50 19.37 36.89 C18.57 36.26 17.96 35.48 17.56 34.53 C17.16 33.59 16.96 32.64 16.96 31.70 C16.96 30.90 17.16 29.98 17.56 28.95 C17.96 27.92 18.59 27.03 19.45 26.28 C20.32 25.51 21.40 25.13 22.70 25.13 C23.94 25.13 24.93 25.41 25.66 25.99 C26.40 26.55 26.92 27.25 27.24 28.09 C27.45 28.64 27.87 28.92 28.49 28.92 C28.88 28.92 29.18 28.82 29.41 28.61 C29.64 28.38 29.75 28.08 29.75 27.72 C29.75 27.23 29.49 26.56 28.97 25.73 C28.44 24.89 27.65 24.14 26.58 23.50 C25.53 22.83 24.24 22.50 22.70 22.50 Z M35.84 23.02 L32.05 26.32 C32.18 26.74 32.25 27.19 32.25 27.72 C32.25 28.57 31.89 29.59 31.23 30.29 C31.81 30.55 32.42 30.86 32.82 31.44 C33.23 32.05 33.41 32.72 33.45 33.33 L53.47 40.22 Z M15.73 40.51 L0 54.19 L23.71 47.53 L22.82 42.92 C22.65 42.93 22.48 42.93 22.31 42.93 C20.31 42.93 18.36 42.37 16.73 41.28 C16.38 41.05 16.05 40.79 15.73 40.51 Z"/>
</svg>
      </span>
      <nav class="ml-auto hidden gap-5 text-sm font-medium text-muted sm:flex"><a class="hover:text-brand" href="#install">Install</a><a class="hover:text-brand" href="#quick-start">Quick start</a><a class="hover:text-brand" href="#anatomy">Class anatomy</a><a class="hover:text-brand" href="#notes">Notes</a></nav>
    </div>
  </header>

  <main class="mx-auto max-w-4xl px-6 pb-24">
    <section class="py-16 text-center">
      <p class="font-mono text-sm text-ink">Not associated with or endorsed by Vue</p>
      <a href="https://vuejs.org/" class="font-mono text-sm underline text-brand">Official Vue website</a>
      <h1 class="mt-3 text-center font-extrabold flex justify-center items-center text-5xl leading-[1.1] tracking-tight sm:text-6xl">
        <div class=" from-[#42d392] bg-linear-to-r bg-clip-text text-transparent to-[#647eff] max-w-2xl ">
          
          gclass-anims for Vue
        </div>
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">Framework-agnostic — just call initAnimations() in onMounted once the DOM is present; the engine's MutationObserver handles subsequent .appear mounts and .scroll triggers.</p>
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
      <h3 class="mt-7 font-display text-lg font-bold">Usage — Composition API (SFC)</h3>
      <div class="mt-4"><pre class="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code>{{ hook }}</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <p class="mt-4 border-l-2 border-brand pl-4 text-sm text-muted">Class anatomy is the same as vanilla: behaviour (.spawn-up) + trigger (.appear, .scroll) + tunables (.time-1, .ease-back). See quick-start-js for the full breakdown.</p>
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
      <p>Colours and type sampled from <a class="text-brand hover:underline" href="https://vuejs.org/">https://vuejs.org/</a>. This page is Vue's own build output, running gclass-anims 1.0.0-beta.24 from npm.</p>
    </footer>
  </main>
  </div>
</template>
