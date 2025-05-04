import { useState, useEffect, useCallback, useMemo } from "react";
import { getCharacters } from "../services/api";
import { Character } from "../types/character";
import { useDebounce } from "./useDebounce";
import { storage } from "../utils/storage";
import { cache } from "../utils/cache";

interface CharacterFilters {
  name: string;
  status: string;
  species: string;
  gender: string;
}

const DEFAULT_FILTERS: CharacterFilters = {
  name: "",
  status: "",
  species: "",
  gender: "",
};

interface CharacterError {
  message: string;
  status?: number;
}

interface UseCharactersReturn {
  characters: Character[];
  isLoading: boolean;
  error: Error | null;
  totalPages: number;
  totalResults: number;
  page: number;
  setPage: (page: number) => void;
  filters: CharacterFilters;
  setFilters: (filters: Partial<CharacterFilters>) => void;
  isSearching: boolean;
}

export const useCharacters = (): UseCharactersReturn => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(() => {
    const savedPage = storage.getPage();
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState<CharacterFilters>(() => {
    const savedFilters = storage.getFilters();
    return savedFilters || DEFAULT_FILTERS;
  });

  const debouncedName = useDebounce(filters.name, 300);
  const debouncedSpecies = useDebounce(filters.species, 300);
  const [isSearching, setIsSearching] = useState(false);

  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      name: debouncedName,
      species: debouncedSpecies,
    }),
    [filters, debouncedName, debouncedSpecies]
  );

  const getCacheKey = useCallback(
    (pageNum: number) => {
      const filterParams = Object.entries(effectiveFilters)
        .filter(([_, value]) => value)
        .sort()
        .join(",");
      return `characters_${pageNum}_${filterParams}`;
    },
    [effectiveFilters]
  );

  useEffect(() => {
    const isCurrentlySearching =
      filters.name !== debouncedName || filters.species !== debouncedSpecies;

    setIsSearching(isCurrentlySearching);

    if (!isCurrentlySearching && !isLoading) {
      const hasSearchTerms =
        debouncedName || debouncedSpecies || filters.status || filters.gender;
      if (hasSearchTerms && characters.length === 0) {
        setError(new Error("No characters found with current filters"));
      } else {
        setError(null);
      }
    }
  }, [filters, debouncedName, debouncedSpecies, characters.length, isLoading]);

  useEffect(() => {
    storage.setPage(page);
  }, [page]);

  useEffect(() => {
    storage.setFilters(filters);
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
      }, cache.getMinimumLoadingTime());
    };

    const fetchCharacters = async () => {
      try {
        const cacheKey = getCacheKey(page);
        const cached = cache.get<Character>(cacheKey);

        if (cached && !isSearching) {
          if (isMounted) {
            setCharacters(cached.data.results);
            setTotalPages(cached.data.info.pages);
            setTotalResults(cached.data.info.count);
            setIsLoading(false);
          }
          return;
        }

        startLoading();

        const data = await getCharacters(page, effectiveFilters);

        if (isMounted) {
          setCharacters(data.results);
          setTotalPages(data.info.pages);
          setTotalResults(data.info.count);

          if (!isSearching) {
            cache.set(cacheKey, data);
          }

          stopLoading();
        }
      } catch (error: unknown) {
        const err = error as CharacterError;
        setError(
          new Error(
            err.message || "An error occurred while fetching characters"
          )
        );
        setCharacters([]);
        setTotalPages(0);
        setTotalResults(0);
        stopLoading();
      }
    };

    clearTimeout(searchTimeout);

    if (isSearching) {
      searchTimeout = window.setTimeout(fetchCharacters, 300);
    } else {
      fetchCharacters();
    }

    return () => {
      isMounted = false;
      clearTimeout(loadingTimeout);
      clearTimeout(searchTimeout);
    };
  }, [page, effectiveFilters, getCacheKey, isSearching]);

  const handleSetFilters = useCallback(
    (newFilters: Partial<CharacterFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      setPage(1);
      setError(null);
    },
    []
  );

  return {
    characters,
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
