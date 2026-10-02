import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// @builder.io/qwik@1.20 declares peer vite ">=5 <8", so this pins vite 7.
export default defineConfig(() => ({
  // Qwik City's SSG writes the modulepreload/prefetch hrefs itself and emits them
  // as absolute /build/... paths regardless of basePathname. Vite's `base` only
  // relocates the output directory, which then disagrees with the HTML. So we
  // leave `base` unset here and scripts/build-pages.mjs rewrites the absolute
  // URLs in the generated index.html instead.
  plugins: [
    qwikCity({ basePathname: "/GClassStarts/qwik/" }),
    qwikVite(),
    tsconfigPaths(),
    tailwindcss(),
  ],
  preview: { headers: { "Cache-Control": "public,max-age=600" } },
}));
