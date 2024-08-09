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
      <nav>
        <button onClick={pagination.firstPage}>
          <ChevronsLeft />
        </button>
        <button onClick={pagination.prevPage}>
          <ChevronLeft />
        </button>
        {pagination.paginationButtons}
        <button onClick={pagination.nextPage}>
          <ChevronRight />
        </button>
        <button onClick={pagination.lastPage}>
          <ChevronsRight />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
