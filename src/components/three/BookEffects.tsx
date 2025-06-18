import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, SpotLight } from '@react-three/drei';
import * as THREE from 'three';

export const BookEffects = () => {
  const spotLight = useRef<THREE.SpotLight>(null);
  const sparklesRef = useRef<THREE.Points>(null);

  return (
    <group>
      {/* Lueur dorée principale */}
      <SpotLight
        ref={spotLight}
        distance={4}
        angle={0.5}
        attenuation={5}
        anglePower={5}
        intensity={2}
        color="#FFB534"
        position={[0, 2, 0]}
      />

      {/* Particules dorées scintillantes */}
      <Sparkles
        ref={sparklesRef}
        count={50}
        scale={2}
        size={3}
        speed={0.3}
        color="#FFD700"
        opacity={0.5}
      />

      {/* Particules plus petites et plus rapides */}
      <Sparkles
        count={100}
        scale={1.5}
        size={2}
        speed={0.5}
        color="#FFF7D4"
        opacity={0.3}
      />

      {/* Particules très fines pour l'ambiance */}
      <Sparkles
        count={150}
        scale={3}
        size={1}
        speed={0.2}
        color="#FFE5B4"
        opacity={0.2}
      />
    </group>
  );
}; 