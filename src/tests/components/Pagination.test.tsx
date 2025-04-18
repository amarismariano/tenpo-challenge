import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../components/Pagination";

describe("Pagination Component", () => {
  it("renders pagination with correct page numbers", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={() => {}}
        isDisabled={false}
      />
    );

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 2 of 5");
  });

  it("disables Previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
        isDisabled={false}
      />
    );

    expect(screen.getByTestId("previous-button")).toBeDisabled();
    expect(screen.getByTestId("next-button")).not.toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={() => {}}
        isDisabled={false}
      />
    );

    expect(screen.getByTestId("next-button")).toBeDisabled();
    expect(screen.getByTestId("previous-button")).not.toBeDisabled();
  });

  it("calls onPageChange with correct values when clicking buttons", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
        isDisabled={false}
      />
    );

    fireEvent.click(screen.getByTestId("previous-button"));
    expect(onPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByTestId("next-button"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables all buttons when isDisabled is true", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={() => {}}
        isDisabled={true}
      />
    );

    expect(screen.getByTestId("previous-button")).toBeDisabled();
    expect(screen.getByTestId("next-button")).toBeDisabled();
  });
});
