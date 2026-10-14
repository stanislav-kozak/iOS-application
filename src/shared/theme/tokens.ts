/**
 * Single source of design tokens. Values mirror coin-save-app `src/app/globals.css`
 * (`:root`, `.dark`, `@theme inline`). Tailwind config, theme CSS variables and
 * places where className does not work (StatusBar, navigation theme, SVG) all read from here.
 */

import type { ViewStyle } from 'react-native';

export type ThemeName = 'light' | 'dark';

export const colorNames = [
  'primary',
  'primary-hover',
  'primary-foreground',
  'success',
  'warning',
  'caution',
  'destructive',
  'background',
  'card',
  'border',
  'foreground',
  'muted-foreground',
] as const;

export type ColorName = (typeof colorNames)[number];
export type ThemeColors = Record<ColorName, string>;

export const light: ThemeColors = {
  primary: '#f97350',
  'primary-hover': '#e55e3c',
  'primary-foreground': '#ffffff',
  success: '#16a34a',
  warning: '#eab308',
  caution: '#f97316',
  destructive: '#dc2626',
  background: '#fdfbf9',
  card: '#ffffff',
  border: '#e7e1db',
  foreground: '#1c1917',
  'muted-foreground': '#78716c',
};

export const dark: ThemeColors = {
  primary: '#fb8a65',
  'primary-hover': '#f97350',
  'primary-foreground': '#ffffff',
  success: '#4ade80',
  warning: '#facc15',
  caution: '#fb923c',
  destructive: '#f87171',
  background: '#1c1917',
  card: '#292524',
  border: '#3f3a35',
  foreground: '#f5f1ed',
  'muted-foreground': '#a8a29e',
};

export const themes: Record<ThemeName, ThemeColors> = { light, dark };

/** Icon/decor palette, identical in both themes. */
export const palette = {
  blue: '#3b82f6',
  teal: '#15bba3',
  amber: '#f59e0b',
  violet: '#8b5cf6',
  emerald: '#10b981',
  indigo: '#6366f1',
  pink: '#ec4999',
  slate: '#64748b',
} as const;

/** Modal backdrop: dark in both themes. */
export const overlay = 'rgba(28, 25, 23, 0.5)';

export const radii = { card: 16, control: 10 } as const;

/**
 * Shadows as React Native `boxShadow` values (same offsets, blurs and colors as the web
 * `--shadow-*` tokens). Apply with `style`: NativeWind cannot translate CSS box-shadow
 * to RN (it drops offsets and multiple layers), so there are no `shadow-*` classes.
 */
export const shadows = {
  card: {
    boxShadow: [
      { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(28, 25, 23, 0.04)' },
      { offsetX: 0, offsetY: 2, blurRadius: 8, color: 'rgba(28, 25, 23, 0.06)' },
    ],
  },
  'card-raised': {
    boxShadow: [{ offsetX: 0, offsetY: 4, blurRadius: 16, color: 'rgba(28, 25, 23, 0.12)' }],
  },
  modal: {
    boxShadow: [{ offsetX: 0, offsetY: 8, blurRadius: 32, color: 'rgba(28, 25, 23, 0.16)' }],
  },
} satisfies Record<string, ViewStyle>;

/** Font families registered by expo-font (see `fonts.ts`). */
export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export type FontWeightName = keyof typeof fontFamily;

export const typography = {
  display: { fontSize: 32, lineHeight: 40, weight: 'bold' },
  h1: { fontSize: 24, lineHeight: 32, weight: 'bold' },
  h2: { fontSize: 18, lineHeight: 26, weight: 'semibold' },
  body: { fontSize: 15, lineHeight: 22, weight: 'regular' },
  field: { fontSize: 16, lineHeight: 22, weight: 'regular' },
  caption: { fontSize: 13, lineHeight: 18, weight: 'regular' },
  money: { fontSize: 20, lineHeight: 26, weight: 'semibold', tabularNums: true },
} as const satisfies Record<
  string,
  { fontSize: number; lineHeight: number; weight: FontWeightName; tabularNums?: boolean }
>;

export type TypographyName = keyof typeof typography;

/** CSS variable name for a color token, e.g. `primary-hover` -> `--primary-hover`. */
export function cssVarName(name: ColorName | `palette-${keyof typeof palette}`): `--${string}` {
  return `--${name}`;
}

/** The CSS-variable map applied at the root for a given theme (replaces `.dark` on web). */
export function themeVariables(theme: ThemeName): Record<`--${string}`, string> {
  const result: Record<`--${string}`, string> = {};
  for (const name of colorNames) result[cssVarName(name)] = themes[theme][name];
  for (const [name, value] of Object.entries(palette)) {
    result[cssVarName(`palette-${name as keyof typeof palette}`)] = value;
  }
  return result;
}
