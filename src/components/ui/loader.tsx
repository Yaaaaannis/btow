'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useMotionValue } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import RevealImage from '../RevealImage';
import gsap from 'gsap';
import { useAudio } from '../providers/audio-provider';

interface LoaderProps {
  onLoadingComplete?: () => void;
  progress: number;
  isSceneLoaded: boolean;
}

export const Loader = ({ onLoadingComplete, progress, isSceneLoaded }: LoaderProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const revealProgress = useMotionValue(1);
  const { playMusic, isPlaying, toggleMusic } = useAudio();
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isSceneLoaded && !isClicked) {
      setIsClicked(true);
      
      // Lancer la musique
      playMusic();

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
      className="fixed inset-0 z-[60]"
    >
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #024077 -4.07%, #000000 100%)",
          fontFamily: "'inter', monospace",
        }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Bouton ON/OFF en haut à droite */}
          <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
            {/* SVG ondulé */}
            <div className="text-white">
              <svg width="52" height="14" viewBox="0 0 52 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L6.18975 7.23022C6.69272 6.67104 7.60977 6.84637 7.87098 7.55166L9.06641 10.7793C9.37354 11.6086 10.5268 11.6603 10.907 10.8619L12.5565 7.39793C12.8687 6.74236 13.7535 6.62755 14.2226 7.18174L18.1926 11.8713C18.6501 12.4116 19.5087 12.3186 19.8398 11.6928L22.803 6.0923C22.8355 6.03093 22.8743 5.97312 22.9187 5.91978L24.2596 4.31072C24.6744 3.81299 25.4457 3.83505 25.8314 4.35568L30.5993 10.7924C30.8416 11.1194 31.2578 11.267 31.6519 11.1657L35.6203 10.1452C35.9694 10.0555 36.2431 9.78485 36.3369 9.43684L38.3205 2.07248C38.5751 1.12756 39.8951 1.0729 40.2269 1.99355L42.5995 8.57737C42.9228 9.47462 44.1991 9.45302 44.4919 8.54535L46.131 3.46425C46.4117 2.59403 47.6166 2.52586 47.9937 3.35886L51 10" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            
            {/* Bouton ON/OFF */}
            <button 
              onClick={toggleMusic}
              className="text-xs font-montserrat tracking-wider hover:opacity-80 transition-all flex gap-1"
            >
              <span className={`${isPlaying ? 'text-white' : 'text-gray-500'}`}>ON</span>
              <span className="text-white">/</span>
              <span className={`${!isPlaying ? 'text-white' : 'text-gray-500'}`}>OFF</span>
            </button>
          </div>

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