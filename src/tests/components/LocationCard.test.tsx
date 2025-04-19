import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LocationCard from "../../components/Location/LocationCard";
import { Location } from "../../types/location";

describe("LocationCard Component", () => {
  const mockLocation: Location = {
    id: 1,
    name: "Earth (C-137)",
    type: "Planet",
    dimension: "Dimension C-137",
    residents: [
      "https://rickandmortyapi.com/api/character/1",
      "https://rickandmortyapi.com/api/character/2",
    ],
    url: "https://rickandmortyapi.com/api/location/1",
    created: "2017-11-10T12:42:04.162Z",
  };

  it("renders location information correctly", () => {
    render(<LocationCard location={mockLocation} />);

    expect(screen.getByTestId("location-name")).toHaveTextContent(
      "Earth (C-137)"
    );
    expect(screen.getByTestId("location-type")).toHaveTextContent("Planet");
    expect(screen.getByTestId("location-dimension")).toHaveTextContent(
      "Dimension C-137"
    );
    expect(screen.getByTestId("location-residents")).toHaveTextContent("2");
    expect(screen.getByRole("button")).toHaveTextContent("View Residents");
  });

  it("handles long text content", () => {
    const longNameLocation: Location = {
      ...mockLocation,
      name: "This is a very long location name that should be handled properly",
      dimension:
        "This is a very long dimension name that should also be handled properly",
    };

    render(<LocationCard location={longNameLocation} />);

    const nameElement = screen.getByTestId("location-name");
    const dimensionElement = screen.getByTestId("location-dimension");

    expect(nameElement).toHaveTextContent(longNameLocation.name);
    expect(dimensionElement).toHaveTextContent(longNameLocation.dimension);
  });

  it("opens residents modal and shows loading state", async () => {
    render(<LocationCard location={mockLocation} />);

    const viewResidentsButton = screen.getByRole("button", {
      name: /view residents/i,
    });
    fireEvent.click(viewResidentsButton);

    // Check for modal title
    await waitFor(() => {
      expect(
        screen.getByText(/Residents of Earth \(C-137\)/)
      ).toBeInTheDocument();
    });

    // Check for loading spinner
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
    expect(loadingSpinner).toHaveClass("animate-spin");
  });

  it("closes residents modal when clicking close button", async () => {
    render(<LocationCard location={mockLocation} />);

    // Open modal
    const viewResidentsButton = screen.getByRole("button", {
      name: /view residents/i,
    });
    fireEvent.click(viewResidentsButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Residents of Earth \(C-137\)/)
      ).toBeInTheDocument();
    });

    // Find and click the close button (the one with empty name)
    const buttons = screen.getAllByRole("button");
    const closeButton = buttons.find((button) => !button.textContent);
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton!);

    await waitFor(() => {
      expect(
        screen.queryByText(/Residents of Earth \(C-137\)/)
      ).not.toBeInTheDocument();
    });
  });

  it("displays correct resident count", () => {
    const noResidentsLocation: Location = {
      ...mockLocation,
      residents: [],
    };

    const { rerender } = render(
      <LocationCard location={noResidentsLocation} />
    );
    expect(screen.getByTestId("location-residents")).toHaveTextContent("0");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    const oneResidentLocation: Location = {
      ...mockLocation,
      residents: ["https://rickandmortyapi.com/api/character/1"],
    };

    rerender(<LocationCard location={oneResidentLocation} />);
    expect(screen.getByTestId("location-residents")).toHaveTextContent("1");
    expect(screen.getByRole("button")).toHaveTextContent("View Residents");

    rerender(<LocationCard location={mockLocation} />);
    expect(screen.getByTestId("location-residents")).toHaveTextContent("2");
    expect(screen.getByRole("button")).toHaveTextContent("View Residents");
  });

  it("handles location without dimension", () => {
    const noDimensionLocation: Location = {
      ...mockLocation,
      dimension: "unknown",
    };

    render(<LocationCard location={noDimensionLocation} />);
    expect(screen.getByTestId("location-dimension")).toHaveTextContent(
      "unknown"
    );
  });
});
