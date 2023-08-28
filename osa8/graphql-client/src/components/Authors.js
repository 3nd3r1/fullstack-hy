import { useMutation, useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../lib/queries";
import { useState } from "react";
import { editAuthorMutation } from "../lib/mutations";

const EditAuthorForm = ({ refetch, authors }) => {
	const [name, setName] = useState("");
	const [born, setBorn] = useState("");

	const [editAuthor] = useMutation(editAuthorMutation, {
		refreshQueries: [{ query: getAuthorsQuery }],
	});

	const submit = async (event) => {
		event.preventDefault();

		editAuthor({
			variables: {
				name,
				setBornTo: parseInt(born),
			},
		});

		setName("");
		setBorn("");
		refetch();
	};

	return (
		<form onSubmit={submit}>
			<h2>Set birthyear</h2>
			<div>
				<label for="name">
					name
					<select onChange={(e) => setName(e.target.value)}>
						{authors.map((author) => (
							<option value={author.name}>{author.name}</option>
						))}
					</select>
				</label>
			</div>
			<div>
				<label for="name">
					born
					<input
						type="number"
						id="born"
						value={born}
						onChange={(e) => setBorn(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<input type="submit" value="Update Author" />
			</div>
		</form>
	);
};

const Authors = () => {
	const result = useQuery(getAuthorsQuery);

	if (result.loading) {
		return <div>loading...</div>;
	}

	const authors = result.data?.allAuthors || [];

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<EditAuthorForm refetch={result.refetch} authors={authors} />
		</div>
	);
};

export default Authors;
