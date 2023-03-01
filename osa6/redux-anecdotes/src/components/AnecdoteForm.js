import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";
import { sendNotificaion } from "../utils/notification";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleNewAnecdote = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = "";

		const newAnecdote = await anecdoteService.create(content);
		dispatch(createAnecdote(newAnecdote));
		sendNotificaion(dispatch, `Added "${newAnecdote}"!`);
	};
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={(e) => handleNewAnecdote(e)}>
				<div>
					<input
						type="text"
						name="anecdote"
						style={{ width: "50%", marginBottom: "10px" }}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
