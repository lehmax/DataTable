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
  const isFirstPage = currentPage === 1;
  const isEndPage = currentPage === totalPages;

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
            <a
              href="#first"
              onClick={(event) => {
                event.preventDefault();
                firstPage();
              }}
              aria-label="Go to first page"
              aria-disabled={currentPage === 1 ? "true" : "false"}
            >
              <ChevronsLeft aria-hidden="true" size={16} />
            </a>
          </li>
          <li>
            <a
              href="#previous"
              onClick={(event) => {
                event.preventDefault();
                prevPage();
              }}
              aria-label="Go to previous page"
              aria-disabled={currentPage === 1 ? "true" : "false"}
            >
              <ChevronLeft aria-hidden="true" size={16} />
            </a>
          </li>
          {totalPages > 5 && !isFirstPage && (
            <li>
              <span>...</span>
            </li>
          )}
          {paginationButtons}
          {totalPages > 5 && !isEndPage && (
            <li>
              <span>...</span>
            </li>
          )}
          <li>
            <a
              href="#next"
              onClick={(event) => {
                event.preventDefault();
                nextPage();
              }}
              aria-label="Go to next page"
              aria-disabled={currentPage === totalPages ? "true" : "false"}
            >
              <ChevronRight aria-hidden="true" size={16} />
            </a>
          </li>
          <li>
            <a
              href="#last"
              onClick={(event) => {
                event.preventDefault();
                lastPage();
              }}
              aria-label="Go to last page"
              aria-disabled={currentPage === totalPages ? "true" : "false"}
            >
              <ChevronsRight aria-hidden="true" size={16} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
