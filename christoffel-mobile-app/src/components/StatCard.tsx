import { View, Text, StyleSheet } from 'react-native';
import FieldLabel from './FieldLabel';
import { colors } from '../theme';

type StatCardProps = {
  label: string;
  value: string | number;
};

// A label with a boxed value, used on the statistics screen.
export default function StatCard({ label, value }: StatCardProps) {
  return (
    <View>
      <FieldLabel text={label} />
      <View style={styles.box}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    alignItems: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
