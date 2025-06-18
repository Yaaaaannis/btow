'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Events } from './Events';
import { Tickets } from './Tickets';

interface FooterProps {
  isVisible: boolean;
}

type FooterSection = 'events' | 'tickets';

export const Footer = ({ isVisible }: FooterProps) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<FooterSection>('events');
  const eventsRef = useRef<HTMLDivElement>(null);
  const ticketsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      if (isVisible) {
        // Animation d'apparition progressive avec effet de masquage
        gsap.fromTo(footerRef.current,
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 2, 
            ease: "power3.out",
            // Animation en plusieurs étapes pour un effet plus dramatique
            onStart: () => {
              // D'abord faire apparaître le fond
              const backgroundEl = footerRef.current?.querySelector('.bg-gradient-to-b');
              if (backgroundEl) {
                gsap.fromTo(backgroundEl,
                  { opacity: 0 },
                  { opacity: 1, duration: 1.5, ease: "power3.out" }
                );
              }
              // Puis le contenu du footer
              const contentEl = footerRef.current?.querySelector('.absolute.bottom-0');
              if (contentEl) {
                gsap.fromTo(contentEl,
                  { opacity: 0, y: 50 },
                  { opacity: 1, y: 0, duration: 1.2, delay: 0.8, ease: "power3.out" }
                );
              }
            }
          }
        );
      } else {
        gsap.to(footerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power3.in"
        });
      }
    }
  }, [isVisible]);

  // Animation pour switcher entre les sections
  const switchToSection = (section: FooterSection) => {
    if (section === currentSection) return;

    const currentRef = currentSection === 'events' ? eventsRef.current : ticketsRef.current;
    const nextRef = section === 'events' ? eventsRef.current : ticketsRef.current;

    if (currentRef && nextRef) {
      // Timeline pour transition fluide simultanée
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentSection(section);
        }
      });
      
      // Préparer la position initiale de la prochaine section
      gsap.set(nextRef, { x: 100, opacity: 0 });
      
      // Transitions simultanées
      tl.to(currentRef, {
        opacity: 0,
        x: -100,
        duration: 0.5,
        ease: "power3.inOut"
      }, 0)
      .to(nextRef, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power3.inOut"
      }, 0); // Même timing pour un crossfade parfait
    }
  };

  return (
    <div 
      ref={footerRef}
      className="fixed inset-0 z-50 pointer-events-none select-none"
      style={{ opacity: 0 }}
    >
      {/* Fond pour masquer la scène */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Navigation Buttons */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
        <button
          onClick={() => switchToSection('events')}
          className={`px-6 py-3 font-montserrat font-bold text-sm uppercase transition-all duration-300 pointer-events-auto ${
            currentSection === 'events'
              ? 'bg-white text-black shadow-lg'
              : 'bg-black/50 text-white hover:bg-black/70'
          }`}
        >
          Events
        </button>
        <button
          onClick={() => switchToSection('tickets')}
          className={`px-6 py-3 font-montserrat font-bold text-sm uppercase transition-all duration-300 pointer-events-auto ${
            currentSection === 'tickets'
              ? 'bg-white text-black shadow-lg'
              : 'bg-black/50 text-white hover:bg-black/70'
          }`}
        >
          Tickets
        </button>
      </div>

      {/* Contenu du footer - sections superposées */}
      <div className="absolute inset-0">
        {/* Events section - toujours présente */}
        <div 
          ref={eventsRef} 
          className="absolute inset-0 w-full h-full"
          style={{ 
            opacity: currentSection === 'events' ? 1 : 0,
            pointerEvents: currentSection === 'events' ? 'auto' : 'none'
          }}
        >
          <Events />
        </div>
        
        {/* Tickets section - toujours présente */}
        <div 
          ref={ticketsRef} 
          className="absolute inset-0 w-full h-full"
          style={{ 
            opacity: currentSection === 'tickets' ? 1 : 0,
            pointerEvents: currentSection === 'tickets' ? 'auto' : 'none'
          }}
        >
          <Tickets />
        </div>
      </div>
    </div>
  );
}; 