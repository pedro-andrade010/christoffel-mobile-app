import type { CourseFilter, MenuItem } from '../types';

// Returns only the items that match the search text (by dish name)
// AND the selected course. An empty search and "All" show every item.
export function filterMenuItems(
  items: MenuItem[],
  searchText: string,
  courseFilter: CourseFilter
): MenuItem[] {
  const search = searchText.trim().toLowerCase();

  return items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search);
    const matchesCourse = courseFilter === 'All' || item.course === courseFilter;
    return matchesSearch && matchesCourse;
  });
}
