import { View, type ViewProps } from 'react-native';

import { shadows } from '@/shared/theme/tokens';

/** The web surface `bg-card rounded-card shadow-card`; shadows come from tokens via style. */
export function Card({ className, style, ...props }: ViewProps & { className?: string }) {
  return <View className={`rounded-card bg-card ${className ?? ''}`} style={[shadows.card, style]} {...props} />;
}
