import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  app: { baseURL: "/GClassStarts/nuxt" },
  devtools: { enabled: false },
  css: ["~/assets/gclass.css"],
  ssr: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
