import { dark, light, palette, radii, shadows, themeVariables, typography } from './tokens';

// Expected values are literals copied from coin-save-app/src/app/globals.css.
describe('design tokens', () => {
  it('light palette matches the web :root', () => {
    expect(light).toEqual({
      primary: '#f97350',
      'primary-hover': '#e55e3c',
      'primary-foreground': '#ffffff',
      success: '#16a34a',
      warning: '#eab308',
      caution: '#f97316',
      destructive: '#dc2626',
      background: '#fdfbf9',
      card: '#ffffff',
      border: '#e7e1db',
      foreground: '#1c1917',
      'muted-foreground': '#78716c',
    });
  });

  it('dark palette matches the web .dark', () => {
    expect(dark).toMatchObject({
      primary: '#fb8a65',
      'primary-hover': '#f97350',
      destructive: '#f87171',
      background: '#1c1917',
      card: '#292524',
      border: '#3f3a35',
      foreground: '#f5f1ed',
      'muted-foreground': '#a8a29e',
    });
  });

  it('keeps the same token names in both themes', () => {
    expect(Object.keys(dark).sort()).toEqual(Object.keys(light).sort());
  });

  it('decor palette, radii, shadows and typography match the web theme', () => {
    expect(palette.teal).toBe('#15bba3');
    expect(Object.keys(palette)).toHaveLength(8);
    expect(radii).toEqual({ card: 16, control: 10 });
    expect(shadows['card-raised'].boxShadow).toEqual([
      { offsetX: 0, offsetY: 4, blurRadius: 16, color: 'rgba(28, 25, 23, 0.12)' },
    ]);
    expect(shadows.card.boxShadow).toHaveLength(2);
    expect(typography.h1).toMatchObject({ fontSize: 24, lineHeight: 32, weight: 'bold' });
    expect(typography.h2).toMatchObject({ fontSize: 18, lineHeight: 26, weight: 'semibold' });
    expect(typography.money).toMatchObject({ fontSize: 20, weight: 'semibold', tabularNums: true });
  });

  it('exposes the CSS variables for each theme', () => {
    expect(themeVariables('light')['--background']).toBe('#fdfbf9');
    expect(themeVariables('dark')['--background']).toBe('#1c1917');
    expect(themeVariables('dark')['--palette-pink']).toBe('#ec4999');
  });
});
