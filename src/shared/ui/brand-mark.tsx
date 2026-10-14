import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { useThemeColors } from '@/shared/theme/theme-provider';
import { palette } from '@/shared/theme/tokens';

export type BrandMotion = 'static' | 'intro' | 'loop';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ARC_FULL = 176; // dash length of the arc: fully hidden
const ARC_FINAL = 38; // final frame
const COIN_R = 9;
const draw = Easing.bezier(0.3, 0.7, 0.3, 1);

/**
 * The CoinSaveKeeper mark: a «C» (a coin's rim) holding a gold coin. Decorative, hidden from
 * accessibility. `static` and reduced motion show the final frame; `intro` plays once, `loop` repeats
 * (keyframes follow the web `brand-draw` / `brand-pop` animations).
 */
export function BrandMark({
  size = 32,
  motion = 'static',
  tone = 'default',
}: {
  size?: number;
  motion?: BrandMotion;
  tone?: 'default' | 'on-primary';
}) {
  const colors = useThemeColors();
  const reduceMotion = useReducedMotion();
  const animated = motion !== 'static' && !reduceMotion;
  const offset = useSharedValue(animated ? ARC_FULL : ARC_FINAL);
  const coinScale = useSharedValue(animated ? 0 : 1);

  useEffect(() => {
    if (!animated) {
      offset.value = ARC_FINAL;
      coinScale.value = 1;
      return;
    }
    if (motion === 'intro') {
      offset.value = ARC_FULL;
      coinScale.value = 0;
      offset.value = withTiming(ARC_FINAL, { duration: 700, easing: draw });
      coinScale.value = withDelay(
        450,
        withSequence(
          withTiming(1.25, { duration: 315, easing: Easing.out(Easing.ease) }),
          withTiming(1, { duration: 135 }),
        ),
      );
      return;
    }
    // loop: 1.6s cycle, arc drawn in the first 45%, coin pops between 35% and 60%
    offset.value = withRepeat(
      withSequence(
        withTiming(ARC_FINAL, { duration: 720, easing: draw }),
        withTiming(ARC_FINAL, { duration: 880 }),
        withTiming(ARC_FULL, { duration: 0 }),
      ),
      -1,
    );
    coinScale.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 560 }),
        withTiming(1.25, { duration: 240 }),
        withTiming(1, { duration: 160 }),
        withTiming(1, { duration: 640 }),
        withTiming(0, { duration: 0 }),
      ),
      -1,
    );
  }, [animated, motion, offset, coinScale]);

  const arcProps = useAnimatedProps(() => ({ strokeDashoffset: offset.value }));
  const coinProps = useAnimatedProps(() => ({ r: COIN_R * coinScale.value }));

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      testID="brand-mark"
    >
      <AnimatedCircle
        testID="brand-mark-arc"
        cx={40}
        cy={40}
        r={28}
        fill="none"
        stroke={tone === 'on-primary' ? colors['primary-foreground'] : colors.primary}
        strokeWidth={11}
        strokeLinecap="round"
        strokeDasharray={ARC_FULL}
        rotation={38}
        origin="40, 40"
        animatedProps={arcProps}
      />
      <AnimatedCircle
        testID="brand-mark-coin"
        cx={40}
        cy={40}
        fill={palette.amber}
        animatedProps={coinProps}
      />
    </Svg>
  );
}
