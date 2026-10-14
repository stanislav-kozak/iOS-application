import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { Label } from './label';

type Props = { label: string; error?: string; children: ReactNode };

/** Label above the control, error below it. */
export function FormField({ label, error, children }: Props) {
  return (
    <View className="gap-1">
      <Label>{label}</Label>
      {children}
      {error ? (
        <Text accessibilityRole="alert" selectable className="text-caption text-destructive">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
