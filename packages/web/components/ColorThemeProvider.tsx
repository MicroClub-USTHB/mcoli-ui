'use client';

import React, { createContext, useContext, useState } from 'react';
import { flushSync } from 'react-dom';

export type ThemePalette = 'primary' | 'secondary' | 'game-dev' | 'robotics' | 'it';

interface ThemeContextType {
  colorTheme: ThemePalette;
  setColorTheme: (theme: ThemePalette) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colorTheme: 'primary',
  setColorTheme: () => null,
});

export function ColorThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorThemeState] = useState<ThemePalette>(() => {
    if (typeof window === 'undefined') return 'primary';
    return (localStorage.getItem('mcoli-ui-color-theme') as ThemePalette) || 'primary';
  });

  const setColorTheme = (theme: ThemePalette) => {
    const apply = () => {
      flushSync(() => setColorThemeState(theme));
      localStorage.setItem('mcoli-ui-color-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    };

    // Crossfade the whole palette swap where the browser supports it.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion) {
      apply();
      return;
    }
    document.startViewTransition(apply);
  };

  // We always render the Provider to keep the React tree stable and prevent script injection errors
  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>{children}</ThemeContext.Provider>
  );
}

export const useColorTheme = () => useContext(ThemeContext);
