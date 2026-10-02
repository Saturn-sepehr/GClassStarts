import { useEffect } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";
import { initAnimations } from "gclass-anims";
import styles from "./styles.css?url";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  const location = useLocation();

  // Remix swaps the DOM on client navigation without a reload.
  useEffect(() => {
    initAnimations();
  }, [location.pathname]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>gclass-anims — Remix</title>
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
