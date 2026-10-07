import { lazy, Suspense } from "react";

/**
 * WebGL scenes behind React.lazy.
 *
 * three.js is ~600kB and neither scene is needed for first paint — the CSS
 * backdrop on .rx-bg stands in until the GL layer fades in. The lazy boundaries
 * keep the heavy chunk out of the route's entry bundle.
 */
export const LazyTrackScene = lazy(() => import("../gl/TrackScene").then((m) => ({ default: m.TrackScene })));

export const LazySprueScene = lazy(() => import("../gl/SprueScene").then((m) => ({ default: m.SprueScene })));

/** Renders `children` once the scene module resolves; nothing before that. */
export function Scene({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Suspense fallback={null}>
      <div className={className}>{children}</div>
    </Suspense>
  );
}