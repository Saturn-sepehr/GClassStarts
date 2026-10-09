import { useEffect, useRef, useState } from "react";

/**
 * Whether the hero has been scrolled past.
 *
 * The wordmark is one element, not two. It starts centred over the hero and
 * travels up into the fixed header once the hero has gone by, which is a
 * different DOM position for the same node — the condition gclass-anims' `.flip`
 * needs in order to morph it rather than snap it.
 *
 * Hysteretic, not a bare threshold. The trigger is the hero's bottom edge
 * crossing the middle of the viewport, and the logo travels between two very
 * different sizes at that moment; a single threshold would fire repeatedly for a
 * reader hovering either side of it, which is exactly when they are scrolling
 * back and forth. So it switches on when the bottom edge rises past half the
 * viewport, and only switches back once it has dropped past three quarters. The
 * gap between those two lines is the dead zone.
 */
export function useHeroPassed(ref: React.RefObject<HTMLElement | null>): boolean {
  const [passed, setPassed] = useState(false);

  /**
   * Mirrors `passed` for the scroll handler to read.
   *
   * The effect registers its listeners once, so reading `passed` directly would
   * close over the value from first mount and the "switch back" branch would
   * never be reachable — the logo could only ever leave the hero.
   */
  const current = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const h = window.innerHeight;
      const bottom = el.getBoundingClientRect().bottom;
      const next = current.current ? bottom < h * 0.75 : bottom < h * 0.5;
      // Guarded so a scroll that does not cross a threshold costs no render.
      if (next === current.current) return;
      current.current = next;
      setPassed(next);
    };

    // Coalesced to one update per frame: scroll fires far more often than the
    // display can paint.
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);

  return passed;
}