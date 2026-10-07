import { useEffect, useRef } from "react";
import * as THREE from "three";

import { DEPTH_FADE, POINTER_REPEL, ROUND_POINT, pointerUniforms } from "./pointChunks";
import { useScene } from "./useScene";

/**
 * The runner kit.
 *
 * Not a wordmark — this is a plastic model-kit sprue: the rectangular frame you
 * punch parts out of, with the parts still attached by their gates. The build
 * is therefore the sprue's own geometry rather than anything derived from type:
 *
 *   1. An outer rounded-rectangle border (the frame rail).
 *   2. Internal ribs dividing the interior into rectangular cavities.
 *   3. Cavity contents: round wheel discs, wedge panels and flat plates.
 *   4. Sprue gates — short nubs connecting each part back to a rib.
 *
 * All of it is scattered into a point cloud, so every surface is sampled as a
 * filled region with a little depth jitter. That reads as the frosted,
 * light-catching plastic of the real thing rather than as a wireframe.
 */

/** Deterministic PRNG so the part layout is identical on every load. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Part = {
  /** Centre in sprue-local units. */
  cx: number;
  cy: number;
  w: number;
  h: number;
  /** Round parts are discs; square parts are plates/wedges. */
  round: boolean;
  /** Thickness along z. Wheels stand proud of the frame. */
  depth: number;
  /** Brightness multiplier — the reference's discs catch more light. */
  glow: number;
};

type Builder = {
  push(x: number, y: number, z: number, glow: number): void;
};

const FRAME_W = 10;
const FRAME_H = 6.2;
const RAIL = 0.34;

/**
 * Sample a filled region into `n` points.
 *
 * `n` is a count, not a density: the caller has already apportioned the budget
 * for this region, and multiplying by area here would overshoot it by the area
 * factor — which on a large part is millions of points and locks the main
 * thread.
 */
function fillRect(b: Builder, cx: number, cy: number, w: number, h: number, depth: number, glow: number, n: number, rand: () => number) {
  const count = Math.max(8, Math.round(n));
  for (let i = 0; i < count; i++) {
    // Uniform in the rect, then a small z spread so the plate has body.
    b.push(cx + (rand() - 0.5) * w, cy + (rand() - 0.5) * h, (rand() - 0.5) * depth, glow);
  }
}

function fillDisc(b: Builder, cx: number, cy: number, r: number, depth: number, glow: number, n: number, rand: () => number) {
  const count = Math.max(16, Math.round(n));
  for (let i = 0; i < count; i++) {
    // sqrt for uniform disc density, not the r^2 bias that clusters at the rim.
    const a = rand() * Math.PI * 2;
    const rr = Math.sqrt(rand()) * r;
    b.push(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, (rand() - 0.5) * depth, glow);
  }
}

/** The sprue's parts, in a layout that echoes the reference: wheels low, panels above. */
function buildParts(rand: () => number): Part[] {
  const parts: Part[] = [];
  const innerW = FRAME_W - RAIL * 2;
  const innerH = FRAME_H - RAIL * 2;

  // A vertical rib just left of centre, as in the reference, plus one horizontal
  // rib across the lower third. These define the cavity grid.
  const ribsX = [-innerW * 0.24];
  const ribsY = [-innerH * 0.18];

  const cell = (cx: number, cy: number, w: number, h: number) => ({ cx, cy, w, h });

  // Left column, above the horizontal rib: wedge panels.
  parts.push({ ...cell(-innerW * 0.36, innerH * 0.2, innerW * 0.3, innerH * 0.3), round: false, depth: 0.3, glow: 0.8 });
  parts.push({ ...cell(-innerW * 0.12, innerH * 0.2, innerW * 0.22, innerH * 0.3), round: false, depth: 0.3, glow: 0.8 });

  // Left column, below the rib: the round wheel discs.
  for (let i = 0; i < 3; i++) {
    parts.push({
      cx: -innerW * 0.4 + i * innerW * 0.26,
      cy: -innerH * 0.3,
      w: 0,
      h: 0,
      round: true,
      depth: 0.5,
      glow: 1.15,
    });
  }

  // Right of the vertical rib: the big body shell panel and a smaller one.
  parts.push({ ...cell(innerW * 0.22, innerH * 0.16, innerW * 0.44, innerH * 0.52), round: false, depth: 0.26, glow: 0.95 });
  parts.push({ ...cell(innerW * 0.22, -innerH * 0.3, innerW * 0.2, innerH * 0.22), round: false, depth: 0.26, glow: 0.7 });
  parts.push({ ...cell(innerW * 0.42, -innerH * 0.3, innerW * 0.22, innerH * 0.22), round: false, depth: 0.26, glow: 0.7 });

  // Sprue gates: a short nub from each part back toward the nearest rib.
  for (const p of parts) {
    parts.push({
      cx: p.cx,
      cy: p.cy + (p.round ? 0.55 : p.h / 2 + 0.3),
      w: p.round ? 0.16 : 0.22,
      h: 0.4,
      round: false,
      depth: 0.14,
      glow: 0.55,
    });
  }

  void ribsX;
  void ribsY;
  void rand;
  return parts;
}

