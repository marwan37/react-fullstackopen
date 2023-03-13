import axios from "axios";

const baseUrl = "https://phonebook-fsocoursepart3.fly.dev/api/contacts";

const getAll = async () => {
  return await axios.get(baseUrl);
};

const create = async newContact => {
  return await axios.post(baseUrl, newContact);
};

const update = async (id, newObject) => {
  return await axios.put(`${baseUrl}/${id}`, newObject);
};

const deleteContact = async contact => {
  return await axios.delete(baseUrl + "/" + contact.id);
};

export default { getAll, create, update, deleteContact };
