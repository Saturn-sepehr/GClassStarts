import { CommandBar } from "../components/CommandBar";
import { FeatureRail } from "../components/FeatureRail";
import { LazySprueScene, LazyTrackScene, Scene } from "../components/Scenes";
import { SiteNav } from "../components/SiteNav";
import { StackCard } from "../components/StackCard";
import { useCopyCommand } from "../hooks/useCopyCommand";

export const meta = () => [
  { title: "Remix + GClass — The Fully-Stacked Web Framework" },
  { name: "description", content: "The fully-stacked web framework, running gclass-anims 1.0.0-beta.24" },
];

export default function Index() {
  const copy = useCopyCommand();

  return (
    <div className="rx-page">
      <SiteNav />

      {/* The racing track is fixed and full-bleed; every other layer sits above
          it, which is how the reference gets the landscape to read as behind the
          content rather than inside a panel. */}
      <div className="rx-bg" aria-hidden="true">
        <LazyTrackScene className="rx-bg__canvas" />
      </div>

      <p className="rx-scroll-hint">Scroll or press ↓ and ↑</p>

      <main>
        {/* ── hero ─────────────────────────────────────────────────────────── */}
        <section className="rx-hero">
          {/* Solid type, matching the reference: the landing wordmark is ordinary
              pink display type. The particle work on this page is the track. */}
          <h1 className="rx-hero__wordmark">
            <span className="rx-hero__mark">
              <span className="rx-hero__mark-remix">REMIX</span>
              <span className="rx-hero__mark-plus">+</span>
              <span className="rx-hero__mark-gclass">GCLASS</span>
            </span>
          </h1>

          <h2 className="rx-hero__title">
            The fully-stacked
            <br />
            web framework
          </h2>

          <p className="rx-hero__lede">
            Remix brings together a server runtime, routing, authentication, sessions, database integrations, a
            UI framework, asset compilation, dynamic styling, and accessible components in a cohesive{" "}
            <span className="rx-hero__accent">stack built on Web APIs — with gclass-anims wired into the root.</span>
          </p>

          <CommandBar />
        </section>

        {/* ── the stack card ───────────────────────────────────────────────── */}
        <section className="rx-section" id="fully-stacked">
          <StackCard />
        </section>

        {/* ── the runner kit ───────────────────────────────────────────────── */}
        <section className="rx-section rx-section--sprue" id="runner-kit">
          <Scene className="rx-sprue">
            <LazySprueScene className="rx-sprue__canvas" />
          </Scene>
          <div className="rx-section__copy">
            <h2 className="rx-section__title">One runner, thirty-two frames</h2>
            <p className="rx-section__lede">
              The same engine, cut into a different chassis on every pass — Vue, React, Svelte, Astro, Next, Remix,
              and two dozen more. One <code>initAnimations()</code> call per environment, identical class names
              everywhere.
            </p>
            <div className="rx-chips">
              {["vue", "react", "svelte", "astro", "next", "nuxt", "qwik", "solid", "lit", "angular", "ember", "remix"].map(
                (env) => (
                  <span key={env} className="rx-chip">
                    {env}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ── documentation ────────────────────────────────────────────────── */}
        <section className="rx-section rx-section--docs" id="docs">
          <div className="rx-doc">
            <h2>Install</h2>
            <p>
              GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed
              automatically — nothing is bundled or redistributed.
            </p>
            <Snippet code={"npm install gclass-anims"} onCopy={copy} />
          </div>

          <div className="rx-doc" id="quick-start">
            <h2>Quick start</h2>
            <p>
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
            <h2>Class anatomy</h2>
            <p>
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
            <h2>Notes</h2>
            <ul className="rx-notes">
              <li>
                <strong>Dual ESM + CJS.</strong> The package ships dist/gclass.esm.js and dist/gclass.cjs via
                vite.lib.config.js — GSAP is external, not bundled. The build is tree-shakable with sideEffects:
                false.
              </li>
              <li>
                <strong>GSAP stays external.</strong> gsap ^3.15 installs automatically as a dependency. Nothing
                is bundled or redistributed here either.
              </li>
              <li>
                <strong>WebGL is deferred.</strong> Both scenes load behind a lazy boundary and dispose their GL
                resources on unmount, so client navigation does not leak contexts.
              </li>
              <li>
                <strong>Reduced motion.</strong> Nothing animates once the OS preference is set.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <FeatureRail />

      <footer className="rx-footer">
        <p>
          Not affiliated with or endorsed by Remix. Layout, colours and type copied from{" "}
          <a href="https://remix.run/" target="_blank" rel="noreferrer">
            https://remix.run/
          </a>
          . Racing track and runner kit built with three.js.
        </p>
      </footer>
    </div>
  );
}

function Snippet({ code, onCopy }: { code: string; onCopy: (text: string, cb: (v: boolean) => void) => void }) {
  return (
    <div className="rx-snippet" data-copy-block>
      <pre>
        <code>{code}</code>
      </pre>
      <button
        type="button"
        data-copy
        className="rx-snippet__copy"
        aria-label="Copy code"
        onClick={(e) =>
          onCopy(code, () => {
            const el = e.currentTarget;
            el.textContent = "Copied";
            setTimeout(() => {
              el.textContent = "Copy";
            }, 1400);
          })
        }
      >
        Copy
      </button>
    </div>
  );
}