import { useEffect, useRef } from "react";

/**
 * Scroll driver for the fixed landscape backdrop.
 *
 * Returns a ref for the `.rx-bg` container. The layers themselves are written
 * out as markup in the route rather than mapped over an array here, because
 * each one carries its own aspect ratio and its own transform classes, and a
 * map over five near-identical entries is exactly the thing that makes those
 * per-layer differences hard to see and edit.
 *
 * Layer art rather than a canvas: each scene is one flat SVG that costs a paint
 * once and then composites, where a particle field redrawn per frame costs one
 * every frame, on the main thread, for the life of the page.
 */

/** Must match the number of `.rx-scene` layers in the route. */
const LAYER_COUNT = 5;

/**
 * Half-width of a layer's falloff, as a fraction of scrollable distance.
 *
 * Wider than a quarter so neighbours overlap and the change is a dissolve
 * rather than a cut; at a quarter exactly, each layer would reach zero just as
 * the next reaches full and the middle of every transition would go dark.
 */
const HALF_WIDTH = 0.3;

const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/** Hermite ramp, 0 at both ends of the unit interval and 1 in the middle. */
function smooth(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

/**
 * How visible the layer peaking at `centre` is, at global scroll progress `p`.
 *
 * Layers peak at even quarters of the document — the first at the top, the
 * last at the bottom — rather than each having its own on/off band. Bands are
 * fiddly and asymmetric: the first has to reach full opacity before the page
 * has scrolled at all and the last before the page runs out of scroll, so both
 * edge layers end up on bands that start or finish outside [0, 1] and get
 * unevenly paced. Peaks have no such problem.
 */
function visibility(p: number, centre: number) {
  return smooth((HALF_WIDTH - Math.abs(p - centre)) / HALF_WIDTH);
}

export function useBackdrop() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const layers = Array.from(el.querySelectorAll<HTMLElement>(".rx-scene"));
    let frame = 0;

    const update = () => {
      frame = 0;

      // Progress across the whole document: 0 at the top, 1 at the bottom.
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0;

      for (let i = 0; i < LAYER_COUNT; i++) {
        const v = visibility(p, i / (LAYER_COUNT - 1));
        el.style.setProperty(`--rx-scene-${i + 1}`, v.toFixed(4));

        // The glow is a pair of drop-shadow filters over a full-viewport layer,
        // and magnet3d re-composites on every mousemove. Only pay for the filter
        // on layers that are actually on screen — an opacity of 0 is not enough
        // to stop a filter being rasterised.
        const node = layers[i];
        if (node) node.classList.toggle("is-live", v > 0.004);
      }
    };

    // Coalesced to one update per frame: scroll fires far more often than the
    // display can paint.
    const onScroll = () => {
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

  return ref;
}