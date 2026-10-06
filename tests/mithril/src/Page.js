// Mithril's hyperscript: m() rather than JSX, and every element carries its
// class as a plain string. That is the framework's own idiom and it means the
// utility classes gclass-anims reads are written exactly as they would be in
// HTML.
import m from "mithril";
// Imported rather than written as a literal "/src/mithril.svg" string: Mithril
// builds elements with runtime function calls, so Vite never sees the path as a
// static asset reference and cannot rewrite it under the Pages base path. An
// import gives Vite something to resolve, and it rewrites the emitted URL.
import mithrilMark from "./mithril.svg";

// ── the live demo's state ────────────────────────────────────────────────────
// A module-level array plus m.redraw() is Mithril's own way of signalling
// "something changed". This is the only state the page has.
let rows = [];

function addRow() {
  rows = [...rows, rows.length + 1];
  m.redraw();
}

function resetRows() {
  rows = [];
  m.redraw();
}

// ── the page ─────────────────────────────────────────────────────────────────
// Mithril views are plain functions of a view-model. This one closes over the
// module state, which is idiomatic for a page with no routing.
export default {
  view() {
    return [
      // .scroll-progress is a modifier, not a behaviour: it sets no geometry of
      // its own, so the .gc-bar rule lives in styles.css.
      m("div.gc-bar.scroll-progress"),

      m("header", [
        m(
          "section.header-section",
          [
            m("h1", [
              m("img", {
                src: mithrilMark,
                width: 20,
                height: 20,
                alt: "Mithril",
              }),
              "Mithril",
              m("span.text-sm.text-muted", " v2.3.8"),
            ]),
            m(
              "nav.nav.flex.flex-wrap",
              [
                m("a", { href: "#install" }, "Install"),
                m("a", { href: "#quick-start" }, "Quick start"),
                m("a", { href: "#anatomy" }, "Class anatomy"),
                m("a", { href: "#notes" }, "Notes"),
              ],
              "0 0 0 10px",
            ),
          ],
        ),
      ]),

      m("main", [
        m("div.body", [
          m("section.py-6", [
            m("p.m-0.mb-3.font-mono.text-sm", [
              m("a", { href: "https://mithril.js.org/" }, "https://mithril.js.org/"),
            ]),
            m(
              "h1.mt-0.text-3xl",
              "gclass-anims for Mithril.js",
            ),
            m(
              "p",
              { class: "scroll typewriter time-2" },
              "Mithril renders with hyperscript and re-renders by diffing its own virtual DOM. gclass-anims animates whatever markup ends up in the document, so call initAnimations() once after m.mount() and the two never interact again.",
            ),
            m(
              "a.inline-block.mt-4.px-5.py-3.text-sm.font-medium.text-white.click-expand.compatibility.amount-4",
              {
                href: "#install",
                style: {
                  background: "var(--color-brand)",
                  textDecoration: "none",
                },
              },
              "Get started",
            ),
          ]),

          m("section#install", { class: "scroll-mt-24" }, [
            m("h2.anchor", "Install"),
            m(
              "p.scroll.typewriter",
              { style: { marginTop: "45px" } },
              "GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed automatically - nothing is bundled or redistributed. Mithril is a peer of this page, not a dependency of the library.",
            ),
            m(
              "pre.scroll.spawn-down",
              { style: { marginTop: "20px" } },
              [
                m("code", "npm install gclass-anims mithril"),
                m("button.data-copy", {
                  type: "button",
                  "aria-label": "Copy code",
                  style: {
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    padding: "2px 8px",
                    fontSize: "11px",
                    fontFamily: "var(--font-body)",
                    background: "var(--color-page)",
                    border: "1px solid var(--color-line)",
                    cursor: "pointer",
                  },
                }, "Copy"),
              ],
            ),
          ]),

          m("section#quick-start", { class: "scroll-mt-24" }, [
            m("h2.anchor", "Quick start"),
            m(
              "p.scroll.typewriter",
              { style: { marginTop: "45px" } },
              "Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a utility class to an element and it animates - no per-element JS, no config files.",
            ),

            m("h3.anchor", "One call, after m.mount"),
            m("pre.scroll.spawn-down", m("code", [
              "// main.js",
              "import m from 'mithril'",
              "import { initAnimations } from 'gclass-anims'",
              "",
              "m.mount(document.getElementById('app'), Page)",
              "",
              "initAnimations()",
            ].join("\n"))),

            m("h3.anchor", "Live - rows from m.redraw()"),
            m(
              "p.scroll.typewriter",
              { style: { marginTop: "45px" } },
              "Nothing re-initialises after this point. The button reassigns the array and calls m.redraw(); Mithril's diff inserts real nodes; each one plays its entrance because the engine is watching for insertions.",
            ),

            m("div.mt-6", [
              m(
                "div.flex.flex-wrap.items-center.gap-3",
                { style: { margin: "0" } },
                [
                  m(
                    "button.px-4.py-2.text-sm.font-medium.text-white.click-hover.amount-2",
                    {
                      type: "button",
                      style: {
                        background: "var(--color-brand)",
                        border: 0,
                        cursor: "pointer",
                      },
                      onclick: addRow,
                    },
                    "Add a row",
                  ),
                  m(
                    "button.px-4.py-2.text-sm.font-medium.click-hover.amount-2",
                    {
                      type: "button",
                      style: {
                        background: "var(--color-page)",
                        border: "1px solid var(--color-line)",
                        cursor: "pointer",
                      },
                      onclick: resetRows,
                    },
                    "Reset",
                  ),
                  m("span.font-mono.text-sm.text-muted", `${rows.length} rows`),
                ],
              ),

              m(
                "div.grid.gap-2",
                { style: { margin: "20px 0 0 0" } },
                rows.map((row) =>
                  m(
                    "div.appear.spawn-up.time-1.px-4.py-3.font-mono.text-sm",
                    {
                      style: { background: "#fff", border: "1px solid var(--color-line)" },
                    },
                    `row ${row} — inserted by a Mithril redraw`,
                  ),
                ),
              ),
            ]),

            m("pre.scroll.spawn-down", m("code", [
              "let rows = []",
              "",
              "function addRow() {",
              "  rows = [...rows, rows.length + 1]",
              "  m.redraw()",
              "}",
              "",
              "rows.map((row) =>",
              "  m('div.appear.spawn-up', `row ${row}`))",
            ].join("\n"))),
          ]),

          m("section#anatomy", { class: "scroll-mt-24" }, [
            m("h2.anchor", "Class anatomy"),
            m(
              "p.scroll.typewriter-split.letter",
              { style: { marginTop: "45px" } },
              "Class anatomy: behaviour (.spawn-up) + trigger (.scroll, .appear) + tunables (.time-1, .ease-back, .priority-2). Combine freely - order in class does not matter.",
            ),
            m("pre.scroll.spawn-down", m("code", [
              "<!-- behaviour + trigger + tunables -->",
              '<div class="appear scroll spawn-up">…</div>',
              '<div class="appear scroll order ease-expo time-1 priority-2">…</div>',
              '<div class="float">loops forever</div>',
              '<button class="magnet click-expand">magnet + click</button>',
            ].join("\n"))),

            m(
              "table",
              { style: { marginTop: "45px" } },
              [
                m("thead", [
                  m("tr", [m("th", "Piece"), m("th", "Classes")]),
                ]),
                m("tbody", [
                  m("tr.scroll.spawn-down.order.priority-2", [
                    m("td", [m("strong", "Behaviour")]),
                    m("td", m("code", "spawn-up, float, marquee, magnet")),
                  ]),
                  m("tr.scroll.spawn-down.order.priority-3", [
                    m("td", [m("strong", "Trigger")]),
                    m("td", m("code", "appear, scroll, preserve")),
                  ]),
                  m("tr.scroll.spawn-down.order.priority-4", [
                    m("td", [m("strong", "Tunables")]),
                    m("td", m("code", "order, ease-expo, time-1, priority-2")),
                  ]),
                ]),
              ],
            ),
          ]),

          m("section#notes", { class: "scroll-mt-24" }, [
            m("h2.anchor", "Notes"),
            m(
              "ul.grid.gap-3",
              { style: { margin: "45px 0 0 0", padding: 0, listStyle: "none" } },
              [
                m(
                  "li.scroll.spawn-down.order.priority-2.border.border-line.p-4",
                  [
                    m("strong", "Redraw is not remount."),
                    " Mithril diffs its own virtual DOM, so re-rendering leaves untouched nodes alone. Re-initialising on every redraw would be wrong here — it is only right in frameworks that throw the subtree away.",
                  ],
                ),
                m(
                  "li.scroll.spawn-down.order.priority-3.border.border-line.p-4",
                  [
                    m("strong", "Hyperscript, not JSX."),
                    " Every element above is built with m(). The utility classes are written exactly as they would be in HTML, because gclass-anims reads the class attribute and nothing else.",
                  ],
                ),
                m(
                  "li.scroll.spawn-down.order.priority-4.border.border-line.p-4",
                  [
                    m("strong", "GSAP stays external."),
                    " ESM is dist/gclass.esm.js and CJS is dist/gclass.cjs - GSAP is external, not bundled, and the build is tree-shakable with sideEffects: false.",
                  ],
                ),
              ],
            ),
          ]),

          m("footer.footer.mt-10", [
            m(
              "p",
              "Not affiliated with or endorsed by the Mithril team. Colours and type sampled from ",
              m("a", { href: "https://mithril.js.org/" }, "https://mithril.js.org/"),
              ", including its fixed 250px sidebar, its Open Sans type and its 3px blue rule on every code block.",
            ),
            m("p", `Running gclass-anims 1.0.0-beta.24 from npm with Mithril ${m.version}.`),
          ]),
        ]),
      ]),
    ];
  },
};