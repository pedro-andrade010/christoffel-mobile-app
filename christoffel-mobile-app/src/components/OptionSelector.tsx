import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../theme';

// <T extends string> lets this one component work for both
// the course choice in the form (Course) and the filter (CourseFilter).
type OptionSelectorProps<T extends string> = {
  options: T[];
  selected: T | '';
  onSelect: (option: T) => void;
};

// A row of buttons where only one option can be selected at a time.
export default function OptionSelector<T extends string>({
  options,
  selected,
  onSelect,
}: OptionSelectorProps<T>) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const isSelected = option === selected;

        return (
          <TouchableOpacity
            key={option}
            style={[styles.option, isSelected && styles.optionSelected]}
            onPress={() => onSelect(option)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={[styles.text, isSelected && styles.textSelected]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  optionSelected: {
    backgroundColor: colors.selectedBackground,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  text: {
    color: colors.primary,
    fontSize: fontSizes.body,
    fontWeight: 'bold',
  },
  textSelected: {
    color: colors.primary,
  },
});
