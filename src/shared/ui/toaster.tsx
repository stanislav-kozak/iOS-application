import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown, useReducedMotion } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { shadows } from '@/shared/theme/tokens';
import { BrandMark } from './brand-mark';

export const TOAST_DURATION_MS = 2500;

type Toast = { id: number; message: string };
type Listener = (toast: Toast) => void;

const listeners = new Set<Listener>();
let nextId = 0;

/** A short confirmation after a save (never for errors). Needs a mounted `<Toaster />`; otherwise a no-op. */
export function notify(message: string) {
  const toast = { id: ++nextId, message };
  listeners.forEach((listener) => listener(toast));
}

/**
 * Mount once in the root layout. Shows the latest toast bottom-centre for 2.5 s.
 * `bottomOffset` is added to the safe-area inset: raise it to clear a tab bar.
 */
export function Toaster({ bottomOffset = 16 }: { bottomOffset?: number }) {
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    listeners.add(setToast);
    return () => {
      listeners.delete(setToast);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <View
      pointerEvents="none"
      className="absolute inset-x-0 items-center px-4"
      style={{ bottom: insets.bottom + bottomOffset }}
    >
      <Animated.View key={toast.id} entering={reduceMotion ? undefined : FadeInDown.duration(200)}>
        <View
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          className="flex-row items-center gap-2 rounded-card border border-border bg-card px-4 py-3"
          style={shadows.modal}
        >
          <BrandMark size={16} />
          <Text className="text-body text-foreground">{toast.message}</Text>
        </View>
      </Animated.View>
    </View>
  );
}
