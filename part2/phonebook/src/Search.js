import { useEffect } from "react";

const Search = ({ query, setQuery, contacts, setLocalContacts }) => {
  useEffect(() => {
    if (!query) {
      setLocalContacts(contacts);
    } else {
      const filtered = contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
      setLocalContacts(filtered);
    }
  }, [query]);

  return (
    <div>
      filter contacts:
      <input onInput={e => setQuery(e.target.value)} />
    </div>
  );
};
export default Search;
