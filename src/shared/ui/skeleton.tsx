import { useEffect, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useThemeColors } from '@/shared/theme/theme-provider';

export type SkeletonShape = 'card' | 'circle' | 'row' | 'line';

const SHAPE: Record<SkeletonShape, string> = {
  card: 'rounded-card',
  circle: 'rounded-full',
  row: 'rounded-control',
  line: 'rounded-control',
};

/** A placeholder block in the shape of what is loading (sized by `className`). Pulses unless reduce motion is on. */
export function Skeleton({ shape = 'line', className }: { shape?: SkeletonShape; className?: string }) {
  const colors = useThemeColors();
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (reduceMotion) {
      opacity.value = 1;
      return;
    }
    // Same pulse as the web `animate-pulse`: 1 -> 0.5 -> 1 over 2s.
    opacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
  }, [reduceMotion, opacity]);

  const pulse = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View
      testID={`skeleton-${shape}`}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={`overflow-hidden ${SHAPE[shape]} ${className ?? ''}`}
    >
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.border }, pulse]} />
    </View>
  );
}

/** Marks a loading area for assistive tech: busy, announced as one element with a spoken label. */
export function LoadingRegion({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <View accessible accessibilityLabel={label} accessibilityState={{ busy: true }} className={className}>
      {children}
    </View>
  );
}
