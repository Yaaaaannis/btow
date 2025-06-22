'use client';

import React from 'react';

interface Ticket {
  id: number;
  name: string;
  includes: string;
  price: string;
  availability: string;
  isHighlighted?: boolean;
}

const tickets: Ticket[] = [
  {
    id: 1,
    name: "GENERAL ADMISSION",
    includes: "ACCESS TO MAIN EXHIBITIONS",
    price: "$299",
    availability: "AVAILABLE"
  },
  {
    id: 2,
    name: "GENERAL ADMISSION",
    includes: "ACCESS TO MAIN EXHIBITIONS",
    price: "$299",
    availability: "AVAILABLE"
  },
  {
    id: 3,
    name: "GENERAL ADMISSION",
    includes: "ACCESS TO MAIN EXHIBITIONS",
    price: "$299",
    availability: "AVAILABLE",
    isHighlighted: true
  },
  {
    id: 4,
    name: "GENERAL ADMISSION",
    includes: "ACCESS TO MAIN EXHIBITIONS",
    price: "$299",
    availability: "AVAILABLE"
  }
];

export const Tickets = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#024076] to-[#0477DC] relative overflow-hidden">
      

      {/* Titre principal */}
      <div 
        className="absolute z-10 font-montserrat"
        style={{
          left: '3%',
          top: '15%',
          fontWeight: '800',
          fontSize: '80px',
          lineHeight: '90%',
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: 'white',
          background: 'conic-gradient(from 4.71deg at 39.29% 158.18%, #FFFFFF 0deg, #036FCD 360deg)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
         
        }}
      >
        RESERVE<br />
        YOUR SPOT
      </div>

      {/* Conteneur des tickets */}
      <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center gap-8 px-8 pt-40">
        {/* Tickets */}
        {tickets.map((ticket) => (
          <div key={ticket.id} className="flex flex-col gap-0">
            {/* Carte ticket */}
            <div 
              className="w-80 h-96 p-8 flex flex-col hover:border-2 hover:border-white transition-all duration-100 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '0px'
              }}
            >
              {/* En-tête */}
              <div className="flex-1">
                <h3 className="text-white font-montserrat font-bold text-[32px] mb-4">
                  VIEW TICKET
                </h3>
                
                {/* Nom */}
                <div className="mb-4">
                  <p className="text-white/80 font-montserrat text-[10px] mb-2 font-medium tracking-wide">NAME</p>
                  <p className="text-white font-montserrat font-bold text-[20px] leading-tight">
                    {ticket.name}
                  </p>
                </div>

                {/* Inclus */}
                <div className="mb-4">
                  <p className="text-yellow-300 font-montserrat text-[10px] mb-2 font-medium tracking-wide">INCLUDES</p>
                  <p className="text-white font-montserrat font-bold text-[20px] leading-tight">
                    {ticket.includes}
                  </p>
                </div>

                {/* Prix */}
                <div className="mb-4">
                  <p className="text-yellow-300 font-montserrat text-[10px] mb-2 font-medium tracking-wide">PRICE</p>
                  <p className="text-white font-montserrat font-bold text-[20px]">
                    {ticket.price}
                  </p>
                </div>

                {/* Disponibilité */}
                <div>
                  <p className="text-yellow-300 font-montserrat text-[10px] mb-2 font-medium tracking-wide">AVAILABILITY</p>
                  <p className="text-white font-montserrat font-bold text-[20px]">
                    {ticket.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton Book Now */}
            <button 
              className="w-80 h-16 hover:opacity-90 transition-opacity flex items-center justify-center mt-3 bg-[#FBD37F]"
              style={{
             
                borderRadius: '0px'
              }}
            >
              <span className="text-black font-montserrat font-extrabold text-lg tracking-wide">
                BOOK NOW
              </span>
            </button>
          </div>
        ))}

        {/* Carte See More */}
        <div className="w-80 bg-blue-800/40 flex items-center justify-center"
             style={{
               height: 'calc(24rem + 4rem + 2.5rem)',
               backdropFilter: 'blur(8px)',
               WebkitBackdropFilter: 'blur(8px)'
             }}>
          <button className="text-white font-montserrat font-bold text-2xl hover:text-yellow-300 transition-colors">
            SEE MORE
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
     
    </div>
  );
}; 