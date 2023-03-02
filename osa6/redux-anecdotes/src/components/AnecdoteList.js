import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { sendNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) =>
		state.anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
		)
	);
	const dispatch = useDispatch();

	const vote = async (anecdote) => {
		dispatch(voteAnecdote(anecdote));
		dispatch(sendNotification(`You voted "${anecdote.content}"`, 5000));
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			<ul>
				{anecdotes.map((anecdote) => (
					<li key={anecdote.id}>
						<div>
							<div>
								<strong>{anecdote.content}</strong>
							</div>
							<div>
								has {anecdote.votes}
								<button
									style={{ marginLeft: "5px" }}
									onClick={() => vote(anecdote)}
								>
									vote
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AnecdoteList;
