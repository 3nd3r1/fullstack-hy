import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../../lib/queries";
import { useEffect, useState } from "react";

const Books = () => {
	const [genre, setGenre] = useState("");

	const result = useQuery(getBooksQuery);
	const filteredResult = useQuery(getBooksQuery, { variables: { genre } });

	const books = filteredResult.data?.allBooks || [];
	const genres = [
		...new Set(result.data?.allBooks.map((b) => b.genres).flat()),
	];

	useEffect(() => {
		filteredResult.refetch();
	}, [genre]); // eslint-disable-line

	if (result.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((book) => (
						<tr key={book.title}>
							<td>{book.title}</td>
							<td>{book.author.name}</td>
							<td>{book.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<label htmlFor="genre">Filter by genre:</label>
				<select
					name="genre"
					id="genre"
					value={genre}
					onChange={(e) => setGenre(e.target.value)}
				>
					<option value="">All genres</option>
					{genres.map((g) => (
						<option key={g} value={g}>
							{g}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Books;
