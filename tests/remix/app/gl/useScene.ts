import { useEffect, useRef } from "react";
import * as THREE from "three";

export type SceneTick = (state: { elapsed: number; delta: number }) => void;

export type SceneSetup = (args: {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  size: { width: number; height: number };
}) => SceneTick;

export type SceneOptions = {
  /** Renderer pixel ratio ceiling. 2 is plenty for a point cloud. */
  dpr?: number;
};

/**
 * Owns a WebGL renderer and rebuilds the scene graph when `deps` change.
 *
 * The renderer and its animation loop live for the whole mount; the *contents*
 * of the scene are torn down and rebuilt whenever `deps` change. Those two
 * lifetimes have to be separate, and the reason is specific:
 *
 * `forceContextLoss()` tells the browser to drop the GL context immediately
 * rather than waiting for GC. That is the right call on unmount — it keeps a
 * long session from exhausting the browser's per-page context budget — but it
 * is *permanent*. A canvas whose context has been force-lost can never hand out
 * another context, so any renderer constructed on that same element afterwards
 * throws "Cannot read properties of null (reading 'precision')".
 *
 * Scenes whose inputs arrive after mount (a canvas-rasterised wordmark can only
 * be sampled once its webfont loads) rebuild on a deps change, and they do it on
 * the same canvas. So the context outlives the scene graph, and only a real
 * unmount loses it.
 */
export function useScene(setup: SceneSetup, deps: React.DependencyList = [], options: SceneOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const holder = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    size: { width: number; height: number };
    tick: SceneTick;
  } | null>(null);

  // Keep the latest setup without making it a dependency: callers pass an inline
  // closure, and listing it would rebuild the scene every render.
  const setupRef = useRef(setup);
  setupRef.current = setup;
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // ── renderer lifetime: one effect, no dependencies ──────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (err) {
      // No WebGL (blocklisted GPU, headless without a software rasteriser). The
      // CSS backdrop behind the canvas is already a reasonable fallback, so
      // leave the page usable rather than throwing during render.
      console.warn("[gclass] WebGL unavailable, scene skipped:", err);
      return;
    }

    const size = { width: canvas.clientWidth, height: canvas.clientHeight };
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, optionsRef.current.dpr ?? 2));
    renderer.setSize(size.width, size.height, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, size.width / size.height, 0.1, 4000);
    holder.current = { renderer, scene, camera, size, tick: () => {} };

    const observer = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === size.width && h === size.height) return;
      size.width = w;
      size.height = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    observer.observe(canvas);

    // THREE.Timer, not THREE.Clock: Clock is deprecated in this version and
    // warns on construction. Timer also clamps its delta, so a backgrounded tab
    // returning to the foreground does not teleport the animation forward by
    // however long it was hidden.
    const timer = new THREE.Timer();
    const state = { elapsed: 0, delta: 0 };
    let frame = 0;

    const loop = () => {
      timer.update();
      state.delta = timer.getDelta();
      state.elapsed = timer.getElapsed();
      holder.current?.tick(state);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();

      // Dispose the scene contents while the context is still alive.
      disposeScene(scene);
      holder.current = null;

      renderer.dispose();
      // Unmount only. Safe here because nothing will reuse this canvas.
      renderer.forceContextLoss();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── scene-graph lifetime: rebuilt on `deps` change ───────────────────────
  useEffect(() => {
    const ctx = holder.current;
    if (!ctx) return;

    // Clear whatever the previous setup left behind.
    disposeScene(ctx.scene);
    ctx.tick = setupRef.current(ctx);

    return () => {
      disposeScene(ctx.scene);
      ctx.tick = () => {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return canvasRef;
}

/**
 * Disposes every geometry, material and shader texture in a scene.
 *
 * Written by hand rather than relying on traverse alone because a
 * ShaderMaterial's `map` uniform holds a texture that `material.dispose()`
 * does not reach — leaving those behind is how a long session ends up with
 * hundreds of orphaned GL textures.
 */
function disposeScene(scene: THREE.Scene) {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    mesh.geometry?.dispose();
    const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (Array.isArray(material)) material.forEach(disposeMaterial);
    else if (material) disposeMaterial(material);
  });
  scene.clear();
}

function disposeMaterial(material: THREE.Material) {
  const shader = material as THREE.ShaderMaterial;
  if (shader.uniforms) {
    for (const uniform of Object.values(shader.uniforms)) {
      const value = uniform?.value;
      if (value instanceof THREE.Texture) value.dispose();
    }
  }
  material.dispose();
}