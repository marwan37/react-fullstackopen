const Persons = ({
  persons,
  localPersons,
  deletePerson,
  setLocalPersons,
  setPersons,
  setMessage,
  setErrorMessage
}) => {
  function handleDelete(person) {
    let answer = confirm(`Delete ${person.name} ?`);
    if (answer) {
      deletePerson(person)
        .then(res => {
          let newPersons = persons.filter(p => p.id !== person.id);
          setMessage(`Deleted ${person.name}`);
          setLocalPersons(newPersons);
          setPersons(newPersons);
        })
        .catch(err => setErrorMessage("Could not delete person: " + err.message));
    }
  }
  return (
    <div>
      {localPersons.map(person => (
        <div key={person.id} style={{ display: "inline-block", width: "100%" }}>
          <p style={{ display: "inline-block" }}>
            {person.name} {person.number}
          </p>
          <button onClick={() => handleDelete(person)} style={{ marginLeft: "5px" }}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default Persons;
