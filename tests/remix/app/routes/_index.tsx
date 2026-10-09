import { useRef, useState } from "react";

import { useBackdrop } from "../components/Backdrop";
import { CommandBar } from "../components/CommandBar";
import { FeatureRail } from "../components/FeatureRail";
import { SiteNav } from "../components/SiteNav";
import { StackCard } from "../components/StackCard";
import { useCopyCommand } from "../hooks/useCopyCommand";
import { useHeroPassed } from "../hooks/useHeroPassed";
import cutout from "../cutout.svg?url";
import final from "../final.svg?url";
import road from "../road.svg?url";
import runner from "../runner.svg?url";
import windows from "../windows.svg?url";

export const meta = () => [
  { title: "gclass-anims — Remix" },
  {
    name: "description",
    content:
      "gclass-anims turns utility classes into animations. One initAnimations() call, then behaviour, trigger and tunables live in the markup.",
  },
];

export default function Index() {
  const copy = useCopyCommand();
  const backdrop = useBackdrop();
  const heroRef = useRef<HTMLElement | null>(null);
  const heroPassed = useHeroPassed();

  return (
    <div className="rx-page">
      <SiteNav state={heroPassed ? "header" : "hero"} />

{/* The backdrop is fixed and full-bleed; every other layer sits above it,
          which is how the reference gets the landscape to read as behind the
          content rather than inside a panel.

          Five scene layers over the base gradients, each in its own div so a
          Tailwind transform can be applied to one layer without touching the
          others. They crossfade on scroll — the first is up while the page
          introduces itself, the last by the footer.

          The div and the img are separate elements on purpose. magnet3d writes
          an inline `transform` on the img on every mousemove, which would
          overwrite a `scale-*` / `rotate-*` utility sitting on that same
          element. Split, the div carries the layer transform and the img keeps
          the magnet response.

          Each div also carries its own `--rx-scene-ratio`, which is that SVG's
          width-to-height. The five range from 1.16:1 (windows) to 3.5:1 (road),
          so a single shared figure would leave four of them undersized. */}

      <div className="rx-bg" ref={backdrop} aria-hidden="true">
        <div className=" opacity-50" >
          <img className="rx-scene rx-scene--1 " src={road} alt="" draggable={false} />
        </div>
        <div className="opacity-50" >
          <img className="rx-scene rx-scene--2 " src={cutout} alt="" draggable={false} />
        </div>
        <div className="opacity-50" >
          <img className="rx-scene rx-scene--3 " src={runner} alt="" draggable={false} />
        </div>
        <div className="opacity-50" >
          <img className="rx-scene rx-scene--4 " src={windows} alt="" draggable={false} />
        </div>
        <div className=" opacity-50" >
          <img className="rx-scene rx-scene--5 " src={final} alt="" draggable={false} />
        </div>
      </div>

      <p className="rx-scroll-hint scroll typewriter">Scroll or press ↓ and ↑</p>
      <p className="rx-scroll-hint scroll typewriter">Not affiliated with or endorsed by Remix</p>
      <a href='https://remix.run/' className="rx-scroll-hint scroll typewriter underline text-brand">Official Remix website</a>

      <main>
        {/* ── hero ─────────────────────────────────────────────────────────── */}
        <section className="rx-hero" id="hero" ref={heroRef}>
          {/* The wordmark is one element and lives in the header — it is styled
              into the hero until the hero is scrolled past, then travels up into
              the bar. It cannot be in this section's flow, so this reserves the
              space it occupies.

              Always rendered, in both states. Collapsing it once the logo had
              left would change the document's scroll height under the reader,
              which re-scales the scroll position the hero, the rail and the
              backdrop are all measured against — a feedback loop for a gap
              nobody can see, because by then the hero is off-screen. */}
          <div className="rx-hero__mark" aria-hidden="true" />

          {/* The hero's own heading, promoted from h2: it was the only h1 on the
              page once the wordmark stopped betests/remix/app/CopyQ.CNYAwZ.pnging one. */}
          <h1 className="rx-hero__title spawn-text-spawn-up letter scroll ease-expo">
            gclass-anims
            <br />
            for Remix
          </h1>

          <p className="rx-hero__lede scroll typewriter">
            
            Framework agnostic. just call initAnimations once DOM is ready and your animations will be ready to play!
          </p>

          <CommandBar />
        </section>

        {/* ── the stack card ───────────────────────────────────────────────── */}
        <section className="rx-section" id="fully-stacked">
          <StackCard />
        </section>

        {/* ── the runner kit ───────────────────────────────────────────────── */}
        <section className="rx-section rx-section--runner" id="runner-kit">
          <div className="rx-section__copy">
            <h2 className="rx-section__title spawn-text-spawn-up scroll ease-expo letter">One runner, every possible frame</h2>
            <p className="rx-section__lede typewriter scroll">
              The same engine, completely framework indifferent — Vue, React, Svelte, Astro, Next, Remix,
              and two dozen more. One <code>initAnimations()</code> call per environment, identical class names
              everywhere.
            </p>
            <div className="rx-chips">
              {["vue", "react", "svelte", "astro", "next", "nuxt", "qwik", "solid", "lit", "angular", "ember", "remix"].map(
                (env) => (
                  <span key={env} className="rx-chip order scroll spawn-down ease-expo">
                    {env}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ── documentation ────────────────────────────────────────────────── */}
        <section className="rx-section rx-section--docs" id="docs">
          <div className="rx-doc" id="install">
            <h2 className="spawn-text-spawn-up ease-expo scroll letter">Install</h2>
            <p className="typewriter scroll letter">
              GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed
              automatically — nothing is bundled or redistributed.
            </p>
            <Snippet code={"npm install gclass-anims"} onCopy={copy} />
          </div>

          <div className="rx-doc" id="quick-start">
            <h2 className="spawn-text-spawn-up ease-expo scroll letter">Quick start</h2>
            <p className="typewriter scroll letter">
              Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a
              utility class to an element and it animates — no per-element JS, no config files.
            </p>
            <Snippet
              code={`import { Outlet, useLocation } from '@remix-run/react'
import { useEffect } from 'react'
import { initAnimations } from 'gclass-anims'

export default function App() {
  const location = useLocation()

  // Remix swaps the DOM on client navigation without a reload
  useEffect(() => {
    initAnimations()
  }, [location.pathname])

  return <Outlet />
}`}
              onCopy={copy}
            />
          </div>

          <div className="rx-doc" id="anatomy">
            <h2 className="spawn-text-spawn-up ease-expo scroll letter">Class anatomy</h2>
            <p className="typewriter scroll letter">
              Three parts, any order: <strong>behaviour</strong> (.spawn-up), <strong>trigger</strong> (.scroll,
              .appear) and <strong>tunables</strong> (.time-1, .ease-back, .priority-2). Order in class does not
              matter.
            </p>
            <Snippet
              code={`// behaviour + trigger + tunables
<div class="appear scroll spawn-up">…</div>
<div class="appear scroll order ease-expo time-1 priority-2">…</div>
<div class="float">loops forever</div>
<button class="magnet click-expand">magnet + click</button>`}
              onCopy={copy}
            />
          </div>

          <div className="rx-doc" id="notes">
            <h2 className="spawn-text-spawn-up ease-expo scroll letter">Notes</h2>
            <ul className="rx-notes">
              <li className="priority-50 spawn-down order ease-expo scroll">
                <strong>Dual ESM + CJS.</strong> The package ships dist/gclass.esm.js and dist/gclass.cjs via
                vite.lib.config.js — GSAP is external, not bundled. The build is tree-shakable with sideEffects:
                false.
              </li>
              <li className="priority-50 spawn-down order ease-expo scroll">
                <strong>GSAP stays external.</strong> gsap ^3.15 installs automatically as a dependency. Nothing
                is bundled or redistributed here either.
              </li>
              <li className="priority-50 spawn-down order ease-expo scroll">
                <strong>No canvas.</strong> The backdrop is CSS gradients, so there is no WebGL context to create,
                lose or leak on client navigation.
              </li>
              <li className="priority-50 spawn-down order ease-expo scroll">
                <strong>Reduced motion.</strong> Nothing animates once the OS preference is set.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <FeatureRail />

      <footer className="rx-footer">
        <p>
          Colours, types and backgrounds sampled from <a href="https://remix.run/" target="_blank" rel="noreferrer">
              https://remix.run/
          </a> including the runner gif

        </p>
        <p>
          I couldn't replicate the threejs models so I just traced them with SVGs TmT
        </p>
      </footer>
    </div>
  );
}

/**
 * Inline style for a scene layer's wrapper div.
 *
 * React's CSSProperties has no index signature for custom properties, so this
 * is the cast in one place instead of five. The value is the SVG's own
 * width-to-height, which `.rx-scene` needs to size the art to cover without
 * distorting it.
 */
function sceneSlot(ratio: number) {
  return { "--rx-scene-ratio": String(ratio) } as React.CSSProperties;
}

function Snippet({ code, onCopy }: { code: string; onCopy: (text: string, cb: (v: boolean) => void) => void }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="rx-snippet scroll spawn-down ease-expo">
      <pre>
        <code className="scroll typewriter">{code}</code>
      </pre>
      <button
        type="button"
        className="rx-snippet__copy"
        aria-label="Copy code"
        onClick={() => onCopy(code, setCopied)}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Code copied" : ""}
      </span>
    </div>
  );
}