'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import RevealImage from '../RevealImage';

interface LoaderProps {
  onLoadingComplete?: () => void;
}

export const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const revealProgress = useMotionValue(1); // Start with 1 (fully visible)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 1, 100);
        if (newProgress === 100) {
          clearInterval(timer);
          setIsLoaded(true);
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    if (isLoaded && !isClicked) {
      setIsClicked(true);
    }
  };

  const handleRevealComplete = () => {
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #024077 -4.07%, #000000 100%)",
          fontFamily: "'inter', monospace",
        }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Logo and loading bar */}
          <div className="absolute left-12 bottom-12 flex flex-col gap-4">
            <div className="flex items-center">
              <span className="text-white text-[18px] font-bold tracking-wider">THE</span>
              <span className="text-white text-[18px] italic Playfair_Display ml-2">Silence</span>
            </div>
            <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-[#D9D9D9] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Percentage */}
          <div className="absolute bottom-12 right-12">
            <span className="text-white text-[64px] font-bold">{progress}%</span>
          </div>

          {/* Image with reveal effect */}
          <div 
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] cursor-pointer transition-transform duration-500 ${isClicked ? 'scale-95 pointer-events-none' : 'scale-100'}`}
            onClick={handleClick}
          >
            <Canvas
              camera={{
                fov: 45,
                near: 0.1,
                far: 1000,
                position: [0, 0, 4]
              }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
            >
              <Suspense fallback={null}>
                <RevealImage
                  texture="/button.png"
                  revealProgress={revealProgress}
                  isClicked={isClicked}
                  onRevealComplete={handleRevealComplete}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}; 