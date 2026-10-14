import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithProviders } from '@/test/render-with-providers';
import { Button, type ButtonSize, type ButtonVariant } from './button';

const variants: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const sizes: ButtonSize[] = ['m', 's'];

describe('Button', () => {
  it.each(variants.flatMap((v) => sizes.map((s) => [v, s] as const)))('renders %s / %s', async (variant, size) => {
    await renderWithProviders(<Button variant={variant} size={size}>Save</Button>);
    expect(await screen.findByRole('button', { name: 'Save' })).toBeOnTheScreen();
  });

  it('calls onPress', async () => {
    const onPress = jest.fn();
    await renderWithProviders(<Button onPress={onPress}>Save</Button>);
    await fireEvent.press(await screen.findByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled, and reports the state', async () => {
    const onPress = jest.fn();
    await renderWithProviders(<Button disabled onPress={onPress}>Save</Button>);
    const button = await screen.findByRole('button');
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('while loading blocks onPress, is busy, and shows loadingText', async () => {
    const onPress = jest.fn();
    await renderWithProviders(<Button loading loadingText="Saving…" onPress={onPress}>Save</Button>);
    const button = await screen.findByRole('button');
    await fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeBusy();
    expect(screen.getByText('Saving…')).toBeOnTheScreen();
    expect(screen.queryByText('Save')).toBeNull();
    expect(screen.getByTestId('brand-mark', { includeHiddenElements: true })).toBeTruthy();
  });

  it('while loading without loadingText keeps the children', async () => {
    await renderWithProviders(<Button loading>Save</Button>);
    expect(await screen.findByText('Save')).toBeOnTheScreen();
  });
});
