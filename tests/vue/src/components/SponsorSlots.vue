<script setup>
import { DOCS_URL, SPONSORS } from "../data.js";
</script>

<template>
  <!-- #spsrs — a 900px column of logo slots. vuejs.org fills these with sponsor
       logos; this parody leaves them empty, which is also true of the original
       when nobody has signed up.

       Slot height is calc(240px / 2 - 6px) = 114px and width comes from
       repeat(auto-fill, minmax(240px, 1fr)) — at 900px that resolves to three
       276px columns with a 4px gutter, matching the reference measurements. -->
  <section id="spsrs" class="mx-auto max-w-[900px] px-8 py-[42px]">
    <template v-for="row in SPONSORS" :key="row.tier">
      <h2 class="scroll letter mb-5 text-xl font-semibold leading-6 text-ink">{{ row.tier }}</h2>
      <div class="mb-12 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-1">
        <a
          v-for="n in row.slots"
          :key="n"
          :href="DOCS_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="scroll spawn-down flex h-[114px] items-center justify-around rounded-[2px] bg-panel text-center transition-colors hover:bg-[var(--vt-c-white-mute)]"
        >
          <span class="px-3 text-base text-faint">{{ n === 1 ? "Become a Sponsor" : "Vacant" }}</span>
        </a>
      </div>
    </template>
  </section>
</template>