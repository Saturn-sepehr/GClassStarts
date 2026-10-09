import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";
import { useEffect } from "react";
import { initAnimations } from "gclass-anims";
import runner from "./remix-runner.avif?url";
import styles from "./styles.css?url";

export const links = () => [
  { rel: "stylesheet", href: styles },
  // remix.run self-hosts these two as variable fonts and preloads the roman
  // cut; the same two faces are what the wordmarks are set in.
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
        <title>gclass-anims — class-driven animation</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* The boot overlay: a black screen with the runner in the middle, for
            two seconds, before the page is revealed.

            gclass-anims treats any `.boot-up` element as the boot overlay. On
            init it injects a stylesheet that hides the whole document
            (`html.gclass-booting { visibility: hidden }`), re-shows this subtree,
            positions it fixed and full-screen with `place-items: center`, and
            runs the listeners scoped to it — so the mark's own animations play
            while the rest of the page is held back. When `boot-time-2` expires
            the overlay is hidden and the document comes back.

            In the document rather than in the route, because it has to cover the
            page on the first paint: `initAnimations()` runs in an effect after
            hydration, and until it does, the overlay is just markup sitting in
            the flow. The rules in styles.css make it look identical in both
            states so there is no flash of the page behind it.

            aria-hidden: it is decorative and it is gone before a screen reader
            has any reason to be in here. */}
        <div className="boot-up boot-time-2" aria-hidden="true">
          <img className="boot-up__mark" src={runner} alt="" draggable={false} />
        </div>

        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}