export function SprueScene({
  className,
  count = 26000,
  color = "#8ec5ff",
  hot = "#dceaff",
}: {
  className?: string;
  count?: number;
  color?: string;
  hot?: string;
}) {
  const pointer = useRef({ x: 0, y: 0 });
  const active = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onLeave = () => {
      active.current = 0;
    };
    const onEnter = () => {
      active.current = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const canvasRef = useScene(({ renderer, scene, camera }) => {
    const rand = mulberry32(0x5eed);
    const positions: number[] = [];
    const glows: number[] = [];

    const b: Builder = {
      push(x, y, z, glow) {
        positions.push(x, y, z);
        glows.push(glow);
      },
    };

    // The per-part density is set from the total budget so `count` stays
    // meaningful: more points means a finer sample of the same geometry.
    const parts = buildParts(rand);
    // Split the budget between the three structural groups, then divide what is
    // left between the parts in proportion to their footprint. Deriving it this
    // way keeps the total at exactly `count` instead of overshooting it.
    const RAIL_BUDGET = Math.round(count * 0.14);
    const RIB_BUDGET = Math.round(count * 0.08);
    const PART_BUDGET = count - RAIL_BUDGET - RIB_BUDGET;
    const partArea = parts.reduce((sum, p) => sum + (p.round ? Math.PI * 0.42 * 0.42 : p.w * p.h), 0) || 1;

    // 1. Frame rail — a rounded-rectangle outline of points.
    const railPts = RAIL_BUDGET;
    const perim = 2 * (FRAME_W + FRAME_H);
    for (let i = 0; i < railPts; i++) {
      let t = (i / railPts) * perim;
      let x: number;
      let y: number;
      // Walk the perimeter in order, which is what gives the rail its density
      // along the long edges rather than at the corners.
      const hw = FRAME_W / 2 - RAIL / 2;
      const hh = FRAME_H / 2 - RAIL / 2;
      if (t < FRAME_W) {
        x = -hw + t;
        y = hh;
      } else if ((t -= FRAME_W) < FRAME_H) {
        x = hw;
        y = hh - t;
      } else if ((t -= FRAME_H) < FRAME_W) {
        x = hw - t;
        y = -hh;
      } else {
        t -= FRAME_W;
        x = -hw;
        y = -hh + t;
      }
      b.push(x + (rand() - 0.5) * 0.1, y + (rand() - 0.5) * 0.1, (rand() - 0.5) * 0.34, 0.65);
    }

    // 2. Internal ribs.
    const ribPts = RIB_BUDGET;
    const innerW = FRAME_W - RAIL * 2;
    const innerH = FRAME_H - RAIL * 2;
    const ribs: Array<[number, number, number, number]> = [
      [-innerW * 0.02, 0, 0.16, innerH], // vertical
      [0, -innerH * 0.06, innerW, 0.16], // horizontal
    ];
    const ribShare = ribPts / ribs.length;
    for (const [rx, ry, rw, rh] of ribs) {
      fillRect(b, rx, ry, rw, rh, 0.3, 0.6, ribShare, rand);
    }

    // 3. Parts.
    for (const p of parts) {
      const area = p.round ? Math.PI * 0.42 * 0.42 : p.w * p.h;
      const budget = Math.max(8, Math.round((area / partArea) * PART_BUDGET));
      if (p.round) fillDisc(b, p.cx, p.cy, 0.42, p.depth, p.glow, budget, rand);
      else fillRect(b, p.cx, p.cy, p.w, p.h, p.depth, p.glow, budget, rand);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    geo.setAttribute("aGlow", new THREE.BufferAttribute(new Float32Array(glows), 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 1.5 },
        uColor: { value: new THREE.Color(color) },
        uHot: { value: new THREE.Color(hot) },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uFadeNear: { value: 4 },
        uFadeFar: { value: 26 },
        ...pointerUniforms(0.3, 0.34),
      },
      vertexShader: /* glsl */ `
        attribute float aGlow;

        uniform float uTime;
        uniform float uSize;
        uniform float uPixelRatio;
        uniform vec3 uColor;
        uniform float uFadeNear;
        uniform float uFadeFar;

        ${POINTER_REPEL}
        ${DEPTH_FADE}

        varying float vGlow;
        varying float vFade;

        void main() {
          vGlow = aGlow;

          vec4 mv = modelViewMatrix * vec4(position, 1.0);

          // A slow settle on z: the sprue breathes rather than sitting dead.
          vec3 p = position;
          p.z += sin(uTime * 0.5 + position.x * 0.7) * 0.02;

          vec4 clip = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          clip = repelFromPointer(clip);

          vFade = depthFade(-mv.z);

          gl_Position = clip;
          gl_PointSize = uSize * uPixelRatio;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform vec3 uHot;

        varying float vGlow;
        varying float vFade;

        ${ROUND_POINT}

        void main() {
          vec3 tint = mix(uColor, uHot, vGlow * 0.8);
          // Tuned so the frame rails read as bright edges while the cavity
          // fills stay translucent — the reference's frosted-plastic look.
          gl_FragColor = vec4(tint, sprite * vFade * 0.22);
        }
      `,
    });

    const points = new THREE.Points(geo, material);

    // The tilt in the reference: the sprue is rotated so its plane recedes to
    // the right and up, seen from slightly above and left.
    points.rotation.set(-0.18, -0.42, 0.06);
    scene.add(points);

    camera.position.set(0, 0.4, 9.5);

    const target = new THREE.Vector3();

    return ({ elapsed }) => {
      material.uniforms.uTime.value = elapsed;
      const push = material.uniforms.uPush;
      push.value += ((active.current ? 0.34 : 0) - push.value) * 0.06;
      material.uniforms.uPointer.value.set(pointer.current.x, pointer.current.y);

      target.set(pointer.current.x * 0.5, pointer.current.y * 0.35, 0);
      points.position.lerp(target, 0.03);
      points.rotation.z = 0.06 + Math.sin(elapsed * 0.15) * 0.015;
    };
  },
    [],
    // Same reason as the track: additive point clouds are fragment-bound, and
    // this repo is verified on a software rasteriser.
    { dpr: 1 },
  );

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}