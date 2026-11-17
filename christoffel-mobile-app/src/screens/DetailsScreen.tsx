import { View, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import DetailRow from '../components/DetailRow';
import AppButton from '../components/AppButton';
import type { MenuItem } from '../types';
import { formatPrice } from '../utils/format';

type DetailsScreenProps = {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
};

export default function DetailsScreen({
  item,
  onEdit,
  onDelete,
  onBack,
}: DetailsScreenProps) {
  return (
    <ScreenLayout title="MENU ITEM DETAILS">
      <View style={styles.details}>
        <DetailRow label="Dish Name" value={item.name} />
        <DetailRow label="Description" value={item.description} />
        <DetailRow label="Course" value={item.course} />
        <DetailRow label="Price" value={formatPrice(item.price)} />
      </View>

      <AppButton label="EDIT" variant="primary" onPress={onEdit} />
      <AppButton label="DELETE" variant="danger" onPress={onDelete} />
      <AppButton label="BACK TO MENU" onPress={onBack} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  details: {
    marginBottom: 16,
  },
});
