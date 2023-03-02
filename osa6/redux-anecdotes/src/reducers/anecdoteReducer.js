import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		addAnecdote(state, action) {
			state.push(action.payload);
		},
		updateAnecdote(state, action) {
			return state
				.filter((anecdote) => anecdote.id !== action.payload.id)
				.concat(action.payload)
				.sort((a1, a2) => a2.votes - a1.votes);
		},
		setAnecdotes(state, action) {
			return action.payload.sort((a1, a2) => a2.votes - a1.votes);
		},
	},
});

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.create(content);
		dispatch(addAnecdote(newAnecdote));
	};
};

export const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const updatedAnecdote = await anecdoteService.update(
			{ ...anecdote, votes: anecdote.votes + 1 },
			anecdote.id
		);
		dispatch(updateAnecdote(updatedAnecdote));
	};
};

export const { addAnecdote, updateAnecdote, setAnecdotes } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;
