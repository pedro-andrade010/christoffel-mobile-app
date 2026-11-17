// The three courses a dish can belong to.
export type Course = 'Starter' | 'Main Course' | 'Dessert';

// "All" is only used by the course filter on the menu screen.
export type CourseFilter = Course | 'All';

// One dish on the menu.
export type MenuItem = {
  id: number;
  name: string;
  description: string;
  course: Course;
  price: number;
};

// The data the chef types in the form (the id is created when the item is saved).
export type MenuItemData = Omit<MenuItem, 'id'>;

// Every screen in the app. The app moves between them using this value.
export type ScreenName = 'home' | 'add' | 'edit' | 'menu' | 'details' | 'stats';
