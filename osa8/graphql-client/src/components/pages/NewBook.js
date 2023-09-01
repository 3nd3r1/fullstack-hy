import { useState } from "react";
import { getAuthorsQuery, getBooksQuery } from "../../lib/queries";
import { createBookMutation } from "../../lib/mutations";
import { useMutation, useSubscription } from "@apollo/client";
import { useNotification } from "../../lib/context";
import { bookAddedSubscription } from "../../lib/subscriptions";

const NewBook = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);

	const { notify } = useNotification();

	const [createBook] = useMutation(createBookMutation, {
		onError: (error) => {
			notify(error.message, "error");
		},
	});

	useSubscription(bookAddedSubscription, {
		onError: (error) => {
			notify(error.message, "error");
		},
		onData: ({ data, client }) => {
			const addedBook = data.data.bookAdded;

			notify(`New book added: ${addedBook.title}`, "success");

			if (client.cache.readQuery({ query: getBooksQuery })) {
				client.cache.updateQuery(
					{ query: getBooksQuery },
					({ allBooks }) => {
						return {
							allBooks: allBooks
								.filter((book) => book.id !== addedBook.id)
								.concat(addedBook),
						};
					}
				);
			}

			if (client.cache.readQuery({ query: getAuthorsQuery })) {
				client.cache.updateQuery(
					{ query: getAuthorsQuery },
					({ allAuthors }) => {
						return {
							allAuthors: allAuthors
								.filter(
									(author) =>
										author.id !== addedBook.author.id
								)
								.concat(addedBook.author),
						};
					}
				);
			}

			addedBook.genres.forEach((genre) => {
				if (
					client.cache.readQuery({
						query: getBooksQuery,
						variables: { genre: genre },
					})
				) {
					client.cache.updateQuery(
						{ query: getBooksQuery, variables: { genre } },
						({ allBooks }) => {
							return {
								allBooks: allBooks
									.filter((book) => book.id !== addedBook.id)
									.concat(addedBook),
							};
						}
					);
				}
			});
		},
	});

	const submit = async (event) => {
		event.preventDefault();

		createBook({
			variables: {
				title,
				author,
				published: parseInt(published),
				genres,
			},
		});

		setTitle("");
		setPublished("");
		setAuthor("");
		setGenres([]);
		setGenre("");
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
