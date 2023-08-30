import { useQuery } from "@apollo/client";
import { getBooksQuery, meQuery } from "../../lib/queries";

const Recommended = () => {
	const meResult = useQuery(meQuery);
	const user = meResult.data?.me;

	const booksResult = useQuery(getBooksQuery, {
		skip: !user?.favoriteGenre,
		variables: { genre: user?.favoriteGenre },
	});
	const books = booksResult.data?.allBooks || [];

	if (meResult.loading || booksResult.loading || !user) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>Recommendations</h2>
			<p>
				books in your favorite genre:{" "}
				<strong>{user.favoriteGenre}</strong>
			</p>
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
		</div>
	);
};

export default Recommended;
