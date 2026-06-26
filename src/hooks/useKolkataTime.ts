import { useState, useEffect } from 'react';

export type TimeCycle = 'sunrise' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'aarti' | 'night';

export interface ThemeConfig {
  cycle: TimeCycle;
  name: string;
  description: string;
  themeClass: string;
  gradient: string;
  bgHex: string;
  textMuted: string;
  ambientSoundDesc: string;
  mapStyle: 'dark' | 'light';
  glowColor: string;
}

export const THEME_CONFIGS: Record<TimeCycle, ThemeConfig> = {
  sunrise: {
    cycle: 'sunrise',
    name: 'Subah-e-Banaras (Sunrise)',
    description: 'Golden mist ascends from the Ganga. Temple bells chime softly in the fresh morning breeze.',
    themeClass: 'theme-sunrise',
    gradient: 'from-amber-700/30 via-orange-900/10 to-[#050508]',
    bgHex: '#080503',
    textMuted: 'text-amber-200/60',
    ambientSoundDesc: 'Soft temple bells & birds chirping',
    mapStyle: 'dark',
    glowColor: 'rgba(255, 145, 0, 0.4)'
  },
  morning: {
    cycle: 'morning',
    name: 'Vedic Morning',
    description: 'Crisp morning rays illuminate the bathing ghats and devotees reciting prayers.',
    themeClass: 'theme-morning',
    gradient: 'from-blue-950/20 via-sky-950/5 to-[#050508]',
    bgHex: '#040608',
    textMuted: 'text-sky-200/50',
    ambientSoundDesc: 'Vedic chants & flowing water',
    mapStyle: 'light',
    glowColor: 'rgba(56, 189, 248, 0.3)'
  },
  midday: {
    cycle: 'midday',
    name: 'Midday Shimmer',
    description: 'Strong, divine solar rays cover the historic markets and winding alleyways.',
    themeClass: 'theme-midday',
    gradient: 'from-yellow-950/20 via-amber-950/5 to-[#050508]',
    bgHex: '#080805',
    textMuted: 'text-yellow-100/50',
    ambientSoundDesc: 'Bustling alley murmurs & distant horns',
    mapStyle: 'light',
    glowColor: 'rgba(234, 179, 8, 0.2)'
  },
  afternoon: {
    cycle: 'afternoon',
    name: 'Warm Afternoon',
    description: 'Amber shades slide down sandstone minarets as the bazaar activities peak.',
    themeClass: 'theme-afternoon',
    gradient: 'from-amber-950/20 via-[#0d0905]/10 to-[#050508]',
    bgHex: '#070503',
    textMuted: 'text-amber-200/50',
    ambientSoundDesc: 'Market merchants & distant boat engine',
    mapStyle: 'light',
    glowColor: 'rgba(245, 158, 11, 0.3)'
  },
  evening: {
    cycle: 'evening',
    name: 'Sandhya (Sunset Golden Hour)',
    description: 'The sky shifts to crimson and brass. Heavy crowds gather on the steps of Dashashwamedh.',
    themeClass: 'theme-evening',
    gradient: 'from-rose-950/30 via-orange-950/10 to-[#050508]',
    bgHex: '#090503',
    textMuted: 'text-orange-200/60',
    ambientSoundDesc: 'Aarti preparations & gathering crowds',
    mapStyle: 'dark',
    glowColor: 'rgba(244, 63, 94, 0.4)'
  },
  aarti: {
    cycle: 'aarti',
    name: 'Maha Ganga Aarti',
    description: 'Sacred fire lamps wave in synchronization. Thousands of oil diyas float down the river.',
    themeClass: 'theme-aarti',
    gradient: 'from-orange-700/30 via-saffron-950/15 to-[#050508]',
    bgHex: '#0c0702',
    textMuted: 'text-orange-300/70',
    ambientSoundDesc: 'Har Har Gange chants & shells blowing',
    mapStyle: 'dark',
    glowColor: 'rgba(255, 111, 0, 0.7)'
  },
  night: {
    cycle: 'night',
    name: 'Kashi of the Moon (Night)',
    description: 'Moonlight bounces off the quiet ripples of the Ganga. Temples glow in deep silence.',
    themeClass: 'theme-night',
    gradient: 'from-indigo-950/25 via-slate-950/5 to-[#050508]',
    bgHex: '#04040a',
    textMuted: 'text-indigo-200/50',
    ambientSoundDesc: 'Cracking pyres & river waves washing',
    mapStyle: 'dark',
    glowColor: 'rgba(99, 102, 241, 0.3)'
  }
};

export const getKolkataHour = (): number => {
  // Compute local hour in Asia/Kolkata (UTC +5.5)
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const nd = new Date(utc + 3600000 * 5.5);
  return nd.getHours();
};

export const getKolkataTimeFormatted = (): string => {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const nd = new Date(utc + 3600000 * 5.5);
  return nd.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const getCycleFromHour = (hour: number): TimeCycle => {
  if (hour >= 5 && hour < 7) return 'sunrise';
  if (hour >= 7 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 15) return 'midday';
  if (hour >= 15 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 18.5) return 'evening';
  if (hour >= 18.5 && hour < 20) return 'aarti'; // 6:30 PM - 8:00 PM
  return 'night';
};

export const useKolkataTime = () => {
  const [currentHour, setCurrentHour] = useState<number>(getKolkataHour());
  const [overrideCycle, setOverrideCycle] = useState<TimeCycle | null>(null);
  const [formattedTime, setFormattedTime] = useState<string>(getKolkataTimeFormatted());

  useEffect(() => {
    const timer = setInterval(() => {
      if (!overrideCycle) {
        setCurrentHour(getKolkataHour());
      }
      setFormattedTime(getKolkataTimeFormatted());
    }, 1000);

    return () => clearInterval(timer);
  }, [overrideCycle]);

  const activeCycle = overrideCycle || getCycleFromHour(currentHour);
  const activeTheme = THEME_CONFIGS[activeCycle];

  const handleOverride = (cycle: TimeCycle | null) => {
    setOverrideCycle(cycle);
    if (cycle) {
      // Set dummy hours matching that cycle
      const hourMapping: Record<TimeCycle, number> = {
        sunrise: 6,
        morning: 9,
        midday: 12,
        afternoon: 16,
        evening: 18,
        aarti: 19,
        night: 22
      };
      setCurrentHour(hourMapping[cycle]);
    } else {
      setCurrentHour(getKolkataHour());
    }
  };

  return {
    hour: currentHour,
    timeString: formattedTime,
    activeCycle,
    activeTheme,
    handleOverride,
    isOverridden: overrideCycle !== null
  };
};
