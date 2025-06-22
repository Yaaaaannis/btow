"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Scene } from "@/components/three/Scene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Loader } from "@/components/ui/loader";
import { Footer } from "@/components/ui/footer";
import { Canvas } from '@react-three/fiber';
import { animate, useMotionValue } from 'framer-motion';
import { Suspense } from 'react';
import RevealImage from '@/components/RevealImage';
import { LoaderCapture } from '@/components/LoaderCapture';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { useProgress } from '@react-three/drei';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Home() {
  const [houseActions, setHouseActions] = useState<any>(null);
  const [currentCamera, setCurrentCamera] = useState('cam006');
  const [isDoorOpened, setIsDoorOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isAtFinalPosition, setIsAtFinalPosition] = useState(false);
  const revealProgress = useMotionValue(0);
  const [loaderTexture, setLoaderTexture] = useState<THREE.Texture | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const { progress: sceneLoadingProgress, active } = useProgress();
  const titleOverlayRef = useRef<HTMLDivElement>(null);
  const cam008TextRef = useRef<HTMLDivElement>(null);
  const cam007TextRef = useRef<HTMLDivElement>(null);
  const cam009TextRef = useRef<HTMLDivElement>(null);

  const handleDoorClick = () => {
    if (houseActions && houseActions['Main_Door_Open'] && !isDoorOpened) {
      const action = houseActions['Main_Door_Open'];
      action.reset();
      action.setLoop(1, 1);
      action.clampWhenFinished = true;
      
      // Start door animation
      action.play();
      setIsDoorOpened(true);

      // Scroll animation in parallel with door animation
      gsap.to(window, {
        scrollTo: window.scrollY + window.innerHeight * 0.65, // 500vh
        duration: 3,
        ease: "power2.inOut"
      });
      
      action.getMixer().addEventListener('finished', () => {
        action.stop();
      });
    }
  };

  const handleTextureReady = useCallback((texture: THREE.Texture) => {
    setLoaderTexture(texture);
    animate(revealProgress, 1, {
      duration: 2,
      ease: 'easeInOut'
    });
  }, [revealProgress]);

  const handleLoadingComplete = useCallback(() => {
    if (isSceneLoaded) {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, [isSceneLoaded]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.from(".title-overlay", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animation des textes en fonction de la caméra
    if (currentCamera === 'cam006') {
      gsap.to(titleOverlayRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      });
    } else {
      gsap.to(titleOverlayRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power3.in"
      });
    }

    if (currentCamera === 'cam008') {
      gsap.fromTo(cam008TextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    } else {
      gsap.to(cam008TextRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power3.in"
      });
    }

    if (currentCamera === 'cam007') {
      gsap.fromTo(cam007TextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    } else {
      gsap.to(cam007TextRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power3.in"
      });
    }

    if (currentCamera === 'cam009' && !isAtFinalPosition) {
      gsap.fromTo(cam009TextRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    } else {
      gsap.to(cam009TextRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power3.in"
      });
    }
  }, [currentCamera, isAtFinalPosition]);

  return (
    <>
      {isLoading && (
        <Loader 
          onLoadingComplete={handleLoadingComplete}
          progress={sceneLoadingProgress}
          isSceneLoaded={isSceneLoaded}
        />
      )}
      <div className="relative w-full overflow-x-hidden bg-background text-foreground">
        {/* Div pour créer la hauteur de scroll */}
        <div style={{ height: "2600vh" }} />
        
        <div ref={titleOverlayRef} className="title-overlay fixed bottom-0 left-0 z-40 p-6 pointer-events-none select-none">
          <div className="relative">
            <span
              className="block text-[32px] sm:text-[48px] md:text-[64px] lg:text-[96px] text-white mb-[-0.1em] ml-[1em] sm:ml-[1.5em] md:ml-[2em] lg:ml-[1.5em]"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
              }}
            >
              A journey into
            </span>
            <span
              className="block text-[184px] md:text-[12rem] font-bold text-white"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 800,
                lineHeight: 0.8,
                letterSpacing: "-0.04em",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
              }}
            >
              CUBISM
            </span>
          </div>
        </div>

        {currentCamera === 'cam008' && (
          <div ref={cam008TextRef} className="fixed bottom-8 left-0 z-40 p-6 pointer-events-none select-none">
            <div className="space-y-6">
              <h1 className="text-[64px] font-bold leading-[84%] tracking-tight text-white font-montserrat uppercase">
                DISCOVER<br />
                CUBISM LIKE<br />
                NEVER BEFORE
              </h1>
              <p className="text-sm uppercase tracking-wider text-[#737373] leading-relaxed max-w-lg" style={{ fontFamily: '"Inter", sans-serif' }}>
                <span className="text-white font-medium">STEP</span> INTO A REIMAGINED DIGITAL PRESENT. <span className="text-white font-medium">THE <span className="Playfair_Display normal-case">Silence</span></span> A SPECIAL INITIATIVE DEDICATED TO <span className="text-white font-medium">CUBIST ART</span>. OUR NEWLY DESIGNED WEBSITE BRINGS THE GEOMETRIC SPIRIT TO LIFE WITH GEOMETRIC FORMS AND VIBRANT COLORS, OFFERING A TRULY <span className="text-white font-medium">MODERN EXPERIENCE</span> FOR A NEW GENERATION OF <span className="text-white font-medium">ART LOVERS</span>.
              </p>
            </div>
          </div>
        )}

        {currentCamera === 'cam007' && (
          <>
            <button
              onClick={handleDoorClick}
              className="fixed top-1/2 left-[65%] transform -translate-y-1/2 z-40 flex items-center gap-3 hover:opacity-90 transition-opacity duration-300 cursor-pointer group"
            >
              <div className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-white rounded-sm transform rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-0.5 bg-black absolute" />
                  <div className="w-0.5 h-4 bg-black absolute" />
                </div>
              </div>
              <div className="bg-white px-4 py-2 rounded-sm">
                <span className="text-black font-medium text-sm">Click to Open</span>
              </div>
            </button>

            <div ref={cam007TextRef} className="fixed bottom-8 left-0 z-40 p-6 pointer-events-none select-none">
              <div className="space-y-4">
                <h1 className="text-[83px] font-bold leading-[84%] text-white font-montserrat uppercase">
                  ART IN MOTION
                </h1>
                <p className="text-[16px] tracking-wider text-white/80 leading-relaxed uppercase max-w-lg" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Browse an immersive gallery featuring photos and videos of Cubist masterpieces and highlights from the exhibition.
                </p>
              </div>
            </div>
          </>
        )}

        {currentCamera === 'cam009' && (
          <div ref={cam009TextRef} className="fixed bottom-8 left-0 z-40 p-6 pointer-events-none select-none">
            <div className="space-y-2">
              <h1 className="text-[64px] font-bold leading-[84%] tracking-tight text-white uppercase font-montserrat" >
               explore the art
              </h1>
              <p className="text-[16px] uppercase tracking-wider text-[#737373] leading-relaxed max-w-lg" style={{ fontFamily: '"Inter", sans-serif' }}>
                <span className="text-white font-medium">browse the book and explore art.</span>
              </p>
            </div>
          </div>
        )}

        <div 
          className="fixed top-0 left-0 w-full h-full" 
          ref={sceneRef}
        >
          <Suspense fallback={null}>
            <Scene 
              onCameraChange={setCurrentCamera}
              onFinalPosition={(isAtFinal) => {
                setShowFooter(isAtFinal);
                setIsAtFinalPosition(isAtFinal);
              }}
              onActionsLoad={(actions) => {
                if (actions && actions['Main_Door_Open']) {
                  const action = actions['Main_Door_Open'];
                  action.setLoop(1, 1);
                  action.clampWhenFinished = true;
                }
                setHouseActions(actions);
                setIsSceneLoaded(true);
              }}
            />
          </Suspense>
        </div>

        <Canvas>
          <Suspense fallback={null}>
            <LoaderCapture onTextureReady={handleTextureReady} />
            {loaderTexture && (
              <RevealImage
                texture={loaderTexture}
                revealProgress={revealProgress}
                isClicked={true}
              />
            )}
          </Suspense>
        </Canvas>

        <Footer isVisible={showFooter} />
      </div>
    </>
  );
}