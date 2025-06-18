'use client';

import React, { useState } from 'react';

interface Event {
  id: number;
  title: string;
  location: string;
  dateTime: string;
  type: string;
  snippet: string;
  image: string;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "FUTURE OF SILENCE INTERACTIVE INSTALLATIONS",
    location: "THE SILENCE GALLERY, HALL A",
    dateTime: "JUNE 22, 2025, 6:00 PM",
    type: "EXHIBITION",
    snippet: "EXPLORE MULTI-SENSORY EXPERIENCES BLENDING SOUND AND SILENCE",
    image: "/textures/footerimg.png"
  },
  {
    id: 2,
    title: "CUBIST REVOLUTION WORKSHOP",
    location: "THE SILENCE GALLERY, HALL B",
    dateTime: "JULY 15, 2025, 2:00 PM",
    type: "WORKSHOP",
    snippet: "QSDQSDQS",
    image: "/textures/cover-back.jpg"
  },
  {
    id: 3,
    title: "DIGITAL ART SYMPOSIUM",
    location: "TQSD",
    dateTime: "AUGUST 10, 2025, 10:00 AM",
    type: "CONFERENCE",
    snippet: "QSDQS",
    image: "/textures/page1.jpg"
  },
  {
    id: 4,
    title: "SILENT MEDITATION EXPERIENCE",
    location: "THE SILENCE GALLERY, QUIET ROOM",
    dateTime: "SEPTEMBER 5, 2025, 7:00 PM",
    type: "EXPERIENCE",
    snippet: "ZSDSQD",
    image: "/textures/page2.jpg"
  }
];

