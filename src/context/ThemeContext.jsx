import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themesConfig = {
  cyber: {
    name: 'Professional Dark',
    primary: '#0b0f14',
    secondary: '#111820',
    accentBlue: '#2dd4bf',
    accentPurple: '#f4b860',
    accentNeon: '#84cc16',
    accentPink: '#fb7185',
    swatches: ['#2dd4bf', '#f4b860', '#84cc16'],
  },
  violet: {
    name: 'Quantum Violet',
    primary: '#040209',
    secondary: '#0c0816',
    accentBlue: '#a855f7',
    accentPurple: '#6366f1',
    accentNeon: '#ec4899',
    accentPink: '#3b82f6',
    swatches: ['#a855f7', '#6366f1', '#ec4899'],
  },
  amber: {
    name: 'Sunset Amber',
    primary: '#080400',
    secondary: '#140b00',
    accentBlue: '#f59e0b',
    accentPurple: '#f97316',
    accentNeon: '#eab308',
    accentPink: '#ef4444',
    swatches: ['#f59e0b', '#f97316', '#eab308'],
  },
  emerald: {
    name: 'Matrix Emerald',
    primary: '#010603',
    secondary: '#03140a',
    accentBlue: '#10b981',
    accentPurple: '#84cc16',
    accentNeon: '#06b6d4',
    accentPink: '#14b8a6',
    swatches: ['#10b981', '#84cc16', '#06b6d4'],
  },
  crimson: {
    name: 'Frozen Crimson',
    primary: '#080102',
    secondary: '#160306',
    accentBlue: '#e11d48',
    accentPurple: '#f43f5e',
    accentNeon: '#f97316',
    accentPink: '#ec4899',
    swatches: ['#e11d48', '#f43f5e', '#f97316'],
  },
  aqua: {
    name: 'Ocean Aqua',
    primary: '#02080c',
    secondary: '#05121b',
    accentBlue: '#0ea5e9',
    accentPurple: '#06b6d4',
    accentNeon: '#14b8a6',
    accentPink: '#6366f1',
    swatches: ['#0ea5e9', '#06b6d4', '#14b8a6'],
  },
  sakura: {
    name: 'Sakura Pink',
    primary: '#090205',
    secondary: '#15050b',
    accentBlue: '#ec4899',
    accentPurple: '#f43f5e',
    accentNeon: '#d946ef',
    accentPink: '#a855f7',
    swatches: ['#ec4899', '#f43f5e', '#d946ef'],
  },
  cyberpunk: {
    name: 'Cyberpunk Gold',
    primary: '#0c0c02',
    secondary: '#1a1a05',
    accentBlue: '#eab308',
    accentPurple: '#06b6d4',
    accentNeon: '#a855f7',
    accentPink: '#ec4899',
    swatches: ['#eab308', '#06b6d4', '#a855f7'],
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved && themesConfig[saved] ? saved : 'cyber';
  });

  useEffect(() => {
    // Set theme attribute on html node for CSS stylesheet variables
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const colors = themesConfig[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
