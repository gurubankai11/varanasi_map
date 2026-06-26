import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { type Place, VARANASI_PLACES } from '../constants/varanasiData';

interface SearchPanelProps {
  onSelectPlace: (place: Place) => void;
  onClear: () => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({ onSelectPlace, onClear }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Place[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = VARANASI_PLACES.filter(place =>
      place.name.toLowerCase().includes(query.toLowerCase()) ||
      place.category.toLowerCase().includes(query.toLowerCase()) ||
      place.description.toLowerCase().includes(query.toLowerCase()) ||
      (place.famousFor && place.famousFor.some(f => f.toLowerCase().includes(query.toLowerCase())))
    );

    setResults(filtered.slice(0, 6)); // cap results at 6 matches
  }, [query]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (place: Place) => {
    setQuery(place.name);
    setIsOpen(false);
    onSelectPlace(place);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    onClear();
  };

  const getCategoryColor = (category: string) => {
    if (category === 'ghats') return 'bg-orange-500/20 text-orange-400';
    if (category === 'temples') return 'bg-red-500/20 text-red-400';
    if (category === 'food') return 'bg-yellow-500/20 text-yellow-400';
    if (category === 'markets') return 'bg-blue-500/20 text-blue-400';
    return 'bg-teal-500/20 text-teal-400';
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md z-20">
      <div className="flex items-center w-full bg-slate-900/85 backdrop-blur-md border border-white/10 hover:border-orange-500/30 rounded-2xl p-3 shadow-glass transition duration-300">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search Ghats, Temples, Malaiyyo, Lassi..."
          className="bg-transparent border-none outline-none w-full text-sm text-white placeholder-gray-400"
        />
        {query && (
          <button onClick={handleClear} className="p-1 hover:bg-white/10 rounded-full transition">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown list */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glass overflow-hidden">
          <div className="py-2">
            {results.map(place => (
              <button
                key={place.id}
                onClick={() => handleSelect(place)}
                className="w-full flex items-start gap-3.5 px-4 py-3 hover:bg-white/5 text-left border-b border-white/5 last:border-0 transition"
              >
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div className="w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-sans font-bold text-sm text-white">{place.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getCategoryColor(place.category)}`}>
                      {place.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{place.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-lg border border-white/10 rounded-2xl shadow-glass p-4 text-center text-sm text-gray-400">
          No matches found for "{query}"
        </div>
      )}
    </div>
  );
};
export default SearchPanel;
