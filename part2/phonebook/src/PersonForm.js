import { useState } from "react";
import personsService from "./services/persons";

const PersonForm = ({ setMessage, setErrorMessage, persons, setLocalPersons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  async function updatePerson() {
    let person = persons.find(p => p.name === newName);
    if (!person) return setErrorMessage("person not found");

    let updatedPerson = { ...person, number: newNumber };

    return personsService
      .update(person.id, updatedPerson)
      .then(res => {
        setMessage(`Updated ${updatedPerson.name}`);
        let temp = persons.filter(p => p.id !== person.id);
        temp.push(updatedPerson);
        setLocalPersons(temp);
        setPersons(temp);
      })
      .catch(err => {
        setErrorMessage(`Could not update ${person.name}: ${err.response.data.error}`);
        console.log(err);
      });
  }

  const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
    return maxId + 1;
  };

  async function createNewPerson() {
    const newPerson = {
      name: newName,
      number: newNumber,
      id: generateId()
    };

    await personsService
      .create(newPerson)
      .then(res => {
        setMessage(`Added ${newPerson.name}`);
        setLocalPersons(prev => [...prev, newPerson]);
        setPersons(prev => [...prev, newPerson]);
      })
      .catch(err => {
        console.log(err);
        setErrorMessage(`Could not add new person: ${err.response.data.error}`);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");
    if (isDuplicate()) {
      return setMessage(`${newName} is alreaded in your phonebook`);
    } else if (sameNameDifferentNumber()) {
      if (!newNumber) return alert("Please add a number");
      let answer = confirm(`${newName} exists already, replace the old number with a new one?`);
      if (answer) return updatePerson();
    } else {
      createNewPerson();
    }
  }

  function isDuplicate() {
    return persons.find(p => p.name === newName && p.number === newNumber);
  }

  function sameNameDifferentNumber() {
    let person = persons.find(p => p.name === newName);
    return person;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onInput={e => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input onInput={e => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
