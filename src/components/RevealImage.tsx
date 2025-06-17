import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MotionValue, animate } from "framer-motion";

declare module "@react-three/fiber" {
  interface ThreeElements {
    portalMaterial: any;
  }
}

type PortalMaterialType = {
  uTexture: THREE.Texture;
  uTime: number;
  uProgress: number;
} & THREE.ShaderMaterial;

const PortalMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTime: 0,
    uProgress: 0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uProgress;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Center point
      vec2 center = vec2(0.5);
      float dist = length(uv - center);
      
      // Portal effect
      float angle = atan(uv.y - 0.5, uv.x - 0.5);
      float radius = length(uv - center);
      
      // Distortion
      float distortion = sin(angle * 8.0 + uTime * 2.0) * 0.03 * uProgress;
      radius += distortion;
      
      // New UV coordinates
      vec2 newUV = center + vec2(cos(angle), sin(angle)) * radius;
      
      // Sample texture
      vec4 texture = texture2D(uTexture, newUV);
      
      // Portal glow
      vec3 portalColor = vec3(0.1, 0.5, 1.0);
      float glow = (1.0 - dist * 2.0) * uProgress * 0.5;
      
      // Final color
      vec3 finalColor = mix(texture.rgb, portalColor, glow);
      
      gl_FragColor = vec4(finalColor, texture.a);
    }
  `,
  (self) => {
    if (self) {
      self.transparent = true;
      self.side = THREE.DoubleSide;
    }
  }
);

extend({ PortalMaterial });

interface RevealImageProps {
  texture: string | THREE.Texture;
  revealProgress: MotionValue<number>;
  isFullScreen?: boolean;
}

const RevealImage = ({
  texture,
  revealProgress,
  isFullScreen,
}: RevealImageProps) => {
  const materialRef = useRef<PortalMaterialType>(null);
  const loadedTexture = typeof texture === 'string' ? useTexture(texture) : texture;

  useEffect(() => {
    animate(revealProgress, isFullScreen ? 1 : 0, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    });
  }, [isFullScreen, revealProgress]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uTexture = loadedTexture;
    }
  }, [loadedTexture]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.elapsedTime;
      materialRef.current.uProgress = revealProgress.get();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[3.67, 2, 32, 32]} />
      <portalMaterial ref={materialRef} />
    </mesh>
  );
};

export default RevealImage;