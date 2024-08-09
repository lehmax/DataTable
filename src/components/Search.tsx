import { useId } from "react";
import useSearch from "../hooks/useSearch";

type SearchProps = {
  columns: string[] | "all";
};

const Search = ({ columns }: SearchProps) => {
  const { search } = useSearch(columns);
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Search</label>
      <input
        type="search"
        placeholder="Search"
        name="search"
        id={id}
        onChange={(event) => search(event.target.value)}
      />
    </div>
  );
};

export default Search;
