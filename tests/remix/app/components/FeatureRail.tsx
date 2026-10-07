import { useEffect, useRef, useState } from "react";

/**
 * The pinned feature rail.
 *
 * The pink bar beside the active row is a scroll indicator, not decoration: it
 * grows from the top of the list to the bottom as the page is scrolled, and the
 * active row is whichever section is currently in view. That is what the
 * reference's rail does, and it is the only way a reader can tell where they are
 * in a document this long.
 *
 * Progress is written to a CSS custom property rather than to React state. It
 * changes on every scroll frame, and re-rendering the rail at that rate would
 * put ~60 renders a second on a list that has no content dependency on the
 * scroll position. The one piece of state here is the active index, which only
 * changes when the reader crosses a section boundary.
 */
const SECTIONS = [
  { id: "top", label: "Fully stacked", value: "gclass-anims" },
  { id: "fully-stacked", label: "Single package", value: "Remix" },
  { id: "runner-kit", label: "Smaller mental model", value: "Class-driven" },
  { id: "docs", label: "Re-rethinking", value: "Class anatomy" },
  { id: "notes", label: "Humans + agents", value: "One call" },
  { id: "gallery", label: "Test drive", value: "initAnimations()" },
];

export function FeatureRail() {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      // Progress across the whole document: 0 at the top, 1 at the bottom.
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      rail.style.setProperty("--rx-progress", progress.toFixed(4));

      // The active row is the last section whose top has passed the fold.
      // Scanning the ids directly is cheaper and more predictable than
      // IntersectionObserver here, because the rail is short and the sections
      // are few.
      const line = window.innerHeight * 0.4;
      let index = 0;
      for (let i = 0; i < SECTIONS.length; i++) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= line) index = i;
      }
      setActive(index);
    };

    const onScroll = () => {
      // Coalesce to one update per frame: scroll fires far more often than the
      // display can paint.
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside className="rx-rail" aria-label="Feature highlights" ref={railRef}>
      <ul>
        {SECTIONS.map((s, i) => (
          <li key={s.id} className={i === active ? "is-active" : undefined}>
            <span className="rx-rail__label">{s.label}</span>
            <span className="rx-rail__value">{s.value}</span>
          </li>
        ))}
      </ul>
      {/* The bar itself. Height tracks --rx-progress, which the effect above
          writes once per frame; the transition is deliberately absent so the bar
          tracks the scroll exactly rather than easing behind it. */}
      <span className="rx-rail__bar" aria-hidden="true" />
    </aside>
  );
}