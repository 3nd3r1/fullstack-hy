import { useState } from "react";
import { getAuthorsQuery, getBooksQuery } from "../../lib/queries";
import { createBookMutation } from "../../lib/mutations";
import { useMutation } from "@apollo/client";
import { useNotification } from "../../lib/context";

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
		update: (cache, response) => {
			if (cache.readQuery({ query: getBooksQuery })) {
				cache.updateQuery({ query: getBooksQuery }, ({ allBooks }) => {
					return {
						allBooks: allBooks.concat(response.data.addBook),
					};
				});
			}
			if (cache.readQuery({ query: getAuthorsQuery })) {
				cache.updateQuery(
					{ query: getAuthorsQuery },
					({ allAuthors }) => {
						return {
							allAuthors: allAuthors
								.filter(
									(a) =>
										a.name !==
										response.data.addBook.author.name
								)
								.concat(response.data.addBook.author),
						};
					}
				);
			}
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
