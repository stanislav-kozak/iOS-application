import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, render, screen } from '@testing-library/react-native';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { useTranslations } from 'use-intl';

import { LocaleProvider, useLocaleSetting } from './locale-provider';

const handle = { setLocale: (() => {}) as ReturnType<typeof useLocaleSetting>['setLocale'] };

function Probe() {
  const t = useTranslations('common');
  const { locale, setLocale } = useLocaleSetting();
  useEffect(() => {
    handle.setLocale = setLocale;
  });
  return (
    <>
      <Text testID="locale">{locale}</Text>
      <Text testID="text">{t('cancel')}</Text>
    </>
  );
}

const mount = () =>
  render(
    <LocaleProvider>
      <Probe />
    </LocaleProvider>,
  );

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('locale', () => {
  it('defaults to English', async () => {
    await mount();
    expect(await screen.findByTestId('text')).toHaveTextContent('Cancel');
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('switches to Ukrainian and back', async () => {
    await mount();
    await screen.findByTestId('text');
    await act(async () => handle.setLocale('uk'));
    expect(screen.getByTestId('text')).toHaveTextContent('Скасувати');
    await act(async () => handle.setLocale('en'));
    expect(screen.getByTestId('text')).toHaveTextContent('Cancel');
  });

  it('survives a restart', async () => {
    const first = await mount();
    await screen.findByTestId('text');
    await act(async () => handle.setLocale('uk'));
    await first.unmount();

    await mount();
    expect(await screen.findByTestId('text')).toHaveTextContent('Скасувати');
  });

  it('ignores a corrupt saved value', async () => {
    await AsyncStorage.setItem('csk.locale', 'fr');
    await mount();
    expect(await screen.findByTestId('locale')).toHaveTextContent('en');
  });
});
