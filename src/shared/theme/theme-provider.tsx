import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme, View } from 'react-native';
import { vars } from 'nativewind';

import {
  DEFAULT_THEME_MODE,
  loadThemeMode,
  saveThemeMode,
  type ThemeMode,
} from '@/shared/storage/preferences';
import { themes, themeVariables, type ThemeColors, type ThemeName } from './tokens';

type ThemeContextValue = {
  mode: ThemeMode;
  resolved: ThemeName;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type Props = { children: ReactNode };

/**
 * Holds the theme mode (system | light | dark), persists it, and applies the resolved theme
 * as CSS variables on a root view - the NativeWind equivalent of toggling `.dark` on web.
 * Renders nothing until the saved mode has been read, so there is no wrong-theme flash.
 */
export function ThemeProvider({ children }: Props) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(DEFAULT_THEME_MODE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    loadThemeMode().then((saved) => {
      if (!active) return;
      setModeState((current) => (current === DEFAULT_THEME_MODE ? saved : current));
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    void saveThemeMode(next);
  }, []);

  const resolved: ThemeName = mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;
  const value = useMemo(() => ({ mode, resolved, setMode }), [mode, resolved, setMode]);
  const rootStyle = useMemo(() => vars(themeVariables(resolved)), [resolved]);

  if (!hydrated) return null;

  return (
    <ThemeContext value={value}>
      <View style={[{ flex: 1 }, rootStyle]} testID="theme-root">
        {children}
      </View>
    </ThemeContext>
  );
}

export function useThemeMode(): ThemeContextValue {
  const value = use(ThemeContext);
  if (!value) throw new Error('useThemeMode must be used inside ThemeProvider');
  return value;
}

/** Raw token values of the resolved theme, for places where className does not work. */
export function useThemeColors(): ThemeColors {
  return themes[useThemeMode().resolved];
}
