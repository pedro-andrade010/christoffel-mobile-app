import { Text, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import FormField from '../components/FormField';
import FieldLabel from '../components/FieldLabel';
import OptionSelector from '../components/OptionSelector';
import MenuCard from '../components/MenuCard';
import EmptyMessage from '../components/EmptyMessage';
import AppButton from '../components/AppButton';
import { FILTER_OPTIONS } from '../constants';
import type { CourseFilter, MenuItem, ScreenName } from '../types';
import { filterMenuItems } from '../utils/filter';
import { colors, fontSizes } from '../theme';

type MenuScreenProps = {
  items: MenuItem[];
  searchText: string;
  courseFilter: CourseFilter;
  onSearchChange: (text: string) => void;
  onFilterChange: (course: CourseFilter) => void;
  onClearFilters: () => void;
  onSelectItem: (item: MenuItem) => void;
  onNavigate: (screen: ScreenName) => void;
};

export default function MenuScreen({
  items,
  searchText,
  courseFilter,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  onSelectItem,
  onNavigate,
}: MenuScreenProps) {
  const visibleItems = filterMenuItems(items, searchText, courseFilter);
  const hasActiveFilter = searchText.trim() !== '' || courseFilter !== 'All';
  const menuIsEmpty = items.length === 0;

  return (
    <ScreenLayout title="MENU ITEMS">
      {/* Search and filter only make sense when there are items */}
      {!menuIsEmpty && (
        <>
          <FormField
            label="Search"
            value={searchText}
            onChangeText={onSearchChange}
            placeholder="Search menu items..."
            autoCorrect={false}
          />

          <FieldLabel text="Filter by Course" />
          <OptionSelector
            options={FILTER_OPTIONS}
            selected={courseFilter}
            onSelect={onFilterChange}
          />

          <Text style={styles.resultCount}>
            Showing {visibleItems.length} of {items.length}{' '}
            {items.length === 1 ? 'item' : 'items'}
          </Text>
        </>
      )}

      {/* Three possible states: no items at all, no matches, or the list */}
      {menuIsEmpty ? (
        <EmptyMessage message="No menu items have been added yet." />
      ) : visibleItems.length === 0 ? (
        <EmptyMessage message="No menu items match your search or filter." />
      ) : (
        visibleItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onPress={() => onSelectItem(item)}
          />
        ))
      )}

      {hasActiveFilter && (
        <AppButton label="CLEAR SEARCH & FILTER" onPress={onClearFilters} />
      )}

      <AppButton
        label={menuIsEmpty ? 'ADD MENU ITEM' : 'ADD ANOTHER ITEM'}
        variant="primary"
        onPress={() => onNavigate('add')}
      />
      <AppButton label="STATISTICS" onPress={() => onNavigate('stats')} />
      <AppButton label="BACK TO HOME" onPress={() => onNavigate('home')} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  resultCount: {
    color: colors.textMuted,
    fontSize: fontSizes.small,
    marginTop: 14,
    marginBottom: 6,
  },
});
