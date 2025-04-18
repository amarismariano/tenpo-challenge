const STORAGE_KEYS = {
  TOKEN: "token",
  CHARACTER_FILTERS: "characterFilters",
  CHARACTERS_PAGE: "charactersPage",
} as const;

export const storage = {
  // Auth
  getToken: () => localStorage.getItem(STORAGE_KEYS.TOKEN),
  setToken: (token: string) => localStorage.setItem(STORAGE_KEYS.TOKEN, token),
  removeToken: () => localStorage.removeItem(STORAGE_KEYS.TOKEN),

  // Filters
  getFilters: () => {
    const filters = localStorage.getItem(STORAGE_KEYS.CHARACTER_FILTERS);
    return filters ? JSON.parse(filters) : null;
  },
  setFilters: (filters: object) =>
    localStorage.setItem(
      STORAGE_KEYS.CHARACTER_FILTERS,
      JSON.stringify(filters)
    ),
  removeFilters: () => localStorage.removeItem(STORAGE_KEYS.CHARACTER_FILTERS),

  // Page
  getPage: () => localStorage.getItem(STORAGE_KEYS.CHARACTERS_PAGE),
  setPage: (page: number) =>
    localStorage.setItem(STORAGE_KEYS.CHARACTERS_PAGE, page.toString()),
  removePage: () => localStorage.removeItem(STORAGE_KEYS.CHARACTERS_PAGE),

  // Clear all app data
  clearAll: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CHARACTER_FILTERS);
    localStorage.removeItem(STORAGE_KEYS.CHARACTERS_PAGE);
  },
};

export default storage;
