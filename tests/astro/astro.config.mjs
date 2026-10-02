import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  base: "/GClassStarts/astro",
  vite: {
    plugins: [tailwindcss()],
  },
});
