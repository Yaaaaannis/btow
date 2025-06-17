import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createRoot } from 'react-dom/client';
import { Loader } from './ui/loader';
import html2canvas from 'html2canvas';

export const LoaderCapture = ({ onTextureReady }: { onTextureReady: (texture: THREE.Texture) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a div for the Loader
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = '-9999px';  // Hide it off-screen
    div.style.width = '100vw';
    div.style.height = '100vh';
    document.body.appendChild(div);

    // Render the Loader into the div
    const root = createRoot(div);
    root.render(<Loader onLoadingComplete={() => {}} />);

    // Wait a bit for the Loader to be rendered
    setTimeout(() => {
      if (!div) return;

      // Use html2canvas to capture the Loader
      html2canvas(div, {
        logging: false,
        useCORS: true,
        width: window.innerWidth,
        height: window.innerHeight,
      }).then((canvas: HTMLCanvasElement) => {
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        onTextureReady(texture);

        // Clean up
        root.unmount();
        document.body.removeChild(div);
      });
    }, 100);

    return () => {
      if (div && document.body.contains(div)) {
        root.unmount();
        document.body.removeChild(div);
      }
    };
  }, [onTextureReady]);

  return null;
}; 