import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, screen } from '@testing-library/react-native';

import StyleguideRoute from '@/app/styleguide';
import { renderWithProviders } from '@/test/render-with-providers';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('styleguide', () => {
  it('renders the token sections', async () => {
    await renderWithProviders(<StyleguideRoute />);
    expect(await screen.findByText('Styleguide')).toBeOnTheScreen();
    expect(screen.getByText('Colors')).toBeOnTheScreen();
    expect(screen.getByText('Typography')).toBeOnTheScreen();
    expect(screen.getByText('Surfaces')).toBeOnTheScreen();
  });

  it('switches the language and persists the theme choice', async () => {
    await renderWithProviders(<StyleguideRoute />);
    fireEvent.press(await screen.findByText('Українська'));
    expect(await screen.findByText('Стайлгайд')).toBeOnTheScreen();
    fireEvent.press(screen.getByText('Темна тема'));
    expect(await AsyncStorage.getItem('csk.theme-mode')).toBe('dark');
    expect(await AsyncStorage.getItem('csk.locale')).toBe('uk');
  });
});
