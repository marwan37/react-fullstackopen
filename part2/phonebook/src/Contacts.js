const Contacts = ({
  contacts,
  localContacts,
  deleteContact,
  setLocalContacts,
  setContacts,
  setMessage,
  setErrorMessage
}) => {
  function handleDelete(contact) {
    let answer = confirm(`Delete ${contact.name} ?`);
    if (answer) {
      deleteContact(contact)
        .then(res => {
          let newContacts = contacts.filter(c => c.id !== contact.id);
          setMessage(`Deleted ${contact.name}`);
          setLocalContacts(newContacts);
          setContacts(newContacts);
        })
        .catch(err => setErrorMessage("Could not delete contact: " + err.message));
    }
  }
  return (
    <div>
      {localContacts.map(contact => (
        <div key={contact.id} style={{ display: "inline-block", width: "100%" }}>
          <p style={{ display: "inline-block" }}>
            {contact.name} {contact.number}
          </p>
          <button onClick={() => handleDelete(contact)} style={{ marginLeft: "5px" }}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default Contacts;
