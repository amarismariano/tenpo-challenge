import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CharacterCard from "../../components/Character/CharacterCard";

describe("CharacterCard Component", () => {
  const mockCharacter = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
    ],
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
  };

  it("renders character basic information correctly", () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByTestId("character-name")).toHaveTextContent(
      "Rick Sanchez"
    );
    expect(screen.getByTestId("character-status")).toHaveTextContent(
      "Alive - Human"
    );
    expect(screen.getByTestId("character-location")).toHaveTextContent(
      "Citadel of Ricks"
    );
    expect(screen.getByTestId("character-origin")).toHaveTextContent(
      "Earth (C-137)"
    );
    expect(screen.getByTestId("character-species")).toHaveTextContent("Human");
    expect(screen.getByTestId("character-gender")).toHaveTextContent("Male");
    expect(screen.getByTestId("character-episodes")).toHaveTextContent("2");
  });

  it("displays correct status indicator color for alive status", () => {
    render(<CharacterCard character={mockCharacter} />);
    const statusIndicator = screen
      .getByTestId("character-status")
      .querySelector("span:first-child");
    expect(statusIndicator).toHaveClass("bg-green-500");
  });

  it("displays correct status indicator color for dead status", () => {
    const deadCharacter = { ...mockCharacter, status: "Dead" };
    render(<CharacterCard character={deadCharacter} />);
    const statusIndicator = screen
      .getByTestId("character-status")
      .querySelector("span:first-child");
    expect(statusIndicator).toHaveClass("bg-red-500");
  });

  it("displays correct status indicator color for unknown status", () => {
    const unknownCharacter = { ...mockCharacter, status: "unknown" };
    render(<CharacterCard character={unknownCharacter} />);
    const statusIndicator = screen
      .getByTestId("character-status")
      .querySelector("span:first-child");
    expect(statusIndicator).toHaveClass("bg-gray-500");
  });

  it("renders character image correctly", () => {
    render(<CharacterCard character={mockCharacter} />);
    const image = screen.getByTestId("character-image");
    expect(image).toHaveAttribute("src", mockCharacter.image);
    expect(image).toHaveAttribute("alt", mockCharacter.name);
  });

  it("shows View Details button on hover", async () => {
    render(<CharacterCard character={mockCharacter} />);
    const card = screen.getByTestId("character-card");
    const button = screen.getByRole("button", { name: /view details/i });

    expect(button.parentElement).toHaveClass(
      "mt-4 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
    );

    fireEvent.mouseEnter(card);

    expect(button.parentElement).toHaveClass(
      "mt-4 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
    );
  });

  it("opens modal when View Details button is clicked", () => {
    render(<CharacterCard character={mockCharacter} />);
    const button = screen.getByRole("button", { name: /view details/i });

    fireEvent.click(button);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<CharacterCard character={mockCharacter} />);

    const button = screen.getByRole("button", { name: /view details/i });
    fireEvent.click(button);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("applies hover effects to character name", () => {
    render(<CharacterCard character={mockCharacter} />);
    const name = screen.getByTestId("character-name");

    expect(name).toHaveClass(
      "group-hover:text-green-400",
      "group-hover:scale-105"
    );
  });

  it("truncates long text in name and locations", () => {
    const longNameCharacter = {
      ...mockCharacter,
      name: "A very very very very very long character name that should be truncated",
      location: {
        ...mockCharacter.location,
        name: "A very very very very long location name",
      },
      origin: {
        ...mockCharacter.origin,
        name: "A very very very very long origin name",
      },
    };

    render(<CharacterCard character={longNameCharacter} />);

    expect(screen.getByTestId("character-name")).toHaveClass("truncate");
    expect(screen.getByTestId("character-location")).toHaveClass("truncate");
    expect(screen.getByTestId("character-origin")).toHaveClass("truncate");
  });

  it("displays episode count correctly", () => {
    const manyEpisodesCharacter = {
      ...mockCharacter,
      episode: Array(20).fill("https://rickandmortyapi.com/api/episode/1"),
    };

    render(<CharacterCard character={manyEpisodesCharacter} />);
    expect(screen.getByTestId("character-episodes")).toHaveTextContent("20");
  });
});
