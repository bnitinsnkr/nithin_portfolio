'use client';

import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as React from 'react';

import { useIsMobile, useIsTablet, usePrefersReducedMotion } from '@/hooks';
import { QUALITY, SCENE_COLORS, type SceneQuality } from '@/three/config';
import { Effects } from '@/three/effects';
import { CodeCubes, DigitalGrid, GlassSpheres } from '@/three/floating-objects';
import { NeuralNetwork } from '@/three/neural-network';
import { ParticleField } from '@/three/particles';
import { AmbientDrift, CameraRig } from '@/three/rig';

function SceneContents({ quality, interactive }: { quality: SceneQuality; interactive: boolean }) {
  return (
    <>
      {/* Cinematic three-point setup: cool key, warm-ish electric fill, rim. */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 6]} intensity={1.1} color={SCENE_COLORS.silver} />
      <pointLight position={[-7, 3, 4]} intensity={38} distance={26} color={SCENE_COLORS.electric} />
      <pointLight position={[7, -4, 2]} intensity={26} distance={24} color={SCENE_COLORS.cyan} />
      <spotLight
        position={[0, 9, 6]}
        angle={0.6}
        penumbra={1}
        intensity={22}
        color={SCENE_COLORS.electric}
      />

      <CameraRig enabled={interactive} intensity={quality.tier === 'low' ? 0.5 : 1} />

      <AmbientDrift>
        <NeuralNetwork count={quality.neuronCount} linkDistance={quality.linkDistance} />
        <ParticleField count={quality.particleCount} />
        <GlassSpheres count={quality.spheres} />
        <CodeCubes count={quality.cubes} />
        {quality.tier !== 'low' ? <DigitalGrid /> : null}
      </AmbientDrift>

      <Effects enabled={quality.bloom} />

      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />
      <Preload all />
    </>
  );
}

/**
 * Hero background canvas.
 *
 * Mounted only on the client via a dynamic import (see `hero.tsx`) and only
 * once the hero is actually on screen. Everything about it is defensive:
 * `frameloop` pauses when the tab is hidden, quality is derived from viewport
 * class, and reduced-motion users get a static gradient instead.
 */
export default function HeroScene() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = React.useState(true);

  const quality = isMobile ? QUALITY.low : isTablet ? QUALITY.medium : QUALITY.high;

  // Stop rendering entirely while the tab is backgrounded.
  React.useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  if (reducedMotion) {
    return <StaticFallback />;
  }

  return (
    <Canvas
      aria-hidden
      className="!absolute inset-0"
      dpr={quality.dpr}
      frameloop={visible ? 'always' : 'never'}
      camera={{ position: [0, 0, 12], fov: 42, near: 0.1, far: 60 }}
      gl={{
        antialias: quality.tier === 'high',
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      // Pointer events belong to the DOM above the canvas, not the scene.
      style={{ pointerEvents: 'none' }}
    >
      <React.Suspense fallback={null}>
        <SceneContents quality={quality} interactive={!isMobile} />
      </React.Suspense>
    </Canvas>
  );
}

/** Rendered instead of the canvas for reduced-motion users. */
function StaticFallback() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="aurora absolute inset-0" />
      <div className="grid-lines mask-radial absolute inset-0 opacity-40" />
    </div>
  );
}
