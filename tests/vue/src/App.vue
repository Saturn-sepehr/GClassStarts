<script setup>
import { onMounted } from "vue";
import { initAnimations } from "gclass-anims";

import "./copy.js";

import AnatomyGrid from "./components/AnatomyGrid.vue";
import CodeBlock from "./components/CodeBlock.vue";
import DocSection from "./components/DocSection.vue";
import HeroSection from "./components/HeroSection.vue";
import HighlightBoxes from "./components/HighlightBoxes.vue";
import NavBar from "./components/NavBar.vue";
import NotesList from "./components/NotesList.vue";
import SitemapSection from "./components/SitemapSection.vue";
import SponsorSlots from "./components/SponsorSlots.vue";

import { ANATOMY, COMPARE, DOCS_URL, HOOK, INSTALL } from "./data.js";

/**
 * initAnimations() runs in onMounted, which is the whole Vue integration: the
 * engine's own MutationObserver takes care of every .appear / .scroll element
 * that renders afterwards.
 */
onMounted(() => {
  initAnimations();
});
</script>

<template>
  <!-- text-center is scoped to the hero rather than set on the root: the
       highlights, sponsors, docs and sitemap below it are all left-aligned. -->
  <div id="top">
    <div class="gc-bar scroll-progress"></div>

    <NavBar />

    <main>
      <HeroSection />

      <!-- #special-spsr — the vacancy strip: one 13px line between two dividers,
           50px tall. The original lays it out as a flex row with the label
           taking the slack; centring it is the same visual result at the width
           the screenshot was taken. -->
    
      <HighlightBoxes />

      <!-- The documentation the parody wraps: the same four sections the page
           carried before, restyled to vuejs.org's docs page rhythm. -->
      <div class="mx-auto max-w-[960px] px-8">
        <DocSection
          id="install"
          title="Install"
          lede="GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed automatically — nothing is bundled or redistributed."
        >
          <CodeBlock :code="INSTALL" lang="shell" />
        </DocSection>

        <DocSection
          id="quick-start"
          title="Quick start"
          lede="Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a utility class to an element and it animates — no per-element JS, no config files."
        >
          <CodeBlock :code="HOOK" lang="vue" />
          <CodeBlock :code="COMPARE" lang="vue" />
          <p class="mt-4 border-l-2 border-brand pl-4 text-sm text-muted">
            Class anatomy is the same as vanilla: behaviour
            (<code class="font-mono">.spawn-up</code>) + trigger
            (<code class="font-mono">.scroll</code>, <code class="font-mono">.appear</code>) + tunables
            (<code class="font-mono">.time-1</code>, <code class="font-mono">.ease-back</code>). Order in
            <code class="font-mono">class</code> does not matter.
          </p>
        </DocSection>

        <DocSection
          id="anatomy"
          title="Class anatomy"
          lede="Class anatomy: behaviour (.spawn-up) + trigger (.scroll, .appear) + tunables (.time-1, .ease-back, .priority-2). Combine freely — order in class does not matter."
        >
          <CodeBlock :code="ANATOMY" lang="html" />
          <AnatomyGrid />
        </DocSection>

        <DocSection id="notes" title="Notes">
          <NotesList />
        </DocSection>
      </div>

    </main>

    <footer class="border-t border-line bg-panel px-6 py-6 text-sm text-muted">
      <p class="mx-auto max-w-[900px]">

        All colours and types sampled from
        <a class="text-brand hover:underline" href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">vuejs.org</a>
        
      </p>
    </footer>
  </div>
</template>