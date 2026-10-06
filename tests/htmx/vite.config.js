import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages serves this repo at github.io/GClassStarts/
  base: "/GClassStarts/htmx",
  plugins: [tailwindcss()],
  // htmx fetches plain .html partials from this same directory. They are static
  // files, so they have to survive the build rather than be treated as entries.
  publicDir: "partials",
});