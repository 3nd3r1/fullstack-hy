import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const handleNewAnecdote = (e) => {
		e.preventDefault();
		const newAnecdote = e.target.anecdote.value;
		e.target.anecdote.value = "";
		dispatch(createAnecdote(newAnecdote));
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
