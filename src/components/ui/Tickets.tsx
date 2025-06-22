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
    <div className="w-full h-full relative overflow-hidden">
      <style jsx>{`
        /* MacBook Air Responsive Styles */
        @media screen and (max-width: 1440px) and (max-height: 900px) {
          .tickets-header {
            left: 2% !important;
            top: 12% !important;
            font-size: 60px !important;
            line-height: 85% !important;
          }
          
          .tickets-container {
            top: 50% !important;
            gap: 1.5rem !important;
            padding: 0 1.5rem !important;
            padding-top: 8rem !important;
          }
          
          .ticket-card {
            width: 280px !important;
            height: 320px !important;
            padding: 1.5rem !important;
          }
          
          .ticket-header {
            font-size: 24px !important;
            margin-bottom: 1rem !important;
          }
          
          .ticket-label {
            font-size: 9px !important;
            margin-bottom: 0.5rem !important;
          }
          
          .ticket-value {
            font-size: 16px !important;
            margin-bottom: 1rem !important;
          }
          
          .ticket-button {
            width: 280px !important;
            height: 48px !important;
            margin-top: 0.75rem !important;
          }
          
          .ticket-button-text {
            font-size: 14px !important;
          }
          
          .see-more-card {
            width: 280px !important;
            height: calc(320px + 48px + 0.75rem) !important;
          }
          
          .see-more-text {
            font-size: 18px !important;
          }
        }

        /* MacBook Air 13" specific (1366x768) */
        @media screen and (max-width: 1366px) and (max-height: 768px) {
          .tickets-header {
            font-size: 50px !important;
            top: 8% !important;
          }
          
          .tickets-container {
            gap: 1rem !important;
            padding: 0 1rem !important;
            padding-top: 6rem !important;
          }
          
          .ticket-card {
            width: 240px !important;
            height: 280px !important;
            padding: 1.25rem !important;
          }
          
          .ticket-header {
            font-size: 20px !important;
          }
          
          .ticket-label {
            font-size: 8px !important;
          }
          
          .ticket-value {
            font-size: 14px !important;
          }
          
          .ticket-button {
            width: 240px !important;
            height: 44px !important;
          }
          
          .ticket-button-text {
            font-size: 12px !important;
          }
          
          .see-more-card {
            width: 240px !important;
            height: calc(280px + 44px + 0.75rem) !important;
          }
          
          .see-more-text {
            font-size: 16px !important;
          }
        }
      `}</style>

      {/* Titre principal */}
      <div 
        className="tickets-header absolute z-10 font-montserrat"
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
      <div className="tickets-container absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center gap-8 px-8 pt-40">
        {/* Tickets */}
        {tickets.map((ticket) => (
          <div key={ticket.id} className="flex flex-col gap-0">
            {/* Carte ticket */}
            <div 
              className="ticket-card w-80 h-96 p-8 flex flex-col hover:border-2 hover:border-white transition-all duration-100 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '0px'
              }}
            >
              {/* En-tête */}
              <div className="flex-1">
                <h3 className="ticket-header text-white font-montserrat font-bold text-[32px] mb-4">
                  VIEW TICKET
                </h3>
                
                {/* Nom */}
                <div className="mb-4">
                  <p className="ticket-label text-white/80 font-montserrat text-[10px] mb-2 font-medium tracking-wide">NAME</p>
                  <p className="ticket-value text-white font-montserrat font-bold text-[20px] leading-tight">
                    {ticket.name}
                  </p>
                </div>

                {/* Inclus */}
                <div className="mb-4">
                  <p className="ticket-label text-yellow-300 font-montserrat text-[10px] mb-2 font-medium tracking-wide">INCLUDES</p>
                  <p className="ticket-value text-white font-montserrat font-bold text-[20px] leading-tight">
                    {ticket.includes}
                  </p>
                </div>

                {/* Prix */}
                <div className="mb-4">
                  <p className="ticket-label text-yellow-300 font-montserrat text-[10px] mb-2 font-medium tracking-wide">PRICE</p>
                  <p className="ticket-value text-white font-montserrat font-bold text-[20px]">
                    {ticket.price}
                  </p>
                </div>

                {/* Disponibilité */}
                <div>
                  <p className="ticket-label text-yellow-300 font-montserrat text-[10px] mb-2 font-medium tracking-wide">AVAILABILITY</p>
                  <p className="ticket-value text-white font-montserrat font-bold text-[20px]">
                    {ticket.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton Book Now */}
            <button 
              className="ticket-button w-80 h-16 hover:opacity-90 transition-opacity flex items-center justify-center mt-3 bg-[#FBD37F]"
              style={{
             
                borderRadius: '0px'
              }}
            >
              <span className="ticket-button-text text-black font-montserrat font-extrabold text-lg tracking-wide">
                BOOK NOW
              </span>
            </button>
          </div>
        ))}

        {/* Carte See More */}
        <div className="see-more-card w-80 bg-blue-800/40 flex items-center justify-center"
             style={{
               height: 'calc(24rem + 4rem + 1rem)',
               backdropFilter: 'blur(8px)',
               WebkitBackdropFilter: 'blur(8px)'
             }}>
          <button className="see-more-text text-white font-montserrat font-bold text-2xl hover:text-yellow-300 transition-colors">
            SEE MORE
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
     
    </div>
  );
}; 