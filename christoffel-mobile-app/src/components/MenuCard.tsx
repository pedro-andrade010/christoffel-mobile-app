import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { MenuItem } from '../types';
import { formatPrice } from '../utils/format';
import { colors, fontSizes } from '../theme';

type MenuCardProps = {
  item: MenuItem;
  onPress: () => void;
};

// One dish in the menu list. Tapping it opens the details screen.
export default function MenuCard({ item, onPress }: MenuCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`View details of ${item.name}`}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.course}>{item.course}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <Text style={styles.hint}>View details ›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 15,
  },
  name: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 6,
  },
  course: {
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: colors.textMuted,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  hint: {
    fontSize: fontSizes.small,
    color: colors.textMuted,
  },
});
