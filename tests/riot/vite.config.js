import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import riot from "./riot-plugin.js";

export default defineConfig({
  // GitHub Pages serves this repo at github.io/GClassStarts/
  base: "/GClassStarts/riot",
  plugins: [riot(), tailwindcss()],
});