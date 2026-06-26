import React from 'react';
import { Settings, Layers, Flame, RefreshCw, Key, ShieldAlert } from 'lucide-react';
import { type TimeCycle } from '../hooks/useKolkataTime';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeLayer: 'dark' | 'light' | 'satellite' | 'hybrid';
  onLayerChange: (layer: 'dark' | 'light' | 'satellite' | 'hybrid') => void;
  showTraffic: boolean;
  onTrafficToggle: () => void;
  timeCycle: TimeCycle;
  onTimeCycleOverride: (cycle: TimeCycle | null) => void;
  isTimeOverridden: boolean;
  activeFestival: 'dev_deepawali' | 'mahashivratri' | 'holi' | null;
  onFestivalChange: (fest: 'dev_deepawali' | 'mahashivratri' | 'holi' | null) => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  activeLayer,
  onLayerChange,
  showTraffic,
  onTrafficToggle,
  timeCycle,
  onTimeCycleOverride,
  isTimeOverridden,
  activeFestival,
  onFestivalChange
}) => {
  const mapLayers: { id: typeof activeLayer; label: string }[] = [
    { id: 'dark', label: 'Midnight Blue' },
    { id: 'light', label: 'Vedic Light' },
    { id: 'satellite', label: 'Satellite' },
    { id: 'hybrid', label: 'Hybrid' }
  ];

  const spiritualCycles: { id: TimeCycle; label: string }[] = [
    { id: 'sunrise', label: 'Sunrise' },
    { id: 'morning', label: 'Morning' },
    { id: 'midday', label: 'Midday' },
    { id: 'afternoon', label: 'Afternoon' },
    { id: 'evening', label: 'Sunset' },
    { id: 'aarti', label: 'Maha Aarti' },
    { id: 'night', label: 'Moon Night' }
  ];

  const festivals: { id: typeof activeFestival; label: string }[] = [
    { id: null, label: 'Standard Mode' },
    { id: 'dev_deepawali', label: 'Dev Deepawali (Diyas)' },
    { id: 'mahashivratri', label: 'Mahashivratri (Shiva)' },
    { id: 'holi', label: 'Holi Colors (Spring)' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-slate-950/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-30 flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-orange-400 animate-spin-slow" />
          <h3 className="font-display font-extrabold text-white text-lg">System Dashboard</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-xs font-semibold">
          Minimize
        </button>
      </div>

      <div className="space-y-6 flex-1 text-xs">
        {/* Layer Selection */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-gray-300 font-bold mb-1">
            <Layers className="w-4 h-4 text-orange-400" />
            <span>Map Imagery Layers</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {mapLayers.map(layer => (
              <button
                key={layer.id}
                onClick={() => onLayerChange(layer.id)}
                className={`py-2 px-1.5 rounded-xl border text-[10px] font-bold text-center transition ${
                  activeLayer === layer.id
                    ? 'bg-orange-500/10 border-orange-500/35 text-orange-400'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time-Based Overrides */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-gray-300 font-bold mb-1">
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-orange-400" />
              <span>Spiritual Time Cycles</span>
            </div>
            {isTimeOverridden && (
              <button
                onClick={() => onTimeCycleOverride(null)}
                className="text-[9px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-extrabold uppercase"
              >
                Reset Auto
              </button>
            )}
          </div>
          <p className="text-[10px] text-gray-400 leading-normal mb-2">
            Manually trigger Kashi's dynamic lighting cycles and soundscapes.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {spiritualCycles.map(cycle => (
              <button
                key={cycle.id}
                onClick={() => onTimeCycleOverride(cycle.id)}
                className={`py-2 px-1.5 rounded-xl border text-[10px] font-bold transition text-left pl-3 ${
                  timeCycle === cycle.id
                    ? 'bg-orange-500/10 border-orange-500/35 text-orange-400'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {cycle.label}
              </button>
            ))}
          </div>
        </div>

        {/* Festival Trigger */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-gray-300 font-bold mb-1">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Cultural Festival Overlay</span>
          </div>
          <div className="space-y-1.5">
            {festivals.map(fest => (
              <button
                key={fest.id as any}
                onClick={() => onFestivalChange(fest.id)}
                className={`w-full py-2.5 px-3.5 rounded-xl border text-[10px] font-bold text-left transition flex items-center justify-between ${
                  activeFestival === fest.id
                    ? 'bg-orange-500/10 border-orange-500/35 text-orange-400'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-400'
                }`}
              >
                <span>{fest.label}</span>
                {activeFestival === fest.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Live Traffic Toggle */}
        <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl p-3.5 mt-2">
          <div>
            <span className="font-bold text-gray-200">Traffic Congestion Layers</span>
            <p className="text-[9px] text-gray-400 mt-0.5">Toggle live flow rates of key junctions.</p>
          </div>
          <button
            onClick={onTrafficToggle}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
              showTraffic ? 'bg-orange-500' : 'bg-gray-800'
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                showTraffic ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Keys Section */}
        <div className="space-y-3 pt-3 border-t border-white/5 text-[10px] text-gray-400 leading-normal">
          <div className="flex items-center gap-1 text-gray-300 font-bold mb-1">
            <Key className="w-4 h-4 text-orange-400" />
            <span>Developer Keys (GIS Twins)</span>
          </div>
          <div className="space-y-2">
            <div>
              <label className="block mb-1 text-[9px] uppercase font-bold text-gray-400">Mapbox Access Token</label>
              <input
                type="password"
                placeholder="pk.eyJ1..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-gray-600 outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block mb-1 text-[9px] uppercase font-bold text-gray-400">Google Maps JS API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-gray-600 outline-none"
                disabled
              />
            </div>
          </div>
          <div className="flex items-start gap-1.5 text-[9px] bg-orange-500/5 p-2 rounded-xl border border-orange-500/10">
            <ShieldAlert className="w-4 h-4 text-orange-400 shrink-0" />
            <p>
              Out-of-the-box, Kashi resolves live coordinate structures using high-performance open-source OSM tiles. Standard API layers are mocked for safety.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsDrawer;
