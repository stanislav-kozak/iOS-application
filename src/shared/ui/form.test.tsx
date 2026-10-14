import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, screen } from '@testing-library/react-native';

import { dark } from '@/shared/theme/tokens';
import { renderWithProviders } from '@/test/render-with-providers';
import { FormField } from './form-field';
import { Input } from './input';
import { PasswordInput } from './password-input';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('Input', () => {
  it('passes text changes through', async () => {
    const onChangeText = jest.fn();
    await renderWithProviders(<Input accessibilityLabel="Name" onChangeText={onChangeText} />);
    await fireEvent.changeText(await screen.findByLabelText('Name'), 'Cash');
    expect(onChangeText).toHaveBeenCalledWith('Cash');
  });

  it('is not editable when disabled', async () => {
    await renderWithProviders(<Input accessibilityLabel="Name" editable={false} />);
    expect((await screen.findByLabelText('Name')).props.editable).toBe(false);
  });

  it('uses the dark muted-foreground token for the placeholder in the dark theme', async () => {
    await AsyncStorage.setItem('csk.theme-mode', 'dark');
    await renderWithProviders(<Input accessibilityLabel="Name" placeholder="Wallet" />);
    expect((await screen.findByLabelText('Name')).props.placeholderTextColor).toBe(dark['muted-foreground']);
  });
});

describe('FormField', () => {
  it('shows the label and the control', async () => {
    await renderWithProviders(
      <FormField label="Name">
        <Input accessibilityLabel="Name input" />
      </FormField>,
    );
    expect(await screen.findByText('Name')).toBeOnTheScreen();
    expect(screen.getByLabelText('Name input')).toBeOnTheScreen();
  });

  it('announces the error as an alert', async () => {
    await renderWithProviders(
      <FormField label="Name" error="Required">
        <Input />
      </FormField>,
    );
    expect(await screen.findByRole('alert')).toHaveTextContent('Required');
  });

  it('has no alert without an error', async () => {
    await renderWithProviders(
      <FormField label="Name">
        <Input />
      </FormField>,
    );
    await screen.findByText('Name');
    expect(screen.queryByRole('alert')).toBeNull();
  });
});

describe('PasswordInput', () => {
  it('toggles secureTextEntry with localized a11y labels', async () => {
    await renderWithProviders(<PasswordInput accessibilityLabel="Password" />);
    const field = await screen.findByLabelText('Password');
    expect(field.props.secureTextEntry).toBe(true);

    await fireEvent.press(screen.getByRole('button', { name: 'Show password' }));
    expect(screen.getByLabelText('Password').props.secureTextEntry).toBe(false);

    await fireEvent.press(screen.getByRole('button', { name: 'Hide password' }));
    expect(screen.getByLabelText('Password').props.secureTextEntry).toBe(true);
  });
});
