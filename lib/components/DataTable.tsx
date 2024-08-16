import { DataTableProvider } from "../context/DataTableContext";
import { DataType } from "../types";
import { sortCollection } from "../utils/sort";
import Pagination from "./Pagination";
import Search from "./Search";
import SelectEntriesPerPage from "./SelectEntriesPerPage";
import Table, { Column } from "./Table";

export type DataTableProps = {
  title?: string;
  data: DataType[];
  columns: Column[];
  searchColumns?: string[] | "all";
  ordering?: boolean;
  search?: boolean;
  paginate?: boolean;
  entriesPerPage?: number;
};

const DataTable = ({
  title = "",
  data,
  columns,
  ordering = true,
  search = true,
  searchColumns = "all",
  paginate = true,
  entriesPerPage = 10,
}: DataTableProps) => {
  let initialData = data;

  if (data.length === 0 || columns.length === 0) {
    console.warn("DataTable: Empty data or columns provided.");
    return false;
  }

  if (ordering && columns.length > 0) {
    initialData = sortCollection(initialData, columns[0].id);
  }

  return (
    <DataTableProvider
      initialData={initialData}
      entriesPerPage={entriesPerPage}
      paginate={paginate}
    >
      <div>
        <div className="dt-inputs">
          {paginate && <SelectEntriesPerPage />}
          {search && <Search columns={searchColumns} />}
        </div>
        <Table caption={title} columns={columns} ordering={ordering} />
        {paginate && <Pagination />}
      </div>
    </DataTableProvider>
  );
};

export default DataTable;
