"use client";

import React, { useRef, useState, useEffect } from "react";
import { Scene } from "@/components/three/Scene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [houseActions, setHouseActions] = useState<any>(null);
  const [currentCamera, setCurrentCamera] = useState('cam006');
  const [isDoorOpened, setIsDoorOpened] = useState(false);

  const handleDoorClick = () => {
    if (houseActions && houseActions['Main_Door_Open'] && !isDoorOpened) {
      const action = houseActions['Main_Door_Open'];
      action.reset();
      action.setLoop(1, 1);
      action.clampWhenFinished = true;
      
      action.getMixer().addEventListener('finished', () => {
        action.stop();
      });
      
      action.play();
      setIsDoorOpened(true);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Animation for the title overlay
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

  return (
    <div className="relative w-full overflow-x-hidden bg-background text-foreground">
      {/* Div pour créer la hauteur de scroll */}
      <div style={{ height: "1600vh" }} />
      
      {currentCamera === 'cam006' && (
        <div className="title-overlay fixed bottom-0 left-0 z-40 p-12 pointer-events-none select-none">
          <div className="relative">
            <span
              className="block text-[96px] text-white mb-[-0.1em] ml-[1.8em]"
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
      )}

      {currentCamera === 'cam008' && (
        <div className="fixed bottom-8 left-0 z-40 p-12 pointer-events-none select-none">
          <div className="space-y-6">
            <h1 className="text-[64px] font-bold leading-[84%] tracking-tight text-white" style={{ fontFamily: '"Montserrat", sans-serif' }}>
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

      {currentCamera === 'cam007' && !isDoorOpened && (
        <button
          onClick={handleDoorClick}
          className="fixed top-1/2 left-[65%] transform -translate-y-1/2 z-50 flex items-center gap-3 hover:opacity-90 transition-opacity duration-300 cursor-pointer group"
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
      )}

      <div className="fixed top-0 left-0 w-full h-full">
        <Scene 
          onCameraChange={setCurrentCamera}
          onActionsLoad={(actions) => {
            if (actions && actions['Main_Door_Open']) {
              const action = actions['Main_Door_Open'];
              action.setLoop(1, 1);
              action.clampWhenFinished = true;
            }
            setHouseActions(actions);
          }}
        />
      </div>
    </div>
  );
}