<script setup>
import { PACKAGE_URL } from "../data.js";
</script>

<template>
  <!-- 96px of padding above and below at desktop, 56px under 576px — the two
       values the original uses. -->
  <section id="hero" class=" scroll spawn-down px-8 py-24 text-center max-[576px]:px-8 max-[576px]:py-14">
    <p>Not affiliated with or endorsed by Vue</p>
    <a href="https://vuejs.org/" class="text-brand underline">Official Vue website</a>
    <!-- In dark mode the gradient covers the whole headline; in light mode only
         the .accent span does. Both cases are in styles.css. -->
    <h1 class="vt-tagline scroll letter spawn-text-spawn-down ease-expo time-1">
      gclass-anims<br />
      <span class="accent">for Vue</span>
    </h1>

    <!-- The original steps the lede down at 960px and again at 576px, where the
         hero's own padding also tightens from 96px to 56px. -->
    <p
      class="scroll typewriter mx-auto mb-10 mt-6 max-w-[960px] text-[22px] leading-[1.5] text-muted max-[960px]:mb-12 max-[960px]:text-lg max-[576px]:mx-0 max-[576px]:mb-[30px] max-[576px]:mt-[18px] max-[576px]:text-base"
    >
      The library is framework-agnostic — you only need to call initAnimations() once after mount and let the MutationObserver pick up .appear / .scroll elements as they render.
    </p>

    <p class="flex flex-wrap items-center justify-center gap-x-[18px] gap-y-3">


      <a
        href="#install"
        class="click-hover inline-block rounded-lg bg-code px-[18px] py-2 text-base font-medium text-codeink transition-colors duration-500 hover:bg-[var(--vt-c-gray-dark-3)]"
      >
        Get Started
        <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true" class="icon relative top-[-1px] ml-0.5 inline fill-current">
          <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
        </svg>
      </a>


      
    </p>
  </section>
</template>

<style scoped>
/* The play glyph in the green button is absolutely placed by the original so the
   label can sit at an even padding — same rule, scoped here. */
.icon-play {
  width: 1.5em;
  margin-left: 2px;
  display: inline;
  position: absolute;
  top: 8px;
  left: 15px;
}
</style>