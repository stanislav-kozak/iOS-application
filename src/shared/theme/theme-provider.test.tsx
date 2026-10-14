import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, render, screen } from '@testing-library/react-native';
import * as ReactNative from 'react-native';
import { useEffect } from 'react';
import { Text } from 'react-native';

import { ThemeProvider, useThemeColors, useThemeMode } from './theme-provider';
import { dark, light } from './tokens';

const handle = { current: null as unknown as ReturnType<typeof useThemeMode> };

function Probe() {
  const api = useThemeMode();
  useEffect(() => {
    handle.current = api;
  });
  const colors = useThemeColors();
  return (
    <>
      <Text testID="mode">{api.mode}</Text>
      <Text testID="resolved">{api.resolved}</Text>
      <Text testID="background">{colors.background}</Text>
    </>
  );
}

const mount = () =>
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );

function mockSystemScheme(scheme: 'light' | 'dark') {
  jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue(scheme);
}

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.restoreAllMocks();
  mockSystemScheme('light');
});

describe('theme mode', () => {
  it('defaults to system and follows the system scheme', async () => {
    mockSystemScheme('dark');
    await mount();
    expect(await screen.findByTestId('mode')).toHaveTextContent('system');
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(screen.getByTestId('background')).toHaveTextContent(dark.background);
  });

  it('switching the mode changes the token colors', async () => {
    await mount();
    expect(await screen.findByTestId('background')).toHaveTextContent(light.background);
    await act(async () => handle.current.setMode('dark'));
    expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    expect(screen.getByTestId('background')).toHaveTextContent(dark.background);
    await act(async () => handle.current.setMode('light'));
    expect(screen.getByTestId('background')).toHaveTextContent(light.background);
  });

  it('an explicit mode wins over the system scheme', async () => {
    mockSystemScheme('dark');
    await mount();
    await screen.findByTestId('mode');
    await act(async () => handle.current.setMode('light'));
    expect(screen.getByTestId('resolved')).toHaveTextContent('light');
  });

  it('survives a restart', async () => {
    const first = await mount();
    await screen.findByTestId('mode');
    await act(async () => handle.current.setMode('dark'));
    await first.unmount();

    await mount();
    expect(await screen.findByTestId('mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('background')).toHaveTextContent(dark.background);
  });

  it('ignores a corrupt saved value', async () => {
    await AsyncStorage.setItem('csk.theme-mode', 'sepia');
    await mount();
    expect(await screen.findByTestId('mode')).toHaveTextContent('system');
  });
});
