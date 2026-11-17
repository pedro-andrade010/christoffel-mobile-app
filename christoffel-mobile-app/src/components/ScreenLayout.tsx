import type { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Header from './Header';
import { colors, spacing } from '../theme';

type ScreenLayoutProps = {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  children: ReactNode;
};

// Gives every screen the same structure: a fixed header and scrollable content.
export default function ScreenLayout({
  title,
  subtitle,
  showLogo,
  children,
}: ScreenLayoutProps) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title={title} subtitle={subtitle} showLogo={showLogo} />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xlarge,
    paddingBottom: 48,
  },
});