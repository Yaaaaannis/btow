import { Canvas } from "@react-three/fiber";
import { Environment, Preload, AdaptiveDpr, AdaptiveEvents, useProgress, Float } from "@react-three/drei";
import * as THREE from 'three';
import { Suspense, memo, useEffect } from 'react';
import { House2 } from "./House2";
import { CameraController } from "./CameraController";
import { LightWithControls } from "./LightWithControls";
import { Book } from "../book/Book";
import { BookEffects } from "./BookEffects";
import { Provider } from "jotai";


interface SceneProps {
  onCameraChange: (camera: 'cam006' | 'cam007' | 'cam008' | 'cam009') => void;
  onActionsLoad: (actions: any) => void;
  onFinalPosition?: (isAtFinal: boolean) => void;
  onEventsTicketsPhase?: (phase: 'none' | 'events' | 'tickets' | 'contact') => void;
}

// Composant pour gérer le préchargement et le positionnement du livre
const LoadingManager = ({ onActionsLoad }: { onActionsLoad: (actions: any) => void }) => {
  const { progress, loaded, total } = useProgress();
  
  useEffect(() => {
    if (loaded === total && total > 0) {
      // Toutes les ressources sont chargées
      console.log('All resources loaded:', loaded, 'of', total);
    }
  }, [loaded, total]);

  return (
    <>
      <House2
        scale={0.5}
        position={[0, 0, 0]}
        onLoad={onActionsLoad}
      />
      
      {/* Position the book in the scene */}
      <group 
        position={[0.3, 1.3, -2.5]} 
        scale={0.3}
      >
        <Float
          speed={2} // Vitesse de flottement très lente
          rotationIntensity={0.3} // Très légère rotation
          floatIntensity={0.3} // Très léger mouvement vertical
        >
          <Book />
          <BookEffects />
        </Float>
      </group>
    </>
  );
};

export const Scene = memo(({ onCameraChange, onActionsLoad, onFinalPosition, onEventsTicketsPhase }: SceneProps) => {
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
      <Provider>
        <Suspense fallback={null}>
          <CameraController onCameraChange={onCameraChange} onFinalPosition={onFinalPosition} onEventsTicketsPhase={onEventsTicketsPhase} />
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
      </Provider>
    </Canvas>
  );
})

Scene.displayName = 'Scene'; 