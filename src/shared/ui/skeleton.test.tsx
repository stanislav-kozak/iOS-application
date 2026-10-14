import { screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/test/render-with-providers';
import { LoadingRegion, Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders all four shapes', async () => {
    await renderWithProviders(
      <>
        <Skeleton shape="card" />
        <Skeleton shape="circle" />
        <Skeleton shape="row" />
        <Skeleton />
      </>,
    );
    for (const shape of ['card', 'circle', 'row', 'line']) {
      expect(await screen.findByTestId(`skeleton-${shape}`, { includeHiddenElements: true })).toBeTruthy();
    }
  });
});

describe('LoadingRegion', () => {
  it('is busy and carries a spoken label', async () => {
    await renderWithProviders(
      <LoadingRegion label="Loading wallets">
        <Skeleton />
      </LoadingRegion>,
    );
    expect(await screen.findByLabelText('Loading wallets')).toBeBusy();
  });
});
