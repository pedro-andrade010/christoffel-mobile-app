import type { Course, MenuItem } from '../types';

// What the chef has typed into the form.
export type FormValues = {
  name: string;
  description: string;
  course: Course | '';
  price: string;
};

// One error message per field (a field with no problem has no message).
export type FormErrors = {
  name?: string;
  description?: string;
  course?: string;
  price?: string;
};

// Some keyboards type a comma (85,50) instead of a dot (85.50),
// so the comma is changed to a dot before converting to a number.
export function parsePrice(text: string): number {
  return Number(text.trim().replace(',', '.'));
}

// Checks every field and returns the error messages found.
// existingItems and editingId are used to stop duplicate dish names.
export function validateForm(
  values: FormValues,
  existingItems: MenuItem[],
  editingId?: number
): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const description = values.description.trim();
  const priceText = values.price.trim();

  // Dish name
  if (name === '') {
    errors.name = 'Please enter the dish name.';
  } else if (name.length < 2) {
    errors.name = 'The dish name must have at least 2 characters.';
  } else {
    const isDuplicate = existingItems.some(
      (item) =>
        item.id !== editingId && item.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      errors.name = 'A dish with this name already exists.';
    }
  }

  // Description
  if (description === '') {
    errors.description = 'Please describe the dish.';
  } else if (description.length < 5) {
    errors.description = 'The description is too short.';
  }

  // Course
  if (values.course === '') {
    errors.course = 'Please choose a course.';
  }

  // Price: digits with an optional dot or comma and up to 2 decimals
  if (priceText === '') {
    errors.price = 'Please enter the price.';
  } else if (!/^\d+([.,]\d{1,2})?$/.test(priceText)) {
    errors.price = 'Enter a valid price with up to 2 decimals, e.g. 85.50.';
  } else if (parsePrice(priceText) <= 0) {
    errors.price = 'The price must be greater than zero.';
  }

  return errors;
}

// True when at least one field has an error.
export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
