// Riot 10 components are compiled at build time by riot-plugin.js and register
// themselves by tag name. mount() renders synchronously, so by the time it
// returns the page is in the document and initAnimations() sees all of it.
//
// Riot re-renders by updating bindings on existing nodes and by inserting or
// removing real children. The engine's MutationObserver covers the second case,
// which is what the row list below relies on — one init call, no per-update hook.
import { component, register } from "riot";
import { initAnimations } from "gclass-anims";
import RowList from "./row-list.riot";
import "./styles.css";

register(RowList);

component(
  `<page>
    <div class="gc-bar scroll-progress"></div>

    <div class="sidebar">
      <a class="mb-6 block" href="https://riot.js.org/">
        <!-- The Riot logotype inlined: a #333447 square plus the wordmark in the
             same Helvetica Neue the rest of the site uses. Inlined rather than
             linked because this template is a JS string, so Vite cannot see the
             src and rewrite it under the GitHub Pages base path. -->
        <svg viewBox="0 0 120 30" width="120" height="30" role="img" aria-label="Riot">
          <rect x="0" y="4" width="22" height="22" fill="#333447"/>
          <text x="30" y="22" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="19" font-weight="700" fill="#333447">riot</text>
        </svg>
      </a>
      <ul>
        <li><a href="#install">Install</a></li>
        <li><a href="#quick-start">Quick start</a></li>
        <li><a href="#anatomy">Class anatomy</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </div>

    <div class="content">
      <div class="hero">
        <p class="font-mono text-sm">
          <a class="text-brand" href="https://riot.js.org/">https://riot.js.org/</a>
        </p>
        <h1 class="scroll letter spawn-text-spawn-down">gclass-anims for Riot</h1>
        <p class="scroll typewriter time-2">
          Riot composes behaviour in custom elements with expressions and
          update handlers. gclass-anims composes it with class names. Register the
          tags, mount, then call <code>initAnimations()</code> once.
        </p>
        <p>
          <a href="#install" class="click-expand compatibility amount-4">Get started</a>
        </p>
      </div>

      <div class="container">
        <div id="install">
          <h2 class="scroll letter spawn-text-spawn-down">Install</h2>
          <p class="scroll typewriter">
            GClass ships as the npm package gclass-anims. GSAP is a regular
            dependency and is installed automatically - nothing is bundled or
            redistributed. Riot is a peer of this page, not a dependency of the
            library.
          </p>
          <div class="scroll spawn-down">
            <pre class="group relative mt-5 overflow-x-auto"><code>npm install gclass-anims riot</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-panel px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:text-brand" aria-label="Copy code">Copy</button></pre>
          </div>
        </div>

        <div id="quick-start">
          <h2 class="scroll letter spawn-text-spawn-down">Quick start</h2>
          <p class="scroll typewriter">
            Import initAnimations once your DOM is ready. From then on,
            everything is class-driven: add a utility class to an element and it
            animates - no per-element JS, no config files.
          </p>

          <h3 class="mt-8 text-2xl">Register, mount, then init</h3>
          <div class="scroll spawn-down">
            <pre class="group relative mt-4 overflow-x-auto"><code>// main.js
import { component, register } from 'riot'
import { initAnimations } from 'gclass-anims'
import RowList from './row-list.riot'

register(RowList)

// tagged templates are escaped so the backticks survive being inside
// this module's own template literal
component(\`&lt;page&gt;…&lt;/page&gt;\`)

initAnimations()</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-panel px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:text-brand" aria-label="Copy code">Copy</button></pre>
          </div>

          <h3 class="mt-8 text-2xl">Live - rows from a Riot update handler</h3>
          <p class="scroll typewriter">
            Nothing re-initialises after this point. The component pushes a row
            and re-renders, Riot inserts real nodes, and each one plays its
            entrance.
          </p>
          <row-list></row-list>

          <div class="scroll spawn-down mt-5">
            <pre class="group relative overflow-x-auto"><code>&lt;!-- row-list.riot --&gt;
&lt;button onclick={ () =&gt; state.n++ }&gt;Add a row&lt;/button&gt;

&lt;ul&gt;
  &lt;li each={ i in 1 &lt;= state.n } class="appear spawn-up"&gt;
    row { i }
  &lt;/li&gt;
&lt;/ul&gt;</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-panel px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:text-brand" aria-label="Copy code">Copy</button></pre>
          </div>
        </div>

        <div id="anatomy">
          <h2 class="scroll letter spawn-text-spawn-down">Class anatomy</h2>
          <p class="scroll typewriter-split letter">
            Class anatomy: <strong>behaviour</strong> (<code>.spawn-up</code>) +
            <strong>trigger</strong> (<code>.scroll</code>, <code>.appear</code>) +
            <strong>tunables</strong> (<code>.time-1</code>, <code>.ease-back</code>,
            <code>.priority-2</code>). Combine freely - order in class does not matter.
          </p>
          <div class="scroll spawn-down mt-5">
            <pre class="group relative overflow-x-auto"><code>&lt;!-- behaviour + trigger + tunables --&gt;
&lt;div class="appear scroll spawn-up"&gt;…&lt;/div&gt;
&lt;div class="appear scroll order ease-expo time-1 priority-2"&gt;…&lt;/div&gt;
&lt;div class="float"&gt;loops forever&lt;/div&gt;
&lt;button class="magnet click-expand"&gt;magnet + click&lt;/button&gt;</code><button type="button" data-copy class="absolute right-2 top-2 rounded border border-line bg-panel px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:text-brand" aria-label="Copy code">Copy</button></pre>
          </div>
          <div class="mt-6 grid gap-4 sm:grid-cols-3">
            <div class="note note--info scroll spawn-down order priority-2">
              <h3 class="m-0 text-brand">Behaviour</h3>
              <p class="m-0 mt-1 font-mono text-[1.3rem]">spawn-up, float, marquee, magnet</p>
            </div>
            <div class="note note--info scroll spawn-down order priority-2">
              <h3 class="m-0 text-brand">Trigger</h3>
              <p class="m-0 mt-1 font-mono text-[1.3rem]">appear, scroll, preserve</p>
            </div>
            <div class="note note--info scroll spawn-down order priority-2">
              <h3 class="m-0 text-brand">Tunables</h3>
              <p class="m-0 mt-1 font-mono text-[1.3rem]">order, ease-expo, time-1, priority-2</p>
            </div>
          </div>
        </div>

        <div id="notes">
          <h2 class="scroll letter spawn-text-spawn-down">Notes</h2>
          <ul class="mt-6 grid gap-4">
            <li class="note note--info scroll spawn-down order priority-3">
              <strong class="text-ink">Scoped CSS leaves class alone.</strong>
              Riot rewrites selectors inside a <code>&lt;style&gt;</code> block to
              scope them, and adds a generated attribute. The utility classes on
              the same element are untouched, so gclass-anims reads them as
              written.
            </li>
            <li class="note note--info scroll spawn-down order priority-3">
              <strong class="text-ink">Expression updates are fine.</strong> A
              <code>{ state.x }</code> re-render updates text in place, which
              gclass-anims is not interested in. Only real insertions and
              removals matter, and those are handled.
            </li>
            <li class="note note--info scroll spawn-down order priority-3">
              <strong class="text-ink">GSAP stays external.</strong> ESM is
              <code>dist/gclass.esm.js</code> and CJS is
              <code>dist/gclass.cjs</code> - GSAP is external, not bundled, and the
              build is tree-shakable with <code>sideEffects: false</code>.
            </li>
          </ul>
        </div>

        <footer class="footer">
          <p class="copy">
            Not affiliated with or endorsed by the Riot team. Colours and type
            sampled from <a class="hover:text-brand" href="https://riot.js.org/">https://riot.js.org/</a>,
            including its 62.5% root font-size and its em-based type scale.
            Running gclass-anims 1.0.0-beta.24 from npm with Riot 10.
          </p>
        </footer>
      </div>
    </div>
  </page>`,
)("page");

initAnimations();

// One delegated handler on document covers every [data-copy] button, including
// any a Riot component renders later. The text is the sibling <code>.
document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-copy]");
  if (!btn) return;

  const code = btn.parentElement.querySelector("code");
  if (!code) return;

  const done = (label) => {
    btn.textContent = label;
    btn.classList.add("text-ok");
    setTimeout(() => {
      btn.textContent = "Copy";
      btn.classList.remove("text-ok");
    }, 1400);
  };

  navigator.clipboard
    .writeText(code.innerText)
    .then(() => done("Copied"), () => done("Failed"));
});

console.log("gclass-anims 1.0.0-beta.24 initialised (riot 10)");