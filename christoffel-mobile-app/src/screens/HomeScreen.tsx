import { Text, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import AppButton from '../components/AppButton';
import type { ScreenName } from '../types';
import { colors, fontSizes } from '../theme';

type HomeScreenProps = {
  itemCount: number;
  onNavigate: (screen: ScreenName) => void;
};

export default function HomeScreen({ itemCount, onNavigate }: HomeScreenProps) {
  const dishWord = itemCount === 1 ? 'dish' : 'dishes';

  return (
    <ScreenLayout
  title="CHRISTOFFEL'S MENU"
  subtitle="RESTAURANT MANAGEMENT"
  showLogo
>
      <Text style={styles.welcome}>Welcome, Chef!</Text>
      <Text style={styles.title}>Manage Your Menu</Text>
      <Text style={styles.description}>
        Add new dishes and keep your restaurant menu organised.
      </Text>
      <Text style={styles.count}>
        You currently have {itemCount} {dishWord} on the menu.
      </Text>

      <AppButton
        label="ADD MENU ITEM"
        variant="primary"
        onPress={() => onNavigate('add')}
      />
      <AppButton label="VIEW MENU" onPress={() => onNavigate('menu')} />
      <AppButton label="STATISTICS" onPress={() => onNavigate('stats')} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  title: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 12,
  },
  description: {
    fontSize: fontSizes.body,
    color: colors.textMuted,
    lineHeight: 23,
    marginBottom: 12,
  },
  count: {
    fontSize: fontSizes.body,
    fontWeight: 'bold',
    color: colors.textLabel,
    marginBottom: 30,
  },
});
