import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useDataTableContext } from "../hooks/useDataTableContext";

const Pagination = () => {
  const { pagination } = useDataTableContext();

  const { start, end, total } = pagination.paginationInformations;

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
                pagination.firstPage();
              }}
              aria-disabled="true"
            >
              <ChevronsLeft />
            </a>
          </li>
          <li>
            <a
              href="#previous"
              onClick={(event) => {
                event.preventDefault();
                pagination.prevPage();
              }}
              aria-disabled="true"
            >
              <ChevronLeft />
            </a>
          </li>
          {pagination.paginationButtons}
          <li>
            <a
              href="#next"
              onClick={(event) => {
                event.preventDefault();
                pagination.nextPage();
              }}
            >
              <ChevronRight />
            </a>
          </li>
          <li>
            <a
              href="#last"
              onClick={(event) => {
                event.preventDefault();
                pagination.lastPage();
              }}
            >
              <ChevronsRight />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
