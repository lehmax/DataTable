import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useDataTableContext } from "../hooks/useDataTableContext";

const Pagination = () => {
  const { pagination } = useDataTableContext();
  const {
    currentPage,
    totalPages,
    paginationInformations,
    firstPage,
    prevPage,
    lastPage,
    nextPage,
    paginationButtons,
  } = pagination;
  const { start, end, total } = paginationInformations;
  const isDotsBeforePages = totalPages > 5 && currentPage > 3;
  const isDotsAfterPages = totalPages > 5 && currentPage < totalPages - 2;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="dt-pagination">
      <span className="dt-pagination-resume">
        Showing {start} to {end} of {total} entries
      </span>
      <nav
        className="dt-pagination-navigation"
        role="navigation"
        aria-label="Pagination"
      >
        <ul>
          <li>
            <button
              className="dt-pagination-button"
              onClick={firstPage}
              aria-label="Go to first page"
              disabled={isFirstPage}
            >
              <ChevronsLeft aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              className="dt-pagination-button"
              onClick={prevPage}
              aria-label="Go to previous page"
              disabled={isFirstPage}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
          </li>
          {isDotsBeforePages && (
            <li>
              <span>...</span>
            </li>
          )}
          {paginationButtons}
          {isDotsAfterPages && (
            <li>
              <span>...</span>
            </li>
          )}
          <li>
            <button
              className="dt-pagination-button"
              onClick={nextPage}
              aria-label="Go to next page"
              disabled={isLastPage}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              className="dt-pagination-button"
              onClick={lastPage}
              aria-label="Go to last page"
              disabled={isLastPage}
            >
              <ChevronsRight aria-hidden="true" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
