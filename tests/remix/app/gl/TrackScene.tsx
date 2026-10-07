import { useEffect, useRef } from "react";
import * as THREE from "three";

import { DEPTH_FADE, POINTER_REPEL, ROUND_POINT, pointerUniforms } from "./pointChunks";
import { useScene } from "./useScene";

/**
 * The racing track, receding to the horizon.
 *
 * This is the hero background. Reading the reference closely, it is built from
 * four distinct point sets that share one camera:
 *
 *  1. **The track surface** — a ribbon of grey-blue points following a curve
 *     that snakes away from the camera. Densest near the viewer.
 *  2. **Kerbs** — alternating red and white blocks along both edges of the
 *     ribbon, tightest where the track curves.
 *  3. **Terrain** — green point hills flanking the track, displaced by noise,
 *     thinning into the distance.
 *  4. **Haze** — the bright bloom where the track meets the horizon, plus a
 *     starfield above.
 *
 * The track is the anchor: the kerbs are offset from the same curve that
 * generates the surface, so they always follow it exactly however it is shaped.
 */

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smoothstep(x - xi);
  const yf = smoothstep(y - yi);
  const h = (a: number, b: number) => {
    let n = a * 374761393 + b * 668265263 + seed * 1442695041;
    n = (n ^ (n >> 13)) * 1274126177;
    return ((n ^ (n >> 16)) >>> 0) / 4294967296;
  };
  const a = h(xi, yi);
  const b2 = h(xi + 1, yi);
  const c = h(xi, yi + 1);
  const d = h(xi + 1, yi + 1);
  return a * (1 - xf) * (1 - yf) + b2 * xf * (1 - yf) + c * (1 - xf) * yf + d * xf * yf;
}

function fbm(x: number, y: number, seed: number) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let o = 0; o < 4; o++) {
    sum += valueNoise(x * freq, y * freq, seed + o * 31) * amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum;
}

