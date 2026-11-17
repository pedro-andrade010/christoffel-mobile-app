import { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import FormField from '../components/FormField';
import FieldLabel from '../components/FieldLabel';
import OptionSelector from '../components/OptionSelector';
import AppButton from '../components/AppButton';
import { COURSES } from '../constants';
import type { Course, MenuItem, MenuItemData } from '../types';
import {
  hasErrors,
  parsePrice,
  validateForm,
  type FormErrors,
} from '../utils/validation';
import { colors, fontSizes } from '../theme';

type ItemFormScreenProps = {
  itemToEdit?: MenuItem; // if given, the form is used to EDIT this item
  existingItems: MenuItem[];
  onSave: (data: MenuItemData) => void;
  onCancel: () => void;
};

// This one screen is used to add a new item AND to edit an existing one.
export default function ItemFormScreen({
  itemToEdit,
  existingItems,
  onSave,
  onCancel,
}: ItemFormScreenProps) {
  const isEditing = itemToEdit !== undefined;

  // When editing, the form starts filled with the item's current information.
  const [name, setName] = useState(itemToEdit?.name ?? '');
  const [description, setDescription] = useState(itemToEdit?.description ?? '');
  const [course, setCourse] = useState<Course | ''>(itemToEdit?.course ?? '');
  const [price, setPrice] = useState(
    itemToEdit ? String(itemToEdit.price) : ''
  );
  const [errors, setErrors] = useState<FormErrors>({});

  // Removes the error message of a field as soon as the chef starts fixing it.
  function clearError(field: keyof FormErrors) {
    setErrors({ ...errors, [field]: undefined });
  }

  function handleSave() {
    const foundErrors = validateForm(
      { name, description, course, price },
      existingItems,
      itemToEdit?.id
    );
    setErrors(foundErrors);

    if (hasErrors(foundErrors) || course === '') {
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      course,
      price: parsePrice(price),
    });
  }

  return (
    <ScreenLayout title={isEditing ? 'EDIT MENU ITEM' : 'ADD MENU ITEM'}>
      <FormField
        label="Dish Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          clearError('name');
        }}
        placeholder="Enter dish name"
        maxLength={40}
        error={errors.name}
      />

      <FormField
        label="Description"
        style={styles.descriptionInput}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          clearError('description');
        }}
        placeholder="Describe the dish"
        maxLength={150}
        multiline
        error={errors.description}
      />

      <FieldLabel text="Course" />
      <OptionSelector
        options={COURSES}
        selected={course}
        onSelect={(selectedCourse) => {
          setCourse(selectedCourse);
          clearError('course');
        }}
      />
      {errors.course ? <Text style={styles.error}>{errors.course}</Text> : null}

      <FormField
        label="Price (R)"
        value={price}
        onChangeText={(text) => {
          setPrice(text);
          clearError('price');
        }}
        placeholder="Enter price"
        keyboardType="decimal-pad"
        error={errors.price}
      />

      {hasErrors(errors) ? (
        <Text style={styles.summary}>
          Please fix the highlighted fields before saving.
        </Text>
      ) : null}

      <AppButton
        label={isEditing ? 'SAVE CHANGES' : 'SAVE ITEM'}
        variant="primary"
        onPress={handleSave}
      />
      <AppButton label="CANCEL" onPress={onCancel} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  descriptionInput: {
    height: 90,
    textAlignVertical: 'top',
  },
  error: {
    color: colors.danger,
    fontSize: fontSizes.small,
    marginTop: 6,
  },
  summary: {
    color: colors.danger,
    fontSize: fontSizes.body,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 4,
  },
});
