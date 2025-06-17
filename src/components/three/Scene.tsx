import { Canvas } from "@react-three/fiber";
import { Environment, Preload, AdaptiveDpr, AdaptiveEvents, useProgress } from "@react-three/drei";
import * as THREE from 'three';
import { Suspense, memo, useEffect } from 'react';
import { House2 } from "./House2";
import { CameraController } from "./CameraController";
import { LightWithControls } from "./LightWithControls";

interface SceneProps {
  onCameraChange: (camera: 'cam006' | 'cam007' | 'cam008' | 'cam009') => void;
  onActionsLoad: (actions: any) => void;
}

// Composant pour gérer le préchargement
const LoadingManager = ({ onActionsLoad }: { onActionsLoad: (actions: any) => void }) => {
  const { progress, loaded, total } = useProgress();
  
  useEffect(() => {
    if (loaded === total && total > 0) {
      // Toutes les ressources sont chargées
      console.log('All resources loaded:', loaded, 'of', total);
    }
  }, [loaded, total]);

  return (
    <House2
      scale={0.5}
      position={[0, 0, 0]}
      onLoad={onActionsLoad}
    />
  );
};

export const Scene = memo(({ onCameraChange, onActionsLoad }: SceneProps) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]} // Adaptatif entre 1x et 2x pixel ratio
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        outputColorSpace: THREE.SRGBColorSpace,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance"
      }}
      camera={{
        near: 0.1,
        far: 1000,
        fov: 22.895
      }}
      performance={{ min: 0.5 }} // Permet de réduire la qualité si nécessaire
    >
      <Suspense fallback={null}>
        <CameraController onCameraChange={onCameraChange} />
        <Environment
          files="/textures/modern_meuesum.hdr"
          background
          blur={0.05}
        />
        <ambientLight intensity={0.7} color="#ffffff" />
        <LightWithControls />
        <LoadingManager onActionsLoad={onActionsLoad} />
        <Preload all /> {/* Précharge toutes les textures */}
      </Suspense>
      <AdaptiveDpr pixelated /> {/* Ajuste dynamiquement la résolution */}
      <AdaptiveEvents /> {/* Optimise la gestion des événements */}
    </Canvas>
  );
})

Scene.displayName = 'Scene'; 