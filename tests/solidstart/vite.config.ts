import { defineConfig } from "vite";
import { solidStart } from "@solidjs/start/config";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";

// SolidStart v2 moved its framework options out of app.config.ts into a normal
// Vite config, where solidStart() is just a plugin alongside Vite's environment
// API. That also makes Tailwind an ordinary top-level plugin here rather than a
// nested `vite.plugins` entry as it is for astro and nuxt in this repo.
//
// GitHub Pages serves files only - no Node runtime - so nitro's prerenderer is
// pointed at "/" and the resulting .output/public is the servable tree. That is
// what solidStart's own `ssr: false` SPA mode cannot do here: with ssr off the
// client build emits only route chunks and no index.html at all.
export default defineConfig({
  // GitHub Pages serves this repo at github.io/GClassStarts/
  base: "/GClassStarts/solidstart",
  plugins: [tailwindcss(), solidStart(), nitro()],
  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: false,
    },
  },
});
