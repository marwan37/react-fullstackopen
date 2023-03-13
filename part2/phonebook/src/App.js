import { useEffect, useRef, useState } from "react";
import ContactForm from "./ContactForm";
import Contacts from "./Contacts";
import Search from "./Search";
import contactsAPI from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [localContacts, setLocalContacts] = useState([]);
  const contactsRef = useRef(0);

  const [query, setQuery] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    contactsAPI
      .getAll()
      .then(res => res.data)
      .then(data => {
        setContacts(data);
        setLocalContacts(data);
      });
  }, []);

  useEffect(() => {
    contactsRef.current++;
  }, [localContacts, message, errorMessage]);

  return (
    <div>
      {message && <h1>{message}</h1>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <h2>Phonebook</h2>
      <Search
        query={query}
        setQuery={setQuery}
        contacts={contacts}
        setLocalContacts={setLocalContacts}
      />
      <h3>Add a new contact</h3>
      <ContactForm
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
        setContacts={setContacts}
        contacts={contacts}
        setLocalContacts={setLocalContacts}
      />
      <h2>Numbers</h2>
      <Contacts
        contacts={contacts}
        localContacts={localContacts}
        deleteContact={contactsAPI.deleteContact}
        setContacts={setContacts}
        setLocalContacts={setLocalContacts}
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
