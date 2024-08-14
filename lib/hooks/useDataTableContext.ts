import { useContext } from "react";
import { DataTableContext } from "../context/DataTableContext";

export const useDataTableContext = () => {
  return useContext(DataTableContext);
};
