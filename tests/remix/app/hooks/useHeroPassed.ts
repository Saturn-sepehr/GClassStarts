import { useEffect, useRef, useState } from "react";

/**
 * How far the page must scroll before the logo leaves the hero.
 *
 * Deliberately tiny. The old trigger was the hero's bottom edge crossing half
 * the viewport, which meant a full half-screen of scrolling before anything
 * moved — the logo sat dead centre of the hero and then, long after the page
 * had clearly committed to moving, snapped upward. A few pixels is enough to
 * read as intent: any downward input at all reads as "I am scrolling".
 */
const ENTER = 8;

/**
 * How far it must scroll back before the logo returns.
 *
 * Below ENTER, so the dead zone between the two lines stops a wheel notch or a
 * trackpad's momentum from bouncing the logo across the header and back. Half
 * the gap that ENTER opens up is enough for the morph to settle.
 */
const EXIT = 4;

/**
 * Whether the hero has been scrolled past.
 *
 * The wordmark is one element, not two. It starts centred over the hero and
 * travels up into the fixed header once the hero has gone by, which is a
 * different DOM position for the same node — the condition gclass-anims' `.flip`
 * needs in order to morph it rather than snap it.
 *
 * Measured off the scroll offset rather than the hero's geometry, so the hero
 * never gets to weigh in. `scrollY` is the reader's own input, one to one: no
 * viewport-height multiplier, no dependence on how tall the hero happened to
 * render, and the logo responds to the first pixel instead of the halfway mark.
 * Both thresholds are read-only here; no layout is read per frame.
 */
export function useHeroPassed(): boolean {
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
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const next = current.current ? y > EXIT : y > ENTER;
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
  }, []);

  return passed;
}