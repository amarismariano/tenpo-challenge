import { useState } from "react";
import { ViewType } from "../types/view";
import { views } from "../config/views";
import Pagination from "../components/common/Pagination";
import ErrorMessage from "../components/common/ErrorMessage";
import { useScrollToTop } from "../hooks/useScrollToTop";

export const Home = () => {
  const [currentView, setCurrentView] = useState<ViewType>("characters");
  const viewConfig = views.find((view) => view.id === currentView)!;
  const {
    data,
    isLoading,
    error,
    totalPages,
    totalResults,
    page,
    setPage,
    filters,
    setFilters,
    isSearching,
  } = viewConfig.useHook();

  useScrollToTop(page);

  const ViewFilters = viewConfig.filtersComponent;
  const ViewCard = viewConfig.cardComponent;
  const ViewSkeleton = viewConfig.skeletonComponent;

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-wrap gap-4 mb-8">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setCurrentView(view.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentView === view.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {view.icon} {view.label}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <ViewFilters
          filters={filters}
          onFilterChange={setFilters}
          isSearching={isSearching}
        />
      </div>

      {error && (
        <ErrorMessage
          message={error.message}
          variant="error"
          className="mb-8"
        />
      )}

      {isLoading ? (
        <ViewSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item: any) => (
            <ViewCard key={item.id} {...item} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalResults={totalResults}
        />
      )}
    </div>
  );
};
