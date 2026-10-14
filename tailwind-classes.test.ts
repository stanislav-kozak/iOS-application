import postcss from 'postcss';
import tailwind from 'tailwindcss';

import config from './tailwind.config';

const classes = [
  'bg-primary', 'bg-primary-hover', 'text-primary-foreground', 'text-success', 'text-warning', 'bg-caution',
  'text-destructive', 'bg-background', 'bg-card', 'border-border', 'text-foreground', 'text-muted-foreground',
  'rounded-card', 'rounded-control', 'bg-overlay',
  'bg-palette-blue', 'bg-palette-slate', 'text-display', 'text-h1', 'text-h2', 'text-body', 'text-field',
  'text-caption', 'text-money', 'font-medium', 'font-semibold', 'font-bold',
];

async function generate() {
  const result = await postcss([
    tailwind({ ...config, content: [{ raw: classes.join(' ') }] }),
  ]).process('@tailwind utilities;', { from: undefined });
  return result.css;
}

describe('tailwind config', () => {
  it('generates every class from the web token table', async () => {
    const css = await generate();
    for (const cls of classes) expect(css).toContain(`.${cls}`);
  });

  it('colors resolve through theme variables, so one class serves both themes', async () => {
    const css = await generate();
    expect(css).toMatch(/\.bg-primary\s*{[^}]*var\(--primary\)/);
    expect(css).toMatch(/\.border-border\s*{[^}]*var\(--border\)/);
  });

  it('typography tokens carry size, line height and the weight font family', async () => {
    const css = await generate();
    expect(css).toMatch(/\.text-h1\s*{[^}]*font-size: 24px[^}]*line-height: 32px[^}]*Inter_700Bold/);
    expect(css).toMatch(/\.text-money\s*{[^}]*Inter_600SemiBold[^}]*tabular-nums/);
    expect(css).toMatch(/\.font-medium\s*{[^}]*Inter_500Medium/);
  });

  it('radii match the web values', async () => {
    const css = await generate();
    expect(css).toMatch(/\.rounded-card\s*{[^}]*16px/);
    expect(css).toMatch(/\.rounded-control\s*{[^}]*10px/);
  });
});
