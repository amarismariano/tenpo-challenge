import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDisabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isDisabled = false,
}) => {
  return (
    <div
      data-testid="pagination"
      className="flex items-center justify-center gap-4 mt-8"
    >
      <button
        data-testid="previous-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isDisabled}
        className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span data-testid="page-info" className="text-sm font-medium">
        Page {currentPage} of {totalPages || 1}
      </span>
      <button
        data-testid="next-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isDisabled}
        className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
