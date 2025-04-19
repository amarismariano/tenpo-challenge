import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useCharacters } from "../../hooks/useCharacters";
import { getCharacters } from "../../services/api";

// Mock the API module
vi.mock("../../services/api", () => ({
  getCharacters: vi.fn(),
}));

// Mock the storage
vi.mock("../../utils/storage", async () => {
  const actual = await vi.importActual("../../utils/storage");
  return {
    ...actual,
    storage: {
      getPage: vi.fn(() => null),
      setPage: vi.fn(),
      getFilters: vi.fn(() => null),
      setFilters: vi.fn(),
    },
  };
});

// Mock the cache module
vi.mock("../../utils/cache", async () => {
  const actual = await vi.importActual("../../utils/cache");
  return {
    ...actual,
    cache: {
      get: vi.fn(() => null),
      set: vi.fn(),
      getMinimumLoadingTime: vi.fn(() => 0),
    },
  };
});

describe("useCharacters Hook", () => {
  const mockCharactersResponse = {
    results: [
      { id: 1, name: "Rick", species: "Human" },
      { id: 2, name: "Morty", species: "Human" },
    ],
    info: {
      pages: 3,
      count: 30,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (getCharacters as any).mockResolvedValue(mockCharactersResponse);
  });

  it("initializes with default values", async () => {
    const { result } = renderHook(() => useCharacters());

    expect(result.current.page).toBe(1);
    expect(result.current.characters).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.filters).toEqual({
      name: "",
      status: "",
      species: "",
      gender: "",
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("fetches characters on mount", async () => {
    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.characters).toEqual(mockCharactersResponse.results);
      expect(result.current.totalPages).toBe(mockCharactersResponse.info.pages);
    });
  });

  it("handles page changes", async () => {
    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledWith(2, expect.any(Object));
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("handles filter changes", async () => {
    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      result.current.setFilters({ name: "Rick" });
    });

    expect(result.current.filters.name).toBe("Rick");
    expect(result.current.page).toBe(1);
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledWith(
        1,
        expect.objectContaining({
          name: "Rick",
        })
      );
      expect(result.current.isLoading).toBe(false);
    });
  });
});
