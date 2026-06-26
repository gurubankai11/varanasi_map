import React, { useState } from 'react';
import { useMapEvents, SVGOverlay } from 'react-leaflet';
import L from 'leaflet';

export const SacredSymbolOverlay: React.FC = () => {
  const [zoom, setZoom] = useState(12);
  const map = useMapEvents({
    zoom() {
      setZoom(map.getZoom());
    }
  });

  // Coordinate Bounds covering central Varanasi and the curves of the Ganga
  const bounds: L.LatLngBoundsExpression = [
    [25.265, 82.965],
    [25.370, 83.045]
  ];

  const getOpacity = () => {
    if (zoom <= 11) return 0.8;
    if (zoom >= 14) return 0;
    return 0.8 * (1 - (zoom - 11) / 3);
  };

  const opacity = getOpacity();

  if (opacity <= 0.005) return null;

  return (
    <SVGOverlay bounds={bounds} attributes={{ stroke: 'none' }}>
      <g 
        style={{ 
          opacity: opacity, 
          transition: 'opacity 0.3s linear',
          filter: 'drop-shadow(0 0 10px rgba(255, 111, 0, 0.7))'
        }}
      >
        {/* Outer Circular Rings */}
        <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#FF6F00" strokeWidth="6" strokeDasharray="10 5" />
        <circle cx="50%" cy="50%" r="39%" fill="none" stroke="#FF9933" strokeWidth="3" />
        
        {/* Sacred Trishul Outline (Geographically aligned) */}
        <path
          d="M 500,750 L 500,250 
             M 420,350 C 420,500 500,500 500,500 C 500,500 580,500 580,350
             M 400,320 L 420,350 L 440,320
             M 480,250 L 500,200 L 520,250
             M 560,320 L 580,350 L 600,320"
          fill="none"
          stroke="#FF9933"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(-250, -250) scale(1.5)"
        />

        {/* Lotus Petal Borders around the circle */}
        <circle cx="50%" cy="50%" r="30%" fill="none" stroke="#E65100" strokeWidth="1.5" />

        {/* Central Sri Yantra Triangles (futuristic geometric pattern) */}
        <polygon points="500,380 430,500 570,500" fill="none" stroke="#FF9933" strokeWidth="4" transform="translate(-250, -250) scale(1.5)" />
        <polygon points="500,520 430,400 570,400" fill="none" stroke="#FF6F00" strokeWidth="4" transform="translate(-250, -250) scale(1.5)" />
        <polygon points="500,350 450,470 550,470" fill="none" stroke="#FFCC80" strokeWidth="2.5" transform="translate(-250, -250) scale(1.5)" />
        <polygon points="500,550 450,430 550,430" fill="none" stroke="#E65100" strokeWidth="2.5" transform="translate(-250, -250) scale(1.5)" />
      </g>
    </SVGOverlay>
  );
};
export default SacredSymbolOverlay;
