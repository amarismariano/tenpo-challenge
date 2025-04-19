import { useState, useEffect, useCallback } from "react";
import { Character } from "../types/character";
import { Location } from "../types/location";
import { getMultipleCharacters } from "../services/api";
import { useDebounce } from "./useDebounce";

interface UseLocationResidentsReturn {
  residents: Character[];
  isLoading: boolean;
  error: string | null;
  isSearching: boolean;
}

export const useLocationResidents = (
  location: Location,
  isOpen: boolean
): UseLocationResidentsReturn => {
  const [residents, setResidents] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedResidents = useDebounce(location.residents, 300);

  const fetchResidents = useCallback(async () => {
    if (!isOpen || debouncedResidents.length === 0) {
      setResidents([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const residentIds = debouncedResidents.map((url) =>
        parseInt(url.split("/").pop() || "0")
      );
      const data = await getMultipleCharacters(residentIds);
      setResidents(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError("Failed to load residents");
      setResidents([]);
    } finally {
      setIsLoading(false);
    }
  }, [isOpen, debouncedResidents]);

  useEffect(() => {
    const isCurrentlySearching = location.residents !== debouncedResidents;
    setIsSearching(isCurrentlySearching);
  }, [location.residents, debouncedResidents]);

  useEffect(() => {
    if (isSearching) {
      return;
    }
    fetchResidents();
  }, [fetchResidents, isSearching]);

  return {
    residents,
    isLoading,
    error,
    isSearching,
  };
};
