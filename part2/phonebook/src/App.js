import { useEffect, useRef, useState } from "react";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Search from "./Search";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [localPersons, setLocalPersons] = useState([]);
  const personsRef = useRef(0);

  const [query, setQuery] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then(res => res.data)
      .then(data => {
        setPersons(data);
        setLocalPersons(data);
      });
  }, []);

  useEffect(() => {
    personsRef.current++;
  }, [localPersons, message, errorMessage]);

  return (
    <div>
      {message && <h1>{message}</h1>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <h2>Phonebook</h2>
      <Search
        query={query}
        setQuery={setQuery}
        persons={persons}
        setLocalPersons={setLocalPersons}
      />
      <h3>Add a new person</h3>
      <PersonForm
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
        setPersons={setPersons}
        persons={persons}
        setLocalPersons={setLocalPersons}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        localPersons={localPersons}
        deletePerson={personsService.deletePerson}
        setPersons={setPersons}
        setLocalPersons={setLocalPersons}
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
