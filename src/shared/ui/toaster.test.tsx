import { act, screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/test/render-with-providers';
import { notify, Toaster } from './toaster';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

async function mountToaster() {
  await renderWithProviders(<Toaster />);
  await act(async () => {
    await jest.advanceTimersByTimeAsync(50);
  });
}

describe('Toaster', () => {
  it('shows a notified message and hides it after 2500 ms', async () => {
    await mountToaster();
    expect(screen.queryByText('Saved')).toBeNull();

    await act(() => notify('Saved'));
    expect(screen.getByText('Saved')).toBeOnTheScreen();

    await act(() => {
      jest.advanceTimersByTime(2499);
    });
    expect(screen.getByText('Saved')).toBeOnTheScreen();

    await act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByText('Saved')).toBeNull();
  });

  it('a newer toast replaces the current one and restarts the timer', async () => {
    await mountToaster();
    await act(() => notify('First'));
    await act(() => {
      jest.advanceTimersByTime(2000);
    });
    await act(() => notify('Second'));
    expect(screen.queryByText('First')).toBeNull();
    await act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Second')).toBeOnTheScreen();
  });
});
