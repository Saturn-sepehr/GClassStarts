import { transform } from "esbuild";
import { compile } from "@riotjs/compiler";

/**
 * A minimal Riot compiler plugin for Vite.
 *
 * Riot 10 ships the compiler (`@riotjs/compiler`) but no official Vite plugin —
 * there is no `@vitejs/plugin-riot` on the registry, and `vite-plugin-riot`
 * never existed. So this is that integration written out rather than depended on.
 *
 * Riot's compiler is synchronous and returns a JS module as a string, which Vite
 * would otherwise hand to its own transform pipeline without knowing what it is.
 * Running esbuild over the result is all this plugin needs to do.
 *
 * Compiled .riot modules import their runtime bindings from a bare "riot"
 * specifier, so Vite's resolver handles them like any other dependency.
 */
export default function riotPlugin() {
  return {
    name: "gclass-riot",
    enforce: "pre",

    async transform(code, id) {
      if (!id.endsWith(".riot")) return null;

      const { code: compiled } = compile(code, {
        file: id.split("/").pop(),
      });

      const result = await transform(compiled, {
        loader: "js",
        format: "esm",
        target: "es2022",
      });

      return { code: result.code, map: result.map };
    },
  };
}