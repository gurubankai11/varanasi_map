import React, { useState } from 'react';
import type { Place } from '../constants/varanasiData';
import { Compass, Landmark, UtensilsCrossed, Store, BookOpen, Star, Clock, Anchor, MapPin, ExternalLink, Phone, Navigation } from 'lucide-react';

interface CategoryDrawerProps {
  place: Place | null;
  onClose: () => void;
  onSetAsDestination: (place: Place) => void;
}

export const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  place,
  onClose,
  onSetAsDestination
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'tips'>('info');

  if (!place) return null;

  const getCategoryIcon = (category: string) => {
    const size = "w-5 h-5 text-orange-400";
    if (category === 'ghats') return <Compass className={size} />;
    if (category === 'temples') return <Landmark className={size} />;
    if (category === 'food') return <UtensilsCrossed className={size} />;
    if (category === 'markets') return <Store className={size} />;
    return <BookOpen className={size} />;
  };

  const getCategoryImageGradient = (category: string) => {
    if (category === 'ghats') return 'from-orange-500/30 to-amber-600/10';
    if (category === 'temples') return 'from-red-600/30 to-orange-600/10';
    if (category === 'food') return 'from-yellow-500/30 to-amber-600/10';
    if (category === 'markets') return 'from-blue-600/30 to-indigo-600/10';
    return 'from-teal-600/30 to-emerald-600/10';
  };

  return (
    <div className="glass-panel w-80 md:w-96 rounded-3xl shadow-glass flex flex-col overflow-hidden max-h-[85vh] transition-all duration-300">
      {/* Visual Header / Photo representation */}
      <div className={`relative h-44 bg-gradient-to-br ${getCategoryImageGradient(place.category)} flex items-end p-5 border-b border-white/5`}>
        <div className="absolute inset-0 bg-slate-950/40" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-gray-400 hover:text-white border border-white/10 transition"
        >
          ✕
        </button>

        <div className="relative z-10 space-y-1.5 w-full">
          <div className="flex items-center gap-1.5">
            {getCategoryIcon(place.category)}
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400">
              {place.category}
            </span>
          </div>
          <h2 className="font-display font-black text-xl md:text-2xl text-white leading-tight">
            {place.name}
          </h2>
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-white font-mono">{place.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400 font-mono text-[10px]">{place.openingHours || 'Open 24 hrs'}</span>
          </div>
        </div>
      </div>

      {/* Tabs list */}
      <div className="grid grid-cols-3 border-b border-white/10 text-xs font-semibold bg-white/5">
        {(['info', 'history', 'tips'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-center transition capitalize tracking-wide ${
              activeTab === tab 
                ? 'border-b-2 border-orange-500 text-orange-400 bg-orange-500/5' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'info' ? 'Overview' : tab === 'tips' ? 'Visitor Tips' : 'Cultural History'}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Contents */}
      <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs text-gray-300 leading-relaxed scrollbar-thin">
        {activeTab === 'info' && (
          <div className="space-y-4">
            <p className="font-medium text-white text-sm">{place.description}</p>
            
            {/* Ghat special fields */}
            {place.category === 'ghats' && (
              <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-4.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-orange-400">
                    <Anchor className="w-4 h-4" />
                    <span>River Telemetry</span>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-extrabold ${place.boatAvailable ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {place.boatAvailable ? 'Boats Docked' : 'No Boats'}
                  </span>
                </div>
                {place.gangaAartiTime && (
                  <div>
                    <span className="text-[10px] text-gray-400 block font-semibold">Evening Ganga Aarti</span>
                    <p className="font-mono text-gray-200 mt-0.5 font-bold">{place.gangaAartiTime}</p>
                  </div>
                )}
                {place.famousFor && (
                  <div>
                    <span className="text-[10px] text-gray-400 block font-semibold">Morning & Evening Views</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {place.famousFor.map((tag, i) => (
                        <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Temple special fields */}
            {place.category === 'temples' && place.dressGuidelines && (
              <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center gap-1.5 font-bold text-red-400">
                  <Clock className="w-4 h-4" />
                  <span>Darshan Guidelines</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold">Dress Code</span>
                  <p className="text-gray-300 mt-0.5">{place.dressGuidelines}</p>
                </div>
              </div>
            )}

            {/* Food special fields */}
            {place.category === 'food' && place.famousFor && (
              <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] text-yellow-400 block font-bold">Famous Specialities</span>
                <div className="flex flex-wrap gap-1.5">
                  {place.famousFor.map((item, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-bold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* General Address and contacts */}
            <div className="space-y-2.5 pt-2 border-t border-white/5 text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-[11px]">{place.address}</span>
              </div>
              {place.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-[11px] font-mono">{place.phone}</span>
                </div>
              )}
              {place.website && (
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
                  <a href={place.website} target="_blank" rel="noreferrer" className="text-[11px] text-orange-400 hover:underline flex items-center gap-1">
                    Official Portal <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3.5">
            <div>
              <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block mb-1">Cultural Significance</span>
              <p className="text-[11px] leading-relaxed text-gray-200">{place.history}</p>
            </div>
            {place.significance && (
              <div>
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block mb-1">Religious Context</span>
                <p className="text-[11px] leading-relaxed text-gray-300">{place.significance}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-3">
            <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block mb-1">Local Insights</span>
            {place.tips && place.tips.length > 0 ? (
              <ul className="list-disc pl-4 space-y-2 text-[11px] text-gray-300">
                {place.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            ) : (
              <ul className="list-disc pl-4 space-y-2 text-[11px] text-gray-300">
                <li>Best visited in the early morning for peaceful spiritual ambience.</li>
                <li>Haggle respectfully with local vendors or boat operators.</li>
                <li>Avoid carrying expensive belongings in dense crowd channels.</li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Travel Directions Button */}
      <div className="p-4 border-t border-white/10 bg-slate-900/60">
        <button
          onClick={() => onSetAsDestination(place)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-2xl text-xs font-bold text-white shadow-lg shadow-orange-500/25 transition duration-300"
        >
          <Navigation className="w-4 h-4 fill-white" />
          Navigate to {place.name}
        </button>
      </div>
    </div>
  );
};
export default CategoryDrawer;
