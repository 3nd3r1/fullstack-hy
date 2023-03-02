import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { sendNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleNewAnecdote = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = "";

		dispatch(createAnecdote(content));
		dispatch(sendNotification(`Added "${content}"!`, 5000));
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
