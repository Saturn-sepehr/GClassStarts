export const DOCS_URL = "https://saturn-sepehr.github.io/GClass/documentation/quick-start/";
export const PACKAGE_URL = "https://www.npmjs.com/package/gclass-anims";
export const REPO_URL = "https://github.com/Saturn-sepehr/GClass";

/* Nav menus. vuejs.org's real groups (Docs, Playground, Ecosystem, About,
   Support) are kept as flyouts, but every item points at a section of this
   page or the real GClass docs. */
export const NAV = [
  {
    label: "Docs",
    items: [
      ["Install", "#install"],
      ["Quick start", "#quick-start"],
      ["Class anatomy", "#anatomy"],
      ["Full documentation", DOCS_URL],
    ],
  },
  {
    label: "Playground",
    items: [
      ["Try it in your app", "#quick-start"],
      ["Behaviour + trigger + tunables", "#anatomy"],
    ],
  },
  {
    label: "Ecosystem",
    items: [
      ["32 environments, one engine", "#notes"],
      ["Source on GitHub", REPO_URL],
      ["gclass-anims on npm", PACKAGE_URL],
    ],
  },
  {
    label: "About",
    items: [
      ["What this page is", "#notes"],
      ["Not affiliated with Vue", "#notes"],
    ],
  },
  {
    label: "Support",
    items: [
      ["Return to docs", DOCS_URL],
      ["Report an issue", REPO_URL],
    ],
  },
];

/* The sitemap columns under the sponsors, mirroring vuejs.org's five. */
export const SITEMAP = [
  {
    title: "Docs",
    links: [
      ["Install", "#install"],
      ["Quick start", "#quick-start"],
      ["Class anatomy", "#anatomy"],
      ["Full documentation", DOCS_URL],
    ],
  },
  {
    title: "Behaviours",
    links: [
      ["Spawn / expand", "#anatomy"],
      ["Typewriter + scramble", "#anatomy"],
      ["Float, marquee, pulse", "#anatomy"],
    ],
  },
  {
    title: "Triggers",
    links: [
      [".scroll", "#anatomy"],
      [".appear", "#anatomy"],
      [".preserve", "#anatomy"],
    ],
  },
  {
    title: "Tunables",
    links: [
      [".time-1", "#anatomy"],
      [".ease-back", "#anatomy"],
      [".priority-2", "#anatomy"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["gclass-anims on npm", PACKAGE_URL],
      ["Source on GitHub", REPO_URL],
      ["Official Vue website", "https://vuejs.org/"],
    ],
  },
];

/* The three highlight boxes: vuejs.org's titles, re-pointed at gclass. */
export const HIGHLIGHTS = [
  {
    title: "Declarative",
    body: "Add a class name and the element animates. Behaviour, trigger and tunables combine freely — order in class does not matter.",
  },
  {
    title: "Framework-agnostic",
    body: "One call to initAnimations() once the DOM is present, then a MutationObserver picks up every .appear and .scroll element that renders after.",
  },
  {
    title: "Zero-config",
    body: "GSAP is a plain dependency, dual ESM + CJS, tree-shakable with sideEffects: false. Nothing to configure, nothing to bundle twice.",
  },
];

/* Sponsor tiers. vuejs.org reserves these rows for logos; a parody keeps the
   slots and admits they are empty. */
export const SPONSORS = [
  { tier: "Platinum Sponsors", slots: 3 },
  { tier: "Gold Sponsors", slots: 3 },
];

export const SOCIALS = [
  { name: "github", href: REPO_URL },
  { name: "twitter", href: "https://x.com/vuejs" },
  { name: "discord", href: "https://discord.com/invite/vue" },
];

export const INSTALL = "npm install gclass-anims";

export const HOOK = `<script setup>
import { onMounted } from 'vue'
import { initAnimations } from 'gclass-anims'

onMounted(() => {
  initAnimations()
})
<\/script>`;

export const ANATOMY = `// behaviour + trigger + tunables
<div class="appear scroll spawn-up">…</div>
<div class="appear scroll order ease-expo time-1 priority-2">…</div>
<div class="float">loops forever</div>
<button class="magnet click-expand">magnet + click</button>`;

/* Vue 3's own class-style animation, shown for contrast — the point being that
   gclass needs no lifecycle hook per element. */
export const COMPARE = `<!-- Vue's built-in Transition -->
<Transition name="fade">
  <p v-if="shown">fades in</p>
</Transition>

<!-- gclass: no component, no hook, no JS -->
<div v-if="shown" class="appear scroll spawn-up">fades in</div>`;