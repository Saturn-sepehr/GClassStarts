import { defineConfig } from "vite";
import analog from "@analogjs/platform";
import tailwindcss from "@tailwindcss/vite";

// Analog is an Angular meta-framework that plugs into Vite, so this is an
// ordinary Vite config: `analog()` is the framework plugin and Tailwind sits
// beside it as a normal top-level plugin.
export default defineConfig(({ mode }) => ({
  // GitHub Pages serves this repo at github.io/GClassStarts/
  base: "/GClassStarts/analog",
  plugins: [
    analog({
      // Client-only (SPA) mode, and the output that deploys is dist/client.
      //
      // Analog's prerender path was tried first and does not work with this
      // app's provider set: bootstrapApplication fails during the nitro
      // prerender with NG0401 ("Missing Platform"), because the server config
      // this repo needs - a plain provideServerRendering() merge with no
      // SSR-specific providers - is not enough for Angular 22's zoneless
      // bootstrap in Analog's renderer. Rather than fight it, the build ships
      // the client tree and the page hydrates in the browser, which is the same
      // trade the remix environment makes with its own `ssr: false`.
      ssr: false,
    }),
    tailwindcss(),
  ],
  define: {
    "import.meta.env.ANALOG_META": JSON.stringify({ name: "GClassStarts" }),
  },
}));
