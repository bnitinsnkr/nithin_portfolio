'use client';

import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import * as THREE from 'three';

import { SCENE_COLORS } from '@/three/config';

interface ParticleFieldProps {
  count: number;
  radius?: number;
}

/**
 * Digital dust.
 *
 * A single `THREE.Points` draw call — positions are generated once and the
 * whole field is rotated as a unit, so per-frame cost is one matrix update
 * regardless of particle count.
 */
export function ParticleField({ count, radius = 13 }: ParticleFieldProps) {
  const group = React.useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      // Rejection-free spherical shell sampling, biased outward so the centre
      // stays readable behind the headline.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.45 + Math.cbrt(Math.random()) * 0.55);

      array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      array[i * 3 + 2] = r * Math.cos(phi);
    }
    return array;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.02;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.06;
  });

  return (
    <points ref={group} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        color={SCENE_COLORS.silver}
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
