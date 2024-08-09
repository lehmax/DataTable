import { useState } from "react";
import { DataType } from "../types";
import { useDataTableContext } from "./useDataTableContext";

const usePagination = (
  localData: DataType[],
  defaultEntriesPerPage: number,
  isActive: boolean
) => {
  const { pagination } = useDataTableContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPages] = useState(defaultEntriesPerPage);

  if (!isActive) {
    return {
      ...pagination,
      isActive,
      entries: localData,
    };
  }

  const totalEntries = localData?.length;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const lastIndex = currentPage * entriesPerPage;
  const entries = localData?.slice(startIndex, lastIndex);
  const maxPageButtons = 5;
  const startPageBtn = Math.max(
    1,
    currentPage - Math.floor(maxPageButtons / 2)
  );

  const totalPages = totalEntries
    ? Math.ceil(totalEntries / entriesPerPage)
    : 1;
  const endPageBtn = Math.min(totalPages, startPageBtn + maxPageButtons - 1);

  const paginationButtons = Array.from(
    { length: endPageBtn - startPageBtn + 1 },
    (_, index) => (
      <button
        key={startPageBtn + index}
        onClick={() => setCurrentPage(startPageBtn + index)}
        disabled={currentPage === startPageBtn + index}
      >
        {startPageBtn + index}
      </button>
    )
  );

  const prevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  return {
    ...pagination,
    entries,
    currentPage,
    entriesPerPage,
    paginationButtons,
    paginationInformations: {
      start: totalEntries !== 0 ? startIndex + 1 : 0,
      end: lastIndex < totalEntries ? lastIndex : totalEntries,
      total: totalEntries,
    },
    setEntriesPerPages,
    prevPage,
    nextPage,
    firstPage: () => setCurrentPage(1),
    lastPage: () => setCurrentPage(totalPages),
    setCurrentPage,
  };
};

export default usePagination;
