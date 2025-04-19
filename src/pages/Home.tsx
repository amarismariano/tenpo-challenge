import { useEffect, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { useLocations } from "../hooks/useLocations";
import CharacterCard from "../components/Character/CharacterCard";
import LocationCard from "../components/Location/LocationCard";
import Pagination from "../components/common/Pagination";
import EmptyState from "../components/common/EmptyState";
import Header from "../components/layout/Header";
import CharacterFilters from "../components/Character/CharacterFilters";
import CharacterSkeleton from "../components/Character/CharacterSkeleton";
import ErrorMessage from "../components/common/ErrorMessage";
import LocationFilters from "../components/Location/LocationFilters";

type ViewType = "characters" | "locations";

const Home: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("characters");

  // Characters hook
  const {
    characters,
    isLoading: isLoadingCharacters,
    error: charactersError,
    totalPages: charactersTotalPages,
    totalResults: charactersTotalResults,
    page: charactersPage,
    setPage: setCharactersPage,
    filters: charactersFilters,
    setFilters: setCharactersFilters,
    isSearching: isSearchingCharacters,
  } = useCharacters();

  // Locations hook
  const {
    locations,
    isLoading: isLoadingLocations,
    error: locationsError,
    totalPages: locationsTotalPages,
    totalResults: locationsTotalResults,
    page: locationsPage,
    setPage: setLocationsPage,
    filters: locationsFilters,
    setFilters: setLocationsFilters,
    isSearching: isSearchingLocations,
  } = useLocations();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [charactersPage, charactersFilters, locationsPage, locationsFilters]);

  const handleCharacterFilterChange = (name: string, value: string) => {
    setCharactersFilters({ [name]: value });
  };

  const handleLocationFilterChange = (name: string, value: string) => {
    setLocationsFilters({ [name]: value });
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Header />

        <main className="space-y-8">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setCurrentView("characters")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                currentView === "characters"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Characters
            </button>
            <button
              onClick={() => setCurrentView("locations")}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                currentView === "locations"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Locations
            </button>
          </div>

          {currentView === "characters" ? (
            <>
              <CharacterFilters
                filters={charactersFilters}
                isSearching={isSearchingCharacters}
                onFilterChange={handleCharacterFilterChange}
              />

              <div className="text-center">
                {charactersError ? (
                  <ErrorMessage
                    message={
                      charactersError instanceof Error
                        ? charactersError.message
                        : "An error occurred"
                    }
                    variant="error"
                    className="inline-block"
                  />
                ) : isSearchingCharacters ? (
                  <p className="text-gray-400">Searching characters...</p>
                ) : (
                  <p className="text-gray-400">
                    Showing {characters.length} results of{" "}
                    {charactersTotalResults} total characters
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {isLoadingCharacters ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <CharacterSkeleton key={index} />
                  ))
                ) : characters.length === 0 && !charactersError ? (
                  <EmptyState />
                ) : (
                  characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))
                )}
              </div>

              {charactersTotalPages > 0 && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    currentPage={charactersPage}
                    totalPages={charactersTotalPages}
                    onPageChange={setCharactersPage}
                    isDisabled={isLoadingCharacters || isSearchingCharacters}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <LocationFilters
                filters={locationsFilters}
                isSearching={isSearchingLocations}
                onFilterChange={handleLocationFilterChange}
              />

              <div className="text-center">
                {locationsError ? (
                  <ErrorMessage
                    message={
                      locationsError instanceof Error
                        ? locationsError.message
                        : "An error occurred"
                    }
                    variant="error"
                    className="inline-block"
                  />
                ) : isSearchingLocations ? (
                  <p className="text-gray-400">Searching locations...</p>
                ) : (
                  <p className="text-gray-400">
                    Showing {locations.length} results of{" "}
                    {locationsTotalResults} total locations
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {isLoadingLocations ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl animate-pulse"
                    >
                      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                      </div>
                    </div>
                  ))
                ) : locations.length === 0 && !locationsError ? (
                  <EmptyState />
                ) : (
                  locations.map((location) => (
                    <LocationCard key={location.id} location={location} />
                  ))
                )}
              </div>

              {locationsTotalPages > 0 && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    currentPage={locationsPage}
                    totalPages={locationsTotalPages}
                    onPageChange={setLocationsPage}
                    isDisabled={isLoadingLocations || isSearchingLocations}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
