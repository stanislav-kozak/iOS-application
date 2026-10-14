import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { IntlProvider } from 'use-intl';

import { DEFAULT_LOCALE, loadLocale, saveLocale, type Locale } from '@/shared/storage/preferences';
import en from './messages/en.json';
import uk from './messages/uk.json';

export type Messages = typeof en;
export const messages: Record<Locale, Messages> = { en, uk };

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Holds the interface language (en by default, the device language is ignored), persists it
 * and feeds use-intl. Renders nothing until the saved choice has been read.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    loadLocale().then((saved) => {
      if (!active) return;
      setLocaleState((current) => (current === DEFAULT_LOCALE ? saved : current));
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    void saveLocale(next);
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  if (!hydrated) return null;

  return (
    <LocaleContext value={value}>
      <IntlProvider locale={locale} messages={messages[locale]} timeZone="UTC">
        {children}
      </IntlProvider>
    </LocaleContext>
  );
}

export function useLocaleSetting(): LocaleContextValue {
  const value = use(LocaleContext);
  if (!value) throw new Error('useLocaleSetting must be used inside LocaleProvider');
  return value;
}
