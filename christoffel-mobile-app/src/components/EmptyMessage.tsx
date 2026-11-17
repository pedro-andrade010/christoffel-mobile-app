import { Text, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../theme';

type EmptyMessageProps = {
  message: string;
};

// A friendly message shown when there is nothing to display.
export default function EmptyMessage({ message }: EmptyMessageProps) {
  return <Text style={styles.message}>{message}</Text>;
}

const styles = StyleSheet.create({
  message: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    textAlign: 'center',
    marginVertical: 25,
    lineHeight: 22,
  },
});
