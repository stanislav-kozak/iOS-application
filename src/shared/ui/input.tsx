import { useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { useThemeColors } from '@/shared/theme/theme-provider';

type Props = TextInputProps & { invalid?: boolean; className?: string };

export function Input({ invalid = false, editable = true, className, onFocus, onBlur, ...props }: Props) {
  const colors = useThemeColors();
  const [focused, setFocused] = useState(false);
  const border = invalid ? 'border-destructive' : focused ? 'border-primary' : 'border-border';

  return (
    <TextInput
      placeholderTextColor={colors['muted-foreground']}
      selectionColor={colors.primary}
      editable={editable}
      {...props}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      className={`h-10 w-full rounded-control border bg-card px-3 text-field text-foreground ${border} ${
        editable ? '' : 'opacity-50'
      } ${className ?? ''}`}
    />
  );
}
