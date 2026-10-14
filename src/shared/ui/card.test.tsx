import { StyleSheet, Text } from 'react-native';
import { screen } from '@testing-library/react-native';

import { shadows } from '@/shared/theme/tokens';
import { renderWithProviders } from '@/test/render-with-providers';
import { Card } from './card';

describe('Card', () => {
  it('renders children with the card shadow token and merges the caller style', async () => {
    await renderWithProviders(
      <Card testID="card" style={{ margin: 3 }}>
        <Text>Inside</Text>
      </Card>,
    );
    expect(await screen.findByText('Inside')).toBeOnTheScreen();
    const style = StyleSheet.flatten(screen.getByTestId('card').props.style);
    expect(style.boxShadow).toEqual(shadows.card.boxShadow);
    expect(style.margin).toBe(3);
  });
});
