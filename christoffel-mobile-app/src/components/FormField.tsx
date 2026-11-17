import { View, Text, TextInput, StyleSheet } from 'react-native';
import type { TextInputProps } from 'react-native';
import FieldLabel from './FieldLabel';
import { colors, fontSizes } from '../theme';

// A FormField accepts everything a normal TextInput accepts, plus a label and an error.
type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

// A label, a text box and (when needed) a red error message under it.
export default function FormField({
  label,
  error,
  style,
  ...inputProps
}: FormFieldProps) {
  return (
    <View>
      <FieldLabel text={label} />
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={colors.placeholder}
        {...inputProps}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: 14,
    fontSize: fontSizes.body,
    color: colors.textDark,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSizes.small,
    marginTop: 6,
  },
});
