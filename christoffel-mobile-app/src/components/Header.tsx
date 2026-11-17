import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../theme';

type HeaderProps = {
  title: string;
  subtitle?: string;
  showLogo?: boolean; // shows the restaurant logo above the title
};

// The blue bar at the top of every screen.
export default function Header({ title, subtitle, showLogo }: HeaderProps) {
  return (
    <View style={styles.header}>
      {showLogo ? (
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          accessibilityLabel="Christoffel's Menu logo"
        />
      ) : null}
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing.medium,
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