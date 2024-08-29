import { createContext, useState } from "react";
import usePagination from "../hooks/usePagination";
import { DataType } from "../types";

type DataTableProviderProps = {
  initialData: DataType[];
  entriesPerPage?: number;
  paginate?: boolean;
  children: React.ReactNode;
};

export type DataTableContextType = {
  initialData: DataType[];
  localData: DataType[];
  setLocalData: (value: DataType[]) => void;
  pagination: {
    isActive: boolean;
    entriesPerPagesRange: number[];
    entriesPerPage: number;
    currentPage: number;
    totalPages: number;
    entries: DataType[];
    paginationButtons: JSX.Element[];
    paginationInformations: {
      start: number;
      end: number;
      total: number;
    };
    setEntriesPerPages: (value: number) => void;
    setCurrentPage: (value: number) => void;
    prevPage: () => void;
    nextPage: () => void;
    firstPage: () => void;
    lastPage: () => void;
  };
};

export const DataTableContext = createContext<DataTableContextType>({
  initialData: [],
  localData: [],
  setLocalData: () => {},
  pagination: {
    isActive: true,
    entriesPerPagesRange: [10, 25, 50, 100],
    entriesPerPage: 10,
    currentPage: 1,
    totalPages: 1,
    entries: [],
    paginationButtons: [],
    paginationInformations: {
      start: 0,
      end: 0,
      total: 0,
    },
    setEntriesPerPages: () => {},
    setCurrentPage: () => {},
    prevPage: () => {},
    nextPage: () => {},
    firstPage: () => {},
    lastPage: () => {},
  },
});

export const DataTableProvider = ({
  initialData = [],
  entriesPerPage = 10,
  paginate = true,
  children,
}: DataTableProviderProps) => {
  const [localData, setLocalData] = useState(initialData);
  const pagination = usePagination(localData, entriesPerPage, paginate);

  return (
    <DataTableContext.Provider
      value={{
        initialData,
        localData,
        setLocalData,
        pagination,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
};
