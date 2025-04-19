import React from "react";
import { LocationFilters as FiltersType } from "../../types/location";

interface LocationFiltersProps {
  filters: FiltersType;
  isSearching: boolean;
  onFilterChange: (name: string, value: string) => void;
}

const LocationFilters: React.FC<LocationFiltersProps> = ({
  filters,
  isSearching,
  onFilterChange,
}) => {
  return (
    <section className="grid grid-cols-1 gap-4 p-6 mb-8 md:grid-cols-3 bg-white/5 backdrop-blur-lg rounded-xl">
      <div>
        <label className="block mb-2 text-sm font-medium">
          Name {isSearching && filters.name && "(Searching...)"}
        </label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={(e) => onFilterChange("name", e.target.value)}
          placeholder="Search by name..."
          className="w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="location-name-filter"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Type {isSearching && filters.type && "(Searching...)"}
        </label>
        <input
          type="text"
          name="type"
          value={filters.type}
          onChange={(e) => onFilterChange("type", e.target.value)}
          placeholder="Filter by type..."
          className="w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="location-type-filter"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Dimension {isSearching && filters.dimension && "(Searching...)"}
        </label>
        <input
          type="text"
          name="dimension"
          value={filters.dimension}
          onChange={(e) => onFilterChange("dimension", e.target.value)}
          placeholder="Filter by dimension..."
          className="w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="location-dimension-filter"
        />
      </div>
    </section>
  );
};

export default LocationFilters;
