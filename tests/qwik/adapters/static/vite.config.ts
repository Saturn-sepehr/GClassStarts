import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

// A plain `vite build` emits only client chunks - no HTML, which means a
// static host has nothing to serve. This second pass runs Qwik City's SSG
// adapter and writes dist/index.html.
export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["@qwik-city-plan"],
      },
    },
    plugins: [
      staticAdapter({
        origin: "https://saturn-sepehr.github.io",
        basePathname: "/GClassStarts/qwik/",
      }),
    ],
  };
});
