'use client';

import React from 'react';

export const Contact = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      

      {/* Titre principal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
                      <h1 className="text-white font-montserrat font-bold text-[64px] leading-none tracking-tight uppercase mb-8">
            THANKS YOU<br />
            FOR SCROLLING<br />
            THE EXPERIENCE
          </h1>

          {/* Separator */}
          <div className="w-[570px] h-1 bg-white mx-auto mb-12"></div>

          {/* Boutons LIKE et SHARE */}
          <div className="flex gap-0 justify-center">
            <button className="bg-white text-black px-28 py-6 font-montserrat font-bold text-xl uppercase hover:opacity-90 transition-opacity">
              LIKE
            </button>
            <button className="bg-[#FBD37F] text-black px-28 py-6 font-montserrat font-bold text-xl uppercase hover:opacity-90 transition-opacity">
              SHARE
            </button>
          </div>
        </div>
      </div>

      {/* Crédits en bas à gauche */}
      <div className="absolute bottom-8 left-8 z-10 space-y-2">
        <div className="flex items-center">
          <div className="bg-[#FBD37F] text-[#0474D6] px-4 py-2 font-montserrat font-bold text-sm uppercase">
            DESIGN
          </div>
          <div className="bg-white text-black px-4 py-2 font-montserrat font-bold text-sm uppercase">
            DJMALIBOY
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#FBD37F] text-[#0474D6] px-4 py-2 font-montserrat font-bold text-sm uppercase">
            DEVELOPED
          </div>
          <div className="bg-white text-black px-4 py-2 font-montserrat font-bold text-sm uppercase">
            YANNIS FEBVRE
          </div>
        </div>
      </div>


      
    </div>
  );
}; 