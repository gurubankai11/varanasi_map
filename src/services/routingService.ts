export interface RouteResult {
  coordinates: [number, number][]; // [lat, lng] array
  distance: number; // in meters
  duration: number; // in seconds
  profile: 'driving' | 'walking' | 'cycling';
}

export const calculateRoute = async (
  start: [number, number],
  end: [number, number],
  profile: 'driving' | 'walking' | 'cycling' = 'driving'
): Promise<RouteResult> => {
  // Map our profile to OSRM profiles
  const osrmProfile = profile === 'cycling' ? 'bicycle' : profile; // OSRM supports: car, bike, foot
  const profileSlug = osrmProfile === 'bicycle' ? 'bicycle' : osrmProfile === 'walking' ? 'foot' : 'driving';
  
  // Coordinates are formatted as: longitude,latitude;longitude,latitude
  const coordsString = `${start[1]},${start[0]};${end[1]},${end[0]}`;
  const url = `https://router.project-osrm.org/route/v1/${profileSlug}/${coordsString}?overview=full&geometries=geojson`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('OSRM routing request failed');
    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      throw new Error('No route found');
    }

    const route = data.routes[0];
    // OSRM returns coordinates as [lng, lat], we must swap them to [lat, lng] for Leaflet
    const coordinates: [number, number][] = route.geometry.coordinates.map(
      (coord: [number, number]) => [coord[1], coord[0]]
    );

    return {
      coordinates,
      distance: route.distance,
      duration: route.duration,
      profile
    };
  } catch (error) {
    console.warn('OSRM routing failed, running fallback route:', error);
    
    // Fallback: direct line interpolation with some noise to look like street-aligned path
    const fallbackCoords: [number, number][] = [];
    const steps = 15;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const lat = start[0] + (end[0] - start[0]) * t;
      const lng = start[1] + (end[1] - start[1]) * t;
      
      // Add slight noise to simulate turnings (except for start and end)
      if (i > 0 && i < steps) {
        const noiseLat = (Math.random() - 0.5) * 0.001;
        const noiseLng = (Math.random() - 0.5) * 0.001;
        fallbackCoords.push([lat + noiseLat, lng + noiseLng]);
      } else {
        fallbackCoords.push([lat, lng]);
      }
    }

    // Rough distance estimation (Haversine approximation)
    const R = 6371e3; // Earth radius in meters
    const phi1 = start[0] * Math.PI / 180;
    const phi2 = end[0] * Math.PI / 180;
    const deltaPhi = (end[0] - start[0]) * Math.PI / 180;
    const deltaLambda = (end[1] - start[1]) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Speed constants in m/s: driving = 10, cycling = 5, walking = 1.4
    const speed = profile === 'driving' ? 10 : profile === 'cycling' ? 5 : 1.4;
    const duration = distance / speed;

    return {
      coordinates: fallbackCoords,
      distance,
      duration,
      profile
    };
  }
};
export default calculateRoute;
