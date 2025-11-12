// app/dishesStore.ts

// Dish type
export type Dish = {
  id: string;
  name: string;
  description: string;
  course: string; // e.g., "Starter", "Main", "Dessert"
  price: string;
  image?: string | null;
};

// Shared array to store all dishes
let dishes: Dish[] = [];

// Currently active filter (array of course names), null means no filter
let activeFilter: string[] | null = null;

/**
 * Get all dishes (ignores filter)
 */
export const getDishes = (): Dish[] => {
  return [...dishes];
};

/**
 * Get dishes with active filter applied
 */
export const getFilteredDishes = (): Dish[] => {
  if (!activeFilter || activeFilter.length === 0) {
    return [...dishes]; // no filter applied
  }

  // Filter safely
  return dishes.filter((d) => activeFilter?.includes(d.course) ?? true);
};

/**
 * Add a new dish
 */
export const addDish = (dish: Dish) => {
  dishes.push(dish);
};

/**
 * Delete a dish by id
 */
export const deleteDish = (id: string) => {
  dishes = dishes.filter((d) => d.id !== id);
};

/**
 * Set an active filter
 */
export const setFilter = (filter: string[] | null) => {
  activeFilter = filter;
};

/**
 * Clear the filter
 */
export const clearFilter = () => {
  activeFilter = null;
};

