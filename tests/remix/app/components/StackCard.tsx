import { useState } from "react";

import { useCopyCommand } from "../hooks/useCopyCommand";

type Example = {
  id: string;
  label: string;
  title: string;
  body: string;
  file: string;
  code: string;
};

type Category = {
  id: string;
  label: string;
  title: string;
  body: string;
  examples: Example[];
};

/**
 * The stack card.
 *
 * Two nested tablists, exactly as in the reference: an outer row picks a layer
 * of the stack (Server, Data, Auth, …) and an inner row picks an example within
 * it. Only the selected panel is mounted — the reference ships every panel in
 * the DOM with `hidden`, but the panels here are cheap enough that unmounting
 * the inactive ones is simpler and avoids four idle tabpanels being announced.
 *
 * Selection is internal state rather than a URL segment: the reference does not
 * put the tab in the address bar either.
 */
const CATEGORIES: Category[] = [
  {
    id: "init",
    label: "Init",
    title: "One call, and the class attribute does the rest",
    body: "gclass-anims has no per-element wiring and no config file. Init it once and behaviour lives in the markup: add a utility class to an element and it animates. A MutationObserver watches the document, so anything rendered after the first call is picked up too.",
    examples: [
      {
        id: "once",
        label: "Once",
        title: "Call it when the DOM is ready",
        body: "The only required step. From here the observer discovers elements as they appear, so a list that re-renders needs no second call.",
        file: "app/root.tsx",
        code: `import { useEffect } from 'react'
import { initAnimations } from 'gclass-anims'

export default function App() {
  useEffect(() => {
    initAnimations()
  }, [])

  return <Outlet />
}`,
      },
      {
        id: "navigation",
        label: "Navigation",
        title: "Re-init on client navigation",
        body: "Remix replaces the DOM on a client-side route change without a reload, so the engine is initialised per pathname rather than once per page load.",
        file: "app/root.tsx",
        code: `import { useLocation } from '@remix-run/react'
import { useEffect } from 'react'
import { initAnimations } from 'gclass-anims'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    initAnimations()
  }, [location.pathname])

  return <Outlet />
}`,
      },
      {
        id: "teardown",
        label: "Teardown",
        title: "It hands the teardown back",
        body: "initAnimations returns a function that removes every listener and trigger it registered. Useful in a component that mounts more than once.",
        file: "app/component.tsx",
        code: `useEffect(() => {
  const dispose = initAnimations()
  return dispose
}, [])`,
      },
    ],
  },
  {
    id: "spawn",
    label: "Spawn",
    title: "Forty-five entrances, named by direction",
    body: "Every entrance is a class. spawn-* slides in from an edge, expand-* scales a single axis, clip-reveal-* wipes through an inset, and draw, typewriter, scramble and count handle text and SVG strokes.",
    examples: [
      {
        id: "direction",
        label: "Direction",
        title: "spawn-* slides, expand-* scales",
        body: "Direction is the class name rather than an argument. spawn-up enters from below, spawn-left from the left; expand-vertical collapses on the Y axis.",
        file: "index.html",
        code: `<div class="spawn-up">from below</div>
<div class="spawn-left">from the left</div>
<div class="spawn-fade">opacity only</div>
<div class="spawn-blur">out of a blur</div>
<div class="expand-vertical">collapses on Y</div>
<div class="expand-all">collapses on both</div>`,
      },
      {
        id: "three-d",
        label: "3D",
        title: "Rotating entrances",
        body: "The x/y variants scale from zero while rotating around one axis, which reads as a 3D object turning into place.",
        file: "index.html",
        code: `<div class="spawn-x-up">rotates on X</div>
<div class="spawn-y-left">rotates on Y</div>
<div class="spawn-cw">spins clockwise</div>
<div class="spawn-ccw">spins counter-clockwise</div>`,
      },
      {
        id: "clip",
        label: "Clip",
        title: "Wipes through an inset",
        body: "clip-reveal animates a CSS clip-path inset, so the reveal has hard edges instead of fading. curtain-* opens from the centre outward.",
        file: "index.html",
        code: `<div class="clip-reveal-up">wipes upward</div>
<div class="clip-reveal-left">wipes left</div>
<div class="clip-reveal">default wipe</div>
<div class="curtain-horizontal">opens from the middle</div>`,
      },
      {
        id: "text",
        label: "Text",
        title: "Type, scramble and count",
        body: "Text gets its own entrances. typewriter-split handles the string per character, scramble resolves glyphs out of noise, and count animates a number up.",
        file: "index.html",
        code: `<p class="typewriter">types out</p>
<p class="typewriter-split">per character</p>
<p class="scramble">resolves from noise</p>
<p class="scramble-all">every glyph at once</p>
<span class="count" data-to="1240">0</span>`,
      },
      {
        id: "draw",
        label: "Draw",
        title: "Tracing an SVG stroke",
        body: "draw animates stroke-dashoffset so a path draws itself. draw-split does it per subpath, which suits an icon with separate strokes.",
        file: "index.html",
        code: `<svg class="draw" viewBox="0 0 24 24">
  <path d="M4 12h16M12 4v16" />
</svg>

<svg class="draw-split" viewBox="0 0 24 24">
  <path d="M4 12h16" />
  <path d="M12 4v16" />
</svg>`,
      },
    ],
  },
  {
    id: "loops",
    label: "Loops",
    title: "Motion that runs until told otherwise",
    body: "A loop needs no trigger. The class is the entire instruction — it starts on init and repeats forever, leaving and re-entering the viewport has no effect on it.",
    examples: [
      {
        id: "ambient",
        label: "Ambient",
        title: "float, pulse, radiate",
        body: "The ambient set: a slow drift, a scale pulse, or a ring expanding outward from the element.",
        file: "index.html",
        code: `<div class="float">drifts</div>
<div class="pulse">scales in and out</div>
<div class="radiate">ring expands outward</div>
<div class="bell">swings like a bell</div>`,
      },
      {
        id: "impact",
        label: "Impact",
        title: "shake, bounce, spin",
        body: "Impact loops for attention rather than ambience. The spin pair is directional; shake is randomised.",
        file: "index.html",
        code: `<button class="shake">shakes</button>
<div class="bounce">bounces</div>
<div class="spin-cw">clockwise</div>
<div class="spin-ccw">counter-clockwise</div>`,
      },
      {
        id: "marquee",
        label: "Marquee",
        title: "Continuous travel in four directions",
        body: "marquee-* translates the element indefinitely. It is meant for content wider or taller than its frame.",
        file: "index.html",
        code: `<div class="marquee-right"><span>scrolling ticker →</span></div>
<div class="marquee-left"><span>← scrolling ticker</span></div>
<div class="marquee-up">…</div>
<div class="marquee-down">…</div>`,
      },
    ],
  },
  {
    id: "triggers",
    label: "Triggers",
    title: "A behaviour says what, a trigger says when",
    body: "They compose on the same element in any order. scroll and appear fire once when the element enters the viewport, hover and click answer the pointer, and magnet pulls the element toward it.",
    examples: [
      {
        id: "scroll",
        label: "Scroll",
        title: "Fires once on entry",
        body: "scroll wires the entrance to the viewport. progressStart and progressEnd tune the line at which the trigger counts as reached.",
        file: "index.html",
        code: `<div class="spawn-up scroll">enters from below, once</div>
<div class="scroll-progress">tied to scroll position</div>
<div class="pin scroll">pinned while in view</div>

<!-- move the trigger line -->
<div class="scroll" data-progress-start="top bottom"></div>`,
      },
      {
        id: "appear",
        label: "Appear",
        title: "On mount, rather than on scroll",
        body: "appear plays as soon as the element exists, which is what you want for content already in view on first paint.",
        file: "index.html",
        code: `<div class="spawn-fade appear">plays on mount</div>
<div class="appear">with no entrance of its own</div>
<div class="leave">animates out on removal</div>`,
      },
      {
        id: "pointer",
        label: "Pointer",
        title: "hover, click and expand",
        body: "hover scales on entry, click is a discrete press, and click-expand grows the element away from the cursor.",
        file: "index.html",
        code: `<button class="hover">scales on hover</button>
<button class="click">presses</button>
<button class="click-expand">grows from the cursor</button>`,
      },
      {
        id: "magnet",
        label: "Magnet",
        title: "Pulled toward the pointer",
        body: "magnet translates the element after the cursor. magnet3d does the same and additionally tilts it so the face tracks the pointer — including when the element moves to a different place in the layout.",
        file: "index.html",
        code: `<button class="magnet">follows the cursor</button>
<button class="magnet3d">tilts to face it</button>

<!-- tuned per element -->
<div class="magnet3d amount-0.15 mgrow-1.05 mtilt-8 mtime-0.6"></div>`,
      },
      {
        id: "flip",
        label: "Flip",
        title: "Morph between two layouts",
        body: "flip captures an element's resting bounds and, when its layout changes, inverts the difference and plays it back. One element, moved between two positions, animates between them.",
        file: "app/header.tsx",
        code: `// the node persists; only its position in the layout changes
<header>
  <Link className="flip">
    <img src={logo} />
  </Link>
</header>`,
      },
    ],
  },
  {
    id: "tunables",
    label: "Tunables",
    title: "Adjusted from the class attribute",
    body: "Tunables are prefixes, not config. time-, delay-, priority- and ease- apply to nearly everything; the magnet family adds its own set.",
    examples: [
      {
        id: "timing",
        label: "Timing",
        title: "time-, delay-, stagger-",
        body: "time- sets the duration in seconds. delay- offsets the start. stagger- spreads children out by index instead of by hand.",
        file: "index.html",
        code: `<div class="spawn-up time-1-5">1.5 seconds</div>
<div class="spawn-up delay-0-3">starts a beat late</div>

<ul>
  <!-- each child offset from the one before -->
  <li class="spawn-up stagger-0-05">one</li>
  <li class="spawn-up stagger-0-05">two</li>
  <li class="spawn-up stagger-0-05">three</li>
</ul>`,
      },
      {
        id: "ease",
        label: "Ease",
        title: "ease- takes a GSAP ease",
        body: "The value after ease- is passed to GSAP, so the whole set is available — back, elastic, expo, power1 through power4, circ, sine, steps.",
        file: "index.html",
        code: `<div class="spawn-up ease-back">overshoots and settles</div>
<div class="spawn-up ease-expo">fast start</div>
<div class="spawn-up ease-elastic">springy</div>
<div class="spawn-up ease-none">linear</div>`,
      },
      {
        id: "priority",
        label: "Priority",
        title: "priority- settles ties",
        body: "Elements that animate together default to a fixed stagger. priority- overrides it for one element so it lands first or last.",
        file: "index.html",
        code: `<div class="spawn-up order priority-3">lands first</div>
<div class="spawn-up order priority-1">then this</div>
<div class="spawn-up order">default slot</div>`,
      },
      {
        id: "magnet-tuning",
        label: "Magnet tuning",
        title: "amount-, mtime-, mgrow-, mtilt-",
        body: "The magnet prefix set: how far it follows, how quickly it catches up, how much it grows, and how far it tilts.",
        file: "index.html",
        code: `<div class="magnet3d amount-0-4 mtilt-20">pulls hard, tilts far</div>
<div class="magnet amount-0-1 mgrow-1-02">barely moves</div>`,
      },
    ],
  },
  {
    id: "envs",
    label: "Environments",
    title: "The same classes in every framework",
    body: "The class names are identical everywhere. Only the init call differs, because that is the one thing each framework has to tell you.",
    examples: [
      {
        id: "react",
        label: "React",
        title: "Init once on mount",
        body: "The engine finds elements itself, so a re-render never needs a re-init.",
        file: "app/root.tsx",
        code: `import { useEffect } from 'react'
import { initAnimations } from 'gclass-anims'

export default function App() {
  useEffect(() => { initAnimations() }, [])
  return <Outlet />
}`,
      },
      {
        id: "vue",
        label: "Vue",
        title: "onMounted",
        body: "Identical from here on — the markup carries the same classes.",
        file: "main.js",
        code: `import { onMounted } from 'vue'
import { initAnimations } from 'gclass-anims'

onMounted(() => initAnimations())`,
      },
      {
        id: "svelte",
        label: "Svelte",
        title: "onMount",
        body: "The one-liner, for the framework where init is genuinely one line.",
        file: "+layout.svelte",
        code: `import { onMount } from 'svelte'
import { initAnimations } from 'gclass-anims'

onMount(() => initAnimations())`,
      },
      {
        id: "remix",
        label: "Remix",
        title: "Per pathname",
        body: "The only environment that needs more than one line, because it swaps the DOM on client navigation without a reload.",
        file: "app/root.tsx",
        code: `const location = useLocation()
useEffect(() => { initAnimations() }, [location.pathname])`,
      },
      {
        id: "static",
        label: "No framework",
        title: "One script tag",
        body: "Plain HTML works too. The observer covers everything the page renders afterwards.",
        file: "index.html",
        code: `<script type="module">
  import { initAnimations } from 'gclass-anims'
  initAnimations()
</script>

<div class="spawn-up scroll">…</div>`,
      },
    ],
  },
  {
    id: "config",
    label: "Config",
    title: "Engine defaults, and opting out",
    body: "gclassOpts changes the defaults the whole engine builds from. toggleAnimations persists a reader's choice. .reduced opts a single element out when the OS asks for less motion.",
    examples: [
      {
        id: "opts",
        label: "Defaults",
        title: "gclassOpts",
        body: "Durations, the stagger divisor, the default ease and the scroll trigger line are all settable before init.",
        file: "app/root.tsx",
        code: `import { gclassOpts, initAnimations } from 'gclass-anims'

gclassOpts({
  effectDuration: 0.8,
  orderDivide: 4,
  ease: 'expo',
  progressStart: 'top bottom',
})

initAnimations()`,
      },
      {
        id: "toggle",
        label: "Toggle",
        title: "A persisted opt-out",
        body: "toggleAnimations writes the choice to localStorage and reloads, so a reader who turns motion off keeps it off across visits.",
        file: "app/settings.tsx",
        code: `import { toggleAnimations } from 'gclass-anims'

<button onClick={() => toggleAnimations()}>
  Reduce motion
</button>`,
      },
      {
        id: "reduced",
        label: "Reduced",
        title: "Opting one element out",
        body: "With the OS preference set, .reduced leaves that element alone — no spawn, no loop, no pointer response — while the rest of the page still animates.",
        file: "index.html",
        code: `<!-- nothing animates on this one, whatever it is doing -->
<div class="spawn-up scroll reduced">…</div>`,
      },
      {
        id: "preserve",
        label: "Preserve",
        title: "Keeping something still",
        body: "An element that survives a route change would otherwise re-animate on the way back in. preserve keeps its rendered state, and applies to descendants too.",
        file: "app/layout.tsx",
        code: `<div class="preserve">
  {/* survives navigation without replaying its entrance */}
</div>`,
      },
    ],
  },
];
export function StackCard() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [example, setExample] = useState(CATEGORIES[0].examples[0]);
  // Drives the button's own label. There is no gclass copy behaviour in this
  // build — the `data-copy` attributes that used to sit on these buttons are
  // inert, and nothing else was going to tell the reader the copy landed.
  const [copied, setCopied] = useState(false);
  const copy = useCopyCommand();

  function pickCategory(next: Category) {
    setCategory(next);
    setExample(next.examples[0]);
  }

  return (
    <div className="rx-card" data-home-card>
      <div role="tablist" aria-label="gclass-anims API groups" id="api" className="rx-card__tabs">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            role="tab"
            type="button"
            aria-selected={c.id === category.id}
            data-state={c.id === category.id ? "active" : "inactive"}
            tabIndex={c.id === category.id ? 0 : -1}
            className="rx-card__tab"
            onClick={() => pickCategory(c)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const i = CATEGORIES.indexOf(c);
              const next = CATEGORIES[(i + (e.key === "ArrowRight" ? 1 : CATEGORIES.length - 1)) % CATEGORIES.length];
              pickCategory(next);
              document.getElementById(`tab-${next.id}`)?.focus();
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="rx-card__panel" role="tabpanel">
        <div className="rx-card__examples" role="tablist" aria-label={`${category.label} examples`}>
          {category.examples.map((ex) => (
            <button
              key={ex.id}
              role="tab"
              type="button"
              aria-selected={ex.id === example.id}
              data-state={ex.id === example.id ? "active" : "inactive"}
              tabIndex={ex.id === example.id ? 0 : -1}
              className="rx-pill"
              onClick={() => setExample(ex)}
            >
              {ex.label}
            </button>
          ))}
        </div>

        <div className="rx-card__body">
          <div className="rx-card__intro">
            <h3 className="rx-card__title">{category.title}</h3>
            <p className="rx-card__lede">{category.body}</p>
          </div>

          <div className="rx-example">
            <div className="rx-example__prose">
              <strong>{example.title}</strong>
              <span>{example.body}</span>
            </div>

            <div className="rx-code">
              <div className="rx-code__head">
                <span className="rx-code__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="rx-code__file">{example.file}</span>
              </div>
              <pre>
                <code>{highlight(example.code)}</code>
              </pre>
              <button
                type="button"
                className="rx-code__copy"
                aria-label={`Copy ${example.file}`}
                onClick={() => copy(example.code, setCopied)}
              >
                {copied ? "Copied" : "Copy"}
              </button>
              {/* The label swap is the visible feedback; this is the announced
                  one, for a reader who never sees the button change. */}
              <span role="status" aria-live="polite" className="sr-only">
                {copied ? `${example.file} copied` : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal syntax colouring for the snippet.
 *
 * Not a parser — it matches keywords, strings, comments and numbers in one pass
 * over an already-escaped string and wraps them in spans. Rendering the result
 * with dangerouslySetInnerHTML is safe here only because every token is
 * emitted through React's escaping: the text is split on matches and each piece
 * becomes a child, never a raw HTML string.
 */
function highlight(code: string) {
  const parts = code.split(/(\s+|\b(?:import|from|let|const|export|return|await|async|function|new|throw|if|else|typeof|satisfies)\b|"[^"\n]*"|'[^'\n]*'|\/\/[^\n]*|\b\d+\b)/g);

  return parts.map((part, i) => {
    if (!part.trim()) return part;
    let cls: string | undefined;
    if (/^(import|from|let|const|export|return|await|async|function|new|throw|if|else|typeof|satisfies)$/.test(part)) {
      cls = "tok-kw";
    } else if (/^["']/.test(part)) {
      cls = "tok-str";
    } else if (part.startsWith("//")) {
      cls = "tok-com";
    } else if (/^\d+$/.test(part)) {
      cls = "tok-num";
    }
    return cls ? (
      <span key={i} className={cls}>
        {part}
      </span>
    ) : (
      part
    );
  });
}