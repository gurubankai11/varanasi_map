import React, { useState, useEffect } from 'react';
import { Navigation, Bike, Footprints, Car, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { type Place, VARANASI_PLACES } from '../constants/varanasiData';
import { calculateRoute, type RouteResult } from '../services/routingService';

interface RoutePlannerProps {
  onRouteCalculated: (route: RouteResult | null) => void;
  onClear: () => void;
  selectedPlace: Place | null;
}

export const RoutePlanner: React.FC<RoutePlannerProps> = ({
  onRouteCalculated,
  onClear,
  selectedPlace
}) => {
  const [startId, setStartId] = useState<string>('cantt_railway_station');
  const [endId, setEndId] = useState<string>('');
  const [profile, setProfile] = useState<'driving' | 'walking' | 'cycling'>('driving');
  const [routeInfo, setRouteInfo] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync selected place from map clicks to destination
  useEffect(() => {
    if (selectedPlace) {
      setEndId(selectedPlace.id);
    }
  }, [selectedPlace]);

  // Trigger routing when start, end, or profile changes
  useEffect(() => {
    if (!startId || !endId) {
      setRouteInfo(null);
      onRouteCalculated(null);
      return;
    }

    const triggerRoute = async () => {
      setLoading(true);
      const startPlace = VARANASI_PLACES.find(p => p.id === startId);
      const endPlace = VARANASI_PLACES.find(p => p.id === endId);

      if (startPlace && endPlace) {
        try {
          const result = await calculateRoute(startPlace.coordinates, endPlace.coordinates, profile);
          setRouteInfo(result);
          onRouteCalculated(result);
        } catch (err) {
          console.error('Route calculation failed:', err);
        }
      }
      setLoading(false);
    };

    triggerRoute();
  }, [startId, endId, profile]);

  const handleSwap = () => {
    const temp = startId;
    setStartId(endId);
    setEndId(temp);
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.round(seconds / 60);
    if (mins < 60) return `${mins} mins`;
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hrs} hr ${remainingMins} mins`;
  };

  return (
    <div className="glass-panel p-5 rounded-2xl w-80 shadow-glass transition-all duration-300">
      <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-white/10">
        <Navigation className="w-5 h-5 text-orange-400 rotate-45" />
        <h4 className="font-display font-extrabold text-white text-base">Live Route Planner</h4>
      </div>

      <div className="space-y-3 relative">
        {/* Origin Selection */}
        <div>
          <label className="text-[9px] uppercase font-bold text-gray-400 block mb-1">Starting Point</label>
          <select
            value={startId}
            onChange={(e) => setStartId(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/35"
          >
            <option value="">Select origin...</option>
            {VARANASI_PLACES.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="absolute right-3 top-[34px] z-10">
          <button 
            onClick={handleSwap}
            disabled={!startId || !endId}
            className="p-1.5 bg-slate-900 border border-white/10 rounded-full hover:border-orange-500/30 text-gray-400 hover:text-white transition disabled:opacity-40"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 rotate-90" />
          </button>
        </div>

        {/* Destination Selection */}
        <div>
          <label className="text-[9px] uppercase font-bold text-gray-400 block mb-1">Destination</label>
          <select
            value={endId}
            onChange={(e) => setEndId(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500/35"
          >
            <option value="">Select destination...</option>
            {VARANASI_PLACES.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Travel Profile Selector tabs */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {(['driving', 'walking', 'cycling'] as const).map(mode => {
          const Icon = mode === 'driving' ? Car : mode === 'walking' ? Footprints : Bike;
          const isActive = profile === mode;
          return (
            <button
              key={mode}
              onClick={() => setProfile(mode)}
              className={`flex flex-col items-center gap-1 py-2 px-1.5 rounded-xl border text-[10px] font-bold capitalize transition ${
                isActive 
                  ? 'bg-orange-500/10 border-orange-500/35 text-orange-400' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {mode}
            </button>
          );
        })}
      </div>

      {/* Telemetry Output Details */}
      {loading && (
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
          <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          Tracing optimal route...
        </div>
      )}

      {!loading && routeInfo && (
        <div className="mt-4 bg-white/5 border border-white/5 rounded-xl p-3.5 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-[10px] text-gray-400">Travel Distance</p>
              <p className="font-mono font-bold text-sm text-white">{formatDistance(routeInfo.distance)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400">Estimated Duration</p>
              <p className="font-mono font-bold text-sm text-orange-400">{formatDuration(routeInfo.duration)}</p>
            </div>
          </div>

          <div className="flex items-start gap-2 border-t border-white/5 pt-2.5 text-[9px] text-gray-400">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
            <p>
              Congestion alerts & traffic constraints are computed dynamically via OSRM nodes.
            </p>
          </div>
        </div>
      )}

      {routeInfo && (
        <button
          onClick={() => {
            setEndId('');
            setRouteInfo(null);
            onClear();
          }}
          className="mt-3.5 w-full py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-xs font-semibold text-red-400 transition"
        >
          Clear Route
        </button>
      )}
    </div>
  );
};
export default RoutePlanner;
