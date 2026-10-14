import { render, screen } from '@testing-library/react-native';

import HomeRoute from '@/app/index';

describe('root screen', () => {
  it('shows the app name', async () => {
    await render(<HomeRoute />);
    expect(screen.getByText('CoinSaveKeeper')).toBeOnTheScreen();
  });
});
