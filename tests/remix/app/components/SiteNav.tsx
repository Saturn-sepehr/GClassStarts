import { Link } from "@remix-run/react";

import logo from "../logo.svg?url";

/**
 * The fixed top bar: the wordmark on the left, keyboard-shortcut pills on the
 * right.
 *
 * There is one logo, not two. It starts centred over the hero and travels up
 * into this bar once the hero has been scrolled past, so `state` decides where
 * it sits: the same element is styled into the hero, then into the header.
 *
 * The `slot` span is the mechanism, not decoration. gclass-anims' `.flip` morph
 * is driven by a MutationObserver watching `childList` — *not* attributes — and
 * it only re-checks `.flip` elements inside the container whose children
 * changed. Adding or removing this span is that change, and it is why the logo
 * glides between the two positions instead of jumping: the node persists, so
 * gclass still holds the bounds it captured back in the hero.
 *
 * Drop the span and the logo would still move, just without the transition.
 * Put `flip` on the span instead of the img and there would be nothing to morph,
 * since the img is what moves.
 */
export function SiteNav({ state = "header", wordmark = "REMIX + GCLASS" }: { state?: "hero" | "header"; wordmark?: string }) {
  return (
    <header className="rx-nav" data-state={state}>
      <Link to="/" className="rx-nav__brand" aria-label={`${wordmark} home`}>
        {state === "header" ? <span className="rx-nav__brand-slot" aria-hidden="true" /> : null}
        <img className="rx-logo__img flip ease-expo spawn-down" src={logo} alt="" draggable={false} />
      </Link>

      <nav className="rx-nav__links" aria-label="Main">
        {LINKS.map(([key, label, path, href]) => {
          const body = (
            <>
              <kbd className="rx-nav__key">{key}</kbd>
              {label}
            </>
          );
          if (path) {
            return (
              <Link key={label} className="rx-nav__pill" to={path}>
                {body}
              </Link>
            );
          }
          return href?.startsWith("http") ? (
            <a key={label} className="rx-nav__pill" href={href} target="_blank" rel="noreferrer">
              {body}
            </a>
          ) : (
            <a key={label} className="rx-nav__pill" href={href ?? "#"}>
              {body}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

/**
 * The `path` links go through Remix's <Link> so navigation is client-side and
 * the root's `useEffect` re-runs initAnimations  () without a reload. `href`
 * links are plain anchors, used for the external destinations.
 */
const LINKS = [
  ["G", "Back to docs", null, "https://saturn-sepehr.github.io/GClass/documentation/quick-start/"],
  ["A", "Api", null, "#fully-stacked"],
  ["I", "Install", null, "#install"],
  ["Q", "Quick start", null, "#quick-start"],
  ["C", "Class anatomy", null, "#anatomy"],
  ["N", "Notes", null, "#notes"],

] as const;