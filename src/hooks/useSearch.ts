import { useDataTableContext } from "./useDataTableContext";

type data = {
  [key: string]: string | number;
};

const useSearch = (columns: string[] | "all") => {
  const { setLocalData, initialData, pagination } = useDataTableContext();

  const search = (value: string) => {
    if (!initialData) return;

    const filteredData = initialData.filter((row: data) =>
      Object.entries(row).some(([key, cellValue]) => {
        if (columns === "all" || columns.length === 0) {
          return cellValue
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }

        if (columns.includes(key)) {
          return cellValue
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
      })
    );

    if (filteredData) {
      setLocalData(filteredData);

      if (pagination.isActive) {
        pagination.setCurrentPage(1);
      }
    }
  };

  return {
    search,
  };
};

export default useSearch;
