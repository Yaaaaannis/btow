'use client';

import React from 'react';
import { useAudio } from '../providers/audio-provider';

export const Header = () => {
  const { isPlaying, toggleMusic } = useAudio();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-8">
      {/* Logo THE Silence en haut à gauche */}
      <div className="absolute top-8 left-8">
        <div className="text-white">
          <span className="font-bold text-lg">THE </span>
          <span className="italic text-lg">Silence</span>
        </div>
      </div>

      {/* Logo ondulé et contrôle en haut à droite */}
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
    </div>
  );
}; 