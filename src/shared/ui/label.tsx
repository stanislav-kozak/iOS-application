import { Text, type TextProps } from 'react-native';

export function Label({ className, ...props }: TextProps & { className?: string }) {
  return <Text className={`text-caption font-medium text-muted-foreground ${className ?? ''}`} {...props} />;
}
