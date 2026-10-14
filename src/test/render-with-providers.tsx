import { render } from '@testing-library/react-native';
import type { ReactElement } from 'react';

import { AppProviders } from '@/shared/providers/app-providers';

export function renderWithProviders(ui: ReactElement) {
  return render(<AppProviders>{ui}</AppProviders>);
}
