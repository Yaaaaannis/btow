'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import RevealImage from '../RevealImage';
import gsap from 'gsap';

interface LoaderProps {
  onLoadingComplete?: () => void;
  progress: number;
  isSceneLoaded: boolean;
}

export const Loader = ({ onLoadingComplete, progress, isSceneLoaded }: LoaderProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const revealProgress = useMotionValue(1);
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isSceneLoaded && !isClicked) {
      setIsClicked(true);

      // Animate UI elements out
      const tl = gsap.timeline({
        onComplete: () => {
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        }
      });

      // Fade out and move down UI elements
      tl.to([logoRef.current, progressRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.inOut"
      })
      // Fade out the entire loader
      .to(loaderRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power3.inOut"
      }, "-=0.5"); // Start slightly before the UI animation ends
    }
  };

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-50"
    >
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #024077 -4.07%, #000000 100%)",
          fontFamily: "'inter', monospace",
        }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Logo and loading bar */}
          <div 
            ref={logoRef}
            className="absolute left-12 bottom-12 flex flex-col gap-4"
          >
            <div className="flex items-center">
              <span className="text-white text-[18px] font-bold tracking-wider">THE</span>
              <span className="text-white text-[18px] italic Playfair_Display ml-2">Silence</span>
            </div>
            <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-[#D9D9D9] transition-all duration-300 ease-out"
                style={{ width: `${Math.round(progress)}%` }}
              />
            </div>
          </div>

          {/* Percentage */}
          <div 
            ref={progressRef}
            className="absolute bottom-12 right-12"
          >
            <span className="text-white text-[64px] font-bold">{Math.round(progress)}%</span>
          </div>

          {/* Image with reveal effect */}
          <div 
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] cursor-pointer transition-transform duration-500 ${isClicked ? 'scale-95 pointer-events-none' : isSceneLoaded ? 'scale-100' : 'scale-100 cursor-not-allowed'}`}
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
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Loading status text */}
         
        </div>
      </div>
    </div>
  );
}; 