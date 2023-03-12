import { useEffect } from "react";

const Search = ({ query, setQuery, persons, setLocalPersons }) => {
  useEffect(() => {
    if (!query) {
      setLocalPersons(persons);
    } else {
      const filtered = persons.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
      setLocalPersons(filtered);
    }
  }, [query]);

  return (
    <div>
      filter persons:
      <input onInput={e => setQuery(e.target.value)} />
    </div>
  );
};
export default Search;
