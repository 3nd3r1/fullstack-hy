import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getPersons = () => {
	const req = axios.get(baseUrl);
	return req.then((response) => response.data);
};

export const addPerson = (newPerson) => {
	const req = axios.post(baseUrl, newPerson);
	return req.then((response) => response.data);
};

export const updatePerson = (id, newPerson) => {
	const req = axios.put(baseUrl + "/" + id, newPerson);
	return req.then((response) => response.data);
};

export const deletePerson = (id) => {
	const req = axios.delete(baseUrl + "/" + id);
	return req;
};
