import { View, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import StatCard from '../components/StatCard';
import EmptyMessage from '../components/EmptyMessage';
import AppButton from '../components/AppButton';
import { COURSES, COURSE_PLURAL_LABELS } from '../constants';
import type { MenuStats } from '../utils/stats';
import { formatPrice } from '../utils/format';

type StatsScreenProps = {
  stats: MenuStats;
  onBack: () => void;
};

export default function StatsScreen({ stats, onBack }: StatsScreenProps) {
  return (
    <ScreenLayout title="MENU STATISTICS" subtitle="OVERVIEW OF YOUR MENU">
      {stats.totalItems === 0 && (
        <EmptyMessage message="Add some menu items to see your statistics." />
      )}

      <StatCard label="Total Menu Items" value={stats.totalItems} />
      <StatCard label="Average Price" value={formatPrice(stats.averagePrice)} />

      {COURSES.map((course) => (
        <StatCard
          key={course}
          label={COURSE_PLURAL_LABELS[course]}
          value={stats.itemsPerCourse[course]}
        />
      ))}

      <View style={styles.backButton}>
        <AppButton label="BACK TO HOME" onPress={onBack} />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 28,
  },
});
