<script setup>
import CopyButton from "./CopyButton.vue";

/**
 * A code block: the language tab row above the source, plus the copy button.
 *
 * `lang` is only a label. The source itself arrives as a string prop so the
 * escaping stays the compiler's problem — no v-html, no manual entity escaping.
 */
defineProps({
  code: { type: String, required: true },
  lang: { type: String, default: "js" },
});
</script>

<template>
  <div class="group relative my-5 overflow-hidden rounded-lg border border-line bg-panel">
    <div class="flex items-center justify-between px-4 pt-3 text-xs text-faint">
      <span>{{ lang }}</span>
    </div>
    <pre
      class="scroll spawn-down overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-codeink"
    ><code>{{ code }}</code><CopyButton /></pre>
  </div>
</template>