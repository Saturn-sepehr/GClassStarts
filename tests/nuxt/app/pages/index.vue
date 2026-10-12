<script setup>
import { ref } from "vue";

const install = "npm install gclass-anims";

/* The page's own sections, in the order the next / react / vue pages list
   them: every one of those three headers is this same set of four anchors, so
   this is the shared top-nav across the Vue-family tests rather than
   framework-specific links. */
const NAV = [
  ["Install", "#install"],
  ["Quick start", "#quick-start"],
  ["Class anatomy", "#anatomy"],
  ["Notes", "#notes"],
];

/**
 * The tab strip on the code panel. Each entry is pre-highlighted markup rather
 * than a plain string: the colours are the ones nuxt.com's own shiki build
 * emits for this palette, and rendering them as spans is cheaper than shipping a
 * highlighter to the browser for five static snippets.
 */
const TABS = [
  {
    label: "Minimal",
    icon: "leaf",
    tree: ["app.vue"],
    code: `<span class="text-synpunct">&lt;</span><span class="text-syntag">script</span> <span class="text-synvariable">setup</span> <span class="text-synvariable">lang</span><span class="text-synoperator">=</span><span class="text-synstring">"ts"</span><span class="text-synpunct">&gt;</span>
<span class="text-synkwd">import</span> <span class="text-synvariable">{</span> <span class="text-synfunction">initAnimations</span> <span class="text-synvariable">}</span> <span class="text-synkwd">from</span> <span class="text-synstring">'gclass-anims'</span>

<span class="text-synkwd">onMounted</span><span class="text-synpunct">(</span><span class="text-synpunct">)</span><span class="text-synoperator">=&gt;</span> <span class="text-synfunction">initAnimations</span><span class="text-synpunct">()</span>
<span class="text-synpunct">&lt;/</span><span class="text-syntag">script</span><span class="text-synpunct">&gt;</span>`,
  },
  {
    label: "Routing",
    icon: "milestone",
    tree: ["pages/index.vue"],
    code: `<span class="text-synkwd">const</span> <span class="text-synvariable">route</span> <span class="text-synoperator">=</span> <span class="text-synfunction">useRoute</span><span class="text-synpunct">()</span>

<span class="text-synfunction">watch</span><span class="text-synpunct">(</span>
  <span class="text-synpunct">()</span> <span class="text-synoperator">=&gt;</span> <span class="text-synvariable">route</span><span class="text-synpunct">.</span><span class="text-synvariable">fullPath</span><span class="text-synpunct">,</span>
  <span class="text-synkwd">async</span> <span class="text-synpunct">()</span> <span class="text-synoperator">=&gt;</span> <span class="text-synpunct">{</span>
    <span class="text-synkwd">await</span> <span class="text-synfunction">nextTick</span><span class="text-synpunct">()</span>
    <span class="text-synfunction">initAnimations</span><span class="text-synpunct">()</span>
  <span class="text-synpunct">}</span>
<span class="text-synpunct">)</span>`,
  },
  {
    label: "Data Fetching",
    icon: "route",
    tree: ["pages/[slug].vue"],
    code: `<span class="text-synkwd">const</span> <span class="text-synvariable">{</span> <span class="text-synvariable">data</span> <span class="text-synvariable">}</span> <span class="text-synoperator">=</span> <span class="text-synkwd">await</span> <span class="text-synfunction">useFetch</span><span class="text-synpunct">(</span><span class="text-synstring">'/api/cards'</span><span class="text-synpunct">)</span>

<span class="text-synpunct">&lt;</span><span class="text-syntag">div</span> <span class="text-synvariable">v-for</span><span class="text-synoperator">=</span><span class="text-synstring">"card in data"</span> <span class="text-synvariable">class</span><span class="text-synoperator">=</span><span class="text-synstring">"appear scroll spawn-up"</span><span class="text-synpunct">&gt;</span>`,
  },
  {
    label: "Auto-Imports",
    icon: "wand",
    tree: ["app/plugins/gclass.client.ts"],
    code: `<span class="text-synkwd">export default</span> <span class="text-synfunction">defineNuxtPlugin</span><span class="text-synpunct">(()</span> <span class="text-synpunct">=&gt;</span> <span class="text-synpunct">{</span>
  <span class="text-synkwd">const</span> <span class="text-synvariable">{</span> <span class="text-synfunction">initAnimations</span> <span class="text-synvariable">}</span> <span class="text-synoperator">=</span> <span class="text-synkwd">await</span> <span class="text-synkwd">import</span><span class="text-synpunct">(</span><span class="text-synstring">'gclass-anims'</span><span class="text-synpunct">)</span>

  <span class="text-synkwd">return</span> <span class="text-synpunct">{</span> <span class="text-synvariable">provide</span><span class="text-synpunct">:</span> <span class="text-synpunct">{</span> <span class="text-synfunction">initAnimations</span> <span class="text-synpunct">}</span>
<span class="text-synpunct">})</span>`,
  },
  {
    label: "SSR Notes",
    icon: "monitor",
    tree: ["nuxt.config.ts"],
    code: `<span class="text-synkwd">export default</span> <span class="text-synfunction">defineNuxtConfig</span><span class="text-synpunct">({</span>
  <span class="text-syncomment">// .client suffix: the engine needs a DOM</span>
  <span class="text-synvariable">plugins</span><span class="text-synoperator">:</span> <span class="text-synpunct">[</span><span class="text-synstring">'~/plugins/gclass.client'</span><span class="text-synpunct">]</span>
<span class="text-synpunct">})</span>`,
  },
];

