// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
var app_config_default = defineConfig({
  // GitHub Pages serves this repo at github.io/GClassStarts/
  base: "/GClassStarts/solidstart",
  // SolidStart drives Vite itself, so Tailwind is added as a nested plugin the
  // same way it is for astro and nuxt in this repo.
  vite: {
    plugins: [tailwindcss()]
  },
  ssr: false
});
export {
  app_config_default as default
};
