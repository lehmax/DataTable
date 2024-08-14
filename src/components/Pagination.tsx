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
    <div>
      <span>
        Showing {start} to {end} of {total} entries
      </span>
      <nav role="navigation" aria-label="Pagination">
        <ul>
          <li>
            <a
              href="#first"
              onClick={(event) => {
                event.preventDefault();
                firstPage();
              }}
              aria-disabled={currentPage === 1 ? "true" : "false"}
            >
              <ChevronsLeft aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="#previous"
              onClick={(event) => {
                event.preventDefault();
                prevPage();
              }}
              aria-disabled={currentPage === 1 ? "true" : "false"}
            >
              <ChevronLeft aria-hidden="true" />
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
              aria-disabled={currentPage === totalPages ? "true" : "false"}
            >
              <ChevronRight aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="#last"
              onClick={(event) => {
                event.preventDefault();
                lastPage();
              }}
              aria-disabled={currentPage === totalPages ? "true" : "false"}
            >
              <ChevronsRight aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
