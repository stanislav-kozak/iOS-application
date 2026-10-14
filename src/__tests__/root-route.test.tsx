import { screen } from '@testing-library/react-native';

import HomeRoute from '@/app/index';
import { renderWithProviders } from '@/test/render-with-providers';

describe('root screen', () => {
  it('shows the app name', async () => {
    await renderWithProviders(<HomeRoute />);
    expect(await screen.findByText('CoinSaveKeeper')).toBeOnTheScreen();
  });

  it('links to the styleguide in development builds', async () => {
    await renderWithProviders(<HomeRoute />);
    expect(await screen.findByText('Styleguide')).toBeOnTheScreen();
  });

  describe('in a production build', () => {
    const original = (globalThis as { __DEV__?: boolean }).__DEV__;
    beforeEach(() => {
      (globalThis as { __DEV__?: boolean }).__DEV__ = false;
    });
    afterEach(() => {
      (globalThis as { __DEV__?: boolean }).__DEV__ = original;
    });

    it('hides the styleguide link', async () => {
      await renderWithProviders(<HomeRoute />);
      expect(await screen.findByText('CoinSaveKeeper')).toBeOnTheScreen();
      expect(screen.queryByText('Styleguide')).not.toBeOnTheScreen();
    });
  });
});
