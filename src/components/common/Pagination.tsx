import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isDisabled: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  isDisabled,
  onPageChange,
}) => {
  return (
    <nav
      className="mt-8 flex justify-center items-center space-x-4"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1 || isDisabled}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-white/10 rounded-lg" aria-current="page">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages || isDisabled}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