export const Events = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const currentEvent = mockEvents[currentEventIndex];
  const totalEvents = mockEvents.length;

  const handleNext = () => {
    setCurrentEventIndex((prev) => (prev + 1) % totalEvents);
  };

  const handleBack = () => {
    setCurrentEventIndex((prev) => (prev - 1 + totalEvents) % totalEvents);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#024076] to-[#0477DC] relative overflow-hidden">
      {/* Styles pour l'effet shine */}
      <style jsx>{`
        .shine-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shine-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.6s ease-in-out;
          z-index: 1;
        }
        
        .shine-effect:hover::before {
          left: 100%;
        }
        
        .shine-effect-yellow {
          position: relative;
          overflow: hidden;
        }
        
        .shine-effect-yellow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          transition: left 0.6s ease-in-out;
          z-index: 1;
        }
        
        .shine-effect-yellow:hover::before {
          left: 100%;
        }
        
        .shine-effect-dark {
          position: relative;
          overflow: hidden;
        }
        
        .shine-effect-dark::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.6s ease-in-out;
          z-index: 1;
        }
        
        .shine-effect-dark:hover::before {
          left: 100%;
        }
        
        .shine-effect span,
        .shine-effect-yellow span,
        .shine-effect-dark span {
          position: relative;
          z-index: 2;
        }
        
        .effect-5 {
          transition: all 0.2s linear 0s;
          position: relative;
          overflow: visible;
        }
        
        .effect-5::after {
          content: "→";
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          right: 0px;
          height: 100%;
          width: 30px;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50% 0 0 50%;
          transform: scale(0,1);
          transform-origin: right center;
          transition: all 0.2s linear 0s;
          color: black;
          font-weight: bold;
          z-index: 3;
        }
        
        .effect-5:hover {
          text-indent: -30px;
        }
        
        .effect-5:hover::after {
          transform: scale(1,1);
        }
        
        .effect-5-yellow {
          transition: all 0.2s linear 0s;
          position: relative;
          overflow: visible;
        }
        
        .effect-5-yellow::after {
          content: "←";
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          left: 0px;
          height: 100%;
          width: 30px;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 0 50% 50% 0;
          transform: scale(0,1);
          transform-origin: left center;
          transition: all 0.2s linear 0s;
          color: black;
          font-weight: bold;
          z-index: 3;
        }
        
        .effect-5-yellow:hover {
          text-indent: 30px;
        }
        
        .effect-5-yellow:hover::after {
          transform: scale(1,1);
        }
      `}</style>

      {/* Header */}
      <div 
        className="absolute z-10 font-montserrat"
        style={{
          width: '487px',
          height: '106px',
          top: '30%',
          left: '1.5%',
          fontStyle: 'normal',
          fontWeight: '800',
          fontSize: '64px',
          lineHeight: '83.21%',
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          background: 'conic-gradient(from 4.71deg at 39.29% 158.18%, #FFFFFF 0deg, #036FCD 360deg)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        DON'T MISS<br />
        OUR EVENTS.
      </div>

      {/* Event Counter */}
      <div className="absolute top-[30%] right-8 z-10 ">
        <div className="text-right">
          <span className="text-white text-[128px] font-bold leading-none font-montserrat">
            {String(currentEventIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-white/50 text-[64px] font-bold leading-none font-montserrat">
            /{String(totalEvents).padStart(2, '0')}
          </span>
        </div>
      </div>



      {/* Container for glassmorphism + buttons */}
      <div className="absolute left-8 bottom-16 flex flex-row gap-6">
        {/* Main Content - Glassmorphism Container */}
        <div 
          className="w-full max-w-[80%] h-120 flex flex-row items-end p-4 gap-6 isolate"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          {/* Event Image */}
          <div className="w-96 h-full bg-gray-800 relative overflow-hidden rounded flex-shrink-0">
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Details */}
          <div className="w-1/2 h-full flex flex-col items-start gap-6 flex-shrink-0">
            {/* Title */}
            <h2 className="text-white font-montserrat font-extrabold text-[48px] leading-tight tracking-tight uppercase">
              {currentEvent.title}
            </h2>

            {/* Details Container */}
            <div className="w-full flex flex-col items-start gap-2">
              {/* Location Row */}
              <div className="w-auto h-8 flex flex-row items-center">
                <div className="px-2 py-1 bg-[#FBD37F] flex items-center justify-center shine-effect-yellow">
                  <span className="font-montserrat font-extrabold text-[14px] tracking-tight uppercase text-blue-600">
                    LOCATION
                  </span>
                </div>
                <div className="flex-1 px-2 py-1 bg-white flex items-center justify-center shine-effect">
                  <span className="font-montserrat font-extrabold text-[14px] tracking-tight shine-effect uppercase text-black">
                    {currentEvent.location}
                  </span>
                </div>
                <button className="px-2 py-1 bg-black/50 flex items-center justify-center gap-2 hover:bg-black/70 transition-colors pointer-events-auto shine-effect-dark">
                  <span className="font-montserrat font-extrabold text-[14px] tracking-tight uppercase text-white">
                    VIEW ON MAP
                  </span>
                  <div className="w-4 h-4 text-[#FBD37F]">
                    <svg viewBox="0 0 18 18" fill="none" className="w-full h-full">
                      <path d="M9 4.5C7.62 4.5 6.5 5.62 6.5 7S7.62 9.5 9 9.5 11.5 8.38 11.5 7 10.38 4.5 9 4.5ZM9 8.5C8.17 8.5 7.5 7.83 7.5 7S8.17 5.5 9 5.5 10.5 6.17 10.5 7 9.83 8.5 9 8.5Z" fill="currentColor"/>
                      <path d="M9 1.5C6.24 1.5 4 3.74 4 6.5C4 10.88 9 16.5 9 16.5S14 10.88 14 6.5C14 3.74 11.76 1.5 9 1.5ZM9 15.35C7.85 13.95 5 10.31 5 6.5C5 4.29 6.79 2.5 9 2.5S13 4.29 13 6.5C13 10.31 10.15 13.95 9 15.35Z" fill="currentColor"/>
                    </svg>
                  </div>
                </button>
              </div>

              {/* Date & Time Row */}
              <div className="w-auto h-8 flex flex-row items-center">
                <div className="px-2 py-1 bg-[#FBD37F] flex items-center justify-center shine-effect-yellow">
                  <span className="font-montserrat font-extrabold text-[14px] tracking-tight uppercase text-blue-600">
                    DATE & TIME
                  </span>
                </div>
                <div className="flex-1 px-2 py-1 bg-white flex items-center justify-center shine-effect">
                  <span className="font-montserrat font-extrabold text-[14px] tracking-tight uppercase text-black">
                    {currentEvent.dateTime}
                  </span>
                </div>
                <button className="px-2 py-1 bg-black/50 flex items-center justify-center gap-2 hover:bg-black/70 transition-colors pointer-events-auto shine-effect-dark">
                  <span className="font-montserrat font-extrabold text-[14px] tracking-tight uppercase text-white">
                    ADD REMINDER
                  </span>
                  <div className="w-3 h-3 text-yellow-300">
                    <svg viewBox="0 0 14 14" fill="none" className="w-full h-full">
                      <path d="M7 1.75C4.38 1.75 2.25 3.88 2.25 6.5V7.875L1.75 8.375V9.625H3.5V10.5C3.5 10.81 3.75 11 4 11H10C10.25 11 10.5 10.81 10.5 10.5V9.625H12.25V8.375L11.75 7.875V6.5C11.75 3.88 9.62 1.75 7 1.75Z" fill="currentColor"/>
                    </svg>
                  </div>
                </button>
              </div>

              {/* Type Row */}
              <div className="w-auto h-8 flex flex-row items-center">
                <div className="px-2 py-1 bg-[#FBD37F] flex items-center justify-center shine-effect-yellow">
                  <span className="font-montserrat font-extrabold text-[14px] tracking-tight uppercase text-blue-600">
                    TYPE
                  </span>
                </div>
                <div className="flex-1 px-2 py-1 bg-white flex items-center justify-center shine-effect">
                  <span className="font-montserrat font-extrabold text-[14px] tracking-tight uppercase text-black">
                    {currentEvent.type}
                  </span>
                </div>
              </div>

              {/* Snippet Row */}
              <div className="w-full h-8 flex flex-row items-center">
                <div className="px-2 py-1 bg-[#FBD37F] flex items-center justify-center shine-effect-yellow">
                  <span className="font-montserrat font-extrabold text-[14px] tracking-tight uppercase text-blue-600">
                    SNIPPET
                  </span>
                </div>
                <div className="flex-1 px-2 py-1 bg-white flex items-start justify-start shine-effect">
                  <span className="font-montserrat font-extrabold text-[14px] tracking-tight uppercase text-black">
                    {currentEvent.snippet}
                  </span>
                </div>
              </div>
            </div>
          </div>

        {/* Navigation Buttons - Outside glassmorphism */}
      
      </div>
      <div className="flex flex-col justify-start gap-4">
          <button
            onClick={handleNext}
            className="w-auto bg-white text-black py-4 px-25 font-extrabold font-montserrat hover:bg-gray-100 transition-colors pointer-events-auto text-[24px]  effect-5"
          >
            <span>NEXT</span>
          </button>
          <button
            onClick={handleBack}
            className="w-auto bg-[#FBD37F] text-black py-4 px-8 font-extrabold font-montserrat hover:bg-yellow-400 transition-colors pointer-events-auto text-[24px]  effect-5-yellow"
          >
            <span>BACK</span>
          </button>
        </div>
    </div>
          

    </div>
  );
}; 