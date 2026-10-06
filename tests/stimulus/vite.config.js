import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages serves this repo at github.io/GClassStarts/
  base: "/GClassStarts/stimulus",
  plugins: [tailwindcss()],
});