import { useThree } from "@react-three/fiber";
import { useEffect, useState, useCallback } from "react";
import * as THREE from 'three';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CameraControllerProps {
  onCameraChange: (camera: 'cam006' | 'cam007' | 'cam008') => void;
}

export const CameraController = ({ onCameraChange }: CameraControllerProps) => {
  const { camera } = useThree();
  
  const [targetPosition] = useState({
    start: new THREE.Vector3(25.252, 1.82, 24.882),
    middle: new THREE.Vector3(14.111, 0.474, 9.408),
    end: new THREE.Vector3(0.771, 2.523, 8.764)
  });

  const [targetRotation] = useState({
    start: new THREE.Euler(0.103, 0.73, -0.069),
    middle: new THREE.Euler(0.55, 1.246, -0.527),
    end: new THREE.Euler(0.007, 0.042, 0)
  });

  // Optimisation : Mémoisation des fonctions d'interpolation
  const interpolateCamera = useCallback((
    startPos: THREE.Vector3,
    endPos: THREE.Vector3,
    startRot: THREE.Euler,
    endRot: THREE.Euler,
    progress: number
  ) => {
    camera.position.lerpVectors(startPos, endPos, progress);
    const rx = gsap.utils.interpolate(startRot.x, endRot.x, progress);
    const ry = gsap.utils.interpolate(startRot.y, endRot.y, progress);
    const rz = gsap.utils.interpolate(startRot.z, endRot.z, progress);
    camera.rotation.set(rx, ry, rz);
  }, [camera]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    camera.position.copy(targetPosition.start);
    camera.rotation.copy(targetRotation.start);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "canvas",
        start: "top top",
        end: "1600vh",
        scrub: 3,
        onUpdate: (self) => {
          const totalProgress = self.progress * 1600;

          if (totalProgress <= 200) {
            camera.position.copy(targetPosition.start);
            camera.rotation.copy(targetRotation.start);
            onCameraChange('cam006');
          }
          else if (totalProgress <= 700) {
            interpolateCamera(
              targetPosition.start,
              targetPosition.middle,
              targetRotation.start,
              targetRotation.middle,
              (totalProgress - 200) / 500
            );
          }
          else if (totalProgress <= 900) {
            camera.position.copy(targetPosition.middle);
            camera.rotation.copy(targetRotation.middle);
            onCameraChange('cam008');
          }
          else if (totalProgress <= 1400) {
            interpolateCamera(
              targetPosition.middle,
              targetPosition.end,
              targetRotation.middle,
              targetRotation.end,
              (totalProgress - 900) / 500
            );
          }
          else {
            camera.position.copy(targetPosition.end);
            camera.rotation.copy(targetRotation.end);
            onCameraChange('cam007');
          }
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, [camera, targetPosition, targetRotation, onCameraChange, interpolateCamera]);

  return null;
}; 