'use client';

import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';

/**
 * Postprocessing stack.
 *
 * Bloom is the only expensive pass and it is gated by the quality tier — on
 * the low tier the composer is not mounted at all, which removes an entire
 * render target from the frame budget.
 */
export function Effects({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom
        intensity={0.85}
        luminanceThreshold={0.22}
        luminanceSmoothing={0.5}
        kernelSize={KernelSize.LARGE}
        mipmapBlur
      />
      <Vignette offset={0.28} darkness={0.72} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}
