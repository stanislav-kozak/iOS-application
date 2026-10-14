/** `#rrggbb` + alpha -> `rgba(...)`. NativeWind cannot apply `/10` opacity to theme variables, so translucent states are computed from tokens. */
export function withAlpha(hex: string, alpha: number): string {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match) throw new Error(`withAlpha expects #rrggbb, got "${hex}"`);
  const n = parseInt(match[1]!, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
