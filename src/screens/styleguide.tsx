import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslations } from 'use-intl';

import { useLocaleSetting } from '@/shared/i18n/locale-provider';
import { locales, themeModes, type ThemeMode } from '@/shared/storage/preferences';
import { useThemeMode } from '@/shared/theme/theme-provider';
import { colorNames, palette, shadows, themes, type ThemeName } from '@/shared/theme/tokens';

import { StyleguideComponents } from './styleguide-components';

const THEME_LABEL: Record<ThemeMode, 'themeSystem' | 'themeLight' | 'themeDark'> = {
  system: 'themeSystem',
  light: 'themeLight',
  dark: 'themeDark',
};

function Segment({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={`rounded-control border px-3 py-2 ${selected ? 'border-primary bg-primary' : 'border-border bg-card'}`}
    >
      <Text className={`text-body font-medium ${selected ? 'text-primary-foreground' : 'text-foreground'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

function PaletteBlock({ theme }: { theme: ThemeName }) {
  const t = useTranslations('styleguide');
  return (
    <View className="gap-2">
      <Text className="text-body font-medium text-foreground">
        {t(theme === 'light' ? 'lightPalette' : 'darkPalette')}
      </Text>
      <View className="flex-row flex-wrap gap-3">
        {colorNames.map((name) => (
          <View key={name} className="w-24 gap-1">
            <View
              className="h-12 rounded-control border border-border"
              style={{ backgroundColor: themes[theme][name] }}
            />
            <Text className="text-caption text-muted-foreground">{name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const paletteNames = Object.keys(palette) as (keyof typeof palette)[];
const paletteClass = {
  blue: 'bg-palette-blue',
  teal: 'bg-palette-teal',
  amber: 'bg-palette-amber',
  violet: 'bg-palette-violet',
  emerald: 'bg-palette-emerald',
  indigo: 'bg-palette-indigo',
  pink: 'bg-palette-pink',
  slate: 'bg-palette-slate',
} as const;

export function Styleguide() {
  const t = useTranslations('styleguide');
  const tc = useTranslations('common');
  const tl = useTranslations('shell.languages');
  const { mode, setMode } = useThemeMode();
  const { locale, setLocale } = useLocaleSetting();

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="gap-6 p-4 pb-12"
    >
      <Text className="text-display text-foreground">{t('title')}</Text>

      <View className="gap-3 rounded-card bg-card p-4" style={shadows.card}>
        <Text className="text-h2 text-foreground">{t('theme')}</Text>
        <View className="flex-row flex-wrap gap-2">
          {themeModes.map((m) => (
            <Segment key={m} label={tc(THEME_LABEL[m])} selected={mode === m} onPress={() => setMode(m)} />
          ))}
        </View>
        <Text className="text-h2 text-foreground">{t('language')}</Text>
        <View className="flex-row flex-wrap gap-2">
          {locales.map((l) => (
            <Segment key={l} label={tl(l)} selected={locale === l} onPress={() => setLocale(l)} />
          ))}
        </View>
      </View>

      <View className="gap-4 rounded-card bg-card p-4" style={shadows.card}>
        <Text className="text-h2 text-foreground">{t('colors')}</Text>
        <PaletteBlock theme="light" />
        <PaletteBlock theme="dark" />
        <View className="flex-row flex-wrap gap-3">
          {paletteNames.map((name) => (
            <View key={name} className="w-24 gap-1">
              <View className={`h-12 rounded-control ${paletteClass[name]}`} />
              <Text className="text-caption text-muted-foreground">palette-{name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="gap-3 rounded-card bg-card p-4" style={shadows.card}>
        <Text className="text-h2 text-foreground">{t('typography')}</Text>
        <Text className="text-display text-foreground">Display 32/40 · {t('sample')}</Text>
        <Text className="text-h1 text-foreground">H1 24/32 · {t('sample')}</Text>
        <Text className="text-h2 text-foreground">H2 18/26 · {t('sample')}</Text>
        <Text className="text-body text-foreground">Body 15/22 · {t('sample')}</Text>
        <Text className="text-body font-medium text-foreground">Body Medium 15/22 · {t('sample')}</Text>
        <Text className="text-caption text-muted-foreground">Caption 13/18 · {t('sample')}</Text>
        <Text className="text-money text-foreground">{t('money')}</Text>
        <Text className="text-money text-destructive">{t('moneyNegative')}</Text>
      </View>

      <View className="gap-4">
        <Text className="text-h2 text-foreground">{t('surfaces')}</Text>
        <View className="rounded-card bg-card p-4" style={shadows.card}>
          <Text className="text-body text-foreground">shadow-card</Text>
        </View>
        <View className="rounded-card bg-card p-4" style={shadows['card-raised']}>
          <Text className="text-body text-foreground">shadow-card-raised</Text>
        </View>
        <View className="rounded-card bg-card p-4" style={shadows.modal}>
          <Text className="text-body text-foreground">shadow-modal</Text>
        </View>
      </View>

      <StyleguideComponents />
    </ScrollView>
  );
}
