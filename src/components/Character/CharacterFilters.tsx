import React from "react";
import { CharacterFilters as FiltersType } from "../../types/character";
import { genderOptions, statusOptions } from "../../constants";

interface CharacterFiltersProps {
  filters: FiltersType;
  isSearching: boolean;
  onFilterChange: (name: string, value: string) => void;
}

const CharacterFilters: React.FC<CharacterFiltersProps> = ({
  filters,
  isSearching,
  onFilterChange,
}) => {
  return (
    <section className="grid grid-cols-1 gap-4 p-6 mb-8 md:grid-cols-4 bg-white/5 backdrop-blur-lg rounded-xl">
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
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          className="w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          {statusOptions.slice(1).map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Species {isSearching && filters.species && "(Searching...)"}
        </label>
        <input
          type="text"
          name="species"
          value={filters.species}
          onChange={(e) => onFilterChange("species", e.target.value)}
          placeholder="Filter by species..."
          className="w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Gender</label>
        <select
          name="gender"
          value={filters.gender}
          onChange={(e) => onFilterChange("gender", e.target.value)}
          className="w-full px-3 py-2 text-white border border-gray-600 rounded-lg bg-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Genders</option>
          {genderOptions.slice(1).map((gender) => (
            <option key={gender} value={gender}>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default CharacterFilters;
