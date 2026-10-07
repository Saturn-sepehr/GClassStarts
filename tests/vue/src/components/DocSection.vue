<script setup>
/**
 * One documentation section: a sticky-offset heading with a hover anchor, an
 * optional lede, then whatever the slot holds (code blocks, grids, notes).
 */
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  lede: { type: String, default: "" },
});
</script>

<template>
  <section :id="id" class="scroll-mt-24 px-8 py-10">
    <h2
      class="scroll letter spawn-text-spawn-down group mb-5 text-3xl font-bold tracking-tight text-ink"
    >
      <a :href="`#${id}`" class="anchor -ml-6 text-faint opacity-0 transition-opacity group-hover:opacity-100"
        >#</a
      >
      {{ title }}
    </h2>

    <p v-if="lede" class="scroll typewriter max-w-[880px] text-muted">{{ lede }}</p>

    <slot />
  </section>
</template>