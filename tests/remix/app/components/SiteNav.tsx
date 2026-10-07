import { Link } from "@remix-run/react";

/**
 * The `path` links go through Remix's <Link> so navigation is client-side and
 * the root's `useEffect` re-runs initAnimations() without a reload. `href`
 * links are plain anchors, used for the external destinations.
 */
const LINKS = [
  ["G", "Guides", null, "#fully-stacked"],
  ["A", "Api", null, "#api"],
  ["H", "Github", null, "https://github.com/Saturn-sepehr/GClass"],
  ["B", "Blog", null, "#blog"],
  ["N", "Newsletter", null, "#newsletter"],
  ["J", "Jam", null, "#jam"],
  ["S", "Store", null, "#store"],
] as const;

/**
 * The fixed top bar: wordmark on the left, keyboard-shortcut pills on the right.
 *
 * The wordmark is set as type rather than drawn as paths. remix.run's own mark is
 * a custom cut of a geometric grotesque, and reproducing it as hand-authored SVG
 * path data produces shapes that are not the mark — the letters distort the
 * moment the viewBox is rescaled. Type stays correct at every size, and the
 * reference's landing hero is set in type too.
 */
export function SiteNav({ wordmark = "REMIX + GCLASS" }: { wordmark?: string }) {
  return (
    <header className="rx-nav">
      <Link to="/" className="rx-nav__brand" aria-label={`${wordmark} home`}>
        <span className="rx-logo">
          <span className="rx-logo__remix">REMIX</span>
          <span className="rx-logo__plus">+</span>
          <span className="rx-logo__gclass">GCLASS</span>
        </span>
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