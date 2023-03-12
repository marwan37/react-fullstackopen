import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = async () => {
  return await axios.get(baseUrl);
};

const create = async newPerson => {
  return await axios.post(baseUrl, newPerson);
};

const update = async (id, newObject) => {
  return await axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = async person => {
  return await axios.delete(baseUrl + "/" + person.id);
};

export default { getAll, create, update, deletePerson };
