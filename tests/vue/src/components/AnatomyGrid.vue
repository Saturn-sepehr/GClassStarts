<script setup>
/** The three-column behaviour / trigger / tunables breakdown under the anatomy snippet. */
const COLUMNS = [
  {
    title: "Behaviour",
    body: "spawn-up, float, marquee, magnet",
  },
  {
    title: "Trigger",
    body: "appear, scroll, preserve",
  },
  {
    title: "Tunables",
    body: "order, ease-expo, time-1, priority-2",
  },
];
</script>

<template>
  <div class="mt-6 grid gap-4 sm:grid-cols-3">
    <div
      v-for="(col, i) in COLUMNS"
      :key="col.title"
      class="scroll spawn-down rounded-lg border border-line bg-panel p-4"
      :class="`priority-${i + 2}`"
    >
      <h4 class="font-display font-bold text-brand">{{ col.title }}</h4>
      <p class="mt-1 font-mono text-[12px] text-muted">{{ col.body }}</p>
    </div>
  </div>
</template>