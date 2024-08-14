import { useDataTableContext } from "../hooks/useDataTableContext";

const SelectEntriesPerPage = () => {
  const { pagination } = useDataTableContext();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    pagination.setEntriesPerPages(Number(event.target.value));
    pagination.setCurrentPage(1);
  };

  return (
    <div className="dt-entries-number">
      <label htmlFor="entries">Entries per page</label>
      <select id="entries" onChange={onChange}>
        {pagination.entriesPerPagesRange?.map((entriesPerPages: number) => (
          <option
            key={entriesPerPages}
            value={entriesPerPages}
            defaultValue={entriesPerPages}
          >
            {entriesPerPages}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectEntriesPerPage;
