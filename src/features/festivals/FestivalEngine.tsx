import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface DiyaData {
  id: number;
  lat: number;
  lng: number;
  speed: number;
  drift: number;
  phase: number;
}

interface FestivalEngineProps {
  activeFestival: 'dev_deepawali' | 'mahashivratri' | 'holi' | null;
}

export const FestivalEngine: React.FC<FestivalEngineProps> = ({ activeFestival }) => {
  const [diyas, setDiyas] = useState<DiyaData[]>([]);

  // Generate Ganga floating diyas for Dev Deepawali
  useEffect(() => {
    if (activeFestival !== 'dev_deepawali') {
      setDiyas([]);
      return;
    }

    // Ganga coordinate bounds from South (Assi) to North (Manikarnika/Scindia)
    // River longitude sits roughly around 83.012 to 83.020
    const count = 30;
    const initialDiyas: DiyaData[] = Array.from({ length: count }).map((_, idx) => {
      const latFraction = idx / count;
      return {
        id: idx,
        lat: 25.289 + latFraction * (25.315 - 25.289),
        lng: 83.013 + Math.sin(latFraction * Math.PI * 4) * 0.002 + (Math.random() - 0.5) * 0.001,
        speed: 0.00002 + Math.random() * 0.00003,
        drift: 0.00005 + Math.random() * 0.00005,
        phase: Math.random() * Math.PI * 2
      };
    });

    setDiyas(initialDiyas);

    // Animate diyas
    const interval = setInterval(() => {
      setDiyas(prevDiyas =>
        prevDiyas.map(diya => {
          // Ganga flows from South to North in Kashi (latitude increases)
          let newLat = diya.lat + diya.speed;
          // Sine wave oscillation for river currents
          const newPhase = diya.phase + 0.05;
          let newLng = diya.lng + Math.sin(newPhase) * 0.00004;

          // Reset if it flows past the northern bounds
          if (newLat > 25.320) {
            newLat = 25.289;
            newLng = 83.013 + (Math.random() - 0.5) * 0.002;
          }

          return {
            ...diya,
            lat: newLat,
            lng: newLng,
            phase: newPhase
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [activeFestival]);

  if (!activeFestival) return null;

  // Custom icon for floating Diya (glowing gold cup)
  const diyaIcon = L.divIcon({
    className: 'custom-diya-icon',
    html: `
      <div class="relative w-5 h-5 flex items-center justify-center diya-floating">
        <!-- Floating flame glow shadow -->
        <div class="absolute inset-0 rounded-full bg-orange-500/40 blur-md animate-pulse"></div>
        <!-- Diya leaf structure -->
        <svg viewBox="0 0 24 24" class="w-5 h-5 drop-shadow-[0_0_5px_rgba(255,165,0,0.9)]">
          <!-- Leaf bowl -->
          <path d="M 12,23 C 6,21 2,16 2,12 C 2,8 6,6 12,10 C 18,6 22,8 22,12 C 22,16 18,21 12,23 Z" fill="#4caf50" />
          <!-- Terracotta base -->
          <path d="M 12,21 C 8,20 5,16 5,13 C 5,10 8,11 12,13 C 16,11 19,10 19,13 C 19,16 16,20 12,21 Z" fill="#a73a15" />
          <!-- Flame -->
          <path d="M 12,13 C 12,13 9,9 12,3 C 15,9 12,13 12,13 Z" fill="#ffb300" class="animate-pulse" />
          <path d="M 12,12 C 12,12 10.5,10 12,6 C 13.5,10 12,12 12,12 Z" fill="#e65100" />
        </svg>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  return (
    <>
      {/* Dev Deepawali: Floating Diyas */}
      {activeFestival === 'dev_deepawali' &&
        diyas.map(diya => (
          <Marker 
            key={diya.id} 
            position={[diya.lat, diya.lng]} 
            icon={diyaIcon}
            interactive={false}
          />
        ))
      }

      {/* Holi theme border splash indicator */}
      {activeFestival === 'holi' && (
        <div className="pointer-events-none fixed inset-0 z-40">
          <div className="absolute top-0 left-0 w-64 h-64 opacity-25 bg-[radial-gradient(circle,rgba(233,30,99,0.4)_0%,rgba(0,0,0,0)_70%)]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <div className="absolute bottom-0 right-0 w-64 h-64 opacity-25 bg-[radial-gradient(circle,rgba(255,193,7,0.4)_0%,rgba(0,0,0,0)_70%)]" style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }} />
          <div className="absolute top-0 right-0 w-64 h-64 opacity-25 bg-[radial-gradient(circle,rgba(0,188,212,0.4)_0%,rgba(0,0,0,0)_70%)]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
        </div>
      )}
    </>
  );
};
export default FestivalEngine;
