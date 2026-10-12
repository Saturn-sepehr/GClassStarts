import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["@nuxt/fonts"],
  compatibilityDate: "2025-01-01",
  app: { baseURL: "/GClassStarts/nuxt" },
  devtools: { enabled: false },
  css: ["~/assets/gclass.css"],
  fonts: {
    // nuxt.com is a Nuxt app, so it serves Inter through @nuxt/fonts rather than
    // a <link> to a CDN. That module is what produces the "Inter Fallback: …"
    // families: `fallbacks` is keyed by generic family, so declaring
    // `--font-sans: Inter, sans-serif` in the theme makes the module resolve
    // `sans-serif` to the list below and emit one metrics-adjusted @font-face
    // per entry, sized to Inter's own ascent/descent so nothing shifts when the
    // webfont lands. Spelled out because that list is the whole point.
    defaults: {
      fallbacks: {
        "sans-serif": ["BlinkMacSystemFont", "Segoe UI", "Helvetica Neue", "Arial", "Noto Sans"],
      },
    },
    families: [
      { name: "Inter", provider: "google" },
      // Headings are not Inter. nuxt.com sets --font-heading to Outfit, which is
      // the geometric face in "The Full-Stack Vue Framework".
      { name: "Outfit", provider: "google" },
    ],
  },
  ssr: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
