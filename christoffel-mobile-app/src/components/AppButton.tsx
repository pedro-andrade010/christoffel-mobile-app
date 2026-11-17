import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant; // primary = filled blue, secondary = white, danger = red
};

// One button used on every screen, so all buttons look the same.
export default function AppButton({
  label,
  onPress,
  variant = 'secondary',
}: AppButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles[variant]]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[styles.text, textStyles[variant]]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 12,
  },
  text: {
    fontSize: fontSizes.body,
    fontWeight: 'bold',
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.dangerBackground,
    borderColor: colors.danger,
  },
  primaryText: { color: colors.white },
  secondaryText: { color: colors.primary },
  dangerText: { color: colors.danger },
});

const buttonStyles = {
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
};

const textStyles = {
  primary: styles.primaryText,
  secondary: styles.secondaryText,
  danger: styles.dangerText,
};
