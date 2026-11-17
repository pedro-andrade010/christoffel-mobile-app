import type { Course, CourseFilter } from './types';

// All available courses, in the order they are shown.
export const COURSES: Course[] = ['Starter', 'Main Course', 'Dessert'];

// Options shown in the filter on the menu screen.
export const FILTER_OPTIONS: CourseFilter[] = ['All', ...COURSES];

// Plural names used on the statistics screen.
export const COURSE_PLURAL_LABELS: Record<Course, string> = {
  Starter: 'Starters',
  'Main Course': 'Main Courses',
  Dessert: 'Desserts',
};
