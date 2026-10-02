<script setup>
const route = useRoute();

const reinit = async () => {
  if (!import.meta.client) return;
  await nextTick();
  const { initAnimations } = await import("gclass-anims");
  initAnimations();
};

// SPA navigation does not reload the page, so re-wire the new DOM.
watch(() => route.fullPath, reinit);

onMounted(reinit);
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
