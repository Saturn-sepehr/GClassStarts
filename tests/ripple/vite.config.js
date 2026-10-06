import { defineConfig } from "vite";
import { ripple } from "@ripple-ts/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub Pages serves this repo at github.io/GClassStarts/
  base: "/GClassStarts/ripple",
  // ssr: false is Ripple's client-only build: components compile to bare DOM
  // reads, track() carries no serialization hashes, and the hydration paths are
  // left out of the bundle entirely. GitHub Pages serves files only, so this is
  // also the only mode that produces a servable tree.
  plugins: [ripple({ ssr: false }), tailwindcss()],
});
