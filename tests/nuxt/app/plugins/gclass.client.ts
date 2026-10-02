export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    import('gclass-anims').then(({ initAnimations }) => {
      initAnimations()
    })
  }
})
