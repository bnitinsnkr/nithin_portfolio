'use client';

import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import * as THREE from 'three';

import { useMousePositionRef } from '@/hooks';

/**
 * Mouse-driven camera rig.
 *
 * Reads the pointer from a ref inside `useFrame` — never from state — so
 * moving the mouse costs zero React renders. The camera eases toward the
 * target with a frame-rate-independent lerp so behaviour matches on 60 and
 * 120 Hz displays.
 */
export function CameraRig({ intensity = 1, enabled = true }: { intensity?: number; enabled?: boolean }) {
  const pointer = useMousePositionRef(enabled);
  const target = React.useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!enabled) return;

    target.set(pointer.current.x * 1.35 * intensity, pointer.current.y * 0.85 * intensity, 12);

    // 1 - e^(-k·dt) keeps the easing constant across refresh rates.
    const alpha = 1 - Math.exp(-2.6 * delta);
    state.camera.position.lerp(target, alpha);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * Slow ambient drift applied to the whole scene, independent of the pointer —
 * keeps the composition alive when the cursor is idle or absent (touch).
 */
export function AmbientDrift({ children }: { children: React.ReactNode }) {
  const group = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.06) * 0.12;
    group.current.rotation.x = Math.cos(t * 0.045) * 0.05;
  });

  return <group ref={group}>{children}</group>;
}
