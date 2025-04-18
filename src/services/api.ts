import axios, { AxiosError } from "axios";
import { Character, ApiResponse, CharacterFilters } from "../types/character";

interface ApiErrorResponse {
  error?: string;
}

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleApiError = (error: AxiosError<ApiErrorResponse>): never => {
  if (error.response) {
    switch (error.response.status) {
      case 404:
        throw new Error("No characters found with the current filters");
      case 429:
        throw new Error("Too many requests. Please try again later");
      case 500:
        throw new Error("Server error. Please try again later");
      default:
        throw new Error(
          `API Error: ${error.response.data?.error || "Unknown error"}`
        );
    }
  } else if (error.request) {
    throw new Error("Network error. Please check your internet connection");
  } else {
    throw new Error("Error setting up the request");
  }
};

export const getCharacters = async (
  page: number = 1,
  filters: Partial<CharacterFilters>
): Promise<ApiResponse> => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value.toLowerCase());
      }
    });

    const response = await api.get<ApiResponse>(`/character?${queryParams}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError<ApiErrorResponse>);
  }
};

export const getCharacterById = async (id: number): Promise<Character> => {
  try {
    const response = await api.get<Character>(`/character/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error as AxiosError<ApiErrorResponse>);
  }
};

export const getMultipleCharacters = async (ids: number[]) => {
  const response = await api.get<Character[]>(`/character/${ids.join(",")}`);
  return response.data;
};

export default api;
