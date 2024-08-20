import useSort from "../hooks/useSort";

import { ArrowUp } from "lucide-react";
import { useDataTableContext } from "../hooks/useDataTableContext";
import "../styles/datatable.scss";

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
            <th
              className="dt-orderable"
              role="columnheader"
              key={id}
              onClick={() => onClick(id)}
              aria-sort={sortColumn.colId === id ? sortColumn.sort : "none"}
            >
              <div>
                <span role="button">{label}</span>
                <span>
                  <ArrowUp size={16} className="order-icon" />
                </span>
              </div>
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

const Footer = ({ columns }: { columns: Column[] }) => {
  return (
    <tfoot role="rowgroup">
      <tr role="row">
        {columns.map(({ label, id }) => (
          <th key={id}>{label}</th>
        ))}
      </tr>
    </tfoot>
  );
};

const Table = ({ columns, caption = "", ordering = true }: TableProps) => {
  return (
    <div className="dt-wrapper">
      <table role="grid" className="datatable">
        {caption.length > 0 ? <caption>{caption}</caption> : null}
        <Head columns={columns} ordering={ordering} />
        <Body columns={columns} />
        <Footer columns={columns} />
      </table>
    </div>
  );
};

export default Table;
