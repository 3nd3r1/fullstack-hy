import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const anecdoteService = {};

anecdoteService.getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

anecdoteService.create = async (content) => {
	const newAnecdote = { content, votes: 0 };
	const response = await axios.post(baseUrl, newAnecdote);
	return response.data;
};

anecdoteService.update = async (updatedAnecdote, id) => {
	const response = await axios.put(baseUrl + "/" + id, updatedAnecdote);
	return response.data;
};

export default anecdoteService;
