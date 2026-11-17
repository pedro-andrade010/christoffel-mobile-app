import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../theme';

type HeaderProps = {
  title: string;
  subtitle?: string;
};

// The blue bar at the top of every screen.
export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    padding: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizes.heading,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 11,
    color: colors.headerSubtitle,
    marginTop: spacing.small,
    letterSpacing: 2,
  },
});
