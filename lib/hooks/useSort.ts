import { useState } from "react";
import { sortCollection } from "../utils/sort";
import { useDataTableContext } from "./useDataTableContext";

type SortType = "ascending" | "descending" | "none";

type SortColumn = {
  colId: string;
  sort: SortType;
};

const useSort = () => {
  const { setLocalData, localData } = useDataTableContext();

  const [sortColumn, setSortColumn] = useState<SortColumn>({
    colId: "",
    sort: "none",
  });

  const handleSort = (id: string) => {
    let sort: SortType = "ascending";

    const isAlreadySorted = sortColumn.colId === id;
    const isCurrentAsc = isAlreadySorted && sortColumn.sort === "ascending";
    const isCurrentDsc = isAlreadySorted && sortColumn.sort === "descending";

    if (isCurrentAsc) {
      sort = "descending";
    }

    if (isCurrentDsc) {
      setSortColumn({ colId: "", sort: "none" });
      setLocalData(sortCollection(localData, "id"));
      return;
    }

    setSortColumn({ colId: id, sort });
    setLocalData(sortCollection(localData, id, sort));
  };

  return { sortColumn, handleSort };
};

export default useSort;
