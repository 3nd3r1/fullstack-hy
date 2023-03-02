import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./requests";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
	const queryClient = useQueryClient();
	const updateAnecdoteMutation = useMutation(updateAnecdote, {
		onSuccess: () => {
			queryClient.invalidateQueries("anecdotes");
		},
	});
	const result = useQuery("anecdotes", getAnecdotes, { retry: 1 });

	const handleVote = (anecdote) => {
		updateAnecdoteMutation.mutate({
			...anecdote,
			votes: anecdote.votes + 1,
		});
	};

	if (result.isLoading) {
		return (
			<div>
				<h2>Loading data...</h2>
			</div>
		);
	}

	if (result.isError) {
		return (
			<div>
				<h3>
					anecdote service not available due to problems in server
				</h3>
			</div>
		);
	}

	const anecdotes = result.data;

	return (
		<div>
			<h1>Anecdote app</h1>

			<Notification />
			<AnecdoteForm />

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
										onClick={() => handleVote(anecdote)}
									>
										vote
									</button>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
