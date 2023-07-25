import create from "zustand";
const apiUrl = "https://api.punkapi.com/v2/beers";

export const useBeerStore = create((set, get) => ({
  recipes: [],
  selectedRecipes: [],
  page: 1,
  error: null,
  loading: false,
  fetchRecipes: async () => {
    set({ loading: true });
    try {
      const response = await fetch(`${apiUrl}?page=${get().page}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      set({ recipes: [...get().recipes, ...data] });
    } catch (error) {
      set({ error: error.message });
    }
    set({ loading: false });
  },
  deleteRecipes: (filteredData) => set({ recipes: filteredData,selectedRecipes:[] }),
  selectRecipe: (recipe) => {
    set({
      selectedRecipes: get().selectedRecipes.includes(recipe)
        ? get().selectedRecipes.filter((item) => item !== recipe)
        : [...get().selectedRecipes, recipe],
    });
  },
  setPage: () => set({ page: get().page + 1 }),
}));
