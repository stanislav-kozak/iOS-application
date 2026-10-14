import { withAlpha } from './color';

describe('withAlpha', () => {
  it('converts a hex token to rgba', () => {
    expect(withAlpha('#f97350', 0.1)).toBe('rgba(249, 115, 80, 0.1)');
  });

  it('rejects non-hex input', () => {
    expect(() => withAlpha('red', 0.5)).toThrow();
  });
});