const tab = ref(0);

const notes = [
  [
    "Dual ESM + CJS.",
    "The package ships dist/gclass.esm.js and dist/gclass.cjs via vite.lib.config.js — GSAP is external, not bundled, and the build is tree-shakable with sideEffects: false.",
  ],
  [
    "Reduced motion.",
    "Nothing animates once the OS preference is set. The engine reads prefers-reduced-motion at init and skips every entrance.",
  ],
  [
    "No canvas.",
    "Every effect is DOM and CSS, so there is no WebGL context to create, lose or leak between route changes.",
  ],
];

useHead({ title: "gclass-anims — Nuxt" });
</script>

<template>
  <div>
    <div class="gc-bar scroll-progress" />

    <!-- ── header ───────────────────────────────────────────────────────────
         nuxt.com's UHeader: a bar one --ui-header-height tall, the brand hard
         left, the primary links in the middle and the utilities right, all in
         one --ui-container (90rem) with lg:px-8. Left and right are both
         flex-1 so the link group lands dead centre between them whatever the
         brand measures. -->
    <header class="sticky top-0 z-50 flex h-header flex-col border-b border-default bg-default/75 backdrop-blur-sm">
      <div class="mx-auto flex h-full w-full max-w-[90rem] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div class="flex min-w-0 items-end gap-1.5 lg:flex-1">
          <!-- Two marks, not a wordmark: the Nuxt glyph in its own green and the
               GClass glyph in ink, side by side. -->
          <a href="#top" class="flex shrink-0 items-end gap-1.5" aria-label="gclass-anims for Nuxt, home">
            <svg width="28" height="28" viewBox="0 0 512 512" fill="none" aria-hidden="true">
              <path d="M281.44 397.667H438.32C443.326 397.667 448.118 395.908 452.453 393.427C456.789 390.946 461.258 387.831 463.76 383.533C466.262 379.236 468.002 374.36 468 369.399C467.998 364.437 466.266 359.563 463.76 355.268L357.76 172.947C355.258 168.65 352.201 165.534 347.867 163.053C343.532 160.573 337.325 158.813 332.32 158.813C327.315 158.813 322.521 160.573 318.187 163.053C313.852 165.534 310.795 168.65 308.293 172.947L281.44 219.587L227.733 129.13C225.229 124.834 222.176 120.307 217.84 117.827C213.504 115.346 208.713 115 203.707 115C198.701 115 193.909 115.346 189.573 117.827C185.238 120.307 180.771 124.834 178.267 129.13L46.8267 355.268C44.3208 359.563 44.0022 364.437 44 369.399C43.9978 374.36 44.3246 379.235 46.8267 383.533C49.3288 387.83 53.7979 390.946 58.1333 393.427C62.4688 395.908 67.2603 397.667 72.2667 397.667H171.2C210.401 397.667 238.934 380.082 258.827 346.787L306.88 263.4L332.32 219.587L410.053 352.44H306.88L281.44 397.667ZM169.787 352.44H100.533L203.707 174.36L256 263.4L221.361 323.784C208.151 345.387 193.089 352.44 169.787 352.44Z" fill="#00DC82" />
            </svg>
            +
            <svg width="24" height="24" viewBox="0 0 54 54" fill="none" aria-hidden="true">
              <path fill="#00dc82" d="M14.64 0 L8.30 23.87 L12.85 25.44 C12.86 25.41 12.88 25.38 12.89 25.36 C13.76 23.58 15.03 22.07 16.62 20.94 L16.62 20.93 C17.14 20.56 17.69 20.25 18.27 19.99 Z M22.70 21.60 C21.06 21.60 19.60 22.05 18.32 22.96 C17.07 23.85 16.09 25.01 15.39 26.45 C14.69 27.86 14.34 29.31 14.34 30.80 C14.34 32.30 14.67 33.72 15.31 35.07 C15.98 36.40 16.91 37.47 18.12 38.29 C19.34 39.12 20.74 39.53 22.31 39.53 C24.16 40.42 25.74 39.93 27.03 38.91 C28.34 37.88 29.24 36.55 29.73 34.93 L30.04 34.88 C30.30 34.79 30.52 34.64 30.69 34.43 C30.87 34.21 30.96 33.94 30.96 33.65 C30.96 33.00 30.68 32.59 30.12 32.42 C29.17 32.12 28.20 31.97 27.21 31.97 C26.51 31.97 25.82 32.01 25.14 32.10 C24.47 32.19 23.99 32.29 23.70 32.42 C23.07 32.68 22.75 33.11 22.75 33.70 C22.75 34.10 22.88 34.42 23.12 34.67 C23.38 34.90 23.69 35.01 24.04 35.01 C24.21 35.01 24.45 34.97 24.74 34.88 C25.46 34.70 26.11 34.60 26.71 34.56 L27.10 34.56 C26.70 35.59 26.08 36.40 25.24 36.97 C24.40 37.53 23.42 37.81 22.31 37.81 C21.17 37.81 20.19 37.50 19.37 36.89 C18.57 36.26 17.96 35.48 17.56 34.53 C17.16 33.59 16.96 32.64 16.96 31.70 C16.96 30.90 17.16 29.98 17.56 28.95 C17.96 27.92 18.59 27.03 19.45 26.28 C20.32 25.51 21.40 25.13 22.70 25.13 C23.94 25.13 24.93 25.41 25.66 25.99 C26.40 26.55 26.92 27.25 27.24 28.09 C27.45 28.64 27.87 28.92 28.49 28.92 C28.88 28.92 29.18 28.82 29.41 28.61 C29.64 28.38 29.75 28.08 29.75 27.72 C29.75 27.23 29.49 26.56 28.97 25.73 C28.44 24.89 27.65 24.14 26.58 23.50 C25.53 22.83 24.24 22.50 22.70 22.50 Z M35.84 23.02 L32.05 26.32 C32.18 26.74 32.25 27.19 32.25 27.72 C32.25 28.57 31.89 29.59 31.23 30.29 C31.81 30.55 32.42 30.86 32.82 31.44 C33.23 32.05 33.41 32.72 33.45 33.33 L53.47 40.22 Z M15.73 40.51 L0 54.19 L23.71 47.53 L22.82 42.92 C22.65 42.93 22.48 42.93 22.31 42.93 C20.31 42.93 18.36 42.37 16.73 41.28 C16.38 41.05 16.05 40.79 15.73 40.51 Z" />
            </svg>
          </a>
        </div>

        <nav class="hidden lg:flex" aria-label="Main">
          <ul class="flex items-center">
            <li v-for="[label, href] in NAV" :key="href" class="min-w-0 py-2">
              <a
                :href="href"
                class="order spawn-down click-hover amount-2 relative flex w-full items-center rounded-md px-2.5 py-1.5 text-sm font-medium text-muted transition-colors before:absolute before:inset-x-px before:inset-y-0 before:-z-10 before:rounded-md hover:text-primary"
              >
                <span class="truncate">{{ label }}</span>
              </a>
            </li>
          </ul>

        </nav>
        <div class="flex items-center justify-end gap-1.5 lg:flex-1">
                    <a href="https://saturn-sepehr.github.io/GClass/documentation/quick-start/"><svg width="32px" height="32px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --> <title>ic_fluent_sign_out_24_filled</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_sign_out_24_filled" fill="#ffffff" fill-rule="nonzero"> <path d="M12,4.35416625 L12,4.99998545 L13.7452668,5 C14.1245178,5 14.4381068,5.28151791 14.488266,5.64711331 L14.4952658,5.74875738 L14.502,10 L13.002,10 L12.9965084,6.5 L12,6.49998545 L12.0005455,11.004946 L13.002,11.0039854 L13.003,11 L14.504,11 L14.503,11.0039854 L19.442,11.0039854 L17.7195786,9.28023872 C17.4533579,9.0139263 17.4292236,8.59725845 17.6471286,8.30368449 L17.7197613,8.21957857 C17.9860737,7.95335788 18.4027416,7.9292236 18.6963155,8.14712863 L18.7804214,8.21976128 L21.7770341,11.2174065 C22.043008,11.4834721 22.0673769,11.8996744 21.850009,12.19325 L21.7775464,12.2773711 L18.7809337,15.2808167 C18.4883742,15.5740433 18.0135008,15.5745841 17.7202742,15.2820246 C17.4537046,15.0160615 17.4290241,14.5994256 17.646544,14.3055662 L17.7190663,14.2213652 L19.432,12.5039854 L12.0005455,12.504946 L12,17.0009854 L13.0139075,17.0014475 L13.007,13.5 L14.508,13.5 L14.5151512,17.7502049 C14.5157801,18.130345 14.23351,18.4448141 13.8670368,18.4945857 L13.7651512,18.5014475 L12,18.5009854 L12,19.25 C12,19.7163948 11.5788385,20.0696886 11.1195525,19.9885685 L2.61955246,18.4872805 C2.26120966,18.4239892 2,18.1126012 2,17.748712 L2,5.75 C2,5.38269391 2.26601447,5.06943276 2.62846599,5.00991252 L11.128466,3.61407877 C11.5850805,3.53909548 12,3.89143598 12,4.35416625 Z M8.50214976,11.5 C7.94867773,11.5 7.5,11.9486777 7.5,12.5021498 C7.5,13.0556218 7.94867773,13.5042995 8.50214976,13.5042995 C9.05562179,13.5042995 9.50429953,13.0556218 9.50429953,12.5021498 C9.50429953,11.9486777 9.05562179,11.5 8.50214976,11.5 Z" id="🎨-Color"> </path> </g> </g> </g></svg></a>
        </div>
      </div>
    </header>

    <main class="relative">
      <!-- HeroBackground, verbatim from nuxt.com: a 22%-opacity vertical wash
           whose only hard edge is a 2px band peaking at 39.5% across. It sits
           at the top of <main>, so it scrolls with the page and only becomes
           visible once the header stops covering it. -->
      <svg
        viewBox="0 0 1440 181"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="pointer-events-none absolute -top-px -z-10 w-full shrink-0 text-primary"
        aria-hidden="true"
      >
        <mask id="hero-background-mask" fill="white">
          <path d="M0 0H1440V181H0V0Z" />
        </mask>
        <path d="M0 0H1440V181H0V0Z" fill="url(#hero-background-vertical)" fill-opacity="0.22" />
        <path d="M0 2H1440V-2H0V2Z" fill="url(#hero-background-horizontal)" mask="url(#hero-background-mask)" />
        <defs>
          <linearGradient id="hero-background-vertical" x1="720" y1="0" x2="720" y2="181" gradientUnits="userSpaceOnUse">
            <stop stop-color="currentColor" />
            <stop offset="1" stop-color="currentColor" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="hero-background-horizontal" x1="0" y1="90.5" x2="1440" y2="90.5" gradientUnits="userSpaceOnUse">
            <stop stop-color="currentColor" stop-opacity="0" />
            <stop offset="0.395" stop-color="currentColor" />
            <stop offset="1" stop-color="currentColor" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div id="top">
        <!-- ── hero ───────────────────────────────────────────────────────────
             UPageHero with orientation="horizontal": a 2-column grid at lg with
             gap-x-16, the copy column pinned to a 540px minimum so it stays
             centred against the card, and pt-40 / pb-20. The card is absolutely
             positioned out of the flow and pinned to the right edge of the
             section, capped at 800px, so it runs off toward the viewport edge
             while the copy stays inside the container. -->
        <section class="relative isolate">
          <div
            class="mx-auto flex w-full max-w-[90rem] flex-col gap-16 px-4 py-24 sm:gap-y-24 sm:px-6 sm:py-32 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:px-8 lg:pb-20 lg:pt-40"
          >
            <div class="min-w-0 lg:min-h-[540px]">
              <div>


                <h1 class="text-5xl font-bold tracking-tight text-pretty text-highlighted sm:text-7xl">
                  gclass-anims<br />
                  <span class="text-primary">for Nuxt</span>
                </h1>

                <p class="mt-6 text-pretty text-lg text-muted sm:text-xl/8">
                  One <code class="font-mono text-[0.9em] leading-tight text-default">initAnimations()</code> call and
                  every animation on the page becomes a class name. Behaviour, trigger and tunables,
                  composed in the markup — Nuxt is just the host.
                </p>
              </div>

              <div class="mt-10">
                <div class="flex flex-col gap-4">
                  <div class="flex flex-wrap items-center gap-2">
                    <a
                      href="#install"
                      class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-base font-medium text-inverted transition-colors hover:bg-primary/75"
                    >
                      Get started
                    </a>
                   
                  </div>

                  <div class="relative flex w-full items-center">
                    <span class="absolute inset-y-0 start-0 flex items-center ps-3" aria-hidden="true">
                      <span class="font-mono text-base leading-none text-dimmed">&gt;_</span>
                    </span>
                    <code
                      class="w-full rounded-md border-0 bg-default px-11 py-2 text-base text-highlighted ring ring-inset ring-accented"
                    >{{ install }}</code>
                    <button
                      type="button"
                      data-copy
                      aria-label="Copy install command"
                      class="absolute end-3 inline-flex size-8 items-center justify-center rounded-md p-1.5 text-sm font-medium text-muted transition-colors hover:bg-elevated hover:text-default"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                        <rect x="9" y="9" width="12" height="12" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- The IDE card. UPageCard variant="subtle" (bg-elevated/50 over the
                 page, a 1px --ui-border ring) holding a UTabs strip above a
                 ProseCodeTree, which is a 3-column grid: the file list on one
                 third, the snippet on the other two, 450px tall. -->
            <div
              class="relative flex w-full overflow-x-auto rounded-none bg-elevated/50 ring ring-default lg:absolute lg:top-32 lg:right-0 lg:w-[calc(50%-2rem)] lg:max-w-[800px] lg:rounded-l-2xl lg:overflow-hidden"
            >
              <div class="relative flex w-full flex-1 flex-col gap-x-8 gap-y-4 p-4 sm:p-6 sm:pt-4.5 lg:grid lg:pr-0">
                <div class="flex flex-col items-center gap-2">
                  <div
                    class="group relative flex w-full min-w-0 items-center overflow-x-auto rounded-lg bg-transparent p-1 pr-0 lg:pr-4"
                    role="tablist"
                    aria-label="Integration examples"
                  >
                    <button
                      v-for="(t, i) in TABS"
                      :key="t.label"
                      type="button"
                      role="tab"
                      :aria-selected="i === tab"
                      class="group relative isolate inline-flex min-w-0 grow shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors before:absolute before:-z-10 before:inset-x-0 before:inset-y-1 before:rounded-md"
                      :class="i === tab ? 'text-highlighted before:bg-default' : 'text-muted hover:text-default'"
                      @click="tab = i"
                    >
                      <svg
                        class="hidden size-4 shrink-0 sm:inline-flex"
                        :class="i === tab ? 'text-primary' : 'text-muted'"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <template v-if="t.icon === 'leaf'">
                          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                        </template>
                        <template v-else-if="t.icon === 'milestone'">
                          <path d="M12 13v8" />
                          <path d="M12 3v3" />
                          <path d="M4 6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
                        </template>
                        <template v-else-if="t.icon === 'route'">
                          <circle cx="6" cy="19" r="3" />
                          <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                          <circle cx="18" cy="5" r="3" />
                        </template>
                        <template v-else-if="t.icon === 'wand'">
                          <path d="m3 21-3-3 15.5-15.5a2.121 2.121 0 0 1 3 3Z" />
                          <path d="m15 5 4 4" />
                          <path d="M18 5 22 9" />
                          <path d="M3 3 4.5 1.5" />
                          <path d="M5 3 3.5 1.5" />
                        </template>
                        <template v-else>
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <path d="M8 21h8" />
                          <path d="M12 17v4" />
                        </template>
                      </svg>
                      <span class="truncate">{{ t.label }}</span>
                    </button>
                  </div>

                  <div class="w-full rounded-md bg-default lg:h-[450px]">
                    <div
                      class="relative grid border border-default bg-default lg:h-[450px] lg:grid-cols-3 lg:rounded-r-none lg:border-r-0 lg:rounded-l-md"
                    >
                      <ul class="relative isolate overflow-y-auto border-b border-default p-2 lg:border-r lg:border-b-0">
                        <li>
                          <div class="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-default">
                            <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                            </svg>
                            app
                            <svg class="ms-auto size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                              <path d="m18 15-6-6-6 6" />
                            </svg>
                          </div>
                        </li>
                        <li class="ms-4.5 border-s border-default ps-1.5">
                          <div
                            class="relative flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-highlighted before:absolute before:-z-10 before:inset-x-0 before:inset-y-px before:rounded-md before:bg-elevated"
                          >
                            <svg class="size-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                              <path d="M14 2v6h6" />
                            </svg>
                            <span class="truncate">{{ TABS[tab].tree[0] }}</span>
                          </div>
                        </li>
                      </ul>

                      <div class="flex flex-col overflow-hidden lg:col-span-2">
                        <div
                          class="relative flex items-center gap-1.5 border border-default border-b-0 bg-default px-4 py-3 text-sm/6 text-default"
                        >
                          <svg class="size-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                            <path d="M14 2v6h6" />
                          </svg>
                          app/{{ TABS[tab].tree[0] }}
                        </div>
                        <pre
                          class="group flex-1 overflow-auto rounded-b-md rounded-s-none border border-default border-s-0 border-e-0 border-t-0 bg-muted px-4 py-3 font-mono text-sm/6 text-default"
                        ><code v-html="TABS[tab].code" /></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── the strip ─────────────────────────────────────────────────────
             UPageSection with !pt-0, so it starts flush against the hero, and a
             UPageLogos whose title is muted 18px Outfit and whose row is a
             plain justify-between of 24px-tall marks. -->
        <section>
          <div class="mx-auto w-full max-w-[90rem] px-4 pb-32 pt-0 sm:px-6 sm:pb-24 sm:pt-0 lg:px-8">
            <div class="relative overflow-hidden">
              <h2 class="text-left text-lg font-medium text-muted">Runs in the same engine as two dozen other frameworks</h2>
              <ul class="mt-4 flex shrink-0 items-center justify-between gap-6">
                <li v-for="f in ['vue', 'react', 'svelte', 'astro', 'next', 'remix', 'qwik', 'solid']" :key="f" class="h-6 shrink-0 max-w-[140px] text-dimmed">
                  {{ f }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- ── docs ──────────────────────────────────────────────────────────── -->
        <div class="mx-auto w-full max-w-[90rem] px-4 pb-24 sm:px-6 lg:px-8">
          <div class="max-w-4xl">
          <section id="install" class="scroll-mt-28 py-16 sm:py-20">
            <h2 class="text-3xl font-bold tracking-tight text-pretty text-highlighted sm:text-4xl lg:text-5xl">Install</h2>
            <p class="mt-6 text-pretty text-base text-muted sm:text-lg">GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed automatically — nothing is bundled or redistributed.</p>
            <div class="mt-8"><pre class="group relative overflow-x-auto rounded-md border border-default bg-muted p-4 pr-16 font-mono text-sm/6 text-default"><code>{{ install }}</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-default bg-default px-2 py-1 text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Copy code">Copy</button></pre></div>
          </section>

          <section id="quick-start" class="scroll-mt-28 py-16 sm:py-20">
            <h2 class="text-3xl font-bold tracking-tight text-pretty text-highlighted sm:text-4xl lg:text-5xl">Quick start</h2>
            <p class="mt-6 text-pretty text-base text-muted sm:text-lg">Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a utility class to an element and it animates — no per-element JS, no config files.</p>
            <h3 class="mt-10 text-xl font-bold text-highlighted">Usage — Client plugin</h3>
            <div class="mt-4"><pre class="group relative overflow-x-auto rounded-md border border-default bg-muted p-4 pr-16 font-mono text-sm/6 text-default"><code>// app/plugins/gclass.client.ts
export default defineNuxtPlugin(() =&gt; {
  if (import.meta.client) {
    import('gclass-anims').then(({ initAnimations }) =&gt; {
      initAnimations()
    })
  }
})</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-default bg-default px-2 py-1 text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Copy code">Copy</button></pre></div>
            <p class="mt-6 border-s-2 border-primary ps-4 text-sm text-muted">SPA navigation does not reload the page, so re-wire the new DOM. Watch <code class="font-mono text-default">route.fullPath</code> and re-call after <code class="font-mono text-default">nextTick()</code>.</p>
          </section>

          <section id="anatomy" class="scroll-mt-28 py-16 sm:py-20">
            <h2 class="text-3xl font-bold tracking-tight text-pretty text-highlighted sm:text-4xl lg:text-5xl">Class anatomy</h2>
            <p class="mt-6 text-pretty text-base text-muted sm:text-lg"><strong class="text-default">Behaviour</strong> (.spawn-up) + <strong class="text-default">trigger</strong> (.scroll, .appear) + <strong class="text-default">tunables</strong> (.time-1, .ease-back, .priority-2). Combine freely — order in class does not matter.</p>
            <div class="mt-8"><pre class="group relative overflow-x-auto rounded-md border border-default bg-muted p-4 pr-16 font-mono text-sm/6 text-default"><code>// behaviour + trigger + tunables
&lt;div class="appear scroll spawn-up"&gt;…&lt;/div&gt;
&lt;div class="appear scroll order ease-expo time-1 priority-2"&gt;…&lt;/div&gt;
&lt;div class="float"&gt;loops forever&lt;/div&gt;
&lt;button class="magnet click-expand"&gt;magnet + click&lt;/button&gt;</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-default bg-default px-2 py-1 text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary" aria-label="Copy code">Copy</button></pre></div>
            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div v-for="[title, detail] in [['Behaviour', 'spawn-up, float, marquee, magnet'], ['Trigger', 'appear, scroll, preserve'], ['Tunables', 'order, ease-expo, time-1, priority-2']]" :key="title" class="rounded-lg bg-elevated/50 p-4 ring ring-default">
                <h4 class="font-bold text-primary">{{ title }}</h4>
                <p class="mt-1 font-mono text-xs text-toned">{{ detail }}</p>
              </div>
            </div>
          </section>

          <section id="notes" class="scroll-mt-28 py-16 sm:py-20">
            <h2 class="text-3xl font-bold tracking-tight text-pretty text-highlighted sm:text-4xl lg:text-5xl">Notes</h2>
            <ul class="mt-8 space-y-4">
              <li v-for="[title, body] in notes" :key="title" class="rounded-lg bg-elevated/50 p-5 text-muted ring ring-default">
                <strong class="text-default">{{ title }}</strong> {{ body }}
              </li>
            </ul>
          </section>

          <footer class="border-t border-default pt-8 text-sm text-muted">
            <p>Colours, types and syntax highlighting sampled from <a href="https://nuxt.com/" class="text-primary hover:underline">nuxt.com</a>. Not affiliated with or endorsed by Nuxt.</p>
          </footer>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>