import { ArrowDown, ArrowUp } from "lucide-react";
import { useDataTableContext } from "../hooks/useDataTableContext";
import useSort from "../hooks/useSort";

type TableProps = {
  columns: Column[];
  ordering: boolean;
};

export type Column = {
  header: string;
  id: string;
};

type HeadProps = {
  columns: Column[];
  ordering: boolean;
};

const Head = ({ columns, ordering = true }: HeadProps) => {
  const { sortColumn, handleSort } = useSort();

  const onClick = (id: string) => {
    handleSort(id);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ header, id }) => {
          return ordering ? (
            <th key={id} onClick={() => onClick(id)}>
              {sortColumn.colId === id && (
                <span>
                  {sortColumn.direction === "ascending" ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )}
                </span>
              )}
              <span role="button">{header}</span>
            </th>
          ) : (
            <th key={id}>{header}</th>
          );
        })}
      </tr>
    </thead>
  );
};

const Table = ({ columns, ordering = true }: TableProps) => {
  const { pagination } = useDataTableContext();

  return (
    <table>
      <Head columns={columns} ordering={ordering} />
      <tbody>
        {pagination?.entries.map((record) => {
          const key = record.id;
          return (
            <tr key={key}>
              {columns.map(({ id }) => (
                <td key={`${key}_${id}`}>{record[id]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
