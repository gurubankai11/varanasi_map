import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { type Place, VARANASI_PLACES } from '../../constants/varanasiData';
import SacredSymbolOverlay from './SacredOverlay';
import FestivalEngine from '../festivals/FestivalEngine';

// Utility component to control map viewport (panning & zooming)
interface MapControllerProps {
  flyToTarget: [number, number] | null;
  zoomTarget?: number;
}

const MapController: React.FC<MapControllerProps> = ({ flyToTarget, zoomTarget = 15 }) => {
  const map = useMap();

  useEffect(() => {
    if (flyToTarget) {
      map.flyTo(flyToTarget, zoomTarget, {
        duration: 2.2,
        easeLinearity: 0.25
      });
    }
  }, [flyToTarget, zoomTarget, map]);

  return null;
};

// Custom category icons builder
const createCustomIcon = (category: Place['category'], isActive: boolean) => {
  const colors: Record<Place['category'], { base: string; border: string; glow: string }> = {
    ghats: { base: '#FF6F00', border: '#FFE082', glow: 'rgba(255,111,0,0.6)' },
    temples: { base: '#D84315', border: '#FFCC80', glow: 'rgba(216,67,21,0.6)' },
    food: { base: '#F59E0B', border: '#FEF3C7', glow: 'rgba(245,158,11,0.6)' },
    markets: { base: '#0D47A1', border: '#BBDEFB', glow: 'rgba(13,71,161,0.6)' },
    attractions: { base: '#0F766E', border: '#CCFBF1', glow: 'rgba(15,118,110,0.6)' }
  };

  const c = colors[category] || colors.attractions;
  const size = isActive ? '36px' : '26px';
  const innerSize = isActive ? '18px' : '12px';
  const glowShadow = isActive ? `box-shadow: 0 0 15px ${c.base}` : `box-shadow: 0 0 8px ${c.glow}`;

  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div class="relative flex items-center justify-center rounded-full transition-all duration-300" 
           style="width: ${size}; height: ${size}; background: ${c.base}; border: 2px solid ${c.border}; ${glowShadow}">
        <!-- Small inner white circle for vector elegance -->
        <div class="rounded-full bg-white opacity-90" style="width: ${innerSize}; height: ${innerSize};"></div>
      </div>
    `,
    iconSize: isActive ? [36, 36] : [26, 26],
    iconAnchor: isActive ? [18, 18] : [13, 13]
  });
};

// Simulated traffic congestion overlay on major Varanasi roads
const TRAFFIC_ROADS = [
  // Godowlia - Dashashwamedh Road
  { coords: [[25.3087, 83.0083], [25.3078, 83.0101]], level: 'red', name: 'Dashashwamedh Ghat Road' },
  // Luxa Road - Godowlia
  { coords: [[25.3082, 83.0016], [25.3087, 83.0083]], level: 'orange', name: 'Luxa Road' },
  // Sigra - Lahurabir Road
  { coords: [[25.3182, 82.9901], [25.3195, 83.0119]], level: 'red', name: 'Sigra-Lahurabir Main Road' },
  // Lanka - Assi Road
  { coords: [[25.2789, 83.0012], [25.2898, 83.0116]], level: 'green', name: 'Lanka-Assi Road' },
  // Cantt - Godowlia Connection
  { coords: [[25.3276, 82.9739], [25.3150, 82.9950], [25.3087, 83.0083]], level: 'orange', name: 'Cantt-Godowlia Road' }
];

const getTrafficColor = (level: string) => {
  if (level === 'red') return '#dc2626';     // Red: Congested
  if (level === 'orange') return '#ea580c';  // Orange: Moderate
  return '#16a34a';                          // Green: Clear
};

interface KashiMapProps {
  activeLayer: 'dark' | 'light' | 'satellite' | 'hybrid';
  activeCategory: string;
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  flyToTarget: [number, number] | null;
  activeRoute: [number, number][] | null;
  showTraffic: boolean;
  activeFestival: 'dev_deepawali' | 'mahashivratri' | 'holi' | null;
}

export const KashiMap: React.FC<KashiMapProps> = ({
  activeLayer,
  activeCategory,
  selectedPlace,
  onSelectPlace,
  flyToTarget,
  activeRoute,
  showTraffic,
  activeFestival
}) => {
  // Tile layer URIs
  const layers = {
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    hybrid: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  const attribution = {
    carto: '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>',
    esri: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  };

  // Filter places by current category
  const filteredPlaces = VARANASI_PLACES.filter(place => {
    if (activeCategory === 'all') return true;
    return place.category === activeCategory;
  });

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={[25.3176, 83.0062]} // Center at Varanasi
        zoom={14}
        zoomControl={false} // Disable to put custom controls in our premium layout
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* Core base map layer */}
        <TileLayer
          url={layers[activeLayer]}
          attribution={activeLayer === 'dark' || activeLayer === 'light' ? attribution.carto : attribution.esri}
          className={`${
            activeLayer === 'dark' 
              ? 'dark-map-tiles' 
              : activeLayer === 'light' 
                ? 'light-map-tiles' 
                : ''
          }`}
          maxZoom={19}
        />

        {/* If hybrid layer is active, overlay labels from Positron */}
        {activeLayer === 'hybrid' && (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
            attribution={attribution.carto}
            pane="shadowPane" // Renders labels on top of satellite imagery
          />
        )}

        {/* Map Controller for flying camera */}
        <MapController flyToTarget={flyToTarget} />

        {/* Sacred Sri Yantra / Trishul Overlay */}
        <SacredSymbolOverlay />

        {/* Cultural Festival Engine (Floating Ganga Diyas, etc) */}
        <FestivalEngine activeFestival={activeFestival} />

        {/* Live Traffic Overlay */}
        {showTraffic && 
          TRAFFIC_ROADS.map((road, idx) => (
            <Polyline
              key={idx}
              positions={road.coords as L.LatLngExpression[]}
              color={getTrafficColor(road.level)}
              weight={6}
              opacity={0.8}
            >
              <Tooltip sticky>
                <span className="font-sans text-xs text-black font-semibold">
                  Traffic on {road.name}: {road.level === 'red' ? 'Heavy Congestion' : road.level === 'orange' ? 'Moderate' : 'Clear'}
                </span>
              </Tooltip>
            </Polyline>
          ))
        }

        {/* Active Route drawing */}
        {activeRoute && (
          <>
            {/* Outer Glowing shadow line */}
            <Polyline
              positions={activeRoute}
              color="#FF6F00"
              weight={8}
              opacity={0.4}
            />
            {/* Inner primary route line (moving dash-array animation) */}
            <Polyline
              positions={activeRoute}
              color="#FF9933"
              weight={4.5}
              opacity={0.95}
              dashArray="12, 10"
              className="animate-[stroke-dashoffset_2s_linear_infinite]"
            />
          </>
        )}

        {/* Map Place Markers */}
        {filteredPlaces.map(place => {
          const isActive = selectedPlace?.id === place.id;
          return (
            <Marker
              key={place.id}
              position={place.coordinates}
              icon={createCustomIcon(place.category, isActive)}
              eventHandlers={{
                click: () => {
                  onSelectPlace(place);
                }
              }}
            >
              <Popup closeButton={false}>
                <div className="p-1 font-sans">
                  <h3 className="font-bold text-orange-400 text-sm leading-tight mb-0.5">{place.name}</h3>
                  <p className="text-xs text-gray-300 leading-normal line-clamp-2">{place.description}</p>
                  <p className="text-[10px] text-orange-200/70 mt-1 uppercase font-semibold tracking-wider">
                    Category: {place.category}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
export default KashiMap;
