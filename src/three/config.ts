/**
 * Quality tiers for the hero scene.
 *
 * The scene never asks the GPU what it can do — it derives a tier from
 * viewport class and reduced-motion preference, then keeps geometry counts and
 * postprocessing inside that budget. This is what keeps the canvas at 60 FPS
 * on a laptop iGPU and off the critical path on a phone.
 */
export type QualityTier = 'high' | 'medium' | 'low';

export interface SceneQuality {
  tier: QualityTier;
  particleCount: number;
  neuronCount: number;
  /** Max distance at which two neurons get connected by a synapse line. */
  linkDistance: number;
  spheres: number;
  cubes: number;
  bloom: boolean;
  /** Device-pixel-ratio clamp passed to the Canvas. */
  dpr: [number, number];
}

export const QUALITY: Record<QualityTier, SceneQuality> = {
  high: {
    tier: 'high',
    particleCount: 2600,
    neuronCount: 46,
    linkDistance: 2.4,
    spheres: 4,
    cubes: 5,
    bloom: true,
    dpr: [1, 1.75],
  },
  medium: {
    tier: 'medium',
    particleCount: 1400,
    neuronCount: 30,
    linkDistance: 2.6,
    spheres: 3,
    cubes: 3,
    bloom: true,
    dpr: [1, 1.4],
  },
  low: {
    tier: 'low',
    particleCount: 700,
    neuronCount: 18,
    linkDistance: 3,
    spheres: 2,
    cubes: 2,
    bloom: false,
    dpr: [1, 1.25],
  },
};

/** Palette shared between the DOM and the scene so lighting matches the CSS. */
export const SCENE_COLORS = {
  electric: '#33a5ff',
  cyan: '#4cddf0',
  silver: '#c6ceda',
  deep: '#04080f',
} as const;
