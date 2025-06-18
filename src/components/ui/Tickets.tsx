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
      {/* Header avec logos */}
      <div className="absolute top-8 left-8 z-10">
        <div className="text-white font-montserrat">
          <span className="text-lg font-normal">THE </span>
          <span className="text-lg font-light italic">Silence</span>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-10">
        <div className="text-white">
          <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
            <path d="M0 10L5 5L10 10L15 5L20 10L25 5L30 10L35 5L40 10L45 5L50 10L55 5L60 10" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <div className="text-xs mt-1 text-center">THE ON</div>
        </div>
      </div>

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
          color: 'white'
        }}
      >
        RESERVE<br />
        YOUR SPOT
      </div>

      {/* Conteneur des tickets */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex gap-6">
        {/* Tickets */}
        {tickets.map((ticket) => (
          <div key={ticket.id} className="flex flex-col gap-0">
            {/* Carte ticket */}
            <div 
              className={`w-64 h-80 p-6 flex flex-col justify-between ${
                ticket.isHighlighted 
                  ? 'bg-blue-600/40 border-2 border-white' 
                  : 'bg-blue-600/30'
              }`}
              style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            >
              {/* En-tête */}
              <div>
                <h3 className="text-white font-montserrat font-bold text-xl mb-6">
                  VIEW TICKET
                </h3>
                
                {/* Nom */}
                <div className="mb-4">
                  <p className="text-white/70 font-montserrat text-sm mb-1">NAME</p>
                  <p className="text-white font-montserrat font-bold text-lg">
                    {ticket.name}
                  </p>
                </div>

                {/* Inclus */}
                <div className="mb-4">
                  <p className="text-yellow-300 font-montserrat text-sm mb-1">INCLUDES</p>
                  <p className="text-white font-montserrat font-bold text-lg">
                    {ticket.includes}
                  </p>
                </div>

                {/* Prix */}
                <div className="mb-4">
                  <p className="text-yellow-300 font-montserrat text-sm mb-1">PRICE</p>
                  <p className="text-white font-montserrat font-bold text-3xl">
                    {ticket.price}
                  </p>
                </div>

                {/* Disponibilité */}
                <div>
                  <p className="text-yellow-300 font-montserrat text-sm mb-1">AVAILABILITY</p>
                  <p className="text-white font-montserrat font-bold text-lg">
                    {ticket.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton Book Now */}
            <button className="w-64 h-16 bg-[#FBD37F] hover:bg-yellow-400 transition-colors flex items-center justify-center">
              <span className="text-black font-montserrat font-extrabold text-xl">
                BOOK NOW
              </span>
            </button>
          </div>
        ))}

        {/* Carte See More */}
        <div className="w-64 h-96 bg-blue-800/40 flex items-center justify-center"
             style={{
               backdropFilter: 'blur(8px)',
               WebkitBackdropFilter: 'blur(8px)'
             }}>
          <button className="text-white font-montserrat font-bold text-2xl hover:text-yellow-300 transition-colors">
            SEE MORE
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 text-white text-right">
        <div className="text-4xl font-bold font-montserrat">0.25</div>
        <div className="text-sm font-light italic">scroll more</div>
      </div>
    </div>
  );
}; 