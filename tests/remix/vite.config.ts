import { vitePlugin as remix } from "@remix-run/dev";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// The `/GClassStarts/remix` mount path is a GitHub Pages concern only, so it is
// applied to the build and not to dev, which serves at the root.
export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    // Remix 2 has no static export. SPA mode emits a single index.html that
    // boots the client router, which is what a static host can serve.
    //
    // The trailing slash is load-bearing: Vite joins `base` and the asset path
    // verbatim, so "/GClassStarts/remix" + "assets/…" yields the non-existent
    // "/GClassStarts/remixassets/…".
    base: isDev ? "/" : "/GClassStarts/remix/",
    plugins: [
      remix({
        ssr: false,
        // Without this the SPA build hardcodes "basename":"/" into index.html,
        // so the client router receives "/GClassStarts/remix/" as a *route path*
        // and matches nothing — every page 404s on the deployed path.
        //
        // In dev the plugin additionally asserts `basename.startsWith(base)`
        // whenever `command === "serve"`. Both are "/" here, so that assertion
        // is skipped by its own `basename !== "/"` guard.
        basename: isDev ? "/" : "/GClassStarts/remix",
      }),
      tailwindcss(),
    ],
  };
});
