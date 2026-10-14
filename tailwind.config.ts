import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import { colorNames, fontFamily, overlay, palette, radii, typography } from './src/shared/theme/tokens';

const colors: Record<string, string> = { overlay };
for (const name of colorNames) colors[name] = `var(--${name})`;
colors['card-foreground'] = 'var(--foreground)';
for (const name of Object.keys(palette)) colors[`palette-${name}`] = `var(--palette-${name})`;

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      borderRadius: { card: `${radii.card}px`, control: `${radii.control}px` },
      fontFamily: { sans: [fontFamily.regular] },
    },
  },
  // Core shadow-* utilities are off: NativeWind mistranslates box-shadow, so shadows come from `shadows` in tokens.ts as style.
  corePlugins: { boxShadow: false, boxShadowColor: false },
  plugins: [
    // Typography tokens and font weights: one font family per weight (RN cannot synthesize weights).
    plugin(({ addUtilities }) => {
      const text: Record<string, Record<string, string>> = {};
      for (const [name, t] of Object.entries(typography)) {
        text[`.text-${name}`] = {
          fontSize: `${t.fontSize}px`,
          lineHeight: `${t.lineHeight}px`,
          fontFamily: fontFamily[t.weight],
          ...('tabularNums' in t ? { fontVariantNumeric: 'tabular-nums' } : {}),
        };
      }
      addUtilities(text);
      addUtilities({
        '.font-normal': { fontFamily: fontFamily.regular },
        '.font-medium': { fontFamily: fontFamily.medium },
        '.font-semibold': { fontFamily: fontFamily.semibold },
        '.font-bold': { fontFamily: fontFamily.bold },
      });
    }),
  ],
};

export default config;
