import { useState, type ReactNode } from 'react';
import { Pressable, Text, View, type PressableProps } from 'react-native';

import { withAlpha } from '@/shared/theme/color';
import { useThemeColors } from '@/shared/theme/theme-provider';
import { BrandMark } from './brand-mark';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'm' | 's';

const CONTAINER: Record<ButtonVariant, string> = {
  primary: 'bg-primary',
  secondary: 'border border-primary bg-card',
  ghost: '',
  danger: 'bg-destructive',
};
const LABEL: Record<ButtonVariant, string> = {
  primary: 'text-primary-foreground',
  secondary: 'text-primary',
  ghost: 'text-primary',
  danger: 'text-primary-foreground',
};
const SIZE: Record<ButtonSize, string> = {
  m: 'h-10 px-4',
  s: 'h-8 px-3',
};
const TEXT_SIZE: Record<ButtonSize, string> = {
  m: 'text-body',
  s: 'text-caption',
};

type Props = Omit<PressableProps, 'children' | 'style'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Busy: blocks presses and shows the looping mark with `loadingText ?? children`. */
  loading?: boolean;
  loadingText?: string;
  className?: string;
  children?: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'm',
  loading = false,
  loadingText,
  disabled,
  onPress,
  className,
  children,
  ...props
}: Props) {
  const colors = useThemeColors();
  const [pressed, setPressed] = useState(false);
  const blocked = Boolean(disabled) || loading;

  // Pressed replaces the web hover state.
  const pressedBackground = {
    primary: colors['primary-hover'],
    secondary: withAlpha(colors.primary, 0.1),
    ghost: withAlpha(colors.primary, 0.1),
    danger: withAlpha(colors.destructive, 0.9),
  }[variant];

  const content = loading ? (loadingText ?? children) : children;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: blocked, busy: loading }}
      {...props}
      disabled={blocked}
      onPress={blocked ? undefined : onPress}
      onPressIn={(e) => {
        setPressed(true);
        props.onPressIn?.(e);
      }}
      onPressOut={(e) => {
        setPressed(false);
        props.onPressOut?.(e);
      }}
      style={pressed && !blocked ? { backgroundColor: pressedBackground } : undefined}
      className={`flex-row items-center justify-center gap-2 rounded-control ${CONTAINER[variant]} ${SIZE[size]} ${
        blocked ? 'opacity-50' : ''
      } ${className ?? ''}`}
    >
      {loading ? (
        <View>
          <BrandMark
            size={16}
            motion="loop"
            tone={variant === 'primary' || variant === 'danger' ? 'on-primary' : 'default'}
          />
        </View>
      ) : null}
      {typeof content === 'string' || typeof content === 'number' ? (
        <Text className={`font-medium ${TEXT_SIZE[size]} ${LABEL[variant]}`}>{content}</Text>
      ) : (
        content
      )}
    </Pressable>
  );
}
