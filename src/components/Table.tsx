import { ArrowDown, ArrowUp } from "lucide-react";
import { useDataTableContext } from "../hooks/useDataTableContext";
import useSort from "../hooks/useSort";

type TableProps = {
  columns: Column[];
  caption?: string;
  ordering: boolean;
};

export type Column = {
  label: string;
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
    <thead role="rowgroup">
      <tr role="row">
        {columns.map(({ label, id }) => {
          return ordering ? (
            <th role="columnheader" key={id} onClick={() => onClick(id)}>
              {sortColumn.colId === id && (
                <span>
                  {sortColumn.direction === "ascending" ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )}
                </span>
              )}
              <span role="button">{label}</span>
            </th>
          ) : (
            <th key={id}>{label}</th>
          );
        })}
      </tr>
    </thead>
  );
};

const Body = ({ columns }: { columns: Column[] }) => {
  const { pagination } = useDataTableContext();

  return (
    <tbody role="rowgroup">
      {pagination?.entries.map((record) => {
        const key = record.id;
        return (
          <tr key={key} role="row">
            {columns.map(({ id }) => (
              <td role="gridcell" key={`${key}_${id}`}>
                {record[id]}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

const Table = ({ columns, caption = "", ordering = true }: TableProps) => {
  return (
    <table role="grid">
      {caption.length > 0 ? <caption>{caption}</caption> : null}
      <Head columns={columns} ordering={ordering} />
      <Body columns={columns} />
    </table>
  );
};

export default Table;
