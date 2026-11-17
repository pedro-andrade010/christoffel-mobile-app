import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../theme';

type DetailRowProps = {
  label: string;
  value: string;
};

// A small label with its value underneath, used on the details screen.
export default function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 18,
  },
  label: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginBottom: 4,
  },
  value: {
    fontSize: fontSizes.large,
    color: colors.textDark,
    lineHeight: 25,
  },
});
