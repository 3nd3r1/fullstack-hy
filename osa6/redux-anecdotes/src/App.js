import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAnecdotes } from "./reducers/anecdoteReducer";

/* Components  */
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

/* Services */
import anecdoteService from "./services/anecdotes";

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		anecdoteService
			.getAll()
			.then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
	}, [dispatch]);

	return (
		<div>
			<Notification />
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
