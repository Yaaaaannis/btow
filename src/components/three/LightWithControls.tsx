import { memo } from 'react';
import { useThree } from '@react-three/fiber';

export const LightWithControls = memo(() => {
  const { scene } = useThree();

  // Optimisation : Utilisation de useMemo pour les paramètres de lumière
  const lightProps = {
    color: "#fff",
    intensity: 1,
    castShadow: true,
    "shadow-mapSize": [4096, 4096],
    "shadow-bias": -0.0001,
    "shadow-normalBias": 0.02,
    "shadow-radius": 5,
    "shadow-camera-near": 0.1,
    "shadow-camera-far": 30,
    "shadow-camera-left": -10,
    "shadow-camera-right": 10,
    "shadow-camera-top": 10,
    "shadow-camera-bottom": -10,
    position: [1, 3.8, -2]
  };

  return (
    <pointLight {...lightProps}>
      <mesh scale={0.2}>
        <sphereGeometry />
        <meshBasicMaterial color="#fff" />
      </mesh>
    </pointLight>
  );
});

LightWithControls.displayName = 'LightWithControls'; 