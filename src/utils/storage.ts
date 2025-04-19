const STORAGE_KEYS = {
  TOKEN: "token",
  CHARACTER_FILTERS: "character_filters",
  CHARACTERS_PAGE: "characters_page",
  LOCATIONS_FILTERS: "locations_filters",
  LOCATIONS_PAGE: "locations_page",
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

  // Location filters and page
  getLocationsFilters: () => {
    const filters = localStorage.getItem(STORAGE_KEYS.LOCATIONS_FILTERS);
    return filters ? JSON.parse(filters) : null;
  },
  setLocationsFilters: (filters: object) =>
    localStorage.setItem(
      STORAGE_KEYS.LOCATIONS_FILTERS,
      JSON.stringify(filters)
    ),
  removeLocationsFilters: () =>
    localStorage.removeItem(STORAGE_KEYS.LOCATIONS_FILTERS),

  getLocationsPage: () => localStorage.getItem(STORAGE_KEYS.LOCATIONS_PAGE),
  setLocationsPage: (page: number) =>
    localStorage.setItem(STORAGE_KEYS.LOCATIONS_PAGE, page.toString()),
  removeLocationsPage: () =>
    localStorage.removeItem(STORAGE_KEYS.LOCATIONS_PAGE),

  // Clear all app data
  clearAll: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CHARACTER_FILTERS);
    localStorage.removeItem(STORAGE_KEYS.CHARACTERS_PAGE);
    localStorage.removeItem(STORAGE_KEYS.LOCATIONS_FILTERS);
    localStorage.removeItem(STORAGE_KEYS.LOCATIONS_PAGE);
  },
};

export default storage;
