import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";
import { useEffect } from "react";
import { initAnimations } from "gclass-anims";
import styles from "./styles.css?url";

export const links = () => [
  { rel: "stylesheet", href: styles },
  // remix.run self-hosts these two as variable fonts and preloads the roman
  // cut; the same two faces are what the hero wordmark is rasterised from, so
  // the point cloud only samples the right glyphs once they have loaded.
  {
    rel: "preload",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap",
    as: "style",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap",
  },
];

export default function App() {
  const location = useLocation();

  // Remix swaps the DOM on client navigation without a reload, so the engine is
  // re-initialised per pathname rather than once per page load. This is the
  // environment's whole reason for existing.
  useEffect(() => {
    initAnimations();
  }, [location.pathname]);

  return (
    <html lang="en" data-theme="dark" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#121212" />
        <title>gclass-anims — Remix + GClass</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}