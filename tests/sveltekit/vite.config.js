import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// SvelteKit 3 no longer reads svelte.config.js; config goes through the
// plugin. The base pathname lives at `paths.base` — the plugin reads
// kit.paths.base to build __SVELTEKIT_PATHS_BASE__, which is what rewrites
// /_app/… asset URLs. A top-level Vite `base` is not read for this.
export default defineConfig({
  plugins: [
    sveltekit({
      paths: {
        base: "/GClassStarts/sveltekit",
      },
      // SPA fallback so the build emits a static index.html
      adapter: adapter({ fallback: "index.html" }),
    }),
    tailwindcss(),
  ],
});
