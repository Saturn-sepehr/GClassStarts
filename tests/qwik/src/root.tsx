import { component$, useStyles$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import globalCss from "./global.css?inline";

// A bare `import './global.css'` gets compiled but never linked into the
// SSG output, so the page renders unstyled. useStyles$ with ?inline is the
// documented way to register global CSS in Qwik City.
export default component$(() => {
  useStyles$(globalCss);

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>gclass-anims — Qwik</title>
      </head>
      <body>
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
