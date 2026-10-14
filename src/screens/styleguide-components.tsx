import { useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslations } from 'use-intl';

import { BrandMark } from '@/shared/ui/brand-mark';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { LoadingRegion, Skeleton } from '@/shared/ui/skeleton';
import { notify } from '@/shared/ui/toaster';

export function StyleguideComponents() {
  const t = useTranslations('styleguide');
  const tc = useTranslations('common');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Text className="text-h1 text-foreground">{t('components')}</Text>

      <Card className="gap-3 p-4">
        <Text className="text-h2 text-foreground">{t('buttons')}</Text>
        <View className="flex-row flex-wrap items-center gap-2">
          <Button>{t('primary')}</Button>
          <Button variant="secondary">{t('secondary')}</Button>
          <Button variant="ghost">{t('ghost')}</Button>
          <Button variant="danger">{t('danger')}</Button>
        </View>
        <View className="flex-row flex-wrap items-center gap-2">
          <Button size="s">{`${t('primary')} · ${t('small')}`}</Button>
          <Button size="s" variant="secondary">{t('secondary')}</Button>
          <Button size="s" variant="ghost">{t('ghost')}</Button>
          <Button size="s" variant="danger">{t('danger')}</Button>
        </View>
        <View className="flex-row flex-wrap items-center gap-2">
          <Button disabled>{t('disabled')}</Button>
          <Button variant="secondary" disabled>{t('disabled')}</Button>
          <Button loading loadingText={t('saving')}>{t('loadingButton')}</Button>
          <Button variant="secondary" loading loadingText={t('saving')}>{t('loadingButton')}</Button>
          <Button variant="danger" loading>{t('loadingButton')}</Button>
        </View>
        <View className="flex-row items-center gap-4">
          <BrandMark size={32} />
          <BrandMark size={32} motion="intro" />
          <BrandMark size={32} motion="loop" />
          <View className="rounded-control bg-primary p-2">
            <BrandMark size={32} motion="loop" tone="on-primary" />
          </View>
        </View>
      </Card>

      <Card className="gap-3 p-4">
        <Text className="text-h2 text-foreground">{t('fields')}</Text>
        <FormField label={t('nameLabel')}>
          <Input value={name} onChangeText={setName} placeholder={t('namePlaceholder')} accessibilityLabel={t('nameLabel')} />
        </FormField>
        <FormField label={t('nameLabel')} error={t('fieldError')}>
          <Input invalid placeholder={t('namePlaceholder')} accessibilityLabel={t('nameLabel')} />
        </FormField>
        <FormField label={t('passwordLabel')}>
          <PasswordInput value={password} onChangeText={setPassword} accessibilityLabel={t('passwordLabel')} />
        </FormField>
        <FormField label={t('disabled')}>
          <Input editable={false} placeholder={t('disabled')} accessibilityLabel={t('disabled')} />
        </FormField>
      </Card>

      <Card className="gap-3 p-4">
        <Text className="text-h2 text-foreground">{t('skeletons')}</Text>
        <LoadingRegion label={tc('loading')} className="gap-3">
          <Skeleton shape="card" className="h-24" />
          <View className="flex-row items-center gap-3">
            <Skeleton shape="circle" className="size-10" />
            <View className="flex-1 gap-2">
              <Skeleton shape="line" className="h-4 w-2/3" />
              <Skeleton shape="line" className="h-3 w-1/3" />
            </View>
          </View>
          <Skeleton shape="row" className="h-12" />
        </LoadingRegion>
      </Card>

      <Card className="gap-3 p-4">
        <Text className="text-h2 text-foreground">{t('toast')}</Text>
        <View className="flex-row">
          <Button variant="secondary" onPress={() => notify(t('toastMessage'))}>
            {t('showToast')}
          </Button>
        </View>
      </Card>
    </>
  );
}
