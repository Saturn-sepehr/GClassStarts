<script setup>
/**
 * The copy-to-clipboard button on a code block.
 *
 * The click itself is delegated from ./copy.js, which looks for [data-copy] and
 * reads the text from the sibling <code>. So this component owns nothing but the
 * markup — no state, no handler. It is hidden until the block is hovered, which
 * is why the parent carries the `group` class.
 */
defineProps({
  label: { type: String, default: "Copy" },
});
</script>

<template>
  <button
    type="button"
    data-copy
    :aria-label="`${label} code`"
    class="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted opacity-0 transition-opacity hover:border-brand hover:text-brand focus-visible:border-brand focus-visible:text-brand group-hover:opacity-100"
  >
    {{ label }}
  </button>
</template>