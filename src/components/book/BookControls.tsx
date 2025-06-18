import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { gsap } from "gsap";

interface BookControlsProps {
  selectedBook: number;
}

export const BookControls = ({ selectedBook }: BookControlsProps) => {
  const { camera } = useThree();

  useEffect(() => {
    // Animate camera position based on selected book
    gsap.to(camera.position, {
      x: selectedBook * 2 - 3,
      duration: 1.5,
      ease: "power3.inOut",
    });

    // Animate camera rotation to look at the selected book
    gsap.to(camera.rotation, {
      y: -selectedBook * 0.2 + 0.2,
      duration: 1.5,
      ease: "power3.inOut",
    });
  }, [selectedBook, camera]);

  return null;
}; 