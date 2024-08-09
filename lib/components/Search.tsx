import { useId } from "react";
import useSearch from "../hooks/useSearch";

type SearchProps = {
  columns: string[] | "all";
};

const Search = ({ columns }: SearchProps) => {
  const { search } = useSearch(columns);
  const id = useId();

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="dt-search"
    >
      <label htmlFor={id}>Search</label>
      <input
        type="search"
        placeholder="Search"
        name="search"
        id={id}
        role="search"
        className="dt-searchinput"
        onChange={(event) => search(event.target.value)}
      />
    </form>
  );
};

export default Search;
