import { ReactNode } from "react";

type DataTableProps = TableProps & {
  ordering?: boolean;
  search?: boolean;
  paginate?: boolean;
  pageLength?: number;
};

type column = {
  header: string;
  accessor: string;
};

type data = {
  id: number;
} & Record<string, ReactNode>;

type TableProps = {
  data: data[];
  columns: column[];
};

const DataTable = ({
  data,
  columns,
  ordering = true,
  search = true,
  paginate = true,
  pageLength = 10,
}: DataTableProps) => {
  if (!data.length) return false;

  return (
    <div>
      {ordering && <SelectEntriesPerPage />}
      {search && <Search />}
      <Table data={data} columns={columns} />
      {paginate && <Pagination />}
    </div>
  );
};

const SelectEntriesPerPage = () => {
  return (
    <div>
      <label htmlFor="entries">Entries per page</label>
      <select id="entries">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="50">100</option>
      </select>
    </div>
  );
};

const Table = ({ data, columns }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ header, accessor }) => (
            <th key={accessor}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record) => {
          const key = record.id;
          return (
            <tr key={key}>
              {columns.map(({ accessor }) => (
                <td key={`${key}_${accessor}`}>{record[accessor]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Search = () => {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input type="search" placeholder="Search" id="search" />
    </div>
  );
};

const Pagination = () => {
  return (
    <div>
      <button>Previous</button>
      <button>Next</button>
    </div>
  );
};

export default DataTable;
