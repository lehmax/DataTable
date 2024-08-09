import { DataTableProvider } from "../context/DataTableContext";
import { DataType } from "../types";
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
  if (data.length === 0 || columns.length === 0) return false;

  return (
    <DataTableProvider
      initialData={data}
      entriesPerPage={entriesPerPage}
      paginate={paginate}
    >
      <div className="dt-inputs">
        {paginate && <SelectEntriesPerPage />}
        {search && <Search columns={searchColumns} />}
      </div>
      <Table caption={title} columns={columns} ordering={ordering} />
      {paginate && <Pagination />}
    </DataTableProvider>
  );
};

export default DataTable;
