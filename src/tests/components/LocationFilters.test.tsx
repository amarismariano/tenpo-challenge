import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LocationFilters from "../../components/Location/LocationFilters";
import { LocationFilters as FiltersType } from "../../types/location";

describe("LocationFilters", () => {
  const mockOnFilterChange = vi.fn();
  let filters: FiltersType;

  beforeEach(() => {
    filters = {
      name: "",
      type: "",
      dimension: "",
    };
    mockOnFilterChange.mockClear();
  });

  test("renders all filter inputs", () => {
    render(
      <LocationFilters
        filters={filters}
        onFilterChange={mockOnFilterChange}
        isSearching={false}
      />
    );

    expect(screen.getByTestId("location-name-filter")).toBeInTheDocument();
    expect(screen.getByTestId("location-type-filter")).toBeInTheDocument();
    expect(screen.getByTestId("location-dimension-filter")).toBeInTheDocument();
  });

  test("calls onFilterChange when inputs change", () => {
    render(
      <LocationFilters
        filters={filters}
        onFilterChange={mockOnFilterChange}
        isSearching={false}
      />
    );

    const nameInput = screen.getByTestId("location-name-filter");
    fireEvent.change(nameInput, { target: { value: "Earth" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("name", "Earth");

    const typeInput = screen.getByTestId("location-type-filter");
    fireEvent.change(typeInput, { target: { value: "Planet" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("type", "Planet");

    const dimensionInput = screen.getByTestId("location-dimension-filter");
    fireEvent.change(dimensionInput, { target: { value: "C-137" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("dimension", "C-137");
  });

  test("shows searching indicator when isSearching is true and filters have values", () => {
    const activeFilters: FiltersType = {
      name: "Earth",
      type: "Planet",
      dimension: "C-137",
    };

    render(
      <LocationFilters
        filters={activeFilters}
        onFilterChange={mockOnFilterChange}
        isSearching={true}
      />
    );

    expect(screen.getByText("Name (Searching...)")).toBeInTheDocument();
    expect(screen.getByText("Type (Searching...)")).toBeInTheDocument();
    expect(screen.getByText("Dimension (Searching...)")).toBeInTheDocument();
  });

  test("does not show searching indicator when isSearching is false", () => {
    const activeFilters: FiltersType = {
      name: "Earth",
      type: "Planet",
      dimension: "C-137",
    };

    render(
      <LocationFilters
        filters={activeFilters}
        onFilterChange={mockOnFilterChange}
        isSearching={false}
      />
    );

    expect(screen.queryByText("Name (Searching...)")).not.toBeInTheDocument();
    expect(screen.queryByText("Type (Searching...)")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Dimension (Searching...)")
    ).not.toBeInTheDocument();
  });
});
