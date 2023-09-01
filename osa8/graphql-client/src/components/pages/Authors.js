import { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";

import { getAuthorsQuery } from "../../lib/queries";
import { editAuthorMutation } from "../../lib/mutations";
import { useNotification, useUser } from "../../lib/context";

const EditAuthorForm = ({ authors }) => {
	const [name, setName] = useState("");
	const [born, setBorn] = useState("");

	const { notify } = useNotification();
	const { token } = useUser();

	const [editAuthor] = useMutation(editAuthorMutation, {
		onError: (error) => {
			notify(error.message, "error");
		},
		update: (cache, response) => {
			cache.updateQuery({ query: getAuthorsQuery }, ({ allAuthors }) => {
				return {
					allAuthors: allAuthors
						.filter((a) => a.id !== response.data.editAuthor.id)
						.concat(response.data.editAuthor),
				};
			});
		},
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
	};

	if (!token) return null;

	return (
		<form onSubmit={submit}>
			<h2>Set birthyear</h2>
			<div>
				<label htmlFor="name">
					name
					<select
						onChange={(e) => setName(e.target.value)}
						value={name}
					>
						<option value="">Select author</option>
						{authors.map((author) => (
							<option key={author.name} value={author.name}>
								{author.name}
							</option>
						))}
					</select>
				</label>
			</div>
			<div>
				<label htmlFor="name">
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
			<EditAuthorForm authors={authors} />
		</div>
	);
};

export default Authors;
