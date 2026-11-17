import type { Course, MenuItem } from '../types';

export type MenuStats = {
  totalItems: number;
  averagePrice: number;
  itemsPerCourse: Record<Course, number>;
};

// Works out the numbers shown on the statistics screen.
export function calculateStats(items: MenuItem[]): MenuStats {
  const itemsPerCourse: Record<Course, number> = {
    Starter: 0,
    'Main Course': 0,
    Dessert: 0,
  };
  let totalPrice = 0;

  for (const item of items) {
    itemsPerCourse[item.course] += 1;
    totalPrice += item.price;
  }

  const totalItems = items.length;
  // Avoid dividing by zero when the menu is empty.
  const averagePrice = totalItems === 0 ? 0 : totalPrice / totalItems;

  return { totalItems, averagePrice, itemsPerCourse };
}
