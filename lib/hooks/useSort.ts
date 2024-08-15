import { useState } from "react";
import { Column } from "../components/Table";
import { sortCollection } from "../utils/sort";
import { useDataTableContext } from "./useDataTableContext";

type SortDirection = "ascending" | "descending" | "none";

type SortColumn = {
  colId: string;
  direction: SortDirection;
};

const useSort = (columns: Column[]) => {
  const { setLocalData, localData } = useDataTableContext();

  const firstColumn = columns[0];
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    colId: localData.length > 0 ? firstColumn.id : "",
    direction: "ascending",
  });

  const handleSort = (id: string) => {
    let direction: SortDirection = "ascending";

    if (sortColumn.colId === id && sortColumn.direction !== "none") {
      direction =
        sortColumn.direction === "ascending" ? "descending" : direction;
    }

    setSortColumn({ colId: id, direction });
    const sortedData = sortCollection(localData, id, direction);
    setLocalData(sortedData);
  };

  return { sortColumn, handleSort };
};

export default useSort;
