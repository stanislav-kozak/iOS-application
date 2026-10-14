import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = { themeMode: 'csk.theme-mode', locale: 'csk.locale' } as const;

export type ThemeMode = 'system' | 'light' | 'dark';
export type Locale = 'en' | 'uk';

export const themeModes: readonly ThemeMode[] = ['system', 'light', 'dark'];
export const locales: readonly Locale[] = ['en', 'uk'];
export const DEFAULT_THEME_MODE: ThemeMode = 'system';
export const DEFAULT_LOCALE: Locale = 'en';

async function read<T extends string>(key: string, allowed: readonly T[], fallback: T): Promise<T> {
  try {
    const value = await AsyncStorage.getItem(key);
    return allowed.find((candidate) => candidate === value) ?? fallback;
  } catch {
    return fallback;
  }
}

async function write(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    // Persistence is best-effort: the in-memory choice still applies for this session.
  }
}

export const loadThemeMode = () => read(KEYS.themeMode, themeModes, DEFAULT_THEME_MODE);
export const saveThemeMode = (mode: ThemeMode) => write(KEYS.themeMode, mode);
export const loadLocale = () => read(KEYS.locale, locales, DEFAULT_LOCALE);
export const saveLocale = (locale: Locale) => write(KEYS.locale, locale);
