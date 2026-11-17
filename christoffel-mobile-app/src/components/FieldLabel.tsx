import { Text, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../theme';

type FieldLabelProps = {
  text: string;
};

// The bold label above an input or a group of options.
export default function FieldLabel({ text }: FieldLabelProps) {
  return <Text style={styles.label}>{text}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: fontSizes.body,
    fontWeight: 'bold',
    color: colors.textLabel,
    marginBottom: 8,
    marginTop: 12,
  },
});
