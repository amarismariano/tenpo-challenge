// Toast configurations
export const TOAST_DURATION = 3000;
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back! You've successfully logged in 🚀",
  LOGOUT_SUCCESS: "You've been successfully logged out. See you soon! 👋",
  LOGIN_ERROR: "An error occurred during login. Please try again.",
  NETWORK_ERROR: "Network error. Please check your internet connection.",
  VALIDATION_ERROR: {
    EMAIL_REQUIRED: "Email address is required",
    PASSWORD_REQUIRED: "Password is required",
    INVALID_EMAIL: "Please enter a valid email address",
    PASSWORD_LENGTH: "Password must be at least 6 characters",
  },
  API_ERROR: {
    NOT_FOUND: "Resource not found",
    SERVER_ERROR: "Server error occurred. Please try again later",
    UNAUTHORIZED: "Session expired. Please log in again",
    DEFAULT: "An unexpected error occurred",
  },
};

// API configurations
export const API_CONFIG = {
  BASE_URL: "https://rickandmortyapi.com/api",
  ENDPOINTS: {
    CHARACTERS: "/character",
  },
  TIMEOUT: 10000,
};

// Route paths
export const ROUTES = {
  HOME: "/home",
  LOGIN: "/login",
  NOT_FOUND: "*",
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER_PREFERENCES: "userPreferences",
};

// Validation configurations
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Pagination configurations
export const PAGINATION = {
  ITEMS_PER_PAGE: 20,
  MAX_VISIBLE_PAGES: 5,
};

// Character status options
export const CHARACTER_STATUS = {
  ALL: "",
  ALIVE: "alive",
  DEAD: "dead",
  UNKNOWN: "unknown",
} as const;

// Character gender options
export const CHARACTER_GENDER = {
  ALL: "",
  FEMALE: "female",
  MALE: "male",
  GENDERLESS: "genderless",
  UNKNOWN: "unknown",
} as const;

// Character status options
export const statusOptions = ["", "alive", "dead", "unknown"];

// Character gender options
export const genderOptions = ["", "female", "male", "genderless", "unknown"];
