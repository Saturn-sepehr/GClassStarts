import { vitePlugin as remix } from "@remix-run/dev";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // Remix 2 has no static export. SPA mode emits a single index.html that
  // boots the client router, which is what a static host can serve.
  base: "/GClassStarts/remix/",
  plugins: [remix({ ssr: false }), tailwindcss()],
});
