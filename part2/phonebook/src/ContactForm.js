import { useState } from "react";
import contactsAPI from "./services/contacts";

const ContactForm = ({ setMessage, setErrorMessage, contacts, setLocalContacts, setContacts }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  async function updateContact() {
    let contact = contacts.find(p => p.name === newName);
    if (!contact) return setErrorMessage("contact not found");

    let updatedContact = { ...contact, number: newNumber };

    return contactsAPI
      .update(contact.id, updatedContact)
      .then(res => {
        setMessage(`Updated ${updatedContact.name}`);
        let temp = contacts.filter(c => c.id !== contact.id);
        temp.push(updatedContact);
        setLocalContacts(temp);
        setContacts(temp);
      })
      .catch(err => {
        setErrorMessage(`Could not update ${contact.name}: ${err.response.data.error}`);
        console.log(err);
      });
  }

  const generateId = () => {
    const maxId = contacts.length > 0 ? Math.max(...contacts.map(p => p.id)) : 0;
    return maxId + 1;
  };

  async function createNewContact() {
    const newContact = {
      name: newName,
      number: newNumber,
      id: generateId()
    };

    await contactsAPI
      .create(newContact)
      .then(res => {
        setMessage(`Added ${newContact.name}`);
        setLocalContacts(prev => [...prev, newContact]);
        setContacts(prev => [...prev, newContact]);
      })
      .catch(err => {
        console.log(err.response.data.error);
        setErrorMessage(`Could not add new contact: ${err.response.data.error}`);
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
      if (answer) return updateContact();
    } else {
      createNewContact();
    }
  }

  function isDuplicate() {
    return contacts.find(p => p.name === newName && p.number === newNumber);
  }

  function sameNameDifferentNumber() {
    let contact = contacts.find(p => p.name === newName);
    return contact;
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
export default ContactForm;
