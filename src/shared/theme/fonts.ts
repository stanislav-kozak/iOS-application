import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import { fontFamily } from './tokens';

/** Map of family name (as used in `tokens.fontFamily`) to font asset. */
export const fontAssets = {
  [fontFamily.regular]: Inter_400Regular,
  [fontFamily.medium]: Inter_500Medium,
  [fontFamily.semibold]: Inter_600SemiBold,
  [fontFamily.bold]: Inter_700Bold,
};
