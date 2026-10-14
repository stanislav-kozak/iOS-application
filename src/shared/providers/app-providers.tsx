import type { ReactNode } from 'react';

import { LocaleProvider } from '@/shared/i18n/locale-provider';
import { ThemeProvider } from '@/shared/theme/theme-provider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
