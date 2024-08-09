import { useState } from "react";
import { DataType } from "../types";
import { useDataTableContext } from "./useDataTableContext";

type SortDirection = "ascending" | "descending" | "none";

type SortColumn = {
  colId: string;
  direction: SortDirection;
};

const useSort = () => {
  const { setLocalData, localData } = useDataTableContext();
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    colId: "",
    direction: "none",
  });

  const sortDataByColumn = (sortColumn: SortColumn, data: DataType[]) => {
    if (!sortColumn.colId || sortColumn.direction === "none") return;

    const sortedData = [...data].sort((a, b) => {
      const valueA = a[sortColumn.colId] as string;
      const valueB = b[sortColumn.colId] as string;

      if (!valueA && !valueB) return 0;

      return sortColumn.direction === "ascending"
        ? valueA.localeCompare(valueB, "en", {
            numeric: true,
            sensitivity: "base",
          })
        : valueB.localeCompare(valueA, "en", {
            numeric: true,
            sensitivity: "base",
          });
    });

    setLocalData(sortedData);
  };

  const handleSort = (id: string) => {
    setSortColumn((prevSort) => {
      let direction: SortDirection = "ascending";

      if (prevSort.colId === id && prevSort.direction !== "none") {
        direction =
          sortColumn.direction === "ascending" ? "descending" : direction;
      }

      const newSortColumn = { colId: id, direction };

      if (localData) {
        sortDataByColumn(newSortColumn, localData);
      }

      return newSortColumn;
    });
  };

  return { sortColumn, handleSort };
};

export default useSort;
