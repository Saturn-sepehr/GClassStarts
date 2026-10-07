<script setup>
/** The Notes list. One array rather than three hand-written <li>s so the
    stagger classes can be generated from the index. */
const NOTES = [
  {
    title: "One call, then forget it.",
    body: "initAnimations() in onMounted is the entire integration. The engine's MutationObserver discovers .appear and .scroll elements as they render, so v-if blocks and <component :is> swaps animate without another call.",
  },
  {
    title: "Dual ESM + CJS.",
    body: "The package ships dist/gclass.esm.js and dist/gclass.cjs via vite.lib.config.js — GSAP is external, not bundled. The build is tree-shakable with sideEffects: false and prepublishOnly: build.",
  },
  {
    title: "GSAP stays external.",
    body: "gsap ^3.15 installs automatically as a dependency. Nothing is bundled or redistributed here either — GSAP is under the Webflow Standard No-Charge GSAP License.",
  },
  {
    title: "Requirements.",
    body: "Node >=16 to build, and a modern browser with ES module support at runtime. Reduced motion is honoured: nothing animates once the OS preference is set.",
  },
];
</script>

<template>
  <ul class="mt-6 space-y-4">
    <li
      v-for="(note, i) in NOTES"
      :key="note.title"
      class="scroll spawn-down rounded-lg border border-line bg-panel p-5"
      :class="`priority-${i + 3}`"
    >
      <strong class="text-ink">{{ note.title }}</strong>
      {{ note.body }}
    </li>
  </ul>
</template>