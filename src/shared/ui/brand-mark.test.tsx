import AsyncStorage from '@react-native-async-storage/async-storage';
import { processColor } from 'react-native';
import { screen } from '@testing-library/react-native';

import { dark, light, palette } from '@/shared/theme/tokens';
import { renderWithProviders } from '@/test/render-with-providers';
import { BrandMark } from './brand-mark';

// react-native-svg turns color strings into native color objects.
const native = (color: string) => ({ type: 0, payload: (processColor(color) as number) >>> 0 });
const hidden = { includeHiddenElements: true };

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('BrandMark', () => {
  it.each(['static', 'intro', 'loop'] as const)('renders with motion %s', async (motion) => {
    await renderWithProviders(<BrandMark motion={motion} />);
    expect(await screen.findByTestId('brand-mark', hidden)).toBeTruthy();
    expect(screen.getByTestId('brand-mark-coin', hidden).props.fill).toEqual(native(palette.amber));
  });

  it('is hidden from accessibility', async () => {
    await renderWithProviders(<BrandMark />);
    await screen.findByTestId('brand-mark', hidden);
    expect(screen.queryByTestId('brand-mark')).toBeNull();
  });

  it('uses the primary-foreground stroke on primary surfaces', async () => {
    await renderWithProviders(<BrandMark tone="on-primary" />);
    const arc = await screen.findByTestId('brand-mark-arc', hidden);
    expect(arc.props.stroke).toEqual(native(light['primary-foreground']));
  });

  it('takes the dark primary token in the dark theme', async () => {
    await AsyncStorage.setItem('csk.theme-mode', 'dark');
    await renderWithProviders(<BrandMark />);
    const arc = await screen.findByTestId('brand-mark-arc', hidden);
    expect(arc.props.stroke).toEqual(native(dark.primary));
  });
});
