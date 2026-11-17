import { useState } from 'react';
import { Alert, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ItemFormScreen from './src/screens/ItemFormScreen';
import MenuScreen from './src/screens/MenuScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import StatsScreen from './src/screens/StatsScreen';
import type {
  CourseFilter,
  MenuItem,
  MenuItemData,
  ScreenName,
} from './src/types';
import { calculateStats } from './src/utils/stats';
import { colors } from './src/theme';

export default function App() {
  // Which screen is being shown
  const [screen, setScreen] = useState<ScreenName>('home');

  // The menu itself
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // The item opened on the details / edit screens
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  // Search and filter (kept here so they are not lost when opening an item)
  const [searchText, setSearchText] = useState('');
  const [courseFilter, setCourseFilter] = useState<CourseFilter>('All');

  // Always look the item up in the list, so it shows the latest information.
  const selectedItem = menuItems.find((item) => item.id === selectedItemId);

  function clearFilters() {
    setSearchText('');
    setCourseFilter('All');
  }

  function openDetails(item: MenuItem) {
    setSelectedItemId(item.id);
    setScreen('details');
  }

  function addMenuItem(data: MenuItemData) {
    const newItem: MenuItem = { id: Date.now(), ...data };

    setMenuItems([...menuItems, newItem]);
    clearFilters(); // so the new item is visible in the list
    setScreen('menu');
    Alert.alert('Success', `"${newItem.name}" was added to the menu.`);
  }

  function updateMenuItem(data: MenuItemData) {
    if (!selectedItem) {
      return;
    }

    setMenuItems(
      menuItems.map((item) =>
        item.id === selectedItem.id ? { ...item, ...data } : item
      )
    );
    setScreen('details');
    Alert.alert('Success', `"${data.name}" was updated.`);
  }

  function deleteMenuItem(item: MenuItem) {
    setMenuItems(menuItems.filter((menuItem) => menuItem.id !== item.id));
    setSelectedItemId(null);
    setScreen('menu');
    Alert.alert('Deleted', `"${item.name}" was removed from the menu.`);
  }

  // Asks the chef to confirm before anything is deleted.
  function confirmDelete(item: MenuItem) {
    Alert.alert(
      'Delete menu item',
      `Are you sure you want to delete "${item.name}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMenuItem(item),
        },
      ]
    );
  }

  function renderScreen() {
    if (screen === 'add') {
      return (
        <ItemFormScreen
          key="add"
          existingItems={menuItems}
          onSave={addMenuItem}
          onCancel={() => setScreen('home')}
        />
      );
    }

    if (screen === 'edit' && selectedItem) {
      return (
        <ItemFormScreen
          key="edit"
          itemToEdit={selectedItem}
          existingItems={menuItems}
          onSave={updateMenuItem}
          onCancel={() => setScreen('details')}
        />
      );
    }

    if (screen === 'details' && selectedItem) {
      return (
        <DetailsScreen
          item={selectedItem}
          onEdit={() => setScreen('edit')}
          onDelete={() => confirmDelete(selectedItem)}
          onBack={() => setScreen('menu')}
        />
      );
    }

    if (screen === 'menu') {
      return (
        <MenuScreen
          items={menuItems}
          searchText={searchText}
          courseFilter={courseFilter}
          onSearchChange={setSearchText}
          onFilterChange={setCourseFilter}
          onClearFilters={clearFilters}
          onSelectItem={openDetails}
          onNavigate={setScreen}
        />
      );
    }

    if (screen === 'stats') {
      return (
        <StatsScreen
          stats={calculateStats(menuItems)}
          onBack={() => setScreen('home')}
        />
      );
    }

    // Home is also the fallback if something goes wrong.
    return <HomeScreen itemCount={menuItems.length} onNavigate={setScreen} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    // On Android the app can draw under the status bar, so leave room for it.
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0,
  },
});
