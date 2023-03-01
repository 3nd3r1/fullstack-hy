import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload);
		},
		voteAnecdote(state, action) {
			state.find((anecdote) => anecdote.id === action.payload).votes++;
			state.sort((a1, a2) => a2.votes - a1.votes);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { createAnecdote, voteAnecdote, setAnecdotes } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;
