import { useState, useEffect } from 'react';
import { Settings, Volume2, VolumeX, Sparkles, Clock, CloudSun, MapPin, Compass, Landmark, UtensilsCrossed, Store, BookOpen } from 'lucide-react';
import KashiMap from './features/maps/KashiMap';
import SpaceGlobe from './animations/SpaceGlobe';
import WelcomeOverlay from './components/WelcomeOverlay';
import SearchPanel from './components/SearchPanel';
import WeatherPanel from './components/WeatherPanel';
import RoutePlanner from './components/RoutePlanner';
import CategoryDrawer from './components/CategoryDrawer';
import SettingsDrawer from './components/SettingsDrawer';
import { useKolkataTime } from './hooks/useKolkataTime';
import { useWeather } from './hooks/useWeather';
import WeatherSystem from './features/weather/WeatherSystem';
import audioSynth from './utils/audioSynth';
import { type Place, VARANASI_PLACES } from './constants/varanasiData';
import { type RouteResult } from './services/routingService';

function App() {
  // Navigation Phases
  const [phase, setPhase] = useState<'space' | 'welcome' | 'live'>('space');

  // Mapping configurations
  const [activeLayer, setActiveLayer] = useState<'dark' | 'light' | 'satellite' | 'hybrid'>('dark');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [flyToTarget, setFlyToTarget] = useState<[number, number] | null>(null);
  const [activeRoute, setActiveRoute] = useState<[number, number][] | null>(null);
  
  // Feature panels toggles
  const [showTraffic, setShowTraffic] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeFestival, setActiveFestival] = useState<'dev_deepawali' | 'mahashivratri' | 'holi' | null>(null);

  // Soundscape
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Time & Weather Hooks
  const { timeString, activeCycle, activeTheme, handleOverride, isOverridden } = useKolkataTime();
  const weather = useWeather();

  // Keep map layer aligned with time of day maps requirements
  useEffect(() => {
    if (!isSettingsOpen) {
      // Auto toggle map styling based on day cycle
      setActiveLayer(activeTheme.mapStyle === 'dark' ? 'dark' : 'light');
    }
  }, [activeTheme, isSettingsOpen]);

  // Audio Pluck Toggle
  const handleAudioToggle = () => {
    const state = audioSynth.toggle();
    setIsAudioPlaying(state);
  };

  const handleWelcomeSelection = (choice: string) => {
    setPhase('live');
    audioSynth.start(); // Start peaceful soundscape automatically on entering
    setIsAudioPlaying(true);

    if (choice === 'skip') {
      setActiveCategory('all');
    } else if (choice === 'route') {
      setActiveCategory('all');
      // Trigger route panel open behavior by focusing default point
      const defaultPlace = VARANASI_PLACES.find(p => p.id === 'kashi_vishwanath');
      if (defaultPlace) {
        setSelectedPlace(defaultPlace);
        setFlyToTarget(defaultPlace.coordinates);
      }
    } else if (choice === 'festivals') {
      setActiveFestival('dev_deepawali');
      setActiveCategory('all');
      const aartiPlace = VARANASI_PLACES.find(p => p.id === 'dashashwamedh');
      if (aartiPlace) {
        setSelectedPlace(aartiPlace);
        setFlyToTarget(aartiPlace.coordinates);
      }
    } else {
      setActiveCategory(choice);
      // Pan to the first coordinates matching category
      const places = VARANASI_PLACES.filter(p => p.category === choice);
      if (places.length > 0) {
        setSelectedPlace(places[0]);
        setFlyToTarget(places[0].coordinates);
      }
    }
  };

  const selectPlaceFromMap = (place: Place) => {
    setSelectedPlace(place);
    setFlyToTarget(place.coordinates);
  };

  const selectPlaceFromSearch = (place: Place) => {
    setSelectedPlace(place);
    setFlyToTarget(place.coordinates);
  };

  const handleSetRouteAsDestination = (place: Place) => {
    // Zoom focus to place and trigger route planer dock mapping
    setSelectedPlace(place);
  };

  const handleRouteCalculated = (route: RouteResult | null) => {
    if (route) {
      setActiveRoute(route.coordinates);
      // Center map around the midpoint of path
      const midIdx = Math.floor(route.coordinates.length / 2);
      setFlyToTarget(route.coordinates[midIdx]);
    } else {
      setActiveRoute(null);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-[#050508]">
      {/* 1. THREE.JS SPACE GLOBE INITIAL LANDING */}
      {phase === 'space' && (
        <SpaceGlobe onArrival={() => setPhase('welcome')} />
      )}

      {/* 2. STAGGERED INTRO WELCOME DIALOG */}
      {phase === 'welcome' && (
        <WelcomeOverlay onSelect={handleWelcomeSelection} />
      )}

      {/* 3. CORE DIGITAL TWIN INTERFACE */}
      {phase === 'live' && (
        <div className="w-full h-full flex flex-col relative z-0">
          
          {/* Dynamic Sky Gradient Overlay based on Kolkata cycles */}
          <div className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-b ${activeTheme.gradient} transition-all duration-[2000ms]`} />

          {/* Fullscreen Climate Particles Canvas Overlay */}
          <WeatherSystem weather={weather} timeCycle={activeCycle} />

          {/* HEADER BAR */}
          <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-slate-950/40 backdrop-blur-md border-b border-white/5 shadow-md">
            {/* Title & Slogan */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-saffron flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-black text-lg md:text-xl text-white tracking-wide uppercase">
                  Kashi <span className="text-orange-400">Twin</span>
                </h1>
                <p className="text-[10px] text-gray-400 font-sans tracking-widest uppercase">
                  Living Digital Twin of Varanasi
                </p>
              </div>
            </div>

            {/* Live Clock / Spiritual Clock Indicator */}
            <div className="hidden md:flex items-center gap-6 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <div>
                  <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-wider">Kolkata Time</span>
                  <span className="font-mono font-bold">{timeString}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-sky-400" />
                <div>
                  <span className="text-[9px] text-gray-400 block font-bold uppercase tracking-wider">Telemetry Weather</span>
                  <span className="font-mono font-bold">{weather.temp}°C, {weather.conditionLabel}</span>
                </div>
              </div>

              {/* Active Cycle Badge */}
              <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-200/80 font-bold uppercase text-[9px] tracking-widest pulse-glow-saffron">
                {activeTheme.name}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex items-center gap-2">
              {/* Web Audio Tanpura Synth trigger */}
              <button
                onClick={handleAudioToggle}
                className={`p-2.5 rounded-xl border transition-all duration-300 ${
                  isAudioPlaying
                    ? 'bg-orange-500/10 border-orange-500/35 text-orange-400'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-400'
                }`}
                title="Toggle Tanpura Drone Meditation Ambient"
              >
                {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white transition"
                title="Open Settings Drawer"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* DOCK BAR FOR CATEGORIES */}
          <div className="relative z-20 flex justify-center py-3 bg-slate-950/20 border-b border-white/5">
            <div className="flex gap-2.5 overflow-x-auto px-4 max-w-full scrollbar-none">
              {[
                { id: 'all', label: 'All Places', icon: MapPin },
                { id: 'ghats', label: 'Ghats', icon: Compass },
                { id: 'temples', label: 'Temples', icon: Landmark },
                { id: 'food', label: 'Food Explorer', icon: UtensilsCrossed },
                { id: 'markets', label: 'Markets', icon: Store },
                { id: 'attractions', label: 'Attractions', icon: BookOpen }
              ].map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSelectedPlace(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25' 
                        : 'bg-slate-900/70 border border-white/5 hover:border-white/15 text-gray-300 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN MAP CONTAINER AND FLOATING INTERFACE */}
          <div className="flex-1 w-full relative z-0">
            {/* The Heart of the Experience: Real GIS Interactive Leaflet Map */}
            <KashiMap
              activeLayer={activeLayer}
              activeCategory={activeCategory}
              selectedPlace={selectedPlace}
              onSelectPlace={selectPlaceFromMap}
              flyToTarget={flyToTarget}
              activeRoute={activeRoute}
              showTraffic={showTraffic}
              activeFestival={activeFestival}
            />

            {/* Left Side: Floating Detail Info Cards */}
            {selectedPlace && (
              <div className="absolute top-6 left-6 z-20 max-w-sm">
                <CategoryDrawer
                  place={selectedPlace}
                  onClose={() => setSelectedPlace(null)}
                  onSetAsDestination={handleSetRouteAsDestination}
                />
              </div>
            )}

            {/* Right Side: Autocomplete Search, Weather stats, and Route planners */}
            <div className="absolute top-6 right-6 z-20 flex flex-col gap-4 items-end max-w-sm pointer-events-none">
              {/* Search Panel (Interactive) */}
              <div className="pointer-events-auto w-full">
                <SearchPanel 
                  onSelectPlace={selectPlaceFromSearch} 
                  onClear={() => {
                    setSelectedPlace(null);
                    setFlyToTarget(null);
                  }}
                />
              </div>

              {/* Weather Indicators Panel */}
              <div className="pointer-events-auto">
                <WeatherPanel weather={weather} />
              </div>

              {/* OSRM Route Planners Dock */}
              <div className="pointer-events-auto">
                <RoutePlanner
                  onRouteCalculated={handleRouteCalculated}
                  onClear={() => {
                    setActiveRoute(null);
                    setFlyToTarget(null);
                  }}
                  selectedPlace={selectedPlace}
                />
              </div>
            </div>

            {/* Dynamic Time Description Widget in Bottom Left */}
            <div className="absolute bottom-6 left-6 z-15 glass-panel py-3 px-4 rounded-xl max-w-xs pointer-events-none hidden md:block">
              <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">Banaras Cycle Ambience</span>
              <p className="text-xs text-gray-200 mt-0.5 leading-relaxed">
                {activeTheme.description}
              </p>
              <span className="text-[9px] text-gray-400 font-mono italic block mt-1.5">
                Soundscape: {activeTheme.ambientSoundDesc}
              </span>
            </div>
          </div>

          {/* OVERRIDES SETTINGS DRAWER */}
          <SettingsDrawer
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
            showTraffic={showTraffic}
            onTrafficToggle={() => setShowTraffic(!showTraffic)}
            timeCycle={activeCycle}
            onTimeCycleOverride={handleOverride}
            isTimeOverridden={isOverridden}
            activeFestival={activeFestival}
            onFestivalChange={setActiveFestival}
          />
        </div>
      )}
    </div>
  );
}

export default App;
