'use client';

import { useFrame } from '@react-three/fiber';
import * as React from 'react';
import * as THREE from 'three';

import { SCENE_COLORS } from '@/three/config';

interface NeuralNetworkProps {
  count: number;
  linkDistance: number;
  radius?: number;
}

/**
 * Floating neural graph.
 *
 * Nodes drift on independent sine phases; synapses are rebuilt into one
 * `LineSegments` buffer each frame. Two draw calls total — an `InstancedMesh`
 * for the neurons and a single line buffer for every connection — so node
 * count stays cheap.
 */
export function NeuralNetwork({ count, linkDistance, radius = 6.5 }: NeuralNetworkProps) {
  const meshRef = React.useRef<THREE.InstancedMesh>(null);
  const linesRef = React.useRef<THREE.LineSegments>(null);
  const dummy = React.useMemo(() => new THREE.Object3D(), []);

  // Static per-node seed data: home position, drift amplitude and phase.
  const nodes = React.useMemo(
    () =>
      Array.from({ length: count }, () => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = radius * (0.35 + Math.random() * 0.65);
        return {
          home: new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta) * 0.7,
            r * Math.cos(phi) * 0.8,
          ),
          amplitude: 0.18 + Math.random() * 0.42,
          speed: 0.18 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
          scale: 0.035 + Math.random() * 0.045,
        };
      }),
    [count, radius],
  );

  // Worst case is a fully connected graph; allocate for it once and draw only
  // the segments actually used via `setDrawRange`.
  const maxSegments = (count * (count - 1)) / 2;
  const linePositions = React.useMemo(
    () => new Float32Array(maxSegments * 6),
    [maxSegments],
  );
  const current = React.useMemo(
    () => nodes.map((node) => node.home.clone()),
    [nodes],
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      const drift = Math.sin(time * node.speed + node.phase) * node.amplitude;
      const driftZ = Math.cos(time * node.speed * 0.8 + node.phase) * node.amplitude * 0.7;

      current[i].set(node.home.x + drift, node.home.y + driftZ, node.home.z + drift * 0.5);

      dummy.position.copy(current[i]);
      dummy.scale.setScalar(node.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // Rebuild synapses for nodes that drifted within range of each other.
    let cursor = 0;
    for (let i = 0; i < current.length; i += 1) {
      for (let j = i + 1; j < current.length; j += 1) {
        if (current[i].distanceTo(current[j]) > linkDistance) continue;
        linePositions[cursor++] = current[i].x;
        linePositions[cursor++] = current[i].y;
        linePositions[cursor++] = current[i].z;
        linePositions[cursor++] = current[j].x;
        linePositions[cursor++] = current[j].y;
        linePositions[cursor++] = current[j].z;
      }
    }

    const lines = linesRef.current;
    if (lines) {
      const attribute = lines.geometry.getAttribute('position') as THREE.BufferAttribute;
      attribute.needsUpdate = true;
      lines.geometry.setDrawRange(0, cursor / 3);
    }
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color={SCENE_COLORS.electric}
          emissive={SCENE_COLORS.electric}
          emissiveIntensity={2.4}
          roughness={0.25}
          metalness={0.1}
          toneMapped={false}
        />
      </instancedMesh>

      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={SCENE_COLORS.cyan}
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
