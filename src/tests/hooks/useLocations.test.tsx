import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useLocations } from "../../hooks/useLocations";
import { getLocations } from "../../services/api";

// Mock the API module
vi.mock("../../services/api", () => ({
  getLocations: vi.fn(),
}));

// Mock storage
vi.mock("../../utils/storage", () => ({
  default: {
    getLocationsPage: vi.fn(() => null),
    setLocationsPage: vi.fn(),
    getLocationsFilters: vi.fn(() => null),
    setLocationsFilters: vi.fn(),
  },
}));

describe("useLocations Hook", () => {
  const mockLocationsResponse = {
    results: [
      {
        id: 1,
        name: "Earth",
        type: "Planet",
        dimension: "Dimension C-137",
        residents: ["https://rickandmortyapi.com/api/character/1"],
        url: "https://rickandmortyapi.com/api/location/1",
        created: "2017-11-10T12:42:04.162Z",
      },
      {
        id: 2,
        name: "Citadel of Ricks",
        type: "Space station",
        dimension: "unknown",
        residents: ["https://rickandmortyapi.com/api/character/2"],
        url: "https://rickandmortyapi.com/api/location/2",
        created: "2017-11-10T13:32:04.162Z",
      },
    ],
    info: {
      pages: 3,
      count: 30,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (getLocations as any).mockResolvedValue(mockLocationsResponse);
  });

  it("initializes with default values", async () => {
    const { result } = renderHook(() => useLocations());

    expect(result.current.page).toBe(1);
    expect(result.current.locations).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.filters).toEqual({
      name: "",
      type: "",
      dimension: "",
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("fetches locations on mount", async () => {
    const { result } = renderHook(() => useLocations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.locations).toEqual(mockLocationsResponse.results);
      expect(result.current.totalPages).toBe(mockLocationsResponse.info.pages);
      expect(result.current.totalResults).toBe(
        mockLocationsResponse.info.count
      );
    });
  });

  it("handles page changes", async () => {
    const { result } = renderHook(() => useLocations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(getLocations).toHaveBeenCalledWith(2, expect.any(Object));
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("resets filters when all values are empty", async () => {
    const { result } = renderHook(() => useLocations());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Set some filters first
    await act(async () => {
      result.current.setFilters({ name: "Earth", type: "Planet" });
    });

    expect(result.current.filters.name).toBe("Earth");
    expect(result.current.filters.type).toBe("Planet");

    // Reset filters
    await act(async () => {
      result.current.setFilters({ name: "", type: "" });
    });

    expect(result.current.filters).toEqual({
      name: "",
      type: "",
      dimension: "",
    });
  });

  it("debounces filter changes", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useLocations());

    await act(async () => {
      result.current.setFilters({ name: "Ea" });
    });

    expect(result.current.isSearching).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(200);
      result.current.setFilters({ name: "Earth" });
    });

    expect(result.current.isSearching).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.isSearching).toBe(false);
    vi.useRealTimers();
  });
});
