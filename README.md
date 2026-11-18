# Christoffel's Menu – Chef's Menu Manager

A React Native (Expo + TypeScript) mobile app that helps the chef of a local restaurant manage the menu from a phone, replacing the paper lists used until now.

| | |
|---|---|
| **Student** | Pedro Andrade |
| **Student number** | ST10514330 |
| **Module** | Mobile App Scripting (MAST5112) |
| **Submission** | Final PoE (Part 3) |

- **GitHub repository:** https://github.com/pedro-andrade010/christoffel-mobile-app.git
- **Video demonstration (YouTube, Unlisted):** https://youtu.be/5_E0XPhrPLk?si=N20le1UUfrtKDEng

---

## Features

Each menu item has a **dish name**, **description**, **course** (Starter, Main Course or Dessert) and **price**.

| Feature | Part 2 | Final PoE |
|---|:---:|:---:|
| Add menu items | ✅ | ✅ |
| View all menu items | ✅ | ✅ |
| Validation and feedback messages | ✅ | ✅ (improved) |
| View the details of one item | | ✅ |
| Edit a menu item | | ✅ |
| Delete a menu item (with confirmation) | | ✅ |
| Search by dish name | | ✅ |
| Filter by course and clear the filter | | ✅ |
| Menu statistics | | ✅ |

## How to run

```bash
npm install
npx expo start      # then press "a" for Android, or scan the QR code with Expo Go
```

Check the code compiles without TypeScript errors:

```bash
npm run typecheck
```

## How the app works

The app has six screens and moves between them with a `screen` value kept in `App.tsx` (the same approach used in Part 2). The flow follows the wireframes and flow diagram from Part 1.

```
HOME ──► ADD MENU ITEM ──► MENU ITEMS (list)
  │                          │   ▲
  │                          ▼   │
  ├──► MENU ITEMS ──► MENU ITEM DETAILS ──► EDIT MENU ITEM
  │                          │
  │                          └──► DELETE (asks to confirm) ──► MENU ITEMS
  └──► STATISTICS
```

## Project structure

```
App.tsx                  Holds the app state (menu items, current screen, search/filter)
index.ts                 Expo entry point
src/
├── types/index.ts       TypeScript types: MenuItem, Course, ScreenName ...
├── constants.ts         Course lists and labels
├── theme.ts             Colours, spacing and font sizes in one place
├── screens/
│   ├── HomeScreen.tsx
│   ├── ItemFormScreen.tsx    Used for BOTH adding and editing
│   ├── MenuScreen.tsx        List + search + filter
│   ├── DetailsScreen.tsx     One item, with Edit and Delete
│   └── StatsScreen.tsx
├── components/          Reusable pieces
│   ├── ScreenLayout.tsx, Header.tsx
│   ├── AppButton.tsx, OptionSelector.tsx
│   ├── FormField.tsx, FieldLabel.tsx
│   ├── MenuCard.tsx, DetailRow.tsx, StatCard.tsx, EmptyMessage.tsx
└── utils/
    ├── validation.ts    Form validation and price conversion
    ├── filter.ts        Search + course filter
    ├── stats.ts         Total, average price and items per course
    └── format.ts        Price formatting (R85.50)
```

---

## Change log (Part 2 → Final PoE)

### New features added

1. **Menu item details screen.** Tapping a dish in the list opens a screen with all of its information (as designed in the Part 1 wireframes).
2. **Edit menu items.** The *Edit* button opens the form already filled in with the item's information. Saving updates the item and the change shows immediately in the list.
3. **Delete menu items.** The *Delete* button asks "Are you sure?" before removing the item, then returns to the list and confirms the deletion.
4. **Search.** A search box on the menu screen finds dishes by name (not case-sensitive, updates while typing).
5. **Filter by course.** Buttons for *All / Starter / Main Course / Dessert*. Search and filter work together.
6. **Clear search & filter.** A button appears when a search or filter is active and brings back the full menu.
7. **Statistics screen.** Shows the total number of items, the average price and the number of items in each course. It is reachable from the Home screen and the Menu screen.
8. **Result counter and empty states.** The menu shows "Showing X of Y items", and different messages for "no items added yet" and "no items match your search".

### What was changed during the refactoring

| Part 2 | Final PoE |
|---|---|
| Everything in one large `App.tsx` | `App.tsx` now only holds the state and chooses the screen; the rest is split into `screens/`, `components/`, `utils/` and `types/` |
| `renderHome()`, `renderAddForm()`, `renderMenu()` functions inside `App` | Separate screen components: `HomeScreen`, `ItemFormScreen`, `MenuScreen`, `DetailsScreen`, `StatsScreen` |
| The same button code and styles repeated on every screen | One reusable `AppButton` with `primary`, `secondary` and `danger` styles |
| Three different course buttons written with `map` and inline styles | Reusable `OptionSelector`, also used for the course filter |
| Header written again on each screen | Reusable `Header` and `ScreenLayout` (header stays fixed while the content scrolls) |
| Colours and sizes typed as raw values in each style | `theme.ts` with `colors`, `spacing` and `fontSizes` |
| `MenuItem` type, `screen` as a plain `string` | `types/index.ts` with `Course`, `CourseFilter`, `MenuItemData` and `ScreenName`, so TypeScript catches wrong values |
| Validation written inside `saveItem()` | `validateForm()` in `utils/validation.ts` |
| Add form only | `ItemFormScreen` used for adding **and** editing, so no code is duplicated |
| Menu cards written inside `renderMenu()` | Reusable `MenuCard` |
| Small inline functions | Named helper functions: `filterMenuItems`, `calculateStats`, `formatPrice`, `parsePrice` |

### Improved validation and user feedback

- Error messages now appear **under each field** in red (and the field border turns red) instead of a single pop-up. A message at the bottom reminds the chef to fix the highlighted fields.
- The error disappears as soon as the chef starts correcting that field.
- The **price** accepts a comma or a dot (`85,50` or `85.50`). This fixes a Part 2 problem where some keyboards typed a comma and the app wrongly said the price was invalid. The price must be greater than zero and have at most 2 decimals.
- The **dish name** must have at least 2 characters and cannot be the same as another dish (not case-sensitive).
- The description must have at least 5 characters. Name and description have a maximum length.
- Success messages now include the dish name (for example: *"Chicken Curry" was added to the menu.*).
- After adding a dish, any active search or filter is cleared so the new dish is visible in the list.

### User experience improvements

- Same header, buttons, spacing and colours on every screen.
- The Home screen shows how many dishes are on the menu.
- Every screen has a clear way back (*Cancel*, *Back to Menu*, *Back to Home*).
- Cancelling an edit returns to the item's details; cancelling an add returns to Home.
- Search and filter are remembered when the chef opens an item and comes back to the list.
- Content is scrollable on every screen (the header stays fixed) and the header has space for the Android status bar.
- New app name ("Christoffel's Menu") and a placeholder app icon (plate and cutlery).

### Small difference from the Part 1 flow diagram

In the flow diagram, *Edit* and *Delete* lead back to **Home**. In the app they return to the **Menu list** (or to the item's details after editing), because the chef will usually want to continue working with the list. All the screens and buttons from the wireframes are present.

---

## Notes

- Menu items are kept in memory only, so they are cleared when the app is closed. Saving data permanently was not part of the Final PoE requirements.
- The app icons in `assets/` are placeholders and can be replaced with any image of the same size.
