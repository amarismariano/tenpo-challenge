import { useEffect } from "react";
import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/Character/CharacterCard";
import Pagination from "../components/common/Pagination";
import EmptyState from "../components/common/EmptyState";
import Header from "../components/layout/Header";
import CharacterFilters from "../components/Character/CharacterFilters";
import CharacterSkeleton from "../components/Character/CharacterSkeleton";
import ErrorMessage from "../components/common/ErrorMessage";

const Home: React.FC = () => {
  const {
    characters,
    isLoading,
    error,
    totalPages,
    totalResults,
    page,
    setPage,
    filters,
    setFilters,
    isSearching,
  } = useCharacters();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page, filters]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters({ [name]: value });
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Header />

        <main className="space-y-8">
          <CharacterFilters
            filters={filters}
            isSearching={isSearching}
            onFilterChange={handleFilterChange}
          />

          <div className="text-center">
            {error ? (
              <ErrorMessage
                message={
                  error instanceof Error ? error.message : "An error occurred"
                }
                variant="error"
                className="inline-block"
              />
            ) : isSearching ? (
              <p className="text-gray-400">Searching characters...</p>
            ) : (
              <p className="text-gray-400">
                Showing {characters.length} results of {totalResults} total
                characters
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <CharacterSkeleton key={index} />
              ))
            ) : characters.length === 0 && !error ? (
              <EmptyState />
            ) : (
              characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))
            )}
          </div>

          {totalPages > 0 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                isDisabled={isLoading || isSearching}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
