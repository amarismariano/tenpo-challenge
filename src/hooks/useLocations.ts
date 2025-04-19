import { useState, useEffect, useCallback, useMemo } from "react";
import { getLocations } from "../services/api";
import { Location, LocationFilters } from "../types/location";
import { useDebounce } from "./useDebounce";
import storage from "../utils/storage";

const DEFAULT_FILTERS: LocationFilters = {
  name: "",
  type: "",
  dimension: "",
};

interface LocationError {
  message: string;
  status?: number;
}

interface UseLocationsReturn {
  locations: Location[];
  isLoading: boolean;
  error: Error | null;
  totalPages: number;
  totalResults: number;
  page: number;
  setPage: (page: number) => void;
  filters: LocationFilters;
  setFilters: (filters: Partial<LocationFilters>) => void;
  isSearching: boolean;
}

// Cache object to store API responses
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MINIMUM_LOADING_TIME = 500;

export const useLocations = (): UseLocationsReturn => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(() => {
    const savedPage = storage.getLocationsPage();
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState<LocationFilters>(() => {
    const savedFilters = storage.getLocationsFilters();
    return savedFilters || DEFAULT_FILTERS;
  });

  const debouncedName = useDebounce(filters.name, 300);
  const debouncedType = useDebounce(filters.type, 300);
  const debouncedDimension = useDebounce(filters.dimension, 300);
  const [isSearching, setIsSearching] = useState(false);

  const effectiveFilters = useMemo(
    () => ({
      name: debouncedName.trim(),
      type: debouncedType.trim(),
      dimension: debouncedDimension.trim(),
    }),
    [debouncedName, debouncedType, debouncedDimension]
  );

  const hasActiveFilters = useMemo(
    () => Object.values(effectiveFilters).some((value) => value !== ""),
    [effectiveFilters]
  );

  const getCacheKey = useCallback(
    (pageNum: number) => {
      if (!hasActiveFilters) return `locations_${pageNum}`;

      const filterParams = Object.entries(effectiveFilters)
        .filter(([_, value]) => value)
        .sort()
        .join(",");
      return `locations_${pageNum}_${filterParams}`;
    },
    [effectiveFilters, hasActiveFilters]
  );

  useEffect(() => {
    const isCurrentlySearching =
      filters.name.trim() !== debouncedName.trim() ||
      filters.type.trim() !== debouncedType.trim() ||
      filters.dimension.trim() !== debouncedDimension.trim();

    setIsSearching(isCurrentlySearching);

    if (!isCurrentlySearching && !isLoading) {
      if (hasActiveFilters && locations.length === 0) {
        setError(new Error("No locations found with current filters"));
      } else {
        setError(null);
      }
    }
  }, [
    filters,
    debouncedName,
    debouncedType,
    debouncedDimension,
    locations.length,
    isLoading,
    hasActiveFilters,
  ]);

  useEffect(() => {
    storage.setLocationsPage(page);
  }, [page]);

  useEffect(() => {
    storage.setLocationsFilters(filters);
  }, [filters]);

  useEffect(() => {
    let isMounted = true;
    let loadingTimeout = 0;
    let searchTimeout = 0;

    const startLoading = () => {
      setIsLoading(true);
      setError(null);
    };

    const stopLoading = () => {
      if (!isMounted) return;

      clearTimeout(loadingTimeout);
      loadingTimeout = window.setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }, MINIMUM_LOADING_TIME);
    };

    const fetchLocations = async () => {
      try {
        startLoading();

        const cacheKey = getCacheKey(page);
        const cached = cache[cacheKey];

        if (
          cached &&
          Date.now() - cached.timestamp < CACHE_DURATION &&
          !isSearching
        ) {
          if (isMounted) {
            setLocations(cached.data.results);
            setTotalPages(cached.data.info.pages);
            setTotalResults(cached.data.info.count);
            stopLoading();
          }
        } else {
          const data = await getLocations(page, effectiveFilters);

          if (isMounted) {
            setLocations(data.results);
            setTotalPages(data.info.pages);
            setTotalResults(data.info.count);

            if (!isSearching) {
              cache[cacheKey] = {
                data,
                timestamp: Date.now(),
              };
            }

            stopLoading();
          }
        }
      } catch (error: unknown) {
        const err = error as LocationError;
        setError(
          new Error(err.message || "An error occurred while fetching locations")
        );
        setLocations([]);
        setTotalPages(0);
        setTotalResults(0);
        stopLoading();
      }
    };

    clearTimeout(searchTimeout);

    if (isSearching) {
      searchTimeout = window.setTimeout(fetchLocations, 300);
    } else {
      fetchLocations();
    }

    return () => {
      isMounted = false;
      clearTimeout(loadingTimeout);
      clearTimeout(searchTimeout);
    };
  }, [page, effectiveFilters, getCacheKey, isSearching]);

  const handleSetFilters = useCallback(
    (newFilters: Partial<LocationFilters>) => {
      setFilters((prev) => {
        const updated = { ...prev, ...newFilters };
        // Si todos los filtros están vacíos, resetear al estado inicial
        if (Object.values(updated).every((value) => !value.trim())) {
          return DEFAULT_FILTERS;
        }
        return updated;
      });
      setPage(1);
      setError(null);
    },
    []
  );

  return {
    locations,
    isLoading,
    error,
    totalPages,
    totalResults,
    page,
    setPage,
    filters,
    setFilters: handleSetFilters,
    isSearching,
  };
};
