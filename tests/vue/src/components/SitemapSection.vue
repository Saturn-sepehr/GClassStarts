<script setup>
import { SITEMAP } from "../data.js";
</script>

<template>
  <!-- #sitemap — multi-column link list, 3 columns from 1024px up. CSS
       multi-column rather than grid, so an unequal number of links per column
       still balances, exactly as the original relies on. -->
  <section id="sitemap" class="mt-12 border-t border-line">
    <div class="mx-auto max-w-[900px] px-8 py-6 columns-1 sm:columns-2 lg:columns-3 [column-fill:balance]">
      <div v-for="col in SITEMAP" :key="col.title" class="mb-8 break-inside-avoid">
        <h4 class="mb-1 font-medium text-ink">{{ col.title }}</h4>
        <ul>
          <li v-for="[label, href] in col.links" :key="label">
            <a
              :href="href"
              class="vt-link block py-0.5 text-[0.9em] text-ink/75 transition-colors hover:text-brand"
            >
              {{ label }}
              <svg
                v-if="href.startsWith('http')"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="vt-link-icon -mt-1 inline-block fill-current align-middle"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>