export function TrackScene({ className }: { className?: string }) {
  const pointer = useRef({ x: 0, y: 0 });
  const active = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onEnter = () => {
      active.current = 1;
    };
    const onLeave = () => {
      active.current = 0;
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

  const canvasRef = useScene(
    ({ renderer, scene, camera }) => {
    const rand = mulberry32(0xc0ffee);

    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];

    const cSurface = new THREE.Color("#8fa8d8");
    const cRed = new THREE.Color("#ff3b30");
    const cWhite = new THREE.Color("#ffffff");
    const cGreen = new THREE.Color("#3ddc4a");
    const cHaze = new THREE.Color("#7fb4ff");
    const scratch = new THREE.Color();

    const push = (x: number, y: number, z: number, c: THREE.Color, size: number) => {
      positions.push(x, y, z);
      colors.push(c.r, c.g, c.b);
      sizes.push(size);
    };

    /**
     * The track centreline.
     *
     * `t` runs 0 (at the camera) to 1 (at the horizon). Lateral offset is a sum
     * of two sines with different periods, which gives a long S-bend rather than
     * a regular wave — the reference's track wanders.
     */
    const centreX = (t: number) => Math.sin(t * 3.1) * 9.5 + Math.sin(t * 7.7 + 1.2) * 2.6;
    const centreY = (t: number) => -0.6 + Math.sin(t * 5.3) * 0.9 + t * 1.2;

    // ── 1. track surface ────────────────────────────────────────────────────
    const SURFACE_STEPS = 190;
    const ACROSS = 20;
    for (let i = 0; i < SURFACE_STEPS; i++) {
      // Non-linear in t: dense near the viewer, sparse at the horizon, which is
      // both cheaper and closer to how the reference's point budget is spent.
      const t = Math.pow(i / SURFACE_STEPS, 1.7);
      const z = -t * 120;
      const cx = centreX(t);
      const cy = centreY(t);
      const halfWidth = 2.6 + t * 5.5;

      for (let j = 0; j < ACROSS; j++) {
        const across = (j / (ACROSS - 1)) * 2 - 1;
        const x = cx + across * halfWidth;
        // Slight crown on the road centre plus surface noise.
        const y = cy + Math.abs(across) * -0.18 + (rand() - 0.5) * 0.14;
        scratch.copy(cSurface).multiplyScalar(0.55 + rand() * 0.5);
        push(x, y, z, scratch, 1);
      }
    }

    // ── 2. kerbs ────────────────────────────────────────────────────────────
    // Alternating blocks along both edges, offset from the same curve as the
    // surface so they track it exactly.
    const KERB_BLOCKS = 110;
    for (let i = 0; i < KERB_BLOCKS; i++) {
      const t = Math.pow(i / KERB_BLOCKS, 1.7);
      const z = -t * 120 + 1.6;
      const cx = centreX(t);
      const cy = centreY(t);
      const halfWidth = 2.6 + t * 5.5;
      const col = i % 2 === 0 ? cRed : cWhite;

      for (const side of [-1, 1]) {
        const n = 10;
        for (let j = 0; j < n; j++) {
          const along = (j / n) * (1.6 + t * 3.2);
          const x = cx + side * (halfWidth + 0.5 + (rand() - 0.5) * 0.2);
          const y = cy + 0.18 + (rand() - 0.5) * 0.2;
          // Kerbs sit proud of the road and brighten as they approach.
          push(x, y + along * 0.0, z - along, scratch.copy(col).multiplyScalar(0.7 + rand() * 0.3), 1.3);
        }
      }
    }

    // ── 3. terrain ──────────────────────────────────────────────────────────
    // Flanking hills, thinning with distance so the horizon stays open.
    const TERRAIN_COLS = 96;
    const TERRAIN_ROWS = 44;
    for (let i = 0; i < TERRAIN_COLS; i++) {
      const t = Math.pow(i / TERRAIN_COLS, 1.5);
      const z = -t * 110;
      const cx = centreX(t);
      const cy = centreY(t);
      const spread = 11 + t * 22;

      for (let j = 0; j < TERRAIN_ROWS; j++) {
        const side = j % 2 === 0 ? -1 : 1;
        const across = 1 + Math.floor(j / 2) / (TERRAIN_ROWS / 2);
        const x = cx + side * across * spread * 0.42;
        const n = fbm(x * 0.06, z * 0.02, 11);
        const y = cy + n * 5.5 - 1.2;
        // Fade the green toward the horizon so the haze reads behind it.
        scratch.copy(cGreen).multiplyScalar(0.35 + n * 0.85).lerp(cHaze, Math.min(0.85, t * 1.5));
        push(x, y, z, scratch, 1.1);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(new Float32Array(sizes), 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 1.35 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uFadeNear: { value: 2 },
        uFadeFar: { value: 105 },
        ...pointerUniforms(0.26, 0.3),
      },
      vertexShader: /* glsl */ `
        attribute float aSize;
        uniform float uTime;
        uniform float uSize;
        uniform float uPixelRatio;
        uniform float uFadeNear;
        uniform float uFadeFar;

        ${POINTER_REPEL}
        ${DEPTH_FADE}

        varying vec3 vColor;
        varying float vFade;
        varying float vShimmer;

        void main() {
          vColor = color;

          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vec4 clip = projectionMatrix * mv;
          clip = repelFromPointer(clip);

          // The depth fade is what keeps the far track from accumulating into a
          // solid white wall under additive blending.
          vFade = depthFade(-mv.z);

          // Height-keyed shimmer, so the terrain glitters without the surface
          // (which is nearly flat) appearing to crawl.
          vShimmer = 0.75 + 0.25 * sin(uTime * 1.1 + position.x * 0.4 + position.y * 0.6);

          gl_Position = clip;
          gl_PointSize = uSize * aSize * uPixelRatio;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vFade;
        varying float vShimmer;

        ${ROUND_POINT}

        void main() {
          vec3 tint = vColor * vShimmer;
          gl_FragColor = vec4(tint, sprite * vFade * 0.62);
        }
      `,
    });

    const track = new THREE.Points(geo, material);
    scene.add(track);

    // ── 4. starfield ────────────────────────────────────────────────────────
    const STAR_COUNT = 900;
    const starPos: number[] = [];
    const starSize: number[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 120 + rand() * 80;
      starPos.push(r * Math.sin(phi) * Math.cos(theta), Math.abs(r * Math.cos(phi)) * 0.7 + 6, r * Math.sin(phi) * Math.sin(theta) - 60);
      starSize.push(0.6 + rand() * 1.1);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(starPos), 3));
    starGeo.setAttribute("aSize", new THREE.BufferAttribute(new Float32Array(starSize), 1));

    const starMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        attribute float aSize;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vTwinkle;
        void main() {
          vTwinkle = 0.4 + 0.6 * sin(uTime * 0.7 + aSize * 30.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uPixelRatio;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vTwinkle;
        ${ROUND_POINT}
        void main() {
          gl_FragColor = vec4(0.8, 0.88, 1.0, sprite * vTwinkle * 0.5);
        }
      `,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── 5. horizon haze ──────────────────────────────────────────────────────
    // A bright band sitting exactly where the track vanishes. A radial sprite
    // rather than more points: it is a glow, not a surface, so it should not
    // respond to the cursor the way the track does.
    const hazeTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 128;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(190,220,255,0.95)");
      g.addColorStop(0.4, "rgba(120,170,255,0.35)");
      g.addColorStop(1, "rgba(60,110,220,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    })();

    const haze = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: hazeTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.5,
      }),
    );
    haze.scale.set(90, 34, 1);
    haze.position.set(0, 1.5, -118);
    scene.add(haze);

    camera.position.set(0, 2.4, 7);
    camera.lookAt(0, -0.8, -34);

    const look = new THREE.Vector3(0, -0.8, -34);

    return ({ elapsed }) => {
      material.uniforms.uTime.value = elapsed;
      starMat.uniforms.uTime.value = elapsed;

      // Ramp the push in and out rather than switching it, so the dots ease
      // away from the cursor instead of snapping.
      const u = material.uniforms.uPush;
      u.value += ((active.current ? 0.3 : 0) - u.value) * 0.05;
      material.uniforms.uPointer.value.set(pointer.current.x, pointer.current.y);

      look.set(pointer.current.x * 4, pointer.current.y * 1.6 - 0.8, -34);
      camera.position.x += (pointer.current.x * 2.4 - camera.position.x) * 0.03;
      camera.position.y += (2.4 + pointer.current.y * 0.9 - camera.position.y) * 0.03;
      camera.lookAt(look);

      stars.rotation.y = elapsed * 0.006;
    };
  },
    // Empty deps: the scene's geometry is built once and never changes.
    [],
    // DPR 1. A full-viewport additive point field at 2x is millions of
    // fragments per frame, which a software rasteriser cannot sustain.
    { dpr: 1 },
  );

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}