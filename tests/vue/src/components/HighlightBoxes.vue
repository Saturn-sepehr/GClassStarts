<script setup>
import { HIGHLIGHTS } from "../data.js";
</script>

<template>
  <!-- #highlights — three boxes, 32% each, spaced with justify-between, and no
       background of their own (the original sets .vt-box transparent here). -->
  <section id="highlights" class="mx-auto max-w-[960px] px-8 py-[42px] text-muted">
    <div class="flex flex-wrap justify-between gap-y-6">
      <div
        v-for="(h, i) in HIGHLIGHTS"
        :key="h.title"
        class="scroll spawn-down flex-[0_32%] basis-full px-9 py-7 text-sm font-medium sm:basis-[32%]"
        :class="`priority-${i + 2}`"
      >
        <h2 class="vt-first-letter mb-[0.75em] text-xl font-semibold leading-6 tracking-[-0.4px] text-ink">
          {{ h.title }}
        </h2>
        <p class="text-[15px] font-normal">{{ h.body }}</p>
      </div>
    </div>
  </section>
</template>