'use client';

import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import * as THREE from 'three';

import { SCENE_COLORS } from '@/three/config';

/* -------------------------------------------------------------------------- */
/*                                Glass spheres                                */
/* -------------------------------------------------------------------------- */

const SPHERE_SLOTS = [
  { position: [-4.6, 1.4, -1.2], scale: 0.85 },
  { position: [4.9, -1.1, -2.4], scale: 1.15 },
  { position: [2.6, 2.5, -3.6], scale: 0.6 },
  { position: [-3.2, -2.2, -3.0], scale: 0.72 },
] as const;

/**
 * Refractive glass spheres.
 *
 * Uses `meshPhysicalMaterial` transmission rather than drei's transmission
 * material — no render target per object, no external HDRI fetch, and the
 * look holds up under bloom.
 */
export function GlassSpheres({ count }: { count: number }) {
  const slots = SPHERE_SLOTS.slice(0, count);

  return (
    <>
      {slots.map((slot, index) => (
        <Float
          key={index}
          speed={1.1 + index * 0.18}
          rotationIntensity={0.35}
          floatIntensity={0.9}
          floatingRange={[-0.25, 0.25]}
        >
          <mesh position={slot.position as unknown as [number, number, number]} scale={slot.scale}>
            <icosahedronGeometry args={[1, 6]} />
            <meshPhysicalMaterial
              transmission={0.94}
              thickness={1.1}
              roughness={0.08}
              ior={1.42}
              metalness={0}
              clearcoat={1}
              clearcoatRoughness={0.12}
              color={SCENE_COLORS.silver}
              attenuationColor={SCENE_COLORS.electric}
              attenuationDistance={2.4}
              envMapIntensity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Code cubes                                  */
/* -------------------------------------------------------------------------- */

const CUBE_SLOTS = [
  { position: [-6.2, -1.8, -2.0], scale: 0.42 },
  { position: [6.0, 2.2, -3.2], scale: 0.34 },
  { position: [-1.8, 3.1, -4.0], scale: 0.28 },
  { position: [3.4, -2.9, -1.6], scale: 0.38 },
  { position: [-5.0, 2.8, -4.6], scale: 0.24 },
] as const;

/** Wireframe cubes tumbling on independent axes — the "code lattice" motif. */
export function CodeCubes({ count }: { count: number }) {
  const group = React.useRef<THREE.Group>(null);
  const slots = CUBE_SLOTS.slice(0, count);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      child.rotation.x += delta * (0.16 + index * 0.045);
      child.rotation.y += delta * (0.22 + index * 0.03);
    });
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.16;
  });

  return (
    <group ref={group}>
      {slots.map((slot, index) => (
        <mesh
          key={index}
          position={slot.position as unknown as [number, number, number]}
          scale={slot.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            wireframe
            color={index % 2 === 0 ? SCENE_COLORS.electric : SCENE_COLORS.cyan}
            transparent
            opacity={0.34}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Digital grid                                 */
/* -------------------------------------------------------------------------- */

/** Receding floor grid that grounds the scene and sells depth. */
export function DigitalGrid() {
  const grid = React.useMemo(() => {
    const helper = new THREE.GridHelper(60, 60, SCENE_COLORS.electric, SCENE_COLORS.electric);
    const material = helper.material as THREE.Material;
    material.transparent = true;
    material.opacity = 0.07;
    material.depthWrite = false;
    return helper;
  }, []);

  React.useEffect(() => {
    return () => {
      grid.geometry.dispose();
      (grid.material as THREE.Material).dispose();
    };
  }, [grid]);

  return <primitive object={grid} position={[0, -5.2, -6]} rotation={[0, 0, 0]} />;
}
