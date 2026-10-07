import * as THREE from "three";

/**
 * Shared point-cloud shader chunks.
 *
 * All three scenes on this page — the racing track, the terrain, and the
 * particle sign — are point clouds, so they share the three things every one of
 * them needs: round sprites, a pointer repulsion term, and a view-depth fade.
 *
 * Keeping them in one string constant rather than duplicating GLSL per material
 * means a change to the mouse response only has to happen once.
 */

/** Round sprite with a soft falloff, computed rather than sampled. */
export const ROUND_POINT = /* glsl */ `
  vec2 d = gl_PointCoord - 0.5;
  float r2 = dot(d, d);
  if (r2 > 0.25) discard;
  // sqrt of the squared falloff: 1 at the centre, 0 at the rim.
  float sprite = 1.0 - sqrt(r2) * 2.0;
`;

/**
 * Pointer repulsion.
 *
 * The cursor acts as a repulsor: every point within `uRadius` of it in clip
 * space is pushed radially outward, falling off to zero at the radius. The
 * offset is applied to the *clip* position (and scaled by w) rather than to the
 * model-space position, so the push is uniform on screen — a point at the far
 * end of the track moves the same visible distance as one under the cursor.
 *
 * `uPush` is in NDC units, where 1.0 is half the viewport.
 */
export const POINTER_REPEL = /* glsl */ `
  uniform vec2 uPointer;
  uniform float uRadius;
  uniform float uPush;

  vec4 repelFromPointer(vec4 clip) {
    if (uPush <= 0.0) return clip;

    vec2 ndc = clip.xy / max(clip.w, 0.0001);
    vec2 away = ndc - uPointer;
    float dist = length(away);

    // Normalise by radius so the falloff is in screen units.
    float influence = 1.0 - smoothstep(0.0, uRadius, dist);
    if (influence <= 0.0) return clip;

    // Guard the degenerate case where the point sits exactly on the cursor.
    vec2 dir = dist > 0.0001 ? away / dist : vec2(1.0, 0.0);

    // Ease the displacement so points accelerate away rather than jumping.
    float eased = influence * influence;

    // Dividing by w keeps the offset constant in NDC after the perspective
    // divide; without it, distant points fly off far more than near ones.
    return vec4(clip.xy + dir * eased * uPush * clip.w, clip.zw);
  }
`;

/**
 * Depth fade.
 *
 * Additive blending over a deep scene accumulates into a white wall where many
 * points overlap along the view ray. Fading distant points out is what keeps
 * the far end of the track reading as a receding horizon rather than a solid
 * sheet.
 */
export const DEPTH_FADE = /* glsl */ `
  uniform float uFadeNear;
  uniform float uFadeFar;

  float depthFade(float viewZ) {
    return smoothstep(uFadeNear, uFadeNear + (uFadeFar - uFadeNear) * 0.35, -viewZ)
         * (1.0 - smoothstep(uFadeFar * 0.55, uFadeFar, -viewZ));
  }
`;

/** Uniform block shared by every scene that wants the cursor response. */
export function pointerUniforms(radius = 0.22, push = 0.28) {
  return {
    uPointer: { value: new THREE.Vector2(0, 0) },
    uRadius: { value: radius },
    uPush: { value: push },
  };
}