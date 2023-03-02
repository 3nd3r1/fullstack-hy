import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { createAnecdote } from "../requests";

const AnecdoteForm = () => {
	const queryClient = useQueryClient();

	const notificationDispatch = useNotificationDispatch();

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (data) => {
			queryClient.invalidateQueries("anecdotes");
			notificationDispatch({
				type: "SHOW",
				payload: { message: `Added "${data.content}"!` },
			});
		},
		onError: (data) => {
			notificationDispatch({
				type: "SHOW",
				payload: { message: `${data.response.data.error}` },
			});
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		newAnecdoteMutation.mutate({ content, votes: 0 });
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
