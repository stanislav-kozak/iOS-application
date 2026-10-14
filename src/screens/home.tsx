import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { useTranslations } from 'use-intl';

export function Home() {
  const t = useTranslations('common');
  const tg = useTranslations('styleguide');

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background">
      <Text className="text-h1 text-foreground">{t('appName')}</Text>
      {__DEV__ ? (
        <Link href="/styleguide" asChild>
          <Text className="text-body font-medium text-primary">{tg('title')}</Text>
        </Link>
      ) : null}
    </View>
  );
}
