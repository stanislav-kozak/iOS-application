import '../global.css';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { AppProviders } from '@/shared/providers/app-providers';
import { fontAssets } from '@/shared/theme/fonts';
import { Toaster } from '@/shared/ui/toaster';
import { useThemeColors, useThemeMode } from '@/shared/theme/theme-provider';

void SplashScreen.preventAutoHideAsync();

function Shell() {
  const { resolved } = useThemeMode();
  const colors = useThemeColors();

  // Mounted only after fonts and saved preferences are ready, so the splash can go.
  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
      <Toaster />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  // On a font error we still start: the system font is a better outcome than a stuck splash.
  if (!fontsLoaded && !fontError) return null;

  return (
    <AppProviders>
      <Shell />
    </AppProviders>
  );
}
