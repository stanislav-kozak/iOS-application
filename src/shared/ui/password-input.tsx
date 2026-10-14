import { useState } from 'react';
import { Pressable, View, type TextInputProps } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useTranslations } from 'use-intl';

import { useThemeColors } from '@/shared/theme/theme-provider';
import { Input } from './input';

/** A password field with an eye button to check what was typed. */
export function PasswordInput({
  invalid,
  className,
  ...props
}: Omit<TextInputProps, 'secureTextEntry'> & { invalid?: boolean; className?: string }) {
  const t = useTranslations('common');
  const colors = useThemeColors();
  const [shown, setShown] = useState(false);

  return (
    <View>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
        invalid={invalid}
        secureTextEntry={!shown}
        className={`pr-11 ${className ?? ''}`}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={shown ? t('hidePassword') : t('showPassword')}
        accessibilityState={{ selected: shown }}
        onPress={() => setShown((v) => !v)}
        className="absolute inset-y-0 right-0 w-10 items-center justify-center"
      >
        <SymbolView
          name={shown ? 'eye.slash' : 'eye'}
          size={16}
          tintColor={colors['muted-foreground']}
        />
      </Pressable>
    </View>
  );
}
